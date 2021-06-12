<template>
    <div class="login-wrap">
        <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
            <h2>用户登录</h2>
            <!-- <div style="margin-top: 20px">

                <el-form-item class="user-actor">用户角色</el-form-item>
                <el-radio v-model="radio2" label="1" border size="small">备选项1</el-radio>
                <el-radio v-model="radio2" label="2" border size="small">备选项2</el-radio>
                <el-radio v-model="radio2" label="3" border size="small">备选项3</el-radio>
            </div> -->

            <el-form-item label="用户名">
                <el-input v-model="formdata.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formdata.password" type="password"></el-input>
            </el-form-item>
            <el-button @click.prevent="handleLogin()" class="login-btn" type="primary">登录</el-button>

        </el-form>

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

                radio2: '1'
            }

        },
        methods: {
            //登录请求
            handleLogin() {
                if (this.formdata.username == "" || this.formdata.password == "") {
                    alert("请输入用户名或密码")
                }

                this.$http.post('login', this.formdata,)
                    .then(res => {
                        const {
                            data, meta: { msg, status }
                        } = res.data


                        if (status === 200) {
                            // this.$router.push({name:'home'})
                            this.$message.success(msg);
                            //   1、跳转
                            // 2、提示成功
                        }
                        else {
                            // 不成功
                            //    提示消息
                            this.$message.error(msg);
                        }




                    })
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

    .user-actor {
        float: none;
        color: #606297;
        text-align: left;
        padding: 0 0 10px;
        margin-bottom: 0px;

    }

    .login-wrap .login-form {
        width: 400px;
        background-color: #fff;
        border-radius: 5px;
        padding: 30px;
    }

    .login-wrap .login-btn {
        width: 100%;

    }
</style>