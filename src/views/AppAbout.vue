<template>
  <v-card flat tile>
    <v-card-text>
      <h2 class="mt-1 mb-5 text-center">About ipOcean</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur,
        possimus aliquam. Ipsum neque alias facere doloribus fuga earum quisquam
        minima saepe sint tenetur vel aspernatur quibusdam, vero, quidem aut
        accusamus.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic amet
        recusandae nemo ipsum explicabo ut minus fugit ullam. Fugit reiciendis,
        veritatis suscipit quibusdam distinctio tempore ut nam quas voluptates
        cupiditate.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
        laudantium, minima consequatur inventore odit, molestias debitis numquam
        minus nihil corrupti pariatur temporibus impedit cupiditate unde eveniet
        aliquam dolorem libero. Quae.
      </p>

      <p class="d-flex justify-space-around my-3">
        <a href="https://ipocean.com/" target="_blank">Contact Us</a>
        <a href="https://ipocean.com/privacy-policy/" target="_blank">
          Privacy Policy
        </a>
      </p>
      <p class="text-caption text-center mt-4 mb-0" style="line-height: 1;">
        Copyright &copy; {{ currentYear }} &mdash; ipOcean GmbH
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AppAbout',

  data() {
    return {
      currentYear: new Date().getFullYear()
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
