<template>
  <v-container>
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

  .btn {
    padding: 11px 0;
  }

  .card {
    max-width: 400px !important;

    &-header {
      padding: 10px 20px;
    }

    &-body {
      padding: 14px 22px 14px 22px;

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
      padding: 14px 22px 14px 22px;
    }

    &-footer {
      padding: 0 20px 14px 20px;
    }
  }
}
</style>
