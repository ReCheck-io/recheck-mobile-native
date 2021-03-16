<template>
  <div class="identity-container px-3 pt-7">
    <!-- identity (text/qr code) -->
    <MyIdentity :backupMode="backupMode" :userHasID="pinned" />

    <!-- backup identity -->
    <BackupIdentity :userHasID="pinned" />

    <!-- show identity private key -->
    <ShowIdentityPhrase :backupMode="backupMode" :userHasID="pinned" />

    <!-- reset identity -->
    <ResetIdentity :backupMode="backupMode" :userHasID="pinned" />

    <!-- <recheck-identity
      :mobileBackup="mobileBackup"
      appName="My ReCheck"
      classes="my-styles"
      ref="id"
    /> -->
  </div>
</template>

<script>
import chainClient from 'vue-recheck-authorizer/src/chain/index';
import MyIdentity from './components/my-id.vue';
import ResetIdentity from './components/reset.vue';
import BackupIdentity from './components/backup.vue';
import ShowIdentityPhrase from './components/show-phrase.vue';

export default {
  name: 'AppIdentity',

  components: {
    MyIdentity,
    ResetIdentity,
    BackupIdentity,
    ShowIdentityPhrase,
  },

  data() {
    return {
      pinned: false,
      mobileBackup: true,
      isBackupDone: false,

      showMode: false,
      backupMode: false,
      privateKey: '',
      selectedKeys: [],
      splittedPrivateKey: [],

      showInfoStep: true,
      showPrivateKeyStep: false,
      verifyPrivateKeyStep: false,
    };
  },

  mounted() {
    this.$root.$children[0].isActionPage = this.$router.history.current.path === '/notification';
    this.pinned = chainClient.pinned();

    this.$root.$on('backupMode', (res) => {
      this.pinned = chainClient.pinned();

      this.backupMode = res.backupMode;
      // this.privateKey = res.privateKey;
      // this.splittedPrivateKey = this.privateKey.split(' ').sort();
    });
  },

};
</script>

<style lang="scss">
.my-styles {
  text-align: center;

  &.show-mode > .current-identity {
    display: none;
  }

  .btn {
    padding: 11px 0;

    &-block {
      width: 100%;
    }
  }

  .card {
    max-width: 400px !important;

    &-header {
      padding: 10px 20px;
    }

    &-body {
      padding: 14px 22px 14px 22px;

      p {
        margin-bottom: 0;
      }
    }

    &-footer {
      &:not(:empty) {
        padding: 0 20px 14px 20px;
      }
    }
  }

  .modal {
    &-body {
      padding: 14px 22px 14px 22px;
    }

    &-footer {
      padding: 0 20px 14px 20px;
    }
  }
}

.backup-identity {
  p:nth-of-type(1),
  p:nth-of-type(2) {
    font-size: 17px;
    margin-bottom: 12px;
  }

  .card-body {
    padding-left: 14px;
    padding-right: 14px;
  }

  .privateKey {
    padding: 12px 12px 6px 12px;
    margin-top: 6px;
    margin-bottom: 16px;
    color: #141414;
    background-color: #ffffff;
    box-shadow: 0 3px 6px rgba(20, 20, 20, 0.09);
    border: 1px solid #dad2d2d0;
    border-radius: 4px;

    .block {
      font-family: monospace;
      font-size: 15px;
      color: #141414;
    }

    .buttons {
      display: flex;
      align-items: center;
      justify-content: space-around;

      button {
        font-family: "Roboto", sans-serif;
        font-size: 14px;
        font-weight: 600;
        margin-top: 12px;
        text-transform: uppercase;

        i.v-icon {
          vertical-align: top;
        }
      }
    }
  }

  .selectable-keys,
  .selected-keys {
    padding: 8px;
    margin-top: 6px;
    margin-bottom: 22px;
    color: #141414;
    background-color: #ffffff;
    box-shadow: 0 3px 6px rgba(20, 20, 20, 0.09);
    border: 1px solid #dad2d2d0;
    border-radius: 4px;
    min-height: 50px;
    max-height: 200px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    span {
      margin: 0;
    }
  }
}

.identity-container {
  .section {
    margin-bottom: 16px;
  }
  .no-uppercase {
    text-transform: none;
  }
  .text-subtitle-1 {
    color: #141414;
    line-height: 1.22;
  }
  p.text-h6 {
    color: #141414;
  }
}
</style>
