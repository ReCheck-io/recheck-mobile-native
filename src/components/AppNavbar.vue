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
      activeBtn: 2,
      showNav: true,
    };
  },

  mounted() {
    this.activeBtn = !chainClient.pinned() ? 1 : 2;

    this.$root.$on('focusin', (res) => {
      this.showNav = res;
    });
    this.$root.$on('focusout', (res) => {
      this.showNav = res;
    });
  },
};
</script>
