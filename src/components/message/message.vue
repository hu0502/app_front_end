<template>
    <div class="message">
       
        <ul class="bar">
            <li><el-button class="barButton btnOn" @click="clickTongzhi()">通知</el-button></li>
            <li><el-button class="barButton btnOn" @click="clickSixin()">私信</el-button></li>
        </ul>
        <div>
            <v-tongzhi v-if="this.flag === 1"></v-tongzhi>
            <v-sixin  v-else></v-sixin>
        </div>
    </div>
</template>

<style>
*{
    padding: 0;margin: 0;
}
  
    .bar li{
        display: inline-block;
        width: 49%;
    }
    .bar .barButton {
       
        width: 100% !important;
        border-right:0px;
        border-left:0px;
        border-radius: 0;
        font-size: 16px;
        height: 50px !important;
        line-height: 50px !important;
    }
    .el-button+.el-button{
        margin: 0;
    }
    
    
    
</style>

<script>
import tongzhi from './tongzhi'
import sixin from './sixin'
export default {
    name:'message',
    data() {
        return {
            flag:1
        }
    },
    methods: {
         clickTongzhi:function(){
             this.flag = 1;
             
         },
         clickSixin:function(){
             this.flag = 0;
         }
    },
    components:{
        'v-tongzhi':tongzhi,
        'v-sixin':sixin
    }
}
</script>

