<template>
  <div class="container shadow-2" style="color:#757575">
    <ri-header :menu="1"></ri-header>
    <!-- Control Panel -->
    <div class="row ">
      <div class="col-6 q-pa-md">
        <br />
        <div class="font-16"><b>Economies</b></div>
        <div>
          Select economies to create a group (minimum 3) or choose a
          pre-selected group
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
        <div class="font-16"><b>Integration type</b></div>
        <br />
        <div class="row" align="center">
          <div align="center">
            <div
              :class="input.type == 'A' ? 'btnGreen' : 'btnGrey'"
              @click="changeA()"
              class="cursor-pointer"
            >
              Sustainable Integration
            </div>
          </div>
          <div class="q-px-md" align="center">
            <div
              :class="input.type == 'B' ? 'btnGreen' : 'btnGrey'"
              @click="changeB()"
              class="cursor-pointer"
            >
              Conventional Integration
            </div>
          </div>
        </div>
        <br />
        <div align="center">
          <div class="btnOutGreen cursor-pointer" @click="startBtn()">
            Start
          </div>
        </div>
      </div>
      <div class="col-6 q-pa-md">
        <br />
        <div class="font-16" v-show="input.type == 'A'">
          <b>Sustainable Integration Indicators</b>
        </div>
        <div class="font-16" v-show="input.type == 'B'">
          <b>Conventional Integration Indicators</b>
        </div>
        <div class="font-12">
          Click on any dimension to reveal included indicators
        </div>
        <div>
          <q-select
            dense
            v-model="showDim"
            style="width:90%"
            :options="dimensionList"
            emit-value
            map-options
            @input="showIndicator()"
          />
        </div>
        <div>
          <ul>
            <li v-for="(item, index) in indicatorShow" :key="index">
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Result -->
    <div v-if="showResult" class="q-ma-md">
      <!-- 4 bar result -->
      <div>
        <hr />
        <div class="q-pt-sm">
          Your group's
          <span v-if="input.type == 'A'">sustainable</span
          ><span v-else>conventional</span> Integration score in
          {{ input.endYear }} was
          <span class="text-green"
            ><b>{{ 0.74 }}</b></span
          >
        </div>
        <div>
          <four-bar :data="fourBarData"></four-bar>
        </div>
        <hr />
      </div>
      <!-- select type btn -->
      <div class="row">
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
      <div v-if="viewType == 'A'">
        See how each country is integrated with the group
      </div>
      <div v-else>
        See how each dimension is integrated with the group
      </div>
      <br />
      <!-- Line chart for by country  -->
      <div
        id="lineChartByCountry"
        style="max-width:1024px; width:100%; margin:auto;"
      ></div>
      <br />
      <!-- country box selected -->
      <div class="selectBoxDiv q-pa-sm">
        <div class="font-18 "><b>Select economies of interst</b></div>
        <div class="">
          Number in parentheses are
          <span v-if="input.type == 'A'">Sustainable</span
          ><span v-else>Conventional</span> Integration Index from the
          {{ input.endYear }}
        </div>
        <div>Click on each country to select / unselect it in the graph</div>
        <div>
          <select-item
            colorBox="#b02054"
            name="Group average"
            value="0.83"
          ></select-item>
        </div>
        <div><hr /></div>
      </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri_header";
import myFooter from "../components/footer";
import fourBar from "../components/ri_fourbar";
import selectItem from "../components/ri_selectitem";
import Axios from "axios";
export default {
  components: {
    riHeader,
    myFooter,
    fourBar,
    selectItem
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
      showDim: "",
      year: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
      dimensionList: [],
      indicatorList: [],
      indicatorShow: [],
      showResult: true, //แสดงคำตอบ
      yourScore: 0.74, //คะแนนของตัวเองใน 4 bar
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
    LineChartByCountry() {
      let yAxisLabel = "";
      if (this.input.type == "A") {
        yAxisLabel = "Sustainable Integration Index";
      } else {
        yAxisLabel = "Conventional Integration Index";
      }
      console.log(this.lineChartByCountryData[0].data[0]);

      let subTitle =
        "Since " +
        this.input.startYear +
        ", this group's Integration increased by";

      Highcharts.chart("lineChartByCountry", {
        chart: {
          height: (9 / 16) * 100 + "%", // 16:9 ratio
          style: { fontFamily: "roboto" }
        },
        title: {
          text:
            "How did Integration progress across year? - group and individual economics"
        },

        subtitle: {
          text: subTitle
        },

        yAxis: {
          title: {
            text: yAxisLabel
          },
          min: 0,
          max: 1
        },
        xAxis: {
          accessibility: {
            rangeDescription: "Range: 2010 to 2017"
          },
          tickInterval: 1
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle"
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: true
            },
            pointStart: Number(this.input.startYear),
            pointInterval: 1
          }
        },

        series: this.lineChartByCountryData,

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
                }
              }
            }
          ]
        }
      });
    },

    startBtn() {
      this.showResult = true;
    },
    changeViewA() {
      this.viewType = "A";
      this.LineChartByCountry();
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
  width: 220px;
  height: 45px;
  border: 3px solid #2d9687;
  border-radius: 5px;
  line-height: 45px;
  font-size: 18px;
  text-align: center;
}
.footer-bg {
  background-image: url("../../public/footer.jpg");
  background-size: inherit;
  background-position: bottom;
}
.selectBoxDiv {
  border: 1px solid #757575;
}
</style>
