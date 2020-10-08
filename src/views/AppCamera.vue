<template>
  <div class="camera-container px-3 py-0">
    <recheck-scanner
      @scan-result="handleResult"
      :useIntegratedCamera="useIntegratedCamera"
      :handledByComponent="handledByComponent"
      :isCameraOmitted="isCameraOmitted"
      :agreementText="agreementText"
      :scanLink="scanLink"
      appRequestId="ReCheckAPP"
      classes="my-styles"
      ref="camera"
    />

    <div class="guides" v-if="pinned" v-show="showHints">
      <img class="qr-scan-guides" src="../assets/scan.png" />
        <div class="info-card">
          <img src="../assets/scan-hint.svg" alt="svg" />
          <p>
            Open
            <a href="https://my.recheck.io" target="_blank">
              <b>https://my.recheck.io</b>
            </a> on your computer and scan the QR
            Code
          </p>
        </div>
    </div>
  </div>
</template>

<script>
import chainClient from 'vue-recheck-authorizer/src/chain/index';
import { logger } from 'vue-recheck-authorizer/src/utils/logger';

export default {
  name: 'AppCamera',

  data() {
    return {
      showHints: true,
      pinned: false,
      isBackupDone: false,
      handledByComponent: true,
      useIntegratedCamera: false,

      agreementText: 'By approving the action you agree to our <a class="link" href="https://recheck.io/privacy-policy-terms-of-use/" target="_blank">Privacy Policy</a> and <a class="link" href="https://recheck.io/terms-and-conditions/" target="_blank">Terms &amp; Conditions</a>.',

      isCameraOmitted: this.$route.params.omitCamera && this.$route.params.omitCamera !== null
        ? this.$route.params.omitCamera
        : false,
      scanLink: this.$route.params.scanUrl && this.$route.params.scanUrl !== null
        ? this.$route.params.scanUrl
        : '',
    };
  },

  beforeMount() {
    if (this.$route.params.omitCamera && this.$route.params.omitCamera !== null
      && this.$route.params.scanUrl && this.$route.params.scanUrl !== null) {
      window.launchedAppFromLink = true;
    }
  },

  mounted() {
    logger(this.$route.params.omitCamera, this.$route.params.scanUrl);
    this.$root.$children[0].isActionPage = this.$route.path === '/action';
    this.pinned = chainClient.pinned();

    this.$root.$on('pinmodal-status', (isActive) => {
      if (isActive) {
        this.showHints = !isActive;
      } else {
        this.showHints = !isActive;
      }
    });
  },

  beforeUpdate() {
    this.$route.params.omitCamera ? this.$route.params.omitCamera = null : '';
    this.$route.params.scanUrl ? this.$route.params.scanUrl = null : '';
  },

  methods: {
    handleResult(hasError) {
      if (!hasError) {
        this.$root.$emit('overlayOn', 'success');
      } else {
        this.$root.$emit('overlayOn', 'error');
      }

      setTimeout(() => {
        if (window.launchedAppFromLink) {
          this.clearDeeplinks();
          navigator.app.exitApp();
        }
      }, 2100);
    },
    clearDeeplinks() {
      this.$route.params.omitCamera ? this.$route.params.omitCamera = null : '';
      this.$route.params.scanUrl ? this.$route.params.scanUrl = null : '';
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$route.params.omitCamera ? this.$route.params.omitCamera = null : '';
    this.$route.params.scanUrl ? this.$route.params.scanUrl = null : '';
    next()
  }
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

  .qr-scan-guides {
    width: 65%;
    max-width: 400px;
    max-height: 400px;
    margin-bottom: 10em;
  }

  .info-card {
    width: 100%;
    height: 160px;
    padding: 13px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0.7;
    color: #141414;
    background-color: #fff;

    img {
      max-width: 120px;
    }
  }
}
</style>
