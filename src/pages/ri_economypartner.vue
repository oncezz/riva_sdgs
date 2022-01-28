<template>
  <div class="container shadow-2 bg-white" style="color: #757575">
    <ri-header :menu="2"></ri-header>

    <!-- //Row 1 -->
    <div class="row">
      <div class="col q-px-xl q-pt-xl">
        <!-- Integration type -->
        <div class="row">
          <div class="col-4">
            <div class="font-16"><b>Integration type</b></div>
            <div>Select the desired type of integration</div>
          </div>
          <div class="col-3">
            <q-radio
              v-model="input.type"
              val="A"
              label="Sustainable Integration"
              color="secondary"
              @input="showIndicator()"
            />
          </div>
          <q-radio
            v-model="input.type"
            val="B"
            label="Conventional Integration"
            color="secondary"
            @input="showIndicator()"
          />
        </div>

        <!-- Input Panel -->
        <!-- Period input -->
        <br />
        <div class="font-16"><b>Period</b></div>
        <div class="q-pt-md" align="center">
          <q-range
            v-model="input.year"
            marker-labels
            :min="2008"
            :max="2022"
            label-always
            markers
            style="width: 95%"
            color="secondary"
          />
        </div>
        <!-- Reporting economy -->
        <div class="q-pt-md font-16"><b>Reporting economy(ies)</b></div>
        <div>
          Select one, many or pre-selected group of reporting economies of interest.
        </div>
        <div>
          <q-select
            :options="countryOptions"
            v-model="input.reporting"
            multiple
            use-chips
            stack-label
            dense
            style="width: 98%"
            @input="checkReportCountry()"
          />
        </div>
        <br />
         <!-- Partner economy -->
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
            @input="checkPartnerCountry()"
          />
        </div>
        <br>
        <!-- Selected reporting Country -->
        <div class="selectedPartner">
          <div class="font-16"><b>Selected reporting economy(ies)</b></div>
          <div class="q-pt-sm">
            <div class="row" style="width: 90%">
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
                v-for="(item, index) in countryPartnerList"
                :key="index"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
        <!-- start Btn  -->

        <div class="q-py-xl" align="center" style="width: 100%">
          <div class="startBtn" @click="startBtn()">Start</div>
        </div>
      </div>

      <!--///////// right side //////// -->
      <div class="col-4" style="background: #ededed">
        <dimensions-icon :type="input.type"></dimensions-icon>
        <circle-avail
          :score="circleChartData.score"
          :type="circleChartData.type"
        ></circle-avail>
        <div align="center">
          Click here to see this group’s availablitiy matrix
        </div>
      </div>
    </div>

    <!-- Result -->
    <div v-if="showResult" class="q-pa-md">
      <!-- 4 bar result -->
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
      </div>
      <!-- select type btn -->
      <div align="center">
        <div>Select desired level of disaggregation</div>
        <br />
        <div class="row justify-center">
          <div align="center">
            <div
              :class="viewType == 'A' ? 'btnGreen' : 'btnGrey'"
              @click="changeViewA()"
              class="cursor-pointer"
            >
              By country
            </div>
          </div>
          <div class="q-px-md" align="center">
            <div
              :class="viewType == 'B' ? 'btnGreen' : 'btnGrey'"
              @click="changeViewB()"
              class="cursor-pointer"
            >
              By dimension
            </div>
          </div>
        </div>
        <br />
        <!--///////////// view A Type  ///////////-->
        <div v-if="viewType == 'A'">
          <div>How did Singapore's integration with this group progress across yet? - group and individual economies</div>
          <div>Since 2014, Singapore's integration with group's increased by 35%. In 2019, Singapore was most integrated with China and Brazil
            and least with Uruguay Venezuela
          </div>
          <!-- chart view  -->
          <div class="row items-end">
            <div class="col-1"></div>
            <div class="q-px-xs" align="center">
              <div
                :class="showTypeChart == 'A' ? 'btnGreen' : 'btnGrey'"
                @click="chartView('A')"
                class="cursor-pointer"
              >
                Index
              </div>
            </div>
            <div class="q-px-xs" align="center">
              <div
                :class="showTypeChart == 'B' ? 'btnGreen' : 'btnGrey'"
                @click="chartView('B')"
                class="cursor-pointer"
              >
                Data availablity
              </div>
            </div>
            <div class="q-px-xs" align="center">
              <div
                :class="showTypeChart == 'C' ? 'btnGreen' : 'btnGrey'"
                @click="chartView('C')"
                class="cursor-pointer"
              >
                Weights
              </div>
            </div>
            <div class="col"></div>
            <div>
              <u>Click here to see this group’s availablility matrix</u>
            </div>
            <div class="col-1"></div>
          </div>
          <br />
          <!-- Line chart for by country  -->
          <main-linechart
            v-if="showTypeChart == 'A'"
            :input="input"
            :data="lineChartByCountryData"
          ></main-linechart>
          <data-availbar
            v-else-if="showTypeChart == 'B'"
            :data="countryPartnerList"
            :year="input.year.max"
          ></data-availbar>
          <weight-bycountry
            v-else
            :data="countryPartnerList"
            :year="input.year.max"
          ></weight-bycountry>
          <economy-circle
            :type="input.type"
            :data="countryPartnerList"
            :year="input.year.max"
          ></economy-circle>
        </div>
        <!--///////////// view B Type  ///////////-->
        <div v-else>
          <div>See how each dimension is integrated with the group</div>
          <!-- chart view  -->
          <dimension-linechart
            :input="input"
            :data="lineChartByDimensionData"
          ></dimension-linechart>
          <hr />
          <dimension-groupbar
            :input="input"
            :data="lineChartByDimensionData"
          ></dimension-groupbar>
        </div>
      </div>
      <br />
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri_header";
import myFooter from "../components/footer";
import fourBar from "../components/ri/ri_fourbar";
import selectItem from "../components/ri_selectitem";
import dimensionsIcon from "../components/ri/ri_dimensions_icon";
import circleAvail from "../components/ri/ri_data_avail_circle";

