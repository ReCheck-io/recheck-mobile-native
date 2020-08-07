<template>
  <v-container class="py-0">
    <recheck-scanner
      classes="my-styles"
      appRequestId="ipOceanMobile"
      @scan-result="handleResult"
      :handledByComponent="true"
      :useIntegratedCamera="false"
    />

    <div class="guides" v-if="pinned">
      <div class="info-text">
        <h2>Scan QR Code</h2>
        <p>Scan the QR code from ipOcean</p>
      </div>
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
      isBackupDone: false,
      handledByComponent: true,
      useIntegratedCamera: false,
    };
  },

  mounted() {
    this.pinned = chainClient.pinned();
    this.inputFocusListeners();
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
    margin-top: -54px;
    margin-bottom: 56px;

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
