export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/home/free' },
      {
        path: '/home',
        name: 'home',
        icon: 'home',
        routes: [
          {
            path: '/home/free',
            name: 'free',
            component: './home/free',
          },
          {
            path: '/home/table',
            name: 'table',
            component: './home/table',
          },
        ],
        // hideInMenu: true,
      },
      {
        component: '404',
      },
    ],
  },
];
