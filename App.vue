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
				uni.getStorage({
					key: 'types',
					success: (res) => {
						this.$store.commit('setTypes', res.data);
					},
					fail: (err) => {

					}
				});
			},
			initIntervals() {
				console.log("来到initIntervals");
				uni.getStorage({
					key: 'intervals',
					success: (res) => {
						this.$store.commit('setIntervals', res.data);
					},
					fail: (err) => {
						this.$store.dispatch('sync');
					}
				});
			},
			initSummary() {
				uni.getStorage({
					key: 'summary',
					success: (res) => {
						this.$store.commit('setSummary', res.data);
					},
					fail: (err) => {
						// this.$store.dispatch('sync');
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
				this.initSummary();
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
