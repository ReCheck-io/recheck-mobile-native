/* eslint-disable global-require */
import Vue from 'vue';
import Router from 'vue-router';
import chainClient from 'vue-recheck-authorizer/src/chain/index';

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
const AppAbout = (resolve) => {
  require.ensure(['@/views/AppAbout'], () => {
    resolve(require('@/views/AppAbout'));
  });
};

Vue.use(Router);

const router = new Router({
  routes: [
    {
      name: 'About',
      path: '/about',
      component: AppAbout,
    },
    {
      name: 'Scan',
      path: '/scan',
      component: AppCamera,
    },
    {
      name: 'Identity',
      path: '/identity',
      component: AppIdentity,
    },
    {
      path: '*',
      redirect: '/identity',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (from.path === '/scan') {
    window.QRScanner.cancelScan((status) => console.log(status));
    window.QRScanner.destroy((status) => console.log(status));
    window.QRScanner.hide((status) => console.log(status));
  }

  if (!chainClient.pinned() && !['/identity', '/'].includes(to.path)) {
    next(
      {
        path: '/identity',
        query: {
          redirect: to.fullPath
        }
      }
    );
  } else {
    next();
  }
});

export default router;
