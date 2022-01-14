<template>
  <div style="background-color:#020B3B;height:100vh">
    <div class="absolute-center row items-center" style="width:90%;margin:auto">
      <div
        style="width:100%;max-width:700px;border:2px solid white;margin:auto"
        class="q-pa-md row items-center justify-center"
      >
        <div class="col" style="font-size:18px">
          <p class="text-white">
            This website is designed for desktop only.
            It can be viewed from mobile devices in the following ways,
          </p>
          <p
            class="text-white"
          >On Google Chrome: click on the ‘…’ option in the bottom right corner of the screen and select the ‘Request Desktop Site’ option from the list of options.</p>
          <p
            class="text-white"
          >On Safari: click on the ‘AA’ option in the top left corner of the screen and select the ‘Request Desktop Website’ option from the list of options.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$q.platform.is.desktop) {
      this.$router.go(-1);
    }
  },
};
</script>

<style lang="scss" scoped></style>
