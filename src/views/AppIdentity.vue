<template>
  <v-container class="py-0">
    <recheck-identity
      :mobileBackup="mobileBackup"
      appName="My ReCheck"
      classes="my-styles"
      ref="id"
    />

    <div v-if="pinned && backupMode" class="backup-identity my-styles">
      <card v-if="showInfoStep">
        <template #header>Backup ReCheck Identity</template>
        <p>
          Your recovery phrase (also referred to as a private key) is at the
          core of your identity. This is a secret set of words that give you an
          actual control and ownership over your ReCheck identity. With this
          phrase you can recover your identity on any device where ReCheck
          mobile app is installed.
        </p>
        <p>
          Never disclose your recovery phrase to anyone and make sure you back
          it up on a piece of paper that no one else can see - but that you will
          never lose. Losing this set of words means losing access to your
          ReCheck identity and all data created with it.
        </p>
        <template #footer>
          <button type="button" class="btn" @click="cancelBackupMode">
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="showPrivateKey">
            Show Phrase
          </button>
        </template>
      </card>

      <card v-else-if="showPrivateKeyStep">
        <template #header>Your Recovery Phrase</template>
        <div class="privateKey">
          <p class="block">
            <b>{{ privateKey }}</b>
            <br />
            <button type="button" @click="copyString(privateKey)">
              <img src="../assets/copy.svg" alt="Copy icon svg" />
              Click to copy
            </button>
          </p>
        </div>
        <p>
          Backup your recovery phrase on a piece of paper or file that no one
          but you will ever see. Make multiple copies.
        </p>
        <p>
          <b>Do not lose this recovery phrase!</b>
        </p>
        <p>
          To make sure you got it right, you will be asked to recreate this
          recovery phrase in the next screen.
        </p>
        <template #footer>
          <button type="button" class="btn" @click="cancelBackupMode">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="showVerifyPrivateKey"
          >
            Verify Phrase
          </button>
        </template>
      </card>

      <card v-else-if="verifyPrivateKeyStep">
        <template #header>Your Recovery Phrase</template>
        <b>
          Confirm your recovery phrase. Tap the words below to compose your
          recovery phrase in the correct order.
        </b>
        <div class="selectable-keys">
          <v-chip
            v-for="key in splittedPrivateKey"
            :key="key"
            class="ma-1"
            outlined
            label
            draggable
            @click="selectKey(key)"
          >
            {{ key }}
          </v-chip>
        </div>

        <div class="selected-keys">
          <v-chip
            v-for="key in selectedKeys"
            :key="key"
            class="ma-1"
            outlined
            label
            close
            @click:close="deselectKey(key)"
          >
            {{ key }}
          </v-chip>
        </div>
        <template #footer>
          <button type="button" class="btn" @click="cancelBackupMode">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="verifyPrivateKey"
          >
            Verify
          </button>
        </template>
      </card>
    </div>
  </v-container>
</template>

<script>
import Card from 'vue-recheck-authorizer/src/components/cards/Card.vue';
import chainClient from 'vue-recheck-authorizer/src/chain/index';
import CopyStringMixin from '../mixins/CopyString.vue';

