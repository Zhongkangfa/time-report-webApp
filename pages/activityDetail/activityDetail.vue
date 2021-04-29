<template>
	<view>

	</view>
</template>

<script>
	export default {
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.activity = this.$store.getters.getActivity(option.guid);
		},
		data() {
			return {
				activity: ""
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
