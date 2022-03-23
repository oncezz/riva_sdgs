<template>
  <div class="container shadow-2 bg-white" style="color: #757575">
    <ri-header :menu="3"></ri-header>
    <div style="height: 900px">
      <div>
        <input-section
          @start-btn="startBtn"
          @reset-start-btn="resetStartBtn"
          @change-integration-type="changeIntegrationType"
        />
      </div>
    </div>
    <div v-if="showResultAfterStartBtn" class="">
      <div>
        <hr />
        <div>
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
      </div>
      <div v-if="input.disaggregation == 'country'">
        <main-linechart
          :data="countryFullList"
          :report="countryReportList"
          :input="input"
        ></main-linechart>
        <spider-web :input="input" :data="countryFullList"></spider-web>
      </div>
      <!-- by dimension  -->
      <div v-else>
        <line-chart-dimension
          :data="countryFullList"
          :input="input"
        ></line-chart-dimension>
        <dimension-tab :input="input" :data="countryFullList"></dimension-tab>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri/main/ri_header";
import myFooter from "../components/footer";
import inputSection from "../components/ri/buildyourown/input_section";
import fourBar from "../components/ri/main/ri_fourbar";
import selectDesired from "../components/ri/main/ri_select_desired_level";
import mainLinechart from "../components/ri/buildyourown/main_linechart";
import spiderWeb from "../components/ri/buildyourown/spiderweb";
import lineChartDimension from "../components/ri/buildyourown/linechart_by_dimension";
import dimensionTab from "../components/ri/buildyourown/datatab_dimension";

export default {
  components: {
    riHeader,
    myFooter,
    inputSection,
    fourBar,
    selectDesired,
    mainLinechart,
    spiderWeb,
    lineChartDimension,
    dimensionTab,
  },
  data() {
    return {
      countryFullList: [],
      countryReportList: [],
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
    startBtn(inputSend) {
      this.showResultAfterStartBtn = true;
      this.countryFullList = inputSend.countryFullList;
      this.countryReportList = inputSend.reportingList;
      this.input = inputSend.input;
      this.calFourBarChart();
    },
    resetStartBtn() {
      this.showResultAfterStartBtn = false;
    },
    convertDimensionToArray(dim) {
      let dimGet = dim.map((x) => x.picked);
      let dimReturn = [];
      dimGet.forEach((item, index) => {
        if (item) {
          dimReturn.push(index + 1);
        }
      });
      return dimReturn;
    },
    async calFourBarChart() {
      let labelName = "Your Group";
      if (this.input.reporting.length == 1) {
        labelName = this.input.reporting[0].label;
      }

      this.fourBarName = labelName;
      let dimUse = this.convertDimensionToArray(this.input.dimensionPicked);
      let data = {
        name: labelName,
        reporting: this.countryReportList.map((x) => x.iso),
        partner: this.countryFullList.map((x) => x.iso),
        year: this.input.year.max,
        type: this.input.type,
        dimension: dimUse,
      };
      // console.log(data);
      let url = this.ri_api + "buildyourown/fivebar_onlyyourgroup_build.php";
      let res = await axios.post(url, JSON.stringify(data));
      console.log(res.data);
      let rawData = res.data;
      let score = 0;
      let pairScore = [];
      let dimPass = data.dimUse.length / 2;
      data.reporting.forEach((reporting) => {
        data.partner.forEach((partner) => {
          let dataTemp = rawData.filter(
            (x) => x.reporter == reporting && x.partner == partner
          );
          if (dataTemp.length >= dimPass) {
            score += dataTemp.reduce((sum, x) => sum + x, 0) / dataTemp.length;
          }
          // console.log("xxxx" + dataTemp);
        });
      });

      // this.fourBarData = res.data;
    },
    changeIntegrationType(integrationType) {
      this.input.type = integrationType;
    },
    changeDisaggraegation(type) {
      this.input.disaggregation = type;
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-bg {
  background-image: url("../../public/footer.jpg");
  background-size: inherit;
  background-position: bottom;
}
</style>
