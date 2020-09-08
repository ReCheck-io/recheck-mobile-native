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
    this.pinned = chainClient.pinned();
    this.checkIsScanPage(router.history.current);
    this.isActionPage = router.history.current.path === '/action';
    this.$root.$children[0].isActionPage = router.history.current.path === '/action';

    const firebase = window?.FirebasePlugin;

    firebase.getToken((token) => {
      localStorage.setItem('firebaseToken', token);
    });

    firebase.onMessageReceived((data) => {
      if (router.currentRoute.path !== '/action') {
        router.push({
          name: 'Action',
          params: data
        })
      }
    })

    this.isBackupDone = JSON.parse(localStorage.getItem('backupDone'));

    if (chainClient.pinned()) {
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
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
}

.modal-body .form-group .savePin {
  display: none;
}

.alert p {
  margin-bottom: 0;
}
</style>
