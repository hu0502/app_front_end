<template>
  <div class="home">
    <!-- 底部选项卡 -->
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="1">
        <i slot="icon" class="iconfont iconshouye bbb"></i>
        <span class="aaa">首页</span>
      </mt-tab-item>
      <mt-tab-item id="2">
        <i slot="icon" class="iconfont iconfaxian bbb"></i>
        <span class="aaa">广场</span>
      </mt-tab-item>

      <mt-tab-item id="4">
        <i slot="icon" class="iconfont iconxiaoxi1 bbb"></i>
        <span class="aaa">消息</span>
      </mt-tab-item>
      <mt-tab-item id="5">
        <i slot="icon" class="iconfont iconwode bbb"></i>
        <span class="aaa">我的</span>
      </mt-tab-item>
    </mt-tabbar>

    <!-- 内容区 -->
    <mt-tab-container v-model="selected">
      <!-- 首页 -->
      <mt-tab-container-item id="1">
        <v-headers></v-headers>
        <!-- 轮播图 -->
        <mt-swipe :auto="3000">
          <mt-swipe-item class="ccc">
            <img src="../../static/demo1.jpg">
          </mt-swipe-item>
          <mt-swipe-item class="ccc">
            <img src="../../static/demo2.jpg">
          </mt-swipe-item>
          <mt-swipe-item class="ccc">
            <img src="../../static/demo3.jpg">
          </mt-swipe-item>
          <mt-swipe-item class="ccc">
            <img src="../../static/demo4.jpg">
          </mt-swipe-item>
        </mt-swipe>
        <!-- 任务发布 -->
        <div>
          <!-- 普通任务 -->
          <span class="title">
            <i slot="icon" class="iconfont iconrenwu"></i>
            <span>发布任务</span>
          </span>
          <ul class="workul">
            <!-- 普通任务入口 -->
            <router-link to="/issueWork">
              <li>
                <p><i class="iconfont iconjianbuzou worksingle"></i></p>
                <p>跑腿</p>
              </li>
            </router-link>
            <router-link to="/issueWork">
            <li>
              <p><i class="iconfont iconicon-test worksingle"></i></p>
              <p>代取</p>
            </li>
            </router-link>
            <router-link to="/issueWork">
            <li>
              <p><i class="iconfont iconzhuanye worksingle"></i></p>
              <p>技能</p>
            </li>
            </router-link>
            <router-link to="/issueWork">
            <li>
              <p><i class="iconfont iconzhiyeguihua worksingle"></i></p>
              <p>兼职</p>
            </li>
            </router-link>
          </ul>
          <!-- 加载最新任务列表 前两条-->
          <span class="title">
            <i slot="icon" class="iconfont iconrenwu1"></i>
            <span>最新任务</span>
          </span>
          <ul class="workul-lastest">
           <li v-for="(index,val) in tasklist" :key="val" >
              <p>
                <span class="workul-username">{{index.title}}</span>
                <el-tag type="primary"  class="icontype1 label22" >{{index.label}}</el-tag>
                <el-tag v-if="index.mission_statu===0" type="danger" class="icontype1 label33">未接单</el-tag>
                <el-tag v-if="index.mission_statu===1" type="primary" class="icontype1 label33">进行中</el-tag>
                <el-tag v-if="index.mission_statu===2" type="success" class="icontype1 label33">已完成</el-tag>
                <el-tag v-if="index.mission_statu===3" type="danger" class="icontype1 label33">已超时</el-tag>
                <span class="workul-money">
                  <i class="iconfont icontest"></i>
                  <span>{{index.score}}</span>
                </span>
              </p>
              <p class="workul-content1">
                <span>雇主：{{index.master_name }}</span>
                <span style="left: 85%;position: absolute;">浏览：{{index.times }}</span>
              </p>
              <p class="workul-content1">发布于：{{index.create_time}}</p>
              <p class="workul-content1">有效期：{{index.validtime}}</p>
              <router-link :to="{
                path: '/workdetails',
                query: {
                    mission_id: index.mission_id
                }
                }"
                class="aaalistlink">
                <el-button icon="el-icon-search" circle type="danger" class="check"></el-button>
              </router-link>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
      <!-- 广场 -->
      <mt-tab-container-item id="2">
        <v-headers></v-headers>
        <v-partone></v-partone>
      </mt-tab-container-item>

      <!-- 消息 -->
      <mt-tab-container-item id="4">
        <v-headers></v-headers>
        <v-message></v-message>
      </mt-tab-container-item>

      <!-- 我的 -->
      <mt-tab-container-item id="5">
        <v-user></v-user>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import headers from "./headers";
