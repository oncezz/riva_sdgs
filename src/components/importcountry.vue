<template>
  <!-- Selection -->
  <div class="row q-py-lg" style="width:320px;margin:auto">
    <div>
      <span>Importing economy</span>
      <q-select
        style="width:320px;"
        @input="selectCountry()"
        dense
        outlined
        :options="countryOptions"
        v-model="importingEconomy"
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
      sourceEconomy: "",
    };
  },
  methods: {
    selectCountry() {
      let countryName = this.countryOptions.filter(
        (x) => x.value == this.importingEconomy
      )[0].label;
      this.$emit("importingEconomy", countryName);
      this.$q.sessionStorage.set("impEcId", this.importingEconomy);
    },
  },
  created() {
    this.getCountryList();
    this.selectCountry();
  },
};
</script>

<style lang="scss" scoped>
</style>