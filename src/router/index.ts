import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/LoginView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegisterView.vue"),
  },
  {
    path: "/index",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/IndexView.vue"),
    children: [
      {
        path: "/index/video",
        name: "video",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/videoView/videoView.vue"
          ),
      },
      {
        path: "/index/upload",
        name: "upload",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/uploadView.vue"),
      },
    ],
  },
  {
    path: "/video/videoDetail",
    name: "videoDetail",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/videoView/videoDetail.vue"
        ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
