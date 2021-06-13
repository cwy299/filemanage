<template>
    <div class="register-wrap">
        <el-form class="reg-form" ref="reg-form" label-position="top" label-width="80px" :model="userformdata">
            <h2>用户注册</h2>
            <el-form-item label="账户名称">
                <el-input v-model="userformdata.usename" placeholder="请输入您的账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="userformdata.password" type="password" placeholder="请输入您的密码"></el-input>
            </el-form-item>
            <el-button @click.prevent="handleregister()" class="reg-btn" type="primary">注册</el-button>
            <el-link @click.prevent="handlhandlelogine()" class="reglink" type="primary">
                登录
            </el-link>
            <el-link @click.prevent="handlresetpw()" class="reglink" type="primary">
                忘记密码
            </el-link>
        </el-form>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                rules: {
                    username: [{ required: true, message: "用户账号不能为空", trigger: "blur" }],
                    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],


                },
                userformdata: {
                    username: '',
                    password: '',
                },

            }
        },
        methods: {
            handleregister() {
                this.$http.post('register', this.userformdata).then(res => {
                    console.log(res)
                })
                // this.$refs["reg-form"].validate(valid => {
                //     if (valid) {
                //         // 不成功
                //         //    提示消息
                //         register(this.userformdata).then(response => {
                //             // this.$message.success(msg);
                //             console.log(res)
                //         })
                //     }
                //     else {
                //         // 不成功
                //         //    提示消息
                //         // this.$message.error(msg);
                //     }

                // })



            },
            handlelogin() {
                this.$router.replace('/login')
            },
            handlresetpw() {
                this.$router.replace('/')
            },


        }

    }

</script>

<style>
    .register-wrap {
        height: 100%;
        background-color: rgb(59, 96, 136);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h2 {
        text-align: center;
    }

    .register-wrap .reg-form {
        width: 400px;
        background-color: #fff;
        border-radius: 5px;
        padding: 30px;
    }

    .register-wrap .reg-btn {
        width: 100%;

    }

    .reglink {
        font-size: 22px;
        margin: 30px 0 0 50px;

        /* justify-content: center;
        align-items: center; */
    }
</style>