<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			initAuth() {
				let token = uni.getStorageSync('uni_id_token');
				if(token){
				this.$store.commit('setToken', token);
				}else{
					uni.navigateTo({
					    url: 'pages/login/login'
					});
				}
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
			if (this.$store.state.token != "") {
				// console.log("加载Types");
				// this.initTypes();
				// console.log("加载Intervals");
				// this.initIntervals();
				// this.initSummary();
			}else{
				
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
