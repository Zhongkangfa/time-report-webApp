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

			<!-- 开始时间 -->
			<u-form-item label="开始时间" prop="startTime">
				<u-input v-model="form.startTime" type="text" :disabled="true" placeholder="点击选择"
					@click="isStartTimeSelectorShow = true" />
				<u-picker v-model="isStartTimeSelectorShow" mode="time" @confirm="setStartTime" :params="params"
					:start-year="startYear.getFullYear()" :end-year="now.getFullYear()">
				</u-picker>
			</u-form-item>

			<!-- 结束时间 -->
			<u-form-item v-if="isEnd" label="结束时间" prop="endTime">
				<u-input v-model="form.endTime" type="text" :disabled="true" placeholder="点击选择"
					@click="isEndTimeSelectorShow = true" />
				<u-picker v-model="isEndTimeSelectorShow" mode="time" @confirm="setEndTime" :params="params"
					:start-year="startYear.getFullYear()" :end-year="now.getFullYear()">
				</u-picker>
			</u-form-item>
		</u-form>
		<u-button @click="submit">确认修改</u-button>
	</view>
</template>

<script>
	import activitySelect from './activitySelect.vue'
	import moment from 'moment'
	export default {
		name: "clockModify",
		components: {
			"activity-select": activitySelect
		},
		mounted() {
			console.log(this.clockInfo);
			this.ActivityName = this.clockInfo['name'];
			this.clockStatus = this.clockInfo['status'];
			this.form.startTime = moment(this.clockInfo['startTime'] * 1000).format("YYYY-MM-DD hh:mm:ss");
		},
		computed: {

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
				startYear: new Date('1/1/2015'),
				isEnd: false,
				clockStatus: "",
				activitySelectShow: false,
				isStartTimeSelectorShow: false,
				isEndTimeSelectorShow: false,
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
			},
			getSelectedActivity(event) {
				this.ActivityName = event['name'];
				this.ActivityId = event['id'];
				this.activitySelectShow = false;
			},
			clockStatusChange(name) {
				console.log(name);
				if (name == "结束") {
					this.isEnd = true;
				} else {
					this.isEnd = false;
				}
			},
			setStartTime(event) {

			},
			setEndTime(event) {
				console.log(event);
			}
		}
	}
</script>

<style>
</style>
