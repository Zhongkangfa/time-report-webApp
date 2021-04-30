<template>
	<view>
		<u-grid :col="3">
			<u-grid-item @click="updateTypes()">
				<u-icon name="arrow-downward" :size="46"></u-icon>
				<view class="grid-text">更新活动类型</view>
			</u-grid-item>
			<u-grid-item @click="sync()">
				<u-icon name="arrow-downward" :size="46"></u-icon>
				<view class="grid-text">同步时间记录</view>
			</u-grid-item>
			<u-grid-item @click="test()">
				<u-icon name="hourglass" :size="46"></u-icon>
				<view class="grid-text">沙漏</view>
			</u-grid-item>
			<u-grid-item @click="clear()">
				<u-icon name="hourglass" :size="46"></u-icon>
				<view class="grid-text">清除缓存</view>
			</u-grid-item>
			<u-grid-item @click="saveSummary()">
				<u-icon name="hourglass" :size="46"></u-icon>
				<view class="grid-text">保存Summary</view>
			</u-grid-item>
			<u-grid-item @click="summarizing()">
				<u-icon name="hourglass" :size="46"></u-icon>
				<view class="grid-text">Summarizing</view>
			</u-grid-item>
			<u-grid-item @click="flashSummary()">
				<u-icon name="hourglass" :size="46"></u-icon>
				<view class="grid-text">flashSummary</view>
			</u-grid-item>
		</u-grid>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authorization: ""
			}
		},
		onShow() {
		},
		onLoad() {
			
		},
		methods: {
			clear(){
				uni.clearStorage();
			},
			updateTypes(){
				this.$store.dispatch('downloadTypes');
			},
			test(){
				// console.log(this.$store.state.authorization);
				// console.log(this.$store.state.types);
				console.log(this.$store.state.intervals);
				console.log(this.$store.state.summary);
			},
			summarizing(){
				this.$store.commit('summarizing', this.$store.state.intervals);
			},
			flashSummary(){
				this.$store.commit('flashSummary');
			},
			saveSummary(){
				this.$store.dispatch('saveSummary');
			},
			sync(){
				this.$store.dispatch('sync');
			},
			showErrorMessage() {
				this.$refs.uToast.show({
					title: '获取失败',
					type: 'error',
				})
			},
			showSuccessMessage() {
				this.$refs.uToast.show({
					title: '获取成功',
					type: 'success'
				})
			},
			getAuthorization() {
				const that = this;
				let authorzation;
				uni.getStorage({
					key: 'authorization',
					success: function(res) {
						that.authorization = res.data;
						authorzation = res.data;
					},
					fail(err) {
						uni.navigateTo({
							url: '/pages/login/login'
						});
					}
				});
				return authorzation;
			},
			saveTypes(types) {
				const parsed = JSON.stringify(types);
				uni.setStorage({
					key: 'types',
					data: parsed,
					success: function() {
						console.log('types存储成功！');
					}
				});
			},

			saveIntervals(intervals) {
				const that = this;
				uni.setStorage({
					key: 'intervals',
					data: intervals,
					success: function() {
						console.log('intervals存储成功！');
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>
