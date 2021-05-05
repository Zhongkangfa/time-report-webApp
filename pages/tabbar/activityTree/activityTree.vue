<template>
	<view>
		<u-cell-group>
			<ul style="list-style-type: none;margin:0;padding:0;">
				<activity-item v-for="Activity in rootActivity" :item="Activity" :key="Activity['id']"
					:colorNumber="0"></activity-item>
				<u-cell-item @click="addActivity()"  :title="'添加'" :icon="'plus'" :arrow="false" bg-color="#f4f4f5"></u-cell-item>
			</ul>
		</u-cell-group>
	</view>
</template>

<script>
	import activityItem from 'pages/tabbar/activityTree/activityItem.vue'
	export default {
		components: {
			"activity-item": activityItem
		},
		data() {
			return {}
		},
		methods: {
			addActivity() {
				//需要填写：是不是group，名称
				//跳转页面、
				console.log("触发！");
				uni.navigateTo({
				    url: '/pages/tabbar/activityTree/addActivity'
				});
			}

		},
		computed: {
			rootActivity: function() {
				console.log(this.$store.getters.getRootActivity);
				return this.$store.getters.getRootActivity;
			}
		},
		onLoad() {

		}
	}
</script>

<style>

</style>
