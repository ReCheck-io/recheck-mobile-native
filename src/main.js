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

const initApp = () => {
  new Vue({
    store,
    router,
    vuetify,
    render: (h) => h(App),

    methods: {
      checkPinned() {
        if (!chainClient.pinned()) {
          router.push('/identity');
        } else {
          router.push('/scan');
        }
      },
      checkConnection() {
        navigator.connection.getInfo((res) => {
          if (res !== 'none') {
            this.checkPinned();

            document.addEventListener('backbutton', (e) => {
              e.preventDefault();
            }, false);
          } else {
            navigator.notification.confirm(
              'No network connection.', (result) => {
                if (result === 1) {
                  this.checkConnection();
                } else if (result === 2) {
                  navigator.app.exitApp();
                }
              }, 'Network Status', ['Try Again', 'cancel']
            );
          }
        });
      }
    },
    mounted() {
      this.checkConnection();
    }
  }).$mount('#app');
};

// Wait for the deviceready event to start the render
document.addEventListener('deviceready', () => {
  window.QRScanner.getStatus((status) => {
    if (!status.prepared) {
      window.QRScanner.prepare();
    }
  });

  initApp();
});

// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = (typeof window.cordova !== 'undefined');
if (!isCordovaApp) {
  document.dispatchEvent(new CustomEvent('deviceready', {}));
}
