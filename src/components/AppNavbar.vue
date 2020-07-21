<template>
  <v-bottom-navigation
    app
    grow
    dark
    fixed
    horizontal
    class="primary"
    v-model="bottomNav"
  >
    <v-btn to="/scan" value="Camera">
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
import chainClient from 'vue-recheck-authorizer/src/chain/index';

export default {
  name: 'AppToolbar',

  data() {
    return {
      bottomNav: 2,

      items: [
        { icon: 'mdi-qrcode-scan', text: 'Scan', route: '/scan' },
        { icon: 'mdi-account', text: 'My Identity', route: '/identity' },
      ]
    };
  },

  mounted() {
    this.bottomNav = !chainClient.pinned() ? 1 : 2;
  },
};
</script>
