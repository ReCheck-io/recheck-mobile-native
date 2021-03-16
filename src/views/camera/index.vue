<template>
  <div class="camera-container px-3 py-0">
    <Scanner
      @scan-result="handleResult"
      :isCameraOmitted="isCameraOmitted"
      :agreementText="agreementText"
      :scanLink="scanLink"
      appRequestId="ReCheckAPP"
      ref="camera"
    />

    <ScannerHint :isVisible="showHint" />
  </div>
</template>

<script>
import { logger } from '@/utils/logger';
import { chainClient } from '@/chain/index';
import Scanner from './components/camera.vue';
import ScannerHint from './components/hint.vue';

export default {
  name: 'AppCamera',

  components: {
    Scanner,
    ScannerHint
  },

  data() {
    return {
      pinned: false,
      showHint: true,
      isBackupDone: false,

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
    this.$root.$children[0].isActionPage = this.$route.path === '/notification';
    this.pinned = chainClient.pinned();

    this.$root.$on('pinmodal-status', (isActive) => this.showHint = !isActive);
  },

  beforeUpdate() {
    this.clearDeeplinks();
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

  beforeRouteLeave(_, __, next) {
    this.clearDeeplinks();
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
