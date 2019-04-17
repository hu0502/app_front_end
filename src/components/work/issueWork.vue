<template>
    <div class="issueWork">
        <mt-header title=" 发布任务" class="issueaaa">
            <mt-button icon="back" slot="left" @click="$router.back(-1)">
                返回
            </mt-button>
        </mt-header>
        <el-form 
        style="padding: 0 20px;"
        :model="LoginForm" 
        ref="LoginForm" 
        :rules="loginRules" 
        label-width="80px" 
        label-position="right" 
        class="formClass">
           
            <el-form-item label="任务标题" prop="title"  >
                <el-input v-model="LoginForm.title" placeholder="请填写任务标题"></el-input>
            </el-form-item>

            <el-form-item label="任务描述" prop="description"  >
                <el-input type="textarea" v-model="LoginForm.description" placeholder="请填写任务描述"></el-input>
            </el-form-item>

            <el-form-item label="任务标签" prop="label" >
                <el-select v-model="LoginForm.label" placeholder="请选择任务标签">
                    <el-option label="跑腿" value="跑腿"></el-option>
                    <el-option label="代取" value="代取"></el-option>
                    <el-option label="兼职" value="兼职"></el-option>
                    <el-option label="技能" value="技能"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="任务位置" prop="location" >
                <el-input v-model="LoginForm.location" placeholder="请填写任务所在位置"></el-input>
            </el-form-item>

            <el-form-item label="悬赏积分" prop="score" >
                <el-select v-model="LoginForm.score" placeholder="请选择悬赏积分">
                    <el-option label="5" value="5"></el-option>
                    <el-option label="10" value="10"></el-option>
                    <el-option label="15" value="15"></el-option>
                    <el-option label="20" value="20"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="有效日期" required >
                <el-col :span="16">
                    <el-date-picker
                        v-model="LoginForm.validtime"
                        type="datetime"
                        style="width: 100%;"
                        placeholder="选择有效日期">
                    </el-date-picker>
                </el-col>
            </el-form-item>

            <el-form-item label="QQ/微信" prop="contact"  >
                <el-input v-model="LoginForm.contact" placeholder="请填写联络方式"></el-input>
            </el-form-item>

            <el-form-item class="btn_issue" style="margin-left:0;">
                <el-button type="primary" @click="submitForm('LoginForm')">立即发布</el-button>
               
            </el-form-item>

        </el-form>
    </div>
</template>

<style>
.issueaaa {
  height: 75px !important;
  width: 100%;
  line-height: 75px !important;
  font-size: 18px ;
  background-color:#46b1b8 !important;
}
.issueWork{
    /* margin-top:10px; */
    text-align: left;
    /* background-color: #46b1b8; */
}
/* .issue{
    height: 50px;
    text-align: center;
    font-size: 26px;
    color: #46b1b8;
    line-height: 50px;
    padding: 10px 0;
} */
.formClass{
    margin-top: 10px;
}
.el-form-item{
    padding: 10px 0;
    margin: 0;
}
.btn_issue .el-form-item__content{
   text-align:center !important;
   margin-left: 0 !important;
   margin-top:20px !important;
}

</style>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    name:'issueWork',
    data() {
        return {
            LoginForm: {
                title: '',
                description: '',
                label: '',
                location:'',
                score:'',
                validtime: '',
                contact:''
            },
            loginRules:{
                title: [
                    { required: true, message: '请输入任务标题', trigger: 'blur'},
                    { min: 2, max:6, message: '长度在 2 到 6 个字符', trigger: 'blur'}
                ],
                description: [{required: true, message: '请填写任务描述', trigger: 'blur'}],
                label: [{required: true, message: '请选择任务标签', trigger: 'change'}],
                location: [{required: true, message: '请填写任务位置', trigger: 'blur' }],
                score: [{required: true, message: '请选择悬赏积分', trigger: 'change' }],
                validtime: [{required: true, message: '请选择任务有效日期', trigger: 'change' }],
                contact:[{ required: true, message: '请输入联络方式以确保打工仔能联系到您', trigger: 'blur' }]
            }
        }
    },
   
    methods: {
        submitForm(formName) {
            var _this = this;
            _this.$refs[formName].validate((valid) => {
            if (valid) {
                _this.LoginForm.validtime = new Date(_this.LoginForm.validtime).format("yyyy-MM-dd hh:mm:ss");
                var taskData = {
                    title: _this.LoginForm.title,
                    description: _this.LoginForm.description,
                    label: _this.LoginForm.label,
                    location:  _this.LoginForm.location,
                    score: _this.LoginForm.score,
                    validtime: _this.LoginForm.validtime,
                    contact: _this.LoginForm.contact,
                    master: _this.$store.state.user_id
                }
                console.log(taskData)
               // var url = 'http://127.0.0.1:3000/api/mission/issue'
                var url = 'http://39.107.97.203:3000/api/mission/issue'
                var instance = axios.create({ headers: 
                    {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'}
                });
                instance.post(url,qs.stringify(taskData))
                .then(res =>{
                     if (res.status === 200){
                         if(res.data.status === 0){
                            var apiData = res.data;
                            _this.$message({
                                message: '发布成功',
                                type: 'success'
                            })
                             setTimeout(() => {
                               _this.$router.push({ name:'master_status0'})
                             }, 1000);
                           
                            }else{
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            })
                            return false;
                        }
                     }else{
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        })
                         return false;
                    }
                 })
                }else {
                    _this.$message({
                        message: "请正确填写表单",
                        type: 'error'
                    })
                    return false;
                }
            });
        },
       
    },
   
    
}
</script>


