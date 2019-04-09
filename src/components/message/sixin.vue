<template>
    <div class="sixin">
        <ul class="workul-sixin">
            <li>
              <p class="workul-sixinP1">
                <img src="../../../static/message.png" class="userlogo-sixin">
                <span class="username-sixin"><b>系统消息</b></span>
              </p>
              <p class="content-sixin">
                <span>你的任务已完成，请领取积分</span>
              </p>
            </li> 

            <li>
              <p class="workul-sixinP1">
                <img src="../../../static/message.png" class="userlogo-sixin">
                <span class="username-sixin"><b>系统消息</b></span>
              </p>
              <p class="content-sixin">
                <span>你的任务已完成，请领取积分</span>
              </p>
            </li> 

        </ul>
    </div>
</template>
<style>
.sixin{
    margin-top: 10px;
}
.workul-sixin{
    display: inline-block;
    width: 100%;
}
.workul-sixin li {
    border-bottom: 1px solid #eee;
    padding: 5px 10px;
}
.workul-sixin li p{
    text-align: left;
    padding: 5px 10px;
}
.workul-sixin li:last-child {
  margin-bottom: 55px;
}

/* 消息图片 */
.userlogo-sixin{
    width: 50px;
    height: 50px;
    float: left;
    padding: 5px 10px;
}

</style>

<script>
export default {
    name:'sixin'
}
</script>


