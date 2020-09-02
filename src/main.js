import Vue from 'vue';
import VueCordova from 'vue-cordova';
import VueQRCodeScanner from 'vue-qrcode-reader';
import VueReCheckAuthorizer from 'vue-recheck-authorizer';
import chainClient from 'vue-recheck-authorizer/src/chain/index';

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
      window.universalLinks.subscribe('qrScan', (eventData) => {
        router.push({
          name: 'Links',
          params: {
            omitCamera: true,
            scanUrl: eventData.url
          }
        });
      });

      if (window.universalLinks.dpLink !== null) {
        if (window.lastPage && window.lastPage !== router.currentRoute.path) {
          router.push(window.lastPage);
        } else if (router.currentRoute.path !== '/scan') {
          router.push('/scan');
        }
      }
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
  })
}

const initApp = () => {
  new Vue({
    store,
    router,
    vuetify,
    render: (h) => h(App),

    methods: {},
    mounted() {
      chainClient.setURLandNetwork('', process.env.VUE_APP_NETWORK);
      checkConnection();

      const firebase = window?.FirebasePlugin;

      firebase.hasPermission((status) => {
        if (!status) {
          firebase.grantPermission((hasPermission) => {
            console.log(`Permissions was ${hasPermission ? 'granted' : 'denied'}`);
          })
        }
      });

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
  initApp();

  document.addEventListener('pause', () => {
    window.lastPage = router.currentRoute.path;
  }, false);

  document.addEventListener('resume', () => {
    checkConnection();
  }, false);
});

// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = (typeof window.cordova !== 'undefined');
if (!isCordovaApp) {
  document.dispatchEvent(new CustomEvent('deviceready', {}));
}
