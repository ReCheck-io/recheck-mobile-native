<template>
  <div class="py-0">
    <div class="content">
      <img src="../assets/loader.svg" width="64px" alt="SVG Loader">
      <h3>Processing QR code's data ...</h3>
    </div>
  </div>
</template>

<script>
import router from '../router';

export default {
  name: 'AppLinks',

  mounted() {
    setTimeout(() => {
      router.push({
        name: 'Scan',
        params: {
          omitCamera: this.$route.params.omitCamera,
          scanUrl: this.$route.params.scanUrl,
        }
      });
    }, 500);
  },
};
</script>

<style lang="scss">
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 44px;
}
</style>
