<template>
	<view class="container">
		<view v-for="(info,index) in infos" :key="index">
			<view class="infos">
				<view class="msgTitle">
					<view class="text" @click="textClick(info)">
						<uni-list-item class="uni-list-item" ellipsis="2" :title="info.wzHeader"
							:note="info.createTime" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infos: [],
				wengZhangId: "",
				listQuery: {
					pageNum: 1,
					pageSize: 10,
				}, //分页
				totalPage: 1 //当前页
			}
		},
		methods: {
			onShow() {
				let that = this;
				that.getData();
				that.initialize();
			},
			initialize() {
				this.infos = [];
				this.totalPage = 1;
				this.listQuery.pageNum = 1;
				this.listQuery.pageSize = 10;
			},
			getData() {
				uni.request({ //发送请求
					url: 'http://127.0.0.1:9001/birthdaydemo/WenZhang/wenZhang',
					method: 'GET',
					header: {
						authorization: "Bearer " + uni.getStorageSync("token")
					},
					data: {
						"current": this.listQuery.pageNum,
						"size": this.listQuery.pageSize,
						"ids": this.wengZhangId,
					},
					success: (res) => {
						//数据获取成功
						this.infos = this.infos.concat(res.data.data.records);
						this.totalPage = res.data.data.total;

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
			//下拉读取数据方法
			onReachBottom() {
				//计算最后一页
				var lastPage = parseInt(this.totalPage / this.listQuery.pageSize) + 1;
				if (this.listQuery.pageNum >= lastPage) {
					uni.showToast({
						title: '没有更多了',
						duration: 2000,
						icon: 'none'
					});
					return;
				}
				this.listQuery.pageNum += 1;
				this.getData()
			},
			onLoad(options) {
				console.log(options);
				this.wengZhangId = options.id;
			},
			//点击资讯事件跳转
			textClick(e) {
				console.log(e)
				var id = e.id;
				uni.navigateTo({
					url: '/pages/index2/messageDetails?id=' + id
				});
			},
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.infos {
		width: 679rpx;
		border-bottom: 2rpx solid #F4F4F4;
	}

	.infos .msgTitle .text {
		background-color: #f5f5f5;
	}
</style>
