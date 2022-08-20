<template>
    <div class="home">
        <head-top></head-top>
        <h1>附件上传&题库导入</h1>
<!--


        <div class="upload-from">
            <el-upload
                    class="upload-demo"
                    drag
                    action="http://127.0.0.1:9001/birthdaydemo/TiKu/home/updateInfoForm"
					name="imgFile"
					:on-success="onSuccess"
                    multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过50kb</div>
				<div class="el-upload__tip" slot="tip">图片地址为：{{imgUrl}}
<!--					<el-button  type="primary" style="margin-bottom:30px;"-->
<!--							   @click.native.prevent="seeImg">查看图片-->
<!--					</el-button>-->
				</div>

            </el-upload>

            <el-upload
                    class="upload-demo"
                    drag
                    action="http://127.0.0.1:9001/birthdaydemo/TiKu/uploadExcel"
					:on-success="onSuccessExcel"
                    multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将题库拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过500kb</div>
            </el-upload>
        </div>
    </div>
</template>

<script>
    import headTop from "@/components/headTop";

    export default {
        name: 'HomeView',
        components:{
            headTop
        },
		data() {
			return {
				imgUrl: ""
			}
		},
		methods: {
			onSuccess(response){
				this.imgUrl =response.avatar;
			},
			onSuccessExcel(response){
				alert("上传成功");
			},
			seeImg() {
				window.open(this.imgUrl,'_blank')
			}
		}
    }
</script>

<style lang="scss">
	.upload-demo {
		float: left;
		margin-left: 400px;

	}
    .el-menu-vertical-demo{
        position: absolute !important;
    }
    .upload-from{
        position: absolute;
        left: 160px;
    }
    .el-menu{
        width: 153px !important;
        min-height: 400px !important;

    }

</style>
