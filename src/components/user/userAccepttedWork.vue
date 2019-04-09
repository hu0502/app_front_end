<template>
  <div class="userAccepttedWork">
    <mt-header title="我接收的任务">
      <mt-button icon="back" slot="left" @click="$router.back(-1)">返回</mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <ul class="workul-worklist">
      <li v-for="(index,val) in tasklist" :key="val">
        <p>
          <span class="worklist-username">{{index.title}}</span>
          <el-tag type="success" class="icontypea label2">{{index.label}}</el-tag>
          <!--任务标签-->
          <el-tag v-if="index.mission_statu===0" type="danger" class="icontypea label3">未接单</el-tag>
          <el-tag v-if="index.mission_statu===1" type="primary" class="icontypea label3">进行中</el-tag>
          <el-tag v-if="index.mission_statu===2" type="success" class="icontypea label3">已完成</el-tag>
          <el-tag v-if="index.mission_statu===3" type="danger" class="icontypea label3">已超时</el-tag>
          <span class="worklist-money">
            <i class="iconfont icontest"></i>
            <span>{{index.score}}</span>
          </span>
        </p>
        <p class="worklist-content">雇主：{{index.master_name }}</p>
        <p class="worklist-content">发布于：{{index.create_time}}</p>
        <p class="worklist-content">有效期：{{index.validtime}}</p>
        <router-link
          :to="{
                path: '/workdetails',
                query: {
                    mission_id: index.mission_id
                }
                }"
          class="aaalistlink"
        >
          <el-button icon="el-icon-search" circle type="danger" class="check"></el-button>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style>
* {
  padding: 0;
  margin: 0;
}
.mint-header {
  background-color: #46b1b8;
  height: 65px;
  font-size: 16px;
  line-height: 65px;
}
.mint-header-title {
  line-height: 65px;
  margin: 0;
}
/* 任务列表 */
.workul-worklist {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
  display: inline-block;
  width: 100%;
}
.workul-worklist li {
  border-bottom: 1px solid #eee;
  /* margin-top: 10px; */
  padding: 10px 5px;
}
.workul-worklist li:last-child {
  margin-bottom: 55px;
  bottom: 0;
}
.worklist-userlogo {
  border-radius: 50%;
  float: left;
  margin-left: 15px;
  margin-top: 2px;
  width: 35px;
  height: 35px;
}
.workul-worklist p {
  height: 40px;
  line-height: 40px;
}
/* 用户名 */
.worklist-username {
  float: left;
  margin-left: 20px;
  color: #000;
  font-weight: bold;
  font-size: 16px;
}
/* 悬赏金币位置 */
.worklist-money {
  left: 87%;
  position: absolute;
}
/* 任务标题 */
.worklist-content {
  margin-left: 20px;
  text-align: left;
  color: #545454;
}
.aaaworklist {
  text-decoration: none;
  color: #fff;
}
/* 任务类型 */
.worklist-type {
  position: absolute;
  margin-top: 5px;
  width: 60px;
  display: inline-block;
  right: 100px;
}
.check {
  position: absolute;
  left: 86%;
  margin-top: -50px !important;
}
.icontest {
  color: #fae41c;
}
.icontypea {
  position: relative;
  float: right;
  right: 15%;
  margin-top: 3px;
  padding: 0 3px;
  margin-right: 10px;
}
.aaalistlink {
  text-decoration: none;
  /* color: #666; */
}
.accept-aaalistlink {
  text-decoration: none;
  color: #fff;
}
</style>
<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "userAccepttedWork",
  data() {
    return {
      tasklist: []
    };
  },
  methods: {
    //获取当前用户接收的所有任务
    getUsersWork: function() {
      var that = this;
      //var url = "http://127.0.0.1:3000/api/users/myAcceptMission";
      var url = "http://39.107.97.203:3000/api/users/myAcceptMission";
      var instance = axios.create({
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      });
      var userdata = {
        user_id: that.$store.state.user_id
      };
      instance.post(url, qs.stringify(userdata)).then(res => {
        if (res.status === 200) {
          if (res.data.status === 0) {
            that.tasklist = res.data.data.reverse();
            for (let i = 0; i < that.tasklist.length; i++) {
              that.tasklist[i].create_time = new Date(
                that.tasklist[i].create_time
              ).format("yyyy-MM-dd hh:mm");
              that.tasklist[i].validtime = new Date(
                that.tasklist[i].validtime
              ).format("yyyy-MM-dd hh:mm");
            }
            console.log(that.tasklist);
          } else {
            that.$message({
              message: res.data.msg,
              type: "error"
            });
            return false;
          }
        } else {
          that.$message({
            message: res.data.msg,
            type: "error"
          });
          return false;
        }
      });
    }
  },
  mounted() {
    this.getUsersWork();
  }
};
</script>



