<template>
  <!-- Selection -->
  <div class="row q-py-xl" style="width:50%;min-width:320px;margin:auto">
    <div class="col-6 q-px-md">
      <span>Importing economy</span>
      <q-select
        @input="selectCountry()"
        dense
        outlined
        :options="countryOptions"
        v-model="importingEconomy"
        emit-value
        map-options
      ></q-select>
    </div>

    <div class="col-6 q-px-md">
      <span>Source economy</span>
      <q-select
        @input="selectSource()"
        dense
        outlined
        :options="countryOptions"
        v-model="sourceEconomy"
        emit-value
        map-options
      ></q-select>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      countryOptions: [],
      importingEconomy: "",
      sourceEconomy: this.$q.sessionStorage.has("sourcingEconomy")
        ? this.$q.sessionStorage.getItem("sourcingEconomy")
        : "",
    };
  },
  methods: {
    selectCountry() {
      let countryName = this.countryOptions.filter(
        (x) => x.value == this.importingEconomy
      )[0].label;

      this.$q.sessionStorage.set("impEcId", this.importingEconomy);
      this.$emit("importingEconomy", countryName);
    },
    selectSource() {
      let sourceEconomy;

      sourceEconomy = this.countryOptions.filter(
        (x) => x.value == this.sourceEconomy
      )[0].label;

      this.$q.sessionStorage.set("sourcingEconomy", this.sourceEconomy);
      this.$emit("sourcingEconomy", sourceEconomy);
    },
  },
  mounted() {
    this.getCountryList();
    this.selectCountry();
    this.selectSource();
    // this.getSectorList();
  },
};
</script>

<style lang="scss" scoped>
</style>