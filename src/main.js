import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vue2TouchEvents from 'vue2-touch-events'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import axios from "axios";
Vue.prototype.$axios = axios;

Vue.component('vue-draggable-resizable', VueDraggableResizable);
Vue.use(Vue2TouchEvents, {
  disableClick: false, //Use touch event only, will not trigger click event.
  touchClass: 'touchactive', //Add an extra CSS class when touch start, and remove it when touch end.
  tapTolerance: 10,
  swipeTolerance: 30,
  longTapTimeInterval: 400
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
