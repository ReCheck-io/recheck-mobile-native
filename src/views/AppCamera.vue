<template>
  <v-container>
    <recheck-scanner
      @scan-result="handleResult"
      :handledByComponent="true"
      :useIntegratedCamera="false"
    />
    <div class="guides" v-if="pinned">
      <img class="qr-scan-guides" src="../assets/scan.png">
    </div>
  </v-container>
</template>

<script>
import chainClient from 'vue-recheck-authorizer/src/chain/index';

export default {
  name: 'AppHome',

  data() {
    return {
      pinned: false,
      handledByComponent: true,
      useIntegratedCamera: false,
    };
  },

  mounted() {
    this.pinned = chainClient.pinned();
  },

  methods: {
    handleResult(hasError) {
      console.log(hasError);
      if (!hasError) {
        this.$root.$emit('overlayOn', 'success');
      } else {
        this.$root.$emit('overlayOn', 'error');
      }
    }
  }
};
</script>

<style lang="scss">
.guides {
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;

  .qr-scan-guides {
    width: 60%;
    max-width: 400px;
    margin-bottom: 3em;
    max-height: 50%;
  }
}
</style>
