<template>
	<view>
		<h2>请输入atimelogger的账号和密码</h2>
		<u-field v-model="account" label="账号" placeholder="请填写账号" required>
		</u-field>

		</u-field>
		<u-field v-model="password" type="password" label="密码" placeholder="请填写密码" required>
		</u-field>
		<u-button type="primary" shape="square" :ripple="true" ripple-bg-color="#a0cfff" :custom-style="customStyle"
			@click="login()">
			登录
			<u-loading :show="waiting"></u-loading>
		</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: "",
				password: "",
				customStyle: {
					margin: '20px 50px'
				},
				waiting: false,
				authorization: "",
			}
		},
		methods: {
			showEmptyErrorMessage() {
				this.$refs.uToast.show({
					title: '未输入',
					type: 'error',
				})
			},
			showErrorMessage() {
				this.$refs.uToast.show({
					title: '登录失败',
					type: 'error',
				})
			},
			showSuccessMessage() {
				this.$refs.uToast.show({
					title: '登录成功',
					type: 'success',
					isTab: true,
					url: '/pages/tabbar/index/index'
				})
			},
			login() {
				if (!(this.account && this.password)) {
					this.showEmptyErrorMessage();
					return;
				}
				this.waiting = true;
				// 加密
				let auth = 'Basic ' + btoa(this.account + ":" + this.password);
				// 尝试访问atimelogge
				uni.request({
					url: 'https://app.atimelogger.com/api/v2/types',
					header: {
						'Authorization': auth
					},
					// 访问成功后
					success: (res) => {
						this.authorization = auth
						// 跳转页面
						if (res.statusCode == 200) {
							this.showSuccessMessage();
							// 保存authorization
							this.saveAuthorization();
							this.saveTypes(res.data.types);
							this.waiting = false;
						} else {
							this.showErrorMessage();
							this.waiting = false;
						}
						console.log(res.statusCode);
					}
				});
			},
			saveAuthorization() {
				uni.setStorage({
					key: 'authorization',
					data: this.authorization,
					success: function() {
						console.log('Authorization存储成功！');
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
			}
		}
	}
</script>

<style scoped>
	h2 {
		text-align: center;
		margin: 20px 0;
	}
</style>
