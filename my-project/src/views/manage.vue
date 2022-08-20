<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100vh;">
            <el-col :span="4"  style="min-height: 100%; background-color: #324057;">
                <el-menu :default-active="defaultActive" style="min-height: 100%;" background-color="#304156" text-color="#fff" active-text-color="#20A0FF" router>
                    <el-menu-item><h2>智考后台系统</h2></el-menu-item>
                    <el-menu-item index="home"><i class="el-icon-menu"></i>首页</el-menu-item>
                    <el-menu-item index="tiku"><i class="el-icon-document"></i>题目列表</el-menu-item>

                    <el-menu-item index="news"><i class="el-icon-notebook-2"></i>资讯管理</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "manage",
        computed: {
            defaultActive: function(){
                return this.$route.path.replace('/', '');
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/style/mixin";
    .fillcontain{
        @include fillcontain;

    }
</style>