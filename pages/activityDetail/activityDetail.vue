<template>
	<view>
		<view class="charts-box">
			<qiun-data-charts type="line" :chartData="chartData" background="none" :animation="false" />
		</view>
		<u-button shape="square" @click='check()'>乌啼</u-button>
	</view>
</template>

<script>
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
				x: ["2020-1", "2020-2", "2020-3", "2020-4"]
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
			}
		},
		methods: {
			getDay(day) {
				return Math.round(this.days[day] / 3600);
			},
			getWeek(week){
				return Math.round(this.weeks[week] / 3600);
			},
			getMonth(month) {
				return Math.round(this.months[month] / 3600);
			},
			getYear(year) {
				return Math.round(this.years[year] / 3600);
			},
			check(){
				console.log(this.days);
				console.log(this.weeks);
				console.log(this.months);
				console.log(this.years);
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
