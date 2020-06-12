import Vue from 'vue'
import Router from 'vue-router'
// 1——亮瞳首页模块
import home from '@/pages/1_home/home'
import profile from '@/pages/1_home/profile'
// 2——训练项目模块
import train from '@/pages/2_train/train'
import trainMore from '@/pages/2_train/trainMore'
import trainDetail from '@/pages/2_train/trainDetail'
import QandAMore from '@/pages/2_train/QandAMore'
import QandADetail from '@/pages/2_train/QandADetail'
// 3——亮瞳服务模块
import brandprofile from '@/pages/3_serve/brandprofile'
import socialgood from '@/pages/3_serve/socialgood'
import socialDetail from '@/pages/3_serve/socialDetail'
import news from '@/pages/3_serve/news'
import newsDetail from '@/pages/3_serve/newsDetail'
// 4——招商加盟模块
import join from '@/pages/4_join/join'
// 5——护眼讲堂模块
import lecture from '@/pages/5_lecture/lecture'
import lectureDetail from '@/pages/5_lecture/lectureDetail'
// 6——联系我们模块
import recruitment from '@/pages/6_contact/recruitment'
import contact from '@/pages/6_contact/contact'
import maps from '@/pages/6_contact/maps'



Vue.use(Router)

export default new Router({
  routes: [
    // ----亮瞳首页模块----
    {
      path: '/',
      name: 'home', //首页
      component: home
    }, {
      path: '/profile',
      name: 'profile', //企业简介
      component: profile
    },
    // ----训练项目模块----
    {
      path: '/train',
      name: 'train', //训练项目
      component: train
    }, {
      path: '/trainMore',
      name: 'trainMore', //训练项目
      component: trainMore
    }, {
      path: '/trainDetail',
      name: 'trainDetail', //训练详情
      component: trainDetail
    }, {
      path: '/QandAMore',
      name: 'QandAMore', //专题问答
      component: QandAMore
    }, {
      path: '/QandADetail',
      name: 'QandADetail', //问答详情
      component: QandADetail
    }, 
    // ----亮瞳服务模块----
    {
      path: '/brandprofile',
      name: 'brandprofile', //品牌简介
      component: brandprofile
    },{
      path: '/socialgood',
      name: 'socialgood', //社会公益
      component: socialgood
    },{
      path: '/socialDetail',
      name: 'socialDetail', //社会公益详情
      component: socialDetail
    },{
      path: '/news',
      name: 'news', //新闻动态
      component: news
    },{
      path: '/newsDetail',
      name: 'newsDetail', //新闻动态详情
      component: newsDetail
    },
    // ----招商加盟模块----
    {
      path: '/join',
      name: 'join', //招商加盟
      component: join
    },
    // -----护眼讲堂模块----
    {
      path: '/lecture',
      name: 'lecture', //招商加盟
      component: lecture
    },{
      path: '/lectureDetail',
      name: 'lectureDetail', //招商加盟详情
      component: lectureDetail
    },
    // ----联系我们模块----
    {
      path: '/recruitment',
      name: 'recruitment', //招贤纳才
      component: recruitment
    }, {
      path: '/contact',
      name: 'contact', //联系我们
      component: contact
    }, {
      path: '/maps',
      name: 'maps', //门店导航
      component: maps
    },
  ],
  // 跳转路由置顶显示
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
})
