<template>
  <div class="register">
    <!-- top -->
    <div class="registerbg">
      <img src="../../../static/userbg.jpg">
    </div>
    <!-- bottom -->
    <div class="register_div">
      <div class="register_title">
        <span>
          <i>
            <img src="../../../static/logo.png" alt class="topImg">
          </i>
        </span>
      </div>
      <div class="register_title_text">校园悬赏令</div>
      <!-- 登陆时的表单 -->
      <div class="register_form">
        <el-form :model="RegisterForm" ref="RegisterForm" :rules="RegisterRules">
          <el-form-item prop="tel" class="reform">
            <el-input v-model="RegisterForm.tel" placeholder="请输入手机号："></el-input>
          </el-form-item>
          <el-form-item prop="code" class="reform" id="validcode">
            <el-input v-model="RegisterForm.code" placeholder="请输入验证码："></el-input>
          </el-form-item>
          <el-form-item prop="user_name" class="reform">
            <el-input v-model="RegisterForm.user_name" placeholder="请输入用户名："></el-input>
          </el-form-item>
          <el-form-item prop="password" class="reform">
            <el-input type="password" v-model="RegisterForm.password" placeholder="请设置密码："></el-input>
          </el-form-item>
          <el-form-item prop="rPassword" class="reform">
            <el-input type="password" v-model="RegisterForm.rPassword" placeholder="再次输入密码："></el-input>
          </el-form-item>
          <el-form-item prop="department" class="reform">
            <el-input v-model="RegisterForm.department" placeholder="请输入所在院系："></el-input>
          </el-form-item>
          <el-button type="danger" @click="getCode()" v-show="show">获取验证码</el-button>
          <el-button type="danger" v-show="!show" disabled="disabled">{{count}} s重新获取</el-button>
          <el-button
            type="primary"
            @click="submitForm('RegisterForm')"
            class="register_aaa"
            icon="el-icon-circle-check-outline"
          >注册</el-button>
         <!--  <el-button icon="el-icon-refresh" @click="resetForm('RegisterForm')">重置</el-button> -->
        </el-form>
      </div>
      <!-- 跳转到登陆入口 -->
      <div class="register_jump">
        <p>已有账户？
          <router-link to="/login" class="register_aaalink">立即登陆</router-link>
        </p>
        <p>
          <router-link to="/" class="register_aaalink">找回密码</router-link>
          <router-link to="/" class="register_aaalink">返回首页</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "register",
  data() {
    //验证手机号
    var phone = /^1(3|4|5|6|7|8|9)\d{9}$/;
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空！"));
      } else if (!phone.test(value)) {
        callback(new Error("请按正确格式填写手机号码"));
      } else {
        callback();
      }
    };
    //验证密码,长度为3-20的所有字符
    var worda = /^.{2,20}$/;
    var validateWord = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空！"));
      } else if (!worda.test(value)) {
        callback(new Error("密码长度至少为3"));
      } else {
        if (this.RegisterForm.rPassword !== "") {
          this.$refs.RegisterForm.validateField("rPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.RegisterForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //用户名是否合法(字母开头，允许3-16字节，允许字母数字下划线)
    var namea = /^.{2,15}$/;
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (!namea.test(value)) {
        callback(new Error("请使用字母开头，长度为4-16"));
      } else {
        callback();
      }
    };
    //验证码
    var codea = /^\d{6}$/;
    var validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (!codea.test(value)) {
        callback(new Error("验证码格式不正确"));
      } else if (this.RegisterForm.code != this.RegisterForm.bcode){
        callback(new Error("验证码不正确"));
      }else{
        callback();
      }
    };
    return {
      show : true,
      flag : false,
      count:'',
      timer:null,
      RegisterForm: {
        user_name: "",
        password: "",
        rPassword: "",
        tel: "",
        department: "",
        code: "", //验证码
        bcode :"" ,//后端获取的验证码
        //info : plus.push.getClientInfo()
      },
      RegisterRules: {
        user_name: [
          { required: true, validator: validateName, trigger: "blur" }
        ],
        tel: [{ required: true, validator: validatePhone, trigger: "blur" }],
        password: [
          { required: true, validator: validateWord, trigger: "blur" }
        ],
        rPassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        department: [
          { required: true, message: "请输入所在院系！", trigger: "blur" }
        ],
        code: [{ validator: validateCode, trigger: "blur" }]
      },
     /*  rules2: {
        tel: [{ required: true, validator: validatePhone, trigger: "blur" }]
      } */
    };
  },
  
  methods: {
    //获取验证码
    getCode() {
      var that = this;
      if(that.RegisterForm.tel!=""){
          var tel = {
            tel: that.RegisterForm.tel
          };
           //var url ="http://127.0.0.1:3000/api/users/sms"
          var url ="http://39.107.97.203:3000/api/users/sms"
          var instance = axios.create({ headers: 
              {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'}  
          });
           instance.post(url,qs.stringify(tel)).then(res => {
               if(res.status === 200){
                if (res.data.status === 0) {
                  if(res.data.code != ''){
                    console.log(res.data.code)
                    that.RegisterForm.bcode = res.data.code;
                    console.log(that.RegisterForm.bcode)
                    that.flag = true;
                    //倒计时
                    const TIME_COUNT = 60;
                    if (!that.timer) {
                      that.count = TIME_COUNT;
                      that.show = false;
                      that.timer = setInterval(() => {
                      if (that.count > 0 && that.count <= TIME_COUNT) {
                        that.count--;
                        } else {
                        that.show = true;
                        clearInterval(that.timer);
                        that.timer = null;
                        }
                      }, 1000)
                      }
                  }
                } else {
                  console.log(res.data.msg);
                   that.$message({
                    message: res.data.msg,
                    type: "error"
                  });
                  return false;
                }
              }
            })
          //});
       }else{
         that.$message({
            message: "请输入正确的手机号",
            type: "error"
          });
      }
          
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      //this.$router.push('/choose');
      this.$router.go(0)
    },
  
    //用户注册
    submitForm(formName) {
      var _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if(_this.flag ==true){
            var userRegisterData = {
              user_name: _this.RegisterForm.user_name,
              password: _this.RegisterForm.password,
              tel: _this.RegisterForm.tel,
              //code: _this.RegisterForm.code,
              department: _this.RegisterForm.department,
             // clientid:_this.RegisterForm.info.token
            };
           // var url = "http://127.0.0.1:3000/api/users/enroll";
           var url = "http://39.107.97.203:3000/api/users/enroll";
          var instance = axios.create({ headers: 
              {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'}
          });
          instance.post(url,qs.stringify(userRegisterData)).then(res => {
            if (res.status === 200) {
              if (res.data.status === 0) {
                var apiRegisterData = res.data.data;
                _this.$message({
                  message: "注册成功,首次登陆系统赠送1000积分",//+_this.RegisterForm.info.clientid
                  type: "success"
                });
                setTimeout(() => {
                   _this.$router.push({ name: "login" });
                }, 1000);
               
              } else {
                _this.$message({
                  message: res.data.msg,
                  type: "error"
                });
                return false;
              }
            } else {
              _this.$message({
                message: "注册失败!",
                type: "error"
              });
              return false;
            }
          });

          }else{
            return false;
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.topImg {
  width: 80px;
  height: 80px;
}
.register_aaalink {
  color: #fff;
  text-decoration: none;
}

.registerbg {
  text-align: left;
}
.registerbg img {
  position: fixed;
  min-width: 100%;
  min-height: 100%;
}

/* ****************** */
.register_div {
  margin: auto;
  left: 0;
  right: 0;
  top: 30px;
  bottom: 0;
  min-height: 650px;
  height: 670px;
  min-width: 350px;
  width: 350px;
  background-color: #363636;
  opacity: 0.8;
  padding-top: 40px;
}

/* ChipDesign */
.register_title {
  border: 1px solid #fff;
  padding: 10px 0;
  background-color: #fff;
}
.register_title span {
  /* letter-spacing: 2px; */
  /* font-size: 3rem; */
  display: inline-block;
  border: 1px solid #fff;
  /* width: 100%; */
  text-align: center;
}
/* 校园悬赏令 */
.register_title_text {
  text-align: center;
  margin: 15px;
  color: #fff;
  font-size: 18px;
  letter-spacing: 2px;
  font-family: "黑体";
  padding: 0 20px;
  /* border: 1px solid #fff; */
}

/* 注册表单样式 */
.register_form {
  padding: 0 30px 0 30px;
  margin-bottom: 10px;
}
.register_aaa {
  /* margin-left: 0; */
  margin-top: -5px;
}
/* 跳转 */
.register_jump {
  text-align: center;
  margin-top: 10px;
}
.register_jump p {
  color: rgb(136, 134, 134);
  font-size: 12px;
  margin-top: 10px;
  letter-spacing: 1px;
  opacity: 0.7;
}
.reform {
  padding: 0 !important;
}
/* 新加 */

/*iphone 5/SE 320*568 */
@media only screen and (max-width: 320px) {
  .register_form {
    padding-bottom: 0;
    margin-bottom: 0;
  }
  .register_div {
    width: 290px;
    height: 500px;
  }
  .register_aaa {
    margin-left: 10px;
    margin-top: 20px;
  }
  .register_jump {
    text-align: center;
  }
}
</style>


