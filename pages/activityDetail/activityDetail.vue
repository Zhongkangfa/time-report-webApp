<template>
	<view>
		<h3>折线图</h3>
		<line-chart :activityName="activity['name']" :days="days" :weeks="weeks" :months="months" :years="years">
		</line-chart>
		<u-line color="red" />
		<h3>活动每次持续时间分布</h3>
		<view class="charts-box">
			<qiun-data-charts type="rose" :chartData="chartData2" background="none" :animation="false" />
		</view>
		<u-line color="red" />
		<h3>活动备注词云</h3>
		<view class="charts-box">
			<qiun-data-charts type="word" :chartData="chartData3" background="none" :animation="false" />
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	import lineChart from '../../components/activityCharts/line/line.vue';
	export default {
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			let guid = option.guid;
			this.activity = this.$store.getters.getActivity(guid);
			this.days = this.$store.state.summary[guid].days;
			this.weeks = this.$store.state.summary[guid].weeks;
			this.months = this.$store.state.summary[guid].months;
			this.years = this.$store.state.summary[guid].years;
		},
		components: {
			lineChart
		},
		data() {
			return {
				activity: Object,
				days: Object,
				weeks: Object,
				months: Object,
				years: Object,
				chartData2: {
					"series": [{
						"data": [{
								"name": "一班",
								"value": 50
							},
							{
								"name": "二班",
								"value": 30
							},
							{
								"name": "三班",
								"value": 20
							},
							{
								"name": "四班",
								"value": 18
							},
							{
								"name": "五班",
								"value": 8
							}
						]
					}]
				},
				chartData3: {
					"series": [{
							"name": "跨全端图表",
							"textSize": 25
						},
						{
							"name": "微信小程序",
							"textSize": 20
						},
						{
							"name": "支付宝小程序",
							"textSize": 20
						},
						{
							"name": "百度小程序",
							"textSize": 20
						}
					]
				}
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
	h3{
		text-align: center;
		margin-top: 20px;
	}
</style>
