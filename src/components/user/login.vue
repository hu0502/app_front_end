<template>
    <div class="login">
        <!-- top -->
        <div class="loginbg">
           <img src="../../../static/userbg.jpeg">
       </div>
       <!-- bottom -->
       <div class="login_div">
            <div class="login_title">
                <span><i>
                     <img src="../../../static/logo.png" alt="" class="topImg" />
                </i></span>
            </div>
            <div class="login_title_text">校园悬赏令</div>
            <!-- 登陆时的表单 -->
            <div class="login_form">
                <el-form :model="LoginForm" ref="LoginForm" :rules="loginRules">
                    <el-form-item prop="username">
                        <el-input v-model="LoginForm.username" placeholder="请输入用户名："></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="LoginForm.password" placeholder="请输入密码："></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="submitForm('LoginForm')" class="login_aaa" icon="el-icon-circle-check-outline">登录</el-button>
                    <el-button icon="el-icon-refresh">重置</el-button>
                </el-form>
            </div>
            <!-- 跳转到注册入口 -->
            <div class="jump">
                <p>还没有账户？去 <router-link to="/register" class="aaalink">立即注册</router-link></p>
                <p>
                     <router-link to="/" class="aaalink"> 找回密码 </router-link> 
                     <router-link to="/" class="aaalink"> 返回首页 </router-link> 
                </p>
            </div>
       </div>

    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    name:'login',
    data() {
         //验证用户名
        //帐号是否合法(字母开头，允许3-16字节，允许字母数字下划线)
        var namea = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/
        var validateName = (rule,value,callback)=>{
           if (!value) {
                return callback(new Error('用户名不能为空！'))
            } else if (!namea.test(value)) {
                callback(new Error('请按正确格式填写用户名'))
            } else {
                callback()
            }
            
        }
        //验证密码(长度为3-20的所有字符)
        var worda = /^.{2,20}$/
        var validateWord = (rule,value,callback)=>{
           if (!value) {
               return callback(new Error('密码不能为空！'))
            } else if (!worda.test(value)) {
               callback(new Error('请按正确格式填写密码'))
            } else {
               callback()
            }
        }


        return {
           LoginForm:{
                username:"",
                password:""
           },
           loginRules: {
                username:[{ required: true, validator: validateName, trigger: "blur"}],
                password:[{ required: true, validator: validateWord, trigger: "blur"}]
            }
        }
    },
    methods: {
    //用户登录
    submitForm(formName) {
        var _this = this;
        _this.$refs[formName].validate(valid =>{
            if(valid){            
                var userData ={
                    user_name :_this.LoginForm.username,
                    password :_this.LoginForm.password,
                }
                var url = 'http://127.0.0.1:3000/api/users/login'
                //var url = 'http://39.107.97.203:3000/api/users/login'
                var instance = axios.create({ headers: 
                    {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'} 
                });
                instance.post(url,qs.stringify(userData))
                 .then(res =>{
                     if (res.status === 200){
                         if(res.data.status===0){
                             var apiData = res.data.data;
                            _this.$store.commit('SET_user_id', apiData.user_id)
                            _this.$store.commit('GET_user_name', apiData.user_name)
                           //console.log(_this.$store.state.user_id)
                                _this.$router.push({ name:'user'})
                                _this.$message({
                                    message: '登陆成功',
                                    type: 'success'
                                })
                            }else{
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            })
                         return false;
                            }
                     }else{
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        })
                         return false;
                    }
                 })
                }else {
                    return false;
                }
            })
        }
    },
}
</script>

<style>
*{
    padding: 0;margin: 0;
}
.aaalink{
    text-decoration: underline;
    color: #fff;
}
.topImg{
    width: 100px;height: 100px;
}
.loginbg{
    text-align: left;
}
.loginbg img{
    position: fixed;
    min-width: 100%;  
    min-height: 100%;
}

.topP11{
    border: 1px solid #ff0000;
    padding: 70px 0;
    margin-top: 3%;
}
/* 用户头像大小-未登录 */
.topP11 img{
    width: 150px;height: 150px;
}

/* ****************** */
.login_div{
    margin: auto;
    padding-top: 30px;
    left: 0;right: 0;top: 0;bottom: 0;
    width: 330px;
    height: 580px;
    /* position: fixed; */
    background-color: #363636;
    opacity: .8;
}



/* ChipDesign */
.login_title{
    border: 1px solid #fff;
    padding: 5px 0;
    background-color: #fff;
}
.login_title span{
    /* letter-spacing: 2px; */
    /* font-size: 3rem; */
    display: inline-block;
    border: 1px solid #fff;
    /* width: 100%; */
    text-align: center;
}
/* WELCOME */
.login_title_text{
    text-align: center;
    margin: 20px;
    color: #fff;
    font-size: 18px;
    letter-spacing: 2px;
    font-family: "黑体";
    padding: 10px 20px;
    /* border: 1px solid #fff; */
}

/* 登陆表单样式 */
.login_form{
    padding:15px 30px 20px 30px;
    margin-bottom: 10px;
}
.login_aaa{
    /* margin-left: 0; */
    margin-top: 20px;
}
/* 跳转 */
.jump{
    text-align: center;
}
.jump p{
    color: rgb(136, 134, 134);
    font-size: 12px;
    margin-top: 5px;
    letter-spacing: 1px;
    opacity: .7;
}

/*iphone 5/SE 320*568 */
@media only screen and (max-width: 320px) {
    .login_form{
        padding-bottom:0;
        margin-bottom: 0;
    }
    .login_div{
        width: 290px;
        height: 500px;
    }
    .login_aaa{
        margin-left: 10px;
        margin-top: 20px;
    }
    .jump{
        text-align: center;
    }
}
</style>


