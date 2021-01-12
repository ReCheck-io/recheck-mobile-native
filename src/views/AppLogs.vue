<template>
  <div class="logs-container py-0">
    <div class="logs-content">
      <pre>{{logData !== '' ? logData : ''}}</pre>
    </div>
  </div>
</template>

<script>
import chain from 'vue-recheck-authorizer/src/chain/index'

export default {
  name: 'AppLogs',

  data() {
    return {
      logData: ''
    }
  },

  mounted() {
    if (chain.pinned) {
      let logs = chain.getChainLog();

      if (!logs) {
        this.logData = 'Not found any logs!';
        return;
      }
      let newlog;
      this.logData = logs;
      if (this.logData) newlog = JSON.parse(this.logData);
      newlog.forEach((_) => _.log = _.log.flat(Infinity));
      if (newlog) this.logData = newlog;
    }
  },
};
</script>

<style lang="scss">
.logs-container .logs-content {
  display: flex;
  /* padding: 12px;
  margin-top: 12px; */

  p {
    word-break: break-all;
  }

  pre {
    max-width: 200px;
    word-break: break-all;
  }
}
</style>
