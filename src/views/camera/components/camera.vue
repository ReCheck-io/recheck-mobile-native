<template>
  <div class="scanner">
    <p>asd</p>
  </div>
</template>

<script>
import { chainClient } from '@/chain'
import { logger, getOrigin, isValidURL } from '@/utils'

export default {
  name: 'Scanner',

  props: {
    isCameraOmitted: {
      type: Boolean,
      default: false,
    },
    scanLink: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      error: '',
      pinned: false,
      initialized: false,
      decodedString: '',

      omitCamera: this.isCameraOmitted,
      scanUrl: this.scanLink,

      apiEnv:
        process.env.VUE_APP_API_URL && process.env.VUE_APP_API_URL !== ''
          ? process.env.VUE_APP_API_URL
          : '',
      apiNetwork:
        process.env.VUE_APP_NETWORK && process.env.VUE_APP_NETWORK !== ''
          ? process.env.VUE_APP_NETWORK
          : 'ae',

      publicAddress: '',
      automation: false,
      showPinModal: false,
      pinCase: 'login',
      pinCode: '',

      isButtonVisible: true,
      agreementTexts: this.agreementText,

      showConfirmModal: false,
      title: '',
      message: '',
      resolve: null,
      reject: null,
    };
  },

  mounted() {
    this.pinned = chainClient.pinned();

    if (this.pinned) {
      this.publicAddress = localStorage.publicAddress;
    }

    if (this.apiEnv !== '' && this.apiNetwork !== '') {
      chainClient.setURLandNetwork(this.apiEnv, this.apiNetwork);
    } else {
      let savedApiUrl = localStorage.getItem('apiUrl');
      if (savedApiUrl && savedApiUrl !== null) {
        chainClient.setURLandNetwork(savedApiUrl, this.apiNetwork);
      }
    }

    if (this.pinned && !this.omitCamera) {
      this.setupCamera();
    }

    if (this.pinned && this.omitCamera && this.scanUrl !== '') {
      this.onDecode(this.scanUrl);
      setTimeout(() => this.setupCamera(), 1500);
    }
  },

  methods: {
    onDecode(decodedString) {
      this.$emit('is-scanned', true);
      this.decodedString = decodedString;

      if (decodedString) {
        const origin = getOrigin(decodedString);
        logger('hasOrigin: ', origin);
        if (origin && !origin.includes('verify')) {
          localStorage.setItem('apiUrl', origin);
          chainClient.setURLandNetwork(origin, this.apiNetwork);
        }
      }

      if (decodedString.indexOf('/login') > 0) {
        this.pinCase = 'login';
        if (!this.componentHandled) {
          this.$emit('qr-decode', this.pinCase);
        } else {
          this.handleDecode(
            this.pinCase,
            'Login Request',
            'You are about to login. Are you sure?',
          );
        }
      } else if (decodedString.indexOf('sh:') > 0) {
        this.decodedString = decodedString.substring(decodedString.length - 69);
        this.pinCase = 'share';
        if (!this.componentHandled) {
          this.$emit('qr-decode', this.pinCase);
        } else {
          this.handleDecode(
            this.pinCase,
            'Document Share Request',
            'You are about to share a document. Are you sure?',
          );
        }
      } else if (decodedString.indexOf('se:') > 0) {
        this.decodedString = decodedString.substring(decodedString.length - 69);
        this.pinCase = 'share';
        if (!this.componentHandled) {
          this.$emit('qr-decode', this.pinCase);
        } else {
          this.handleDecode(
            this.pinCase,
            'Document Email Share Request',
            'You are about to share a document by email. Are you sure?',
          );
        }
      } else if (decodedString.indexOf('sg:') > 0) {
        this.decodedString = decodedString.substring(decodedString.length - 69);
        this.pinCase = 'sign';
        if (!this.componentHandled) {
          this.$emit('qr-decode', this.pinCase);
        } else {
          this.handleDecode(
            this.pinCase,
            'File Sign Request',
            'You are about to sign a file. Are you sure?',
          );
        }
      } else if (decodedString.indexOf('re:') > 0) {
        this.decodedString = decodedString.substring(decodedString.length - 69);
        this.pinCase = 'decrypt';
        if (!this.componentHandled) {
          this.$emit('qr-decode', this.pinCase);
        } else {
          this.handleDecode(
            this.pinCase,
            'Document Decrypt Request',
            'You are about to decrypt a document. Are you sure?',
          );
        }
      } else if (decodedString.indexOf('verify') > 0) {
        this.isButtonVisible = false;
        let verifyMessage = `
          Please click the link to verify certificate content. <br />
          <a href="${decodedString}" target="_blank" rel="noopener noreferrer">${`${decodedString.slice(0, 56)}...`}</a>
        `;
        this.open('ReCheck Verifier URL', verifyMessage);
      } else if (decodedString) {
        this.isButtonVisible = false;
        let messageContent = isValidURL(decodedString)
          ? `Unrecognized QR Code content: <br /> <a href="${decodedString}" target="_blank" rel="noopener noreferrer">${`${decodedString.slice(0, 56)}...`}</a>`
          : `Unrecognized QR Code content: <br /> ${decodedString}`
        this.open('Unrecognized QR Code', messageContent);
      }
    },

    doLogin() {
      this.$root.$emit('loaderOn');
      chainClient.doLogin(this.pinCode, this.decodedString, handleLogin);
      this.pinCode = '';
      this.pinCase = '';

      function handleLogin(err) {
        this.$root.$emit('loaderOff');
        if (!err) {
          this.$root.$emit('alertOn', 'Login data sent successfully.', 'green');
        } else if (err === 'authError') {
          this.$root.$emit('alertOn', 'Passcode mismatch!', 'red');
        } else {
          this.$root.$emit('alertOn', 'Unable to send login data', 'red');
        }
        this.$emit('scan-result', err);
        setTimeout(() => this.setupCamera(), 2000);
      }
    },

    doExecSelection() {
      this.$root.$emit('loaderOn');

      chainClient.doExecSelection(this.pinCode, this.decodedString, handleExecSelection);

      this.pinCase = '';
      this.pinCode = '';

      function handleExecSelection(err) {
        this.$root.$emit('loaderOff');

        if (!err) {
          if (this.pinCase === 'sign') {
            this.$root.$emit('alertOn', 'Signed data successfully.', 'green');
          } else if (this.pinCase === 'share') {
            this.$root.$emit('alertOn', 'Shared data successfully.', 'green');
          } else if (this.pinCase === 'decrypt') {
            this.$root.$emit(
              'alertOn',
              'Decrypted data successfully.',
              'green',
            );
          }
        } else if (err === 'authError') {
          this.$root.$emit('alertOn', 'Passcode mismatch!', 'red');
        } else if (this.pinCase === 'sign') {
          this.$root.$emit('alertOn', 'Failed to sign data.', 'red');
        } else if (this.pinCase === 'share') {
          this.$root.$emit('alertOn', 'Failed to share data.', 'red');
        } else if (this.pinCase === 'decrypt') {
          this.$root.$emit('alertOn', 'Failed to decrypt data.', 'red');
        }

        this.$emit('scan-result', err);
        setTimeout(() => this.setupCamera(), 2000);
      }
    },

    open(title, message) {
      this.showConfirmModal = true;
      this.title = title;
      this.message = message;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    confirmPin() {
      if (this.checkPin(this.pinCode)) {
        if (chainClient.checkPassword(this.pinCode)) {
          if (this.pinCase === 'login') {
            this.doLogin();
          } else if (['share', 'decrypt', 'sign'].includes(this.pinCase)) {
            this.doExecSelection();
          }
          this.showPinModal = false;
        } else {
          this.$root.$emit('alertOn', 'Passcode is incorrect!', 'red');
          this.pinCode = '';
        }
      } else {
        this.$root.$emit('alertOn', 'Passcode is incorrect!', 'red');
        this.pinCode = '';
      }
      this.isButtonVisible = true;
    },

    cancelPin() {
      this.pinCode = '';
      this.showPinModal = false;
      this.isButtonVisible = true;
      setTimeout(() => this.setupCamera(), 300);
    },

    handleDecode(pinCase, title, message) {
      this.open(title, message)
        .then((resolved) => {
          if (resolved) {
            if (chainClient.pinned()) {
              this.showPinModal = true;
            } else if (pinCase === 'login') {
              this.doLogin();
            } else {
              this.confirmPin();
            }
          } else {
            setTimeout(() => this.setupCamera(), 300);
          }
        })
        .catch(() => this.$root.$emit('loaderOff'));
    },

    setupCamera() {
      if (!this.useIntegratedCamera && window && window.QRScanner) {
        window.QRScanner.show();
        window.QRScanner.scan((err, contents) => {
          if (err) {
            logger('scan error: ', err);
          } else {
            logger('scan result: ', contents);
            this.onDecode(contents);
          }
        });
      }
    },

    checkPin(pin) {
      if (pin === '') {
        return false;
      }
      if (pin === undefined) {
        return false;
      }
      if (pin.length < 4) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
/* @import '../styles/app.scss'; */
</style>
