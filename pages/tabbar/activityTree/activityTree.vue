<template>
	<view>
		<u-cell-group>
			<ul style="list-style-type: none;margin:0;padding:0;">
				<clock v-for="(activityClock, index) in clocks" @clockend="getIntervals($event)" @stopOther="pauseOtherClocks" :pauseTime="activityClock['pauseTime']"
					:ActivityName="activityClock['name']" :ActivityId="activityClock['id']" :key="activityClock['id'] + index" :num="index"></clock>
				<activity-item v-for="Activity in rootActivity" :item="Activity" :key="Activity['id']" :colorNumber="0"
					@ActivityActioned="createdClock">
				</activity-item>
				<u-cell-item @click="addActivity()" :title="'添加'" :icon="'plus'" :arrow="false" bg-color="#f4f4f5">
				</u-cell-item>
			</ul>
		</u-cell-group>
	</view>
</template>

<script>
	import activityItem from 'pages/tabbar/activityTree/activityItem.vue'
	import clock from '../../../components/clock/clock.vue';
	export default {
		components: {
			"activity-item": activityItem,
			"clock": clock,
		},
		data() {
			return {
				clocks: []
			}
		},
		methods: {
			pauseOtherClocks(event){
				//所有其他的计时器都通知一遍
				for(let i in this.clocks){
					if(i == event['index']){continue}
					this.clocks[i]['pauseTime'] = event['pauseTime'];
				}
			},
			createdClock(event) {
				this.clocks.push(event);
			},
			getIntervals(clockInfo) {
				console.log(clockInfo['id']);
				console.log(clockInfo['intervals']);
				this.clocks.splice(clockInfo['num'], 1);
				console.log(this.clocks);
			},
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
