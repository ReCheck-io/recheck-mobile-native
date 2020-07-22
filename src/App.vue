<template>
  <v-app toolbar :style="{ backgroundColor: isScanPage }">
    <AppToolbar />

    <StatusOverlay />

    <v-content>
      <router-view />
    </v-content>

    <AppNavbar />
  </v-app>
</template>

<script>
import router from '@/router';
import AppToolbar from '@/components/AppToolbar.vue';
import AppNavbar from '@/components/AppNavbar.vue';
import StatusOverlay from '@/components/StatusOverlay.vue';
import chainClient from 'vue-recheck-authorizer/src/chain/index';

export default {
  name: 'App',

  components: {
    AppToolbar,
    AppNavbar,
    StatusOverlay,
  },

  data() {
    return {
      isScanPage: '#FFFFFF'
    };
  },

  mounted() {
    this.checkIsScanPage(router.history.current);
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
  font-family: -apple-system, 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
}

.alert p {
  margin-bottom: 0;
}
</style>
