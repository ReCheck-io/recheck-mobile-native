<template>
  <v-bottom-navigation
    app
    grow
    dark
    fixed
    horizontal
    class="primary"
    v-model="activeBtn"
    :input-value="showNav"
  >
    <v-btn to="/scan" value="Camera" @click="userInfo">
      <span>Scan</span>
      <v-icon>mdi-qrcode-scan</v-icon>
    </v-btn>
    <v-btn to="/identity" value="My Identity">
      <span>My Identity</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import router from '@/router';
import chainClient from 'vue-recheck-authorizer/src/chain/index';

export default {
  name: 'AppToolbar',

  data() {
    return {
      activeBtn: 2,
      showNav: true,
    };
  },

  mounted() {
    this.activeBtn = !chainClient.pinned() ? 1 : 2;

    this.$root.$on('pinmodal-status', (isActive) => {
      if (isActive) {
        this.showNav = !isActive;
      } else {
        this.showNav = !isActive;
      }
    });
  },

  methods: {
    userInfo() {
      if (!chainClient.pinned()) {
        const redirectFromScan = router.currentRoute.query?.redirect
          && router.currentRoute.query?.redirect === '/scan';
        if (redirectFromScan) {
          this.$root.$emit(
            'alertOn',
            'Please finish Identity creation before using Camera',
            'red'
          );
        }
      }
    }
  }
};
</script>

<style scoped>
.v-item-group.v-bottom-navigation .v-btn {
  font-size: 0.85rem;
}
</style>
