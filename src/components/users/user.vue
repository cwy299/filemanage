<template>
    <el-card class="box-card">
        <!-- 面包屑 -->

        <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索 -->
        <el-row class="searchRow">
            <el-col>
                <el-input @clear="loadeUserList()" clearable placeholder="请输入内容" v-model="query" class="inputSearch">
                    <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="success" @click="showAddUser()" round>添加用户</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table :data="userlist" style="width: 100%">
            <el-table-column type="index" label="#" width="60">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="80">
            </el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>

            <el-table-column label="创建时间">
                <template slot-scope="userlist">
                    {{userlist.row.create_time | fmtdate}}
                </template>

            </el-table-column>


            <el-table-column label="用户状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                </template>


            </el-table-column>
            <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                    <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button plain size="mini" type="danger" icon="el-icon-delete" circle
                        @click="showDeleUserMsgBox(scope.row.id)"></el-button>
                    <el-button plain size="mini" type="success" icon="el-icon-check" circle></el-button>
                </template>
            </el-table-column>


        </el-table>
        <!-- 分页 -->
        <!-- handleSizeChange 每页显示条数变化时触发 
        handleCurrentChange 当前页改变时触发 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
            :page-sizes="[1, 2,4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <!--对话框-->
        <!--添加用户对话框-->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
            <el-form :model="form">
                <el-form-item label="用户名" label-width=100px>
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width=100px>
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width=100px>
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" label-width=100px>
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="addUser()">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
    export default {

        data() {
            return {
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                query: '',
                pagenum: 1,
                pagesize: 2,
                queryInfo: {
                    query: '',
                    // 当前页数
                    pagenum: 1,
                    // 每页显示多少数据
                    pagesize: 2
                },
                userlist: [],
                total: -1,
                dialogFormVisibleAdd: false,
                form: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: '',
                }
            }

        },
        components: {

        },
        created() {
            this.getUserList()

        },
        methods: {

            showDeleUserMsgBox(userId) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(async () => {
                        const res = await this.$http.delete(`users/${userId}`)
                        console.log(res)
                        if (res.data.meta.status === 200) {
                            this.pagenum = 1
                            this.getUserList()
                            this.$message({
                                type: 'success',
                                message: res.data.meta.msg
                            })
                        }

                    }).catch(() => {
                        //发送删除请求
                        //data中找id 无
                        //把userid以参数形式传进来

                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            },
            async addUser() {//发送请求
                //关闭对话框
                this.dialogFormVisibleAdd = false
                const res = await this.$http.post(`users`, this.form)
                console.log(res);
                const {
                    meta: { status, msg },
                    data
                } = res.data
                if (status === 201) {
                    //提示成功
                    this.$message.success(msg)


                    //更新视图
                    this.getUserList()
                    //清空文本框
                    this.form = {}
                } else {
                    this.$message.warning(msg)
                }

            },

            showAddUser() {

                this.dialogFormVisibleAdd = true

            },
            //按照input的输入来搜索，绑定了query参数
            searchUser() {
                this.getUserList()

            },
            //清空搜索框显示
            loadeUserList() {
                this.getUserList()

            },




            async getUserList() {
                const token = localStorage.getItem('token')
                this.$http.defaults.headers.common['Authorization'] = token

                // const res = await this.$http.get('users', {
                //     params: this.queryInfo
                // })
                const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
                console.log(res);
                const { meta: { status, msg }, data: { users, total } } = res.data
                if (status === 200) {
                    //给表格赋值
                    this.userlist = users
                    //给total赋值
                    this.total = total
                    //提示
                    // this.$message.success(msg)
                } else {
                    this.$message.warning(msg)
                }

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pagesize = val
                // this.pagenum = 1
                this.getUserList()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pagenum = val
                this.getUserList()
            }

        }
    }
</script>

<style>
    .box-card {
        background-color: aliceblue;
        height: 100%;
    }

    .searchRow {
        margin-top: 20px;
    }

    .inputSearch {
        width: 300px;


    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>