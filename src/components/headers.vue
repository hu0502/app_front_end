<template>
    <div class="headers">
        <form action="" onsubmit="return false;">
            <mt-search 
            v-model="value" 
            placeholder="搜索任务" 
            @keyup.native.enter="search(value)"
            ></mt-search>
        </form>
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
    methods: {
        search(value){
            console.log(value)
            /*  
                一、
            //var id = 1;
            //this.$router.push({path:'/selectCate',query:{userid:id}});
            //收：var id = parseInt(this.$route.query.userid); 
            
            */

            /* 
                这里使用了第二种方式
                二、
                发：var id = 1;
                    this.$router.push({name:'selectCate',params:{userid:id}});
                收：var id = this.$route.params.userid;
            */
            var _this = this;
            _this.$router.push({
                name:'search',
                params:{
                    words : value
                }
            })
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


