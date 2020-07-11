<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-toolbar class="primary">
        <v-img max-width="90px" src="../assets/recheck-logo.png"></v-img>
        <v-btn @click="drawer = false" icon fixed right color="white">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list-item
        v-for="(item, i) in items"
        :key="`item_${i}`"
        :to="item.route"
        @click="toggleDrawer"
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
      <v-toolbar-title @click="goHome" class="white--text">
        <v-img max-width="90px" src="../assets/recheck-logo.png"></v-img>
      </v-toolbar-title>
      <v-btn to="/scan" icon fixed right color="white">
        <v-icon>mdi-camera-iris</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'AppToolbar',

  data() {
    return {
      drawer: false,

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
      window.location.hash = '/';
    }
  }
};
</script>
