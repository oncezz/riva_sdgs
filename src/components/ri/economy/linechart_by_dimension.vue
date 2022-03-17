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
          Integration<br />Index
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
          <u>Click here to see this group's availablity matrix</u>
        </div>
      </div>
    </div>
    <div class="borderMainBox">
      <!-- Graph menu #1 -->
      <div v-show="menuSelectedId == 1">
        <div class="row">
          <div style="width: 400px" class="q-pa-md borderRight">
            <div class="font-24">Select dimensions of interest</div>
            <div class="q-pt-md">
              In parenthesis, each dimension's
              {{ this.input.type.toLowerCase() }} integration index for
              {{ input.year.max }}
            </div>
            <div class="q-pt-md">
              Click on each dimension to select/unselect it in the graph.
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
            <div class="row">
              <div
                v-for="(item, index) in ecoIntegrationChart"
                :key="index"
                class="col-12 row q-pb-md font-12 cursor-pointer"
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
                  <div style="max-width: 200px; display: inline-block">
                    {{ capitalize(item.name) }} ({{ item.lastValue }})
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col q-px-md">
            <div class="q-pt-md">
              <div class="font-24">
                How did {{ capitalize(yourGroupName) }}'s integration progress
                across years?
              </div>
            </div>
            <div>
              Since {{ input.year.min }}, {{ yourGroupName }}'s integration
              {{ ecoIntegrationPercentChange > 0 ? "increased" : "decreased" }}
              by
              {{ Math.abs(ecoIntegrationPercentChange) }}%. In
              {{ input.year.max }}, your group was most integrated in
              {{ ecoIntegrationChartSort[0].name.toLowerCase() }} ({{
                ecoIntegrationChartSort[0].lastValue
              }}) and {{ ecoIntegrationChartSort[1].name.toLowerCase() }} ({{
                ecoIntegrationChartSort[1].lastValue
              }}) integration and least in
              {{
                ecoIntegrationChartSort[
                  ecoIntegrationChartSort.length - 1
                ].name.toLowerCase()
              }}
              ({{
                ecoIntegrationChartSort[ecoIntegrationChartSort.length - 1]
                  .lastValue
              }}) and
              {{
                ecoIntegrationChartSort[
                  ecoIntegrationChartSort.length - 2
                ].name.toLowerCase()
              }}

              ({{
                ecoIntegrationChartSort[ecoIntegrationChartSort.length - 2]
                  .lastValue
              }}).
            </div>

            <div
              id="lineChartByDimension"
              style="max-width: 1024px; width: 100%; margin: auto"
            ></div>
          </div>
        </div>
      </div>

      <!-- Graph menu #2 -->
      <div v-show="menuSelectedId == 2">
        <div class="row">
          <div style="width: 400px" class="q-pa-md borderRight">
            <div class="font-24">Select dimensions of interest</div>

            <div class="q-pt-md">
              Click on each dimension to select/unselect it in the graph.
            </div>
            <div
              class="row q-py-sm cursor-pointer"
              @click="integrationProgressToggleGroupOnOff()"
            >
              <div
                class="checkBoxGroup"
                style="background-color: #f07435"
                v-show="integrationProgressChartGroupVisible"
              ></div>
              <div
                class="checkBoxGroup"
                v-show="!integrationProgressChartGroupVisible"
              ></div>
              <div class="q-pl-sm">Group average ({{ ecoIntegrationAvg }})</div>
            </div>
            <div><hr /></div>
            <div class="row">
              <div
                v-for="(item, index) in intergrationProgressList"
                :key="index"
                class="col-12 row q-pb-md font-12 cursor-pointer"
                @click="integrationProgressToggleOnOff(index)"
              >
                <div
                  class="checkBox"
                  style="background-color: #2d9687"
                  v-show="item.visible == true"
                ></div>
                <div
                  class="checkBox"
                  style="border: 1px solid #757575"
                  v-show="item.visible == false"
                ></div>

                <div class="q-pl-sm row">
                  <div style="max-width: 200px; display: inline-block">
                    {{ capitalize(item.name) }}
                    <span
                      v-if="
                        Number(
                          integrationProgressChartSeries2[index] -
                            integrationProgressChartSeries1[index]
                        ) >= 0
                      "
                      class="positiveText"
                      >(+{{
                        Number(
                          integrationProgressChartSeries2[index] -
                            integrationProgressChartSeries1[index]
                        ).toFixed(2)
                      }})</span
                    >
                    <span v-else class="negativeText"
                      >(-{{
                        Number(
                          integrationProgressChartSeries2[index] -
                            integrationProgressChartSeries1[index]
                        ).toFixed(2)
                      }})</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col q-px-md">
            <div class="q-pt-md">
              <div class="font-24">
                How did integration progress across periods?
              </div>
              <div>{{ integrationProgressSubTitleText }}</div>
              <div>{{ integrationProgressSubTitleTextLine2 }}</div>
            </div>
            <div
              id="container2x"
              style="max-width: 1024px; width: 100%; margin: auto"
            ></div>
          </div>
        </div>
      </div>

      <div v-show="menuSelectedId == 3">
        <div class="q-pa-md">
          <div class="font-24">
            How much data is available for each of the dimensions considered?
            <q-icon name="fas fa-question-circle" size="24px">
              <q-tooltip>
                All country pairs are weighted equally. In turn,<br />
                all available dimensions are weighted equally<br />
                within a single pair As such, dimension<br />
                weights largely reflect data availability, <br />albeit not
                perfectly. To learn more about <br />dimensions weights please
                visit<br />
                our Technical note (upper-right corner).
              </q-tooltip>
            </q-icon>
          </div>
          <div>{{ dataAvailable.subTitle1 }}</div>
        </div>
        <div
          id="container3x"
          style="max-width: 1024px; width: 100%; margin: auto"
        ></div>
      </div>
      <div v-show="menuSelectedId == 4">
        <div class="q-pa-md">
          <div class="font-24">
            How much is each dimensions contributing to the overall integration
            index?
          </div>
          <div>{{ weight.subTitle1 }}</div>
        </div>
        <div
          id="container4x"
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
      id: "",
      menuSelectedId: 1,
      colorPattern: [
        "#64C1E8",
        "#D85B63",
        "#D680AD",
        "#88643A",
        "#C0BA80",

        "#FDC47D",
        "#EA3B46",
      ],
      yourGroupName: "your group",
      ecoIntegrationChart: [{ name: "" }, { name: "" }],
      ecoIntegrationChartGroup: [],
      ecoIntegrationAvg: 0,
      ecoIntegrationPercentChange: 0,
      ecoIntegrationGroupVisible: true,
      ecoIntegrationChartSort: [{ name: "" }, { name: "" }],
      ecoIntegrationFinalChart: [],
      integrationProgressChart: [{ name: "" }, { name: "" }],
      integrationProgressChartGroup: [],
      integrationProgressChartGroupVisible: true,
      integrationProgressChartSeries1: [], //ข้อมูลดิบของ series 1
      integrationProgressChartSeries2: [], //ข้อมูลดิบของ series 2
      intergrationProgressList: [], //รายชื่อประเทศด้านซ้าย not include group avg
      integrationProgressPlotChartCat: [],
      integrationProgressPlotChartSeries1: [],
      integrationProgressPlotChartSeries2: [],
      integrationProgressPlotChartGroup: [],
      integrationProgressYearStart: "",
      integrationProgressYearEnd: "",
      integrationProgressSubTitleText: "",
      integrationProgressSubTitleTextLine2: "",
      integrationProgressdiffValueArray: [],
      dataAvailable: {
        rawData: [],
        cat: [],
        chartData: [],
        subTitle1: "",
      },
      weight: {
        rawData: [],
        cat: [],
        chartData: [],
        subTitle1: "",
      },
    };
  },
  methods: {
    goToURL() {
      let dataGet = this.$q.localStorage.getItem("dataAvail");
      this.id = dataGet.key;
      this.$router.push("/ridataavailability/" + this.id);
    },
    capitalize(s) {
      if (s.length == 0) {
        return "";
      } else {
        return s[0].toUpperCase() + s.slice(1).toLowerCase();
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
      let url = this.ri_api + "economy/intra_index_by_dimension.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.ecoIntegrationChart = res.data;
      this.ecoIntegrationChartSort = [];
      this.ecoIntegrationChart.forEach((item) => {
        let temp = {
          name: item.name,
          lastValue: item.lastValue,
        };
        this.ecoIntegrationChartSort.push(temp);
      });
      this.ecoIntegrationChartSort.sort((a, b) => b.lastValue - a.lastValue);
      // console.log(this.ecoIntegrationChart);
      // console.log(this.ecoIntegrationChartSort);
      // this.ecoIntegrationChartSort = this.ecoIntegrationChart.sort(
      //   (a, b) => Number(b.lastValue) - Number(a.lastValue)
      // );
      let diffYear = this.input.year.max - this.input.year.min;
      let avgValue = [];
      for (let j = 0; j <= diffYear; j++) {
        avgValue[j] = 0;
      }
      for (let i = 0; i < this.ecoIntegrationChart.length; i++) {
        this.ecoIntegrationChart[i]["color"] = this.colorPattern[i];
        // if (i < 5) {
        this.ecoIntegrationChart[i]["visible"] = true;
        // } else {
        //   this.ecoIntegrationChart[i]["visible"] = false;
        // }
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
      let yAxisTitle = this.input.type + " Integration";

      Highcharts.chart("lineChartByDimension", {
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
    },

    //Intregration process across periods
    integrationProgressPrepareData() {
      this.integrationProgressMakeEcoList();
      this.integrationProgressMakeAvg();
      this.integrationProgressMakeAvgGroup();
      this.integrationProgressLegendChartName();
      this.intergrationProgressSubTitle();
      this.integrationProgressMergeData();
    },
    integrationProgressLegendChartName() {
      let diffYear = Math.floor(
        (this.input.year.max - this.input.year.min) / 2
      );
      this.integrationProgressYearStart =
        this.input.year.min + "-" + (this.input.year.min + diffYear);
      this.integrationProgressYearEnd =
        this.input.year.max - diffYear + "-" + this.input.year.max;
    },
    integrationProgressMakeEcoList() {
      this.intergrationProgressList = [];
      this.ecoIntegrationChart.forEach((item) => {
        //Make economic list in left panel
        let temp = [];

        temp = {
          name: item.name,
          lastValue: item.lastValue,
          visible: true,
        };

        this.intergrationProgressList.push(temp);
      });
    },
    integrationProgressMakeAvg() {
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
          color: "#2381B8",
          data: Number(avg1).toFixed(2),
        };
        let temp2 = {
          name: item.name,
          color: "#13405A8",
          data: Number(avg2).toFixed(2),
        };
        this.integrationProgressChartSeries1.push(temp1);

        this.integrationProgressChartSeries2.push(temp2);
      });
      this.integrationProgressChartSeries1 =
        this.integrationProgressChartSeries1.map((x) => Number(x.data));
      this.integrationProgressChartSeries2 =
        this.integrationProgressChartSeries2.map((x) => Number(x.data));
    },
    integrationProgressMakeAvgGroup() {
      this.integrationProgressPlotChartGroup = [];

      let diffYearByTwo = Math.floor(
        (this.input.year.max - this.input.year.min) / 2
      );
      let arrGroup1 = this.ecoIntegrationChartGroup.data.slice(
        0,
        diffYearByTwo + 1
      );
      let arrGroup2 = this.ecoIntegrationChartGroup.data.slice(
        this.ecoIntegrationChartGroup.data.length - diffYearByTwo - 1
      );
      let avgGroup1 =
        Number(arrGroup1.reduce((pc, cc) => pc + cc, 0)) / arrGroup1.length;
      let avgGroup2 =
        Number(arrGroup2.reduce((pc, cc) => pc + cc, 0)) / arrGroup2.length;
      this.integrationProgressPlotChartGroup.push(Number(avgGroup1.toFixed(2)));
      this.integrationProgressPlotChartGroup.push(Number(avgGroup2.toFixed(2)));
    },
    intergrationProgressSubTitle() {
      let diffGroup =
        this.integrationProgressPlotChartGroup[1] -
        this.integrationProgressPlotChartGroup[0];

      this.integrationProgressSubTitleText = `From ${
        this.integrationProgressYearStart
      } to ${this.integrationProgressYearEnd}
      ${this.yourGroupName}’s integration average ${
        diffGroup > 0 ? "increased" : "decreased"
      } ${Math.abs(diffGroup).toFixed(2)} from  ${
        this.integrationProgressPlotChartGroup[0]
      } to ${this.integrationProgressPlotChartGroup[1]}.`;

      let counter = 0;
      this.intergrationProgressList.forEach((item) => {
        let temp = {
          name: item.name,
          diffData: Number(
            (
              this.integrationProgressChartSeries2[counter] -
              this.integrationProgressChartSeries1[counter]
            ).toFixed(2)
          ),
        };

        this.integrationProgressdiffValueArray.push(temp);
        counter++;
      });
      this.integrationProgressdiffValueArray.sort(
        (a, b) => b.diffData - a.diffData
      );

      this.integrationProgressSubTitleTextLine2 = `${this.capitalize(
        this.integrationProgressdiffValueArray[0].name
      )}
      (${
        this.integrationProgressdiffValueArray[0].diffData
      }) and ${this.integrationProgressdiffValueArray[1].name.toLowerCase()}
      (${
        this.integrationProgressdiffValueArray[1].diffData
      }) progressed the most.
      ${this.capitalize(
        this.integrationProgressdiffValueArray[
          this.integrationProgressdiffValueArray.length - 1
        ].name
      )} (${
        this.integrationProgressdiffValueArray[
          this.integrationProgressdiffValueArray.length - 1
        ].diffData
      }) and ${this.integrationProgressdiffValueArray[
        this.integrationProgressdiffValueArray.length - 2
      ].name.toLowerCase()}(${
        this.integrationProgressdiffValueArray[
          this.integrationProgressdiffValueArray.length - 2
        ].diffData
      }) progressed the least.`;
    },

    integrationProgressMergeData() {
      this.integrationProgressPlotChartCat = [];
      this.integrationProgressPlotChartSeries1 = [];
      this.integrationProgressPlotChartSeries2 = [];

      if (this.integrationProgressChartGroupVisible) {
        this.integrationProgressPlotChartCat.push("Your group");
        this.integrationProgressPlotChartSeries1.push(
          this.integrationProgressPlotChartGroup[0]
        );
        this.integrationProgressPlotChartSeries2.push(
          this.integrationProgressPlotChartGroup[1]
        );
      }

      let countInter = 0;
      this.intergrationProgressList.forEach((item) => {
        if (item.visible) {
          this.integrationProgressPlotChartCat.push(item.name);
          this.integrationProgressPlotChartSeries1.push(
            this.integrationProgressChartSeries1[countInter]
          );
          this.integrationProgressPlotChartSeries2.push(
            this.integrationProgressChartSeries2[countInter]
          );
        }
        countInter++;
      });
      this.loadIntegrationPeriodsChart();
    },
    integrationProgressToggleGroupOnOff() {
      this.integrationProgressChartGroupVisible =
        !this.integrationProgressChartGroupVisible;
      this.integrationProgressMergeData();
    },
    integrationProgressToggleOnOff(index) {
      this.intergrationProgressList[index]["visible"] =
        !this.intergrationProgressList[index]["visible"];
      this.integrationProgressMergeData();
    },
    loadIntegrationPeriodsChart() {
      let yAxisTitle = this.input.type + " Integration";
      Highcharts.chart("container2x", {
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
          categories: this.integrationProgressPlotChartCat,
          crosshair: true,
          labels: {
            formatter() {
              if (this.value == "Your group")
                return `<span style="color: #F99704; font-weight:bold;">${this.value}</span>`;
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
          headerFormat:
            '<span style="font-size:16px"><b>{point.key}</b></span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.2f} </b></td></tr>',
          footerFormat: "</table>",
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
            name: this.integrationProgressYearStart,
            data: this.integrationProgressPlotChartSeries1,
            color: "#2381B8",
          },
          {
            name: this.integrationProgressYearEnd,
            data: this.integrationProgressPlotChartSeries2,
            color: "#13405A",
          },
        ],
        legend: {
          align: "right",
          verticalAlign: "top",
          y: 50,
          layout: "vertical",
          floating: true,
        },
        exporting: {
          enabled: true,
        },
      });
    },
    //dataAvail
    async loadDataFromDatabase() {
      let data = {
        input: this.input,
        countryFullList: this.data,
      };
      let url = this.ri_api + "economy/data_avail_by_dimension.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.dataAvailable.rawData = res.data;
      let avgGroup = Math.round(
        this.dataAvailable.rawData
          .map((x) => x.data)
          .reduce((pc, cc) => pc + cc, 0) / this.dataAvailable.rawData.length
      );
      let temp = {
        name: "Your group",
        data: avgGroup,
      };
      this.dataAvailable.rawData.push(temp);
      this.dataAvailable.rawData.sort((a, b) => b.data - a.data);
      this.setDataforDataAvail(avgGroup);
    },
    setDataforDataAvail(avgGroup) {
      this.dataAvailable.cat = this.dataAvailable.rawData.map((x) => x.name);
      this.dataAvailable.chartData = this.dataAvailable.rawData.map(
        (x) => x.data
      );
      this.dataAvailable.subTitle1 = `${this.capitalize(
        this.yourGroupName
      )} has data for ${avgGroup}% of all possible reporter-partner pairs. 
      ${this.capitalize(this.dataAvailable.rawData[0].name)} (${
        this.dataAvailable.chartData[0]
      }%) and ${this.dataAvailable.rawData[0].name.toLowerCase()} (${
        this.dataAvailable.chartData[0]
      }%) were the dimensions with the most complete data set, while ${this.dataAvailable.rawData[
        this.dataAvailable.rawData.length - 1
      ].name.toLowerCase()} (${
        this.dataAvailable.chartData[this.dataAvailable.rawData.length - 1]
      }%) and ${this.dataAvailable.rawData[
        this.dataAvailable.rawData.length - 2
      ].name.toLowerCase()} (${
        this.dataAvailable.chartData[this.dataAvailable.rawData.length - 2]
      }%) were the least.`;

      this.plotChartDataAvail();
    },
    plotChartDataAvail() {
      Highcharts.chart("container3x", {
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
              if (this.value == "Your group")
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
          labels: {
            format: "{value} %",
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
              format: "{y} %",
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
      let url = this.ri_api + "economy/weight_by_dimension.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.weight.rawData = res.data;

      this.weight.rawData.sort((a, b) => b.data - a.data);

      this.setDataforWeight();
    },
    setDataforWeight() {
      this.weight.cat = this.weight.rawData.map((x) => x.name);
      this.weight.chartData = this.weight.rawData.map((x) => x.data);

      this.weight.subTitle1 = `${this.capitalize(
        this.weight.rawData[0].name
      )} (${
        this.weight.chartData[0]
      }) and ${this.weight.rawData[1].name.toLowerCase()} (${
        this.weight.chartData[1]
      })
      were the most prominent dimensions in driving the group's integration, whereas  ${this.weight.rawData[
        this.weight.rawData.length - 2
      ].name.toLowerCase()} (${
        this.weight.chartData[this.weight.rawData.length - 2]
      }) and ${this.weight.rawData[
        this.weight.rawData.length - 1
      ].name.toLowerCase()} (${
        this.weight.chartData[this.weight.rawData.length - 1]
      }) were the least. Full data availability would yield an equal weighting average across all economies, each with weighting 0.14.`;
      this.plotChartDataWeight();
    },
    plotChartDataWeight() {
      Highcharts.chart("container4x", {
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
          max: 1,
          title: {
            text: "",
          },
          plotLines: [
            {
              color: "red",
              width: 1,
              value: 1 / 7,
              zIndex: 5,
              dashStyle: "longdashdot",
              label: {
                text: "Equal weight: 0.14",
                align: "right",
                y: -10,
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
            '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
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
    this.yourGroupName = this.input.reporting.label;
    this.loadEcoIntegration();
    this.loadDataFromDatabase();
    this.weightLoadData();
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
