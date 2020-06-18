import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/categories",
      name: "categories",
      component: () => import("./components/CategoriesList")
    },
    {
      path: "/category/:id",
      name: "category-details",
      component: () => import("./components/Category")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddCategory")
    }
  ]
});