<template>
  <v-card flat tile>
    <v-card-text>
      <h2 class="mt-1 mb-5 text-center">About My ReCheck</h2>
      <p>
        <b>Freedom and safety in the digital world</b>
      </p>
      <p>
        My ReCheck helps you protect your data, share it with ultimate privacy
        and see all interactions with the files. This is an all-in-one solution
        for bulletproof information exchange and electronic signing.
      </p>
      <p>
        With My ReCheck you are in control of your digital identity and only you
        can access your valuable digital content. No one can track you online
        and data tampering or fraud are successfully avoided.
      </p>
      <p>
        The service creates verifiable digital proofs (ReCheck certificates)
        that your data existed, was shared or signed exactly at a specific point
        in time. The certificates will help you in case of disputes or lawsuits.
      </p>
      <p>
        Start by opening
        <a href="https://my.recheck.io">https://my.recheck.io</a> on your
        computer and use the mobile app to scan the QR and authenticate.
      </p>

      <p class="d-flex justify-space-around my-3">
        <a href="http://recheck.io/faq/" target="_blank">FAQ</a>
        <a href="https://recheck.io/contact-us/" target="_blank">Contact Us</a>
        <a
          href="https://recheck.io/privacy-policy-terms-of-use/"
          target="_blank"
        >
          Terms and Privacy Policy
        </a>
      </p>
      <p class="text-caption text-center mt-4 mb-0" style="line-height: 1;">
        Copyright &copy; 2016 - {{ currentYear }} &mdash; ReCheck B.V.
      </p>
      <p class="text-caption text-center mt-2 mb-0" style="line-height: 1;">
        Version {{ pkgVersion }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AppAbout',

  data() {
    return {
      pkgVersion: '0.0.0',
      currentYear: new Date().getFullYear(),
    };
  },

  mounted() {
    this.$root.$children[0].isActionPage = this.$route.path === '/action';

    window.cordova.getAppVersion.getVersionNumber().then((version) => {
      this.pkgVersion = version;
    });
  }
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
