<template>
	<view>
		<u-cell-item :arrow="false" :icon="'clock'">
			<view class="u-flex">
				<view class="u-flex-8" style="text-align: center;width:0;" @click="show=true">
					<!-- 活动名称 -->
					<p id="activityName">{{ActivityName}}</p>
					<!-- 计时器：显示屏 -->
					<p>{{hours}} : {{minutes}} : {{seconds}}</p>
				</view>
				<!-- 启动按钮 -->
				<u-icon v-show="!isStart" class="u-m-r-20 u-flex-1" name="play-right-fill" color="#999" label="开始"
					label-color="#999" label-pos="bottom" label-size="20" size="20" margin-top="12" @click="start">
				</u-icon>
				<!-- 暂停按钮 -->
				<u-icon v-show="isStart" class="u-m-r-20 u-flex-1" name="pause" color="#999" label="暂停"
					label-color="#999" label-pos="bottom" label-size="20" size="20" margin-top="12" @click="pause">
				</u-icon>
				<!-- 结束按钮 -->
				<u-icon class="u-m-r-20 u-flex-1" name="checkmark" color="#999" label="结束" label-color="#999"
					label-pos="bottom" label-size="20" size="20" margin-top="12" @click="end">
				</u-icon>
			</view>
		</u-cell-item>
		<view>
			<u-popup v-model="show" mode="center" height="80%" width="80%">
				<clock-modify :clockInfo="clockInfo" @clockModified="modify" @close="show = false" @ActivityTypeChange="modifyType" @ActivityCommentChange="modifyComment" @intervalsChange="modifyIntervals" @clockStatusChange="modifyStatus"></clock-modify>
				<br/><br/><br/>
				<u-button @click="show = false" type="primary">关闭</u-button>
				<br/>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	import clockModify from './modify.vue'
	export default {
		name: "clock",
		components: {
			"clock-modify": clockModify
		},
		data() {
			return {
				isStart: false,
				timer: null,
				count: 0,
				hours: "00",
				minutes: "00",
				seconds: "00",
				start_time: 0,
				ownPauseTime: 0,
				intervals: [],
				show: false
			};
		},
		props: {
			ActivityName: String,
			ActivityId: String,
			num: Number,
			pauseTime: {
				type: Number,
				default: 0
			}
		},
		computed:{
			clockInfo(){
				return {
					"id": this.ActivityId,
					"name": this.ActivityName,
					"status": this.isStart? "运行":"暂停",
					"startTime": this.start_time,
					'intervals': this.intervals
				}
			},
		},
		methods: {
			showNum(num) {
				if (num < 10) {
					return '0' + num
				}
				return num
			},
			modify(info) {
				console.log('modify响应');
				console.log(info);
			},
			modifyType(event){
				console.log("活动类别修改",event);
			},
			modifyComment(event){
				console.log("备注修改", event);
			},
			modifyIntervals(event){
				console.log("intervals修改", event);
			},
			modifyStatus(event){
				console.log("状态修改", event);
			},
			start() {
				//发送事件，让其他计时器停止
				this.$emit('stopOther', {
					"index": this.num,
					"pauseTime": moment().unix()
				});
				//主动保持稳定
				this.ownPauseTime = this.pauseTime;
				//开始正常逻辑
				this.isStart = true;
				this.start_time = moment().unix();
				//启动计时器
				let that = this;
				that.timer = setInterval(
					function() {
						if (that.ownPauseTime != that.pauseTime) {
							that.pause();
						}
						that.count++;
						let minutes = that.count / 60;
						that.seconds = that.showNum(that.count % 60);
						that.minutes = that.showNum(parseInt(minutes) % 60);
						that.hours = that.showNum(parseInt(minutes / 60));
					},
					1000);
			},
			end() {
				//关闭计时器
				clearInterval(this.timer);
				this.isStart = false;
				this.count = 0;
				const end_time = moment().unix();
				this.hours = '00';
				this.minutes = '00';
				this.seconds = '00';
				this.intervals.unshift([this.start_time, moment().unix()]);
				this.$emit('clockend', {
					"id": this.ActivityId,
					"intervals": this.intervals,
					"num": this.num
				});
				this.intervals = [];
			},
			pause() {
				clearInterval(this.timer);
				this.isStart = false;
				let end_time;
				if (this.pauseTime != this.ownPauseTime) {
					//说明外部触发了暂停
					end_time = this.pauseTime;
					this.ownPauseTime = this.pauseTime;
				} else {
					//说明状态保持稳定
					end_time = moment().unix();
				}
				this.intervals.unshift([this.start_time, end_time]);
			}
		},
		mounted() {
			this.start();
		}
	}
</script>

<style scoped>
	#activityName {
		padding-left: 35px;
		padding-right: 35px;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
