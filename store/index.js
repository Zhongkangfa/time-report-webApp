import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment';
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		token: "",
		authorization: "",
		types: [],
		intervals: [],
		summary: {},
		downloadedIntervals: []
	},
	getters: {
		getLastRecord(state) {
			if (state.intervals != [] && state.intervals[0]) {
				console.log("返回此时intervals的情况。");
				console.log(state.intervals[0]);
				console.log(state.intervals[0]['to'], state.intervals[state.intervals.length - 1]['from']);
			}
			return state.intervals[0];
		},
		getFirstRecord(state) {
			return state.intervals[state.intervals.length - 1]
		},
		getAuthorization(state) {
			return state.authorization;
		},
		getRootActivity(state) {
			console.log("触发getRootActivity");
			let root = state.types.filter(activity => activity['parent'] == null);
			return root;
		},
		getActivityChildren(state) {
			//好害怕内存泄露
			console.log("触发getActivityChildren");
			return function(parentGuid) {
				return state.types.filter(activity => activity['parent'] == parentGuid);
			}
		},
		getActivity(state) {
			//好害怕内存泄露
			console.log("触发getActivity");
			return function(id) {
				return state.types.filter(activity => activity['id'] == id)[0] || null;
			}
		},
		hasRecord(state, activityGuid){
			//查看本地有没有记录
			if(state.intervals){
				
			}
			
			//查看云端有没有记录
		}
	},
	//修改state的方法
	mutations: {
		setTypes(state, types) {
			state.types = types;
		},
		addType(state, type){
			state.types.push(type);
			//本地初始化summary
			state.summary[type.id] = {};
			state.summary[type.id].name = type['name'];
			state.summary[type.id].days = new Object();
			state.summary[type.id].weeks = new Object();
			state.summary[type.id].months = new Object();
			state.summary[type.id].years = new Object();
			
			//存储到本地
			this.dispatch('saveTypes');
			this.dispatch('saveSummary');
		},
		deleteType(state, id){
			state.types = state.types.filter(function(type) {
			    return type.id != id;
			});
			delete state.summary[id];
		},
		setIntervals(state, intervals) {
			state.intervals = intervals;
		},
		addIntervals(state, intervals) {
			console.log("给原来的数组接上最新的数据。");
			state.downloadedIntervals = state.downloadedIntervals.concat(intervals);
			console.log("接上后的头尾情况及长度");
			// console.log(state.downloadedIntervals[0]['to'], state.downloadedIntervals[state.downloadedIntervals
			// 	.length - 1]['from']);
			console.log(state.downloadedIntervals.length);
		},
		merge(state) {
			console.log("合并");
			state.intervals = state.downloadedIntervals.concat(state.intervals);
			state.downloadedIntervals = [];
		},
		setAuthorzation(state, authorzation) {
			state.authorization = authorzation;
		},
		setToken(state, token) {
			state.token = token;
		},
		setSummary(state, summary) {
			state.summary = summary;
		},
		flashSummary(state) {
			//难道我每次活动类别的更新都要重置我之前整理好的数据嘛？这样不好。
			//先删除没用的，再添加新的
			console.log("flashSummary");

			//删除多余的
			let keys = Object.keys(state.summary);
			if (keys.length != 0) {
				for (let key of keys) {
					let types_guid = state.types.filter((activity) => (!activity['id']) && (activity[
						'id'] == key));
					if (!types_guid) {
						delete state.summary[key];
					}
				}
			};

			//初始化与新增
			state.types.forEach((type) => {
				if (!type['group']) {
					let guid = type['id'];
					//！这两者之后居然没有关联！
					let activity_summary = state.summary[guid];
					if (activity_summary == undefined) {
						activity_summary = new Object();
						activity_summary.name = type['name'];
						activity_summary.days = new Object();
						activity_summary.weeks = new Object();
						activity_summary.months = new Object();
						activity_summary.years = new Object();
					}
					state.summary[guid] = activity_summary;
				}
			});
			//缓存
			//不该在这里写。
		},
		summarizing(state) {
			state.downloadedIntervals.forEach(function(interval) {
				//基本信息
				let guid = interval['type']['guid'];
				let activity_summary = state.summary[guid];
				let start = moment(interval['from'] * 1000);
				let over = moment(interval['to'] * 1000);
				let duration = interval['to'] - interval['from'];

				let start_year = start.format("YYYY");
				let start_week = start.format("YYYY-W");
				let start_month = start.format("YYYY-MM");
				let start_day = start.format("YYYY-MM-DD");

				let datetime_zero_point = null;

				if (start.date() != over.date()) {
					datetime_zero_point = moment([over.year(), over.month(), over.date()]).unix();
					duration = datetime_zero_point - start.unix();
				}
				//前提summary[activity_guid]已经存在

				let activity_days = state.summary[guid]['days'];
				let activity_weeks = state.summary[guid]['weeks'];
				let activity_months = state.summary[guid]['months'];
				let activity_years = state.summary[guid]['years'];

				//只是为了减少代码量，迫不得已这样写。以后可能看不懂。
				let x = new Object();
				//指向的会是同一个空间吗？
				x[start_day] = activity_days;
				x[start_week] = activity_weeks;
				x[start_month] = activity_months;
				x[start_year] = activity_years;

				let keys = Object.keys(x)
				for (let i = 0; i < keys.length; i++) {
					let v = keys[i];
					let k = x[v];
					k[v] = (k[v] || 0) + duration;
				}
				x = null;
				if (start.date() != over.date()) {

					let over_year = over.format("YYYY");
					let over_month = over.format("YYYY-MM");
					let over_week = over.format("YYYY-WW");
					let over_day = over.format("YYYY-MM-DD");
					duration = over.unix() - datetime_zero_point;

					let y = new Object();
					y[over_day] = activity_days;
					y[over_week] = activity_weeks;
					y[over_month] = activity_months;
					y[over_year] = activity_years;

					keys = Object.keys(y)
					for (let i = 0; i < keys.length; i++) {
						let v = keys[i];
						let k = y[v];
						k[v] = (k[v] || 0) + duration;
					}
					y = null;
				}
			});
		},
		check(state) {
			console.log("查看是否有interval重复");
			let y = [];
			for (let interval of state.intervals) {
				y.push(intervals['guid']);
			}
			console.log(y.length);
			console.log(Array.from(new Set(y)).length);
		}


	},
	actions: {
		test(context, activity){
			context.commit('addType1', activity);
		},
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
						context.commit('flashSummary');
						context.dispatch('saveTypes');
						context.dispatch('saveSummary');
					} else if (res.statusCode == 401) {

					} else {

					}
					console.log(res.statusCode);
					res = null;
				}
			});
		},
		_downloadIntervals(context, payload) {
			console.log("那么，我去下载咯");
			console.log(payload.from, payload.to);
			uni.request({
				url: 'https://app.atimelogger.com/api/v2/intervals',
				header: {
					'Authorization': payload.authorization
				},
				data: {
					"from": payload.from,
					"to": payload.to,
					"limit": 99
				},
				// 访问成功后
				success: (res) => {
					// 跳转页面
					if (res.statusCode == 200) {
						let intervals = res.data.intervals;
						if (intervals.length != 0) {
							console.log("下载成功！有数据：");
							console.log(intervals[0]['to'], intervals[intervals.length - 1][
								'from'
							]);
							context.commit('addIntervals', intervals);
							const last = intervals[0]['to'];
							const first = intervals[intervals.length - 1]['from'];

							intervals = null;
							if (first > payload.from && first < payload.to) {
								payload.to = first;
								context.dispatch('_downloadIntervals', payload);
								return;
							}
							console.log("--------结尾---------")
							context.commit('summarizing');
							context.dispatch('saveSummary');
							context.commit('merge');
							console.log("开始保存intervals");
							context.dispatch('saveIntervals');
							return;
						} else {
							console.log("已经是最新了！");
						}
					} else {
						//访问失败
					}
					console.log(res.statusCode);
					res = null;
				}
			})
		},
		sync(context) {
			const authorization = context.getters.getAuthorization;
			const last = context.getters.getLastRecord;
			console.log("获取last：", last);
			console.log('直接访问获取last:', context.state.intervals[0]);
			console.log(context.state.intervals);
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
				let year_2010 = moment([2021, 3]).unix();
				const payload = {
					from: year_2010,
					to: now,
					authorization
				}
				context.dispatch('_downloadIntervals', payload);
			}

		},
		saveTypes(context) {
			uni.setStorage({
				key: 'types',
				data: context.state.types,
				success: function() {
					console.log('types存储成功！');
				}
			});
		},
		saveIntervals(context) {
			if (context.state.intervals.length > 10000) {
				context.state.intervals.length = 10000;
			}
			uni.setStorage({
				key: 'intervals',
				data: context.state.intervals,
				success: function() {
					console.log('intervals存储成功！');
				}
			});
		},
		saveSummary(context) {
			console.log("saveSummary");
			uni.setStorage({
				key: 'summary',
				data: context.state.summary, //
				success: function() {
					console.log('summary存储成功！');
				}
			});
		},
	}

})

export default store;
