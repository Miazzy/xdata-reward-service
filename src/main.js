//import Vue from 'vue';
//import axios from 'axios';
import VueAxios from 'vue-axios';
//import vuex from 'vue'; //vuex
import App from './App';
import router from './router';
import store from './vuex/store';
import FastClick from 'fastclick'; //使用 fastclick 解决移动端 300ms 点击延迟
import filters from './filters'; //将全部过滤器放在 filters/index.js 中便于管理
import '@/reservice'; //注册service worker服务

try {
    //技巧 同时 use 多个插件 被依赖的插件应放在偏后方
    Vue.use(VueAxios, axios, Vue);
} catch (error) {
    console.log(error);
}

try {
    //设置VueExcelEditor编辑器
    Vue.use(VueExcelComponent.default);
} catch (error) {
    console.log(error);
}

try {
    Vue.use(vant.Empty);
    Vue.use(vant.Lazyload);
    Vue.use(vant.Icon);
    Vue.use(vant.Dialog);
} catch (error) {
    console.log(error);
}

try {
    // 注册全局过滤器
    filters(Vue);
} catch (error) {
    console.log(error);
}

try {
    Vue.config.productionTip = false //将此值设置为 false ,会关闭 Vue 启动时的提示信息，推荐
} catch (error) {
    console.log(error);
}

try {
    FastClick.attach(document.body)
} catch (error) {
    console.log(error);
}

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})