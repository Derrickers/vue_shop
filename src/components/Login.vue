<template>
    <div class="login_container">
        <div class="login_box">
            <!--            头像区-->
            <div class="avatar_box">
                <img src="../assets/logo.png">
            </div>
            <!--            登陆表单区-->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <!--            用户名输入-->
                <el-form-item prop="username">
                    <el-input placeholder="请输入用户名" v-model="loginForm.username"
                              prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <!--            密码输入-->
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" type="password" v-model="loginForm.password"
                              prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <!--            按钮区-->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登陆</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginForm: {
                    username: "admin",
                    password: "123456",
                },
                loginFormRules: {
                    //验证用户名是否合法
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                        {min: 3, max: 10, message: "长度在3到10个字符之间", trigger: "blur"}
                    ],
                    //验证用户密码是否合法
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {min: 6, max: 22, message: "长度在6到22个字符之间", trigger: "blur"}
                    ]

                }
            }
        },
        methods: {
            resetLoginForm: function () {
                this.$refs.loginFormRef.resetFields();
            },
            login: function () {
                this.$refs.loginFormRef.validate(async valid => {
                    if (!valid)
                        return;
                    const {data: res} = await this.$http.post('login', this.loginForm);
                    if (res.meta.code !== 200)
                        return this.$message.error(res.meta.message)
                    window.sessionStorage.setItem("token", res.data.token);
                    this.$message.success(res.meta.message)
                    this.$router.push('/home')
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: white;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid white;
        background-color: #fff;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }
</style>
