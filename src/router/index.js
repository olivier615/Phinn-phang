import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '/index',
        component: () => import('../views/IndexView.vue')
      },
      {
        path: '/products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: '/product/:id',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: '/cart',
        component: () => import('../views/CartView.vue')
      },
      {
        path: '/order',
        component: () => import('../views/OrderView.vue')
      },
      {
        path: '/payment/:id',
        component: () => import('../views/PaymentView.vue')
      },
      {
        path: '/blogs',
        component: () => import('../views/BlogsView.vue')
      },
      {
        path: '/blog/:id',
        component: () => import('../views/BlogView.vue')
      },
      {
        path: '/success',
        component: () => import('../views/PaySuccess.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Admin/AdminProducts.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/Admin/AdminProduct.vue')
      },
      {
        path: 'product',
        component: () => import('../views/Admin/AdminProduct.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/Admin/AdminOrders.vue')
      },
      {
        path: 'order/:id',
        component: () => import('../views/Admin/AdminOrder.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/Admin/AdminCoupons.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/Admin/AdminCoupon.vue')
      },
      {
        path: 'coupon/:id',
        component: () => import('../views/Admin/AdminCoupon.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/Admin/AdminArticles.vue')
      },
      {
        path: 'article',
        component: () => import('../views/Admin/AdminArticle.vue')
      },
      {
        path: 'article/:id',
        component: () => import('../views/Admin/AdminArticle.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
