<template>
  <div class="container shadow-2 bg-white" style="color: #757575">
    <ri-header :menu="1"></ri-header>

    <!-- //Row 1 -->
    <div class="row">
      <div class="col q-px-xl q-pt-xl">
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
              @input="changeInputTypeA()"
            />
          </div>
          <q-radio
            v-model="input.type"
            val="B"
            label="Conventional Integration"
            color="secondary"
            @input="changeInputTypeB()"
          />
        </div>

        <!-- Input Panel -->

        <br />
        <div class="font-16"><b>Period</b></div>
        <div class="q-pt-md" align="center">
          <q-range
            v-model="input.year"
            marker-labels
            :min="period.min"
            :max="period.max"
            label-always
            markers
            style="width: 95%"
            color="secondary"
            @input="resetStart()"
          />
        </div>
        <div class="q-pt-md font-16"><b>Economies</b></div>
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
            style="width: 98%"
            @input="checkPartnerCountry()"
          />
        </div>
        <br />
        <div class="selectedPartner">
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
import dimensionIndicator from "../components/ri/ri_intra_bydimension_indicator";
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
    dimensionIndicator,
  },
  data() {
    return {
      countryOptions: [],
      countryPartnerList: [],
      period: {
        min: 2000,
        max: 2020,
      },
      input: {
        partner: [],
        year: {
          min: 2012,
          max: 2020,
        },
        type: "A",
      },

      showResult: false, //แสดงคำตอบ
      // yourScore: 0.74, //คะแนนของตัวเองใน 4 bar
      circleChartData: {
        //  circle Data availability
        type: 1, //  type=1  country <2 , type=2 show circle
        score: 0,
      },
      fourBarData: [],
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
    //Return type name form type = A =>Sustainable integration, type=B=> Conventional integration
    typeName(type) {
      return type == "A"
        ? "Sustainable integration"
        : "Conventional integration";
    },
    //เมื่อมีการเปลี่ยนแปลง input จะทำการ reset start
    resetStart() {
      this.showResult = false;
    },
    //ปุ่ม start
    startBtn() {
      if (this.countryPartnerList.length >= 2) {
        this.showResult = true;
        this.loadFourBarChart();
      } else {
        this.notifyRed("Please select two or more economies");
      }
    },
    async loadFourBarChart() {
      let data = {
        economic: this.countryPartnerList,
      };
      let url = this.ri_api + "fourbar_intra.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.fourBarData = res.data;
    },
    //เลือกเป็น sustainable integration
    changeInputTypeA() {
      this.input.type = "A";
      this.resetStart();
    },
    //เลือกเป็น Conventional integration
    changeInputTypeB() {
      this.input.type = "B";
      this.resetStart();
    },

    //คำนวนกราฟวงกลม data available
    async calPieChart() {
      this.circleChartData.type = 2;
      let data = {
        economic: this.countryPartnerList,
      };
      let url = this.ri_api + "circle_intra.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.circleChartData.score = Number(res.data);
    },

    //ทำการแสดงชื่อประเทศทั้งหมดในกลุ่ม
    checkPartnerCountry() {
      this.showResult = false;
      this.countryPartnerList = [];
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
        this.countryPartnerList.push(inputCountry);
      });
      this.countryPartnerList.sort((a, b) => (a.label > b.label ? 1 : -1));
      if (this.countryPartnerList.length >= 2) {
        this.calPieChart();
      } else {
        this.circleChartData.type = 1;
      }
    },

    //โหลดปีที่มีข้อมูล
    async loadPeriod() {
      let url = this.ri_api + "period_start_end.php";
      let res = await axios.get(url);
      this.period.min = Number(res.data.start);
      this.period.max = Number(res.data.end);
      this.input.year.min = Number(res.data.start);
      this.input.year.max = Number(res.data.end);
    },
  },
  async mounted() {
    await this.getCountryList();
    this.loadPeriod();
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
