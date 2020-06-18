<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/recheck-logo-dark.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-1 font-weight-bold mb-3">
          ReCheck Authorizer
        </h1>

        <p class="subheading font-weight-regular">
          Please join our online
          <a
            href="https://discord.com/invite/3KwFw72"
            target="_blank"
          >Discord Community</a>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default { name: 'HelloWorld' };
</script>