import partone from "./square/partone";
import message from "./message/message";
import user from "./user/user";
import axios from 'axios';
import qs from "qs";
export default {
  name: "home",
  data() {
    return {
      selected: "1", //默认选中值1245
      tasklist:[]
    };
  },
  methods: {
    getAllTask(){
        var that = this;
        //var url = "http://127.0.0.1:3000/api/mission/unaccpetedlist";
        var url = "http://39.107.97.203:3000/api/mission/unaccpetedlist";
        axios.get(url).then(res =>{
            if (res.status === 200){
                if(res.data.status===0){
                 var taskApi = res.data.data;
                 that.tasklist = taskApi.reverse().slice(0,2);
                  for(let i=0;i<that.tasklist.length; i++){
                      that.tasklist[i].create_time = new Date(that.tasklist[i].create_time).format("yyyy-MM-dd hh:mm")
                      that.tasklist[i].validtime = new Date(that.tasklist[i].validtime).format("yyyy-MM-dd hh:mm")
                      if(that.tasklist[i].times == null) that.tasklist[i].times = 0;
                  }
                }else{
                  that.$message({
                      message: res.data.msg,
                      type: 'error'
                  })
                  return false;
                }
            }else{
              return false;
            }
        })
      },
    getRecommendTask(){
      var that = this;
      var Data = {
        user_id : that.$store.state.user_id
      }
      //var url = "http://127.0.0.1:3000/api/mission/recommend";
      var url = "http://39.107.97.203:3000/api/mission/recommend";
      axios.post(url,qs.stringify(Data)).then(res => {
        if (res.status === 200) {
          if (res.data.status === 0) {
            that.tasklist = res.data.data.slice(0,2);
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
    },
  },
   
  components: {
    "v-headers": headers,
    "v-partone": partone, //【广场】
    "v-user": user, //【我的】
    "v-message": message, //【消息】
   
  },
  
 mounted() {
      if(this.$store.state.user_id){
        this.getRecommendTask();
      }else{
        this.getAllTask();
      }
    }
};
</script>


<style scoped>
ul,li {
  list-style: none;
}
* {
  padding: 0;
  margin: 0;
}
/* 底部选项 */
.mint-tabbar {
  height: 55px;
  width: 100%;
  padding-top: 10px;
}
/* 底部图标 */
.mint-tab-item-label {
  color: #a9a9a9;
}
/* 当选中图标时 */
.mint-tabbar > .mint-tab-item.is-selected {
  background-color: #fafafa;
  color: #46b1b8;
}
.mint-tab-item {
  background-color: none;
}
/* 重写底部图标下的字 */
.aaa {
  font-size: 14px;
}
.bbb {
  font-size: 22px;
}
.plus {
  font-size: 44px;
  display: inline-block;
}
/* 轮播图大小位置 */
.mint-swipe {
  height: 300px;
  width: 100%;
}
.mint-swipe-items-wrap > div {
  height: 300px;
}
.ccc img {
  width: 100%;
  height: 300px;
}
/* 白点 */
.mint-swipe-indicators {
  top: 0;
}

/* 发布任务区 */
/* 发布任务 */
.title {
  display: inline-block;
  /* border-bottom: 1px solid #eee; */
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: left;
  padding-left: 20px;
  margin-top:10px;
}
.title span {
  color: #868585;
  display: inline-block;
  position: absolute;
  padding-left: 10px;
  font-size: 15px;
}
/* 标题 */
.iconrenwu,
.icontianjiayonghu,
.iconrenwu1 {
  color: #46b1b8;
  font-size: 30px;
}
/* 单人任务 */
.workul {
  border-bottom: 1px solid #eee;
  padding: 2px 0 8px;
}
.workul li {
  display: inline-block;
  padding: 0 20px;
  margin-bottom:10px;
}
.workul li p:last-child {
  margin-top: -5px;
  font-size: 14px;
  color: #545454;
  letter-spacing: 1px;
}
/* 任务类型icon */
.worksingle,
.workmulti {
  font-size: 36px;
}
/* 颜色 */
/* 跑腿 */
.iconjianbuzou {
  color: yellowgreen;
}
/* 代取 */
.iconicon-test {
  color: coral;
}
/* 技能 */
.iconzhuanye {
  color: dimgrey;
}
/* 兼职 */
.iconzhiyeguihua {
  color: deepskyblue;
}
/* 金币 */
.icontest {
  color: #fae20a;
}
/* 组队任务 */
/* 任务列表 */
.workul-lastest {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  display: inline-block;
  width: 100%;
}
.workul-lastest li {
  border-bottom: 1px solid #eee;
  padding: 10px 5px;
}
.workul-lastest li:last-child {
  margin-bottom: 55px;
}
.userlogo {
  border-radius: 50%;
  float: left;
  margin-left: 25px;
  margin-top: 2px;
  width: 35px;
  height: 35px;
}
.workul-lastest p {
  height: 40px;
  line-height: 40px;
}

/* 用户名 */
.workul-username {
  float: left;
  padding-left: 5%;
  color: #000;
  font-weight: bold;
  font-size: 16px;
}
/* 悬赏金币位置 */
.workul-money {
  left:87% !important;
  position: absolute;
}
/* 任务标题 */
.workul-content1 {
  padding-left: 5%;
  text-align: left;
  color: #545454;
}
.aaaworklist{
   text-decoration: none;
   color: #fff;
}
/* 任务类型 */
.worklist-type{
  position: absolute;
  margin-top: 5px;
  width: 60px;
  display: inline-block;
  right: 100px;
}
.check{
  position: absolute;
  left: 87%;
  margin-top: -50px;
}
/* 最新任务类型标签部分 */
.icontype1{
  position: relative;
  float: right;
  right: 70px;
  margin-top: 3px;
  margin-right: 10px;
  padding:0 6px;
}
</style>
