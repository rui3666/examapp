<template>
    <div class="header_container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown @command="handleCommand" menu-align='start'>
            <img src="" class="avator">
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="home">首页</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "headTop",
        methods:{
            async handleCommand(command){
                if (command == 'logout') {
                    this.$confirm('此操作将注销登录，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //注销
                        this.http.post("http://localhost:9001/logout");
                        //清除用户信息
                        window.sessionStorage.removeItem("user");
                        window.sessionStorage.removeItem("tokenStr");
                        //清空菜单
                        this.$store.commit('initRoutes',[]);
                        //跳转登录页
                        this.$router.replace("/")
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        })
                    })
                };
                if(command=='home'){
                    this.$router.push("/home");
                }

            }
        }

    }
</script>

<style scoped lang="scss">
    @import '../assets/style/mixin';
    .header_container{
        background-color: #e2edf3;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        margin-bottom: 30px;
    }
    .avator{
        @include wh(36px, 36px);
        border-radius: 50%;
        margin-right: 37px;
    }
    .el-dropdown-menu__item{
        text-align: center;
        width: 50px;
    }
</style>