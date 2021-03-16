<template>
  <div>
    <v-card
      v-if="hasID && !backupDone"
      class="section mx-auto pb-1"
      max-width="456px"
      outlined
    >
      <v-card-text class="pt-1 pb-4">
        <p class="text-h6 font-weight-bold text-center mb-0">
          Backup
        </p>
        <v-divider class="mt-1 mb-4"></v-divider>
        <div class="text-subtitle-1 text-center">
          We <strong>STRONGLY RECOMMEND</strong> to write down your recovery
          phrase in order to be able to recover your identity.
        </div>
      </v-card-text>

      <v-card-actions class="d-flex justify-space-around">
        <v-btn depressed class="no-uppercase" @click="backupMode = true">
          Backup Identity
        </v-btn>
      </v-card-actions>
    </v-card>

    <div v-if="hasID && backupMode" class="backup-identity my-styles">
      <v-card v-if="showInfoStep" class="mx-auto pb-1" max-width="456px" outlined>
        <v-card-text class="pt-1 pb-4">
          <p class="text-h6 font-weight-bold text-center mb-0">
            Backup ReCheck Identity
          </p>
          <v-divider class="mt-1 mb-5"></v-divider>
          <div class="text-center">
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
          </div>
        </v-card-text>

        <v-card-actions class="d-flex justify-space-around">
          <v-btn depressed @click="cancelBackupMode">
            Cancel
          </v-btn>
          <v-btn depressed color="primary" @click="showPrivateKey">
            Show Phrase
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card v-else-if="showPrivateKeyStep">
        <v-card-text class="pt-1 pb-4">
          <p class="text-h6 font-weight-bold text-center mb-0">
            Your Recovery Phrase
          </p>
          <v-divider class="mt-1 mb-5"></v-divider>
          <div class="text-center">
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
          </div>
        </v-card-text>

        <v-card-actions class="d-flex justify-space-around">
          <v-btn depressed @click="cancelBackupMode">
            {{ showMode ? 'Close' : 'Cancel' }}
          </v-btn>
          <v-btn
            depressed
            color="primary"
            v-if="!showMode"
            @click="showVerifyPrivateKey"
          >
            Verify Phrase
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card v-else-if="verifyPrivateKeyStep">
        <v-card-text class="pt-1 pb-4">
          <p class="text-h6 font-weight-bold text-center mb-0">
            Your Recovery Phrase
          </p>
          <v-divider class="mt-1 mb-5"></v-divider>
          <div class="text-center">
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
          </div>
        </v-card-text>

        <v-card-actions class="d-flex justify-space-around">
          <v-btn depressed @click="cancelBackupMode">Cancel</v-btn>
          <v-btn depressed color="primary" @click="verifyPrivateKey">
            Verify
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { chainClient } from '@/chain'

export default {
  name: 'BackupIdentity',

  props: ['props'],

  data() {
    return {
      hasID: chainClient.pinned() || false,
      backupDone: chainClient.pinned() ? JSON.parse(window?.localStorage?.backupDone) : false,

      mobileBackup: true,
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
    console.log(this.backupDone)
    this.$root.$emit('backupMode', {
      backupMode: !this.backupMode
    });
  },

  methods: {
    exportPrivateKey() {
      const socialShare = window?.plugins?.socialsharing

      let options = {
        message: this.privateKey,
        subject: 'My ReCheck Identity - Recovery Phrase',
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

      socialShare.shareWithOptions(options, onSuccess, onError)
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