export default {
  name: 'AppIdentity',

  mixins: [CopyStringMixin],

  components: {
    Card,
  },

  data() {
    return {
      pinned: false,
      mobileBackup: true,
      isBackupDone: false,

      backupMode: false,
      privateKey: '',
      selectedKeys: [],
      splittedPrivateKey: [],

      showInfoStep: true,
      showPrivateKeyStep: false,
      verifyPrivateKeyStep: false,
    };
  },

  mounted() {
    this.pinned = chainClient.pinned();
    this.inputFocusListeners();

    this.$root.$on('backupMode', (res) => {
      this.pinned = chainClient.pinned();

      this.backupMode = res.backupMode;
      this.privateKey = res.privateKey;
      this.splittedPrivateKey = this.privateKey.split(' ').sort();
    });
  },

  methods: {
    showPrivateKey() {
      this.showInfoStep = false;
      this.showPrivateKeyStep = true;
    },

    showVerifyPrivateKey() {
      this.showInfoStep = false;
      this.showPrivateKeyStep = false;
      this.verifyPrivateKeyStep = true;
    },

    selectKey(selectedKey) {
      this.splittedPrivateKey = this.splittedPrivateKey.filter(
        (key) => key !== selectedKey
      );
      this.selectedKeys.push(selectedKey);
    },

    deselectKey(selectedKey) {
      this.selectedKeys = this.selectedKeys.filter(
        (key) => key !== selectedKey
      );
      this.splittedPrivateKey.push(selectedKey);
    },

    verifyPrivateKey() {
      const key = this.selectedKeys;

      if (key.length === 12) {
        this.$root.$emit('loaderOn');
        if (this.privateKey === key.join(' ')) {
          this.$root.$emit(
            'alertOn',
            'Identity backed up successfully!',
            'green'
          );
          this.cancelBackupMode();

          localStorage.setItem('backupDone', true);
          this.backupDone = true;
          this.$refs.id.backupDone = true;

          const card = document.querySelector('.card');
          if (
            this.backupDone === true
            && card.classList.contains('do-backup')
          ) {
            card.classList.remove('do-backup');
          }
        } else {
          this.splittedPrivateKey = this.splittedPrivateKey.concat(
            this.selectedKeys
          );
          this.splittedPrivateKey.sort();
          this.selectedKeys = [];
          this.$root.$emit(
            'alertOn',
            'Opps! Not correct order, try again',
            'red'
          );
        }
        this.$root.$emit('loaderOff');
      } else {
        this.splittedPrivateKey = this.splittedPrivateKey.concat(
          this.selectedKeys
        );
        this.splittedPrivateKey.sort();
        this.selectedKeys = [];
        this.$root.$emit(
          'alertOn',
          'The secret phrase have to be 12 words.',
          'red'
        );
      }
    },

    cancelBackupMode() {
      this.privateKey = '';
      this.selectedKeys = [];
      this.splittedPrivateKey = [];
      this.showInfoStep = true;
      this.showPrivateKeyStep = false;
      this.verifyPrivateKeyStep = false;

      this.backupMode = false;
      this.$refs.id.backupMode = false;
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
.my-styles {
  text-align: center;

  .btn {
    padding: 11px 0;

    &-block {
      width: 100%;
    }
  }

  .card {
    max-width: 400px !important;

    &-header {
      padding: 10px 20px;
    }

    &-body {
      padding: 14px 22px 14px 22px;

      p {
        margin-bottom: 0;
      }
    }

    &-footer {
      &:not(:empty) {
        padding: 0 20px 14px 20px;
      }
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

.backup-identity {
  p:nth-of-type(1),
  p:nth-of-type(2) {
    font-size: 17px;
    margin-bottom: 12px;
  }

  .privateKey {
    .block {
      padding: 12px 12px 6px 12px;
      margin-top: 6px;
      margin-bottom: 22px;
      color: #141414;
      background-color: #ffffff;
      box-shadow: 0 3px 6px rgba(20, 20, 20, 0.09);
      border: 1px solid #dad2d2d0;
      border-radius: 4px;
      font-family: monospace;
      font-size: 16px;
      margin-bottom: 16px;
    }

    button {
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      font-weight: 600;
      margin-top: 12px;
      text-transform: uppercase;

      img {
        width: 18px;
        height: 18px;
        vertical-align: text-bottom;
      }
    }
  }

  .selectable-keys,
  .selected-keys {
    padding: 8px;
    margin-top: 6px;
    margin-bottom: 22px;
    color: #141414;
    background-color: #ffffff;
    box-shadow: 0 3px 6px rgba(20, 20, 20, 0.09);
    border: 1px solid #dad2d2d0;
    border-radius: 4px;
    min-height: 50px;
    max-height: 200px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    span {
      margin: 0;
    }
  }
}
</style>
