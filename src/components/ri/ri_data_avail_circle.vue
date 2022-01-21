<template>
  <div class=" q-pa-md">
    <br />
    <div class="font-16"><b>Data availability</b></div>
    <div>
      Based on your selection, this group’s integration will be based on
    </div>
    <br />
    <div class=" q-pr-xl">
      <div class="notShowCircular" v-if="type < 2">
        <div class="" align="center">
          (Select your desired group of economics to check data availablity)
        </div>
      </div>
      <div class="showCircular" v-else align="center">
        <q-circular-progress
          show-value
          font-size="36px"
          :value="score"
          size="240px"
          :thickness="0.36"
          color="teal"
          track-color="grey-5"
        >
          {{ score }}%
        </q-circular-progress>
      </div>
    </div>
    <br />
    <div align="center">
      of all possible reporter-partner pairs.
    </div>
  </div>
</template>

<script>
export default {
  props: ["score", "type"]
};
</script>

<style lang="scss" scoped>
.showCircular {
  height: 280px;
  line-height: 280px;
}
.notShowCircular {
  height: 280px;
  line-height: 280px;
  background: #e8e4e4;
}
</style>
