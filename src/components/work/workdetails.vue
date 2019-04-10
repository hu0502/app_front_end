<template>
    <div class="workdetails">
       <mt-header title="当前任务详情" class="detailsheader">        
            <mt-button icon="back" slot="left" @click="$router.back(-1)">
                返回
            </mt-button>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
       <!-- 普通任务 -->
       <!-- <ul class="workul-workdetail" v-if="this.taskDetailForm.type===0">  -->
       <ul class="workul-workdetail" v-if="this.taskDetailForm.mission_order!=null"> 
          <li>
            <p>类型：普通任务</p>
            <p>任务编号：<span>{{this.taskDetailForm.mission_order}}</span></p>
            <p>任务标题：<span>{{this.taskDetailForm.title}}</span></p>
            <p>任务内容：<span>{{this.taskDetailForm.description}}</span></p>
            <p>将于何处完成：<span>{{this.taskDetailForm.location}}</span></p>
            <p>任务标签：<el-tag type="primary" class="label2">{{this.taskDetailForm.label}}</el-tag></p>
            <p v-if="this.taskDetailForm.mission_statu===0">任务状态：<el-tag type="danger" class="label2">未接单</el-tag></p>
            <p v-if="this.taskDetailForm.mission_statu===1">任务状态：<el-tag type="primary" class="label2">进行中</el-tag></p>
            <p v-if="this.taskDetailForm.mission_statu===2">任务状态：<el-tag type="success" class="label2">已完成</el-tag></p>
            <p v-if="this.taskDetailForm.mission_statu===3">任务状态：<el-tag type="danger" class="label2">已超时</el-tag></p>
            <p>雇主悬赏积分：<i class="iconfont icontest aaaaicon"></i> <span> {{this.taskDetailForm.score}}</span></p>
            <p>雇主：<span>{{this.taskDetailForm.master_name}}</span>
        
            </p>
            <p>发布于：<span>{{this.taskDetailForm.create_time}}</span></p>
            <p>有效期至：<span>{{this.taskDetailForm.validtime}}</span></p>
            <div v-if="this.slaveInfo===1">
              <p>打工仔：<span>{{this.taskDetailForm.slave_name}}</span></p>
              <p>接单时间：<span>{{this.taskDetailForm.accepttime}}</span></p>
              <p v-if="this.slaveInfo===1 && this.slaveInfoPlus===1">任务完成时间：<span>{{this.taskDetailForm.end_time}}</span></p>
            </div>
            <p class="missBtn">
              <el-button type="primary" 
                v-if="this.taskDetailForm.mission_statu===0 && this.flag===1" 
                @click="acceptTask()" 
                class="accept">
                接收任务
              </el-button>
              <el-button type="success" 
                @click="achievedTask()"
                v-if="this.taskDetailForm.mission_statu===1 && this.flag===1">
                确认完成
              </el-button>
              <el-button type="danger" 
                disabled="disabled"
                v-if="this.taskDetailForm.mission_statu===2 && this.flag===1">
                任务已完成
              </el-button>
              <el-button type="danger" 
                disabled="disabled"
                v-if="this.taskDetailForm.mission_statu===3 && this.flag===1">
                任务超时
              </el-button>
              <!-- 如果雇主是当前登录用户,禁止其接单 -->
              <el-button type="danger" 
                @click="check()"
                v-if="this.flag===0">
                查看我发布的任务
              </el-button>
            </p>
          </li>
       </ul>
       <!-- 组队任务 -->
       <!-- <ul class="workul-workdetail" v-else> 
          <li>
            <p>类型：组队任务</p>
            <p>任务编号：<span>{{this.taskDetailForm.mission_order}}</span></p>
            <p>任务标题：<span>{{this.taskDetailForm.title}}</span></p>
            <p>任务内容：<span>{{this.taskDetailForm.description}}</span></p>
            <p>将于何处完成：<span>{{this.taskDetailForm.location}}</span></p>
            <p>任务标签：<el-tag type="primary" class="label2">{{this.taskDetailForm.label}}</el-tag></p>
            <p v-if="this.taskDetailForm.team_statu===0">组队状态：<el-tag type="primary" class="label2">组队中</el-tag></p>
            <p v-if="this.taskDetailForm.team_statu===1">组队状态：<el-tag type="danger" class="label2">人数已满</el-tag></p>
            <p v-if="this.taskDetailForm.mission_statu===2">任务状态：<el-tag type="success" class="label2">已完成</el-tag></p>
            <p v-if="this.taskDetailForm.mission_statu===1">任务状态：<el-tag type="success" class="label2">进行中</el-tag></p>
            <p>雇主悬赏积分：<i class="iconfont icontest aaaaicon"></i> <span> {{this.taskDetailForm.score}}</span></p>
            <p>雇主：<span>{{this.taskDetailForm.master_name}}</span></p>
            <p>发布于：<span>{{this.taskDetailForm.create_time}}</span></p>
            <p>有效期至：<span>{{this.taskDetailForm.validtime}}</span></p>
            <p>雇主设定组队人数：<span>{{this.taskDetailForm.teamnumber}}</span></p>
            <div v-if="this.taskDetailForm.lead_id!=null">
              <p>队长name：<span>{{this.taskDetailForm.lead_name}}</span></p>
              <ul v-for="(index,val) in user_list" :key="val" >
                <li>
                  <p>成员:{{index.user_name}} |&nbsp;&nbsp;<span>接收时间：{{index.accept_time}}</span></p>
                </li>
              </ul>
              <p v-if="this.taskDetailForm.mission_statu===2">任务完成时间：<span>{{this.taskDetailForm.end_time}}</span></p>
            </div>
             <p class="missBtn">
              <el-button type="primary" 
                v-if="this.taskDetailForm.team_statu===0&& this.flag===1" 
                @click="acceptTask()" 
                :disabled="isDisable"
                class="accept">
                参与组队
              </el-button>
           
              <el-button type="danger" 
                @click="achievedTask()"
                :disabled="isDisable"
                v-if="this.taskDetailForm.mission_statu===1 && this.leader===1&& this.flag===1">
                确认完成
              </el-button>
         
              <el-button type="danger" 
                disabled="disabled"
                v-if="this.taskDetailForm.team_statu===1 && this.leader===0 && this.flag===1">
                进行中
              </el-button>
             
              <el-button type="danger" 
                disabled="disabled"
                v-if="this.taskDetailForm.mission_statu===2 && this.flag===1">
                任务已完成
              </el-button>
               <router-link to="/userIssuedWork">
              <el-button type="danger" 
                v-if="this.flag===0">
                查看我发布的任务
              </el-button>
               </router-link>
            </p>
          </li>
       </ul> -->
    </div>
