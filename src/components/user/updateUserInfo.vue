<template>
    <div class="updateUserInfo">
    <mt-header title="修改个人信息" class="personal">
      <mt-button icon="back" slot="left" @click="$router.back(-1)">
        返回
      </mt-button>
    </mt-header>
    <div class="update">
        <el-form :model="updateForm" status-icon :rules="updaterules" ref="updateForm" class="demo">
           
            <el-form-item prop="user_name" label="用户名">
                <el-input  v-model="updateForm.user_name" placeholder="用户名：" :disabled="true">{{updateForm.user_name}}</el-input>
            </el-form-item>
            <el-form-item prop="tel" label="电话">
                <el-input v-model="updateForm.tel" placeholder="联系电话：" :disabled="true">{{updateForm.tel}}</el-input>
            </el-form-item>
            <el-form-item prop="department" label="院系" >
                <el-input  v-model="updateForm.department" placeholder="所在院系：">{{updateForm.department}}</el-input>
            </el-form-item>
             <el-form-item prop="u_class" label="班级">
                <el-input  v-model="updateForm.u_class" placeholder="所在专业班级：">{{updateForm.u_class}}</el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input type="password" v-model="updateForm.password" placeholder="请输入新密码："></el-input>
            </el-form-item>
            <el-form-item prop="rPassword" label="再次新密码">
                <el-input type="password" v-model="updateForm.rPassword" placeholder="再次输入密码："></el-input>
            </el-form-item>
           
             <el-form-item label="性别" prop="sex" >
                <el-select v-model="updateForm.sex" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
        <el-form-item>
            <el-button type="danger" @click="submitForm('updateForm')">确认修改</el-button>
        </el-form-item>

        </el-form>
    </div>
    </div>
</template>
<style>
.updatelinklink{
  text-decoration: none;
  color: #fff;
}
.personal {
  height: 70px;
  width: 100%;
  line-height: 70px;
  font-size: 18px;
}
.update{
    margin: auto;
    padding: 30px 0;
}
.demo{
     margin: auto;
     width: 80%;
   
}
</style>
<script>
import axios from "axios";
import qs from "qs";
export default {
    name:'updateUserInfo',
    data() {
         //验证密码,长度为3-20的所有字符
        var worda = /^.{2,20}$/;
        var validateWord = (rule, value, callback) => {
        if (!value) {
            return callback(new Error("密码不能为空！"));
        } else if (!worda.test(value)) {
            callback(new Error("密码长度至少为3"));
        } else {
            if (this.updateForm.rPassword !== "") {
            this.$refs.updateForm.validateField("rPassword");
            }
            callback();
        }
        };
        var validatePass2 = (rule, value, callback) => {
        if (value === "") {
            callback(new Error("请再次输入密码"));
        } else if (value !== this.updateForm.password) {
            callback(new Error("两次输入密码不一致!"));
        } else {
            callback();
        }
        };
        return {
            updateForm:{
                user_id: this.$store.state.user_id,
                user_name:"",
                tel:"",
                password: "",
                rPassword: "",
                sex:"",
                department:"",
                u_class:"",
                image:""
            },
            updaterules: {
                password: [
                { required: true, validator: validateWord, trigger: "blur" }
                ],
                rPassword: [
                { required: true, validator: validatePass2, trigger: "blur" }
                ],
                // :"",
                department: [
                { required: true, message:"请填写所在院系", trigger: "blur" }
                ],
                u_class: [
                { required: true, message:"请填写所在专业班级", trigger: "blur" }
                ],
                sex: [
                { required: true, message:"请选择性别", trigger: "blur" }
                ],
            },
        }
    },
    methods: {
      updateInfo(){
        var that = this;
        //var url = "http://39.107.97.203:8080/api/OfferReward/User/SelectUserMsg";  
        //var url = "http://127.0.0.1:3000/api/users/selectUserMsg";  
        var url = "http://39.107.97.203:3000/api/users/selectUserMsg";  
        var instance = axios.create({ headers: 
            {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'} 
        });
        instance.get(url, {
            params: {
                user_id: that.$store.state.user_id
            }
            })
        .then(res => {
          if (res.status === 200) {
            if (res.data.status === 0) {
              var userInfoApi = res.data.data;
              
              that.updateForm.user_name = userInfoApi.user_name;
              that.updateForm.tel = userInfoApi.tel;
              that.updateForm.department = userInfoApi.department;
              that.updateForm.u_class = userInfoApi.u_class;
              that.updateForm.sex = userInfoApi.sex;
              if(that.updateForm.u_class == null){
                that.updateForm.u_class = "未填写"
              }
              if(that.updateForm.sex == null){
                that.updateForm.sex = "未填写"
              }
            } else {
              that.$message({
                message: res.data.msg,
                type: "error"
              });
              return false;
            }
          } else {
            console.log(res);
            return false;
          }
        });
      },

    //用户提交更新
    submitForm(formName) {
      var _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          var Data = {
            user_id: _this.$store.state.user_id,
            user_name: _this.updateForm.user_name,
            tel: _this.updateForm.tel,
            password: _this.updateForm.password,
            department: _this.updateForm.department,
            u_class: _this.updateForm.u_class,
            sex: _this.updateForm.sex,
            image: null
          };
         console.log(Data)
         // var url = "http://39.107.97.203:8080/api/OfferReward/User/Update";
          //var url = "http://127.0.0.1:3000/api/users/update";
          var url = "http://39.107.97.203:3000/api/users/update";
           var instance = axios.create({ headers: 
              {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'} 
          });
          instance.post(url,qs.stringify(Data)).then(res => {
            if (res.status === 200) {
              console.log(res)
              if (res.data.status === 0) {
                var apiData = res.data.data;
                _this.$message({
                  message: "成功更新个人信息",
                  type: "success"
                });
                // _this.$router.push({ name: "personalcenter" });
                _this.$router.go(0);
              } 
              else {
                _this.$message({
                  message: res.data.msg,
                  type: "error"
                });
                return false;
              }
            } 
            else {
              _this.$message({
                message: "更新失败!",
                type: "error"
              });
              return false;
            }
          });
        } else {
          return false;
        }
      });
    }
    },
    mounted() {
        this.updateInfo()
    },
}
</script>


