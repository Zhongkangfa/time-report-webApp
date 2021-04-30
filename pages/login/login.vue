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
			}
		},
		methods: {
			login() {
				const that = this;
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
						// 跳转页面
						if (res.statusCode == 200) {
							this.$store.commit('setAuthorzation', auth);
							this.showSuccessMessage();
							// 保存authorization
							this.saveAuthorization(auth);
							this.$store.commit('setTypes', res.data.types);
							this.$store.commit('flashSummary');//相当于setSummary了
							this.$store.dispatch('saveSummary');
							this.$store.dispatch('sync');
							this.$store.dispatch('saveTypes');
						} else if (res.statusCode == 401) {
							this.showAuthorizationErrorMessage();
						} else {
							this.showErrorMessage(res.statusCode);
						}
						this.waiting = false;
						console.log(res.statusCode);
					}
				});
			},
			saveAuthorization(auth) {
				uni.setStorage({
					key: 'authorization',
					data: auth,
					success: function() {
						console.log('Authorization存储成功！');
					}
				});
			},
			showEmptyErrorMessage() {
				this.$refs.uToast.show({
					title: '未输入',
					type: 'error',
				})
			},
			showAuthorizationErrorMessage() {
				this.$refs.uToast.show({
					title: '账号或密码错误！',
					type: 'error',
				})
			},
			showErrorMessage(statusCode) {
				this.$refs.uToast.show({
					title: '登录失败: ' + statusCode,
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

		}
	}
</script>

<style scoped>
	h2 {
		text-align: center;
		margin: 20px 0;
	}
</style>
