<template>
  <v-alert
    fixed
    top
    rounded="0"
    class="mb-0 mb-2"
    type="warning"
    :value="isBackupDone"
    transition="scroll-y-transition"
  >
    <v-row align="center">
      <v-col class="py-0">
        <h4>Please Backup your Recovery Phrase!</h4>
        <p>Secure your Identity to prevent loss.</p>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="py-0">
        <v-btn outlined @click="backupNow">
          Backup Now
          <v-icon class="pl-2">mdi-backup-restore</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  name: 'AppAlert',

  props: {
    isBackupDone: {
      type: Boolean,
    }
  },

  methods: {
    backupNow() {
      this.$router.push('/identity');
    }
  }
};
</script>

<style lang="scss" scoped>
.v-alert[role="alert"] {
  position: fixed;
  top:56px;
  left: 0;
  right: 0;
}
</style>
