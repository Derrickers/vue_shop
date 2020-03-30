<template>
    <div>
<!--        面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
<!--        卡片视图区域-->
        <el-card>
<!--            搜索与添加区域-->
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table
                    :data="userlist"
                    style="width: 100%" border stripe>
                <el-table-column type="index">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="电话">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        prop="roleName"
                        label="用户角色">
                </el-table-column>
                <el-table-column label="状态">
<!--                    作用域插槽，接收本行对应的数据-->
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mgState" @change="userStateChanged(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="用户操作" width="180px">
                    <template>
<!--                        删除按钮-->
                        <el-tooltip effect="dark" content="编辑角色" placement="top-end" :enterable="false">
                            <el-button size="small" type="primary" icon="el-icon-edit" circle></el-button>
                        </el-tooltip>
<!--                        修改按钮-->
                        <el-tooltip effect="dark" content="删除角色" placement="top-end" :enterable="false">
                            <el-button size="small" type="danger" icon="el-icon-delete" circle></el-button>
                        </el-tooltip>
<!--                        分配角色按钮-->
                        <el-tooltip effect="dark" content="分配角色" placement="top-end" :enterable="false">
                            <el-button size="small" type="warning" icon="el-icon-setting" circle></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
<!--            分页区域-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                //获取用户列表参数对象
                queryInfo:{
                    query:'',
                    pagenum:1,
                    pagesize:2
                },
                total:0,
                userlist:[],
                roles:["超级管理员"]
            }
        },
        created(){
            this.getUserList();
        },
        methods:{
            getUserList:async function () {
                const {data:res} = await this.$http.get('users',{params:this.queryInfo});
                if(res.meta.code!==200)
                    return this.$message.error("获取用户列表失败");
                this.userlist = res.data.data;
                this.total = res.data.total;
                console.log(res);
            },
            handleSizeChange:function (newSize) {
                this.queryInfo.pagesize = newSize;
                this.getUserList();
            },
            handleCurrentChange:function (newPage) {
                this.queryInfo.pagenum = newPage;
                this.getUserList();
            },
            /*监听状态改变*/
            userStateChanged:async function (userInfo) {
                const {data:res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mgState}`);
                if(res.meta.code!==200){
                    userInfo.mgState = !userInfo.mgState;
                    return this.$message.error("更新用户状态失败");
                }
                this.$message.success('更新用户状态成功');
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
