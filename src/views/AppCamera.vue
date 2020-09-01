<template>
  <div class="camera-container px-3 py-0">
    <recheck-scanner
      @scan-result="handleResult"
      :useIntegratedCamera="useIntegratedCamera"
      :handledByComponent="handledByComponent"
      :isCameraOmitted="isCameraOmitted"
      :scanLink="scanLink"
      appRequestId="ReCheckAPP"
      classes="my-styles"
      ref="camera"
    />

    <div class="guides" v-if="pinned">
      <div class="info-text">
        <h2>Scan QR Code</h2>
        <p class="px-3">
          Open <b>https://www.my.recheck.io</b> on your computer and scan the QR
          Code
        </p>
      </div>
      <img class="qr-scan-guides" src="../assets/scan.png" />
    </div>
  </div>
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

      isCameraOmitted: this.$route.params.omitCamera
        ? this.$route.params.omitCamera
        : false,
      scanLink: this.$route.params.scanUrl ? this.$route.params.scanUrl : '',
    };
  },

  mounted() {
    this.pinned = chainClient.pinned();
    this.inputFocusListeners();

    // Clear deep links data for next open by user
    setTimeout(() => {
      window.universalLinks.dpLink = null;
    }, 1000);
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
    },
  },
};
</script>

<style lang="scss">
.camera-container {
  width: 100%;
  height: 100%;
}

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
  height: inherit;
  width: inherit;
  top: 0;
  left: 0;

  .info-text {
    color: #fff;
    text-align: center;
    margin-top: -24px;
    margin-bottom: 44px;
    padding-top: 8px;
    padding-bottom: 8px;

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
