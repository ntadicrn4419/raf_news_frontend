import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import CategoriesCms from '../views/category/CategoriesCms.vue'
import NewsCms from '../views/news/NewsCms.vue'
import UsersCms from '../views/user/UsersCms.vue'
import AddCategoryCms from "@/views/category/AddCategoryCms";
import SingleCategoryCms from "@/views/category/SingleCategoryCms";
import EditCategoryCms from "@/views/category/EditCategoryCms";
import AddNewsCms from "@/views/news/AddNewsCms";
import EditNewsCms from "@/views/news/EditNewsCms";
import AddUserCms from "@/views/user/AddUserCms";
import EditUserCms from "@/views/user/EditUserCms";
import SingleCategory from "@/views/category/SingleCategory";
import SingleNews from "@/views/news/SingleNews";
import SimilarNewsByTag from "@/views/news/SimilarNewsByTag";


VueRouter.prototype.open = function (routeObject) {
  const {href} = this.resolve(routeObject)
  window.open(href, '_blank')
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/most-read',
    name: 'MostRead',
    component: () => import('../views/MostRead.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/category/Categories.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/categories-cms',
    name: 'CategoriesCms',
    component: CategoriesCms,
    meta: {
      authRequired: true,
    }
  },
  {
    path: '/add-category-cms',
    name: 'AddCategoryCms',
    component: AddCategoryCms,
    meta: {
      authRequired: true,
    }
  },
  {
    path: '/edit-category-cms/:name',
    name: 'EditCategoryCms',
    component: EditCategoryCms,
    meta: {
      authRequired: true,
    }
  },
  {
    path: '/categories-cms/:name',
    name: 'SingleCategoryCms',
    component: SingleCategoryCms,
    meta: {
      authRequired: true,
    }
  },
  {
    path: '/categories/:name',
    name: 'SingleCategory',
    component: SingleCategory,
    meta: {
      authRequired: false,
    }
  },
  {
    path: '/news-cms',
    name: 'NewsCms',
    component: NewsCms,
    meta: {
      authRequired: true,
    }
  },
  {
    path: '/add-news-cms',
    name: 'AddNewsCms',
    component: AddNewsCms,
    meta: {
      authRequired: true,
    }
  },
  {
    path: '/edit-news-cms/:id',
    name: 'EditNewsCms',
    component: EditNewsCms,
    meta: {
      authRequired: true,
    }
  },
  {
    path: '/news/:id',
    name: 'SingleNews',
    component: SingleNews,
    meta: {
      authRequired: false,
    }
  },
  {
    path: '/similiar-news/:keyword',
    name: 'SimilarNewsByTag',
    component: SimilarNewsByTag,
    meta: {
      authRequired: false,
    }
  },
  {
    path: '/users-cms',
    name: 'UsersCms',
    component: UsersCms,
    meta: {
      adminAuthRequired: true,
    }
  },
  {
    path: '/add-user-cms',
    name: 'AddUserCms',
    component: AddUserCms,
    meta: {
      adminAuthRequired: true,
    }
  },
  {
    path: '/edit-user-cms/:email',
    name: 'EditUserCms',
    component: EditUserCms,
    meta: {
      adminAuthRequired: true,
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      next({name: 'Login'});
      return;
    }

    const payload = JSON.parse(atob(jwt.split('.')[1]));

    const expDate = new Date(payload.exp * 1000);
    if (expDate < new Date()) {
      next({name: 'Login'});
      return;
    }
  }
  if(to.meta.adminAuthRequired){
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      next({name: 'Login'});
      return;
    }

    const payload = JSON.parse(atob(jwt.split('.')[1]));

    const user_type = payload.type;
    console.log(user_type);

    if(user_type.localeCompare("admin") !== 0){
      alert("Only admin can access users page.");
      return;
    }

    const expDate = new Date(payload.exp * 1000);
    if (expDate < new Date()) {
      next({name: 'Login'});
      return;
    }
  }

  next();
});

export default router
