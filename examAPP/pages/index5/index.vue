<template>
	<view class="page flex-col">
		<view class="layer1 flex-col">
			<view class="outer1 flex-col">
				<view class="group3 flex-row justify-between">
					<view class="outer2 flex-col">
						<image class="image" :src="avatarUrl" />
					</view>
					<view class="outer3 flex-col justify-between">
						<text class="word3">{{nickName}}</text>
						<text class="word4">积分为：{{jifeng}}</text>

					</view>
				</view>
				<image class="img1" referrerpolicy="no-referrer"
					src="/static/lanhu_wode/SketchPng10ea04492a0e9eeb499653ae63677a9e3c80676cd6a0f8c55a65bc8fe9c9f7de.png" />
			</view>
			<!--    <view class="outer5 flex-row" @tap="gomyOrder">
      <image
        class="label1"
        referrerpolicy="no-referrer"
        src="/static/lanhu_wode/SketchPng8f2a46b98cf14f6f2763b3157ef6b2a59a22a7397817f8ed59ac55a7463f9081.png"
      />
      <text class="info1">我的题库收藏</text>
      <image
        class="icon3"
        referrerpolicy="no-referrer"
        src="/static/lanhu_wode/SketchPng26507d1737dc60c7ae9f3cec0c9662a3315f27a83d25ee38d4168c5fddf40f59.png"
      />
    </view> -->
			<view class="outer5 flex-row" @tap="gomyWenZhang">
				<image class="label1" referrerpolicy="no-referrer"
					src="/static/lanhu_wode/SketchPng8f2a46b98cf14f6f2763b3157ef6b2a59a22a7397817f8ed59ac55a7463f9081.png" />
				<text class="info1">我的资讯收藏</text>
				<image class="icon3" referrerpolicy="no-referrer"
					src="/static/lanhu_wode/SketchPng26507d1737dc60c7ae9f3cec0c9662a3315f27a83d25ee38d4168c5fddf40f59.png" />
			</view>
			<view class="outer6 flex-row" @tap="gomyTiKu">
				<image class="icon4" referrerpolicy="no-referrer"
					src="/static/lanhu_wode/SketchPngdac021e2f3a597e99e97d978ff6096942cd3905fa85c683df9c891566ff858d8.png" />
				<text class="txt2">我的题库收藏</text>
				<image class="icon5" referrerpolicy="no-referrer"
					src="/static/lanhu_wode/SketchPng26507d1737dc60c7ae9f3cec0c9662a3315f27a83d25ee38d4168c5fddf40f59.png" />
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				nickName: "",
				showFlag: '',
				jifeng: 0,
				avatarUrl: "",
				yhWzid: "",
				yhTkid: "",
				constants: {}
			};
		},
		methods: {
			async onReady() {},
			onShow() {
				this.nickName = uni.getStorageSync("nickName") //昵稱
				this.avatarUrl = uni.getStorageSync("avatarUrl") //头像url
				var openId;
				openId = uni.getStorageSync("openId") //头像url
				uni.request({ //发送请求
					url: 'http://127.0.0.1:9001/birthdaydemo/YongHu/selectById/' + openId,
					method: 'GET',
					header: {
						authorization: "Bearer " + uni.getStorageSync("token")
					},
					data: {

					},
					success: (res) => {
						//数据获取成功
						console.log("login_submit", res);
						this.yhWzid = res.data.data.yhWzid;
						this.yhTkid = res.data.data.yhTkid;
						this.jifeng = res.data.data.yhIntegrate;
						console.log(res.data.data);
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
			goMedical() {
				uni.navigateTo({
					url: "/pages/about/myMedical/index"
				})
			},
			gomyWenZhang() {
				console.log("11111", this.yhWzid);
				uni.navigateTo({
					url: "/pages/index5/myMedical/myMedical?id=" + this.yhWzid
				})
			},
			gomyTiKu() {
				uni.navigateTo({
					url: "/pages/index5/myMedical/TiKu?id="+ this.yhTkid
				})
			}
		}
	};
</script>
<style lang='scss'>
	@import '@/common/common.scss';
	@import '@/pages/index5/assets/style/index.rpx.scss';
</style>
