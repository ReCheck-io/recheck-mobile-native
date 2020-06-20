/* eslint-disable global-require */
import Vue from 'vue';
import Router from 'vue-router';
import AppHome from '@/components/AppHome.vue';

const AppCamera = (resolve) => {
  require.ensure(['@/components/AppCamera'], () => {
    resolve(require('@/components/AppCamera'));
  });
};
const AppIdentity = (resolve) => {
  require.ensure(['@/components/AppIdentity'], () => {
    resolve(require('@/components/AppIdentity'));
  });
};

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'AppHome',
      default: false,
      component: AppHome,
    },
    {
      path: '/scan',
      name: 'AppCamera',
      component: AppCamera,
    },
    {
      path: '/identity',
      name: 'AppIdentity',
      default: true,
      component: AppIdentity,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

export default router;
