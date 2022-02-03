<template>
  <div class="q-py-md" align="center">
    <div class="font-36">Select desired level of disaggregation</div>
    <div class="row justify-center" v-if="disaggregation == 'country'">
      <q-btn class="selectedBtn" no-caps>
        <q-icon color="" left size="40px" class="fas fa-globe" />
        <div class="font-24">By country</div>
      </q-btn>
      <div style="width: 5px"></div>
      <q-btn class="unSelectedBtn" no-caps @click="selectedDimension()">
        <q-icon left size="40px" class="fas fa-chart-pie" />
        <div class="font-24">By dimension</div>
      </q-btn>
    </div>
    <div class="row justify-center" v-else>
      <q-btn class="unSelectedBtn" no-caps @click="selectedCountry()">
        <q-icon color="" left size="40px" class="fas fa-globe" />
        <div class="font-24">By country</div>
      </q-btn>
      <div style="width: 5px"></div>
      <q-btn class="selectedBtn" no-caps>
        <q-icon left size="40px" class="fas fa-chart-pie" />
        <div class="font-24">By dimension</div>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["input", "disaggregation"],
  data() {
    return {
      selected: "country",
    };
  },
  methods: {
    selectedCountry() {
      this.selected = "country";
      this.$emit("change-disaggregation", "country");
    },
    selectedDimension() {
      this.selected = "dimension";
      this.$emit("change-disaggregation", "dimension");
    },
  },
  mounted() {
    this.selected = this.input.disaggregation;
  },
};
</script>

<style lang="scss" scoped>
.selectedBtn {
  color: white;
  font-weight: 400;
  width: 335px;
  height: 65px;
  background: #2d9687;
}
.unSelectedBtn {
  width: 335px;
  height: 65px;
  background: white;
  border: 2px solid #2d9687;
  color: #2d9687;
}
</style>
