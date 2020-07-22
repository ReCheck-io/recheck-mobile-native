<template>
  <v-container>
    <recheck-scanner
      classes="my-styles"
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
.my-styles {
  text-align: center;

  .btn {
    padding: 11px 0;
  }

  .modal {
    &-body {
      padding: 14px 22px 14px 22px;
    }

    &-footer {
      padding: 0 20px 14px 20px;
    }
  }
}
.guides {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  .qr-scan-guides {
    width: 60%;
    max-width: 400px;
    margin-bottom: 1em;
    max-height: 50%;
  }
}
</style>
