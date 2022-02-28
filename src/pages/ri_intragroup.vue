<template>
  <div class="container shadow-2 bg-white" style="color: #757575">
    <ri-header :menu="1"></ri-header>

    <!-- input panel -->
    <div class="row">
      <div class="col">
        <input-section
          @reset-start-btn="resetStartBtn"
          @show-dataavail-chart="showDataAvailChart"
          @start-btn="startBtn"
          @change-integration-type="changeIntegrationType"
        />
      </div>

      <!-- dimension icon / data available circle -->

      <div class="col-4" style="background: #ededed">
        <dimensions-icon :type="input.type"></dimensions-icon>
        <circle-avail
          :score="dataAvailCircleChart.score"
          :isShowChart="dataAvailCircleChart.showChart"
        ></circle-avail>
      </div>
    </div>

    <!-- Result -->
    <div v-if="showResultAfterStartBtn" class="q-pa-md">
      <div>
        <hr />
        <div>
          <!-- four bar chart`` -->
          <four-bar
            :type="input.type"
            :name="fourBarName"
            :year="input.year.max"
            :data="fourBarData"
          ></four-bar>
        </div>
        <hr />

        <!-- by country / by dimension btn -->
        <select-desired
          :input="input"
          :disaggregation="input.disaggregation"
          @change-disaggregation="changeDisaggraegation"
        ></select-desired>
      </div>

      <!-- Result of bycountry -->
      <div v-show="input.disaggregation == 'country'">
        <!-- line chart with 4 windows by country-->
        <main-linechart :data="countryFullList" :input="input"></main-linechart>
        <hr />
        <!-- rainbow duo circle chart`` -->
        <economy-circle
          :data="countryFullList"
          :input="input"
          @go-to-dimension="gotoDimension"
        ></economy-circle>
      </div>

      <!-- Result of bydimension`` -->
      <div v-show="input.disaggregation == 'dimension'">
        <!-- line chart with 4 windows by dimension -->
        <line-chart-dimension
          :data="countryFullList"
          :input="input"
        ></line-chart-dimension>
        <!-- dimension tab  -->
        <dimension-tab :input="input" :data="countryFullList"> </dimension-tab>
      </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri/main/ri_header";
import myFooter from "../components/footer";

import inputSection from "../components/ri/intragroup/input_section";
import dimensionsIcon from "../components/ri/main/ri_dimensions_icon";
import circleAvail from "../components/ri/main/ri_data_avail_circle";

import fourBar from "../components/ri/main/ri_fourbar";
import selectDesired from "../components/ri/main/ri_select_desired_level";

import mainLinechart from "../components/ri/intragroup/linechartbycountry";
import economyCircle from "../components/ri/intragroup/ri_economy_circle";

import lineChartDimension from "../components/ri/intragroup/linechart_by_dimension";
import dimensionTab from "../components/ri/intragroup/datatab_dimension.vue";

import Axios from "axios";
export default {
  components: {
    riHeader,
    myFooter,

    inputSection,
    dimensionsIcon,
    circleAvail,

    fourBar,
    selectDesired,

    mainLinechart,
    economyCircle,

    lineChartDimension,
    dimensionTab,
  },
  data() {
    return {
      countryFullList: [],
      input: {
        partner: [],
        year: {
          min: 2012,
          max: 2020,
        },
        type: "Sustainable",
        disaggregation: "country",
      },
      showResultAfterStartBtn: false,

      dataAvailCircleChart: {
        showChart: false,
        score: 0,
      },
      fourBarName: "Your group",
      fourBarData: [],
    };
  },
  methods: {
    gotoDimension() {
      this.input.disaggregation = "dimension";
      // var element = this.$refs["breakPointPage"];
      // var top = element.offsetTop;

      window.scrollTo(0, 1400);
    },
    resetStartBtn() {
      this.showResultAfterStartBtn = false;
    },
    showDataAvailChart(isShowChart) {
      this.calScoreInDataAvail();
      this.dataAvailCircleChart.showChart = isShowChart;
    },
    startBtn(inputSend) {
      this.showResultAfterStartBtn = true;
      this.countryFullList = inputSend.countryFullList;
      this.input = inputSend.input;
      // console.log(this.input);
      // console.log(this.countryFullList);
      this.calFourBarChart();
    },
    changeIntegrationType(integrationType) {
      this.input.type = integrationType;
    },
    changeDisaggraegation(type) {
      this.input.disaggregation = type;
    },

    async calScoreInDataAvail() {
      let data = {
        economic: this.countryPartnerList,
      };
      let url = this.ri_api + "intra/circle_intra.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.dataAvailCircleChart.score = Number(res.data);
    },

    async calFourBarChart() {
      let labelName = "Your group";
      if (this.input.partner.length == 1) {
        labelName = this.input.partner[0].label;
      }
      this.fourBarName = labelName;
      let data = {
        name: labelName,
        economic: this.countryPartnerList,
        year: this.input.year.max,
        type: this.input.type,
      };
      let url = this.ri_api + "intra/fourbar_intra.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.fourBarData = res.data;
    },
  },
  async mounted() {
    // await this.getCountryList();
    // this.loadPeriod();
  },
};
</script>

<style lang="scss" scoped>
.startBtn {
  cursor: pointer;
  font-size: 24px;
  text-align: center;
  border-radius: 5px;
  width: 400px;
  height: 45px;
  line-height: 45px;
  color: white;
  background-color: #2d9687;
}
.btnGreen {
  text-align: center;
  border-radius: 5px;
  width: 220px;
  height: 40px;
  line-height: 40px;
  color: white;
  background-color: #2d9687;
}
.btnGrey {
  text-align: center;
  border-radius: 5px;
  width: 220px;
  height: 40px;
  line-height: 40px;
  color: white;
  background-color: #757575;
}
.btnOutGreen {
  width: 335px;
  height: 45px;
  border: 3px solid #2d9687;
  border-radius: 5px;
  line-height: 45px;
  font-size: 18px;
  text-align: center;
}
.borderGreen {
  border: 3px solid #2d9687;
  width: 910px;
}
.iconDimension {
  width: 120px;
}
.footer-bg {
  background-image: url("../../public/footer.jpg");
  background-size: inherit;
  background-position: bottom;
}
.selectBoxDiv {
  border: 1px solid #757575;
}
.countryTag {
  background-color: #dedede;
  color: #626262;
  display: inline;
  border-radius: 50px;
}
.selectedPartner {
  width: 98%;
  height: 240px;
  border: 1px dashed #c4c4c4;
}
</style>
