<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			initAuth() {
				const that = this;
				uni.getStorage({
					key: 'authorization',
					success: function(res) {
						that.$store.commit('setAuthorzation', res.data);
					},
					fail(err) {
						uni.navigateTo({
							url: '/pages/login/login'
						});
					}
				});
			},
			initTypes() {
				const that = this;
				uni.getStorage({
					key: 'types',
					success: function(res) {
						that.$store.commit('setTypes', res.data);
					},
					fail(err) {
						// uni.navigateTo({
						//     url: '/pages/login/login'
						// });
					}
				});
			},
			initIntervals() {
				console.log("来到initIntervals");
				const that = this;
				uni.getStorage({
					key: 'intervals',
					success: function(res) {
						that.$store.commit('setIntervals', res.data);
					},
					fail(err) {
						that.$store.dispatch('sync');
						// that.$store.dispatch('saveIntervals');
					}
				});
			}
		},
		destroyed() {

		},
		onLaunch: function() {
			console.log("app launch");
			this.initAuth();
			if (this.$store.state.authorization != 0) {
				console.log("加载Types");
				this.initTypes();
				console.log("加载Intervals");
				this.initIntervals();
			}
		},
		onShow: function() {

		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
