<template>
  <div class="container shadow-2 bg-white" style="color: #757575">
    <ri-header :menu="2"></ri-header>

    <!-- //Row 1 -->
    <div class="row">
      <div class="col">
        <input-section
          :setInput="setInput"
          :inputGet="input"
          @reset-start-btn="resetStartBtn"
          @show-dataavail-chart="showDataAvailChart"
          @start-btn="startBtn"
          @change-integration-type="changeIntegrationType"
        />
      </div>

      <!--///////// right side //////// -->
      <div class="col-4" style="background: #ededed">
        <dimensions-icon :type="input.type"></dimensions-icon>

        <circle-avail
          :score="dataAvailCircleChart.score"
          :isShowChart="dataAvailCircleChart.showChart"
        ></circle-avail>
      </div>
    </div>
    <div v-if="showResultAfterStartBtn">
      <hr />
      <div class="q-pa-md">
        <four-bar
          :name="fourBarName"
          :type="input.type"
          :year="input.year.max"
          :data="fourBarData"
        ></four-bar>
      </div>
      <hr />
      <select-desired
        :input="input"
        :disaggregation="input.disaggregation"
        @change-disaggregation="changeDisaggraegation"
      ></select-desired>
      <br />

      <div v-if="input.disaggregation == 'country'">
        <main-linechart :data="countryFullList" :input="input"></main-linechart>
        <spider-web :input="input" :data="countryFullList"></spider-web>
        <div class="q-py-lg" style="background: #ededed" align="center">
          <div class="btnOutGreen" @click="changeDisaggregationToDimension()">
            Sustainable Integration by dimension
          </div>
        </div>
      </div>

      <div v-else>
        <line-chart-dimension
          :data="countryFullList"
          :input="input"
        ></line-chart-dimension>
        <dimension-tab :input="input"></dimension-tab>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri/main/ri_header";
import myFooter from "../components/footer";

import inputSection from "../components/ri/economy/input_section";
import circleAvail from "../components/ri/main/ri_data_avail_circle";

import fourBar from "../components/ri/main/ri_fourbar";
import dimensionsIcon from "../components/ri/main/ri_dimensions_icon";
import selectDesired from "../components/ri/main/ri_select_desired_level";

import mainLinechart from "../components/ri/economy/linechartbycountry";
import spiderWeb from "../components/ri/economy/spiderweb";

import lineChartDimension from "../components/ri/economy/linechart_by_dimension";

import dimensionTab from "../components/ri/economy/datatab_dimension";
import Axios from "axios";

export default {
  components: {
    riHeader,
    myFooter,
    inputSection,
    fourBar,
    dimensionsIcon,
    circleAvail,
    lineChartDimension,
    mainLinechart,
    selectDesired,
    spiderWeb,
    dimensionTab,
  },
  data() {
    return {
      countryOptions: [],
      countryPartnerList: [],
      countryReportList: [],
      countryFullList: [],
      setInput: false,
      input: {
        partner: [],
        year: {
          min: 2012,
          max: 2020,
        },
        reporting: [],
        type: "Sustainable",
        disaggregation: "country",
      },

      showResultAfterStartBtn: false, //แสดงคำตอบ
      yourScore: 0.74, //คะแนนของตัวเองใน 4 bar
      dataAvailCircleChart: {
        showChart: false,
        score: 60,
      },
      fourBarName: "Your group",
      fourBarData: [],
    };
  },
  methods: {
    resetStartBtn() {
      this.showResultAfterStartBtn = false;
    },
    startBtn(inputSend) {
      this.showResultAfterStartBtn = true;
      this.countryFullList = inputSend.countryFullList;
      this.input = inputSend.input;
      // console.log(this.input);
      // console.log(this.countryFullList);
      this.calFourBarChart();
    },
    showDataAvailChart(isShowChart) {
      this.calScoreInDataAvail();
      this.dataAvailCircleChart.showChart = isShowChart;
    },
    changeIntegrationType(integrationType) {
      this.input.type = integrationType;
    },
    changeDisaggraegation(type) {
      this.input.disaggregation = type;
    },
    async calScoreInDataAvail() {
      let data = {
        partner: this.countryPartnerList,
        reporting: this.countryReportList,
        input: this.input,
      };
      let url = this.ri_api + "economy/circle_economy.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.dataAvailCircleChart.score = Number(res.data);
    },
    async calFourBarChart() {
      this.fourBarName = this.input.reporting.label;
      let data = {
        name: this.fourBarName,
        partner: this.countryPartnerList,
        reporting: this.countryReportList,
        year: this.input.year.max,
        type: this.input.type,
      };
      let url = this.ri_api + "economy/fourbar_economy.php";
      let res = await axios.post(url, JSON.stringify(data));
      // console.log(res.data);
      this.fourBarData = res.data;
    },
    changeDisaggregationToDimension() {
      this.input.disaggregation = "dimension";
    },
    ///////
  },
  mounted() {
    let keyLocal = this.$q.localStorage.getItem("keyId");
    let keyId = this.$route.params.key ? this.$route.params.key : null;

    if (keyId == keyLocal && keyLocal != null) {
      this.input.year = this.$q.localStorage.getItem("year");
      this.input.partner = this.$q.localStorage.getItem("partner");
      this.input.reporting = this.$q.localStorage.getItem("reporter");
      this.setInput = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.btnOutGreen {
  cursor: pointer;
  width: 340px;
  height: 35px;
  line-height: 30px;
  border: 3px solid #2d9687;
  border-radius: 5px;
  font-size: 14px;
}
.footer-bg {
  background-image: url("../../public/footer.jpg");
  background-size: inherit;
  background-position: bottom;
}
</style>
