<template>
  <v-card flat tile>
    <v-card-text>
      <h2 class="mt-1 mb-5 text-center">About My Recheck</h2>
      <p>
        My ReCheck is a game changer that helps you protect your data, share it
        with ultimate privacy and manage all interactions with the files.
        This is an all-in-one solution for bulletproof information exchange
        and secure data management.
        <br />
        <br />
        With My ReCheck you are in control of your digital identity and only you
        can access your valuable digital content. No one can track you online
        and data tampering, fraud or spam are successfully avoided.
        <br />
        <br />
        Most importantly, you will enjoy verifiable digital proofs
        (ReCheck Certificates) that your data existed, was shared or signed
        exactly at a specific point in time. The certificates will help you in
        case of disputes, fraudulent activities or lawsuits.
      </p>

      <p class="d-flex justify-space-around my-3">
        <a href="https://recheck.io/contact-us/" target="_blank">Contact Us</a>
        <a href="https://recheck.io/privacy-policy-terms-of-use/" target="_blank">
          Terms and Privacy Policy
        </a>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AppAbout',

  data() {
    return {
      tab: null,
      tabs: [
        { id: 1, title: 'About' },
        { id: 2, title: 'FAQ' }
      ]
    };
  },
};
</script>

<style>
.text {
  text-align: left;
}

.componentTitle {
  margin: 2rem 1rem;
}

.tick::before {
  content: "\2713\0020";
}
</style>
