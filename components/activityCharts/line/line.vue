<template>
	<view>
		<h3 style="text-align: center;">{{title}}</h3>
		<view class="charts-box">
			<qiun-data-charts type="line" :chartData="chartData" background="none" :animation="false" />
		</view>
		<view>
			<u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
			<view class="u-flex u-flex-nowrap u-row-center u-margin-26" style="text-align: center;">
				<u-icon class="u-flex-1" label-pos="bottom" size="50" name="arrow-leftward"
					@click="leftOrRight('left')"></u-icon>
				<u-icon class="u-flex-1" label-pos="bottom" size="50" name="search" @click="show = true"></u-icon>
				<u-icon class="u-flex-1" label-pos="bottom" size="50" name="calendar"></u-icon>
				<u-icon class="u-flex-1" label-pos="bottom" size="50" name="arrow-rightward"
					@click="leftOrRight('right')"></u-icon>
			</view>
			<u-grid :col="3">
				<u-grid-item>
					<u-count-to :start-val="0.00" :end-val="9.00" :decimals="2" :duration="3000"></u-count-to>
					<view class="grid-text">平均值</view>
				</u-grid-item>
				<u-grid-item>
					<u-count-to :start-val="0.00" :end-val="8.10" :decimals="2" :duration="3000"></u-count-to>
					<view class="grid-text">中位数</view>
				</u-grid-item>
				<u-grid-item>
					<u-count-to :start-val="0.00" :end-val="8.10" :decimals="2" :duration="3000"></u-count-to>
					<view class="grid-text">本周最大值</view>
				</u-grid-item>
				<u-grid-item>
					<u-count-to :start-val="0.00" :end-val="8.10" :decimals="2" :duration="3000"></u-count-to>
					<view class="grid-text">本周最低值</view>
				</u-grid-item>
				<u-grid-item>
					<u-count-to :start-val="30" :end-val="500" :duration="3000"></u-count-to>
					<view class="grid-text">今年累计</view>
				</u-grid-item>
				<u-grid-item>
					<view class="u-flex">
						<u-count-to :start-val="0" :end-val="70" :duration="3000"></u-count-to>
						<p>%</p>
					</view>
					<view class="grid-text">目标达成率</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	export default {
		mounted() {
			console.log("触发");
			this.chartData = this.setChartData(1, 3);
			console.log(typeof this.chartData);
		},
		data() {
			return {
				chartData: {},
				dateType: 1,
				title: "最近3天",
				show: false,
				list: [{
						value: 1,
						label: '最近几天',
						children: [{
								value: 3,
								label: '3天'
							},
							{
								value: 5,
								label: '5天'
							},
							{
								value: 15,
								label: '15天'
							},
							{
								value: 30,
								label: '30天'
							}
						]
					},
					{
						value: 2,
						label: '最近几周',
						children: [{
								value: 5,
								label: '5周'
							},
							{
								value: 15,
								label: '15周'
							},
							{
								value: 52,
								label: '整年'
							}
						]
					},
					{
						value: 3,
						label: '最近几月',
						children: [{
								value: 3,
								label: '3月'
							},
							{
								value: 6,
								label: '6月'
							},
							{
								value: 12,
								label: '12月'
							}
						]
					},
					{
						value: 4,
						label: '最近几年',
						children: [{
								value: 3,
								label: '3年'
							},
							{
								value: 5,
								label: '5年'
							},
							{
								value: 10,
								label: '10年'
							},
						]
					}
				],
			}
		},
		props: {
			activityName: String,
			days: {
				type: Object,
				required: true
			},
			weeks: {
				type: Object,
				required: true
			},
			months: {
				type: Object,
				required: true
			},
			years: {
				type: Object,
				required: true
			}
		},
		methods: {
			confirm(e) {
				let dateType = e[0].value;
				let long = e[1].value;
				this.chartData = this.setChartData(dateType, long)
				console.log(this.chartData);
			},
			setChartData(dateType, long) {
				let x = [];
				let y = [];
				let now = moment();
				this.dateType = dateType;
				switch (dateType) {
					case 1:
						//按天汇总
						x.push(now.format("YYYY-MM-DD"));
						for (let i = 1; i < long; i++) x.push(now.subtract(1, 'd').format("YYYY-MM-DD"));
						for (const day of x) {
							if (this.days[day] != undefined) {
								y.push(Math.round(this.days[day] / 360) / 10);
							} else {
								y.push(0);
							}
						}
						break;
					case 2:
						// 按周汇总
						x.push(now.format("YYYY-WW"));
						for (let i = 1; i < long; i++) x.push(now.subtract(1, 'w').format("YYYY-WW"));
						for (const week of x) {
							if (this.weeks[week] != undefined) {
								y.push(Math.round(this.weeks[week] / 360) / 10);
							} else {
								y.push(0);
							}
						}
						break;
					case 3:
						// 按月汇总
						x.push(now.format("YYYY-MM"));
						for (let i = 1; i < long; i++) x.push(now.subtract(1, 'M').format("YYYY-MM"));
						for (const month of x) {
							if (this.months[month] != undefined) {

								y.push(Math.round(this.months[month] / 360) / 10);
							} else {
								y.push(0);
							}
						}
						break;
					case 4:
						// 按年汇总
						x.push(now.format("YYYY"));
						for (let i = 1; i < long; i++) x.push(now.subtract(1, 'y').format("YYYY"));
						for (const year of x) {
							if (this.years[year] != undefined) {
								y.push(Math.round(this.years[year] / 360) / 10);
							} else {
								y.push(0);
							}
						}
						break;
				}
				this.title = x[x.length - 1] + "至" + x[0];
				return {
					"categories": x,
					"series": [{
						"name": this.activityName,
						"data": y,
						style: 'curve',
					}]
				}
			},
			leftOrRight(direction) {
				// 程序可以改进
				let old_x = this.chartData['categories'];
				let x = [];
				let y = [];
				let pace = 1;
				let max = moment();
				let min = moment([2010]);
				if (direction == "left") {
					pace = -1
				};

				switch (this.dateType) {
					case 1:
						for (let date of old_x) {
							let new_date = moment(date, "YYYY-MM-DD").add(pace, 'd');
							if (new_date > max || new_date < min) {
								return;
							}
							let new_date_str = new_date.format("YYYY-MM-DD");
							x.push(new_date_str);
							if (this.days[new_date_str] != undefined) {
								y.push(Math.round(this.days[new_date_str] / 360) / 10);
							} else {
								y.push(0);
							}
						}
						break;
					case 2:
						for (let date of old_x) {
							let new_date = moment(date, "YYYY-WW").add(pace, 'w');
							if (new_date > max || new_date < min) {
								return;
							}
							let new_date_str = new_date.format("YYYY-WW");
							x.push(new_date_str);
							if (this.weeks[new_date_str] != undefined) {
								y.push(Math.round(this.weeks[new_date_str] / 360) / 10);
							} else {
								y.push(0);
							}
						}
						break;
					case 3:
						for (let date of old_x) {
							let new_date = moment(date, "YYYY-MM").add(pace, 'M');
							if (new_date > max || new_date < min) {
								return;
							}
							let new_date_str = new_date.format("YYYY-MM");
							x.push(new_date_str);
							if (this.months[new_date_str] != undefined) {
								y.push(Math.round(this.months[new_date_str] / 360) / 10);
							} else {
								y.push(0);
							}
						}
						break;
					case 4:
						for (let date of old_x) {
							let new_date = moment(date, "YYYY").add(pace, 'y');
							if (new_date > max || new_date < min) {
								return;
							}
							let new_date_str = new_date.format("YYYY");
							x.push(new_date_str);
							if (this.months[new_date_str] != undefined) {
								y.push(Math.round(this.months[new_date_str] / 360) / 10);
							} else {
								y.push(0);
							}
						}
						break;
				}
				this.title = x[x.length - 1] + "至" + x[0];
				this.chartData = {
					"categories": x,
					"series": [{
						"name": this.activityName,
						"data": y,
						style: 'curve',
					}]
				}
			},
		}
	}
</script>

<style>
	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>
