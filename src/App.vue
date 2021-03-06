<template>
  <v-app toolbar :style="{ backgroundColor: isScanPage }">
    <AppToolbar />
    <StatusOverlay />

    <v-main>
      <router-view />
      <AppAlert v-if="!isActionPage" :isBackupDone="pinned && !isBackupDone" />
    </v-main>

    <AppNavbar v-if="!isActionPage" />
  </v-app>
</template>

<script>
import router from '@/router';
import AppToolbar from '@/components/AppToolbar.vue';
import AppNavbar from '@/components/AppNavbar.vue';
import AppAlert from '@/components/AppAlert.vue';
import StatusOverlay from '@/components/StatusOverlay.vue';
import chainClient from 'vue-recheck-authorizer/src/chain/index';
import { logger } from 'vue-recheck-authorizer/src/utils/logger';

export default {
  name: 'App',

  components: {
    AppToolbar,
    AppNavbar,
    AppAlert,
    StatusOverlay,
  },

  data() {
    return {
      pinned: false,
      isBackupDone: true,
      isScanPage: '#FFFFFF',
      isActionPage: router.history.current.path === '/action'
    };
  },

  mounted() {
    window.launchedAppFromLink = false;
    this.pinned = chainClient.pinned();
    this.checkIsScanPage(router.history.current);
    this.isActionPage = router.history.current.path === '/action';

    const firebase = window?.FirebasePlugin;
    const cordova = window?.cordova;

    firebase.getToken((token) => this.setFirebaseToken(token));
    firebase.onMessageReceived((data) => this.handleNotifications(data));

    cordova.getAppVersion.getVersionNumber().then((version) => {
      localStorage.setItem(
        'deviceInfo', `${cordova.platformId}:ReCheck-${version}`
      );
    });

    // Replace user's public address prefix ak_ with re_
    const publicAddress = localStorage.getItem('publicAddress');
    if (publicAddress && publicAddress !== null && publicAddress.startsWith('ak_')) {
      let newPublicAddress = publicAddress.replace('ak_', 're_');
      localStorage.setItem('publicAddress', newPublicAddress);
    }

    // Backup alert
    this.isBackupDone = JSON.parse(localStorage.getItem('backupDone'));

    if (this.pinned) {
      setTimeout(() => {
        if (!this.isBackupDone) {
          this.isBackupDone = true;
        }
      }, 6000);
    }
  },

  methods: {
    checkIsScanPage(res) {
      if (chainClient.pinned() && res.path === '/scan') {
        this.isScanPage = 'transparent';
      } else {
        this.isScanPage = '#FFFFFF';
      }
    },

    setFirebaseToken(token) {
      if (token && token !== null) {
        localStorage.setItem('firebaseToken', token);
      }
    },

    handleNotifications(data) {
      if (data && data.data && JSON.parse(data.data).selectionActionHash) {
        if (router.currentRoute.path !== '/action') {
          router.push({
            name: 'Action',
            params: data
          })
        }
      }
    }
  },

  watch: {
    $route(res) {
      this.checkIsScanPage(res);
    },
  }
};
</script>

<style>
body {
  font-family: "Roboto", -apple-system, 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
}

.modal-body .form-group .savePin {
  display: none;
}

.alert p {
  margin-bottom: 0;
}
</style>
