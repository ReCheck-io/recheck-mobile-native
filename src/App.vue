<template>
  <v-app toolbar :style="{ backgroundColor: isScanPage }">
    <AppToolbar />

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppToolbar from '@/components/AppToolbar.vue';
import router from '@/router';

export default {
  name: 'App',

  components: {
    AppToolbar
  },

  data() {
    return {
      isScanPage: '#FFFFFF'
    };
  },

  mounted() {
    this.checkIsScanPage(router.history.current);

    if (window.resolvedFrom.path === '/scan') {
      window.QRScanner.cancelScan((status) => console.log(status));
      window.QRScanner.destroy((status) => console.log(status));
    }
  },

  methods: {
    checkIsScanPage(res) {
      if (res.path === '/scan') {
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

<style lang="scss">
body {
  font-family: 'Roboto', -apple-system, 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
}

.alert {
  p {
    margin-bottom: 0;
  }
}
</style>
