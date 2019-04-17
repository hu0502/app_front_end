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
    height: 55px;
    width: 100%;
    background-color: #46b1b8;
}
/* 重写搜索框 */
.mint-searchbar{
    background-color:#46b1b8 !important;
    width: 75%;
    margin: auto;
    padding: 0;
    height: 55px;
}
.mint-searchbar-inner{
    height: 25px;
    opacity: .9;
    border: 1px solid #fff;
    border-radius: 5px;
}
.mint-searchbar-cancel{
    color: #fff;
}
/* icon搜索 */
.mint-searchbar-inner .mintui-search{
    font-size: 18px !important;
}
/* icon后的input */
.mint-searchbar-core{
    padding-left: 10px;
    font-size: 15px;
    line-height: 15px;
}
.mint-search{
    height: 55px;
    line-height: 55px;
}

</style>


