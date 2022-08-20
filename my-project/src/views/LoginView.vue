<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" class="login-form" autocomplete="on"
                 label-position="left">

            <div class="title-container">
                <h3 class="title">智考后台管理系统</h3>
            </div>

            <el-form-item prop="username">
            <span class="svg-container">
             <i class="el-icon-user-solid"></i>
            </span>
                <el-input
                        ref="username"
                        v-model="loginForm.username"
                        placeholder="Username"
                        name="username"
                        type="text"
                        tabindex="1"
                        autocomplete="on"
                />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="password">
              <span class="svg-container">
                  <i class="el-icon-lock"></i>
              </span>
                    <el-input
                            :key="passwordType"
                            ref="password"
                            v-model="loginForm.password"
                            :type="passwordType"
                            placeholder="Password"
                            name="password"
                            tabindex="2"
                            autocomplete="on"
                            @blur="capsTooltip = false"
                            @keyup.enter.native="handleLogin"
                    />
                </el-form-item>
            </el-tooltip>

            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                       @click.native.prevent="handleLogin">Login
            </el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                loginForm: {
                    username: 'admin',
                    password: '111111'
                },
                passwordType: 'password',
                capsTooltip: false,
                loading: false,
                showDialog: false,
                redirect: undefined,
                otherQuery: {}
            }
        },
        methods: {
            handleLogin() {
                this.loading = true;
                let param = new FormData(); // 创建form对象
                param.append("username","admin");
                param.append("password","123");
                param.append("code","123");
                this.$http
                    .post("http://localhost:9001/login", param)
                    .then(({ data: res }) => {
                        console.log(res);
                        if (res.code === 200) {
                            localStorage.setItem('token', res.obj.token);
                            this.$router.push({
                                name: 'manage',
                                params: {
                                    id: 'id'
                                }
                            })
                        }
                        if (res.data.length !== 0) {
                            console.log(res.msg);
                            return this.$message.warning('抱歉！目前没有您所需要的数据')
                        }
                    }) .catch(() => {});
                this.loading = false;
            }
        }
    }
</script>

<style lang="scss">
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

    $bg: #283443;
    $light_gray: #fff;
    $cursor: #fff;
    h3{
        color: #707070;
    }
    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container .el-input input {
            color: $cursor;
        }
    }

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                caret-color: $cursor;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    body {
        overflow: hidden;
    }

    .login-container {
        /*display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;*/
        min-height: 100%;
        width: 100%;
        height: 98vh;
        background-color: $bg;

        .login-form {
            /*border-radius: 6px;
            background: rgb(255,255,255,0.8);
            width: 385px;
            padding: 25px 25px 20px 25px;*/
            position: relative;
            width: 520px;
            max-width: 100%;
            padding: 160px 35px 0;
            margin: 0 auto;
            overflow: hidden;
            .el-input{
                height: 38px;
                input{height: 38px};
                margin-bottom: 10px;
            }
            .el-button{
                margin-top: 10px;
                height:38px;
            }
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }

        .thirdparty-button {
            position: absolute;
            right: 0;
            bottom: 6px;
            height: 38px;
        }

        @media only screen and (max-width: 470px) {
            .thirdparty-button {
                display: none;
            }
        }
    }
</style>
