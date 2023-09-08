import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/sass/reset.scss";
import Router from "vue-router";
import "@/components/_global.js";
import bus from '@/plugins/eventBus/index';
import {  Input } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Clipboard from "v-clipboard";
import i18n from './lang'
import { actionReport } from '@/apis/login';
import $popup from './utils/popup.js'
import $popupBind from './utils/popupBind.js';
import $popupAsh from './utils/popupAsh.js';
const VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo, {
    duration: 1000, 
    easing: [.94,.14,.15,.81],
    offset: 0,
    force: true, 
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false, 
    y: true
});
Vue.prototype.$bus = bus;
Vue.config.productionTip = false

actionReport("TOTAL_BROWSE", "total_number")

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

// Vue.use(Form);
// Vue.use(FormItem);
Vue.use(Input);
// Vue.use(Button);
Vue.use($popupBind);
Vue.use(Clipboard);
Vue.use($popup);
Vue.use($popupAsh);
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
