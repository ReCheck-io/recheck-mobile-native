<template>
  <transition
    name="scale"
    mode="out-in"
  >
    <v-overlay
      transition="scale-transition"
      origin="center center"
      opacity="1"
      z-index="10000"
      :color="overlayColor"
      :value="overlay"
    >
      <div v-if="status === 'success'">
        <v-icon>mdi-check</v-icon>
        <h1>Operation Approved!</h1>
      </div>
      <div v-else-if="status === 'error'">
        <v-icon>mdi-close</v-icon>
        <h1>Operation Failed!</h1>
      </div>
    </v-overlay>
  </transition>
</template>

<script>
export default {
  name: 'StatusOverlay',

  data() {
    return {
      overlay: false,
      status: 'success',
      overlayColor: 'secondary'
    };
  },

  mounted() {
    this.$root.$on('overlayOn', (status) => {
      this.overlay = true;
      this.status = status;
      this.overlayColor = status === 'error' ? 'red darken-3' : 'secondary';

      setTimeout(() => this.hideAlert(), 1800);
    });
    this.$root.$on('overlayOff', () => {
      this.overlay = false;
      this.status = 'success';
      this.overlayColor = 'secondary';
    });
  },

  methods: {
    hideAlert() {
      this.overlay = false;
      this.status = 'success';
      this.overlayColor = 'secondary';
    },
  },

};
</script>

<style>
.v-icon.mdi.mdi-check {
  font-size: 56px;
  font-weight: 500;
  display: flex;
  justify-content: center;
}
</style>
