<template>
  <v-container scrollable>
    <v-layout style="margin-top: 2rem; margin-bottom: 2rem;">
      <v-flex>
        <v-card v-if="!pinned">
          <v-img class="white--text" height="100px" src="../assets/recheck-welcome.jpg">
            <v-container fluid>
              <h2 center>Sensitive Data Protection and Exchange</h2>
            </v-container>
          </v-img>
          <v-card-text>
            <div>
              Thank you for using ReCheck Mobile.
              Sign up and create your own digital identity.
            </div>
          </v-card-text>
          <v-layout justify-center>
            <v-card-actions>
              <v-btn to="/identity" color="green" dark>Sign up!</v-btn>
            </v-card-actions>
          </v-layout>
        </v-card>

        <v-card v-if="pinned">
          <v-img class="white--text" height="100px" src="../assets/recheck-data.jpg">
            <v-container fluid>
              <h2>Sensitive Data Protection and Exchange</h2>
            </v-container>
          </v-img>
          <v-card-text>
            <div>
              Thank you for using ReCheck Mobile.
              You can now login and sign documents by just scanning QR codes.
            </div>
          </v-card-text>
          <v-layout justify-center>
            <v-card-actions>
              <v-btn to="/scan" color="green" dark>SCAN</v-btn>
            </v-card-actions>
          </v-layout>
        </v-card>

        <v-card v-if="pinned" style="margin-top: 2rem; margin-bottom: 2rem;">
          <v-img class="white--text" height="100px" src="../assets/recheck-data.jpg">
            <v-container fluid>
              <h2>Your data is finally YOURS!</h2>
            </v-container>
          </v-img>
          <v-card-text>
            <div>
              ReCheck servers don't store user credentials.
              Your identity is entirely owned and controlled by you.
              Please check your identity details and make sure you back it up.
            </div>
          </v-card-text>
          <v-layout justify-center>
            <v-card-actions>
              <v-btn to="/identity" color="green" dark>Identity</v-btn>
            </v-card-actions>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'AppHome',

  data() {
    return {
      pinned: true
    };
  }
};
</script>
