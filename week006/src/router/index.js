import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    component: () => import("../views/FrontView.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
      },
      {
        path: "product",
        component: () => import("../views/ProductView.vue"),
      },
      {
        path: "cart",
        component: () => import("../views/CartView.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("../views/DashboardView.vue"),
    children: [
      {
        path: "product",
        component: () => import("../views/AdminProductView.vue"),
      },
      {
        path: "coupon",
        component: () => import("../views/AdminCouponView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
});

export default router;
