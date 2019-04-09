<template>
    <div class="tongzhi">
        <ul class="workul-tongzhi">
            <li>
              <p>
                <img src="../../../static/userlogo.png" class="userlogo-tongzhi">
                <span class="username-tongzhi">用户名1</span>
                <span class="username-tongzhi1">邀请您参与任务</span>
                <!-- <span>2019年2月23日15:14</span> -->
                <span class="money-tongzhi">
                  <i class="iconfont icontest"></i>
                  <span>5</span>
                </span>
              </p>
              <p class="workul-content-tongzhi">
                <span>任务标题1</span>
              </p>
            </li>
            <li>
              <p>
                <img src="../../../static/userlogo.png" class="userlogo-tongzhi">
                <span class="username-tongzhi">用户名2</span>
                <span class="username-tongzhi1">邀请您参与任务</span>
                <!-- <span>2019年2月23日15:14</span> -->
                <span class="money-tongzhi">
                  <i class="iconfont icontest"></i>
                  <span>5</span>
                </span>
              </p>
              <p class="workul-content-tongzhi">
                <span>任务标题2</span>
              </p>
            </li>
        </ul>
    </div>
</template>
<style>
.tongzhi{
    margin-top: 10px;
}
/* 任务列表 */
.workul-tongzhi {
  /* border-bottom: 1px solid #eee; */
  padding: 5px 0;
  display: inline-block;
  width: 100%;
}
.workul-tongzhi li {
  border-bottom: 1px solid #eee;
  margin-top: 10px;
}
.workul-tongzhi li:last-child {
  margin-bottom: 55px;
}
.userlogo-tongzhi {
  border-radius: 50%;
  float: left;
  margin-left: 25px;
  margin-top: 2px;
  width: 35px;
  height: 35px;
}
.workul-tongzhi p {
  height: 40px;
  line-height: 40px;
}

/* 用户名 */
.username-tongzhi {
  float: left;
  margin-left: 8px;
  color: #000;
  font-weight: bold;
  font-size: 16px;
}
.username-tongzhi1{
  color: #6b6b6a;
  margin-left: -20px;
}
/* 悬赏金币位置 */
.money-tongzhi {
  right: 2%;
  position: absolute;
}
/* 任务标题 */
.workul-content-tongzhi {
  padding-left: 65px;
  text-align: left;
}
</style>

<script>
export default {
      name:'tongzhi'
}
</script>


