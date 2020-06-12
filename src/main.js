// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引用element组件
import ElementUI from 'element-ui'
import '../theme/index.css'
Vue.use(ElementUI);

//引用自己写的infoBox组件和orderContent组件，用作全局使用
import infoBox from './components/infoBox.vue'
Vue.use(infoBox);
Vue.component('InfoBox', infoBox)
import orderContent from './components/orderContent.vue'
Vue.use(orderContent);
Vue.component('OrderContent', orderContent)

// 引用axios组件
import axios from 'axios'
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios
import qs from 'qs'; //用来解决vue中post请求（详情）
Vue.prototype.qs = qs //全局注册，使用方法为:this.qs

// 应用px转换rem的组件
import './utils/rem'
Vue.config.productionTip = false;

// 引用高德地图组件
import AMap from 'vue-amap';
Vue.use(AMap)

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: 'f462c7e022772ba1bbacadd31586a684',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});

// 创建监听本地数据localstorage的方法
Vue.prototype.resetSetItem = function (key, newVal) {
  // 监听“训练项目”nav
  if (key === 'train_nav') {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        sessionStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent)
      }
    }
    return storage.setItem(key, newVal);
  }
  // 监听“招商加盟”锚点
  if (key === 'join_anchor') {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        sessionStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent)
      }
    }
    return storage.setItem(key, newVal);
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: {
    App,
    infoBox, //相关信息盒子
    orderContent, //在线预约内容
  },
  template: '<App/>'
})
