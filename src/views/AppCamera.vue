<template>
  <v-container class="py-0">
    <recheck-scanner
      @scan-result="handleResult"
      :useIntegratedCamera="useIntegratedCamera"
      :handledByComponent="handledByComponent"
      appRequestId="ReCheckAPP"
      classes="my-styles"
      ref="camera"
    />

    <div class="guides" v-if="pinned">
      <div class="info-text">
        <h2>Scan QR Code</h2>
        <p>Open my.recheck.io on your computer and scan the QR</p>
      </div>
      <img class="qr-scan-guides" src="../assets/scan.png">
    </div>
  </v-container>
</template>

<script>
import chainClient from 'vue-recheck-authorizer/src/chain/index';

export default {
  name: 'AppCamera',

  data() {
    return {
      pinned: false,
      isBackupDone: false,
      handledByComponent: true,
      useIntegratedCamera: false,

      omitCamera: this.$route.query.omitCamera,
      scanUrl: this.$route.query.scanUrl,
    };
  },

  mounted() {
    this.pinned = chainClient.pinned();
    this.inputFocusListeners();

    if (chainClient.pinned() && this.omitCamera && this.scanUrl) {
      this.$refs.camera.setupCamera();
      this.$refs.camera.onDecode(this.scanUrl);
    }
  },

  methods: {
    handleResult(hasError) {
      if (!hasError) {
        this.$root.$emit('overlayOn', 'success');
      } else {
        this.$root.$emit('overlayOn', 'error');
      }
    },

    inputFocusListeners() {
      const inputs = document.querySelectorAll('input');
      inputs.forEach((input) => {
        input.addEventListener('focusin', () => this.$root.$emit('focusin', false));
        input.addEventListener('focusout', () => this.$root.$emit('focusout', true));
      });
    }
  }
};
</script>

<style lang="scss">
.my-styles {
  text-align: center;

  .btn {
    padding: 11px 0;

    &-block {
      width: 100%;
    }
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
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  .info-text {
    color: #fff;
    text-align: center;
    margin-top: -74px;
    margin-bottom: 56px;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: rgba(0,0,0, 0.7);

    p {
      margin-bottom: 0;
    }
  }

  .qr-scan-guides {
    width: 60%;
    max-width: 400px;
    max-height: 50%;
    margin-bottom: 1em;
  }
}
</style>
