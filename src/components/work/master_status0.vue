<template>
  <div class="master_status0">
    <mt-header title="我发布的任务">
      <mt-button icon="back" slot="left" @click="$router.back(-1)">返回</mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
     <ul class="workul-worklist" v-if="this.flag == true">
      <li v-for="(index,val) in tasklist" :key="val">
        <p>
          <span class="worklist-username">
             <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconyoujiantou2"></use>
          </svg>
            {{index.title}}</span>
          <el-tag type="primary" class="icontype label2">{{index.label}}</el-tag>
          <el-tag v-if="index.mission_statu===0" type="danger" class="icontype label3">未接单</el-tag>
          <el-tag v-if="index.mission_statu===1" type="primary" class="icontype label3">进行中</el-tag>
          <el-tag v-if="index.mission_statu===2" type="success" class="icontype label3">已完成</el-tag>
          <el-tag v-if="index.mission_statu===3" type="danger" class="icontype label3">已超时</el-tag>
          <span class="worklist-money">
            <i class="iconfont icontest"></i>
            <span>{{index.score}}</span>
          </span>
        </p>
        <p class="worklist-content">
          <span>雇主：{{index.master_name }}</span>
          <span style="right: 5%;position: absolute;">浏览：{{index.times }}</span>
        </p>
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
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
         layout="total, prev, pager, next"
        :total="this.count"
      >
      
      </el-pagination>
       <router-link to="/"><el-button type="primary" class="btn_list" >返回首页</el-button></router-link>
       
    </ul>
     <ul v-else-if="this.flag==false" class="workul-worklist">
      <img src="../../../static/nothing.png" class="nothing">
       <router-link to="/"><el-button type="primary" class="btn_list" >返回首页</el-button></router-link>
    </ul>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
.nothing{
  width: 100%;
  height: 100%;
}
.btn_list{
  margin-top: 15px;
}
.mint-header {
  background-color:#46b1b8 !important;
  height: 55px !important;
  font-size: 15px;
  line-height: 55px !important;
}
.mint-header-title {
  line-height: 55px !important;
  margin: 0;
}
/* 任务列表 */
.workul-worklist {
  display: inline-block;
  width: 100%;
}
.workul-worklist li {
  border-bottom: 1px solid #eee;
  padding: 10px 5px;
}
.workul-worklist li:last-child {
  margin-bottom: 55px;
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
  padding-left: 6%;
  color: #000;
  font-family: "黑体";
  font-size: 16px;
}
/* 悬赏金币位置 */
.worklist-money {
  /* right:6% !important;
  position: absolute; */
   position: relative;
  float: right;
  margin-right: -110px;
}
/* 任务标题 */
.worklist-content {
  padding-left: 6%;
  text-align: left;
  color: #545454;
  font-size: 15px;
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
  /* position: absolute;
  right:6% !important;
  margin-top: -50px !important; */
   position: relative;
  float: right;
   margin-right: 15px !important;
  margin-top: -12% !important;
}
.icontest {
  color: #fae41c;
}
.icontype {
  position: relative;
  float: right;
  right: 70px;
  margin-top: 3px;
  margin-right: 10px;
}
.aaalistlink {
  text-decoration: none;
  color: #666666;
}
.usersWork-aaalistlink {
  text-decoration: none;
  color: #fff;
}
/* 分页css */
.el-pager li{
  padding: 0 !important;
}
.el-pagination{
  height: 30px !important;
  margin-top: 10px !important;
}
</style>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name:'master_status0',
  data() {
    return {
      flag:true,
      tasklist: [],
      currentPage: 1, //初始页
      pagesize: 4, //每页的数据
      count:0,
    };
  },
  methods: {
     // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
            this.pagesize = size;
            this.getUsersWork()
            //console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            //console.log(this.currentPage)  //点击第几页
            this.getUsersWork()
        },
    //获取当前用户发布的所有任务
    getUsersWork: function() {
      var that = this;
      var data = {
        user_id: that.$store.state.user_id
      };
      // var url = "http://127.0.0.1:3000/api/mission/master_status0";
     var url = "http://39.107.97.203:3000/api/mission/master_status0";
      var instance = axios.create({
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      });
      instance.post(url, qs.stringify(data)).then(res => {
        if (res.status === 200) {
          if (res.data.status === 0) {
            //that.tasklist = res.data.data.reverse();
            that.count = res.data.data.length;
            that.tasklist=res.data.data.reverse().slice((that.currentPage-1)*that.pagesize,that.currentPage*that.pagesize)
            for (let i = 0; i < that.tasklist.length; i++) {
              that.tasklist[i].create_time = new Date(
                that.tasklist[i].create_time
              ).format("yyyy-MM-dd hh:mm");
              that.tasklist[i].validtime = new Date(
                that.tasklist[i].validtime
              ).format("yyyy-MM-dd hh:mm");
               if(that.tasklist[i].times == null) that.tasklist[i].times = 0;
            }
          } else {
            /* that.$message({
              message: res.data.msg,
              type: "error"
            }); */
            that.flag = false;
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


