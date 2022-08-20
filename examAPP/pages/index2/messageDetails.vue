<template>
	<view>
		<view class="content">
			<rich-text :nodes="strings"></rich-text>

			<button type="primary" @click="shoucang">收藏该资讯</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				informationId: '',
				strings: '',
			}
		},
		methods: {
			shoucang() {
				var openId;
				var token;
				openId = uni.getStorageSync("openId"); //头像url
				token = uni.getStorageSync("token"); //头像url
				if (token) {
					var x = this;
					uni.request({ //发送请求
						url: 'http://127.0.0.1:9001/birthdaydemo/YongHu/updateWz',
						method: 'PUT',
						header: {
							authorization: "Bearer " + uni.getStorageSync("token")
						},
						data: {
							yhOpenId: uni.getStorageSync('openId'),
							yhWzid: x.informationId,
						},
						success: (res) => {
							console.log("login_submit", res);
							uni.showToast({
								title: '收藏成功！',
								duration: 2000
							});
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
			onShow() {
				var x = this;
				uni.request({ //发送请求
					url: 'http://127.0.0.1:9001/birthdaydemo/WenZhang/selectById/' + this.informationId,
					method: 'GET',
						header: {
							authorization: "Bearer " + uni.getStorageSync("token")
						},
					data: {},
					success: (res) => {
						console.log("login_submit", res);
						x.strings = res.data.data.wzNeiron;
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
			onLoad(options) {
				console.log(options);
				this.informationId = options.id;
			}
		}
	}
</script>
<style>
	.uni-common-mt {
		margin-block-end: 100rpx;
	}

	.content {
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 99;
		background-color: #EEEEEE;
		height: 162rpx;
	}

	.title {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		/*水平居中*/
		margin: 16rpx;
	}

	.title_msg {
		padding: 5rpx 37rpx 37rpx 37rpx;
		font-size: 24rpx;
	}

	.title_msg .msg_date {
		text-align: right;
		/*水平居中*/
		float: right;
	}
</style>
