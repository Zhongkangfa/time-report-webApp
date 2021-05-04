<template>
	<view>
		<u-notice-bar mode="horizontal" :list="list" :speed="100" font-size="20"></u-notice-bar>
		<u-search placeholder="日照香炉生紫烟" v-model="keyword" margin="15px"></u-search>
		<view class="u-margin-26">
			<u-icon name="clock" label="本周剩余时间"></u-icon>
			<u-line-progress class="" active-color="#2979ff" :percent="50" :striped="true" :striped-active="true">
			</u-line-progress>
		</view>
		<u-button @click="open">云函数</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
				list: [
					'寒雨连江夜入吴',
					'平明送客楚山孤',
					'洛阳亲友如相问',
					'一片冰心在玉壶'
				]
			}
		},
		onLoad() {},
		methods: {
			open(){
				uniCloud.callFunction({
					name:"addInterval",
					data:{
						name:"张三"
					},
					success(res){
						console.log("访问成功：",res);
					},
					fail(err) {
						console.log("访问失败：",err);
					}
				})
			}

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
