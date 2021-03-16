<template>
  <v-card v-if="hasID && !backupMode" class="section mx-auto pb-1" max-width="456px" outlined>
    <v-card-text class="pt-1 pb-4">
      <p class="text-h6 font-weight-bold text-center mb-0">
        Reset Identity
      </p>
      <v-divider class="mt-1 mb-4"></v-divider>
      <div class="text-subtitle-1 text-center">
        This will remove your current identity. If you have not saved the
        recovery phrase for your current identity it will be lost
        <strong>FOREVER</strong>.
      </div>
    </v-card-text>

    <v-card-actions class="d-flex justify-space-around">
      <v-btn depressed color="error" class="no-uppercase">
        Reset Identity
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { chainClient } from '@/chain'

export default {
  name: 'ResetIdentity',

  props: {
    backupMode: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      hasID: chainClient.pinned() || false,
      publicAddress: chainClient.pinned() ? localStorage.publicAddress : '',
    };
  },

  methods: {
    resetIdentity() {
      this.open(
        'Reset Identity',
        'Are you really sure you want to reset your Identity?',
      ).then((resolved) => {
        if (resolved) {
          this.open(
            'Reset Identity',
            'Are you really sure you want to reset your identity? You will lose the current one FOREVER!',
          ).then((resolved) => {
            if (resolved) {
              window.localStorage.clear();
              window.location.reload();
            } else {
              this.showConfirmModal = false;
            }
          });
        } else {
          this.showConfirmModal = false;
        }
      });
    }
  }
};
</script>
