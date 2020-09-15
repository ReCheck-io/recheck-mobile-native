<template>
  <div class="px-3 py-0">
    <recheck-identity
      :mobileBackup="true"
      classes="my-styles"
      appName="ipOcean"
      ref="id"
    />

    <div v-if="pinned && backupMode" class="backup-identity my-styles">
      <card v-if="showInfoStep">
        <template #header>Backup ipOcean Identity</template>
        <p>
          Your recovery phrase (also referred to as a private key) is at the
          core of your identity. This is a secret set of words that give you an
          actual control and ownership over your ipOcean identity. With this
          phrase you can recover your identity on any device where ipOcean
          mobile app is installed.
        </p>
        <p>
          Never disclose your recovery phrase to anyone and make sure you back
          it up on a piece of paper that no one else can see - but that you will
          never lose. Losing this set of words means losing access to your
          ipOcean identity and all data created with it.
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

        <p v-if="showMode">
          Please keep this Recovery Phrase safe and do not share it with other
          people.
        </p>

        <div class="privateKey">
          <p class="block">
            <b>{{ privateKey }}</b>
          </p>
          <div class="buttons">
            <button type="button" @click="exportPrivateKey()">
              <v-icon color="#000" size="20">mdi-export-variant</v-icon>
              Export Phrase
            </button>
          </div>
        </div>

        <p v-if="!showMode">
          Backup your recovery phrase on a piece of paper or file that no one
          but you will ever see. Make multiple copies.
        </p>
        <p v-if="!showMode">
          <b>Do not lose this recovery phrase!</b>
        </p>
        <p v-if="!showMode">
          To make sure you got it right, you will be asked to recreate this
          recovery phrase in the next screen.
        </p>
        <template #footer>
          <button type="button" class="btn" @click="cancelBackupMode">
            {{ showMode ? "Close" : "Cancel" }}
          </button>
          <button
            v-if="!showMode"
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
  </div>
</template>

<script>
import Card from 'vue-recheck-authorizer/src/components/cards/Card.vue';
import chainClient from 'vue-recheck-authorizer/src/chain/index';

export default {
  name: 'AppIdentity',

  components: { Card },

  data() {
    return {
      pinned: false,
      isBackupDone: false,

      showMode: false,
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

    this.$root.$on('backupMode', (res) => {
      this.pinned = chainClient.pinned();

      this.backupMode = res.backupMode;
      this.privateKey = res.privateKey;
      this.splittedPrivateKey = this.privateKey.split(' ').sort();
    });

    this.$root.$on('showPhrase', (pk) => {
      document.querySelector('.my-styles').classList.add('show-mode');
      this.backupMode = true;
      this.showMode = true;
      this.privateKey = pk;
      this.showPrivateKey();
    });
  },

  methods: {
    exportPrivateKey() {
      const socialShare = window?.plugins?.socialsharing;

      const options = {
        message: this.privateKey,
        subject: 'ipOcean ID - Recovery Phrase',
        chooserTitle: 'Pick an app',
        iPadCoordinates: '0,0,0,0'
      };

      const onSuccess = (result) => {
        console.log(`Complete result: ${JSON.stringify(result, null, 4)}`);
        console.log(`Share completed? ${result.completed}`);
        console.log(`Shared to app: ${result.app}`);
      };

      const onError = (msg) => {
        console.error(`Sharing failed with message: ${msg}`);
      };

      socialShare.shareWithOptions(options, onSuccess, onError);
    },

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
      document.querySelector('.my-styles').classList.remove('show-mode');
    },
  },
};
</script>

<style lang="scss">
.my-styles {
  text-align: center;

  &.show-mode > .current-identity {
    display: none;
  }

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

  .card-body {
    padding-left: 14px;
    padding-right: 14px;
  }

  .privateKey {
    padding: 12px 12px 6px 12px;
    margin-top: 6px;
    margin-bottom: 16px;
    color: #141414;
    background-color: #ffffff;
    box-shadow: 0 3px 6px rgba(20, 20, 20, 0.09);
    border: 1px solid #dad2d2d0;
    border-radius: 4px;

    .block {
      font-family: monospace;
      font-size: 15px;
      color: #141414;
    }

    .buttons {
      display: flex;
      align-items: center;
      justify-content: space-around;

      button {
        font-family: "Roboto", sans-serif;
        font-size: 14px;
        font-weight: 600;
        margin-top: 12px;
        text-transform: uppercase;

        i.v-icon {
          vertical-align: top;
        }
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
