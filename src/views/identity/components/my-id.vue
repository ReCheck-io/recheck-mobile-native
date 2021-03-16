<template>
  <div class="identity section">
    <v-card v-if="hasID && !backupMode" class="mx-auto" max-width="456px" outlined>
      <v-card-text class="pt-1 pb-4">
        <p class="text-h6 font-weight-bold text-center mb-0">
          My ReCheck Identity
        </p>
        <v-divider class="mt-1 mb-4"></v-divider>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div
              v-on="on"
              v-bind="attrs"
              class="text-subtitle-1 text-center font-weight-medium"
            >
              {{
                publicAddress.replace(publicAddress.substring(16, publicAddress.length - 16), "...")
              }}
            </div>
          </template>
          <span>{{ publicAddress }}</span>
        </v-tooltip>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { chainClient } from '@/chain'

export default {
  name: 'MyIdentity',

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
};
</script>
