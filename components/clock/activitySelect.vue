<template>
	<view class="">
		<activity-item v-for="Activity in rootActivity" :item="Activity" :key="Activity['id']" :colorNumber="0" v-on:ActivityActioned="$emit('activitySelected', $event)"></activity-item>
	</view>
</template>

<script>
	import activityItem from './activityItem.vue'
	export default {
		name: "activitySelect",
		components: {
			"activity-item": activityItem
		},
		data() {
			return {

			}
		},
		computed: {
			rootActivity: function() {
				console.log(this.$store.getters.getRootActivity);
				return this.$store.getters.getRootActivity;
			}
		},
		methods: {}
	}
</script>

<style>
</style>
