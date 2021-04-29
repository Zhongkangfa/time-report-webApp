<template>
	<view>
		<u-cell-group>
			<ul style="list-style-type: none;margin:0;padding:0;">
				<activity-item v-for="Activity in rootActivity" :item="Activity" :key="Activity['guid']"
					:colorNumber="0"></activity-item>
			</ul>
		</u-cell-group>
	</view>
</template>

<script>
	import activityItem from 'pages/tabbar/activityTree/activityItem.vue'
	export default {
		components: {
			"activity-item": activityItem
		},
		data() {
			return {}
		},
		methods: {

		},
		computed: {
			rootActivity: function() {
				return this.$store.getters.getRootActivity;
			}
		},
		onLoad() {

		}
	}
</script>

<style>

</style>
