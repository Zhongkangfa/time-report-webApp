import Vue from 'vue'
import uView from "uview-ui";
import store from './store/index.js'
import App from './App'

Vue.use(uView);


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
