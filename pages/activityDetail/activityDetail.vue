<template>
	<view>
		<view>
			<view class="u-flex u-row-center">
				<u-button shape="square">
					<u-icon name="arrow-leftward"></u-icon>
				</u-button>
				<u-subsection class="u-flex-1" @change="toggle" :list="list" :current="1" mode="subsection"
					button-color="#555555"></u-subsection>
				<u-button shape="square">
					<u-icon name="arrow-rightward"></u-icon>
				</u-button>
			</view>
		</view>
		<view class="charts-box">
			<qiun-data-charts type="line" :chartData="currentSevenDay" background="none" :animation="false" />
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	export default {
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			let guid = option.guid;
			this.activity = this.$store.getters.getActivity(guid);
			this.days = this.$store.state.summary[guid].days;
			this.weeks = this.$store.state.summary[guid].weeks;
			this.months = this.$store.state.summary[guid].months;
			this.years = this.$store.state.summary[guid].years;
		},
		data() {
			return {
				activity: Object,
				days: Object,
				weeks: Object,
				months: Object,
				years: Object,
				list: ['日', '周', '月', '年'],
				current: 0,
			}
		},
		computed: {
			chartData: function() {
				let data = {
					"categories": this.x,
					"series": [{
						"name": this.activity['name'],
						"data": [1, 2, 3, 4]
					}]
				};
				return data;
			},
			currentSevenDay() {
				//x轴
				let x = [];
				let today = moment();
				x.push(today.format("YYYY-MM-DD"));
				for (let i = 0; i < 7; i++) {
					x.push(today.subtract(1, 'd').format("YYYY-MM-DD"));
				}

				//y轴
				let y = [];
				for (let j = 0; j < x.length; j++) {
					y.push(this.getDay(x[j]));
				}
				return {
					"title": '最近7天',
					"categories": x,
					"series": [{
						"name": this.activity['name'],
						"data": y
					}]
				};
			},
			currentMonthByDay() {
				//x轴
				let x = [];
				let today = moment();
				x.push(today.format("YYYY-MM-DD"));
				let end = today.endOf('month').day();
				for (let i = 0; i < end; i++) {
					x.push(today.subtract(1, 'd').format("YYYY-MM-DD"));
				}
				console.log(x);

				//y轴
				let y = [];
				for (let j = 0; j < x.length; j++) {
					y.push(this.getDay(x[j]));
				}
				return {
					"categories": x,
					"series": [{
						"name": this.activity['name'],
						"data": y
					}]
				};
			},
			currentThirtyDay() {
				//x轴
				let x = [];
				let today = moment();
				x.push(today.format("YYYY-MM-DD"));
				for (let i = 0; i < 30; i++) {
					x.push(today.subtract(1, 'd').format("YYYY-MM-DD"));
				}

				//y轴
				let y = [];
				for (let j = 0; j < x.length; j++) {
					y.push(this.getDay(x[j]));
				}
				return {
					"categories": x,
					"series": [{
						"name": this.activity['name'],
						"data": y,
						style: 'curve',
					}]
				};
			}
		},
		methods: {
			getDay(day) {
				//this.days[day] / 3600 *10 简化为 this.days[day] / 360
				return Math.round(this.days[day] / 360) / 10;
			},
			getWeek(week) {
				return Math.round(this.weeks[week] / 360) / 10;
			},
			getMonth(month) {
				return Math.round(this.months[month] / 360) / 10;
			},
			getYear(year) {
				return Math.round(this.years[year] / 360) / 10;
			},
			check() {
				console.log(this.days);
				console.log(this.weeks);
				console.log(this.months);
				console.log(this.years);
			},
			getCurrentDays() {

			},
			toggle(index) {
				console.log(index);
				switch (index) {
					case 0:
						//查询最近一月的数据


				}
			}
		},
	}
</script>

<style>
	/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>
