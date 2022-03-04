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
    <div class="boxData">
      <div class="q-py-lg q-px-md" style="font-size: 26px" align="left">
        Data availability
      </div>
      <!-- table data Type col-->
      <div class="showType" v-show="layoutTable == 'col'">
        <div class="row no-wrap" align="center">
          <div class="headTable" style="min-width: 300px">Country/Dim.</div>
          <div
            class="headTable"
            v-for="(item, index) in partnerCountry"
            :key="index"
          >
            {{ item.iso }}
          </div>
          <div class="headTable">Row Avg.</div>
        </div>
        <!-- end head table  -->
        <div align="center" v-for="(counterReport, i) in tableData" :key="i">
          <div
            class="row no-wrap items-center"
            v-for="(item, j) in tableData[i].data"
            :key="j"
          >
            <div
              class="headRow"
              :class="{
                headRow2: i % 2 == 1,
              }"
              v-if="j == 0"
            >
              {{ counterReport.label }}
            </div>
            <div class="headRow" :class="{ headRow2: i % 2 == 1 }" v-else>
              {{ j }}
            </div>

            <div
              class=""
              :class="{ borderScore: items >= 0 }"
              v-for="(items, k) in item"
              :key="k"
            >
              <div class="scoreBox scoreMore90" v-if="items > 90">
                {{ items }}%
              </div>
              <div class="scoreBox scoreMore75" v-else-if="items > 75">
                {{ items }}%
              </div>
              <div class="scoreBox scoreMore49" v-else-if="items > 49">
                {{ items }}%
              </div>
              <div class="scoreBox scoreLess" v-else-if="items > 0">
                {{ items }}%
              </div>
              <div class="scoreBox noScore" v-else-if="items == 0">&nbsp;</div>
              <div class="scoreBox sameCountry" v-else>&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
      <!-- table data Type row-->
      <div class="showType" v-show="layoutTable == 'row'">
        <div class="row no-wrap" align="center">
          <div
            class="headTableRowType"
            style="min-width: 150px; line-height: 60px"
          >
            Country/Dim.
          </div>
          <div
            class="headTableRowType"
            :class="{
              headTableRowType: item.label == 'Total',
              totalRow: item.label == 'Total',
              headTotalRow: item.label == 'Total',
              minWidth400: item.label != 'Total',
            }"
            v-for="(item, index) in tableData"
            :key="index"
          >
            <div style="height: 30px">{{ item.label }}</div>
            <div class="row" v-if="item.label != 'Total'">
              <div
                class="Number1to7Head"
                :class="{ headRow2: index % 2 == 1 }"
                style="min-width: 48px"
              >
                All
              </div>
              <div
                class="Number1to7Head"
                :class="{ headRow2: index % 2 == 1 }"
                v-for="i in 7"
                :key="i"
              >
                {{ i }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="row no-wrap"
          align="center"
          v-for="(itemI, i) in partnerCountry"
          :key="i"
        >
          <div
            class="Number1to7Head"
            :class="{ headRow2: i % 2 == 1 }"
            style="min-width: 150px; height: 45px; line-height: 45px"
          >
            {{ itemI.iso }}
          </div>
          <div
            class="row no-wrap"
            style=""
            v-for="(itemJ, j) in tableData"
            :key="j"
          >
            <div c v-for="(itemK, k) in itemJ.data" :key="k">
              <!-- <div>{{ itemK[i] }}%</div> -->
              <div
                class="scoreRow scoreMore90"
                :class="{ totalRow: itemJ.label == 'Total' }"
                v-if="itemK[i] > 90"
              >
                {{ itemK[i] }}%
                <q-tooltip>
                  Report : {{ itemJ.label }}<br />Partner : {{ itemI.label
                  }}<br />{{ k > 0 ? "Dimension : " + k : "Avg all dimension" }}
                </q-tooltip>
              </div>
              <div
                class="scoreRow scoreMore75"
                :class="{ totalRow: itemJ.label == 'Total' }"
                v-else-if="itemK[i] > 75"
              >
                {{ itemK[i] }}%
                <q-tooltip>
                  Report : {{ itemJ.label }}<br />Partner : {{ itemI.label
                  }}<br />{{ k > 0 ? "Dimension : " + k : "Avg all dimension" }}
                </q-tooltip>
              </div>
              <div
                class="scoreRow scoreMore49"
                :class="{ totalRow: itemJ.label == 'Total' }"
                v-else-if="itemK[i] > 49"
              >
                {{ itemK[i] }}%
                <q-tooltip>
                  Report : {{ itemJ.label }}<br />Partner : {{ itemI.label
                  }}<br />{{ k > 0 ? "Dimension : " + k : "Avg all dimension" }}
                </q-tooltip>
              </div>
              <div
                class="scoreRow scoreLess"
                :class="{ totalRow: itemJ.label == 'Total' }"
                v-else-if="itemK[i] > 0"
              >
                {{ itemK[i] }}%
                <q-tooltip>
                  Report : {{ itemJ.label }}<br />Partner : {{ itemI.label
                  }}<br />{{ k > 0 ? "Dimension : " + k : "Avg all dimension" }}
                </q-tooltip>
              </div>
              <div
                class="scoreRow noScore"
                :class="{ totalRow: itemJ.label == 'Total' }"
                v-else-if="itemK[i] == 0"
              >
                &nbsp;
              </div>
              <div class="scoreRow sameCountry" v-else>&nbsp;</div>
            </div>
          </div>
        </div>
        <div class="row no-wrap">
          <div
            class="Number1to7Head"
            :class="{ headRow2: partnerCountry.length % 2 == 1 }"
            style="min-width: 150px; height: 45px; line-height: 45px"
            align="center"
          >
            Total
          </div>
          <div
            class="row no-wrap"
            style=""
            v-for="(itemJ, j) in tableData"
            :key="j"
          >
            <div c v-for="(itemK, k) in itemJ.data" :key="k" align="center">
              <div
                class="scoreRow scoreMore90"
                :class="{ totalRow: itemJ.label == 'Total' }"
                v-if="itemK[partnerCountry.length] > 90"
              >
                {{ itemK[partnerCountry.length] }}%
              </div>
              <div
                class="scoreRow scoreMore75"
                :class="{ totalRow: itemJ.label == 'Total' }"
                v-else-if="itemK[partnerCountry.length] > 75"
              >
                {{ itemK[partnerCountry.length] }}%
              </div>
              <div
                class="scoreRow scoreMore49"
                :class="{ totalRow: itemJ.label == 'Total' }"
                v-else-if="itemK[partnerCountry.length] > 49"
              >
                {{ itemK[partnerCountry.length] }}%
              </div>
              <div
                class="scoreRow scoreLess"
                :class="{ totalRow: itemJ.label == 'Total' }"
                v-else-if="itemK[partnerCountry.length] > 0"
              >
                {{ itemK[partnerCountry.length] }}%
              </div>
              <div
                class="scoreRow noScore"
                :class="{ totalRow: itemJ.label == 'Total' }"
                v-else-if="itemK[partnerCountry.length] == 0"
              >
                &nbsp;
              </div>
              <div class="scoreRow sameCountry" v-else>&nbsp;</div>
            </div>
            <!-- Total all  -->
          </div>
        </div>
      </div>
      <!-- end table data  -->
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
      layoutTable: "row",
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

///////// table
.headTable {
  min-width: 80px;
  border: 1px solid #ffffff;
  font-size: 18px;
  background: #757575;
  color: #ffffff;
  height: 50px;
  line-height: 50px;
}
.headTableRowType {
  border: 1px solid #ffffff;
  font-size: 18px;
  background: #757575;
  color: #ffffff;
  height: 60px;
}
.minWidth400 {
  min-width: 400px;
}
.Number1to7Head {
  min-width: 50px;
  background: #d2d1d1;
  color: #757575;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
}

/////  score
.headRow {
  min-width: 300px;
  background: #d2d1d1;
  color: #757575;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
}
.headRow2 {
  background: #e5e5e5;
}
.scoreBox {
  border: none;
  min-width: 80px;
  color: white;
  font-size: 16px;
  height: 45px;
  line-height: 45px;
}
.scoreRow {
  min-width: 50px;
  color: white;
  font-size: 16px;
  height: 45px;
  line-height: 45px;
}
///////
.headTotalRow {
  line-height: 60px;
}
.totalRow {
  min-width: 100px;
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
</style>
