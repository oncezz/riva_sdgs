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

        <table
          cellspacing="0"
          cellpadding="0"
          style="border-collapse: collapse; border-spacing: 0; border: none"
        >
          <tr v-for="(data, index) in tableData" :key="index">
            <td :rowspan="dimTotal" v-if="index % 7 == 0">
              <div class="reportDiv">
                {{ data[0] }}
                <q-tooltip>{{ reportCountry[index / 7].label }}</q-tooltip>
              </div>
            </td>
            <td>
              <div class="subTable">
                dim {{ data[1] }}
                <q-tooltip>{{ dimList[data[1] - 1].label }}</q-tooltip>
              </div>
            </td>
            <td
              class="scoreBox"
              v-for="(score, indexscore) in data"
              v-if="indexscore >= 2"
            >
              <div class="scoreBox scoreMore90" v-if="score > 90">
                {{ score.toFixed(2) }}%
              </div>
              <div class="scoreBox scoreMore75" v-else-if="score > 75">
                {{ score.toFixed(2) }}%
              </div>
              <div class="scoreBox scoreMore49" v-else-if="score > 49">
                {{ score.toFixed(2) }}%
              </div>
              <div class="scoreBox scoreLess" v-else-if="score > 0">
                {{ score.toFixed(2) }}%
              </div>
              <div class="scoreBox noScore" v-else-if="score == 'NA'">
                &nbsp;
              </div>
              <div class="scoreBox noScore" v-else-if="score == '-'">-</div>
            </td>
          </tr>
        </table>
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
      dimList: [],
    };
  },
  methods: {
    async loadData() {
      this.loadingShow();
      this.tableData = [];
      //  compareType= group -->> set report = partner
      this.partnerCountry = this.partner;
      this.reportCountry = this.report;

      // console.log(this.input);
      // call API => tableData
      // call API report & partner
      let data = {
        report: this.reportCountry.map((x) => x.iso),
        partner: this.partnerCountry.map((x) => x.iso),
        dataBase: this.input.dataBase,
        compareType: this.input.compareType,
        integration: this.input.integration,
      };
      let url = this.ri_api + "data_availablity/dimension_table.php";
      let result = await axios.post(url, JSON.stringify(data));

      let url2 = this.ri_api + "data_availablity/indicator_list.php";
      let result2 = await axios.post(url2, JSON.stringify(data));
      // console.log(result2.data);
      this.dimList = result2.data;

      this.reportCountry.forEach((report) => {
        for (let dimCount = 1; dimCount <= this.dimTotal; dimCount++) {
          let row = [];

          row.push(report.iso);
          row.push(dimCount);
          this.partnerCountry.forEach((partner) => {
            let data = result.data.filter(
              (x) =>
                x.report == report.iso &&
                x.partner == partner.iso &&
                Number(x.dim) == dimCount
            );
            if (report == partner) {
              row.push("NA");
            } else if (data.length == 0) {
              row.push("-");
            } else {
              row.push(Number(data[0].coverage) * 100);
            }
          });
          this.tableData.push(row);
        }
      });
      // console.log(this.tableData);

      // this.tableData = result.data;
      this.loadingHide();
    },
  },
  async mounted() {
    await this.loadData();
  },
};
</script>

<style lang="scss" scoped>
tr,
td {
  border: none !important;
}
.reportDiv {
  min-width: 70px;
  width: 70px;
  height: 210px;
  font-size: 18px;
  line-height: 210px;
  text-align: center;
  color: white;
  background: #757575;
  border: 1px solid white;
}
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
  overflow: auto;
}
/////// score
.scoreBox {
  min-width: 80px;
  text-align: center;
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
  width: 70px;
  font-size: 18px;
  color: white;
  background: #757575;
  border: 1px solid white;
  position: relative;
}
.subTable {
  width: 70px;
  min-width: 70px;
  color: #757575;
  background-color: #d2d1d1;
  border: 1px solid white;
  font-size: 18px;
  text-align: center;
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
