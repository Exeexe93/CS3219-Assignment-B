import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// To update the title for every page
router.afterEach((to) => {
  document.title = to.meta.title;
});