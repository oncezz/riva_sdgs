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
      <div class="showType">
        <div class="row no-wrap" align="center">
          <div class="diagBox" style="min-width: 140px; height: 90px">
            <div class="fontTable q-px-md q-py-sm" align="right">Partner</div>
            <div class="fontTable q-px-md q-py-sm" align="left">Reporter</div>
          </div>
          <div class="row no-wrap">
            <div
              class="headPartnerTable"
              v-for="(partnerCountry, j) in partnerCountry"
              :key="j"
            >
              {{ partnerCountry.iso }}
              <q-tooltip>{{ partnerCountry.label }}</q-tooltip>
            </div>
          </div>
        </div>
        <div
          class="row no-wrap"
          v-for="(reportCountry, i) in tableData"
          :key="i"
        >
          <div class="headReportTable">
            <div class="absolute-center">
              {{ reportCountry.iso }}
            </div>
            <q-tooltip>{{ reportCountry.label }}</q-tooltip>
          </div>
          <div class="">
            <div
              class="row no-wrap"
              v-for="(dimensionData, m) in reportCountry.partner[0].dimension"
              :key="m"
            >
              <div class="row no-wrap">
                <div class="subTable" style="height: 30px" align="center">
                  <div class="">Dim.{{ m + 1 }}</div>
                  <q-tooltip>{{ dimensionData.label }}</q-tooltip>
                </div>
              </div>
            </div>
            <div class="subTable" style="height: 30px" align="center">Avg.</div>
          </div>
          <div v-for="(partnerCountry, j) in reportCountry.partner" :key="j">
            <div
              v-for="(dimensionData, m) in partnerCountry.dimension"
              :key="m"
            >
              <div class="" align="center">
                <div class="scoreBox scoreMore90" v-if="dimensionData.avg > 90">
                  {{ dimensionData.avg.toFixed(2) }}%
                </div>
                <div
                  class="scoreBox scoreMore75"
                  v-else-if="dimensionData.avg > 75"
                >
                  {{ dimensionData.avg.toFixed(2) }}%
                </div>
                <div
                  class="scoreBox scoreMore49"
                  v-else-if="dimensionData.avg > 49"
                >
                  {{ dimensionData.avg.toFixed(2) }}%
                </div>
                <div
                  class="scoreBox scoreLess"
                  v-else-if="dimensionData.avg > 0"
                >
                  {{ dimensionData.avg.toFixed(2) }}%
                </div>
                <div
                  class="scoreBox noScore"
                  v-else-if="dimensionData.avg == 0"
                >
                  &nbsp;
                </div>
                <div class="scoreBox sameCountry" v-else>&nbsp;</div>

                <!-- <q-tooltip
                    >Reporter : {{ reportCountry.label }}<br />
                    Partner :
                    {{ partnerCountry.label }}<br />
                    Dimension : {{ dimensionData.label }}<br />
                    indicator : {{ indicatorData.label }}
                  </q-tooltip> -->
              </div>
            </div>
            <div class="" align="center">
              <div class="scoreBox scoreMore90" v-if="partnerCountry.avg > 90">
                {{ partnerCountry.avg.toFixed(2) }}%
              </div>
              <div
                class="scoreBox scoreMore75"
                v-else-if="partnerCountry.avg > 75"
              >
                {{ partnerCountry.avg.toFixed(2) }}%
              </div>
              <div
                class="scoreBox scoreMore49"
                v-else-if="partnerCountry.avg > 49"
              >
                {{ partnerCountry.avg.toFixed(2) }}%
              </div>
              <div
                class="scoreBox scoreLess"
                v-else-if="partnerCountry.avg > 0"
              >
                {{ partnerCountry.avg.toFixed(2) }}%
              </div>
              <div class="scoreBox noScore" v-else-if="partnerCountry.avg == 0">
                &nbsp;
              </div>
              <div class="scoreBox sameCountry" v-else>&nbsp;</div>

              <!-- <q-tooltip
                    >Reporter : {{ reportCountry.label }}<br />
                    Partner :
                    {{ partnerCountry.label }}<br />
                    Dimension : {{ dimensionData.label }}<br />
                    indicator : {{ indicatorData.label }}
                  </q-tooltip> -->
            </div>
          </div>
        </div>
      </div>
      <div class="q-pa-md"></div>
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
      this.loadingShow();
      //  compareType= group -->> set report = partner
      this.partnerCountry = this.partner;
      if (this.input.compareType == "specific") {
        this.reportCountry = this.report;
      } else {
        this.reportCountry = this.partner;
      }
      // console.log(this.input);
      // call API => tableData
      // call API report & partner
      let data = {
        report: this.reportCountry,
        partner: this.partnerCountry,
        dataBase: this.input.dataBase,
        compareType: this.input.compareType,
        disaggregation: this.input.disaggregation,
        integration: this.input.integration,
      };
      let url = this.ri_api + "data_availablity/indicator_table.php";
      let result = await axios.post(url, JSON.stringify(data));
      this.tableData = result.data;
      this.loadingHide();
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
.scoreBox {
  height: 30px;
  line-height: 30px;
  width: 80px;
  background: #a9a9a9;
  font-size: 16px;
  color: white;
}
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
//////
.fontTable {
  font-size: 18px;
  color: white;
}
.headPartnerTable {
  min-width: 80px;
  height: 90px;
  line-height: 90px;
  font-size: 18px;
  color: white;
  background: #757575;
  border: 1px solid white;
}
.headReportTable {
  min-width: 70px;

  font-size: 18px;
  color: white;
  background: #757575;
  border: 1px solid white;
  position: relative;
}
.subTable {
  width: 70px;
  color: #757575;
  background-color: #d2d1d1;
  border: 1px solid white;
  font-size: 18px;
  position: relative;
}

//// box line
.diagBox {
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M1 0 L0 1 L99 100 L100 99' fill='white' /></svg>");
  background-color: #757575;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%, auto;
  border: 1px solid white;
}
</style>
