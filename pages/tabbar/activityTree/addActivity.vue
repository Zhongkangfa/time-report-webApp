<template>
	<view class="u-margin-26">
		<u-form :model="form" ref="uForm">


			<u-form-item>
				<u-checkbox v-model="isgroup.checked" :name=" isgroup.name">
					{{ isgroup.name }}
				</u-checkbox>
			</u-form-item>

			<!-- 在表单验证时，需要绑定prop参数 -->
			<u-form-item label="名称" prop="name">
				<u-input v-model="form.name" />
			</u-form-item>


		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				parentId: null,
				form: {
					name: "",
				},
				isgroup: {
					name: '组群',
					checked: false
				},
				rules: {
					name: [{
						required: true,
						max: 20,
						message: '请输入名称',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur']
					}]
				}
			}
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						uniCloud.callFunction({
							name: 'addType',
							data: {
								name: this.form.name,
								group: this.isgroup.checked
							},
							success: (res) => {
								console.log(res);
								if (res.result.id != null) {
									console.log("进来了？");
									let activity = {
										"id": res.result.id,
										"name": this.form.name,
										"group": this.isgroup.checked,
										"parent": this.parentId
									};
									this.$store.commit('addType', activity);
									uni.navigateBack();
								} else if (res.result.code === 30203) {
									console.log(res.result.msg);
									uni.reLaunch({
										url: '/pages/login/login'
									})
								} else {
									console.log(res.result.msg);
								}
							},
							fail: (err) => {}
						});
					} else {
						console.log('验证失败');
					}
				});
				return;
			},
		},
		onReady() {
			console.log("触发onReady");
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(option) {
			this.parentId = option.parentId;
		}
	}
</script>

<style>

</style>
