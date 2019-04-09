<template>
    <div class="partone">
        <ul class="square-list">
            <li class="square-icon">
                <svg class="icon icon1" aria-hidden="true">
                    <use xlink:href="#iconxingquaihao"></use>
                </svg>
            </li>
            <li class="square-content">
                <p class="square-title">逸闻趣事</p>
                <p class="pretitle">
                    <span>校友留言区</span>
                    <span>非限定区域</span>
                </p>
            </li>
            <li class="square-right"><i class="iconfont iconicon icon-right"></i></li>
        </ul>

         <ul class="square-list">
            <li class="square-icon">
                <svg class="icon icon1" aria-hidden="true">
                    <use xlink:href="#iconxuexiao"></use>
                </svg>
            </li>
            <li class="square-content">
                <p class="square-title">学校通知</p>
                <p class="pretitle">
                    <span>学校活动</span>
                    <span>会议举办</span>
                    <span>学术交流</span>
                </p>
            </li>
            <li class="square-right"><i class="iconfont iconicon icon-right"></i></li>
        </ul>

         <ul class="square-list">
            <li class="square-icon">
                <svg class="icon icon1" aria-hidden="true">
                    <use xlink:href="#iconunGame"></use>
                </svg>
            </li>
            <li class="square-content">
                <p class="square-title">游戏交流</p>
                <p class="pretitle">
                    <span>游戏经验</span>
                    <span>赛事活动</span>
                </p>
            </li>
            <li class="square-right"><i class="iconfont iconicon icon-right"></i></li>
        </ul>

        <ul class="square-list">
            <li class="square-icon">
                <svg class="icon icon1" aria-hidden="true">
                    <use xlink:href="#iconxuexi"></use>
                </svg>
            </li>
            <li class="square-content">
                <p class="square-title">学习互助</p>
                <p class="pretitle">
                    <span>学习讨论</span>
                    <span>考研竞赛</span>
                    <span>知识分享</span>
                </p>
            </li>
            <li class="square-right"><i class="iconfont iconicon icon-right"></i></li>
        </ul>
        
            <ul class="square-list">
                <li class="square-icon">
                    <svg class="icon icon1" aria-hidden="true">
                        <use xlink:href="#iconicon1"></use>
                    </svg>
                </li>
                <router-link to="/worklist">
                <li class="square-content">
                    <p class="square-title">
                        任务广场
                    </p>
                    <p class="pretitle">
                        <span>查看全部任务</span>
                    </p>
                </li>
                <li class="square-right"><i class="iconfont iconicon icon-right"></i></li>
                </router-link>
            </ul>
       
    </div>
</template>

<style>
ul,li{
    list-style:none;
}
.partone ul{/*:not(:first-child)*/
    margin-top: 10px;
}
.square-list{
    /* border:1px solid #000; */
    border-bottom: 1px solid #eee;
    /* width: 100%; */
    height: 70px;
  
}
.square-icon{
    /* border:1px solid #000; */
    width: 40px;
    display: inline-block;
    position: absolute;
    left: 10px;
    margin-top: 10px;
}
.icon1{
    width: 40px;height: 40px;
   
}
.square-content{
    /* border:1px solid #000; */
    display: inline-block;
    text-align: left;
    position: absolute;
    left: 60px;
    
}
.square-content p{
     /* border: 1px solid #000; */
     /* color: #46b1b8; */
     color: #545454;
}
.square-title{
    font-size: 16px;
    color: #000;
    font-weight: bold;
    letter-spacing: 2px;
    margin-top: 10px;
}
/* 小分类 */
.pretitle{
    margin-top: 4px;
    font-size: 14px;
    
}
.square-right{
    /* border: 1px solid #000; */
    /* display: inline-block; */
    height: 100%;
    line-height: 70px;
    right: 5%;
    position: absolute;
   
}
/* 右箭头 */
.icon-right{
    font-size: 18px;
    /* color:dodgerblue; */
    color: #46b1b8;
}

</style>

<script>
export default {
    name:'partone'
}
</script>


