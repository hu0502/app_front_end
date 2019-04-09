<template>
  <div class="usermoney">
    <mt-header title="我的金币" class="mymoneya">
      <mt-button icon="back" slot="left" @click="$router.back(-1)">返回
      </mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="usermoney_bg">
        <div class="usermoney_div1">
            <svg class="icon usermoney-icon" aria-hidden="true">
                <use xlink:href="#iconjinbi"></use>
            </svg>
        </div>
        <div class="usermoney_div2">
            <span>{{moneyData.score}}</span>
        </div>
    </div>
    <el-button type="danger" id="usermoney_button">查看详情</el-button>
  </div>
</template>

<style>
*{
    padding: 0;margin: 0;
}
.mymoneya{
    height: 70px ;
    width: 100%;
    line-height: 70px;
    font-size: 18px;
}

.usermoney-aaalistlink{
    text-decoration: none;
    color: #fff;
}
.usermoney_bg{
    /* background-color: #46b1b8; */
    margin-top: -20px;
}
.usermoney_bg div{
    display: inline-block;
}
.usermoney_div1{
    padding:70px 30px 70px 0;
}
.usermoney-icon{
    width: 38px;height: 38px;
}
.usermoney_div2{
    padding:70px 30px 80px 0;
    font-size: 40px;
    color: #545454;
}
#usermoney_button{
    display: block;
    margin: auto;
    margin-top: 10px;
}
</style>

<script>
import axios from 'axios'
export default {
  name: "usermoney",
  data() {
      return {
          moneyData:{
              score:""
          }
      }
  },
  mounted() {
      this.getMoney();
  },
  methods: {
      getMoney(){
        var that = this;
        var url = "http://39.107.97.203:3000/api/users/selectUserMsg";
        var instance = axios.create({ headers: 
            {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'} 
        });
        instance.get(url, {
          params: {
            user_id: that.$store.state.user_id
          }
        })
        .then(res => {
          if (res.status === 200) {
            if (res.data.status === 0) {
              var userInfoApi = res.data.data;
              that.moneyData.score = userInfoApi.score;
            } else {
              that.$message({
                message: res.data.msg,
                type: "error"
              });
              return false;
            }
          } else {
            console.log(res.status);
            return false;
          }
        });
      }
  },
};
</script>


