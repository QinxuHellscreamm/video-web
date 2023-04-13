import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./http/http.js";

import Antd, { message } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
const app = createApp(App);
app.use(store).use(router).use(Antd).mount("#app");
console.log(app);
app.config.globalProperties.$message = message;
app.config.globalProperties.$api = api;
