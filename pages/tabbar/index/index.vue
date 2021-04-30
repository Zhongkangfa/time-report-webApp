<template>
	<view class="content">
		<!-- <view class="charts-box">
		  <qiun-data-charts
		    type="line"
		    :chartData="chartData"
		    background="none"
		    :animation="false"
		  />
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chartData: {
					"categories": [
						"2016",
						"2017",
						"2018",
						"2019",
						"2020",
						"2021"
					],
					"series": [{
							"name": "成交量A",
							"data": [
								35,
								8,
								25,
								37,
								4,
								20
							]
						},
						{
							"name": "成交量B",
							"data": [
								70,
								40,
								65,
								100,
								44,
								68
							]
						},
						{
							"name": "成交量C",
							"data": [
								100,
								80,
								95,
								150,
								112,
								132
							]
						}
					]
				}
			}
		},
		onLoad() {},
		methods: {

		}
	}
</script>

<style>
	.content {}

	/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>
