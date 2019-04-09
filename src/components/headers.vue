<template>
    <div class="headers">
      
      
        <!-- <mt-header> -->
            <img src="../../static/logo(white).png" class="homelogo">
            <router-link to="/personalcenter">
                <i class="iconfont iconwode1 icon-mine"></i>
            </router-link>
            <mt-search v-model="value" placeholder="搜索任务">
                <!-- <mt-cell
                    v-for="item in result"
                    :key="item"
                    :title="item.title"
                    :value="item.value">
                </mt-cell> -->
                
            </mt-search>
        <!-- </mt-header> -->
    </div>
</template>

<script>

import Mint from 'mint-ui'
export default {
    name:'headers',
    data() {
        return {
            value:''
        }
    },
}
</script>

<style>
.headers{
    height: 55px;
    width: 100%;
    background-color: #46b1b8;
}
/* 重写搜索框 */
.mint-searchbar{
    background-color:none !important;
    width: 70%;
    margin: auto;
    /* top: 20%; */
    margin-top: 30px;
    padding: 0;
    height: 25px;
}
.mint-searchbar-inner{
    height: 25px; margin: auto;
}
.mint-searchbar-cancel{
    display: none !important;
}
/* icon搜索 */
.mint-searchbar-inner .mintui-search{
    font-size: 16px;
    color: #000;
}
/* icon后的input */
.mint-searchbar-core{
    padding-left: 5px;
}
.mint-search{
   
    height: 0vh !important;
     height: 100%;
}
.icon-mine{
    color: #fff;
    font-size: 35px;
    position: absolute;
    right: 3%;
    top: 9px;
}
.homelogo{
    position: absolute;
    width: 35px;height: 35px;
    left: 13px;
    top: 10px;
    color: #fff;
}
</style>


