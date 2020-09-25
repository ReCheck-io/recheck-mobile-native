<template>
  <v-app-bar class="primary" app>
    <a href="https://my.recheck.io" target="_blank" class="recheck-logo">
      <img src="../assets/recheck-logo.png" alt="ReCheck's Logo" />
    </a>
    <v-btn to="/about" color="white" icon fixed right>
      <v-icon>mdi-information-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppToolbar',
};
</script>

<style lang="scss">
.recheck-logo {
  height: 100%;

  img {
    max-height: 90%;
  }
}
</style>
