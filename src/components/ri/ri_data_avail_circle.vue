<template>
  <div class="q-px-xl">
    <br />
    <div class="font-16"><b>Data availability</b></div>
    <div>
      Based on your selection, this group’s integration will be based on
    </div>
    <br />
    <div class="q-px-xl" align="center">
      <div class="notShowCircular" v-if="type < 2">
        <div style="height: 40%"></div>
        <div class="" align="center" style="width: 80%">
          (Select your desired group of economics to check data availablity)
        </div>
      </div>
      <div class="showCircular" v-else>
        <q-circular-progress
          show-value
          font-size="36px"
          :value="score"
          size="200px"
          :thickness="0.36"
          color="orange"
          track-color="grey-5"
        >
          {{ score }}%
        </q-circular-progress>
      </div>
    </div>
    <br />
    <div align="center">of all possible reporter-partner pairs.</div>
  </div>
</template>

<script>
export default {
  props: ["score", "type"],
};
</script>

<style lang="scss" scoped>
.showCircular {
  margin: auto;
  height: 240px;
  line-height: 240px;
}
.notShowCircular {
  margin: auto;

  height: 240px;
  border: 1px dashed #cbcbcb;
}
</style>
