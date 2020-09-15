<template>
  <v-app-bar class="primary" app>
    <img src="../assets/ipocean-logo-square.png" alt="ipOcean's Logo" class="ipocean-logo" />
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
  max-height: 90%;
}
</style>
