<template>

    <div class="login-wrap">
        <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
            <h2>用户登录</h2>

            <el-form-item label="用户名">
                <el-input v-model="formdata.username" placeholder="请输入您的账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formdata.password" type="password" placeholder="请输入您的密码"></el-input>
            </el-form-item>
            <el-button @click.prevent="handleLogin()" class="login-btn" type="primary">登录</el-button>
            <el-link @click.prevent="handleregister" class="reglink" type="primary">
                注册账号
            </el-link>
            <el-link @click.prevent="handlresetpw" class="reglink" type="primary">
                忘记密码
            </el-link>
        </el-form>

        <!-- <div class="regiter-wrap" v-show="showRegister">
            <el-form class="register-form" label-position="top" label-width="80px" :model="formdata">
                <h2>用户注册</h2>

                <el-form-item label="用户名">
                    <el-input v-model="formdata.newusername" placeholder="请输入您要注册的账号"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formdata.newpassword" type="password" placeholder="请输入您的密码"></el-input>
                </el-form-item>
                <el-button @click.prevent="handleRegister()" class="regiter-btn" type="primary">登录</el-button>
                <span v-on:click="ToLogin">已有账号？马上登录</span>
            </el-form>
        </div> -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formdata: {
                    username: '',
                    password: '',
                },
            }

        },
        methods: {
            //登录请求
            async handleLogin() {

                const res = await this.$http.post('login', this.formdata)
                console.log(res);
                const {
                    data, meta: { msg, status }
                } = res.data
                if (status === 200) {
                    //保存token 
                    localStorage.setItem('token', data.token)
                    this.$router.push({
                        name: 'home'
                    })
                    this.$message.success(msg);
                    //   1、跳转
                    // 2、提示成功
                }
                else {
                    // 不成功
                    //    提示消息
                    this.$message.error(msg);
                }

            },
            handleregister() {
                this.$router.replace('/register')
            },
            handlresetpw() {
                this.$router.replace('/')
            }

        }

    }
</script>
<style>
    .login-wrap {
        height: 100%;
        background-color: rgb(59, 96, 136);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h2 {
        text-align: center;
    }

    /* .user-actor {
        float: none;
        color: #606297;
        text-align: left;
        padding: 0 0 10px;
        margin-bottom: 0px;

    } */

    .login-wrap .login-form {
        width: 400px;
        background-color: #fff;
        border-radius: 5px;
        padding: 30px;
    }

    .login-wrap .login-btn {
        width: 100%;

    }

    .reglink {
        font-size: 22px;
        margin: 30px 0 0 50px;

        /* justify-content: center;
        align-items: center; */
    }
</style>