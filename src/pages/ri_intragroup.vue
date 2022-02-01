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
          <four-bar
            :type="input.type"
            :year="input.year.max"
            :data="fourBarData"
          ></four-bar>
        </div>
        <hr />
        <select-desired
          :input="input"
          @change-disaggregation="changeDisaggraegation"
        ></select-desired>
      </div>
      <div v-show="input.disaggregation == 'country'">
        <!-- change line chart input -->
        <main-linechart :data="countryFullList" :input="input"></main-linechart>

        <hr />
        <!-- <economy-circle :data="countryFullList" :input="input"></economy-circle> -->
      </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri_header";
import inputSection from "../components/ri/intragroup/input_section";
import myFooter from "../components/footer";
import dimensionsIcon from "../components/ri/ri_dimensions_icon";
import circleAvail from "../components/ri/ri_data_avail_circle";
import fourBar from "../components/ri/ri_fourbar";
import selectDesired from "../components/ri/ri_select_desired_level";
// import selectItem from "../components/ri_selectitem";

import mainLinechart from "../components/ri/ri_main_linechart";
import economyCircle from "../components/ri/ri_economy_circle";
import dataAvailbar from "../components/ri/ri_intra_bycountry_avaliable";
import weightBycountry from "../components/ri/ri_intra_bycountry_weight";

import dimensionLinechart from "../components/ri/ri_intra_bydimension_line";
import dimensionGroupbar from "../components/ri/ri_intra_bydimension_groupbar";
import dimensionIndicator from "../components/ri/ri_intra_bydimension_indicator";
import Axios from "axios";
// import { visibility } from 'html2canvas/dist/types/css/property-descriptors/visibility';
export default {
  components: {
    riHeader,
    myFooter,
    inputSection,

    fourBar,
    selectDesired,
    circleAvail,
    mainLinechart,
    dimensionsIcon,
    economyCircle,
    dataAvailbar,
    weightBycountry,
    dimensionLinechart,
    dimensionGroupbar,
    dimensionIndicator
  },
  data() {
    return {
      countryFullList: [],
      input: {
        partner: [],
        year: {
          min: 2012,
          max: 2020
        },
        type: "Sustainable",
        disaggregation: "country"
      },
      showResultAfterStartBtn: false,

      dataAvailCircleChart: {
        showChart: false,
        score: 0
      },
      fourBarData: []
      // yourScore: 0.74, //คะแนนของตัวเองใน 4 bar
      // viewType: "A", //A = By country, B= by dimension
      // lineChartByCountryData: [
      //   {
      //     name: "Your group",
      //     data: [0.82, 0.84, 0.87, 0.88, 0.9, 0.91],
      //   },
      //   {
      //     name: "Singapore",
      //     data: [0.9, 0.92, 0.92, 0.93, 0.94, 0.96],
      //   },
      //   {
      //     name: "China",
      //     data: [0.75, 0.78, 0.79, 0.81, 0.82, 0.92],
      //   },
      //   {
      //     name: "Brazil",
      //     data: [0.63, 0.67, 0.8, 0.82, 0.87, 0.9],
      //   },
      //   {
      //     name: "Paraguay",
      //     data: [0.56, 0.59, 0.63, 0.7, 0.72, 0.87],
      //   },
      //   {
      //     name: "Ecuador",
      //     data: [0.56, 0.59, 0.63, 0.8, 0.85, 0.86],
      //   },
      //   {
      //     name: "Argentina",
      //     data: [0.43, 0.5, 0.53, 0.55, 0.57, 0.79],
      //   },
      //   {
      //     name: "Bolivia",
      //     data: [0.53, 0.5, 0.63, 0.65, 0.67, 0.69],
      //   },
      //   {
      //     name: "Chille",
      //     data: [0.43, 0.6, 0.63, 0.65, 0.67, 0.69],
      //   },
      //   {
      //     name: "Uruguay",
      //     data: [0.53, 0.6, 0.63, 0.65, 0.67, 0.69],
      //   },
      // ],
      // lineChartByDimensionData: [
      //   {
      //     name: "Your group",
      //     data: [0.53, 0.6, 0.63, 0.65, 0.67, 0.69],
      //   },
      //   {
      //     name: "Trade and investment",
      //     data: [0.82, 0.84, 0.87, 0.88, 0.9, 0.91],
      //   },
      //   {
      //     name: "Financial integration",
      //     data: [0.9, 0.92, 0.92, 0.93, 0.94, 0.96],
      //   },
      //   {
      //     name: "Regional value chain integration",
      //     data: [0.75, 0.78, 0.79, 0.81, 0.82, 0.92],
      //   },
      //   {
      //     name: "Infrastructure integration",
      //     data: [0.63, 0.67, 0.8, 0.82, 0.87, 0.9],
      //   },
      //   {
      //     name: "Movement of peolple",
      //     data: [0.56, 0.59, 0.63, 0.7, 0.72, 0.87],
      //   },
      //   {
      //     name: "Regulatory cooperation",
      //     data: [0.56, 0.59, 0.63, 0.8, 0.85, 0.86],
      //   },
      //   {
      //     name: "Digital economy",
      //     data: [0.43, 0.5, 0.53, 0.55, 0.57, 0.79],
      //   },
      // ],
    };
  },
  methods: {
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
        economic: this.countryPartnerList
      };
      let url = this.ri_api + "circle_intra.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.dataAvailCircleChart.score = Number(res.data);
    },

    async calFourBarChart() {
      let data = {
        economic: this.countryPartnerList,
        year: this.input.year.max,
        type: this.input.type
      };
      let url = this.ri_api + "fourbar_intra.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.fourBarData = res.data;
    }
  },
  async mounted() {
    // await this.getCountryList();
    // this.loadPeriod();
  }
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
