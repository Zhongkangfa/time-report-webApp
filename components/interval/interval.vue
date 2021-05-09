<template>
	<view class="u-flex" @click="show = !show" id="interval">
		<view class="u-flex-7" id="time">
			<p>{{startString}}</p>
			<p>{{endString}}</p>
		</view>
		<view class="u-flex-3">
			<span>{{clock}}</span>
		</view>
		<u-popup v-model="show" mode="bottom" border-radius="14" height="60%">
			<time-select :interval="myInterval" @intervalChanged="modify" @close="show = false"></time-select>
		</u-popup>
	</view>
</template>

<script>
	import moment from 'moment'
	import timeSelect from '../clock/timeSelect.vue';
	export default {
		name: "interval",
		components: {
			'time-select': timeSelect
		},
		props: {
			interval: Array,
			id: Number
		},
		created() {
			console.log(this.interval);
			this.start = this.interval[0];
			this.end = this.interval[1];
		},
		data() {
			return {
				show: false,
				start: 0,
				end: 0
			};
		},
		computed: {
			startString() {
				return moment(this.start * 1000).format("YYYY-MM-DD kk:mm:ss");
			},
			endString() {
				return moment(this.end * 1000).format("YYYY-MM-DD kk:mm:ss");
			},
			myInterval() {
				return [this.start, this.end];
			},
			count() {
				return this.end - this.start;
			},
			clock() {
				let m = this.count / 60;
				let seconds = this.showNum(this.count % 60);
				let minutes = this.showNum(parseInt(m) % 60);
				let hours = this.showNum(parseInt(m / 60));
				return hours + " : " + minutes + " : " + seconds;
			}
		},
		methods: {
			modify(event){
				this.start = event[0];
				this.end = event[1];
				this.$emit('intervalChanged',event.push(this.id));
			},
			showNum(num) {
				if (num < 10) {
					return '0' + num
				}
				return num
			},
		}
	}
</script>

<style scoped>
	#time {
		width: 0;
	}

	#interval {
		min-width: 140px;
		margin-top: 15px;
		margin-bottom: 15px;
		border-style: solid;
		border-color: #808080;
	}

	#interval p {
		margin: 10px;
	}
</style>
