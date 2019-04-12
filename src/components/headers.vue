<template>
    <div class="headers">
        <!-- <mt-header> -->
           <!--  <img src="../../static/logo(white).png" class="homelogo"> -->
            <!-- <router-link to="/personalcenter">
                <i class="iconfont iconwode1 icon-mine"></i>
            </router-link> -->
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
    height: 75px;
    width: 100%;
    background-color: #46b1b8;
}
/* 重写搜索框 */
.mint-searchbar{
    background-color:#46b1b8 !important;
    width: 80%;
    margin: auto;
    padding: 0;
    height: 75px;
}
.mint-searchbar-inner{
    height: 35px;
    opacity: .9;
    border: 1px solid #fff;
}
.mint-searchbar-cancel{
    display: none;
}
/* icon搜索 */
.mint-searchbar-inner .mintui-search{
    font-size: 22px !important;
    color: #545454 !important;
    position: absolute !important;
    right: 5% !important;
    top:5%;
}
/* icon后的input */
.mint-searchbar-core{
    padding-left: 15px;
    font-size: 16px;
    padding-top: 2px;
    line-height: 16px;
}
.mint-search{
    height: 75px;
    line-height: 75px;
}

</style>


