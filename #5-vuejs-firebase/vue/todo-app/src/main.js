import Vue from 'vue'
import Vuex from 'vuex'
import router from './router.js'
import { store } from './store/index.js'
import ChartPlugin from './chart-plugin.js'
Vue.use(ChartPlugin);
//Vue.prototype.myChart = Chart;


//어느 컴포넌트에서든지 접근 하는 인스턴스 내의 전역 변수
//this.$myChart 사용
new Vue({
  router,
  store
}).$mount('#app');
