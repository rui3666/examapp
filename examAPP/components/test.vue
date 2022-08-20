<template>
	<view>
		<text>test-{{list.length}}</text>
		<block v-for="(item,index) in list" :key="index">
			<view>{{item.title}}</view>
		</block>
	</view>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default:[]
			}
		}
	}
</script>

<style>
</style>