import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from './plugins/font-awesome'
import { ServerTable } from 'v-tables-3'
import { tableteme } from './utils/table-theme'

createApp(App)
  .use(router)
  .use(store)
  .use(ServerTable, {}, tableteme)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");


import "bootstrap/dist/js/bootstrap.js"