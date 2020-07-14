<template>
  <v-container>
    <recheck-scanner :handledByComponent="handledByComponent" />
  </v-container>
</template>

<script>
export default {
  name: 'AppHome',

  data() {
    return {
      handledByComponent: true,
    };
  },

  mounted() {
    window.QRScanner.prepare()
      .then((status) => {
        if (status.authorized) {
          window.QRScanner.show();
        } else {
          console.error('Permission Denied', status);
          // eslint-disable-next-line no-restricted-globals
          const isConfirmed = confirm('Permissions Denied!');
          if (isConfirmed) {
            window.QRScanner.prepare();
          }
        }
      })
      .catch((e) => console.error('Error', e));
  }
};
</script>
