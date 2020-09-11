<template>
  <div class="action-container py-0">
    <div class="content px-3 py-1">
      <div class="data">
        <div class="action">
          <h3 v-if="!!requestType">{{ requestType }} Request</h3>
        </div>
        <div class="extra-info">
          <span class="hardware">
            <v-icon>mdi-laptop</v-icon>
            <p v-if="!!actionData.browser && !!actionData.version">
              {{ actionData.browser }} {{ actionData.version }}
            </p>
            <p v-if="!!actionData.platform && !!actionData.os">
              {{ actionData.platform }}
            </p>
          </span>
          <span class="location">
            <v-icon>mdi-map-marker-outline</v-icon>
            <p v-if="!!actionData.ip">
              {{ actionData.ip }}
            </p>
            <p v-if="!!actionData.geoIp && !!actionData.geoIp.country">
              {{ actionData.geoIp.country }}
            </p>
          </span>
          <span class="time" v-if="!!actionData.timestamp">
            <v-icon>mdi-clock-outline</v-icon>
            <p>{{ actionData.timestamp.slice(0, 16) }} UTC</p>
            <p>{{ actionData.timestamp.slice(16) }}</p>
          </span>
        </div>
      </div>
      <div class="counter-wrapper">
        <v-progress-circular
          :rotate="-90"
          :size="196"
          :width="11"
          :value="value"
          color="primary"
        >
          <p>Time to confirm:</p>
          <p class="countdown" id="timer">0:00</p>
        </v-progress-circular>
      </div>
    </div>

    <div class="btn-group">
      <button type="button" class="btn deny" @click="onDeny">
        <v-icon>mdi-close</v-icon>
        Decline
      </button>
      <button type="button" class="btn approve" @click="onApprove">
        <v-icon>mdi-check</v-icon>
        Approve
      </button>
    </div>

    <input-modal
      :isVisible="showPinModal"
      :inputValue.sync="pinCode"
      :rememberPin="false"
      modalFormId="pinFormModal"
    >
      <template #header>Passcode</template>
      <template #footer>
        <button type="button" class="btn" @click="cancelPin">Cancel</button>
        <button
          type="submit"
          class="btn"
          form="pinFormModal"
          @click="confirmPin"
          @keyup.enter="confirmPin"
        >
          Confirm
        </button>
      </template>
    </input-modal>

    <Alert />
    <Loader />
  </div>
</template>

<script>
import InputModal from 'vue-recheck-authorizer/src/components/modals/InputModal.vue';
import Loader from 'vue-recheck-authorizer/src/components/loader/Loader.vue';
import Alert from 'vue-recheck-authorizer/src/components/alert/Alert.vue';
import chain from 'vue-recheck-authorizer/src/chain';
import router from '../router';

export default {
  name: 'AppAction',

  components: {
    Alert,
    Loader,
    InputModal,
  },

  data() {
    return {
      selectionActionHash: '',
      requestType: '',
      actionData: {},
      actionDate: new Date()
        .toUTCString()
        .split('GMT')[0]
        .trim(),

      showPinModal: false,
      pinCode: '',

      interval: {},
      value: 0,
    };
  },

  mounted() {
    this.$root.$children[0].isActionPage = router.history.current.path === '/action';
    chain.setURLandNetwork(
      localStorage.getItem('apiUrl'),
      process.env.VUE_APP_NETWORK
    );

    this.actionData = router.currentRoute.params && router.currentRoute.params.data
      ? JSON.parse(router.currentRoute.params.data)
      : {};

    if (Object.entries(this.actionData).length !== 0) {
      this.actionData.timestamp = this.actionData.timestamp
        .replace('GMT', '')
        .trim();

      this.actionData.platform = `
        ${this.actionData.platform} ${this.actionData.os}
      `.replace(' Windows', '');

      this.selectionHash = this.actionData.selectionActionHash;
      this.requestType = this.actionData.type;
      this.requestType = `
        ${this.requestType.charAt(0).toUpperCase() + this.requestType.slice(1)}
      `;
    }

    this.startTimer();
  },

  methods: {
    startTimer() {
      const TIME_TO_INCREMENT = 1.111111111111;
      const TIME_LIMIT = 90;
      let timePassed = 0;
      let timeLeft = TIME_LIMIT;

      this.interval = setInterval(() => {
        timePassed += 1;
        this.value += TIME_TO_INCREMENT;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById('timer').innerHTML = this.formatTime(timeLeft);

        if (timeLeft === 0) {
          this.onTimesUp();
        }
      }, 1000);
    },

    formatTime(time) {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    },

    onTimesUp() {
      this.value = 0;
      document.getElementById('timer').innerHTML = '0:00';
      clearInterval(this.interval);

      this.$root.$emit('alertOn', 'Confirmation time expired!', 'red');

      setTimeout(() => {
        router.push('/scan');
      }, 2000);
    },

    onDeny() {
      this.value = 0;
      clearInterval(this.interval);
      document.getElementById('timer').innerHTML = '0:00';

      router.push('/scan');
    },

    onApprove() {
      this.pinCode = '';
      this.showPinModal = true;
    },

    cancelPin() {
      this.showPinModal = false;
    },

    confirmPin() {
      this.showPinModal = false;
      this.$root.$emit('loaderOn');

      chain.doExecSelection(this.pinCode, this.selectionHash, (err) => {
        this.$root.$emit('loaderOff');

        if (!err) {
          this.$root.$emit('overlayOn', 'success');
        } else if (err === 'authError') {
          this.$root.$emit('alertOn', 'Passcode mismatch!', 'red');
        } else {
          this.$root.$emit('overlayOn', 'error');
        }

        if (!err || (err && err !== 'authError')) {
          setTimeout(() => {
            router.push('/scan');
          }, 1810);
        }
      });

      this.pinCode = '';
    },
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style lang="scss">
.modal {
  &-body {
    padding: 14px 22px 14px 22px;
  }

  &-footer {
    padding: 0 20px 14px 20px !important;
  }
}

.action-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content {
    width: inherit;
    height: inherit;

    .data {
      .action {
        text-align: center;
        margin-top: 12px;

        h3 {
          font-size: 22px;
        }

        i {
          font-size: 28px;
          color: #5c5b5b;
        }

        p {
          margin-bottom: 0;
        }
      }

      .extra-info {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin: 24px 0 28px 0;

        span {
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          flex-wrap: wrap;
          width: 50%;

          &:last-of-type {
            margin-top: 18px;
          }

          i {
            font-size: 22px;
            color: #5c5b5b;
            margin-bottom: 6px;
          }

          p {
            font-size: 14px;
            line-height: 1.1;
            margin-bottom: 0;
          }
        }
      }
    }
  }

  .counter-wrapper {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 24px;

    .v-progress-circular {
      text-align: center;

      &__info {
        flex-direction: column;

        p {
          margin-bottom: 0;
        }
      }
    }

    .countdown {
      font-size: 34px;
      line-height: 1.2;
    }
  }

  .btn-group {
    display: flex;

    .btn {
      width: 50%;
      height: 60px;
      outline: 0;
      display: flex;
      align-items: center;
      place-content: center;

      i {
        color: #fff;
        font-size: 32px;
        margin-right: 12px;
      }

      &.deny {
        color: #fff;
        background-color: red;
      }

      &.approve {
        color: #fff;
        background-color: green;
      }
    }
  }
}
</style>