</template>

<style>
*{
    padding: 0;margin: 0;
}
ul,li{
  list-style:none;
}
.workdetails li{
  text-align: left;
}
.mint-header{
    background-color: #46b1b8;
    height: 65px;
    font-size: 16px;
    line-height: 65px;
}
.mint-header-title{
    line-height: 65px;
    margin: 0;
}
.aaaworkdetails{
    text-decoration: none;
    color: #fff;
}
.aaalistlink{
    text-decoration: none;
    color: #666666;
}
.mint-header{
    background-color: #46b1b8;
    height: 65px;
    font-size: 16px;
    line-height: 65px;
}
.mint-header-title{
    line-height: 65px;
    margin: 0;
}
/* 任务列表 */
.workul-workdetail {
  padding: 5px 0;
  display: inline-block;
  width: 100%;
}
.workul-workdetail li p{
  font-size: 16px;
  color: #545454;
  padding: 10px 30px;
}
.missBtn{
  text-align: center;
}
.missBtn button{
  margin-top: 10px;
}
.aaaaicon{
  color: #fae41c;
}

</style>

<script>

import axios from 'axios'
import qs from 'qs'
export default {
    name:'workdetails',
    data() {
        return {
            isDisable: false,
            flag:1,//判断登录用户是否是雇主
            leader: 0,//判断登录用户是否是队长
            slaveInfo:'',//普通任务为进行中,查看打工仔及接单信息
            slaveInfoPlus:'',//普通任务完成后可查看打工仔、接单时间、完成时间
            user_list:[],//组队队员信息
            //获取当前任务信息
            taskDetailForm:{
                title:'',//标题
                mission_order:'',//编号
                mission_id:'',//任务id
                location:'',//位置
                mission_statu:'',//任务状态
                label:'',//标签
                score:'',//悬赏积分
                description:'',//描述
                validtime:'',//有效时间
                create_time:'',//创建时间
                master:'',//雇主id
                master_name:'',//雇主用户名
                slave:'',//打工仔id
                accepttime:'',//打工仔接单时间
                end_time:'',//打工仔完成任务时间
                slave_name :''
            },
        }
    },
    methods: {
      //check:()
      check(){
        this.$router.push({ name:'userIssuedWork'})
      },
      //用户完成任务
      achievedTask(){
        var Athis = this;
        Athis.isDisable = true;
       // var url = 'http://39.107.97.203:8080/api/OfferReward/Task/SubmitTask'
        var url = 'http://127.0.0.1:3000/api/mission/achieve'
        //var url = 'http://39.107.97.203:3000/api/mission/achieve'
        var data = {
          mission_id :  Athis.$route.query.mission_id,
          user_id :  Athis.$store.state.user_id
        }
        axios.post(url,qs.stringify(data)).then(res =>{
          if (res.status === 200){
                if(res.data.status === 0){

                  var achievedAPI = res.data.data;
                  Athis.$message({
                      message: res.data.msg,
                      type: 'success'
                  })
                  Athis.$router.go(0);
              
                }else{
                   Athis.$message({
                      message: res.data.msg,
                      type: 'error'
                  })
                    return false;
                }
              }else{
                  console.log(res.status)
                  return false;
              }
          })
      },
      //用户接收任务
      acceptTask(){
        var that = this;
        that.isDisable = true;
        var Data = {
            mission_id :  that.$route.query.mission_id,
            user_id :  that.$store.state.user_id
        }
        var url = 'http://127.0.0.1:3000/api/mission/accept'
        //var url = 'http://39.107.97.203:3000/api/mission/accept'
        axios.post(url,qs.stringify(Data))
        .then(res =>{
          if (res.status === 200){
                if(res.data.status===0){
                  that.$message({
                      message: res.data.msg,
                      type: 'success'
                  })
                  that.$router.go(0);
                }else{
                  that.$message({
                      message: res.data.msg,
                      type: 'error'
                  })
                    return false;}
          }else{
            return false;
          }
        })
      },
      //获取当前任务详情
      getTask(){
        var that = this;
        var url = 'http://127.0.0.1:3000/api/mission/details'
       // var url = 'http://39.107.97.203:3000/api/mission/details'
        var instance = axios.create({ headers: 
              {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'}
          });
        var Data = {
            mission_id :  that.$route.query.mission_id,
            user_id : that.$store.state.user_id
        }
        console.log(Data)
        instance.post(url,qs.stringify(Data))
        .then(res =>{
            if (res.status === 200){
                if(res.data.status===0){
                var taskApi = res.data.data;
                that.taskDetailForm.mission_order=taskApi.mission_order;
                that.taskDetailForm.title=taskApi.title;
                that.taskDetailForm.description=taskApi.description;
                that.taskDetailForm.location=taskApi.location;
                that.taskDetailForm.label=taskApi.label;
                that.taskDetailForm.score=taskApi.score;
                that.taskDetailForm.slave_name=taskApi.slave_name;
                that.taskDetailForm.master_name=taskApi.master_name;
                that.taskDetailForm.create_time=new Date(taskApi.create_time).format("yyyy-MM-dd hh:mm");//任务创建时间
                that.taskDetailForm.validtime =new Date(taskApi.validtime).format("yyyy-MM-dd hh:mm");//任务有效时间
                that.taskDetailForm.end_time=new Date(taskApi.end_time).format("yyyy-MM-dd hh:mm");
                that.taskDetailForm.mission_statu=taskApi.mission_statu;
                //如果是普通任务
                  if(taskApi.master!=that.$store.state.user_id){
                    that.flag=1; 
                    if(that.taskDetailForm.mission_statu===0){
                    }else if(that.taskDetailForm.mission_statu===1){
                        that.slaveInfo=1;
                        that.taskDetailForm.slave_name=taskApi.slave_name;
                        that.taskDetailForm.accepttime=new Date(taskApi.accepttime).format("yyyy-MM-dd hh:mm");
                       
                    }else if(that.taskDetailForm.mission_statu===2){
                        that.slaveInfo=1;
                        that.slaveInfoPlus=1;
                        that.taskDetailForm.slave_name=taskApi.slave_name;
                        that.taskDetailForm.accepttime=new Date(taskApi.accepttime).format("yyyy-MM-dd hh:mm");
                        that.taskDetailForm.end_time=new Date(taskApi.end_time).format("yyyy-MM-dd hh:mm");
                    }else if(that.taskDetailForm.mission_statu===3 && that.taskDetailForm.slave !=null){
                        that.slaveInfo=1;
                        that.taskDetailForm.slave_name=taskApi.slave_name;
                        that.taskDetailForm.accepttime=new Date(taskApi.accepttime).format("yyyy-MM-dd hh:mm");
                    }else if(that.taskDetailForm.mission_statu===3){

                    }
                  }else{
                    that.flag=0;
                    if(that.taskDetailForm.mission_statu===0){
                        //普通任务-雇主-未接单
                    }else if(that.taskDetailForm.mission_statu===1){
                        that.slaveInfo=1;
                        that.taskDetailForm.slave_name=taskApi.slave_name;
                        that.taskDetailForm.accepttime=new Date(taskApi.accepttime).format("yyyy-MM-dd hh:mm");
                    }else if(that.taskDetailForm.mission_statu===2){
                        that.slaveInfo=1;
                        that.slaveInfoPlus=1;
                        that.taskDetailForm.slave_name=taskApi.slave_name;
                        that.taskDetailForm.accepttime=new Date(taskApi.accepttime).format("yyyy-MM-dd hh:mm");
                        that.taskDetailForm.end_time=new Date(taskApi.end_time).format("yyyy-MM-dd hh:mm");
                    }else if(that.taskDetailForm.mission_statu===3 && that.taskDetailForm.slave!=null){
                        that.slaveInfo=1;
                        that.taskDetailForm.slave_name=taskApi.slave_name;
                        that.taskDetailForm.accepttime=new Date(taskApi.accepttime).format("yyyy-MM-dd hh:mm");
                    }else if(that.taskDetailForm.mission_statu===3){
                        //
                    }
                  }
               
                }else{
                  that.$message({
                      message: res.data.msg,
                      type: 'error'
                  })
                    return false;}
                }else{ return false;}
          })
      }
    },
     mounted() {
      this.getTask();
    }
    
}
</script>


