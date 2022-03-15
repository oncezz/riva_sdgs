<template>
  <div class="bgGreay q-py-md q-px-xl">
    <div class="row justify-between">
      <div class="q-py-lg q-px-md" style="font-size: 26px" align="left">
        Data availability
      </div>
      <div class="row">
        <div class="row items-center">
          <div class="boxLegend scoreMore90"></div>
          <div class="q-pl-sm q-pr-lg">More than 90%</div>
        </div>
        <div class="row items-center">
          <div class="boxLegend scoreMore75"></div>
          <div class="q-pl-sm q-pr-lg">76%-90%</div>
        </div>
        <div class="row items-center">
          <div class="boxLegend scoreMore49"></div>
          <div class="q-pl-sm q-pr-lg">50%-75%</div>
        </div>
        <div class="row items-center">
          <div class="boxLegend scoreLess"></div>
          <div class="q-pl-sm q-pr-lg">Less than50%</div>
        </div>
      </div>
    </div>
    <!-- table data  -->
    <div class="boxData q-pt-xl">
      <div class="showType">abc</div>
    </div>
    <div class="q-pa-md"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["input", "report", "partner"],
  data() {
    return {
      tableData: [],
      reportCountry: [],
      partnerCountry: [],
    };
  },
  methods: {
    async loadData() {
      //  compareType= group -->> set report = partner
      this.partnerCountry = this.partner;
      if (this.input.compareType == "specific") {
        this.reportCountry = this.report;
      } else {
        this.reportCountry = this.partner;
      }
      console.log(this.input);
      // call API => tableData
      // call API report & partner
      let data = {
        report: this.reportCountry,
        partner: this.partnerCountry,
        dataBase: this.input.dataBase,
        compareType: this.input.compareType,
        disaggregation: this.input.disaggregation,
      };
      let url = this.ri_api + "data_availablity/indicator_table.php";
      let result = await axios.post(url, JSON.stringify(data));
      this.tableData = result.data;
      console.log(this.tableData);
    },
  },
  async mounted() {
    await this.loadData();
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
  border: 1px solid #757575;
}
.showType {
  width: 95%;
  height: 700px;
  margin: auto;
  overflow-y: auto;
}
/////// score
.scoreMore90 {
  border: 1px solid #e5e5e5;
  background: #6b8465;
}
.scoreMore75 {
  border: 1px solid #e5e5e5;
  background: #8ba889;
}
.scoreMore49 {
  border: 1px solid #e5e5e5;
  background: #cf9683;
}
.scoreLess {
  border: 1px solid #e5e5e5;
  background: #cf7956;
}
.noScore {
  border: 1px solid #e5e5e5;
  background: #8f8f8f;
}
.sameCountry {
  background: #a9a9a9;
}
</style>
