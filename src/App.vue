<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        ReCheck Authorizer
      </div>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-bottom-navigation
      v-model="bottomNav"
    >
      <v-btn value="home" to="/">
        <span>Home</span>
      </v-btn>
      <v-btn value="scan" to="/scan">
        <span>Scan</span>
      </v-btn>
      <v-btn value="identity" to="/identity">
        <span>Identity</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      bottomNav: 'scan',
    };
  },

  mounted() { },

};
</script>
