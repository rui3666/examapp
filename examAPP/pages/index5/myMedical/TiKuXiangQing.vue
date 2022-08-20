<template>
	<view>
		<pxingExam :nownum='nownum' :submitType='submitType' :list="testlist" :examlist='testlist'
			@getEveryAnswer='getEveryAnswer' @getLastAnswer='getLastAnswer' @getChooseUserAnswer='getChooseUserAnswer'>
		</pxingExam>
	</view>
</template>

<script>
	import pxingExam from '@/components/pxing-exam/pxing-exam.vue';
	import Test from "@/components/test.vue"
	export default {
		components: {
			pxingExam,
			Test
		},
		data() {
			return {
				testlist: [],
				nownum: 0,
				tikuId: '',
				submitType: 1 //0-一题一题提交，1-一次全部提交
			}
		},
		onLoad(options) {
			console.log(options);
			this.tikuId = options.id;
			this.getData();
		},
		methods: {
			getData() {
				let that = this;
				uni.request({ //发送请求
					url: 'http://127.0.0.1:9001/birthdaydemo/ShiJuan/getShiJuanForTk?sjNum='+that.tikuId,
					method: 'GET',
					header: {
						authorization: "Bearer " + uni.getStorageSync("token")
					},
					data: {},
					success: (res) => {
						this.testlist = res.data.data;
						console.log("this.testlist", this.testlist)
					},
					fail: (err) => { //失败操作
						// console.log(res)
						uni.showToast({
							title: '请求失败！',
							duration: 2000
						});
					}
				})
			},
			//错误答案
			getLastAnswer(e) {
				console.log("getLastAnswer", e)
			},
			//正确答案
			getChooseUserAnswer(e) {
				console.log("getChooseUserAnswer", e)
			},
			getEveryAnswer(e) {
				console.log("getLastAnswer", e)
			}
		}
	}
</script>

<style>

</style>
