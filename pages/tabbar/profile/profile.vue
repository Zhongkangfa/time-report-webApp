<template>
	<view>
		<u-grid :col="3" >
			<u-grid-item @click="getTypes()">
				<u-icon name="arrow-downward" :size="46"></u-icon>
				<view class="grid-text">更新活动类型</view>
			</u-grid-item>
			<u-grid-item>
				<u-icon name="arrow-downward" :size="46"></u-icon>
				<view class="grid-text">同步时间记录</view>
			</u-grid-item>
			<u-grid-item>
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
				uni.getStorage({
					key: 'authorization',
					success: function(res) {
						this.authorization = res.data;
						
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
