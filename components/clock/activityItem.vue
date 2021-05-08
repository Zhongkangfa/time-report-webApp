<template>
	<view>
		<li>
			<u-cell-item @click="item['group']? toggle(): select()" :title="item['name']" :arrow="false"
				:bg-color="getColor(colorNumber)" :icon="item['group']? 'list': ''"></u-cell-item>

			<ul v-if="item['group']" v-show="isOpen">
				<activity-item v-if="isFolder" class="item" v-for="activity in childrenActivity" :item="activity"
					:key="activity['id']" :colorNumber="getColorNumber"
					v-on:ActivityActioned="$emit('ActivityActioned', $event)">
				</activity-item>
			</ul>
		</li>
	</view>
</template>

<script>
	export default {
		name: "activity-item",
		data() {
			return {
				isOpen: false,
				colorList: ['#faebeb', '#ebf0fa', '#f3ebfa', '#ebfaf8'],
			}
		},
		props: {
			item: Object,
			colorNumber: 0
		},
		computed: {
			childrenActivity: function() {
				return this.$store.getters.getActivityChildren(this.item['id'])
			},
			// 如果有children数组,就渲染<ul>
			isFolder: function() {
				return this.childrenActivity && this.childrenActivity.length;
			},
			getColorNumber: function() {
				if (this.isFolder) {
					let newColorNumber = this.colorNumber + 1;
					if (newColorNumber > this.colorList.length - 1) {
						newColorNumber = 0;
					}
					return newColorNumber;
				} else {
					return this.colorNumber;
				}
			}
		},
		methods: {
			select() {
				this.$emit('ActivityActioned', {
					"name": this.item['name'],
					"id": this.item['id']
				});
			},
			getColor: function() {
				return this.colorList[this.colorNumber];
			},
			toggle: function() {
				if (this.item['group']) {
					this.isOpen = !this.isOpen;
				}
			},
		},
	}
</script>

<style scoped>
	ul {
		padding-left: 1em;
		line-height: 1.5em;
		list-style-type: none;
	}
</style>
