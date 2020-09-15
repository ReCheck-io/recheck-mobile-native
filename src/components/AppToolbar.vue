<template>
  <v-app-bar class="primary" app>
    <img src="../assets/recheck-logo.png" alt="ReCheck's Logo" class="recheck-logo" />
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
  max-height: 90%;
}
</style>
