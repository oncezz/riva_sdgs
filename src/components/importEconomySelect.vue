<template>
  <!-- Selection -->
  <div class="row q-py-xl" style="width:50%;min-width:320px;margin:auto">
    <div class="col-6 q-px-md">
      <span>Importing economy</span>
      <q-select
        @input="selectData()"
        dense
        outlined
        :options="countryOptions"
        v-model="importingEconomy"
        emit-value
        map-options
      ></q-select>
    </div>

    <div class="col-6 q-px-md">
      <span>Sector</span>
      <q-select
        @input="selectData()"
        dense
        outlined
        :options="sectorOptions"
        v-model="sectorSelected"
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
      sectorOptions: [],
      sectorSelected: "All",
    };
  },
  methods: {
    // Function Test
    selectData() {
      let sectorData = this.sectorOptions.filter(
        (x) => x.value == this.sectorSelected
      )[0];

      let countryData = this.countryOptions.filter(
        (x) => x.value == this.importingEconomy
      )[0];

      this.$q.sessionStorage.set("secId", this.sectorSelected);
      this.$q.sessionStorage.set("impEcId", this.importingEconomy);

      let newData = {
        sectorData: sectorData,
        countryData: countryData,
      };

      this.$emit("sectorSelected", newData);
    },
    // --------------------------------------------

    async loadData() {
      await this.getCountryList();
      await this.getSectorList();

      this.selectData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
</style>