<template>
  <v-container>
    <recheck-scanner
      :handledByComponent="true"
      :useIntegratedCamera="false"
    />
    <div class="guides">
      <img class="qr-scan-guides" src="../assets/scan.png">
    </div>
    <v-btn large @click="goBack" color="primary" class="go-back-btn">
      Go Home
    </v-btn>
  </v-container>
</template>

<script>
import router from '@/router';

export default {
  name: 'AppHome',

  data() {
    return {
      handledByComponent: true,
      useIntegratedCamera: false,
    };
  },

  methods: {
    goBack() {
      window.QRScanner.cancelScan((status) => console.log(status));
      window.QRScanner.destroy((status) => console.log(status));
      router.push('/');
    }
  }
};
</script>

<style lang="scss">
.guides {
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;

  .qr-scan-guides {
    width: 60%;
    max-width: 400px;
    margin-bottom: 3em;
    max-height: 50%;
  }
}

.go-back-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  border-radius: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 100%;
}
</style>
