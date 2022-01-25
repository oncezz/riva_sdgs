<template>
  <div class="container shadow-2 bg-white" style="color:#757575">
    <ri-header :menu="1"></ri-header>

    <!-- //Row 1 -->
    <div class="row q-pa-md">
      <div class="col-3">
        <div class="font-16"><b>Integration type</b></div>
        <div>Select the desired type of integration</div>
      </div>
      <div class="col row">
        <div>
          <div
            :class="input.type == 'A' ? 'btnGreen' : 'btnGrey'"
            @click="changeA()"
            class="cursor-pointer"
          >
            Sustainable Integration
          </div>
        </div>
        <div class="q-px-md">
          <div
            :class="input.type == 'B' ? 'btnGreen' : 'btnGrey'"
            @click="changeB()"
            class="cursor-pointer"
          >
            Conventional Integration
          </div>
        </div>
      </div>
    </div>

    <!-- Row 2 -->
    <dimensions-icon :type="input.type"></dimensions-icon>

    <!-- Control Panel -->
    <div class="row ">
      <div class="col-6 q-pa-md">
        <br />
        <div class="font-16"><b>Economies</b></div>
        <div>
          Select two or more economies of interest or a pre-selected group.
        </div>
        <div>
          <q-select
            :options="countryOptions"
            v-model="input.partner"
            multiple
            use-chips
            stack-label
            dense
            style="width:90%"
          />
        </div>
        <br />
        <div class="font-16"><b>Period</b></div>
        <div style="width: 250px;" class="row">
          <div class="col-6">
            <div>Start</div>
            <div>
              <q-select
                dense
                :options="year"
                v-model="input.startYear"
                style="width:80px;"
              />
            </div>
          </div>
          <div class="col-6">
            <div>End</div>
            <div>
              <q-select
                dense
                :options="year"
                v-model="input.endYear"
                style="width:80px;"
              />
            </div>
          </div>
        </div>
        <br />
      </div>
      <!------ right side -------->
      <div class="col-6 q-pa-md">
        <circle-avail
          :score="circleChartData.score"
          :type="circleChartData.type"
        ></circle-avail>
        <div align="center">
          Click here to see this group’s availablitiy matrix
        </div>
        <br />
      </div>
      <!-- start Btn  -->
      <div class="q-pb-xl" align="center" style="width:100%">
        <div class="btnOutGreen cursor-pointer" @click="startBtn()">
          Start
        </div>
      </div>
      <br />
    </div>
    <!-- Result -->
    <div v-if="showResult" class="q-pa-md">
      <!-- 4 bar result -->
      <div>
        <hr />

        <div>
          <four-bar
            :type="input.type"
            :year="input.endYear"
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
        <div v-if="viewType == 'A'">
          See how each country is integrated with the group
        </div>
        <div v-else>
          See how each dimension is integrated with the group
        </div>
      </div>
      <br />
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
        <div><u>Click here to see this group’s availablility matrix</u></div>
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
        :data="input.partner"
        :year="input.endYear"
      ></data-availbar>
      <weight-bycountry
        v-else
        :data="input.partner"
        :year="input.endYear"
      ></weight-bycountry>
      <economy-circle
        :type="input.type"
        :data="input.partner"
        :year="input.endYear"
      ></economy-circle>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri_header";
import myFooter from "../components/footer";
import fourBar from "../components/ri/ri_fourbar";
import selectItem from "../components/ri_selectitem";
import circleAvail from "../components/ri/ri_data_avail_circle";
import mainLinechart from "../components/ri/ri_main_linechart";
import dimensionsIcon from "../components/ri/ri_dimensions_icon";
import economyCircle from "../components/ri/ri_economy_circle";
import dataAvailbar from "../components/ri/ri_intra_bycountry_avaliable";
import weightBycountry from "../components/ri/ri_intra_bycountry_weight";
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
    weightBycountry
  },
  data() {
    return {
      countryOptions: [],
      input: {
        partner: [],
        startYear: "2014",
        endYear: "2019",
        type: "A"
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
        type: 2, //  type=1  country <2 , type=2 show circle
        score: 70
      },
      fourBarData: [
        {
          name: "China-Mongolia",
          value: 0.91,
          own: false
        },
        {
          name: "ASEAN",
          value: 0.81,
          own: false
        },
        {
          name: "Your group",
          value: 0.74,
          own: true
        },
        {
          name: "Asia-Pacific",
          value: 0.56,
          own: false
        }
      ],
      viewType: "A", //A = By country, B= by dimension
      lineChartByCountryData: [
        {
          name: "Your group",
          data: [0.82, 0.84, 0.87, 0.88, 0.9, 0.91]
        },
        {
          name: "Singapore",
          data: [0.9, 0.92, 0.92, 0.93, 0.94, 0.96]
        },
        {
          name: "China",
          data: [0.75, 0.78, 0.79, 0.81, 0.82, 0.92]
        },
        {
          name: "Brazil",
          data: [0.63, 0.67, 0.8, 0.82, 0.87, 0.9]
        },
        {
          name: "Paraguay",
          data: [0.56, 0.59, 0.63, 0.7, 0.72, 0.87]
        },
        {
          name: "Ecuador",
          data: [0.56, 0.59, 0.63, 0.8, 0.85, 0.86]
        },
        {
          name: "Argentina",
          data: [0.43, 0.5, 0.53, 0.55, 0.57, 0.79]
        },
        {
          name: "Bolivia",
          data: [0.53, 0.5, 0.63, 0.65, 0.67, 0.69]
        },
        {
          name: "Chille",
          data: [0.43, 0.6, 0.63, 0.65, 0.67, 0.69]
        },
        {
          name: "Uruguay",
          data: [0.53, 0.6, 0.63, 0.65, 0.67, 0.69]
        }
      ]
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
          label: res.data[i].name
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
        x => x.type == this.input.type && x.dimensionId == this.showDim
      );
    }
  },
  async mounted() {
    await this.getCountryList();
    await this.loadDimension();
    await this.loadIndicator();
  }
};
</script>

<style lang="scss" scoped>
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
.showCircular {
  height: 450px;
  line-height: 450px;
}
.notShowCircular {
  height: 450px;
  line-height: 450px;
  background: #e8e4e4;
}
</style>
