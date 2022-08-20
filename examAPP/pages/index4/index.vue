<template>
	<view class="container">
		<view class="uni-common-mt">
			<view class="progress-box">
				<view class="cloud">
					<view class="fly-1"></view>
					<view class="fly-2"></view>
					<view class="fly-3"></view>
				</view>
				<image class="img1" :src="imgSrc" />
				<view class="kettle">
					<view class="kettls" @click="jiaoshui" hover-class="none"></view>
					<view class="flasks" v-show="watercss" :class="{'water': watercss}"></view>
					<view class="flasms" v-show="!watercss" @click="jiaoshui" hover-class="none"></view>
					<view class="waters" v-show="waterdom"></view>
				</view>
				<!-- <button type="primary" @click="jiaoshui">浇水</button>
				<button type="primary" @click="shifei">施肥</button> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				imgSrc: '',
				wateroff: true, 	// 浇水动画开关
				watercss: false, 	// 水壶动画开关
				waterdom: false 	// 水滴动画开关
			}
		},
		methods: {
			onShow() {
				var x = this;
				var openId;
				var token;
				var integrate;
				openId = uni.getStorageSync("openId"); //头像url
				token = uni.getStorageSync("token"); //头像url
				if (openId) {
					uni.request({ //发送请求
						url: 'http://127.0.0.1:9001/birthdaydemo/Shu/selectByOpenId/' + openId,
						method: 'GET',
						header: {
							authorization: "Bearer " + uni.getStorageSync("token")
						},
						data: {},
						success: (res) => {
							console.log("login_submit", res);
							integrate = res.data.data.yhIntegrate;
							if (integrate < 10) {
								x.imgSrc = '/static/lanhu_wode/tree1.png';
							} else if (integrate > 10 && integrate <= 20) {
								x.imgSrc = '/static/lanhu_wode/tree2.png';
							} else if (integrate > 20 && integrate <= 30) {
								x.imgSrc = '/static/lanhu_wode/tree3.png';
							} else {
								x.imgSrc = '/static/lanhu_wode/tree4.png';
							}
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
						title: '请先授权登录！',
						duration: 2000
					});
				}
			},
			jiaoshui() {
				this.watercss = true;
					this.wateroff = false;
							
					setTimeout(() => {
					this.waterdom = true;
				}, 1500);
				setTimeout(() => {
					this.waterdom = false;
					this.movetree = true;
					this.watercss=false;
				}, 3500);
				console.log("浇水")
				var token;
				token = uni.getStorageSync("token"); //头像url
				var openId;
				openId = uni.getStorageSync("openId"); //头像url
				var x = this;
				uni.request({ //发送请求
					url: 'http://127.0.0.1:9001/birthdaydemo/YongHu/selectById/' + openId,
					method: 'GET',
					header: {
						authorization: "Bearer " + uni.getStorageSync("token")
					},
					data: {},
					success: (res1) => {
						var num = parseInt(res1.data.data.yhIntegrate) - 2;
						if (num > 0) {
							console.log("jiaoshui成功", res1);
							uni.request({ //发送请求
								url: 'http://127.0.0.1:9001/birthdaydemo/Shu/shuJf',
								method: 'PUT',
								header: {
									authorization: "Bearer " + uni.getStorageSync("token")
								},
								data: {
									yhOpenId: openId,
									yhIntegrate: 2,
								},
								success: (res) => {
									uni.request({ //发送请求
										url: 'http://127.0.0.1:9001/birthdaydemo/YongHu/updateJF',
										method: 'PUT',
										header: {
											authorization: "Bearer " + uni.getStorageSync("token")
										},
										data: {
											yhOpenId: openId,
											yhIntegrate: parseInt(res1.data.data
													.yhIntegrate) -
												2,
										},
										success: (res) => {
											uni.showToast({
												title: '浇水成功！',
												duration: 2000
											});
											if (openId) {
												uni.request({ //发送请求
													url: 'http://127.0.0.1:9001/birthdaydemo/Shu/selectByOpenId/' + openId,
													method: 'GET',
													header: {
														authorization: "Bearer " + uni.getStorageSync("token")
													},
													data: {},
													success: (resc) => {
														console.log("login_submit", resc);
														var integrate;
														integrate = resc.data.data.yhIntegrate;
														if (integrate < 10) {
															x.imgSrc = '/static/lanhu_wode/tree1.png';
														} else if (integrate > 10 && integrate <= 20) {
															x.imgSrc = '/static/lanhu_wode/tree2.png';
														} else if (integrate > 20 && integrate <= 30) {
															x.imgSrc = '/static/lanhu_wode/tree3.png';
														} else {
															x.imgSrc = '/static/lanhu_wode/tree4.png';
														}
													},
													fail: (err) => { //失败操作
														console.log(resc)
														uni.showToast({
															title: '请求失败！',
															duration: 2000
														});
													}
												})
											} else {
												uni.showToast({
													title: '请先授权登录！',
													duration: 2000
												});
											}
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
								fail: (err) => { //失败操作
									// console.log(res)
									uni.showToast({
										title: '请求失败！',
										duration: 2000
									});
								}
							})
						} else {
							uni.showToast({
								icon: 'error',
								title: '积分不够！',
								duration: 2000
							});
						}

					}
				})
			},
			shifei() {
				var token;
				token = uni.getStorageSync("token"); //头像url
				var openId;
				openId = uni.getStorageSync("openId"); //头像url
				var x = this;
				uni.request({ //发送请求
					url: 'http://127.0.0.1:9001/birthdaydemo/YongHu/selectById/' + openId,
					method: 'GET',
					header: {
						authorization: "Bearer " + uni.getStorageSync("token")
					},
					data: {},
					success: (res1) => {
						var num = parseInt(res1.data.data.yhIntegrate) - 5;
						if (num > 0) {
							console.log("施肥成功", res1);
							uni.request({ //发送请求
								url: 'http://127.0.0.1:9001/birthdaydemo/Shu/shuJf',
								method: 'PUT',
								header: {
									authorization: "Bearer " + uni.getStorageSync("token")
								},
								data: {
									yhOpenId: openId,
									yhIntegrate: 2,
								},
								success: (res) => {
									uni.request({ //发送请求
										url: 'http://127.0.0.1:9001/birthdaydemo/YongHu/updateJF',
										method: 'PUT',
										header: {
											authorization: "Bearer " + uni.getStorageSync("token")
										},
										data: {
											yhOpenId: openId,
											yhIntegrate: parseInt(res1.data.data
													.yhIntegrate) -
												5,
										},
										success: (res) => {
											uni.showToast({
												title: '施肥成功！',
												duration: 2000
											});
											if (openId) {
												uni.request({ //发送请求
													url: 'http://127.0.0.1:9001/birthdaydemo/Shu/selectByOpenId/' + openId,
													method: 'GET',
													header: {
														authorization: "Bearer " + uni.getStorageSync("token")
													},
													data: {},
													success: (resc) => {
														console.log("login_submit", resc);
														var integrate;
														integrate = resc.data.data.yhIntegrate;
														if (integrate < 10) {
															x.imgSrc = '/static/lanhu_wode/tree1.png';
														} else if (integrate > 10 && integrate <= 20) {
															x.imgSrc = '/static/lanhu_wode/tree2.png';
														} else if (integrate > 20 && integrate <= 30) {
															x.imgSrc = '/static/lanhu_wode/tree3.png';
														} else {
															x.imgSrc = '/static/lanhu_wode/tree4.png';
														}
													},
													fail: (err) => { //失败操作
														console.log(resc)
														uni.showToast({
															title: '请求失败！',
															duration: 2000
														});
													}
												})
											} else {
												uni.showToast({
													title: '请先授权登录！',
													duration: 2000
												});
											}
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
								fail: (err) => { //失败操作
									// console.log(res)
									uni.showToast({
										title: '请求失败！',
										duration: 2000
									});
								}
							})
						} else {
							uni.showToast({
								icon: 'error',
								title: '积分不够！',
								duration: 2000
							});
						}

					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.uni-common-mt {
		width: 99%;
	}

	.progress-box {
		padding-top: 300rpx;
	}
	.cloud {
		margin-top: -200rpx;
	}
	.fly-1 {
		width: 102upx;
		height: 68upx;
		animation: cloud-1 80s ease-in-out 0s infinite alternate;
		background: url(../../static/img/fly-1.png) no-repeat;
		background-size: contain;
	}
	
	.fly-2 {
		width: 72upx;
		height: 52upx;
		animation: cloud-2 60s linear 0s infinite alternate;
		background: url(../../static/img/fly-2.png) no-repeat;
		background-size: contain;
	}
	
	.fly-3 {
		width: 78upx;
		height: 56upx;
		animation: cloud-3 70s ease 0s infinite alternate;
		background: url(../../static/img/fly-3.png) no-repeat;
		background-size: contain;
	}
	@keyframes cloud-1 {
		0% {
			opacity: .8;
			transform: translate3d(200%, 0, 0);
		}
	
		50% {
			opacity: .6;
			transform: translate3d(800%, 0, 0) scale(1.3);
		}
	
		100% {
			opacity: .8;
			transform: translate3d(-120%, 0, 0);
		}
	}
	
	@keyframes cloud-2 {
		0% {
			opacity: .8;
			transform: translate3d(820%, 0, 0);
		}
	
		50% {
			opacity: .6;
			transform: translate3d(-120%, 0, 0);
		}
	
		100% {
			opacity: .8;
			transform: translate3d(1080%, 0, 0) scale(1.3);
		}
	}
	
	@keyframes cloud-3 {
		0% {
			opacity: .6;
			transform: translate3d(-120%, 0, 0) scale(1.3);
		}
	
		100% {
			opacity: .8;
			transform: translate3d(1000%, 0, 0);
		}
	}
	

	.img1 {
		position: relative;
		top: 60upx;
		padding-left: 16rpx;
		height: 300rpx;
		width: 300rpx;
		
		
	}
	.kettle {
		display: flex;
		position: relative;
		flex-direction: row;
		justify-content: flex-end;
		width: 100%;
		height: 80upx;
		top: -30upx;
		view{
			position: absolute;
		}
		.kettls {
			right: 20upx;
			width: 116upx;
			height: 112upx;
			background: url(../../static/img/kettls.png) no-repeat;
			background-size: contain;
			transition: all 1s;
		};
		.flasks {
			top: -176upx;
			right: 28upx;
			width: 113upx;
			height: 70upx;
			background: url(../../static/img/flasks.png) no-repeat;
			background-size: contain;
			transition: all 2s;
		};
		.flasms {
			right: 26upx;
			width: 117upx;
			height: 75upx;
			background: url(../../static/img/flasms.png) no-repeat;
			background-size: contain;
			transition: all 2s;
		};
		.waters {
			top: -240upx;
			right: 316upx;
			width: 85upx;
			height: 150upx;
			background: url(../../static/img/waters.gif) no-repeat;
			background-size: contain;
			transition: all 1s;
		}
	}
	.water {
		animation: water 4s ease-in-out forwards;
	}
	@keyframes water {
		0% {
			opacity: .5;
			transform: translate3d(0, 0, 0);
		}
	
		20% {
			opacity: 1;
			transform: translate3d(-150upx, -90upx, 0) scale(1.5);
		}
	
		30% {
			opacity: 1;
			transform: translate3d(-150upx, -90upx, 0) scale(1.5) rotate(-35deg);
		}
	
		80% {
			opacity: 1;
			transform: translate3d(-150upx, -90upx, 0) scale(1.5) rotate(-35deg);
		}
	
		100% {
			opacity: 0;
			transform: translate3d(-150upx, -90upx, 0) scale(1.5) rotate(0deg);
		}
	}
	

	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		position: relative;
		display: flex;
		flex-direction: column;
		background: url(../../static/img/detail-bg.jpg) no-repeat;
		background-size: contain;
	}
</style>
