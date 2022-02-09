<template>
  <div class="bgGreay q-py-md q-px-xl">
    <div class="row justify-between">
      <div class="row item-center">
        <div class="font-18 fontW700 q-py-md col-23" style="width: 150px">
          Table layout
        </div>

        <q-radio
          style="width: 150px"
          v-model="layoutTable"
          val="row"
          color="secondary"
          label="Rows"
        />

        <q-radio
          v-model="layoutTable"
          val="col"
          color="secondary"
          label="Columns"
        />
      </div>
      <div class="row">
        <div class="row items-center">
          <div class="boxLegend" style="background: #2d9687"></div>
          <div class="q-pl-sm q-pr-lg">More than 90%</div>
        </div>
        <div class="row items-center">
          <div class="boxLegend" style="background: #f99704"></div>
          <div class="q-pl-sm q-pr-lg">76%-90%</div>
        </div>
        <div class="row items-center">
          <div class="boxLegend" style="background: #c55a11"></div>
          <div class="q-pl-sm q-pr-lg">50%-75%</div>
        </div>
        <div class="row items-center">
          <div class="boxLegend" style="background: #c00000"></div>
          <div class="q-pl-sm q-pr-lg">Less than50%</div>
        </div>
      </div>
    </div>
    <div class="boxData">
      <div class="q-py-lg" style="font-size: 26px" align="center">
        Data availability
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      layoutTable: "row",
    };
  },
};
</script>

<style lang="scss" scoped>
.bgGreay {
  width: 100%;
  background: #ededed;
}
.fontW700 {
  font-weight: 700;
}
.boxLegend {
  width: 45px;
  height: 25px;
}
.boxData {
  margin: auto;
  width: 95%;
  border: 1px solid #757575;
}
</style>
