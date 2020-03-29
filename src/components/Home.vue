<template>
    <el-container class="home-container">
<!--        页头-->
        <el-header>
            <div>
                <img src="../assets/logo.png" alt="">
                <span>后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
<!--        页面主体-->
        <el-container>
<!--            侧边栏-->
            <el-aside :width="isCollapse?'64px':'200px'">
<!--                侧边栏菜单区-->
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#409eff" :collapse="isCollapse" :collapse-transition="false" unique-opened>
<!--                    一级菜单-->
                    <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
<!--                        一级菜单模版-->
                        <template slot="title">
<!--                            图标-->
                            <i :class="iconObj[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item :index="subItem.id+''" v-for="subItem in item.children" :key="subItem.id">
                            <template slot="title">
                                <!--                            图标-->
                                <i class="el-icon-menu"></i>
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
<!--            主题显示区-->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data(){
          return {
              menulist:[],
              iconObj:{
                  '125':'el-icon-user-solid',
                  '103':'el-icon-s-management',
                  '101':'el-icon-s-goods',
                  '102':'el-icon-s-order',
                  '145':'el-icon-s-data'
              },
              isCollapse:false
          }
        },
        created(){
          this.getMenuList();
        },
        methods: {
            logout: function () {
                window.sessionStorage.clear();
                this.$router.push('/login');
            },
            getMenuList:async function () {
                const {data:res} = await this.$http.get('menus');
                if(res.meta.code!==200)
                    return this.$message.error(res.meta.message);
                this.menulist = res.data;
                console.log(res)
            },
            toggleCollapse:function () {
                this.isCollapse = !this.isCollapse;
            }
        }
    }
</script>

<style lang="less" scoped>
    .home-container{
        height: 100%;
    }
    .el-header{
        display: flex;
        justify-content: space-between;
        background-color: #373d41;
        align-items: center;
        color: white;
        font-size: 20px;
        >div{
            display: flex;
            align-items: center;
            span{
                margin-left: 15px;
            }
            img{
                width: 35px;
                height: 35px;
                border: 1px solid white;
                border-radius: 50%;
            }
        }
    }
    .el-aside{
        background-color: #333744;
        .el-menu{
            border-right: 0px;
        }
    }
    .el-main{
        background-color: #eaedf1;
    }
    .toggle-button{
        background-color: #4A5064;
        font-size: 10px;
        line-height: 24px;
        color: white;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
</style>
