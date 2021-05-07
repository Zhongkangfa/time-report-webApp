<template>
	<view>
		<li>
			<!-- 父节点 -->
			<u-cell-item @click="toggle" :title="item['name']" :arrow="false" :bg-color="getColor(colorNumber)"
				:icon="item['group']? 'list': ''">

				<u-icon v-if="!item['group']" v-show="!isStart" class="u-m-r-20" name="play-right-fill" color="#999"
					label="开始" label-color="#999" label-pos="bottom" label-size="20" size="20" margin-top="12"
					@click="action"></u-icon>
				<u-icon v-if="!item['group']" v-show="isStart" class="u-m-r-20" name="pause" color="#999" label="暂停"
					label-color="#999" label-pos="bottom" label-size="20" size="20" margin-top="12" @click="action">
				</u-icon>
				<u-icon v-if="!item['group']" class="u-m-r-20" name="checkmark" color="#999" label="结束"
					label-color="#999" label-pos="bottom" label-size="20" size="20" margin-top="12" @click="finished">
				</u-icon>
				<u-icon v-if="!item['group']" class="u-m-r-20" name="order" color="#999" label="统计" label-color="#999"
					label-pos="bottom" label-size="20" size="20" margin-top="12" @click="toActivityDetailPage">
				</u-icon>
				<u-icon v-if="!item['group']" class="u-m-r-20" name="trash-fill" color="#dd6161" label="删除"
					label-color="#dd6161" label-pos="bottom" label-size="20" size="20" margin-top="12"
					@click="deleteActivity">
				</u-icon>
				<!-- u-icon无法解决事件冒泡问题，改用u-button -->
				<u-button v-if="item['group']" @click.stop="toActivityDetailPage" size="mini" type="primary"
					shape="circle" :plain="true" :hair-line="false">详情</u-button>
			</u-cell-item>
			<!-- 子节点 -->
			<ul v-if="item['group']" v-show="isOpen">
				<activity-item v-if="isFolder" class="item" v-for="activity in childrenActivity" :item="activity"
					:key="activity['id']" :colorNumber="getColorNumber">
				</activity-item>
				<u-cell-item @click="addActivity()" :title="'添加'" :icon="'plus'" :arrow="false" bg-color="#f4f4f5">
				</u-cell-item>
			</ul>
		</li>
	</view>
</template>

<script>
	export default {
		name: "activity-item",
		data() {
			return {
				isStart: false,
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
			action() {
				this.isStart = !this.isStart;
				if(this.isStart){
					//发射事件，让父组件启动计时器
					this.$emit("ActivityActioned", this.item['id'], 0);
				}else{
					this.$emit("ActivityActioned", this.item['id'], 1);
				}
			},
			finished() {
				this.isStart = false;
				this.$emit("ActivityActioned", this.item['id'], -1);
			},
			getColor: function() {
				return this.colorList[this.colorNumber];
			},
			toggle: function() {
				if (this.item['group']) {
					this.isOpen = !this.isOpen;
				}
			},
			toActivityDetailPage: function() {
				uni.navigateTo({
					url: '../../activityDetail/activityDetail?id=' + this.item['id']
				});
			},
			addActivity() {
				//需要填写：是不是group，名称
				//跳转页面、
				console.log("触发！");
				uni.navigateTo({
					url: '/pages/tabbar/activityTree/addActivity?parentId=' + this.item['id']
				});
			},
			deleteActivity() {
				//需要判断有没有联网
				//删除types中的数据
				console.log(this.item['id']);
				uniCloud.callFunction({
					name: 'deleteType',
					data: {
						id: this.item['id']
					},
					success: (res) => {
						console.log(res);
						if (res.result.deleted == 1) {
							console.log(res);
							console.log("删除成功");
							this.$store.commit('deleteType', this.item['id']);
						}
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
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
