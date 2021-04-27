<template>
	<view class="content">
		<!-- <u-action-sheet :list="list" v-model="show"></u-action-sheet> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
			uni.getStorage({
				key: 'authorization',
				success: function(res) {
					console.log("有数据！");
					//进行初始化
				},
				fail(err) {
					uni.navigateTo({
					    url: '/pages/login/login'
					});
				}
			});
		},
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
