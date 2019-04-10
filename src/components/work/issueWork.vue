<template>
    <div class="issueWork">
        <div class="issue">
            发布任务
        </div>
        <el-form 
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
           
            <el-form-item>
                <el-button type="primary" @click="submitForm('LoginForm')">立即发布</el-button>
                <router-link to="/"><el-button>返回首页</el-button></router-link>
            </el-form-item>

        </el-form>
    </div>
</template>

<style>
.issueWork{
    margin-top:10px;
    text-align: left;
    /* background-color: #46b1b8; */
}
.issue{
    height: 50px;
    text-align: center;
    font-size: 26px;
    color: #46b1b8;
    line-height: 50px;
    padding: 10px 0;
}
.formClass{
    padding: 0 15px;
  
}
.el-form-item{
    padding: 10px 0;
    margin: 0;
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
                validtime: ''
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
                validtime: [{required: true, message: '请选择任务有效日期', trigger: 'change' }]
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
                    master: _this.$store.state.user_id
                }
                var url = 'http://127.0.0.1:3000/api/mission/issue'
                //var url = 'http://39.107.97.203:3000/api/mission/issue'
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
                            _this.$router.push({ name:'home'})
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


