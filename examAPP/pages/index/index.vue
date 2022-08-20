<template>
	<view class="container">
		<view class="container-wrap">
			<echarts ref="echarts" :option="option" canvasId="echarts"></echarts>
			<uni-section title="距离考试日期时间" type="line" padding>
				<uni-countdown :day="day" :hour="hour" :minute="minute" :second="second" :font-size="30" />
			</uni-section>

			<button type="primary" @click="logo" :disabled="disabledBtn">每日打卡</button>
			<button type="primary" @click="dengl">授权登录</button>
		</view>
	</view>
</template>

<script>
	import echarts from "@/components/echarts-uniapp/echarts-uniapp.vue"
	export default {
		components: {
			echarts
		},
		data() {
			return {
				option: {},
				echartY: [],
				stNumNow: [],
				stRateNow: [],
				stNumSum: [],
				stRateSum: [],
				day: "0",
				hour: "0",
				minute: "00",
				second: "00",
				url: '',
				disabledBtn: false
			}
		},
		mounted() {
			setTimeout(() => {
				this.testHour = 1
				this.testMinute = 1
				this.testSecond = 0
				this.start = true
			}, 3000)
			setTimeout(() => {
				this.start = false
			}, 10000)
		},
		onShow() {
			let _that = this;
			_that.shuaxing();
		},
		methods: {
			shuaxing() {
				console.log("shuaxing");
				var openId;
				var token;
				let that = this;
				openId = uni.getStorageSync("openId"); //头像url
				token = uni.getStorageSync("token"); //头像url
				if (token) {
					uni.request({ //发送请求
						url: 'http://127.0.0.1:9001/birthdaydemo/YongHu/selectById/' + openId,
						method: 'GET',
						header: {
							authorization: "Bearer " + uni.getStorageSync("token")
						},
						data: {},
						success:  (res) => {
							// console.log("login_submit", res);
							var yhTargettime;
							yhTargettime = res.data.data.yhTargettime;
							var dateLength = yhTargettime.length;
							that.twoTimeInterval(yhTargettime);
							console.log("getHomePageData");
							 that.getHomePageData();

						},
						fail: (err) => { //失败操作
							console.log(res)
							uni.showToast({
								title: '请求失败！',
								duration: 2000
							});
						}
					})
				} else {
					uni.showToast({
						icon: 'error',
						title: '请先授权噢~！',
						duration: 2000
					});
				}
			},
			 onReadyt() {
				console.log("2");
				this.option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						confine: true
					},
					legend: {
						data: ['总刷题数', '总正确率%', '当日刷题数', '当日正确率%']
					},
					grid: {
						left: 20,
						right: 20,
						bottom: 15,
						top: 40,
						containLabel: true
					},
					xAxis: [{
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#999'
							}
						},
						axisLabel: {
							color: '#666'
						}
					}],
					yAxis: [{
						type: 'category',
						axisTick: {
							show: false
						},
						//设置Y轴的展示
						data: this.echartY,
						axisLine: {
							lineStyle: {
								color: '#999'
							}
						},
						axisLabel: {
							color: '#666'
						}
					}],
					series: [{
							name: '总刷题数',
							type: 'bar',
							stack: '总',
							label: {
								normal: {
									show: true,
									position: 'inside'
								}
							},
							data: this.stNumSum,
							itemStyle: {}
						},
						{
							name: '总正确率%',
							type: 'bar',
							stack: '总',
							label: {
								normal: {
									show: true,
									position: 'inside'
								}
							},
							data: this.stRateSum,
							itemStyle: {}
						},
						{
							name: '当日刷题数',
							type: 'bar',
							stack: '总量',
							label: {
								normal: {
									show: true
								}
							},
							data: this.stNumNow,
							itemStyle: {}
						},
						{
							name: '当日正确率%',
							type: 'bar',
							stack: '总量',
							label: {
								normal: {
									show: true,
								}
							},
							data: this.stRateNow,
							itemStyle: {}
						}
					]
				};
			},
			//获取echart需要的参数
			 getHomePageData() {
				console.log("1");
				var openId;
				var token;
				let _this = this;
				// this.echartY=["2022-05-09", "2022-05-08", "2022-05-07", "2022-05-06", "2022-05-05", "2022-05-04", "2022-05-03"];
				token = uni.getStorageSync("token"); //头像url
				openId = uni.getStorageSync("openId"); //头像url
				uni.request({ //发送请求
					url: 'http://127.0.0.1:9001/birthdaydemo/YhJiLu/homePage/' + openId,
					method: 'GET',
					header: {
						authorization: "Bearer " + token
					},
					data: {},
					success:  (res) => {
						this.echartY = res.data.data.echartY;
						this.stNumNow = res.data.data.stNumNow;
						this.stRateNow = res.data.data.stRateNow;
						this.stNumSum = res.data.data.stNumSum;
						this.stRateSum = res.data.data.stRateSum;
						console.log("success", this.echartY);
						console.log("onReadyt");
						 _this.onReadyt();

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
			/**
			 * JS 计算两个时间间隔多久（时分秒）
			 * @param endTime "2019-10-23 15:27:55"
			 * @return 1天2时3分5秒
			 */
			twoTimeInterval(endTime) {
				var d = new Date();
				var startTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' +
					d.getMinutes() + ':' + d.getSeconds();
				// 开始时间
				let d1 = startTime.replace(/\-/g, "/");
				let date1 = new Date(d1);

				// 结束时间
				let d2 = endTime.replace(/\-/g, "/");
				let date2 = new Date(d2);

				// 时间相差秒数
				let dateDiff = date2.getTime() - date1.getTime();

				// 计算出相差天数
				let days = Math.floor(dateDiff / (24 * 3600 * 1000));

				// 计算出小时数
				let residue1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
				let hours = Math.floor(residue1 / (3600 * 1000));

				// 计算相差分钟数
				let residue2 = residue1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
				let minutes = Math.floor(residue2 / (60 * 1000));

				// 计算相差秒数
				let residue3 = residue2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
				let seconds = Math.round(residue3 / 1000);

				let returnVal =
					((days == 0) ? "" : days + "天") +
					((hours == 0) ? "" : hours + "时") +
					((minutes == 0) ? "" : minutes + "分") +
					((seconds == 0) ? "" : seconds + "秒");

				let that = this;
				that.day = days;
				that.hour = hours;
				that.minute = minutes;
				that.second = seconds;

			},

			dengl() {
				let that = this;
				uni.getUserProfile({
					desc: 'Wexin', // 这个参数是必须的
					success: res => {
						uni.login({
							provider: 'weixin',
							success: async function(loginRes) {
								console.log(res)
								uni.setStorageSync("nickName", res.userInfo.nickName);
								uni.setStorageSync("avatarUrl", res.userInfo.avatarUrl);
								uni.request({ //发送请求
									url: 'http://127.0.0.1:9001/wx/auth',
									method: 'GET',
									
									data: {
										'code': loginRes.code, //自定义请求头信息
									},
									success: (res1) => {
										//数据获取成功
										console.log("获取微信用户的信息")
										console.log(res1.data)
										uni.setStorageSync("token", res1.data.data
											.token);
										uni.setStorageSync("openId", res1.data.data
											.openId);

										that.shuaxing();
									}
								})
							}
						});
					},
					fail: err => {
						console.log(err)
					}
				})
			},
			logo() {
				console.log("logo")
				let self = this
				var token;
				token = uni.getStorageSync("token"); //头像url
				var openId;
				openId = uni.getStorageSync("openId"); //头像url
				uni.request({ //发送请求
					url: 'http://127.0.0.1:9001/birthdaydemo/YongHu/selectById/' +
						openId,
					method: 'GET',
					header: {
						authorization: "Bearer " + uni.getStorageSync("token")
					},
					data: {},
					success: (res1) => {
						uni.setStorageSync("userId", res1.data.data.id);
						uni.request({ //发送请求
							url: 'http://127.0.0.1:9001/birthdaydemo/YongHu/updateJF',
							method: 'PUT',
							header: {
								authorization: "Bearer " + uni.getStorageSync("token")
							},
							data: {
								yhOpenId: openId,
								yhIntegrate: parseInt(
										res1
										.data
										.data
										.yhIntegrate
									) +
									10,
							},
							success: (
								res) => {
								self.disabledBtn = true;
								uni.showToast({
									title: '打卡成功！',
									duration: 2000
								});
							},
							fail: (
								err
							) => {
								uni.showToast({
									title: '请求失败！',
									duration: 2000
								});
							}
						})
					}
				})
			},

			timeup() {
				uni.showToast({
					title: '时间到'
				})
				this.timeupSecond = 29
			},

		}
	}
</script>
