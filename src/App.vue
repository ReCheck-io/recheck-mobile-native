<template>
  <v-app toolbar>
    <AppToolbar />

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppToolbar from '@/components/AppToolbar.vue';

export default {
  name: 'App',

  components: {
    AppToolbar
  },

  data() {
    return {};
  },
};
</script>

<style>
body {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, Roboto, 'Open Sans',
  'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
}
</style>
