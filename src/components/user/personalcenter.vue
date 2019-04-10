<template>
  <div class="personalcenter">
    <mt-header title="个人中心" class="personal">
      <mt-button icon="back" slot="left" @click="$router.back(-1)">
        返回
      </mt-button>
    </mt-header>
    <div class="personalcontent">
     <!--  <p>用户ID<span>{{this.$store.state.user_id}}</span></p> -->
      <p>用户名<span>{{this.$store.state.user_name}}</span></p>
      <p>注册时间<span>{{this.userInfo.createtime}}</span></p>
      <p>联系方式<span>{{this.userInfo.tel}}</span></p>
      <p>我的积分<span>{{this.userInfo.score}}</span></p>
      <p>所在院系<span>{{this.userInfo.department}}</span></p>
      <p>专业班级<span>{{this.userInfo.u_class}}</span></p>
      <p>性别<span>{{this.userInfo.sex}}</span></p>
      <router-link to="/updateUserInfo">
        <el-button  type="primary" class="linkbbb-buttonpppp">修改资料</el-button>
      </router-link>
      <el-button type="danger" @click="logout()" class="linkbbb-buttonpppp">注销登陆</el-button>
    </div>
  </div>
</template>
<style>
.personal {
  height: 75px;
  width: 100%;
  line-height: 75px;
  font-size: 18px;
  background-color:#46b1b8 !important;
}
.personallink {
  text-decoration: none;
  color: #fff;
}
/* 内容区 */
.personalcontent {
  border-top: 1px solid #eee;
  padding: 20px 0;
}
.personalcontent p {
  text-align: left;
  padding: 12px 30px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  color: #545454;
}
.personalcontent p span {
  display: inline-block;
  position: absolute;
  right: 20px;
  color: #666;
}

.linkbbb-buttonpppp {
  display: inline-block;
  width: 110px;
  height: 50px;
  font-size: 14px;
  margin-top: 30px !important;
}

</style>
<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "personalcenter",
  data() {
    return {
      userInfo: {
        user_id: "",
        user_name: "",
        department: "",
        createtime: "",
        tel: "",
        sex:"",
        score:"",
        u_class:''
      }
    };
  },
  methods: {
    //查询用户信息
    getUserInfo: function() {
      var that = this;
      var url = "http://127.0.0.1:3000/api/users/selectUserMsg";
     // var url = "http://39.107.97.203:3000/api/users/selectUserMsg";
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
              that.userInfo.user_name = userInfoApi.user_name;
              that.userInfo.department = userInfoApi.department;
              that.userInfo.u_class = userInfoApi.u_class;
              that.userInfo.sex = userInfoApi.sex;
              that.userInfo.createtime = new Date(userInfoApi.createtime).format(
                "yyyy-MM-dd"
              );
              that.userInfo.tel = userInfoApi.tel;
              that.userInfo.score = userInfoApi.score;
              if(userInfoApi.u_class == null){
                that.userInfo.u_class = "未填写"
              }
              if(userInfoApi.sex == null){
                that.userInfo.sex = "未填写"
              }else if(userInfoApi.sex === 0){
                that.userInfo.sex = "男"
              }else{
                that.userInfo.sex = "女"
              }
             
             
            } else {
              that.$message({
                message: res.data.msg,
                type: "error"
              });
              return false;
            }
          } else {
            console.log(res.status);
            return false;
          }
        });
    },
    //注销登陆
    logout: function() {
      this.$store.commit("LOGOUT");
      this.$message({
        message: "注销成功，返回首页",
        type: "success"
      });
      this.$router.push({ name: "home" });
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>


