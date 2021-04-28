<template>
	<view>
		<u-grid :col="3" >
			<u-grid-item @click="getTypes()">
				<u-icon name="arrow-downward" :size="46"></u-icon>
				<view class="grid-text">更新活动类型</view>
			</u-grid-item>
			<u-grid-item @click="getIntervals(1610090945, 1619093668)">
				<u-icon name="arrow-downward" :size="46"></u-icon>
				<view class="grid-text">同步时间记录</view>
			</u-grid-item>
			<u-grid-item @click="getLastInterval()">
				<u-icon name="hourglass" :size="46"></u-icon>
				<view class="grid-text">沙漏</view>
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
		onLoad() {
			this.getAuthorization();
		},
		methods: {
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
				uni.getStorage({
					key: 'authorization',
					success: function(res) {
						that.authorization = res.data;
					},
					fail(err) {
						uni.navigateTo({
							url: '/pages/login/login'
						});
					}
				});
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
			getTypes() {
				// 尝试访问atimelogge
				console.log(this.authorization);
				uni.request({
					url: 'https://app.atimelogger.com/api/v2/types',
					header: {
						'Authorization': this.authorization
					},
					// 访问成功后
					success: (res) => {
						if (res.statusCode == 200) {
							this.showSuccessMessage();
							// 保存authorization
							this.saveTypes(res.data.types);
						} else {
							console.log(res.statusCode);
							this.showErrorMessage();
						}
					}
				});
			},
			getIntervals(from, to){
				if(!this.authorzation){
					this.getAuthorization();
				}
				// 尝试访问atimelogge，获取本地仓库没有的intervals
				uni.request({
					url: 'https://app.atimelogger.com/api/v2/intervals',
					header: {
						'Authorization': this.authorization
					},
					data:{
						from,
						to,
						"limit": 999
					},
					// 访问成功后
					success: (res) => {
						// 跳转页面
						if (res.statusCode == 200) {
							console.log(res.data.intervals);
							this.saveIntervals(res.data.intervals)
							this.showSuccessMessage();
						} else {
						}
					}
				});
			},
			saveIntervals(intervals){
				const that = this;
				uni.setStorage({
					key: 'intervals',
					data: intervals,
					success: function() {
						console.log('intervals存储成功！');
					}
				});
			},
			getLastInterval(){
				uni.getStorage({
					key: 'intervals',
					success: function(res) {
						let intervals = res.data
						return intervals[0];
						//进行初始化
					}
					})
			}
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
