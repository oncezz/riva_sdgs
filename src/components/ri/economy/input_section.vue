<template>
  <div class="col q-px-xl q-pt-xl">
    <div class="row">
      <div class="col-4">
        <div class="font-16"><b>Integration type</b></div>
        <div>Select the desired type of integration</div>
      </div>
      <div class="col-3">
        <q-radio
          v-model="input.type"
          val="Sustainable"
          label="Sustainable integration"
          color="secondary"
          @input="changeInputTypeSustainable()"
        />
      </div>
      <q-radio
        v-model="input.type"
        val="Conventional"
        label="Conventional integration"
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
        @input="resetStartBtn()"
      />
    </div>
    <div class="q-pt-md font-16"><b>Reporting economy</b></div>
    <div>
      Please select a reporting economy or a pre-selected group of interest.
    </div>
    <div>
      <q-select
        :options="countryOptions"
        v-model="input.reporting"
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
    <div class="reportingSelectList q-pa-sm">
      <div class="font-16"><b>Selected reporting economy</b></div>
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

    <!-- start Btn  -->

    <div class="q-py-lg row justify-evenly" align="center" style="width: 100%">
      <div class="clearAllBtnDiv" @click="clearAllBtn()">Clear all</div>
      <div class="startBtnDiv" @click="startBtn()">Start</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["setInput", "inputGet"],
  data() {
    return {
      countryOptions: [],
      countryFullList: [],
      countryReportList: [],
      periodSetup: {
        min: 2000,
        max: 2020,
      },
      input: {
        partner: [],
        reporting: null,
        year: {
          min: 2012,
          max: 2020,
        },
        type: "Sustainable",
        disaggregation: "country",
      },
    };
  },
  methods: {
    clearAllBtn() {
      // this.input.partner = [];
      // this.input.year = { min: 2010, max: 2019 };
      // this.input.type = "Sustainable";
      // this.countryFullList = [];
      // this.countryReportList = [];
      // this.input.reporting = null;
      // this.$emit("show-dataavail-chart", false);
      this.$router.push("/reloadpage/rieconomypartner");
    },
    startBtn() {
      if (this.input.year.min == this.input.year.max) {
        this.notifyRed("Start and end year can not be the same.");
        return;
      }
      if (
        this.countryReportList.length > 0 &&
        this.countryFullList.length > 0
      ) {
        this.$emit("start-btn", {
          input: this.input,
          countryFullList: this.countryFullList,
        });
      } else {
        this.notifyRed("Please select Reporting economy and Partner economy");
      }
    },
    changeInputTypeSustainable() {
      this.input.type = "Sustainable";
      this.$emit("change-integration-type", "Sustainable");
      this.resetStartBtn();
    },
    changeInputTypeConventional() {
      this.input.type = "Conventional";
      this.$emit("change-integration-type", "Conventional");
      this.resetStartBtn();
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
      if (this.input.partner && this.input.partner.length > 0) {
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

          // if (this.countryReportList[0].label != inputCountry.label) {

          this.countryFullList.push(inputCountry);
          // }
        });

        this.countryFullList.sort((a, b) => (a.label > b.label ? 1 : -1));
        if (
          this.countryReportList.length > 0 &&
          this.countryFullList.length > 0
        ) {
          let uuid = require("uuid");
          this.id = uuid.v4();
          let saveData = {
            input: this.input,
            database: "DigiSRII",
            type: "Specific",
            disaggregation: "Pair",
            key: this.id,
          };

          this.$q.localStorage.clear();
          this.$q.localStorage.set("dataAvail", saveData);
          this.$emit("show-dataavail-chart", true);
        } else {
          this.$emit("show-dataavail-chart", false);
        }
      }
    },
    showSelectedReportList() {
      this.resetStartBtn();
      this.countryReportList = [];

      //   let iso = this.input.reporting.iso;
      let isos = this.input.reporting.iso;
      let tempList = this.countryGroupList(isos);

      let test = [...new Set(tempList)];

      test.forEach((x) => {
        let temp = this.countryOptions.filter((y) => y.iso == x);
        let inputCountry = {
          label: temp[0].label,
          iso: temp[0].iso,
        };
        this.countryReportList.push(inputCountry);
      });
      this.countryReportList.sort((a, b) => (a.label > b.label ? 1 : -1));
      if (
        this.countryReportList.length > 0 &&
        this.countryFullList.length > 0
      ) {
        let uuid = require("uuid");
        this.id = uuid.v4();
        let saveData = {
          input: this.input,
          database: "DigiSRII",
          type: "Specific",
          disaggregation: "Pair",
          key: this.id,
        };

        this.$q.localStorage.clear();
        this.$q.localStorage.set("dataAvail", saveData);
        this.$emit("show-dataavail-chart", true);
      } else {
        this.$emit("show-dataavail-chart", false);
      }
    },
  },
  async mounted() {
    await this.getCountryList();
    await this.loadPeriod();
    setTimeout(() => {
      if (this.setInput) {
        this.input = this.inputGet;
        this.showSelectedPartnerList();
        this.showSelectedReportList();
      }
    }, 1000);
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
.reportingSelectList {
  width: 98%;
  height: 120px;
  border: 1px dashed #c4c4c4;
  overflow-y: auto;
}
// .selectedPartner {
//   width: 98%;
//   height: 340px;
//   border: 1px dashed #c4c4c4;
// }
.partnerSelectList {
  margin-top: 10px;
  width: 98%;
  height: 220px;
  border: 1px dashed #c4c4c4;
  overflow-y: auto;
}
</style>
