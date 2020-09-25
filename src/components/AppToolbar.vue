<template>
  <v-app-bar class="primary" app>
    <a href="https://my.ipocean.com" target="_blank" class="ipocean-logo">
      <img src="../assets/ipocean-logo.svg" alt="ipOcean's Logo" />
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
.ipocean-logo {
  height: 100%;

  img {
    max-height: 90%;
  }
}
</style>
