import vueRouter from 'vue-router'
//
export default new vueRouter({
  routes: [
    {
      path: '/home',
      component: () => import('../pages/Home.vue'),
      children: [
        {
          path: 'message',
          component: () => import('../pages/Message.vue'),
          children: [
            {
              name: 'xiangqing',
              path: 'detail',
              component: () => import('../pages/Detail.vue'),
              props({ query: { id, title } }) {
                return {
                  id,
                  title,
                }
              },
            },
          ],
        },
        {
          path: 'news',
          component: () => import('../pages/News.vue'),
        },
      ],
    },
    {
      name: 'guanyu',
      path: '/about',
      component: () => import('../pages/About.vue'),
    },
  ],
})
