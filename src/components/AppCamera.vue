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
};
</script>
