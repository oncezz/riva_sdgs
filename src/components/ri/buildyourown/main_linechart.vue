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
          Integration<br />
          across years
          <div :class="{ lineGreenSelectedBox: menuSelectedId == 1 }"></div>
        </div>

        <!-- Menu #2 -->
        <div
          class="col-2 selectBoxDiv q-pt-xs cursor-pointer"
          align="center"
          @click="selectMenuId2()"
          :class="{ textSelected: menuSelectedId == 2 }"
        >
          Integration across <br />periods
          <div :class="{ lineGreenSelectedBox: menuSelectedId == 2 }"></div>
        </div>

        <!-- menu #3 -->
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

        <!-- menu #4 -->
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
          class="col-4 selectBoxDiv q-pr-md cursor-pointer"
          align="right"
          style="line-height: 65px"
          @click="goToURL()"
        >
          <u>Click here to see this group's availability matrix</u>
        </div>
      </div>
    </div>
    <div class="borderMainBox">
      <!-- Graph menu #1 -->
      <div v-show="menuSelectedId == 1">
        <div class="row">
          <div style="width: 400px" class="q-pa-md borderRight">
            <div class="font-24">Select economies of interest</div>
            <div class="font-14">
              In parenthesis, each economy's
              {{ input.type.toLowerCase() }} integration index for
              {{ input.year.max }}
            </div>
            <div class="q-pt-md">
              Click on each country to select/unselect it from the graph.
            </div>
            <div
              class="row q-py-sm cursor-pointer"
              @click="ecoIntegrationGroupToggleOnOff()"
            >
              <div
                class="checkBoxGroup"
                style="background-color: #f07435"
                v-show="ecoIntegrationGroupVisible"
              ></div>
              <div
                class="checkBoxGroup"
                v-show="!ecoIntegrationGroupVisible"
              ></div>
              <div class="q-pl-sm">Group average ({{ ecoIntegrationAvg }})</div>
            </div>
            <div><hr /></div>
            <div class="row economicShowDiv content-start">
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
                  &nbsp({{ Number(item.lastValue).toFixed(2) }})
                </div>
                <q-tooltip>
                  {{ item.name }} ({{
                    Number(item.lastValue).toFixed(2)
                  }})</q-tooltip
                >
              </div>
            </div>
          </div>
          <div class="col q-px-md">
            <div class="q-pt-md">
              <div class="font-24">
                How did the reporting group's integration with this group
                process across year?
              </div>
            </div>
            <div v-if="ecoIntegrationChart.length >= 4">
              Since {{ input.year.min }}, The reporting group's average
              integration with this group's
              {{ ecoIntegrationPercentChange > 0 ? "increased" : "decreased" }}
              by
              {{ Math.abs(ecoIntegrationPercentChange) }}%. In
              {{ input.year.max }},your group was most integrated with
              {{ ecoIntegrationSentenceHigh[0].name }} ({{
                Number(ecoIntegrationSentenceHigh[0].lastValue).toFixed(2)
              }}) and {{ ecoIntegrationSentenceHigh[1].name }} ({{
                Number(ecoIntegrationSentenceHigh[1].lastValue).toFixed(2)
              }}) and least with {{ ecoIntegrationSentenceLow[0].name }} ({{
                Number(ecoIntegrationSentenceLow[0].lastValue).toFixed(2)
              }}) and {{ ecoIntegrationSentenceLow[1].name }} ({{
                Number(ecoIntegrationSentenceLow[1].lastValue).toFixed(2)
              }}).
            </div>
            <div v-else-if="ecoIntegrationChart.length >= 2">
              Since {{ input.year.min }}, The reporting group's average
              integration with this group's
              {{ ecoIntegrationPercentChange > 0 ? "increased" : "decreased" }}
              by
              {{ Math.abs(ecoIntegrationPercentChange) }}%. In
              {{ input.year.max }},your group was most integrated with
              {{ ecoIntegrationSentenceHigh[0].name }} ({{
                Number(ecoIntegrationSentenceHigh[0].lastValue).toFixed(2)
              }}) and least with {{ ecoIntegrationSentenceLow[0].name }} ({{
                Number(ecoIntegrationSentenceLow[0].lastValue).toFixed(2)
              }}).
            </div>
            <div v-else>
              Since {{ input.year.min }}, The reporting group's average
              integration with this group's
              {{ ecoIntegrationPercentChange > 0 ? "increased" : "decreased" }}
              by
              {{ Math.abs(ecoIntegrationPercentChange) }}%.
            </div>
            <div
              id="lineChartByCountry"
              style="max-width: 1024px; width: 100%; margin: auto"
            ></div>
          </div>
        </div>
      </div>
      <!-- Graph menu #2 -->
      <div v-show="menuSelectedId == 2">
        <div class="row">
          <div style="width: 400px" class="q-pa-md borderRight">
            <div class="font-24">Select economies of interest</div>
            <div class="font-14">
              Numbers in parsentheses are
              {{ input.type.toLowerCase() }} integration index form the
              {{ input.year.max }}
            </div>
            <div class="q-pt-md">
              Click on each country to select/unselect it in the graph.
            </div>
            <div
              class="row q-py-sm cursor-pointer"
              @click="menu2SetGroupVisible()"
            >
              <div
                class="checkBoxGroup"
                style="background-color: #f07435"
                v-show="menu2GroupVisible"
              ></div>
              <div class="checkBoxGroup" v-show="!menu2GroupVisible"></div>
              <div class="q-pl-sm">
                Group average
                <span v-if="Number(menu2GroupDiffAvg) >= 0" class="positiveText"
                  >(+{{ Number(menu2GroupDiffAvg).toFixed(2) }})</span
                >
                <span v-else class="negativeText"
                  >(-{{ Number(menu2GroupDiffAvg).toFixed(2) }})</span
                >
              </div>
            </div>
            <div><hr /></div>
            <div class="row">
              <div
                v-for="(item, index) in menu2RawData"
                :key="index"
                class="col-6 row q-pb-sm font-12 cursor-pointer"
                @click="menu2SetVisible(index)"
                v-if="index > 0"
              >
                <div
                  class="checkBox"
                  style="background-color: #13405a"
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
                  &nbsp
                  <span v-if="Number(item.diff) >= 0" class="positiveText"
                    >(+{{ Number(item.diff).toFixed(2) }})</span
                  >
                  <span v-else class="negativeText"
                    >(-{{ Number(item.diff).toFixed(2) }})</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col q-px-md">
            <div class="q-pt-md">
              <div class="font-24">
                How did the reporting group’s integration with this group
                progress across periods?
              </div>
              <div>{{ menu2SubtitleSentence1 }}</div>
              <div>{{ menu2SubtitleSentence2 }}</div>
            </div>
            <div
              id="container2"
              style="max-width: 1024px; width: 100%; margin: auto"
            ></div>
          </div>
        </div>
      </div>
      <div v-show="menuSelectedId == 3">
        <div class="q-pa-md">
          <div class="font-24">
            How much data is available for each selected economy?
          </div>

          <div>{{ dataAvailable.subTitle1 }}</div>
          <div>{{ dataAvailable.subTitle2 }}</div>
          <!-- <q-tooltip
            anchor="bottom middle"
            self="top middle"
            content-class="tooltipBox"
          >
            
          </q-tooltip> -->
        </div>
        <div
          id="container3"
          style="max-width: 1024px; width: 100%; margin: auto"
        ></div>
      </div>
      <div v-show="menuSelectedId == 4">
        <div class="q-pa-md">
          <div class="font-24">
            How much is each economy's contributing to this group's overall
            integration score?
          </div>
          <div>{{ weight.subTitle1 }}</div>
        </div>
        <div
          id="container4"
          style="max-width: 1024px; width: 100%; margin: auto"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "input"],
  data() {
    return {
      menuSelectedId: 1,
      yourGroupName: "Your group",
      colorPattern: [
        "#2196F3",
        "#8BC34A",
        "#9C27B0",
        "#3F51B5",
        "#E53935",

        "#03A9F4",
        "#00BCD4",
        "#009688",
        "#E91E63",
        "#CDDC39",

        "#D32F2F",
        "#FFCA28",
        "#512DA8",
        "#FF7043",
        "#795548",

        "#9E9E9E",
        "#607D8B",
        "#FFEB3B",
        "#C2185B",
        "#7B1FA2",

        "#FFA726",
        "#303F9F",
        "#212121",
        "#D50000",
        "#0097A7",

        "#00796B",
        "#FFFF8D",
        "#A7FFEB",
        "#AFB42B",
        "#FBC02D",

        "#FFA000",
        "#F57C00",
        "#E64A19",
        "#5D4037",
        "#689F38",

        "#311B92",
        "#B71C1C",
        "#880E4F",
        "#F4FF81",
        "#616161",

        "#1A237E",
        "#263238",
        "#FFFF00",
        "#006064",
        "#E040FB",

        "#304FFE",
        "#84FFFF",
        "#827717",
        "#F57F17",
        "#FF6F00",

        "#E65100",
        "#BF360C",
        "#1976D2",
        "#3E2723",
        "#0D47A1",

        "#FF8A80",
        "#FF80AB",
        "#EA80FC",
        "#B388FF",
        "#8C9EFF",

        "#82B1FF",
        "#80D8FF",
        "#4A148C",
        "#33691E",
        "#B9F6CA",

        "#CCFF90",
        "#455A64",
        "#388E3C",
        "#FFE57F",
        "#FFD180",

        "#FF9E80",
        "#0091EA",
        "#CFD8DC",
        "#FF5252",
        "#FF4081",

        "#004D40",
        "#7C4DFF",
        "#448AFF",
        "#40C4FF",
        "#18FFFF",

        "#64FFDA",
        "#69F0AE",
        "#B2FF59",
        "#AA00FF",
        "#01579B",

        "#FFD740",
        "#FFAB40",
        "#FF6E40",
        "#BCAAA4",
        "#B0BEC5",

        "#0288D1",
        "#C51162",
        "#00C853",
        "#6200EA",
        "#1B5E20",

        "#D7CCC8",
        "#00B8D4",
        "#00BFA5",
        "#EEFF41",
        "#64DD17",
      ],
      ecoIntegrationChart: [{ name: "" }, { name: "" }],
      ecoIntegrationChartGroup: [],
      ecoIntegrationAvg: 0,
      ecoIntegrationPercentChange: 0,
      ecoIntegrationGroupVisible: true,
      ecoIntegrationFinalChart: [],
      ecoIntegrationTopFive: [],
      ecoIntegrationSentenceHigh: [{ name: "" }, { name: "" }],
      ecoIntegrationSentenceLow: [
        { name: "", lastValue: "" },
        { name: "", lastValue: "" },
      ],
      integrationProgressChart: [{ name: "" }, { name: "" }],
      menu2RawData: [],
      menu2SentenceHigh: [],
      menu2SentenceLow: [],
      menu2GroupDiffAvg: "",
      menu2SubtitleSentence1: "",
      menu2SubtitleSentence2: "",
      menu2YearSet1: "",
      menu2YearSet2: "",
      menu2ActiveEco: [],
      menu2ChartEco: [],
      menu2ChartSet1: [],
      menu2ChartSet2: [],
      menu2GroupVisible: true,
      integrationProgressdiffValueArray: [],
      dataAvailable: {
        rawData: [],
        cat: [],
        chartData: [],
        subTitle1: "",
        subTitle2: "",
      },
      weight: {
        equalWeight: 0.25,
        rawData: [],
        cat: [],
        chartData: [],
        subTitle1: "",
      },
    };
  },
  methods: {
    goToURL() {
      // this.getURL();
      let dataGet = this.$q.localStorage.getItem("dataAvail");
      this.id = dataGet.key;
      this.$router.push("/ridataavailability/" + this.id);
    },
    checkYourName() {
      if (this.input.partner.length == 1) {
        this.yourGroupName = this.input.partner[0].label;
      }
    },
    // menu selected
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

    // economic's integration
    async loadEcoIntegration() {
      let data = {
        input: this.input,
        countryFullList: this.data,
      };
      let url = this.ri_api + "buildyourown/eco_integration_by_country.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.ecoIntegrationChart = res.data;
      // console.log(res.data);
      this.ecoIntegrationChart.sort((a, b) =>
        Number(b.name) > Number(a.name) ? -1 : 1
      );
      let diffYear = this.input.year.max - this.input.year.min;
      let avgValue = [];
      for (let j = 0; j <= diffYear; j++) {
        avgValue[j] = 0;
      }

      for (let i = 0; i < this.ecoIntegrationChart.length; i++) {
        this.ecoIntegrationChart[i]["color"] = this.colorPattern[i];
        this.ecoIntegrationChart[i]["visible"] = false;
        for (let j = 0; j <= diffYear; j++) {
          avgValue[j] += Number(this.ecoIntegrationChart[i]["data"][j]);
        }
      }
      this.setTopFiveEcoIntegration();
      this.setSentenceInIntegrationAcrossYear();
      //  for (let i = 0; i < this.ecoIntegrationChart.length; i++) {
      //   this.ecoIntegrationChart[i]["color"] = this.colorPattern[i];
      //   if (i < 5) {
      //     this.ecoIntegrationChart[i]["visible"] = true;
      //   } else {
      //     this.ecoIntegrationChart[i]["visible"] = false;
      //   }
      //   for (let j = 0; j <= diffYear; j++) {
      //     avgValue[j] += Number(this.ecoIntegrationChart[i]["data"][j]);
      //   }
      // }

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
        dashStyle: "dash",
      };

      this.ecoIntegrationAvg = this.ecoIntegrationChartGroup.lastValue;
      this.ecoIntegrationPercentChange = (
        ((avgValue[diffYear] - avgValue[0]) / avgValue[0]) *
        100
      ).toFixed(0);

      this.integrationProgressPrepareData();

      this.mergeEcoIntegration();
    },
    ecoIntegrationToggleOnOff(index) {
      this.ecoIntegrationChart[index]["visible"] =
        !this.ecoIntegrationChart[index]["visible"];
      this.ecoIntegrationChart.push("xxx");
      this.ecoIntegrationChart.pop();
      this.mergeEcoIntegration();
    },
    ecoIntegrationGroupToggleOnOff() {
      this.ecoIntegrationChartGroup["visible"] =
        !this.ecoIntegrationChartGroup["visible"];
      this.ecoIntegrationGroupVisible =
        this.ecoIntegrationChartGroup["visible"];
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

    LineChartByCountry() {
      let yAxisTitle = this.input.type + " integration";

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
              " (" +
              this.x +
              ")" +
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
    },
    setTopFiveEcoIntegration() {
      let ecoIntegrationSortValue = [...this.ecoIntegrationChart];
      ecoIntegrationSortValue.sort((a, b) => b.lastValue - a.lastValue);
      let noSelected = 5;
      ecoIntegrationSortValue.length >= 5
        ? (noSelected = 5)
        : (noSelected = ecoIntegrationSortValue.length);
      for (let i = 0; i < noSelected; i++) {
        let dataKeep = ecoIntegrationSortValue[i].name;
        this.ecoIntegrationTopFive.push(dataKeep);
      }
      for (let i = 0; i < this.ecoIntegrationChart.length; i++) {
        let checkTopFive = false;
        for (let j = 0; j < this.ecoIntegrationTopFive.length; j++) {
          if (
            this.ecoIntegrationChart[i].name == this.ecoIntegrationTopFive[j]
          ) {
            checkTopFive = true;
          }
        }
        if (checkTopFive) {
          this.ecoIntegrationChart[i]["visible"] = true;
        }
      }
    },
    setSentenceInIntegrationAcrossYear() {
      this.ecoIntegrationSentenceHigh = [];
      let ecoIntegrationSortValue = [...this.ecoIntegrationChart];
      ecoIntegrationSortValue.sort((a, b) => b.lastValue - a.lastValue);
      this.ecoIntegrationSentenceHigh.push(ecoIntegrationSortValue[0]);
      if (this.ecoIntegrationChart.length >= 4) {
        this.ecoIntegrationSentenceHigh.push(ecoIntegrationSortValue[1]);
      }
      this.ecoIntegrationSentenceLow = [];
      ecoIntegrationSortValue.sort((a, b) => a.lastValue - b.lastValue);
      this.ecoIntegrationSentenceLow.push(ecoIntegrationSortValue[0]);
      if (this.ecoIntegrationChart.length >= 4) {
        this.ecoIntegrationSentenceLow.push(ecoIntegrationSortValue[1]);
      }
    },

    //Intregration process across periods
    //Set top five of integration across year

    integrationProgressPrepareData() {
      this.menu2SetAvgData();
      this.menu2MakeleftList();
      this.menu2FindGroupAvg();
      this.menu2Subtitle();
      this.menu2PrepareChart();
      this.menu2PlotChart();
      this.menu2RefreshChart();
      // this.integrationProgressMakeEcoList();
      // this.integrationProgressMakeAvg();
      // this.integrationProgressMakeAvgGroup();
      // this.integrationProgressLegendChartName();
      // this.intergrationProgressSubTitle();
      // this.integrationProgressMergeData();
    },
    menu2SetAvgData() {
      this.menu2RawData = [];
      this.ecoIntegrationChart.forEach((item) => {
        //Find avg value in 2 series for economic (not include group)
        let diffYearByTwo = Math.floor(
          (this.input.year.max - this.input.year.min) / 2
        );

        let arr1 = item.data.slice(0, diffYearByTwo + 1);

        let avg1 = Number(arr1.reduce((pc, cc) => pc + cc, 0)) / arr1.length;
        let arr2 = item.data.slice(item.data.length - diffYearByTwo - 1);
        let avg2 = Number(arr2.reduce((pc, cc) => pc + cc, 0)) / arr2.length;
        let temp1 = {
          name: item.name,
          data: item.data,
          data1: Number(avg1).toFixed(4),
          data2: Number(avg2).toFixed(4),
          diff: Number(avg2 - avg1).toFixed(4),
        };

        this.menu2RawData.push(temp1);
      });
    },
    menu2MakeleftList() {
      this.menu2RawData.sort((a, b) => b.diff - a.diff);
      this.menu2RawData.forEach((item, index) => {
        if (index <= 4) {
          this.menu2RawData[index].visible = true;
        } else {
          this.menu2RawData[index].visible = false;
        }
      });
      this.menu2SentenceHigh = [];
      this.menu2SentenceHigh[0] = this.menu2RawData[0];
      if (this.menu2RawData.length >= 4) {
        this.menu2SentenceHigh[1] = this.menu2RawData[1];
      }
      this.menu2RawData.sort((a, b) => a.diff - b.diff);
      this.menu2SentenceLow = [];
      this.menu2SentenceLow[0] = this.menu2RawData[0];
      if (this.menu2RawData.length >= 4) {
        this.menu2SentenceLow[1] = this.menu2RawData[1];
      }
      this.menu2RawData.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.menu2RawData.forEach((item, index) => {
        this.menu2RawData[index].color = this.colorPattern[index];
      });
    },
    menu2FindGroupAvg() {
      let diff1 =
        this.menu2RawData.reduce((total, item) => {
          return total + Number(item.data1);
        }, 0) / this.menu2RawData.length;
      let diff2 =
        this.menu2RawData.reduce((total, item) => {
          return total + Number(item.data2);
        }, 0) / this.menu2RawData.length;
      this.menu2GroupDiffAvg = diff2 - diff1;
      let temp1 = {
        color: "#F99704",
        data: [],
        data1: diff1,
        data2: diff2,
        diff: Number(diff2) - Number(diff1),
        name: "Group average",
        visible: true,
      };
      this.menu2RawData.unshift(temp1);
      // console.log(this.menu2RawData);
    },
    menu2Subtitle() {
      let directionAvg;
      this.menu2RawData[0].diff >= 0
        ? (directionAvg = "increased by ")
        : (directionAvg = "decreased by ");
      this.menu2SubtitleSentence1 =
        "From " +
        this.input.year.min +
        "-" +
        (this.input.year.min +
          Math.floor((this.input.year.max - this.input.year.min) / 2) -
          2000) +
        " to " +
        (this.input.year.max -
          Math.floor((this.input.year.max - this.input.year.min) / 2)) +
        "-" +
        (this.input.year.max - 2000) +
        " the reporting group's integration average " +
        directionAvg +
        Number(this.menu2RawData[0].diff).toFixed(2) +
        " from " +
        Number(this.menu2RawData[0].data1).toFixed(2) +
        " to " +
        Number(this.menu2RawData[0].data2).toFixed(2) +
        ".";

      if (this.menu2RawData.length >= 5) {
        this.menu2SubtitleSentence2 =
          this.menu2SentenceHigh[0].name +
          " (" +
          Number(this.menu2SentenceHigh[0].diff).toFixed(2) +
          ") and " +
          this.menu2SentenceHigh[1].name +
          " (" +
          Number(this.menu2SentenceHigh[1].diff).toFixed(2) +
          ") progressed the most. " +
          this.menu2SentenceLow[0].name +
          " (" +
          Number(this.menu2SentenceLow[0].diff).toFixed(2) +
          ") and " +
          this.menu2SentenceLow[1].name +
          " (" +
          Number(this.menu2SentenceLow[1].diff).toFixed(2) +
          ") progressed the least.";
      } else {
        this.menu2SubtitleSentence2 =
          this.menu2SentenceHigh[0].name +
          " (" +
          Number(this.menu2SentenceHigh[0].diff).toFixed(2) +
          ") progressed the most. " +
          this.menu2SentenceLow[0].name +
          " (" +
          Number(this.menu2SentenceLow[0].diff).toFixed(2) +
          ")" +
          " progressed the least.";
      }
    },
    menu2PrepareChart() {
      this.menu2YearSet1 =
        this.input.year.min +
        "-" +
        (this.input.year.min +
          Math.floor((this.input.year.max - this.input.year.min) / 2) -
          2000);

      this.menu2YearSet2 =
        this.input.year.max -
        Math.floor((this.input.year.max - this.input.year.min) / 2) +
        "-" +
        (this.input.year.max - 2000);
    },
    menu2RefreshChart() {
      this.menu2ActiveEco = this.menu2RawData.filter((x) => x.visible == true);
      this.menu2ChartEco = this.menu2ActiveEco.map((x) => x.name);
      this.menu2ChartSet1 = this.menu2ActiveEco.map((x) =>
        Number(Number(x.data1).toFixed(2))
      );
      this.menu2ChartSet2 = this.menu2ActiveEco.map((x) =>
        Number(Number(x.data2).toFixed(2))
      );
      // console.log(this.menu2ChartEco);
      // console.log(this.menu2ChartSet1);
      // console.log(this.menu2ChartSet2);
      this.menu2PlotChart();
    },
    menu2SetGroupVisible() {
      this.menu2GroupVisible = !this.menu2GroupVisible;
      this.menu2RawData[0].visible = this.menu2GroupVisible;
      let temp1 = {
        color: "#F99704",
        data: [],
        data1: 12,
        data2: 12,
        diff: 33,
        name: "Group average",
        visible: true,
      };
      this.menu2RawData.push(temp1);
      this.menu2RawData.pop();
      this.menu2RefreshChart();
    },
    menu2SetVisible(index) {
      this.menu2RawData[index].visible = !this.menu2RawData[index].visible;
      let temp1 = {
        color: "#F99704",
        data: [],
        data1: 12,
        data2: 12,
        diff: 33,
        name: "Group average",
        visible: true,
      };
      this.menu2RawData.push(temp1);
      this.menu2RawData.pop();
      this.menu2RefreshChart();
    },
    menu2PlotChart() {
      let gName = this.yourGroupName;
      let yAxisTitle = this.input.type + " integration";
      Highcharts.chart("container2", {
        chart: {
          type: "column",
          height: "550px",
        },
        title: {
          text: "",
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          categories: this.menu2ChartEco,
          crosshair: true,
          labels: {
            formatter() {
              if (this.value == "Group average")
                return `<span style="color: #F99704; font-weight:bold;">Your group</span>`;
              else {
                return this.value;
              }
            },
          },
        },
        yAxis: {
          min: 0,
          max: 1,
          title: {
            text: yAxisTitle,
          },
        },
        exporting: { enabled: false },
        tooltip: {
          formatter: function () {
            let updown =
              this.points[1].y - this.points[0].y >= 0
                ? "increased by "
                : "decreased by ";
            let upDownSize = Number(
              Math.abs(this.points[1].y - this.points[0].y)
            ).toFixed(2);
            let upDownPercent = Number(
              (Number(upDownSize) / this.points[0].y) * 100
            ).toFixed(2);
            return (
              "<div class='font-16'><b>" +
              this.x +
              "</b></div><div>" +
              yAxisTitle +
              " index " +
              updown +
              upDownSize +
              " (" +
              upDownPercent +
              "%)</div>"
            );
          },

          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
          },
          series: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: [
          {
            name: this.menu2YearSet1,
            data: this.menu2ChartSet1,
            color: "#2381B8",
          },
          {
            name: this.menu2YearSet2,
            data: this.menu2ChartSet2,
            color: "#13405A",
          },
        ],
      });
    },
    //dataAvail
    async loadDataFromDatabase() {
      let data = {
        input: this.input,
        countryFullList: this.data,
      };
      let url = this.ri_api + "buildyourown/data_avail_by_country.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.dataAvailable.rawData = res.data;
      let avgGroup = Math.round(
        this.dataAvailable.rawData
          .map((x) => x.data)
          .reduce((pc, cc) => pc + cc, 0) / this.dataAvailable.rawData.length
      );
      let temp = {
        name: this.yourGroupName,
        data: avgGroup,
      };
      this.dataAvailable.rawData.push(temp);
      this.dataAvailable.rawData.sort((a, b) => b.data - a.data);
      this.setDataforDataAvail(avgGroup);
    },
    setDataforDataAvail(avgGroup) {
      if (this.dataAvailable.rawData.length > 30) {
        let yourGroupIndex = this.dataAvailable.rawData.findIndex(
          (x) => x.name == "Your group"
        );

        if (yourGroupIndex >= 14) {
          this.dataAvailable.rawData.splice(14, yourGroupIndex - 14);
        }
        if (this.dataAvailable.rawData.length >= 30) {
          this.dataAvailable.rawData.splice(
            15,
            this.dataAvailable.rawData.length - 30
          );
        }
      }

      this.dataAvailable.cat = this.dataAvailable.rawData.map((x) => x.name);
      this.dataAvailable.chartData = this.dataAvailable.rawData.map(
        (x) => x.data
      );
      this.dataAvailable.subTitle1 = `From ${this.input.year.min} to ${this.input.year.max} the group’s data
      for ${avgGroup}% of all possible reporter-partner pairs.`;
      this.dataAvailable.subTitle2 = `${this.dataAvailable.rawData[0].name}(${
        this.dataAvailable.chartData[0]
      }%)
      and ${this.dataAvailable.rawData[1].name}(${
        this.dataAvailable.chartData[1]
      }%) were the countries with the most complete data set, while ${
        this.dataAvailable.rawData[this.dataAvailable.rawData.length - 1].name
      }(${
        this.dataAvailable.chartData[this.dataAvailable.rawData.length - 1]
      }%) and ${
        this.dataAvailable.rawData[this.dataAvailable.rawData.length - 2].name
      }(${
        this.dataAvailable.chartData[this.dataAvailable.rawData.length - 2]
      }%) are the countries with the least.`;

      this.plotChartDataAvail();
    },
    plotChartDataAvail() {
      let gName = this.yourGroupName;
      Highcharts.chart("container3", {
        chart: {
          type: "column",
          height: "500px",
        },
        title: {
          text: "",
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          categories: this.dataAvailable.cat,
          crosshair: true,
          labels: {
            formatter() {
              if (this.value == gName)
                return `<span style="color: #F99704; font-weight:bold;">${this.value}</span>`;
              else {
                return this.value;
              }
            },
          },
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: "",
          },
        },
        exporting: { enabled: false },
        tooltip: {
          headerFormat:
            '<span style="font-size:16px"><b>{point.key}</b></span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f}%</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        legend: { enabled: false },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
          },
          series: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: [
          {
            name: "data availability",
            data: this.dataAvailable.chartData,
            color: "#2381B8",
          },
        ],
      });
    },
    //Weights

    async weightLoadData() {
      let data = {
        input: this.input,
        countryFullList: this.data,
      };
      let url = this.ri_api + "buildyourown/weight_by_country.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.weight.rawData = res.data;

      this.weight.rawData.sort((a, b) => b.data - a.data);

      this.setDataforWeight();
    },
    setDataforWeight() {
      this.weight.equalWeight = Number(
        (1 / this.weight.rawData.length).toFixed(2)
      );
      if (this.weight.rawData.length >= 4) {
        this.weight.subTitle1 = `From ${this.input.year.min} to ${
          this.input.year.max
        }, ${this.weight.rawData[0].name} (${Number(
          this.weight.rawData[0].data
        ).toFixed(2)}) and ${this.weight.rawData[1].name} (${Number(
          this.weight.rawData[1].data
        ).toFixed(
          2
        )}) were the most prominent economies in driving your group's integration  whereas ${
          this.weight.rawData[this.weight.rawData.length - 1].name
        } (${Number(
          this.weight.rawData[this.weight.rawData.length - 1].data
        ).toFixed(2)}) and ${
          this.weight.rawData[this.weight.rawData.length - 2].name
        } (${Number(
          this.weight.rawData[this.weight.rawData.length - 2].data
        ).toFixed(2)}) were the least.`;
      } else {
        this.weight.subTitle1 = `From ${this.input.year.min} to ${
          this.input.year.max
        }, ${this.weight.rawData[0].name} (${Number(
          this.weight.rawData[0].data
        ).toFixed(
          2
        )}) was the most prominent economies in driving your group's integration. whereas ${
          this.weight.rawData[this.weight.rawData.length - 1].name
        } (${Number(
          this.weight.rawData[this.weight.rawData.length - 1].data
        ).toFixed(2)}) was the least.`;
      }
      this.weight.subTitle1 +=
        " Full data availability would yield an equal weighting average across all economics, each with weighting " +
        this.weight.equalWeight;
      if (this.weight.rawData.length > 30) {
        this.weight.rawData.splice(14, this.weight.rawData.length - 30);
      }
      this.weight.cat = this.weight.rawData.map((x) => x.name);
      this.weight.chartData = this.weight.rawData.map((x) => x.data);

      this.plotChartDataWeight();
    },
    plotChartDataWeight() {
      let equalWeight = this.weight.equalWeight;
      Highcharts.chart("container4", {
        chart: {
          type: "column",
          height: "500px",
        },
        title: {
          text: "",
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          categories: this.weight.cat,
          crosshair: true,
        },
        yAxis: {
          min: 0,
          // max: 1,
          title: {
            text: "",
          },
          plotLines: [
            {
              color: "red",
              width: 1,
              value: equalWeight,
              zIndex: 5,
              dashStyle: "longdashdot",
              label: {
                text: "Equal weight: " + equalWeight,
                align: "right",
              },
            },
          ],
        },
        exporting: { enabled: false },
        tooltip: {
          headerFormat:
            '<span style="font-size:16px"><b>{point.key}</b></span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.2f}%</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        legend: { enabled: false },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
          },
          series: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: [
          {
            name: "weight",
            data: this.weight.chartData,
            color: "#2381B8",
          },
        ],
      });
    },
  },
  mounted() {
    this.loadEcoIntegration();
    this.loadDataFromDatabase();
    this.weightLoadData();
    this.checkYourName();
  },
};
</script>

<style lang="scss" scoped>
.positiveText {
  color: #2d9687;
}
.negativeText {
  color: #d85b63;
}
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
.economicShowDiv {
  height: 450px;
  overflow-y: auto;
}
</style>
