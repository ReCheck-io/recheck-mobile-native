<template>
 <div class="guides" v-show="isVisible">
    <img class="qr-scan-guides" src="../images/scan.png" />
    <div class="info-card">
      <img src="../images/scan-hint.svg" alt="svg" />
      <p>
        Open
        <a href="https://my.recheck.io" target="_blank" rel="noopener noreferrer">
          <b>https://my.recheck.io</b>
        </a>
        on your computer and scan the QR Code
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ScannerHint',

  props: ['isVisible']
};
</script>
