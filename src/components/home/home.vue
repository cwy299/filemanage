<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <img src="../../assets/logo.png" alt="无法显示" width="150px" height="50px">
                    </div>
                </el-col>
                <el-col :span="18" class="middle">
                    <h3>文 件 管 理 系 统 </h3>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <a href="#" class="loginout" @click.prencent="handleSigout()">退出</a>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="aside" width="200px">
                <el-menu :router="true" :unique-opened="true">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item index="users">
                            <i class="el-icon-user"></i>
                            <span>用户列表</span>
                        </el-menu-item>
                    </el-submenu>
                    <!-- 2 -->
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="2-1">
                            <i class="el-icon-location"></i>
                            <span>角色列表</span>
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            <i class="el-icon-location"></i>
                            <span>权限列表</span>
                        </el-menu-item>
                    </el-submenu>
                    <!-- 3 -->
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>文件管理</span>
                        </template>
                        <el-menu-item index="3-1">
                            <i class="el-icon-location"></i>
                            <span>文件列表</span>
                        </el-menu-item>
                        <el-menu-item index="3-2">
                            <i class="el-icon-location"></i>
                            <span>分类参数</span>
                        </el-menu-item>
                        <el-menu-item index="3-3">
                            <i class="el-icon-location"></i>
                            <span>文件分类</span>
                        </el-menu-item>
                    </el-submenu>
                    <!-- 4 -->
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span>文件管理</span>
                        </template>
                        <el-menu-item index="4-1">
                            <i class="el-icon-location"></i>
                            <span>文件列表</span>
                        </el-menu-item>
                        <el-menu-item index="4-2">
                            <i class="el-icon-location"></i>
                            <span>文件参数</span>
                        </el-menu-item>
                        <el-menu-item index="4-3">
                            <i class="el-icon-location"></i>
                            <span>文件分类</span>
                        </el-menu-item>
                    </el-submenu>
                    <!-- 5 -->
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>数据统计</span>
                        </template>
                        <el-menu-item index="5-1">
                            <i class="el-icon-location"></i>
                            <span>文件列表</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        beforeCreate() {
            //获取token
            const token = localStorage.getItem('token')
            //if token 有 ->继续渲染组件
            if (!token) {
                //token 没有 ->登录
                this.$router.push({
                    name: 'login'
                })
            }
            //if token 有 ->继续渲染组件

        },
        data() {
            return {

            }
        },
        components: {

        },
        methods: {
            handleSigout() {
                //清除toke
                localStorage.clear()
                //提示
                this.$message.success('退出成功')
                //来到login
                this.$router.push({ name: 'login' })
            }
        }


    }
</script>

<style>
    .container {
        height: 100%;
    }

    .header {
        background-color: #b3c0d1;
    }

    .aside {
        background-color: #d3dce6;
    }

    .main {
        background-color: #e9eef3;
        height: 100%;
    }

    .middle {
        line-height: 25px;
        text-align: center;

    }

    .loginout {
        line-height: 60px;
        text-decoration: none;
    }
</style>