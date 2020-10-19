import Vue from 'vue';
import VueCordova from 'vue-cordova';
import VueQRCodeScanner from 'vue-qrcode-reader';
import VueReCheckAuthorizer from 'vue-recheck-authorizer';
import chainClient from 'vue-recheck-authorizer/src/chain/index';
import { logger } from 'vue-recheck-authorizer/src/utils/logger'

import App from './App.vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';

import '../node_modules/vue-recheck-authorizer/dist/main.css';

Vue.use(VueCordova);
Vue.use(VueQRCodeScanner);
Vue.use(VueReCheckAuthorizer);

Vue.config.productionTip = false;

function checkConnection() {
  function checkPinned() {
    if (!chainClient.pinned()) {
      if (router.currentRoute.path !== '/identity') {
        router.push('/identity');
      }
    } else {
      window.launchedAppFromLink = false;
      window.IonicDeeplink.onDeepLink((data) => {
        logger('Deeplink active', JSON.stringify(data, null, 4))

        let linkParams = {
          omitCamera: true,
          scanUrl: data.url.replace('myipocean', 'https')
        }

        if (router.currentRoute.path !== '/links') {
          router.push({
            name: 'Links',
            params: linkParams
          });
        } else {
          router.currentRoute.params.scanUrl = linkParams.scanUrl;
          router.currentRoute.params.omitCamera = linkParams.omitCamera;
        }
      })
    }
  }

  navigator.connection.getInfo((res) => {
    if (res !== 'none') {
      checkPinned();
    } else {
      navigator.notification.confirm(
        'No network connection.', (result) => {
          if (result === 1) {
            checkConnection();
          } else if (result === 2) {
            navigator.app.exitApp();
          }
        }, 'Network Status', ['Try Again', 'Cancel']
      );
    }
  });
}

const initApp = () => {
  new Vue({
    store,
    router,
    vuetify,
    render: (h) => h(App),

    mounted() {
      chainClient.setURLandNetwork('', process.env.VUE_APP_NETWORK);
      checkConnection();

      window.QRScanner.getStatus((status) => {
        if (!status.prepared) {
          window.QRScanner.prepare();
        }
      });
    }
  }).$mount('#app');
};

// Wait for the deviceready event to start the render
document.addEventListener('deviceready', () => {
  let lastTimeBackPress = 0;
  const timePeriodToExit = 2000;

  initApp();

  document.addEventListener('pause', () => {
    window.lastPage = router.currentRoute.path;
  }, false);

  document.addEventListener('resume', () => {
    checkConnection();
  }, false);

  document.addEventListener('backbutton', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
      navigator.app.exitApp();
    } else {
      if (router.currentRoute.path !== '/scan') {
        router.push('/scan');
      }
      lastTimeBackPress = new Date().getTime();
    }
  }, false);
});

// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = (typeof window.cordova !== 'undefined');
if (!isCordovaApp) {
  document.dispatchEvent(new CustomEvent('deviceready', {}));
}
