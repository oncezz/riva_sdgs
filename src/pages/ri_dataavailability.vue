<template>
  <div class="container shadow-2 bg-white" style="color: #757575">
    <ri-header></ri-header>
    <div
      class="q-pt-lg"
      style="font-size: 32px; font-weight: 600"
      align="center"
    >
      Data availability
    </div>

    <input-data
      :dataSend="dataGet"
      @start-btn="startBtn"
      @reset-start-btn="resetStartBtn"
    ></input-data>
    <div v-if="showTable">
      <div v-if="input.disaggregation == 'pair'">
        <pair-table
          :input="input"
          :report="report"
          :partner="partner"
        ></pair-table>
      </div>
      <div v-else-if="input.disaggregation == 'dimension'">
        <dimension-table
          :input="input"
          :report="report"
          :partner="partner"
        ></dimension-table>
      </div>
      <div v-else>
        <indicator-table
          :input="input"
          :report="report"
          :partner="partner"
        ></indicator-table>
      </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri/main/ri_header";
import myFooter from "../components/footer";

import inputData from "../components/ri/data_availablity/input_data.vue";
import dataTable from "../components/ri/data_availablity/data_table.vue";
import pairTable from "../components/ri/data_availablity/pair_tabledata.vue";
import dimensionTable from "../components/ri/data_availablity/dimension_tabledata.vue";
import indicatorTable from "../components/ri/data_availablity/indicator_tabledata.vue";
export default {
  components: {
    riHeader,
    myFooter,
    inputData,
    dataTable,
    pairTable,
    dimensionTable,
    indicatorTable,
  },
  data() {
    return {
      showTable: false,
      input: {},
      report: [],
      partner: [],
      dataGet: [],
    };
  },
  methods: {
    startBtn(inputSend) {
      this.input = inputSend.input;
      this.report = inputSend.report;
      this.partner = inputSend.partner;
      this.showTable = true;
    },
    resetStartBtn() {
      this.showTable = false;
    },
  },
  mounted() {
    this.dataGet = [];
    let keyLocal = [];
    keyLocal = this.$q.localStorage.getItem("dataAvail");
    let keyId = this.$route.params.key ? this.$route.params.key : null;
    if (keyLocal != null) {
      if (keyId == keyLocal.key) {
        this.dataGet = this.$q.localStorage.getItem("dataAvail");
      }
    }
    // if (keyId == keyLocal.key && keyLocal != null) {
    //   this.dataGet = this.$q.localStorage.getItem("dataAvail");
    // }
  },
};
</script>

<style lang="scss" scoped>
.footer-bg {
  background-image: url("../../public/footer.jpg");
  background-size: inherit;
  background-position: bottom;
}
</style>
