<template>
  <v-dialog v-show="isVisible" transition="dialog-top-transition" max-width="600">
    <v-card>
      <v-toolbar color="primary" dark>
        <slot name="header">{{ title }}</slot>
      </v-toolbar>
      <v-card-text>
        <slot name="body">
          <p v-show="!!message" v-html="message"></p>
          <p class="terms" v-if="agreementText" v-html="agreementText"></p>
        </slot>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn depressed @click="cancelModal">Cancel</v-btn>
        <v-btn depressed color="primary" @click="confirmModal">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmModal',

  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    agreementText: {
      type: String,
      default: '',
    },
    resolve: null,
    reject: null,
  },

  methods: {
    cancelModal() {
      this.resolve(false);
      this.$emit('update:isVisible', false);
    },
    confirmModal() {
      this.resolve(true);
      this.$emit('update:isVisible', false);
    },
  },
};
</script>
