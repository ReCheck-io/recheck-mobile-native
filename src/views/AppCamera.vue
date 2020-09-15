<template>
  <div class="camera-container px-3 py-0">
    <recheck-scanner
      @scan-result="handleResult"
      :useIntegratedCamera="useIntegratedCamera"
      :handledByComponent="handledByComponent"
      :isCameraOmitted="isCameraOmitted"
      :scanLink="scanLink"
      appRequestId="ipOceanMobile"
      classes="my-styles"
      ref="camera"
    />

    <div class="guides" v-if="pinned">
      <img class="qr-scan-guides" src="../assets/scan.png" />
      <div class="info-card">
        <img src="../assets/scan-hint.svg" alt="svg" />
        <p>
          Open <b>https://my.ipocean.com</b> on your computer and scan the QR
          Code
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import chainClient from 'vue-recheck-authorizer/src/chain/index';

export default {
  name: 'AppHome',

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

    this.$root.$on('pinmodal-is-active', (isActive) => {
      if (isActive) {
        document.querySelector('.guides').style.display = 'none';
      } else {
        document.querySelector('.guides').style.display = 'flex';
      }
    });

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
    width: 45%;
    max-width: 400px;
    max-height: 38%;
    margin-bottom: 13em;
  }

  .info-card {
    width: 100%;
    height: 210px;
    padding: 16px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    color: #141414;
    background-color: #fff;

    img {
      max-width: 170px;
    }
  }
}
</style>
