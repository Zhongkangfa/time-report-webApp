<template>
	<view class="u-margin-26">
		<u-form label-position="top" :model="form" ref="uForm">
			<!-- 选择活动类别 -->
			<u-form-item label="活动类别">
				<u-input v-model="ActivityName" type="text" :disabled="true" placeholder="点击按钮选择类别"
					@click="activitySelectShow = true" />
				<u-popup v-model="activitySelectShow" mode="top">
					<activity-select v-on:activitySelected="getSelectedActivity"></activity-select>
				</u-popup>
			</u-form-item>

			<!-- 填写备注 -->
			<u-form-item label="备注">
				<u-input v-model="ActivityComment" type="text"></u-input>
			</u-form-item>

			<!-- 选择活动状态 -->
			<u-form-item label="活动状态">
				<u-radio-group v-model="clockStatus">
					<u-radio @change="clockStatusChange" v-for="(item, index) in clockStatusList" :key="index"
						:name="item.name" :disabled="item.disabled">
						{{item.name}}
					</u-radio>
				</u-radio-group>
			</u-form-item>

		</u-form>
		<u-button @click="isIntervalsShow = !isIntervalsShow">修改时间</u-button>
		<view>
			<interval v-show="isIntervalsShow && clockStatus != '暂停'" :interval="firstInterval"></interval>
			<interval v-show="isIntervalsShow" v-for="(interval, index) in intervals" :interval="interval" :key="index" :id="index" @intervalChanged="modifyInterval">
			</interval>
		</view>
		<u-button @click="submit">确认修改</u-button>
	</view>
</template>

<script>
	import activitySelect from './activitySelect.vue';
	import interval from '../interval/interval.vue';
	import moment from 'moment'
	export default {
		name: "clockModify",
		components: {
			"activity-select": activitySelect,
			"interval": interval
		},
		mounted() {
			//将计时器的全部信息都复制过来
			console.log(this.clockInfo);
			this.ActivityName = this.clockInfo['name'];
			this.clockStatus = this.clockInfo['status'];
			if(this.clockInfo['status']=="暂停"){this.isPause = true};
			this.form.startTime = moment(this.clockInfo['startTime'] * 1000).format("YYYY-MM-DD hh:mm:ss");
			this.intervals = this.clockInfo['intervals'];
			this.ActivityId = this.clockInfo['id'];
		},
		computed: {
			firstInterval() {
				return [this.clockInfo['startTime'], moment().unix()];
			}

		},
		props: {
			clockInfo: Object
		},
		data() {
			return {
				form: {
					endTime: null,
					startTime: null,
				},
				now: new Date(),
				intervals: [],
				startYear: new Date('1/1/2015'),
				isEnd: false,
				isPause: false,
				isStart: true,
				clockStatus: "",
				activitySelectShow: false,
				isStartTimeSelectorShow: false,
				isEndTimeSelectorShow: false,
				isIntervalsShow: false,
				ActivityComment: "",
				ActivityName: "",
				ActivityId: "",
				clockStatusList: [{
						name: '运行',
						disabled: false
					},
					{
						name: '暂停',
						disabled: false
					},
					{
						name: '结束',
						disabled: false
					}
				],
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true,
					timestamp: true
				},
			}
		},
		methods: {
			submit() {
				if(this.clockInfo['id'] != this.ActivityId){
					this.$emit('ActivityTypeChange', [this.ActivityName, this.ActivityId]);
				}
				this.$emit('ActivityCommentChange', this.ActivityComment);
				if(this.clockInfo['intervals'].toString() != this.intervals.toString()){
					this.$emit('intervalsChange', this.intervals);
				}
				if(this.clockInfo['status'] != this.clockStatus){
					this.$emit('clockStatusChange', this.clockStatus);
				}
				this.$emit('close');
				
			},
			getSelectedActivity(event) {
				if (this.ActivityId != event['id']) {
					this.ActivityName = event['name'];
					this.ActivityId = event['id'];
					this.activitySelectShow = false;
					// this.$emit('ActivityTypeChange', [this.ActivityName, this.ActivityId]);
				}
			},
			clockStatusChange(name) {
				if(this.clockStatus == name){
					return;
				}
				if (name == "结束") {
					this.isEnd = true;
					this.isPause = false;
					this.isStart = false;
				} else if(name == "暂停"){
					this.isEnd = false;
					this.isPause = true;
					this.isStart = false;
				}else if (name == "运行"){
					this.isEnd = false;
					this.isPause = false;
					this.isStart = true;
				}
			},
			modifyInterval(event){
				this.intervals[event[2]] = [event[0], event[1]];
			},
			setStartTime(event) {
				this.form.startTime = moment(event['timestamp'] * 1000).format("YYYY-MM-DD kk:mm:ss");
			},
			setEndTime(event) {
				this.form.endTime = moment(event['timestamp'] * 1000).format("YYYY-MM-DD kk:mm:ss");
			}
		}
	}
</script>

<style>
	#intervals {
		min-width: 140px;
		margin-top: 15px;
		margin-bottom: 15px;
	}
</style>
