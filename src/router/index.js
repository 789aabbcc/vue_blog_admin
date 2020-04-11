import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: resolve => require(['@/components/login/login.vue'], resolve),
      meta: {
        title: '登陆'

      }
    },
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/',
      component: resolve => require(['@/components/common/home.vue'], resolve),
      meta: { title: '全局文件' },
      children: [
        {
          path: '/index',
          component: resolve => require(['@/views/index.vue'], resolve),
          meta: {
            title: '系统首页'
          }
        }, {
          path: '/aboutUs',
          component: resolve => require(['@/views/aboutUs.vue'], resolve),
          meta: {
            title: '关于我'
          }
        }, {
          path: '/addArticle',
          component: resolve => require(['@/views/addArticle.vue'], resolve),
          meta: {
            title: '新增文章'
          }
        }, {
          path: '/addProjectImg',
          component: resolve => require(['@/views/addProjectImg.vue'], resolve),
          meta: {
            title: '新增项目图集'
          }
        }, {
          path: '/addTimeLine',
          component: resolve => require(['@/views/addTimeLine.vue'], resolve),
          meta: {
            title: '新增时光轴'
          }
        }, {
          path: '/addTypes',
          component: resolve => require(['@/views/addTypes.vue'], resolve),
          meta: {
            title: '新增标签'
          }
        }, {
          path: '/articleList',
          component: resolve => require(['@/views/articleList.vue'], resolve),
          meta: {
            title: '文章列表'
          }
        }, {
          path: '/imgList',
          component: resolve => require(['@/views/imgList.vue'], resolve),
          meta: {
            title: '图集列表'
          }
        }, {
          path: '/lifeTypes',
          component: resolve => require(['@/views/lifeTypes.vue'], resolve),
          meta: {
            title: '生活标签列表'
          }
        }, {
          path: '/projectList',
          component: resolve => require(['@/views/projectList.vue'], resolve),
          meta: {
            title: '项目列表'
          }
        }, {
          path: '/tecTypes',
          component: resolve => require(['@/views/tecTypes.vue'], resolve),
          meta: {
            title: '技术标签列表'
          }
        }, {
          path: '/timeLineList',
          component: resolve => require(['@/views/timeLineList.vue'], resolve),
          meta: {
            title: '时光轴列表'
          }
        }, {
          path: '/likeFansList',
          component: resolve => require(['@/views/likeFansList.vue'], resolve),
          meta: {
            title: '喜欢粉丝管理'
          }
        },
      ]
    },
    {
      path: '/changeArticleMain',
      component: resolve => require(['@/views/changeArticleMain.vue'], resolve),
      meta: {
        title: '修改文章详情'
      }
    }, {
      path: '/projectMain',
      component: resolve => require(['@/views/projectMain.vue'], resolve),
      meta: {
        title: '修改项目详情'
      }
    },
    {
      path: '*',
      component: resolve => require(['@/views/404.vue'], resolve),
      meta: {
        title: '404'
      }
    }

  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token = localStorage.getItem('Authorization');

//     if (token === null || token === '' || token === undefined) {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// });

export default router;