<template>
	<view>
		<p>{{clock}}</p>
	</view>
</template>

<script>
	export default{
		name: 'clockDisplayer',
		props:{
			count: Number
		},
		mounted() {
			console.log(this.count);
			let minutes = this.count/60;
			this.seconds = this.showNum(this.count % 60);
			this.minutes = this.showNum(parseInt(minutes) % 60);
			this.hours = this.showNum(parseInt(minutes /60));
		},
		computed:{
			clock(){
				return this.hours + " : " + this.minutes + " : " + this.seconds;
			}
		},
		data(){
			return{
				hours: "00",
				minutes: "00",
				seconds: "00"
			}
		},
		methods:{
			showNum(num) {
				if (num < 10) {
					return '0' + num
				}
				return num
			},
		}
	}
</script>

<style>
</style>
