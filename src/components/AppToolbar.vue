<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-toolbar class="primary">
        <v-img max-width="90px" src="../assets/recheck-logo.png"></v-img>
        <v-btn @click="drawer = !drawer" icon fixed right color="white">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list-item
        v-for="(item, i) in items"
        :key="`item_${i}`"
        :to="item.route"
        @click="drawer = !drawer"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar class="primary" clipped-left app>
      <v-app-bar-nav-icon dark @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">{{ pageTitle }}</v-toolbar-title>
      <v-btn to="/scan" color="white" icon fixed right>
        <v-icon>mdi-camera-iris</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: 'AppToolbar',

  data() {
    return {
      drawer: false,
      pageTitle: 'Home',

      items: [
        { icon: 'mdi-view-dashboard', text: 'Home', route: '/home' },
        { icon: 'mdi-camera-iris', text: 'Camera', route: '/scan' },
        { icon: 'mdi-account', text: 'My Identity', route: '/identity' },
        { icon: 'mdi-note', text: 'Terms and Privacy', route: '/privacy' },
      ]
    };
  },

  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    goHome() {
      router.push('/');
    }
  },

  watch: {
    $route(res) {
      this.pageTitle = res.name;
    },
  }
};
</script>
