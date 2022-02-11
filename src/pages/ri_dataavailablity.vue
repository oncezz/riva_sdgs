<template>
  <div class="container shadow-2 bg-white" style="color: #757575">
    <ri-header></ri-header>
    <div
      class="q-pt-lg"
      style="font-size: 32px; font-weight: 600"
      align="center"
    >
      Data avaliability
    </div>
    <input-data
      @start-btn="startBtn"
      @reset-start-btn="resetStartBtn"
    ></input-data>
    <div v-if="showTable">
      <data-table
        :input="input"
        :report="report"
        :partner="partner"
      ></data-table>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri_header";
import myFooter from "../components/footer";

import inputData from "../components/ri/data_availablity/input_data.vue";
import dataTable from "../components/ri/data_availablity/data_table.vue";
export default {
  components: {
    riHeader,
    myFooter,
    inputData,
    dataTable,
  },
  data() {
    return {
      showTable: false,
      input: {},
      report: [],
      partner: [],
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
};
</script>

<style lang="scss" scoped>
.footer-bg {
  background-image: url("../../public/footer.jpg");
  background-size: inherit;
  background-position: bottom;
}
</style>
