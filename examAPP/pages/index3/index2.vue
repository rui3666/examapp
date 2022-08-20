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
				sjNum: 'A',
				getChooseUserAnswerData: '',
				getLastAnswerData: '',
				submitType: 1 //0-一题一题提交，1-一次全部提交
			}
		},
		onLoad(options) {
			var x = this;
			x.sjNum = options.id;
			var openId;
			var token;
			var integrate;
			openId = uni.getStorageSync("openId"); //头像url
			token = uni.getStorageSync("token"); //头像url
			if (openId) {
				this.getData();
			} else {
				uni.showToast({
					title: '请先授权登录！',
					duration: 2000
				});
			}
		},
		methods: {
			getData() {
				let that = this;
				uni.request({ //发送请求
					url: 'http://127.0.0.1:9001/birthdaydemo/ShiJuan/getShiJuan?sjNum=' + that.sjNum,
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
			//一个循环进行对比正确和错误，然后纳入错题记录，再进行计算考试率
			//错误答案
			getLastAnswer(e) {
				console.log("getLastAnswer", e)
				this.getLastAnswerData = e;
			},
			//正确答案
			getChooseUserAnswer(e) {
				console.log("getChooseUserAnswer", e)
				this.getChooseUserAnswerData = e;
				let _this = this;
				_this.calculateData();
			},
			//处理考试记录的几率计算
			calculateData() {
				var token;
				var openId;
				token = uni.getStorageSync("token");
				openId = uni.getStorageSync("openId");
				uni.request({ //发送请求
					url: 'http://127.0.0.1:9001/birthdaydemo/YhJiLu/calculateData',
					method: 'POST',
					header: {
						authorization: "Bearer " + uni.getStorageSync("token")
					},
					data: {
						"trueData": this.getChooseUserAnswerData,
						"userChooseData": this.getLastAnswerData,
						"openId": openId,
					},
					success: (res) => {
						console.log("login_submit", res);
					},
					fail: (err) => { //失败操作
						console.log(res)
						uni.showToast({
							title: '请求失败！',
							duration: 2000
						});
					}
				})
			},
			getEveryAnswer(e) {
				console.log("getLastAnswer", e)
			}
		}
	}
</script>

<style>

</style>
