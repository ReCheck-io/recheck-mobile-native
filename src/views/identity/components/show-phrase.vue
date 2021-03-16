<template>
   <v-card v-if="hasID && backupDone" class="section mx-auto pb-1" max-width="456px" outlined>
    <v-card-text class="pt-1 pb-4">
      <p class="text-h6 font-weight-bold text-center mb-0">
        Show Recovery Phrase
      </p>
      <v-divider class="mt-1 mb-4"></v-divider>
      <div class="text-subtitle-1 text-center">
        Please tap the button below to reveal your recovery phrase or export
        it.
      </div>
    </v-card-text>

    <v-card-actions class="d-flex justify-space-around">
      <v-btn block depressed class="no-uppercase" @click="showPrivateKey">
        Show Phrase
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { chainClient } from '@/chain'

export default {
  name: 'ShowIdentityPhrase',

  data() {
    return {
      hasID: chainClient.pinned() || false,
      backupDone: chainClient.pinned() ? JSON.parse(window?.localStorage?.backupDone) : false,
    };
  },

  methods: {}
};
</script>
