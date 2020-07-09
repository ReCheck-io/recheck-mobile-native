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
const AppSettings = (resolve) => {
  require.ensure(['@/views/AppSettings'], () => {
    resolve(require('@/views/AppSettings'));
  });
};
const AppPrivacy = (resolve) => {
  require.ensure(['@/views/AppPrivacy'], () => {
    resolve(require('@/views/AppPrivacy'));
  });
};
const AppHelp = (resolve) => {
  require.ensure(['@/views/AppHelp'], () => {
    resolve(require('@/views/AppHelp'));
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
      path: '/settings',
      name: 'Settings',
      default: false,
      component: AppSettings,
    },
    {
      path: '/privacy',
      name: 'Privacy',
      default: false,
      component: AppPrivacy,
    },
    {
      path: '/help',
      name: 'Help',
      default: false,
      component: AppHelp,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

export default router;
