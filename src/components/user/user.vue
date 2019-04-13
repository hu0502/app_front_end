<template>
    <div class="user">
        <div class="topBg"> 
            <p class="topP1" v-if="!this.$store.state.user_name">
                <img src="../../../static/userlogo.png" alt="" class="topImg" />
            </p>
            <p class="topP1" v-else>
                <img src="../../../static/userlogo.png" alt="" class="topImg" />
            </p>
            <p v-if="!this.$store.state.user_name">
                <!--  <span>welcome!去
                    <router-link to="/login" class="linkaaa">登陆 </router-link>&nbsp;/
                    <router-link to="/register" class="linkaaa">注册</router-link>
                </span> -->
                <el-Button type="primary" class="btn" @click="toLogin()">登陆</el-Button>
                <el-Button type="primary" class="btn" @click="toEnroll()">注册</el-Button>
            </p> 
            <p v-else>
                <span class="linkbbb-span">{{this.$store.state.user_name}}</span> 
                <router-link to="/personalcenter">
                    <el-button type="primary" class="linkbbb-button">个人中心</el-button>
                </router-link>
            </p>   
       </div>
       <div class="middleList">
           <ul class="middlelistUl">
               <p><el-tag class="ptag">我是雇主</el-tag></p>
                <!-- 我发布的所有未接单任务 -->
               <router-link to="/master_status0">
               <li>
                    <svg class="icon middleicon jinbi" aria-hidden="true">
                        <use xlink:href="#iconfabu-copy"></use>
                    </svg>
                    <span class="mydetail">我的悬赏</span>
                    <svg class="icon middleicon youjiantou" aria-hidden="true">
                        <use xlink:href="#iconarr-right-blue"></use>
                    </svg>
               </li>
               </router-link>
               <!-- 雇主发布的所有进行中的任务 userAchievedWork -->
               <router-link to="/master_status1">
               <li>
                    <svg class="icon middleicon jinbi" aria-hidden="true">
                        <use xlink:href="#iconxiaoyuanjianzhi"></use>
                    </svg>
                    <span class="mydetail">正在进行</span>
                    <svg class="icon middleicon youjiantou" aria-hidden="true">
                        <use xlink:href="#iconarr-right-blue"></use>
                    </svg>
               </li>
               </router-link>
              <!-- 雇主发布的所有已完成的任务 -->
               <router-link to="/master_status2">
               <li>
                    <svg class="icon middleicon jinbi" aria-hidden="true">
                        <use xlink:href="#iconzhuanye"></use>
                    </svg>
                    <span class="mydetail">已完成任务</span>
                    <svg class="icon middleicon youjiantou" aria-hidden="true">
                        <use xlink:href="#iconarr-right-blue"></use>
                    </svg>
               </li>
               </router-link>
               <!-- 雇主发布的所有已超时任务 -->
               <router-link to="/master_status3">
               <li>
                    <svg class="icon middleicon jinbi" aria-hidden="true">
                        <use xlink:href="#iconlianjiechaoshi"></use>
                    </svg>
                    <span class="mydetail">超时任务</span>
                    <svg class="icon middleicon youjiantou" aria-hidden="true">
                        <use xlink:href="#iconarr-right-blue"></use>
                    </svg>
               </li>
               </router-link>

              <p><el-tag class="ptag">我是打工仔</el-tag></p>
               <!-- 我接收的任务 userAccepttedWork-->
               <router-link to="/slave_status1">
               <li>
                    <svg class="icon middleicon jinbi" aria-hidden="true">
                        <use xlink:href="#iconplus-questionnaire-copy"></use>
                    </svg>
                    <span class="mydetail">我的参与</span>
                    <svg class="icon middleicon youjiantou" aria-hidden="true">
                        <use xlink:href="#iconarr-right-blue"></use>
                    </svg>
               </li>
               </router-link>
               <!-- 我接收的任务 已完成-->
               <router-link to="/slave_status2">
               <li>
                    <svg class="icon middleicon jinbi" aria-hidden="true">
                        <use xlink:href="#iconshezhi"></use>
                    </svg>
                    <span class="mydetail">我完成的</span>
                    <svg class="icon middleicon youjiantou" aria-hidden="true">
                        <use xlink:href="#iconarr-right-blue"></use>
                    </svg>
               </li>
               </router-link>
               <!-- 我接收的任务 超时
               <router-link to="/slave_status3">
               <li>
                    <svg class="icon middleicon jinbi" aria-hidden="true">
                        <use xlink:href="#iconplus-questionnaire-copy"></use>
                    </svg>
                    <span class="mydetail">超时未完成</span>
                    <svg class="icon middleicon youjiantou" aria-hidden="true">
                        <use xlink:href="#iconarr-right-blue"></use>
                    </svg>
               </li>
               </router-link>-->
               <!-- 我的金币 
               <router-link to="/usermoney">
               <li>
                    <svg class="icon middleicon jinbi" aria-hidden="true">
                        <use xlink:href="#iconicon-test1"></use>
                    </svg>
                    <span class="mydetail">我的金币</span>
                    <svg class="icon middleicon youjiantou" aria-hidden="true">
                        <use xlink:href="#iconarr-right-blue"></use>
                    </svg>
               </li>
               </router-link>-->
               <!-- 我的技能 
               <li>
                    <svg class="icon middleicon jinbi" aria-hidden="true">
                        <use xlink:href="#iconshezhi"></use>
                    </svg>
                    <span class="mydetail">我的技能</span>
                    <svg class="icon middleicon youjiantou" aria-hidden="true">
                        <use xlink:href="#iconarr-right-blue"></use>
                    </svg>
               </li>-->
           </ul>
       </div>
    </div>
