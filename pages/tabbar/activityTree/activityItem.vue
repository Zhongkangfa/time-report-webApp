<template>
	<view>
		<li>
			<!-- 父节点 -->
			<u-cell-item @click="toggle" :title="item['name']" :arrow="false" :bg-color="getColor(colorNumber)"
				:icon="isFolder? 'list': ''">
				<div v-if="!isFolder">
					<u-button @click="toActivityDetailPage()" :custom-style="customStyle" size="mini" :ripple="true">详情</u-button>
				</div>
			</u-cell-item>
			<!-- 子节点 -->
			<ul v-if="isFolder" v-show="isOpen">
				<activity-item class="item" v-for="activity in childrenActivity" :item="activity"
					:key="activity['guid']" :colorNumber="getColorNumber">
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
				customStyle: {
					marginRight: '0px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					color: '#c8c9cc',
					// "font-weight": 0,
					// 'font-size': '5px'
				}

			}
		},
		props: {
			item: Object,
			colorNumber: 0
		},
		computed: {
			childrenActivity: function() {
				return this.$store.getters.getActivityChildren(this.item['guid'])
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
			getColor: function() {
				return this.colorList[this.colorNumber];
			},
			toggle: function() {
				if (this.isFolder) {
					this.isOpen = !this.isOpen;
				}
			},
			toActivityDetailPage: function(){
				uni.navigateTo({
				    url: '../../activityDetail/activityDetail?guid=' + this.item['guid']
				});
			}
		},
	}
</script>

<style scoped>
	.item {
		cursor: pointer;
	}

	.bold {
		font-weight: bold;
	}

	ul {
		padding-left: 1em;
		line-height: 1.5em;
		list-style-type: none;
	}
</style>
