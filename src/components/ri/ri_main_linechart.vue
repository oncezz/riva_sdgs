<template>
  <div class="q-pa-md bg-white" style="width: 100%">
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
            <div
              class="row q-py-sm cursor-pointer"
              @click="ecoIntegrationGroupToggleOnOff()"
            >
              <div
                class="checkBoxGroup"
                style="background-color: #f07435"
                v-show="ecoIntegrationChartGroup.visible"
              ></div>
              <div
                class="checkBoxGroup"
                v-show="!ecoIntegrationChartGroup.visible"
              ></div>
              <div class="q-pl-sm">Group average ({{ ecoIntegrationAvg }})</div>
            </div>
            <div><hr /></div>
            <div class="row">
              <div
                v-for="(item, index) in ecoIntegrationChart"
                :key="index"
                class="col-6 row q-pb-sm font-12 cursor-pointer"
                @click="ecoIntegrationToggleOnOff(index)"
              >
                <div
                  class="checkBox"
                  :style="{ backgroundColor: item.color }"
                  v-show="item.visible == true"
                ></div>
                <div
                  class="checkBox"
                  style="border: 1px solid #757575"
                  v-show="item.visible == false"
                ></div>

                <div class="q-pl-sm row">
                  <div
                    style="max-width: 100px; display: inline-block"
                    class="ellipsis"
                  >
                    {{ item.name }}
                  </div>
                  &nbsp({{ item.lastValue }})
                </div>
              </div>
            </div>
          </div>
          <div class="col q-px-md">
            <div class="q-pt-md">
              <div class="font-24">
                How did Integration progress across years? - group and
                individual economies
              </div>
            </div>
            <div>
              Since {{ input.year.min }}, this group's Integration
              {{ ecoIntegrationPercentChange > 0 ? "increased" : "decreased" }}
              by
              {{ Math.abs(ecoIntegrationPercentChange) }}%. In
              {{ input.year.max }}, {{ ecoIntegrationChart[0].name }} and
              {{ ecoIntegrationChart[1].name }} were the group's most integrated
              economics.
              {{ ecoIntegrationChart[ecoIntegrationChart.length - 1].name }} and
              {{ ecoIntegrationChart[ecoIntegrationChart.length - 2].name }}
              were the least.
            </div>
            <div
              id="lineChartByCountry"
              style="max-width: 1024px; width: 100%; margin: auto"
            ></div>
          </div>
        </div>
      </div>
      <div v-show="menuSelectedId == 2">
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
            <div class="row q-py-sm cursor-pointer" @click="groupToggleOnOff()">
              <div
                class="checkBoxGroup"
                style="background-color: #f07435"
                v-show="integrationProgressChartGroup.visible"
              ></div>
              <div
                class="checkBoxGroup"
                v-show="!integrationProgressChartGroup.visible"
              ></div>
              <div class="q-pl-sm">Group average ({{ ecoIntegrationAvg }})</div>
            </div>
            <div><hr /></div>
            <div class="row">
              <div
                v-for="(item, index) in integrationProgressChart"
                :key="index"
                class="col-6 row q-pb-sm font-12 cursor-pointer"
                @click="ecoIntegrationToggleOnOff(index)"
              >
                <div
                  class="checkBox"
                  style="backgroundcolor: #2d9687"
                  v-show="item.visible == true"
                ></div>
                <div
                  class="checkBox"
                  style="border: 1px solid #757575"
                  v-show="item.visible == false"
                ></div>

                <div class="q-pl-sm row">
                  <div
                    style="max-width: 100px; display: inline-block"
                    class="ellipsis"
                  >
                    {{ item.name }}
                  </div>
                  &nbsp({{ item.lastValue }})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="menuSelectedId == 3">x3</div>
      <div v-show="menuSelectedId == 4">x4</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "input"],
  data() {
    return {
      menuSelectedId: 1,
      ecoIntegrationChart: [{ name: "" }, { name: "" }],
      ecoIntegrationChartGroup: [],
      integrationProgressChart: [{ name: "" }, { name: "" }],
      integrationProgressChartGroup: [],
      ecoIntegrationAvg: 0,
      ecoIntegrationPercentChange: 0,
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
      ecoIntegrationFinalChart: [],
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
    ecoIntegrationToggleOnOff(index) {
      this.ecoIntegrationChart[index]["visible"] =
        !this.ecoIntegrationChart[index]["visible"];
      // this.ecoIntegrationChart.push("xxx");
      // this.ecoIntegrationChart.pop();
      this.mergeEcoIntegration();
    },
    ecoIntegrationGroupToggleOnOff() {
      this.ecoIntegrationChartGroup["visible"] =
        !this.ecoIntegrationChartGroup["visible"];
      this.mergeEcoIntegration();
    },
    mergeEcoIntegration() {
      this.ecoIntegrationFinalChart = [];
      this.ecoIntegrationChart.forEach((x) => {
        this.ecoIntegrationFinalChart.push(x);
      });
      this.ecoIntegrationFinalChart.push(this.ecoIntegrationChartGroup);
      this.LineChartByCountry();
    },

    async loadEcoIntegration() {
      let data = {
        input: this.input,
        countryFullList: this.data,
      };

      //get data in economic's integration
      let url = this.ri_api + "intra_eco_integration_by_country.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.ecoIntegrationChart = res.data;
      this.ecoIntegrationChart.sort(
        (a, b) => Number(b.lastValue) - Number(a.lastValue)
      );
      let diffYear = this.input.year.max - this.input.year.min;
      // set init
      let avgValue = [];
      for (let j = 0; j <= diffYear; j++) {
        avgValue[j] = 0;
      }
      for (let i = 0; i < this.ecoIntegrationChart.length; i++) {
        this.ecoIntegrationChart[i]["color"] = this.colorPattern[i];
        if (i < 5) {
          this.ecoIntegrationChart[i]["visible"] = true;
        } else {
          this.ecoIntegrationChart[i]["visible"] = false;
        }
        for (let j = 0; j <= diffYear; j++) {
          avgValue[j] += Number(this.ecoIntegrationChart[i]["data"][j]);
        }
      }
      for (let j = 0; j <= diffYear; j++) {
        avgValue[j] = Number(
          (avgValue[j] / this.ecoIntegrationChart.length).toFixed(2)
        );
      }

      this.ecoIntegrationChartGroup = {
        name: "Group average",
        data: avgValue,
        lastValue: avgValue[diffYear - 1],
        color: "#FF9616",
        visible: true,
      };

      this.ecoIntegrationAvg = this.ecoIntegrationChartGroup.lastValue;
      //Find group avg
      this.ecoIntegrationPercentChange = (
        ((avgValue[diffYear] - avgValue[0]) / avgValue[0]) *
        100
      ).toFixed(0);
      this.mergeEcoIntegration();
    },
    async loadData() {
      await this.loadEcoIntegration();
      await this.LineChartByCountry();
      await this.loadIntegrationPeriods();
    },

    async loadIntegrationPeriods() {
      this.integrationProgressChart = JSON.parse(
        JSON.stringify(this.integrationProgressChart)
      );
      let diffYearByTwo = Math.floor(
        (this.input.year.max - this.input.year.min) / 2
      );
      this.ecoIntegrationChart.forEach((item) => {
        console.log(item);
      });
      // let data = {
      //   input: this.input,
      //   countryFullList: this.data,
      // };

      // //get data in economic's integration
      // let url = this.ri_api + "intra_integration_by_country.php";
      // let res = await axios.post(url, JSON.stringify(data));
    },

    LineChartByCountry() {
      let yAxisTitle = this.input.type + " Integration";
      this.input.type +
        Highcharts.chart("lineChartByCountry", {
          chart: {
            height: 550,
          },
          title: {
            text: "",
          },

          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle",
          },
          yAxis: {
            min: 0,
            max: 1,
            title: {
              text: yAxisTitle,
            },
          },
          xAxis: {
            tickInterval: 1,
          },
          tooltip: {
            useHTML: true,
            headerFormat: "",
            pointFormatter: function () {
              return (
                "<div class='font-16'><b>" +
                this.series.name +
                "</b></div><div>" +
                yAxisTitle +
                " index: " +
                this.y +
                "</div>"
              );
            },
          },
          plotOptions: {
            series: {
              label: {
                connectorAllowed: false,
              },
              pointStart: this.input.year.min,
            },
          },
          credits: {
            enabled: false,
          },
          series: this.ecoIntegrationFinalChart,
          legend: { enabled: false },
          exporting: { enabled: false },

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

      // Highcharts.chart("lineChartByCountry", {
      //   chart: {
      //     height: (9 / 16) * 100 + "%", // 16:9 ratio
      //     style: { fontFamily: "roboto" },
      //     spacingTop: 30,
      //   },
      //   title: {
      //     text: "",
      //   },

      //   yAxis: {
      //     min: 0,
      //     max: 1,
      //   },
      //   xAxis: {
      //     accessibility: {
      //       rangeDescription: "Range: 2010 to 2017",
      //     },
      //     tickInterval: 1,
      //   },
      //   legend: {
      //     layout: "vertical",
      //     align: "right",
      //     verticalAlign: "middle",
      //   },

      //   plotOptions: {
      //     series: {
      //       label: {
      //         connectorAllowed: true,
      //       },
      //       pointStart: Number(this.input.year.min),
      //       pointInterval: 1,
      //     },
      //   },

      //   series: this.this.ecoIntegrationChart,

      //   responsive: {
      //     rules: [
      //       {
      //         condition: {
      //           maxWidth: 500,
      //         },
      //         chartOptions: {
      //           legend: {
      //             layout: "horizontal",
      //             align: "center",
      //             verticalAlign: "bottom",
      //           },
      //         },
      //       },
      //     ],
      //   },
      //   credits: {
      //     enabled: false,
      //   },
      //   legend: { enabled: false },
      //   exporting: { enabled: false },
      // });
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
}
.checkBoxGroup {
  width: 20px;
  height: 20px;
  border: 1px solid #757575;
}
</style>
