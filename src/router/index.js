/* eslint-disable global-require */
import Vue from 'vue';
import Router from 'vue-router';
import AppHome from '@/views/AppHome.vue';

const AppCamera = (resolve) => {
  require.ensure(['@/views/AppCamera'], () => {
    resolve(require('@/views/AppCamera'));
  });
};
const AppIdentity = (resolve) => {
  require.ensure(['@/views/AppIdentity'], () => {
    resolve(require('@/views/AppIdentity'));
  });
};
const AppPrivacy = (resolve) => {
  require.ensure(['@/views/AppPrivacy'], () => {
    resolve(require('@/views/AppPrivacy'));
  });
};

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      default: false,
      component: AppHome,
    },
    {
      path: '/scan',
      name: 'Camera',
      default: true,
      component: AppCamera,
    },
    {
      path: '/identity',
      name: 'Identity',
      default: false,
      component: AppIdentity,
    },
    {
      path: '/privacy',
      name: 'Privacy',
      default: false,
      component: AppPrivacy,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeResolve((to, from, next) => {
  window.resolvedFrom = from;
  next();
});

export default router;
