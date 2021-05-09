<template>
	<view class="u-margin-26">
		<view>
			<h2>开始时间</h2>
			<u-input v-model="startTime" type="text" :disabled="true" placeholder="点击选择"
				@click="isStartTimeSelectorShow = true" />
			<u-picker v-model="isStartTimeSelectorShow" mode="time" @confirm="setStartTime" :params="params"
				:start-year="startYear" :end-year="endYear">
			</u-picker>
		</view>
		<br />
		<view>
			<h2>结束时间</h2>
			<u-input v-model="endTime" type="text" :disabled="true" placeholder="点击选择"
				@click="isEndTimeSelectorShow = true" />
			<u-picker v-model="isEndTimeSelectorShow" mode="time" @confirm="setEndTime" :params="params"
				:start-year="startYear" :end-year="endYear">
			</u-picker>
		</view>
		<br />
		<u-button type="error" :custom-style="customStyle" @click="modify">确认修改</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		name: "timeSelect",
		props: {
			interval: Array
		},
		data() {
			return {
				startTime: "",
				startTimeStamp: 0,
				endTime: "",
				endTimeStamp: 0,
				isStartTimeSelectorShow: false,
				isEndTimeSelectorShow: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true,
					timestamp: true
				},
				customStyle: {
					marginTop: '20px'
				}
			}
		},
		mounted() {
			this.startTimeStamp = this.interval[0];
			this.startTime = moment(this.startTimeStamp * 1000).format("YYYY-MM-DD hh:mm:ss");
			this.endTimeStamp = this.interval[1];
			this.endTime = moment(this.endTimeStamp * 1000).format("YYYY-MM-DD hh:mm:ss");
		},
		computed:{
			startYear(){
				return moment().subtract(1, 'y').year();
			},
			endYear(){
				return moment().year();
			}
		},
		methods: {
			showSuccessToast() {
				this.$refs.uToast.show({
					title: '修改成功',
					type: 'success',
				})
			},
			showErrorToast() {
				this.$refs.uToast.show({
					title: '结束时间不能小于开始时间！',
					type: 'error'
				})
			},
			setStartTime(event) {
				this.startTimeStamp = event['timestamp'];
				this.startTime = moment(this.startTimeStamp * 1000).format("YYYY-MM-DD kk:mm:ss");
			},
			setEndTime(event) {
				this.endTimeStamp = event['timestamp'];
				this.endTime = moment(this.endTimeStamp * 1000).format("YYYY-MM-DD kk:mm:ss");
			},
			modify() {
				if (this.endTimeStamp < this.startTimeStamp) {
					this.showErrorToast();
					return;
				}
				// this.showSuccessToast();
				this.$emit('intervalChanged', [this.startTimeStamp, this.endTimeStamp]);
				this.$emit('close');
			},
		}
	}
</script>

<style scoped>
</style>
