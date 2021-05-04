<template>
	<view class="u-margin-26">
		<u-icon name="clock" :label="label"></u-icon>
		<u-line-progress class="" :active-color="activeColor" :percent="percent" :striped="true" :striped-active="true">
		</u-line-progress>
	</view>
</template>

<script>
	export default {
		name: "timeProgress",
		data() {
			return {

			}
		},
		props:{
			label: String,
			percent: Number,
			activeColor: String
		}
		methods: {},
		components: {}
	}
</script>

<style>
</style>
