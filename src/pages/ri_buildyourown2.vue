<template>
  <div class="container shadow-2 bg-white" style="color: #757575">
    <ri-header :menu="3"></ri-header>
    <div style="height: 900px">
      <div>
        <input-section
          @start-btn="startBtn"
          @reset-start-btn="resetStartBtn"
          @show-dataavail-chart="showDataAvailChart"
          @change-integration-type="changeIntegrationType"
        />
      </div>
    </div>
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
          :disaggregation="input.disaggregation"
          @change-disaggregation="changeDisaggraegation"
        ></select-desired>
      </div>
      <div v-show="input.disaggregation == 'country'">
        <main-linechart
          :data="countryFullList"
          :report="countryReportList"
          :input="input"
        ></main-linechart>
        <spider-web :input="input"></spider-web>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri_header";
import myFooter from "../components/footer";
import inputSection from "../components/ri/buildyourown/input_section";
import fourBar from "../components/ri/ri_fourbar";
import selectDesired from "../components/ri/ri_select_desired_level";
import mainLinechart from "../components/ri/buildyourown/main_linechart";
import spiderWeb from "../components/ri/buildyourown/spiderweb";
export default {
  components: {
    riHeader,
    myFooter,
    inputSection,
    fourBar,
    selectDesired,
    mainLinechart,
    spiderWeb,
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
    showDataAvailChart() {},
    changeIntegrationType() {},
    async calFourBarChart() {
      let data = {
        economic: this.countryPartnerList,
        year: this.input.year.max,
        type: this.input.type,
      };
      let url = this.ri_api + "fourbar_intra.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.fourBarData = res.data;
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
