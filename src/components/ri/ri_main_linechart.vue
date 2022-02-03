<template>
  <div class="q-pa-md bg-white" style="width: 100%">
    <div class="font-graph q-pb-md">
      How did Integration progress across years? - group and individual
      economies
    </div>

    <div>
      <div class="row font-18" style="height: 65px">
        <!-- Menu #1 -->
        <div
          class="col-2 selectBoxDiv q-pt-xs cursor-pointer"
          align="center"
          :class="{ textSelected: menuSelectedId == 1 }"
          @click="selectMenuId1()"
        >
          economic's<br />
          Integration
          <div :class="{ lineGreenSelectedBox: menuSelectedId == 1 }"></div>
        </div>

        <!-- Menu #2 -->
        <div
          class="col-2 selectBoxDiv q-pt-xs cursor-pointer"
          align="center"
          @click="selectMenuId2()"
          :class="{ textSelected: menuSelectedId == 2 }"
        >
          Integration progress<br />
          across periods
          <div :class="{ lineGreenSelectedBox: menuSelectedId == 2 }"></div>
        </div>
        <div
          class="col-2 selectBoxDiv cursor-pointer"
          align="center"
          style="line-height: 58px"
          @click="selectMenuId3()"
          :class="{ textSelected: menuSelectedId == 3 }"
        >
          Data availability
          <div :class="{ lineGreenSelectedBox: menuSelectedId == 3 }"></div>
        </div>
        <div
          class="col-2 selectBoxDiv cursor-pointer"
          align="center"
          style="line-height: 58px"
          @click="selectMenuId4()"
          :class="{ textSelected: menuSelectedId == 4 }"
        >
          Weights
          <div :class="{ lineGreenSelectedBox: menuSelectedId == 4 }"></div>
        </div>
        <div
          class="col-4 selectBoxDiv q-pr-md"
          align="right"
          style="line-height: 65px"
        >
          <u>Click here to see this group's availablity matrix</u>
        </div>
      </div>
    </div>
    <div class="borderMainBox">
      <div v-show="menuSelectedId == 1">
        <div class="row">
          <div style="width: 400px" class="q-pa-md borderRight">
            <div class="font-24">Select economies of interest</div>
            <div class="font-14">
              Numbers in parsentheses are {{ input.type }} Integration Index
              form the {{ input.year.max }}
            </div>
            <div class="q-pt-md">
              Click on each country to select/unselect it in the graph.
            </div>
            <div class="row q-py-sm">
              <div
                class="checkBoxGroup"
                style="background-color: #f99704"
              ></div>
              <div class="q-pl-sm">Group average ({{ ecoIntegrationAvg }})</div>
            </div>
            <div><hr /></div>
            <div class="row">
              <div
                v-for="(item, index) in ecoIntegrationChart"
                :key="index"
                class="col-6 row q-pb-sm font-12 cursor-pointer"
                @click="toggleOnOff(index)"
              >
                <div
                  class="checkBox"
                  :style="{ backgroundColor: item.color }"
                  v-show="item.visible == true"
                ></div>
                {{ item.visible }}
                <div class="q-pl-sm row">
                  <div style="width: 100px" class="ellipsis">
                    {{ item.name }}
                  </div>
                  ({{ item.lastValue }})
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div
              id="lineChartByCountry"
              style="max-width: 1024px; width: 100%; margin: auto"
            ></div>
          </div>
        </div>
      </div>
      <div v-show="menuSelectedId == 2">x2</div>
      <div v-show="menuSelectedId == 3">x3</div>
      <div v-show="menuSelectedId == 4">x4</div>
    </div>

    <!-- <br />
    <div class="selectBoxDiv q-pa-sm" align="left">
      <div class="font-18"><b>Select economies of interst</b></div>
      <div class="">
        Number in parentheses are
        <span v-if="input.type == 'A'">Sustainable</span
        ><span v-else>Conventional</span> Integration Index from the
        {{ input.year.max }}
      </div>
      <div>Click on each country to select / unselect it in the graph</div>
      <div class="row">
        <div class="row cursor-pointer" @click="toggleGroup()">
         
          <div
            class="colorBox"
            v-if="showGroup"
            style="background: #d680ad"
          ></div>
          <div class="colorBox" v-else></div>
          <div class="q-pl-sm">Group average ({{ valueGroup }})</div>

      >
        </div>
        <div class="col"></div>
      </div>
      <div><hr /></div>
      <div class="row">
        <div
          class="q-py-sm row"
          style="width: 20%"
          v-for="(item, index) in showItem"
          :key="index"
        >
          <div class="row cursor-pointer" @click="toggleItem(index)">
            <div
              class="colorBox"
              v-if="item.visible"
              :style="{ backgroundColor: item.color }"
            ></div>
            <div class="colorBox" v-else></div>
            <div class="q-px-sm">{{ item.name }}</div>
            <div>({{ item.value }})</div>
          </div>
          <div class="col"></div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ["data", "input"],
  data() {
    return {
      menuSelectedId: 1,
      ecoIntegrationChart: [],
      ecoIntegrationChartGroup: [],
      ecoIntegrationAvg: 0,
      colorPattern: [
        "#C44D29",
        "#3E375C",
        "#3898FF",
        "#39855A",
        "#FFBF36",

        "#7A213A",
        "#C8B929",
        "#8CC969",
        "#7884AB",
        "#682B82",

        "#BF3FB3",
        "#535EAE",
        "#827C70",
        "#CC907F",
        "#B68E00",

        "#E43B44",
        "#983D16",
        "#5AA2A7",
        "#F6757A",
        "#124E89",

        "#5A3B1C",
        "#737515",
        "#BF5F7F",
        "#578B8B",
      ],
      realChartData: [],

      valueGroup: 0,
      showGroup: true,
      realChart: [],
      showItem: [],

      selected: false,
    };
  },
  methods: {
    selectMenuId1() {
      this.menuSelectedId = 1;
    },
    selectMenuId2() {
      this.menuSelectedId = 2;
    },
    selectMenuId3() {
      this.menuSelectedId = 3;
    },
    selectMenuId4() {
      this.menuSelectedId = 4;
    },
    toggleOnOff(index) {
      console.log(index);
      this.ecoIntegrationChart[index]["visible"] =
        !this.ecoIntegrationChart[index]["visible"];
      this.ecoIntegrationChart.push("temp");
      this.ecoIntegrationChart.pop();
      console.log(this.ecoIntegrationChart);
    },
    async loadEcoIntegration() {
      let data = {
        input: this.input,
        countryFullList: this.data,
      };

      //get data in economic's integration
      let url = this.ri_api + "eco_integration.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.ecoIntegrationChart = res.data;
      this.ecoIntegrationChart.sort(
        (a, b) => Number(b.lastValue) - Number(a.lastValue)
      );
      let diffYear = this.input.year.max - this.input.year.min;
      // set init
      let avgValue = [];
      for (let j = 0; j < diffYear; j++) {
        avgValue[j] = 0;
      }
      for (let i = 0; i < this.ecoIntegrationChart.length; i++) {
        this.ecoIntegrationChart[i]["color"] = this.colorPattern[i];
        this.ecoIntegrationChart[i]["visible"] = true;
        for (let j = 0; j < diffYear; j++) {
          avgValue[j] += Number(this.ecoIntegrationChart[i]["data"][j]);
        }
      }
      for (let j = 0; j < diffYear; j++) {
        avgValue[j] = (avgValue[j] / this.ecoIntegrationChart.length).toFixed(
          2
        );
      }
      this.ecoIntegrationChartGroup.data = avgValue;
      this.ecoIntegrationChartGroup.lastValue = avgValue[diffYear - 1];
      this.ecoIntegrationChartGroup.color = "#FF9616";
      this.ecoIntegrationAvg = this.ecoIntegrationChartGroup.lastValue;
      //Find group avg
    },
    async loadData() {
      this.loadEcoIntegration();
      this.LineChartByCountry();
    },
    // toggleItem(index) {
    //   this.showItem[index].visible = !this.showItem[index].visible;
    //   this.loadDataChart();
    //   this.LineChartByCountry();
    //   //   console.log(this.realChart);
    // },
    // toggleGroup() {
    //   this.showGroup = !this.showGroup;
    //   this.loadDataChart();
    //   this.LineChartByCountry();
    //   //   console.log(this.realChart);
    // },
    // loadDataTable() {
    //   for (let i = 1; i < this.data.length; i++) {
    //     let temp = {
    //       name: this.data[i].name,
    //       data: this.data[i].data,
    //       visible: true,
    //       color: this.colorPattern[i],
    //       value: this.data[i].data[this.data[i].data.length - 1]
    //     };
    //     this.showItem.push(temp);
    //   }
    //   this.valueGroup = this.data[0].data[this.data[0].data.length - 1];
    //   //   console.log(this.showItem);
    // },
    // loadDataChart() {
    //   this.realChart = [];
    //   for (let i = 0; i < this.data.length; i++) {
    //     let v = true;
    //     if (i == 0) {
    //       v = this.showGroup;
    //     } else {
    //       v = this.showItem[i - 1].visible;
    //     }
    //     let temp = {
    //       name: this.data[i].name,
    //       data: this.data[i].data,
    //       visible: v,
    //       color: this.colorPattern[i]
    //     };
    //     this.realChart.push(temp);
    //     console.log(this.realChart);
    //   }
    // },
    LineChartByCountry() {
      let yAxisLabel = "";
      if (this.input.type == "Sustainable") {
        yAxisLabel = "Sustainable Integration Index";
      } else {
        yAxisLabel = "Conventional Integration Index";
      }

      Highcharts.chart("lineChartByCountry", {
        title: {
          text: "Solar Employment Growth by Sector, 2010-2016",
        },

        subtitle: {
          text: "Source: thesolarfoundation.com",
        },

        yAxis: {
          title: {
            text: "Number of Employees",
          },
        },

        xAxis: {
          accessibility: {
            rangeDescription: "Range: 2010 to 2017",
          },
        },

        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointStart: 2010,
          },
        },

        series: [
          {
            name: "Installation",
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
          },
          {
            name: "Manufacturing",
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
          },
          {
            name: "Sales & Distribution",
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
          },
          {
            name: "Project Development",
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
          },
          {
            name: "Other",
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
          },
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
      });
      // console.log("test");
      // this.realChartData = [];
      // for (let i = 0; i < this.ecoIntegrationChart.length; i++) {
      //   // let v = true;
      //   // if (i == 0) {
      //   //   v = this.showGroup;
      //   // } else {
      //   //   v = this.showItem[i - 1].visible;
      //   // }
      //   let temp = {
      //     name: this.ecoIntegrationChart[i].name,
      //     data: this.ecoIntegrationChart[i].value,
      //     visible: true,
      //     color: this.colorPattern[i],
      //   };
      //   console.log(temp);
      //   this.realChartData.push(temp);
      // }
      // console.log(this.realChartData);

      Highcharts.chart("lineChartByCountry", {
        chart: {
          height: (9 / 16) * 100 + "%", // 16:9 ratio
          style: { fontFamily: "roboto" },
          spacingTop: 30,
        },
        title: {
          text: "",
        },

        yAxis: {
          title: {
            text: yAxisLabel,
          },
          min: 0,
          max: 1,
        },
        xAxis: {
          accessibility: {
            rangeDescription: "Range: 2010 to 2017",
          },
          tickInterval: 1,
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: true,
            },
            pointStart: Number(this.input.year.min),
            pointInterval: 1,
          },
        },

        series: this.this.ecoIntegrationChart,

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
        credits: {
          enabled: false,
        },
        legend: { enabled: false },
        exporting: { enabled: false },
      });
    },
  },
  mounted() {
    this.loadData();
    // this.loadDataTable();
    // this.loadDataChart();
    // this.LineChartByCountry();
  },
};
</script>

<style lang="scss" scoped>
.colorBox {
  width: 16px;
  height: 16px;
  border: 1px solid #757575;
}
.selectBoxDiv {
  border: 1px solid #757575;
}
.textSelected {
  color: #2d9687;
  font-weight: bold;
}
.lineGreenSelectedBox {
  height: 6px;
  background-color: #2d9687;
}
.borderMainBox {
  border: 1px solid #757575;
  height: 650px;
  width: 100%;
}
.borderRight {
  border-right: 1px solid #c4c4c4;
  height: 650px;
}
.checkBox {
  width: 20px;
  height: 20px;
  background-color: red;
  border: 1px solid #757575;
}
.checkBoxGroup {
  width: 20px;
  height: 20px;
  background-color: red;
  border: 1px solid #757575;
}
</style>
