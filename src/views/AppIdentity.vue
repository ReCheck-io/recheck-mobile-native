<template>
  <v-container>
    <recheck-identity classes="my-styles" />
  </v-container>
</template>

<script>
export default {
  name: 'AppIdentity',

  mounted() {
    if (window.resolvedFrom.path === '/scan') {
      window.QRScanner.cancelScan((status) => console.log(status));
      window.QRScanner.destroy((status) => console.log(status));
    }
  },
};
</script>

<style lang="scss">
.my-styles {
  text-align: center;

  .card {
    max-width: 400px !important;

    &-body {
      p {
        margin: 0;
      }
    }

    &-footer {
      &:not(:empty) {
        padding: 0 20px 14px 20px;
      }
    }
  }

  .modal {
    &-body {
      padding: 22px 22px 12px 22px;
    }

    &-footer {
      padding: 0 20px 14px 20px;
    }
  }
}
</style>
