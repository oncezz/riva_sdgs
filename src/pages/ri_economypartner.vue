<template>
  <div class="container shadow-2 bg-white" style="color: #757575">
    <ri-header :menu="2"></ri-header>

    <!-- //Row 1 -->
    <div class="row">
      <div class="col">
        <input-section
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
      <!-- by country  -->
      <div v-if="input.disaggregation == 'country'">
        <main-linechart :data="countryFullList" :input="input"></main-linechart>
        <spider-web :input="input"></spider-web>
        <div class="q-py-lg" style="background: #ededed" align="center">
          <div class="btnOutGreen" @click="changeDisaggregationToDimension()">
            Sustainable Integration by dimension
          </div>
        </div>
      </div>
      <!-- by dimension  -->
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

import mainLinechart from "../components/ri/economy/linechartbycountry";
import selectDesired from "../components/ri/ri_select_desired_level";
import lineChartDimension from "../components/ri/economy/linechart_by_dimension";
import spiderWeb from "../components/ri/economy/spiderweb";
import dimensionTab from "../components/ri/ri_datatab_dimension.vue";
import Axios from "axios";
// import { visibility } from 'html2canvas/dist/types/css/property-descriptors/visibility';
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
      input: {
        partner: [],
        year: {
          min: 2012,
          max: 2020,
        },
        type: "Sustainable",
        disaggregation: "country",
      },

      showResultAfterStartBtn: false, //แสดงคำตอบ
      yourScore: 0.74, //คะแนนของตัวเองใน 4 bar
      dataAvailCircleChart: {
        showChart: false,
        score: 0,
      },
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
      };
      let url = this.ri_api + "circle_economy.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.dataAvailCircleChart.score = Number(res.data);
    },
    async calFourBarChart() {
      let data = {
        partner: this.countryPartnerList,
        reporting: this.countryReportList,
        year: this.input.year.max,
        type: this.input.type,
      };
      let url = this.ri_api + "fourbar_economy.php";
      let res = await axios.post(url, JSON.stringify(data));
      // console.log(res.data);
      this.fourBarData = res.data;
    },
    changeDisaggregationToDimension() {
      this.input.disaggregation = "dimension";
    },
    ///////
  },
};
</script>

<style lang="scss" scoped>
.btnOutGreen {
  cursor: pointer;
  width: 460px;
  height: 45px;
  background: #2d9687;
  color: #ffffff;
  border-radius: 5px;
  line-height: 45px;
  font-size: 24px;
  text-align: center;
}
.footer-bg {
  background-image: url("../../public/footer.jpg");
  background-size: inherit;
  background-position: bottom;
}
</style>
