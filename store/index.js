import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		types: [],
		intervals: [],
		authorization: ""
	},
	getters: {
		getLastRecord(state) {
			return state.intervals[0];
		},
		getFirstRecord(state) {
			return state.intervals[state.intervals.length - 1]
		},
		getAuthorization(state) {
			return state.authorization;
		}
	},
	mutations: {
		setTypes(state, types) {
			state.types = types;
		},
		setIntervals(state, intervals) {
			state.intervals = intervals;
		},
		addIntervals(state, intervals) {
			state.intervals = intervals.concat(state.intervals);
		},
		setAuthorzation(state, authorzation) {
			state.authorization = authorzation;
		}

	},
	actions: {
		downloadTypes(context) {
			uni.request({
				url: 'https://app.atimelogger.com/api/v2/types',
				header: {
					'Authorization': context.state.authorization
				},
				// 访问成功后
				success: (res) => {
					// 跳转页面
					if (res.statusCode == 200) {
						context.commit('setTypes', res.data.types);
					} else if (res.statusCode == 401) {

					} else {

					}
					console.log(res.statusCode);
				}
			});
		},
		_downloadIntervals(context, payload) {
			console.log("下载中……");
			console.log(payload);
			let auth = btoa("1470298128@qq.com" + ":" + "948278064");
			uni.request({
				url: 'https://app.atimelogger.com/api/v2/intervals',
				header: {
					'Authorization': payload.authorization
				},
				data: {
					"from": payload.from,
					"to": payload.to,
					"limit": 999
				},
				// 访问成功后
				success: (res) => {
					// 跳转页面
					if (res.statusCode == 200) {
						let intervals = res.data.intervals;
						console.log(intervals);
						if (intervals.length != 0) {
							const last = intervals[0]['to'];
							const first = intervals[intervals.length - 1]['from'];
							context.commit('addIntervals', res.data.intervals);
							console.log("开始保存intervals");
							context.dispatch('saveIntervals');
							intervals = null;
							if (first > payload.from && first < payload.to) {
								payload.to = first;
								context.dispatch('_downloadIntervals', payload);
							}
						} else {
							console.log("已经是最新了！");
						}
					} else {
						
					}
					console.log(res.statusCode);
				}
			})
		},
		sync(context) {
			const authorization = context.getters.getAuthorization;
			console.log("sync....");
			const last = context.getters.getLastRecord;
			const now = Math.round(new Date().getTime() / 1000);
			if (last) {
				const payload = {
					from: last.to,
					to: now,
					authorization
				}
				context.dispatch('_downloadIntervals', payload);
			} else {
				let date = new Date;
				// let threeMonth = Math.round(date.setMonth(date.getMonth() - 3) / 1000);
				let oneMonth = Math.round(date.setMonth(date.getMonth() - 1) / 1000) + 2000000;
				const payload = {
					from: oneMonth,
					to: now,
					authorization
				}
				context.dispatch('_downloadIntervals', payload);
			}

		},
		saveTypes(context){
			uni.setStorage({
				key: 'types',
				data: context.state.types,
				success: function() {
					console.log('types存储成功！');
				}
			});
		},
		saveIntervals(context){
			uni.setStorage({
				key: 'intervals',
				data: context.state.intervals,
				success: function() {
					console.log('intervals存储成功！');
				}
			});
		}
	}

})

export default store;
