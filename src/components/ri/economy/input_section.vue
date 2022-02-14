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
        @input="resetStartBtn()"
      />
    </div>
    <div class="q-pt-md font-16"><b>Reporting economy</b></div>
    <div>Select a reporting economy or a pre-selected group of interest</div>
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
      Select one, many or pre-selected group of partner economies of interest.
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
    <div class="selectedPartner">
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
    </div>
    <!-- start Btn  -->

    <div class="q-py-lg" align="center" style="width: 100%">
      <q-btn label="Start" class="startBtn" @click="startBtn()" />
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
    startBtn() {
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
        this.$emit("show-dataavail-chart", true);
      } else {
        this.$emit("show-dataavail-chart", false);
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
.startBtn {
  cursor: pointer;
  font-size: 20px;
  text-align: center;
  border-radius: 5px;
  width: 400px;

  color: white;
  background-color: #2d9687;
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
</style>
