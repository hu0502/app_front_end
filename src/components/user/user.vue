<template>
    <div class="user">
        <div class="topBg"> 
            <p class="topP1">
                <img src="../../../static/userlogo.png" alt="" class="topImg" />
            </p>
            <p v-if="!this.$store.state.user_name">
                <span>welcome!去
                    <router-link to="/login" class="linkaaa">登陆 </router-link>&nbsp;/
                    <router-link to="/register" class="linkaaa">注册</router-link>
                </span>
            </p> 
            <p v-else>
                <!-- {{this.$store.state.user_id}} -->
                <span class="linkbbb-span">{{this.$store.state.user_name}}</span> 
                <router-link to="/personalcenter">
                    <el-button type="primary" class="linkbbb-button">个人中心</el-button>
                </router-link>
            </p>   
       </div>
       <div class="middleList">
           <ul class="middlelistUl">
                <!-- 我的发布 -->
               <router-link to="/userIssuedWork">
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
               <!-- 我接收的任务 -->
               <router-link to="/userAccepttedWork">
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
               <!-- 我的金币 -->
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
               </router-link>
               <router-link to="/userAchievedWork">
               <!-- 我的任务-已被接收的任务 -->
               <li>
                    <svg class="icon middleicon jinbi" aria-hidden="true">
                        <use xlink:href="#iconshangdian"></use>
                    </svg>
                    <span class="mydetail">正在进行的任务</span>
                    <svg class="icon middleicon youjiantou" aria-hidden="true">
                        <use xlink:href="#iconarr-right-blue"></use>
                    </svg>
               </li>
               </router-link>
              
               <!-- 我的技能 -->
               <li>
                    <svg class="icon middleicon jinbi" aria-hidden="true">
                        <use xlink:href="#iconshezhi"></use>
                    </svg>
                    <span class="mydetail">我的技能</span>
                    <svg class="icon middleicon youjiantou" aria-hidden="true">
                        <use xlink:href="#iconarr-right-blue"></use>
                    </svg>
               </li>
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
.jinbi{
    width: 30px;
    height: 30px;
    position: absolute;
    left: 10%;
}
.mydetail{
    color: #46b1b8;
    margin-left: 80px;
    font-size: 18px;
    letter-spacing: 2px;
    font-family: "黑体";
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



</style>
<script>
export default {
    name:'user',
    data() {
        return {
            
        }
    },
    methods: {
        
        handleClick:function(){
        }
    },
}
</script>




