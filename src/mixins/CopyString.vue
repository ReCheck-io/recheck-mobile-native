<script>
export default {
  methods: {
    copyString(str) {
      const aux = document.createElement('textarea');

      aux.value = str;

      document.body.appendChild(aux);

      aux.select();

      const isSuccess = document.execCommand('copy');

      if (isSuccess) {
        this.$root.$emit('alertOn', 'Successfully copied!', 'green');
      }

      document.body.removeChild(aux);
    },
  },
};
</script>
