<template>
  <v-container class="mb-16">
    <recheck-identity classes="my-styles" />
  </v-container>
</template>

<script>
export default {
  name: 'AppIdentity',
};
</script>

<style lang="scss">
.my-styles {
  text-align: center;

  .card {
    max-width: 400px !important;
  }
}
</style>
