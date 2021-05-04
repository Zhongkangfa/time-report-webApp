<template>
	<view>
		<h2>请输入账号和密码</h2>
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
<!-- 		<u-button type="primary" shape="square" :ripple="true" ripple-bg-color="#a0cfff" :custom-style="customStyle"
			@click="register()">
			注册
			<u-loading :show="waiting"></u-loading>
		</u-button> -->
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
			register() {},
			login() {
				const data = {
					username: this.account,
					password: this.password,
				};
				this.waiting = true;
				uniCloud.callFunction({
					name: 'login',
					data,
					//回调函数
					success: (res) => {
						// 跳转页面
						if (res.result.code === 0) {
							console.log("登录成功！");
							uni.setStorageSync('uni_id_token', res.result.token)
							uni.setStorageSync('username', res.result.username)
							//之后需要访问云函数下载intervals和types
							this.showSuccessMessage();
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
