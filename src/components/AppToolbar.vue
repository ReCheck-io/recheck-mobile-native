<template>
  <v-app-bar class="primary" app>
    <v-img max-width="40px" src="../assets/ipocean-logo-square.png"></v-img>
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
