<template>
	<view>
		<!-- 修改活动类别 -->
		<u-input v-model="ActivityName" type="select" />
		<!-- 修改活动备注 -->
		<u-input v-model="ActivityComment" type="text" />
	</view>
</template>

<script>
	export default {
		name: "clockModify",
		data: {
			ActivityComment: "",
			ActivityName: ""
		}
	}
</script>

<style>
</style>
