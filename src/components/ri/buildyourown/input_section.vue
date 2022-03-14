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
          :options="countryOptions"
          v-model="input.reporting"
          multiple
          stack-label
          dense
          use-chips
          style="width: 98%"
          @input="showSelectedReportList()"
        />
      </div>
      <br />
      <div class="q-pt-md font-16"><b>Partner economy(ies)</b></div>
      <div>
        Please select one, many or a pre-selected group of partner economies of
        interest.
      </div>
      <div>
        <q-select
          :options="countryOptions"
          v-model="input.partner"
          multiple
          use-chips
          stack-label
          dense
          style="width: 98%"
          @input="showSelectedPartnerList()"
        />
      </div>
      <br />
      <div class="selectedPartner relative-position q-pa-sm">
        <div class="font-16"><b>Selected reporting economy(ies)</b></div>
        <div class="q-pt-sm">
          <div class="row" style="width: 90%; height: 100px">
            <div
              class="countryTag q-mr-sm q-px-md q-mb-sm"
              v-for="(item, index) in countryReportList"
              :key="index"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="font-16"><b>Selected partner economy(ies)</b></div>
        <div class="q-pt-sm">
          <div class="row" style="width: 90%">
            <div
              class="countryTag q-mr-sm q-px-md q-mb-sm"
              v-for="(item, index) in countryFullList"
              :key="index"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div
          class="warnMoreThan24 absolute-bottom q-pl-md"
          v-show="countryFullList.length > 24"
        >
          Selected partner economies can not be selected more than 24 economies.
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      dataAvailCircleChart: {
        score: 0,
        isShowChart: false,
      },
      countryOptions: [],
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
      if (this.countryFullList.length > 24) {
        this.notifyRed(
          "Selected partner economies can not be selected more than 24 economies."
        );
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
        this.$emit("start-btn", {
          input: this.input,
          countryFullList: this.countryFullList,
          reportingList: this.countryReportList,
        });
      } else {
        this.notifyRed("Please select Reporting economy and Partner economy");
      }
    },
    changeInputTypeSustainable() {
      this.input.type = "Sustainable";
      this.$emit("change-integration-type", "Sustainable");
      this.loadData();
      this.resetStartBtn();
      this.checkDataAvailability();
    },
    changeInputTypeConventional() {
      this.input.type = "Conventional";
      this.$emit("change-integration-type", "Conventional");
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
      let iso = this.input.partner.map((x) => x.iso);

      iso.forEach((isoData) => {
        let tempList = this.countryGroupList(isoData);
        countryPartyTemp = countryPartyTemp.concat(tempList);
      });
      let test = [...new Set(countryPartyTemp)];
      test.forEach((x) => {
        let temp = this.countryOptions.filter((y) => y.iso == x);
        let inputCountry = {
          label: temp[0].label,
          iso: temp[0].iso,
        };
        this.countryFullList.push(inputCountry);
      });
      this.countryFullList.sort((a, b) => (a.label > b.label ? 1 : -1));
      this.checkDataAvailability();
    },
    showSelectedReportList() {
      this.resetStartBtn();
      this.countryReportList = [];
      let countryPartyTemp = [];
      let iso = this.input.reporting.map((x) => x.iso);

      iso.forEach((isoData) => {
        let tempList = this.countryGroupList(isoData);
        countryPartyTemp = countryPartyTemp.concat(tempList);
      });
      let test = [...new Set(countryPartyTemp)];

      test.forEach((x) => {
        let temp = this.countryOptions.filter((y) => y.iso == x);
        let inputCountry = {
          label: temp[0].label,
          iso: temp[0].iso,
        };
        this.countryReportList.push(inputCountry);
      });
      this.countryReportList.sort((a, b) => (a.label > b.label ? 1 : -1));

      this.checkDataAvailability();
    },
    async showDataCircle(show) {
      // call api
      if (show) {
        let data = {
          partner: this.countryPartnerList,
          reporting: this.countryReportList,
          input: this.input,
        };
        let url = this.ri_api + "economy/circle_economy.php";
        let res = await axios.post(url, JSON.stringify(data));
        this.dataAvailCircleChart.score = Number(res.data);
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
  },
  async mounted() {
    await this.loadData();
    await this.getCountryList();
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
.warnMoreThan24 {
  color: #ee0202;
  font-size: 18px;
}
</style>