import mainLinechart from "../components/ri/ri_main_linechart";
import economyCircle from "../components/ri/ri_economy_circle";
import dataAvailbar from "../components/ri/ri_intra_bycountry_avaliable";
import weightBycountry from "../components/ri/ri_intra_bycountry_weight";

import dimensionLinechart from "../components/ri/ri_intra_bydimension_line";
import dimensionGroupbar from "../components/ri/ri_intra_bydimension_groupbar";
import Axios from "axios";
// import { visibility } from 'html2canvas/dist/types/css/property-descriptors/visibility';
export default {
  components: {
    riHeader,
    myFooter,
    fourBar,
    selectItem,
    circleAvail,
    mainLinechart,
    dimensionsIcon,
    economyCircle,
    dataAvailbar,
    weightBycountry,
    dimensionLinechart,
    dimensionGroupbar,
  },
  data() {
    return {
      countryOptions: [],
      countryPartnerList: [],
      countryReportList:[],
      input: {
        partner: [],
        reporting: [],
        year: {
          min: 2012,
          max: 2020,
        },
        type: "A",
      },
      showTypeChart: "A",
      showDim: "",
      year: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
      dimensionList: [],
      indicatorList: [],
      indicatorShow: [],
      showResult: false, //แสดงคำตอบ
      yourScore: 0.74, //คะแนนของตัวเองใน 4 bar
      circleChartData: {
        //  circle Data availability
        type: 1, //  type=1  country <2 , type=2 show circle
        score: 0,
      },
      fourBarData: [
        {
          name: "China-Mongolia",
          value: 0.91,
          own: false,
        },
        {
          name: "ASEAN",
          value: 0.81,
          own: false,
        },
        {
          name: "Your group",
          value: 0.74,
          own: true,
        },
        {
          name: "Asia-Pacific",
          value: 0.56,
          own: false,
        },
      ],
      viewType: "A", //A = By country, B= by dimension
      lineChartByCountryData: [
        {
          name: "Your group",
          data: [0.82, 0.84, 0.87, 0.88, 0.9, 0.91],
        },
        {
          name: "Singapore",
          data: [0.9, 0.92, 0.92, 0.93, 0.94, 0.96],
        },
        {
          name: "China",
          data: [0.75, 0.78, 0.79, 0.81, 0.82, 0.92],
        },
        {
          name: "Brazil",
          data: [0.63, 0.67, 0.8, 0.82, 0.87, 0.9],
        },
        {
          name: "Paraguay",
          data: [0.56, 0.59, 0.63, 0.7, 0.72, 0.87],
        },
        {
          name: "Ecuador",
          data: [0.56, 0.59, 0.63, 0.8, 0.85, 0.86],
        },
        {
          name: "Argentina",
          data: [0.43, 0.5, 0.53, 0.55, 0.57, 0.79],
        },
        {
          name: "Bolivia",
          data: [0.53, 0.5, 0.63, 0.65, 0.67, 0.69],
        },
        {
          name: "Chille",
          data: [0.43, 0.6, 0.63, 0.65, 0.67, 0.69],
        },
        {
          name: "Uruguay",
          data: [0.53, 0.6, 0.63, 0.65, 0.67, 0.69],
        },
      ],
      lineChartByDimensionData: [
        {
          name: "Your group",
          data: [0.53, 0.6, 0.63, 0.65, 0.67, 0.69],
        },
        {
          name: "Trade and investment",
          data: [0.82, 0.84, 0.87, 0.88, 0.9, 0.91],
        },
        {
          name: "Financial integration",
          data: [0.9, 0.92, 0.92, 0.93, 0.94, 0.96],
        },
        {
          name: "Regional value chain integration",
          data: [0.75, 0.78, 0.79, 0.81, 0.82, 0.92],
        },
        {
          name: "Infrastructure integration",
          data: [0.63, 0.67, 0.8, 0.82, 0.87, 0.9],
        },
        {
          name: "Movement of peolple",
          data: [0.56, 0.59, 0.63, 0.7, 0.72, 0.87],
        },
        {
          name: "Regulatory cooperation",
          data: [0.56, 0.59, 0.63, 0.8, 0.85, 0.86],
        },
        {
          name: "Digital economy",
          data: [0.43, 0.5, 0.53, 0.55, 0.57, 0.79],
        },
      ],
    };
  },
  methods: {
    //Return type name form type = A =>Sustainable integration, type=B=> Conventional integration
    typeName(type) {
      return type == "A"
        ? "Sustainable integration"
        : "Conventional integration";
    },
    chartView(type) {
      this.showTypeChart = type;
    },
    startBtn() {
      this.showResult = true;
    },
    changeViewA() {
      this.viewType = "A";
    },
    changeViewB() {
      this.viewType = "B";
    },
    changeA() {
      this.input.type = "A";
      this.showIndicator();
    },
    changeB() {
      this.input.type = "B";
      this.showIndicator();
    },
    async loadDimension() {
      this.dimensionList = [];
      let url = this.path_api2 + "/ri_showdimension.php";
      let res = await axios.get(url);
      for (let i = 0; i < res.data.length; i++) {
        let temp = {
          value: res.data[i].id,
          label: res.data[i].name,
        };
        this.dimensionList.push(temp);
      }
      this.showDim = this.dimensionList[0].value;
    },
    async loadIndicator() {
      this.indicatorList = [];
      let url = this.path_api2 + "/ri_showindicator.php";
      let res = await axios.get(url);
      this.indicatorList = res.data;
      this.showIndicator();
    },
    showIndicator() {
      this.indicatorShow = [];
      this.indicatorShow = this.indicatorList.filter(
        (x) => x.type == this.input.type && x.dimensionId == this.showDim
      );
    },
    calPieChart() {
      this.circleChartData.type = 2;
      this.circleChartData.score = Math.floor(Math.random() * 101);
    },
    checkPartnerCountry() {
      this.showResult = false;
      this.countryPartnerList = [];
      let countryPartyTemp = [];
      let iso = this.input.partner.map((x) => x.iso);

      // check country group list
      iso.forEach((isoData) => {
        let tempList = this.countryGroupList(isoData);
        countryPartyTemp = countryPartyTemp.concat(tempList);
      });

      //duplicate array
      let countryListNoDup = [...new Set(countryPartyTemp)];

      // turn into OBJ
      countryListNoDup.forEach((x) => {
        let temp = this.countryOptions.filter((y) => y.iso == x);
        let inputCountry = {
          label: temp[0].label,
          iso: temp[0].iso,
        };
        this.countryPartnerList.push(inputCountry);
      });
      this.countryPartnerList.sort((a, b) => (a.label > b.label ? 1 : -1));
       if (this.countryReportList.length >= 1 && this.countryPartnerList.length >=1) {
        this.calPieChart();
      } else {
        this.circleChartData.type = 1;
      }
    },
    checkReportCountry(){

     this.showResult = false;
      this.countryReportList = [];
      let countryPartyTemp = [];
      let iso = this.input.reporting.map((x) => x.iso);
      
       // check country group list
      iso.forEach((isoData) => {
        let tempList = this.countryGroupList(isoData);
        countryPartyTemp = countryPartyTemp.concat(tempList);
      });

      //duplicate array
      let countryListNoDup = [...new Set(countryPartyTemp)];

      // turn into OBJ
      countryListNoDup.forEach((x) => {
        let temp = this.countryOptions.filter((y) => y.iso == x);
        let inputCountry = {
          label: temp[0].label,
          iso: temp[0].iso,
        };
        this.countryReportList.push(inputCountry);
      });
      this.countryReportList.sort((a, b) => (a.label > b.label ? 1 : -1));
      if (this.countryReportList.length >= 1 && this.countryPartnerList.length >=1) {
        this.calPieChart();
      } else {
        this.circleChartData.type = 1;
      }
    }
  },
  
  async mounted() {
    await this.getCountryList();
    await this.loadDimension();
    await this.loadIndicator();
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
