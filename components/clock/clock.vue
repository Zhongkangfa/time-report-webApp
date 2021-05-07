<template>
	<view>
		<u-cell-item :arrow="false" :icon="'clock'">
			<view class="u-flex">
				<span class="u-flex-2">{{ActivityName}}</span>
				<span class="u-flex-8" style="text-align: center;">{{hours}} : {{minutes}} : {{seconds}}</span>
				<u-icon v-show="!isStart" class="u-m-r-20 u-flex-1" name="play-right-fill" color="#999" label="开始"
					label-color="#999" label-pos="bottom" label-size="20" size="20" margin-top="12" @click="start">
				</u-icon>
				<u-icon v-show="isStart" class="u-m-r-20 u-flex-1" name="pause" color="#999" label="暂停" label-color="#999"
					label-pos="bottom" label-size="20" size="20" margin-top="12" @click="pause">
				</u-icon>
				<u-icon class="u-m-r-20 u-flex-1" name="checkmark" color="#999" label="结束" label-color="#999" label-pos="bottom"
					label-size="20" size="20" margin-top="12" @click="end">
				</u-icon>
			</view>
		</u-cell-item>
	</view>
</template>

<script>
	import moment from 'moment';
	export default {
		name: "clock",
		data() {
			return {
				timer: null,
				count: 0,
				hours: "00",
				minutes: "00",
				seconds: "00",
				start_time: 0,
				intervals: []
			};
		},
		props:{
			ActivityName: String,
			isStart: Boolean,
			isEnd: Boolean
		},
		methods: {
			showNum(num) {
				if (num < 10) {
					return '0' + num
				}
				return num
			},
			start() {
				this.isStart = true;
				let that = this;
				that.start_time = moment().unix();
				console.log(this.count);
				that.timer = setInterval(
					function() {
						that.count++;
						that.seconds = that.showNum(that.count % 60);
						that.minutes = that.showNum(parseInt(that.count / 60) % 60);
						that.hours = that.showNum(parseInt(that.count / 60 / 60));
					},
					1000);
			},
			end() {
				this.isStart = false;
				this.isEnd = true;
				this.count = 0;
				clearInterval(this.timer);
				const end_time = moment().unix();
				this.hours = 0;
				this.minutes = 0;
				this.seconds = 0;
				this.intervals.push([this.start_time, moment().unix()]);
				this.$emit('clockend', this.intervals);
				this.intervals = [];
				this.$destroy();
			},
			pause() {
				this.isStart = false;
				clearInterval(this.timer);
				this.intervals.push([this.start_time, moment().unix()]);
				console.log(this.intervals[this.intervals.length - 1]);
			}
		},
		onLoad() {
			this.isEnd = false;
		}
	}
</script>

<style>

</style>
