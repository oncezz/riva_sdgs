<template>
  <div class="row">
    <div class="col-8 q-px-xl q-pt-xl">
      <div class="row">
        <div class="col-4">
          <div class="font-16"><b>Integration type</b></div>
          <div>Select the desired type of integration</div>
        </div>
        <div class="col-3">
          <q-radio
            v-model="input.type"
            val="Sustainable"
            label="Sustainable Integration"
            color="secondary"
            @input="changeInputTypeSustainable()"
          />
        </div>
        <q-radio
          v-model="input.type"
          val="Conventional"
          label="Conventional Integration"
          color="secondary"
          @input="changeInputTypeConventional()"
        />
      </div>

      <!-- Input Panel -->

      <br />
      <div class="font-16"><b>Period</b></div>
      <div class="q-pt-md" align="center">
        <q-range
          v-model="input.year"
          marker-labels
          :min="periodSetup.min"
          :max="periodSetup.max"
          label-always
          markers
          style="width: 95%"
          color="secondary"
          @input="changeYear()"
        />
      </div>
      <div class="q-pt-md font-16"><b>Reporting economy(ies)</b></div>
      <div>
        Please select one, many or pre-selected group or reporting economies of
        interest.
      </div>
      <div>
        <q-select
          :options="countryReportOption"
          v-model="input.reporting"
          multiple
          stack-label
          dense
          use-chips
          style="width: 98%"
          @input="showSelectedReportList()"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section avatar>
                <gb-flag
                  v-if="
                    scope.opt.code &&
                    scope.opt.code != 'TW' &&
                    scope.opt.type != 2
                  "
                  :code="scope.opt.code"
                  size="small"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  v-html="scope.opt.label"
                  :class="
                    scope.opt.disable
                      ? 'text-black text-weight-bolder'
                      : 'text-black'
                  "
                />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <br />
      <div class="q-pt-md font-16"><b>Partner economy(ies)</b></div>
      <div>
        Please select one, many or a pre-selected group of partner economies of
        interest.
      </div>
      <div>
        <q-select
          :options="countryPartnerOption"
          v-model="input.partner"
          multiple
          use-chips
          stack-label
          dense
          style="width: 98%"
          @input="showSelectedPartnerList()"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section avatar>
                <img
                  src="../../../assets/flags/xk.svg"
                  width="25px"
                  v-if="scope.opt.code == 'XK'"
                />
                <img
                  src="../../../assets/flags/cni.png"
                  width="25px"
                  v-if="scope.opt.code == 'CNI'"
                />
                <img
                  src="../../../assets/flags/an.png"
                  width="25px"
                  v-if="scope.opt.code == 'AN'"
                />
                <gb-flag
                  v-if="
                    scope.opt.code &&
                    scope.opt.code != 'TW' &&
                    scope.opt.type != 2 &&
                    scope.opt.code != 'XK' &&
                    scope.opt.code != 'CNI' &&
                    scope.opt.code != 'AN'
                  "
                  :code="scope.opt.code"
                  size="small"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  v-html="scope.opt.label"
                  :class="
                    scope.opt.disable
                      ? 'text-black text-weight-bolder'
                      : 'text-black'
                  "
                />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <br />
      <div class="reportingSelectList q-pa-sm">
        <div class="font-16"><b>Selected reporting economy(ies)</b></div>
        <div class="q-pt-sm">
          <div class="row" style="width: 100%; height: 60px">
            <div
              class="countryTag q-mr-sm q-px-md q-mb-sm"
              v-for="(item, index) in countryReportList"
              :key="index"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
      <div class="partnerSelectList q-pa-sm">
        <div class="font-16"><b>Selected partner economy(ies)</b></div>
        <div class="q-pt-sm">
          <div class="row" style="width: 100%; height: 60px">
            <div
              class="countryTag q-mr-sm q-px-md q-mb-sm"
              v-for="(item, index) in countryFullList"
              :key="index"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="q-pt-lg row justify-evenly"
        align="center"
        style="width: 100%"
      >
        <div class="clearAllBtnDiv" @click="clearAllBtn()">Clear all</div>
        <div class="startBtnDiv" @click="startBtn()">Start</div>
      </div>
      <br />
    </div>
    <!-- dimension icon  -->
    <div class="col-4 font-16 q-pa-md">
      <div class="">
        <b>{{ input.type }} Integration dimensions (all included)</b>
      </div>
      <div>
        Select dimensions of interest. Hover to reveal included indicators.
      </div>
      <div class="q-pt-sm" style="width: 400px; margin: auto">
        <div class="q-pt-sm row justify-start">
          <div
            class="col-4 q-pa-sm"
            v-for="(item, index) in indicatorData"
            :key="index"
          >
            <div v-if="item.picked" @click="toggleSelectDimension(index)">
              <q-img
                :src="filePic(item.icon)"
                alt=""
                class="iconDimension cursor-pointer isPicked"
              >
                <q-tooltip>
                  {{ item.name }}<br />
                  <div v-for="(item2, index2) in item.indicator" :key="index2">
                    - {{ item2 }}
                  </div>
                </q-tooltip>
              </q-img>
            </div>

            <div v-else @click="toggleSelectDimension(index)">
              <q-img
                :src="filePic(item.icon)"
                alt=""
                class="iconDimension cursor-pointer"
              >
                <q-tooltip>
                  {{ item.name }}<br />
                  <div v-for="(item2, index2) in item.indicator" :key="index2">
                    - {{ item2 }}
                  </div>
                </q-tooltip>
              </q-img>
            </div>
          </div>
        </div>
      </div>
      <br />
      <!-- circle  -->
      <div class="font-16"><b>Data availability</b></div>
      <div>
        Based on your selection, this group’s integration will be based on
      </div>
      <br />
      <div class="q-px-md" align="center">
        <div class="notShowCircular" v-if="!dataAvailCircleChart.isShowChart">
          <div style="height: 40%"></div>
          <div class="" align="center" style="width: 80%">
            (Select your desired group of economics to check data availablity)
          </div>
        </div>
        <div class="showCircular" v-else>
          <q-circular-progress
            show-value
            font-size="36px"
            :value="dataAvailCircleChart.score"
            size="200px"
            :thickness="0.36"
            color="orange"
            track-color="grey-5"
          >
            {{ dataAvailCircleChart.score }}%
          </q-circular-progress>
        </div>
      </div>
      <br />
      <div align="center">of all possible reporter-partner pairs.</div>
      <div
        align="center"
        class="q-pb-md cursor-pointer"
        v-if="dataAvailCircleChart.isShowChart"
        @click="goToURL()"
      >
        <u>Click here to see this group’s availablitiy matrix</u>
      </div>
      <div v-else class="q-pb-md">&nbsp;</div>
      <q-dialog v-model="warnDialog.show">
        <q-card class="warnBox">
          <div class="font-24 text-grey-7 text-bold q-pt-sm" align="center">
            Lack of data
            <q-icon
              class="fas fa-exclamation-circle"
              color="grey-7"
              size="28px"
            />
          </div>
          <hr />

          <div style="width: 650px; margin: auto">
            <div class="font-18 text-grey-7">
              The following economies were excluded from your selection due to
              lack of data:
            </div>
            <div class="font-14 text-grey-7">Reporting economy(ies):</div>
            <div class="row q-py-sm" v-if="warnDialog.reporting.length != 0">
              <div v-for="(item, i) in warnDialog.reporting" :key="i">
                <div class="countryTag q-mr-sm q-px-md q-mb-sm">
                  {{ item.label }}
                </div>
              </div>
            </div>

            <div class="font-14 text-grey-7">Partner economy(ies):</div>
            <div class="row q-py-sm" v-if="warnDialog.partner.length != 0">
              <div v-for="(items, index) in warnDialog.partner" :key="index">
                <div class="countryTag q-mr-sm q-px-md q-mb-sm">
                  {{ items.label }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="q-pt-lg row justify-evenly"
            align="center"
            style="width: 100%"
          >
            <div class="clearAllBtnDiv" @click="doNotThing()">Back</div>
            <div class="startBtnDiv" @click="okInWarnDialog()">Start</div>
          </div>
          <div class="q-pa-sm"></div>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { QSpinnerHourglass } from "quasar";
// import countryJsonInputReportCon from "../../../../public/country_build_reporter_con.json";
// import countryJsonInputReportSus from "../../../../public/country_build_reporter_sus.json";
// import countryJsonInputpartnerCon from "../../../../public/country_build_partner_con.json";
// import countryJsonInputpartnerSus from "../../../../public/country_build_partner_sus.json";

import countryJsonInput from "../../../../public/country_allcompare.json";
export default {
  data() {
    return {
      id: "",
      dataAvailCircleChart: {
        score: 0,
        isShowChart: false,
      },
      countryOptions: [],
      countryReportOption: [],
      countryPartnerOption: [],
      countryFullList: [],
      countryReportList: [],
      indicatorData: [],
      pickAll: 0,
      periodSetup: {
        min: 2000,
        max: 2020,
      },
      input: {
        partner: [],
        reporting: [],
        year: {
          min: 2012,
          max: 2020,
        },
        type: "Sustainable",
        disaggregation: "country",
        dimensionPicked: [],
      },
      dataTemp: [],
      warnDialog: {
        show: false,
        reporting: [],
        partner: [],
      },
    };
  },
  methods: {
    goToURL() {
      let dataGet = this.$q.localStorage.getItem("dataAvail");
      this.id = dataGet.key;
      this.$router.push("/ridataavailability/" + this.id);
    },
    clearAllBtn() {
      // this.dataAvailCircleChart = { score: 0, isShowChart: false };
      // this.input.dimensionPicked = [];
      // this.input.partner = [];
      // this.input.year = { min: 2010, max: 2019 };
      // this.input.type = "Sustainable";
      // this.countryFullList = [];
      // this.countryReportList = [];
      // this.input.reporting = null;
      // this.$emit("show-dataavail-chart", false);
      // this.indicatorData.forEach((x) => (x.picked = false));
      this.$router.push("/reloadpage/ribuildyourown");
    },
    startBtn() {
      if (this.input.year.min == this.input.year.max) {
        this.notifyRed("Start and end year can not be the same.");
        return;
      }

      if (this.pickAll == 0) {
        this.notifyRed("Please select one dimension");
        return;
      }
      if (
        this.countryReportList.length > 0 &&
        this.countryFullList.length > 0
      ) {
        this.checkCountryNodata();
        // this.$emit("start-btn", {
        //   input: this.input,
        //   countryFullList: this.countryFullList,
        //   reportingList: this.countryReportList,
        // });
      } else {
        this.notifyRed("Please select Reporting economy and Partner economy");
      }
    },
    changeInputTypeSustainable() {
      this.input.type = "Sustainable";
      this.$emit("change-integration-type", "Sustainable");
      this.input.partner = [];
      this.input.reporting = [];
      this.countryFullList = [];
      this.countryReportList = [];
      this.loadData();
      this.resetStartBtn();
      this.checkDataAvailability();
    },
    changeInputTypeConventional() {
      this.input.type = "Conventional";
      this.$emit("change-integration-type", "Conventional");
      this.input.partner = [];
      this.input.reporting = [];
      this.countryFullList = [];
      this.countryReportList = [];
      this.loadData();
      this.resetStartBtn();
      this.checkDataAvailability();
    },
    resetStartBtn() {
      this.$emit("reset-start-btn");
    },
    async loadPeriod() {
      let url = this.ri_api + "main/period_start_end.php";
      let res = await axios.get(url);
      this.periodSetup.min = Number(res.data.start);
      this.periodSetup.max = Number(res.data.end);
      this.input.year.min = Number(res.data.start);
      this.input.year.max = Number(res.data.end);
    },
    showSelectedPartnerList() {
      this.resetStartBtn();
      this.countryFullList = [];
      let countryPartyTemp = [];
      let iso = this.input.partner.map((x) => x.value);

      iso.forEach((isoData) => {
        let tempList = this.countryGroupListRiva2(isoData);
        countryPartyTemp = countryPartyTemp.concat(tempList);
      });
      let test = [...new Set(countryPartyTemp)];
      test.forEach((x) => {
        let temp = this.countryPartnerOption.filter((y) => y.value == x);
        if (temp.length > 0) {
          let inputCountry = {
            label: temp[0].label,
            iso: temp[0].value,
          };
          this.countryFullList.push(inputCountry);
        }
      });
      this.countryFullList.sort((a, b) => (a.label > b.label ? 1 : -1));
      this.checkDataAvailability();
    },
    showSelectedReportList() {
      this.resetStartBtn();
      this.countryReportList = [];
      let countryPartyTemp = [];
      let iso = this.input.reporting.map((x) => x.value);

      iso.forEach((isoData) => {
        let tempList = this.countryGroupListRiva2(isoData);
        countryPartyTemp = countryPartyTemp.concat(tempList);
      });
      let test = [...new Set(countryPartyTemp)];

      test.forEach((x) => {
        let temp = this.countryReportOption.filter((y) => y.value == x);
        if (temp.length > 0) {
          let inputCountry = {
            label: temp[0].label,
            iso: temp[0].value,
          };
          this.countryReportList.push(inputCountry);
        }
      });
      this.countryReportList.sort((a, b) => (a.label > b.label ? 1 : -1));

      this.checkDataAvailability();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////
    checkCountryNodata() {
      let countTemp = 0;
      let countAlert = 0;
      this.warnDialog.reporting = [];
      this.warnDialog.partner = [];
      // console.log("all data table", this.dataTemp);
      for (let i = 0; i < this.countryReportList.length; i++) {
        countTemp = 0;
        this.dataTemp.forEach((x) => {
          if (x.reporting == this.countryReportList[i].iso) {
            countTemp++;
          }
        });
        // console.log("countreport -- ", i, countTemp, this.warnDialog);
        if (countTemp == 0) {
          countAlert++;
          this.warnDialog.reporting.push(this.countryReportList[i]);
        }
      }

      for (let j = 0; j < this.countryFullList.length; j++) {
        countTemp = 0;
        this.dataTemp.forEach((x) => {
          if (x.partner == this.countryFullList[j].iso) {
            countTemp++;
          }
        });
        // console.log("countpart -- ", j, countTemp, this.warnDialog);
        if (countTemp == 0) {
          countAlert++;
          this.warnDialog.partner.push(this.countryFullList[j]);
        }
      }

      if (countAlert == 0) {
        ///////
        this.$emit("start-btn", {
          input: this.input,
          countryFullList: this.countryFullList,
          reportingList: this.countryReportList,
        });
      } else {
        this.warnDialog.show = true;
      }
      // console.log(this.warnDialog);
    },
    okInWarnDialog() {
      for (let i = 0; i < this.countryReportList.length; i++) {
        let checkDel = false;
        this.warnDialog.reporting.forEach((x) => {
          if (x.iso == this.countryReportList[i].iso) {
            this.countryReportList.splice(i, 1);
            checkDel = true;
          }
        });
        if (checkDel) {
          i--;
        }
      }

      for (let j = 0; j < this.countryFullList.length; j++) {
        let checkPartner = false;
        this.warnDialog.partner.forEach((partner) => {
          if (partner.iso == this.countryFullList[j].iso) {
            this.countryFullList.splice(j, 1);
            checkPartner = true;
          }
        });
        if (checkPartner) {
          j--;
        }
      }
      this.checkDataAvailability();
      this.warnDialog.show = false;
      this.$emit("start-btn", {
        input: this.input,
        countryFullList: this.countryFullList,
        reportingList: this.countryReportList,
      });
    },
    doNotThing() {
      this.warnDialog.show = false;
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////
    async showDataCircle(show) {
      // call api
      if (show) {
        if (this.countryReportList.length + this.countryFullList.length > 20) {
          this.$q.loading.show({
            spinner: QSpinnerHourglass,
            spinnerColor: "teal-2",
            delay: 0,
          });
        }
        let dim = [];
        for (let i = 0; i < this.input.dimensionPicked.length; i++) {
          if (this.input.dimensionPicked[i].picked) dim.push(i + 1);
        }
        let data = {
          partner: this.countryFullList.map((x) => x.iso),
          reporting: this.countryReportList.map((x) => x.iso),
          type: this.input.type,
          dimension: dim,
        };

        let dimLength = dim.length;
        let countScore = 0;
        let total = 0;
        let url = this.ri_api + "buildyourown/circle_build.php";
        let res = await axios.post(url, JSON.stringify(data));

        this.dataTemp = res.data;
        if (this.dataTemp.length > 0) {
          this.dataTemp = this.dataTemp.filter(
            (x) => x.dimall >= dimLength / 2
          );
        }

        data.partner.forEach((partner) => {
          data.reporting.forEach((reporting) => {
            let tempTable = this.dataTemp.filter(
              (x) => x.reporting == reporting && x.partner == partner
            );

            if (tempTable.length != 0) {
              countScore++;
            }

            if (reporting != partner) {
              total++;
            }
          });
        });
        // return;
        this.dataAvailCircleChart.score = Number(
          ((countScore / total) * 100).toFixed(0)
        );
        this.$q.loading.hide();
      }
      this.dataAvailCircleChart.isShowChart = show;
    },
    toggleSelectDimension(index) {
      let pick = this.indicatorData[index].picked;
      this.indicatorData[index].picked = !pick;
      if (!pick) {
        this.pickAll++;
      } else {
        this.pickAll--;
      }

      this.indicatorData.push(0);
      this.indicatorData.pop();
      this.input.dimensionPicked = this.indicatorData;

      this.checkDataAvailability();
      this.resetStartBtn();
    },
    filePic(fileName) {
      return this.ri_api + "pic/" + fileName;
    },
    async loadData() {
      this.pickAll = 0;
      this.indicatorData = [];
      let data = {
        type: this.input.type,
      };
      let url = this.ri_api + "main/dimension_icon.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.indicatorData = res.data;
      this.indicatorData.forEach((x) => (x.picked = false));
    },
    checkDataAvailability() {
      if (
        this.countryReportList.length > 0 &&
        this.countryFullList.length > 0 &&
        this.pickAll > 0
      ) {
        let uuid = require("uuid");
        this.id = uuid.v4();
        let saveData = {
          input: this.input,
          database: "All data",
          type: "SpecificAllData",
          disaggregation: "Dimension",
          key: this.id,
        };

        this.$q.localStorage.clear();
        this.$q.localStorage.set("dataAvail", saveData);
        this.showDataCircle(true);
      } else {
        this.showDataCircle(false);
      }
    },
    changeYear() {
      this.resetStartBtn();
      this.checkDataAvailability();
    },
    loadCountry() {
      let countryReportInput = [];
      let countryPartnerInput = [];
      this.countryReportOption = [];
      this.countryPartnerOption = [];

      countryReportInput = countryJsonInput;
      countryPartnerInput = countryJsonInput;

      countryReportInput.forEach((element) => {
        let tempData = {
          label: element.country,
          value: element.iso,
          code: element.code,
          disable: element.disable ? true : false,
        };
        this.countryReportOption.push(tempData);
      });

      countryPartnerInput.forEach((element) => {
        let tempData = {
          label: element.country,
          value: element.iso,
          code: element.code,
          disable: element.disable ? true : false,
        };
        this.countryPartnerOption.push(tempData);
      });
    },
  },
  async mounted() {
    await this.loadData();
    await this.loadCountry();
    // await this.getCountryList();
    await this.loadPeriod();
  },
};
</script>

<style lang="scss" scoped>
.startBtnDiv {
  cursor: pointer;
  width: 280px;
  background-color: #2d9687;
  height: 45px;
  line-height: 45px;
  font-size: 20px;
  color: white;
  border-radius: 5px;
  border: 3px solid #2d9687;
}
.clearAllBtnDiv {
  cursor: pointer;
  width: 280px;
  height: 45px;
  line-height: 45px;
  font-size: 20px;
  color: #757575;
  border-radius: 5px;
  border: 3px solid #2d9687;
}
.countryTag {
  background-color: #dedede;
  color: #626262;
  border-radius: 50px;
  height: 20px;
}

.selectedPartner {
  width: 98%;
  height: 340px;
  border: 1px dashed #c4c4c4;
}
.iconDimension {
  opacity: 0.35;
  transform: scale(0.9);
  width: 100%;
  transition: all 0.2s ease-out;
}
.isPicked {
  opacity: 1;
  transform: scale(1);
  border: 3px solid #2d9687;
}
.showCircular {
  margin: auto;
  height: 240px;
  line-height: 240px;
}
.notShowCircular {
  margin: auto;

  height: 240px;
  border: 1px dashed #cbcbcb;
}

.reportingSelectList {
  width: 98%;
  height: 120px;
  border: 1px dashed #c4c4c4;
  overflow-y: auto;
}

.partnerSelectList {
  margin-top: 10px;
  width: 98%;
  height: 220px;
  border: 1px dashed #c4c4c4;
  overflow-y: auto;
}
.warnBox {
  max-width: 850px;
  width: 750px;
}
</style>
