import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import home from '@/components/home'
import headers from '@/components/headers'
import login from '@/components/user/login'
import register from '@/components/user/register'
import user from '@/components/user/user'
import personalcenter from '@/components/user/personalcenter'
import updateUserInfo from '@/components/user/updateUserInfo'
import usermoney from '@/components/user/usermoney'
import message from '@/components/message/message'
import tongzhi from '@/components/message/tongzhi'
import sixin from '@/components/message/sixin'
import partone from '@/components/square/partone'
import worklist from '@/components/work/worklist'
import issueWork from '@/components/work/issueWork'
import workdetails from '@/components/work/workdetails'
import master_status0 from '@/components/work/master_status0'
import master_status1 from '@/components/work/master_status1'
import master_status2 from '@/components/work/master_status2'
import master_status3 from '@/components/work/master_status3'
import slave_status1 from '@/components/work/slave_status1'
import slave_status2 from '@/components/work/slave_status2'
import slave_status3 from '@/components/work/slave_status3'
Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: home,
        //首页构成
        children: [{
            path: 'headers',
            name: 'headers',
            component: headers
        },

        //广场/发现页子组件
        {
            path: 'partone',
            name: 'partone',
            component: partone
        },
        //消息
        {
            path: 'message',
            name: 'message',
            component: message,
            children:[
                {
                    path: 'tongzhi',
                    name: 'tongzhi',
                    component: tongzhi
                },
                {
                    path: 'sixin',
                    name: 'sixin',
                    component: sixin
                }
            ]
        },
        //我的
        {
            path: 'user',
            name: 'user',
            component: user
        }
       
        ]
    },
    //用户登录
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    //用户注册
    {
        path: '/register',
        name: 'register',
        component: register
    },

    //个人中心
    {
        // personalcenter
        path: '/personalcenter',
        name: 'personalcenter',
        meta: {
            requireAuth: true //进入路由页面时需要先登陆
        },
        component: personalcenter
    },
    //任务模块
    //查看任务列表
    {
        path: '/worklist',
        name: 'worklist',
        component: worklist,
    },
    //任务详情
    {
        path: '/workdetails',
        name: 'workdetails',
        meta: {
            requireAuth: true //需要先登录
        },
        component: workdetails
    },
    //发布任务
    {
        path: '/issueWork',
        name: 'issueWork',
        meta: {
            requireAuth: true //进入发布任务页面时需要先登陆
        },
        component: issueWork
    },
    
   /* ******** 雇主 ******** */
    {
        path: '/master_status0',
        name: 'master_status0',
        meta: {
            requireAuth: true 
        }, 
        component: master_status0
    },
    {
        path: '/master_status1',
        name: 'master_status1',
        meta: {
            requireAuth: true 
        }, 
        component: master_status1
    },
    {
        path: '/master_status2',
        name: 'master_status2',
        meta: {
            requireAuth: true 
        }, 
        component: master_status2
    },
    {
        path: '/master_status3',
        name: 'master_status3',
        meta: {
            requireAuth: true 
        }, 
        component: master_status3
    },
    /* ******** 打工仔 ******** */
    {
        path: '/slave_status1',
        name: 'slave_status1',
        meta: {
            requireAuth: true 
        }, 
        component: slave_status1
    },
    {
        path: '/slave_status2',
        name: 'slave_status2',
        meta: {
            requireAuth: true 
        }, 
        component: slave_status2
    },
    {
        path: '/slave_status3',
        name: 'slave_status3',
        meta: {
            requireAuth: true 
        }, 
        component: slave_status3
    },
    //用户查看【我的金币】
    {
        path:'/usermoney',
        name:'usermoney',
        meta: {
            requireAuth: true 
        }, 
        component: usermoney
    },
    //修改个人信息
    {
        path:'/updateUserInfo',
        name:'updateUserInfo',
        component: updateUserInfo
    },
    ]
})
// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
    const user_id = store.state.user_id
    if (to.meta.requireAuth) {
        if (user_id) {
            next()
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})

export default router