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
      <div class="q-py-lg q-px-md" style="font-size: 26px" align="left">
        Data availability
      </div>
      <div class="" align="center">
        <div class="row" align="center">
          <div class="headTable" style="width: 200px">Country/Dim.</div>
          <div
            class="headTable"
            v-for="(item, index) in partnerCountry"
            :key="index"
          >
            {{ item.iso }}
          </div>
          <div class="headTable">Row Avg.</div>
        </div>
        <div align="center" v-for="(counterReport, i) in tableData" :key="i">
          <div
            class="row items-center"
            v-for="(item, j) in tableData[i].data"
            :key="j"
          >
            <!-- col 1 -->
            <div
              class="headRow"
              :class="{ headRow2: i % 2 == 1 }"
              v-if="j == 0"
            >
              {{ counterReport.label }}
            </div>
            <div class="headRow" :class="{ headRow2: i % 2 == 1 }" v-else>
              {{ j }}
            </div>
            <!-- col partner  -->
            <div
              class="scoreBox"
              :class="{ borderScore: items >= 0 }"
              v-for="(items, k) in item"
              :key="k"
            >
              <div class="scoreMore90" v-if="items > 90">{{ items }}%</div>
              <div class="scoreMore75" v-else-if="items > 75">{{ items }}%</div>
              <div class="scoreMore49" v-else-if="items > 49">{{ items }}%</div>
              <div class="scoreLess" v-else-if="items > 0">{{ items }}%</div>
              <div class="noScore" v-else-if="items == 0">&nbsp;</div>
              <div class="sameCountry" v-else>&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["input", "report", "partner"],
  data() {
    return {
      layoutTable: "col",
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
      // call API => tableData

      // call API report & partner
      let data = {
        report: this.reportCountry,
        partner: this.partnerCountry,
        dataBase: this.input.dataBase,
        compareType: this.input.compareType,
        disaggregation: this.input.disaggregation,
      };
      let url = this.ri_api + "data_availablity/table_data.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.tableData = res.data;

      console.log(this.tableData);
    },
    startBtn() {
      this.randDataTab();
    },
  },
  mounted() {
    this.loadData();
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
  overflow-x: auto;
  overflow-y: auto;
}

///////// table
.setHeight {
  height: 45px;
  line-height: 45px;
}
.headTable {
  border: 1px solid #ffffff;
  font-size: 18px;
  background: #757575;
  color: #ffffff;
  min-width: 100px;
}
/////  score
.headRow {
  width: 200px;
  background: #d2d1d1;
  color: #757575;
  height: 26px;
}
.headRow2 {
  background: #e5e5e5;
}
.scoreBox {
  border: 1px solid #a9a9a9;
  min-width: 100px;
  color: white;
  font-size: 16px;
  height: 100%;
}
///////
.scoreMore90 {
  background: #2d9687;
}
.scoreMore75 {
  background: #f99704;
}
.scoreMore49 {
  background: #c55a11;
}
.scoreLess {
  background: #c00000;
}
.noScore {
  background: #696868;
}
.sameCountry {
  background: #a9a9a9;
}
</style>