</template>

<style scoped>
*{
    padding: 0;margin: 0;
}

.topP1{
    /* border: 1px solid #ff0000; */
    padding: 40px 0 10px 0;
}
/* 用户头像大小-未登录 */
.topP1 img{
    width: 110px;height: 110px;
}

/* 下方内容列表 */
.middleList{
    margin-top: 30px;
    border-top:1px solid #eee;
    margin-bottom: 60px;
}

.middlelistUl li{
    border-bottom:1px solid #eee;
    padding: 12px 0;
    text-align: left;
   
}
.middlelistUl li span{
    display: inline-block;
    height: 30px;
    line-height: 30px;
     
}
.middlelistUl p{
    margin-top: 10px;
    position: absolute;
}
.ptag{
    padding-left: 10px;
    padding-right: 10px;
    transform: rotate(-30deg);
    -ms-transform: rotate(-30deg); /* IE 9 */
    -webkit-transform: rotate(-30deg); /* Safari and Chrome */
    border: 1px solid #409EFF;
}
.jinbi{
    width: 30px;
    height: 30px;
    position: absolute;
    left: 10%;
}
.mydetail{
    /* color: #46b1b8; */
    color: #545454;
    margin-left: 90px;
    font-size: 17px;
    letter-spacing: 2px;
    font-weight: normal;
}
.youjiantou{
    width: 30px;
    height: 30px;
    position: absolute;
    right: 3%;
}
.linkaaa{
    color: #46b1b8;
}

.linkbbb-span{
    width: 120px;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    display: block;
    margin: auto;
    padding: 4px 0;
    /* border: 1px solid #000; */
}
.linkbbb-button{
    display: inline-block;
    width: 100px;
    height: 40px;
    margin-top: 10px;
}
.btn{
    width: 80px;
    height: 35px;
}


</style>
<script>
export default {
    name:'user',
    data() {
        return {
            
        }
    },
    methods: {
        
        toLogin(){
            this.$router.push({name:'login'});
        },
        toEnroll(){
            this.$router.push({name:'register'});
        }
    },
}
</script>




