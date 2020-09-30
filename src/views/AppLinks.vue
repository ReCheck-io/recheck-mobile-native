<template>
  <div class="links-container py-0">
    <div class="links-content">
      <img src="../assets/loader.svg" width="64px" alt="SVG Loader">
      <h3>Processing QR code's data ...</h3>
    </div>
  </div>
</template>

<script>
import router from '../router'

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
    }, 1000);
  },

  beforeRouteLeave(to, from, next) {
    this.$route.params.omitCamera ? this.$route.params.omitCamera = null : '';
    this.$route.params.scanUrl ? this.$route.params.scanUrl = null : '';
    next()
  }
};
</script>

<style lang="scss">
.links-container .links-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 44px;
}
</style>
