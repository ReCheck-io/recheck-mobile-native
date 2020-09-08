<template>
  <div class="action-container py-0">
    <div class="content px-3 py-1">
      <div class="data">
        <div class="action">
          <h3 v-if="!!requestType">{{ requestType }}</h3>
          <p v-if="dataName"><b>Data Name:</b> {{ dataName }}</p>
          <p v-if="dataHash"><b>Data ID:</b> {{ dataHash }}</p>
          <p v-if="recipientInfo"><b>Recipient:</b> {{ recipientInfo }}</p>
        </div>
        <div class="extra-info">
          <span class="hardware">
            <v-icon>mdi-laptop</v-icon>
            <p v-if="actionData.browser && actionData.version">
              {{ actionData.browser }} {{ actionData.version }}
            </p>
            <p v-if="actionData.platform && actionData.os">
              {{ actionData.platform }} {{ actionData.os }}
            </p>
          </span>
          <span class="location">
            <v-icon>mdi-map-marker-outline</v-icon>
            <p v-if="actionData.ip">
              {{ actionData.ip }}
            </p>
            <p v-if="actionData.ip">
              Ruse, Bulgaria
            </p>
          </span>
          <span class="time">
            <v-icon>mdi-clock-outline</v-icon>
            <p>{{ new Date().toUTCString().split("GMT")[0].slice(0, 16) }}</p>
            <p>{{ new Date().toUTCString().split("GMT")[0].slice(16) }}</p>
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
        Deny
      </button>
      <button type="button" class="btn approve" @click="onApprove">
        <v-icon>mdi-check</v-icon>
        Approve
      </button>
    </div>

    <Alert />
  </div>
</template>

<script>
import Alert from 'vue-recheck-authorizer/src/components/alert/Alert.vue'
import chainClient from 'vue-recheck-authorizer/src/chain'
import { truncate } from '../utils'
import router from '../router';

export default {
  name: 'AppAction',

  components: {
    Alert
  },

  data() {
    return {
      requestType: 'Share Request',
      actionData: null,
      dataName: '',
      dataHash: '',
      recipientInfo: '',

      interval: {},
      value: 0,
    };
  },

  mounted() {
    this.$root.$children[0].isActionPage = router.history.current.path === '/action';

    const notificationParams = router.currentRoute.params
    this.actionData = JSON.parse(notificationParams.data);
    console.log(JSON.parse(notificationParams.data))

    this.startTimer();
  },

  methods: {
    startTimer() {
      const TIME_LIMIT = 60;
      let timePassed = 0;
      let timeLeft = TIME_LIMIT;
      let timerInterval = null;

      this.interval = setInterval(() => {
        timePassed += 1;
        this.value += 1.69;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById('timer').innerHTML = this.formatTime(
          timeLeft
        );

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
      }, 2500);
    },

    onDeny() {
      this.value = 0;
      document.getElementById('timer').innerHTML = '0:00';
      clearInterval(this.interval);

      router.push('/scan');
    },

    onApprove() {
      // chainClient.doExecSelection();
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style lang="scss">
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
