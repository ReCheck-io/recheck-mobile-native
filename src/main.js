import Vue from 'vue';
import VueCordova from 'vue-cordova';
import VueQRCodeScanner from 'vue-qrcode-reader';
import VueReCheckAuthorizer from 'vue-recheck-authorizer';

import App from './App.vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';

import '../node_modules/vue-recheck-authorizer/dist/main.css';

Vue.use(VueCordova);
Vue.use(VueQRCodeScanner);
Vue.use(VueReCheckAuthorizer);

Vue.config.productionTip = false;

const init = () => {
  new Vue({
    store,
    router,
    vuetify,
    render: (h) => h(App),
  }).$mount('#app');
};

// Wait for the deviceready event to start the render
document.addEventListener('deviceready', () => {
  // eslint-disable-next-line
  console.log("Ready, Render the App");
  init();
  const permission = ['android.permission.CAMERA'];
  const Permissions = window.plugins.Permission;
  Permissions.has(permission, (results) => {
    if (!results[permission]) {
      window.QRScanner.prepare();
    }
  }, alert);
});

// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = (typeof window.cordova !== 'undefined');
if (!isCordovaApp) {
  document.dispatchEvent(new CustomEvent('deviceready', {}));
}
