<template>
  <v-card flat tile>
    <v-card-text>
      <h2 class="mt-1 mb-5 text-center">About ipOcean</h2>
      <p>
        ipOcean takes information exchange and innovation to a new, outstanding
        level: Working together, collaboration and sharing information in
        confidence. This trust platform is a simple, fast and secure base for
        collaboration, lowers friction costs and provides quick and trusty
        exchange of sensitive information needed for quick innovation &amp;
        action.
      </p>
      <p>
        Users can <br />
        <b>a)</b> secure ownership on their data as e.g. know-how, ideas,
        inventions, intellectual property or sensitive information as well as
        their challenges / inquiries for these type of information and <br />
        <b>b)</b> pass it on to the right partners in a controlled manner so
        that they can work together quickly, exchange know-how or advance joint
        projects. The optional virtual legal process in the background ensures
        confidentiality and trust.
      </p>
      <p>
        Users can create on demand P2P networks to stay in their trusted
        environment and open up to a broader community of experts when needed by
        leveraging existing social networks. Users have full control over their
        data and the exchange process. Businesses, academia, associations,
        research labs, clinics, diagnostic labs, start ups, investors, etc. can
        join forces to speed up innovation and action by exchanging their
        sensitive information fast, easy and most importantly trustworthy.
      </p>

      <p class="d-flex justify-space-around my-3">
        <a href="https://ipocean.com/" target="_blank">Contact Us</a>
        <a href="https://ipocean.com/privacy-policy/" target="_blank">
          Privacy Policy
        </a>
      </p>
      <p class="text-caption text-center mt-4 mb-0" style="line-height: 1;">
        Copyright &copy; {{ currentYear }} &mdash; ipOcean Global GmbH
      </p>
      <p class="text-caption text-center mt-2 mb-0" style="line-height: 1;">
        Version {{ pkgVersion }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import pkg from '../../package.json'

export default {
  name: 'AppAbout',

  data() {
    return {
      pkgVersion: pkg.version,
      currentYear: new Date().getFullYear(),
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
