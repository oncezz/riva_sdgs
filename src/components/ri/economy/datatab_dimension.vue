<template>
  <div class="bgGrey font-16 q-pt-md" align="center">
    <div style="width: 90%; margin: auto">
      <div class="q-py-xl row items-center">
        <div class="font-12" align="left">
          <div class="font-30"><b>Dimension</b></div>
          <div class="">Select a dimension to see detail</div>
        </div>
        <div class="" style="width: 400px">
          <q-select
            class="inputSelectClass"
            dark
            dense
            v-model="selected"
            :style="{ background: colorSelected }"
            :options="dimensionOptions"
            @input="changeDimension()"
          />
        </div>
      </div>
      <div class="q-pt-sm">
        <q-card flat class="cardStyle">
          <q-tabs
            v-model="tab"
            class="text-grey"
            active-color="secondary"
            indicator-color="secondary"
            align="justify"
            narrow-indicator
            no-caps
            @click="changeTab()"
          >
            <q-tab name="economy" label="By economy" />
            <q-tab name="index" label="By indicator (and country)" />
            <q-tab name="data" label="Indicator data availability" />
            <q-tab name="weight" label="Indicator weights in dimension" />
            <div
              class="font-12 cursor-pointer q-px-md"
              align="right"
              @click="goToURL()"
            >
              <u>Click here to see this group’s availability matrix</u>
            </div>
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated style="background: #ededed">
            <q-tab-panel name="economy">
              <div class="q-px-xl" align="left">
                <div class="font-24 q-py-md">
                  Which economies are performing best in
                  {{ selected.toLowerCase() }}?
                </div>
              </div>
              <div class="economyOverflow">
                <div id="chartEconomy"></div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="index">
              <div class="q-px-xl" align="left">
                <div class="font-24">
                  Which indicators are driving the group’s
                  {{ selected.toLowerCase() }} integration score?
                </div>
                <p class="font-16">
                  From {{ firstHalfPeriod }} to {{ secondHalfPeriod }}
                  {{ selected.toLowerCase() }} integration for
                  {{ yourGroupName }}
                  {{
                    indexChart.series[1].data[0] -
                      indexChart.series[0].data[0] >
                    0
                      ? "increased"
                      : "decreased"
                  }}
                  {{
                    Math.abs(
                      indexChart.series[1].data[0] -
                        indexChart.series[0].data[0]
                    ).toFixed(2)
                  }}
                  from {{ indexChart.series[0].data[0] }} to
                  {{ indexChart.series[1].data[0] }}.
                  {{ indexChart.catName[1] }} (
                  {{
                    indexChart.series[1].data[1] -
                      indexChart.series[0].data[1] >
                    0
                      ? "+"
                      : "-"
                  }}{{
                    Math.abs(
                      indexChart.series[1].data[1] -
                        indexChart.series[0].data[1]
                    ).toFixed(2)
                  }}
                  ) progressed the most.
                  {{ indexChart.catName[indexChart.series[0].data.length - 1] }}
                  ({{
                    indexChart.catName[indexChart.series[1].data.length - 1] -
                      indexChart.catName[indexChart.series[0].data.length - 1] >
                    0
                      ? "+"
                      : "-"
                  }}{{
                    Math.abs(
                      indexChart.series[1].data[
                        indexChart.series[1].data.length - 1
                      ] -
                        indexChart.series[0].data[
                          indexChart.series[0].data.length - 1
                        ]
                    ).toFixed(2)
                  }}) progressed the least.
                </p>
                <p class="font-16">
                  Click the indicator’s chart to view the economies associated
                  with that indicator.
                </p>
              </div>
              <div id="chartIndex"></div>
            </q-tab-panel>

            <q-tab-panel name="data">
              <div class="q-px-xl" align="left">
                <div class="font-24">
                  How much data is available for each indicator in
                  {{ selected.toLowerCase() }}?
                  <q-icon name="fas fa-question-circle" size="24px">
                    <q-tooltip>
                      Data availability for each indicator is calculated<br />
                      as the ratio between the number of pairs with<br />
                      available data and all the possible relevant pair<br />
                      combinations.<br /><br />

                      E.g., take any indicator A, and a group where X<br />
                      is the reporting economy and Y and Z are the<br />
                      partner economies. For indicator A, there are 2<br />
                      possible unique pairs: (X-Y), (X-Z). If data is<br />
                      available for 1 of these pairs, data availability<br />
                      for indicator A will be set at 50% (1/2)
                    </q-tooltip>
                  </q-icon>
                </div>
                <p class="font-16">
                  {{ dataChart.catName[0] }} has the most data available ({{
                    dataChart.series[0].data[0]
                  }}%), while
                  {{
                    dataChart.catNameLower[dataChart.series[0].data.length - 1]
                  }}
                  has the least ({{
                    dataChart.series[0].data[
                      dataChart.series[0].data.length - 1
                    ]
                  }}%). <br />
                </p>
              </div>
              <div id="chartData"></div>
            </q-tab-panel>

            <q-tab-panel name="weight">
              <div class="q-px-xl" align="left">
                <div class="font-24">
                  How much is each indicator contributing to
                  {{ yourGroupName }}'s {{ selected.toLowerCase() }} score?
                  <q-icon name="fas fa-question-circle" size="24px">
                    <q-tooltip>
                      Within a dimension and a particular pair, all<br />
                      available indicators are weighted equally.<br />
                      As such, indicator weights largely reflect data<br />
                      availability, albeit not perfectly. To learn more<br />
                      about indicator weights please visit our<br />
                      Technical note (upper-right corner).
                    </q-tooltip>
                  </q-icon>
                </div>
                <p class="font-16">
                  {{ weightChart.catName[0] }} ({{
                    weightChart.series[0].data[0]
                  }}) was the most prominent indicator in the
                  {{ selected.toLowerCase() }}
                  dimension, while
                  {{
                    weightChart.catNameLower[
                      weightChart.series[0].data.length - 1
                    ]
                  }}
                  ({{
                    weightChart.series[0].data[
                      weightChart.series[0].data.length - 1
                    ]
                  }}) were the least.
                </p>
              </div>
              <div id="chartWeight"></div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>

    <!-- chart indicator  -->
    <div v-show="showIndicatorChart" class="fullscreen bgDrop">
      <div class="fixed-center cardIndicator q-pa-md">
        <div class="row items-center q-pb-none">
          <div
            class="inputSelectClass text-h6"
            :style="{ background: colorSelected }"
          >
            {{ selected }}
          </div>
          <q-space />
          <q-btn
            icon="close"
            size="lg"
            flat
            round
            dense
            @click="showIndicatorChart = false"
          />
        </div>
        <div class="q-py-md" align="left">
          <div class="font-24">{{ indicatorName }}</div>
          <div class="font-14">
            This graph is sorted by the different value between
            {{ firstHalfPeriod }} and {{ secondHalfPeriod }}.
          </div>
        </div>

        <div class="chartincard"><div id="chartIndicator"></div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "input", "report"],

  data() {
    return {
      selected: "",
      tab: "economy",
      colorSelected: "",
      yourGroupName: "Your group",
      dimensionOptions: [],
      allDimensionData: [],
      firstHalfPeriod: "",
      secondHalfPeriod: "",
      //
      dimensionIndex: 1,
      countAllPair: 0,
      weightDataTemp: [],
      showIndicatorChart: false,
      indicatorName: "",
      indicatorIndex: 0,
      indicatorStr: [],
      indicatorChart: {
        catName: [],
        series: [
          {
            name: "",
            color: "#2381B8",
            data: [],
          },
          {
            name: "",
            color: "#13405A",
            data: [],
          },
        ],
      },
      economyChart: {
        catName: [],
        series: [
          {
            name: "",
            color: "#2381B8",
            data: [],
          },
          {
            name: "",
            color: "#13405A",
            data: [],
          },
        ],
      },
      indexChart: {
        //change catname when change dimension
        catName: [],
        series: [
          {
            name: "",
            color: "#2381B8",
            data: [],
          },
          {
            name: "",
            color: "#13405A",
            data: [],
          },
        ],
      },
      dataChart: {
        catName: [],
        catNameLower: [],
        series: [
          {
            name: "data available",
            color: "#2381B8",
            data: [],
          },
        ],
      },
      weightChart: {
        equalWeight: 1,
        catName: [],
        catNameLower: [],
        series: [
          {
            name: "weight",
            color: "#2381B8",
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    async loadData() {
      if (this.input.year.min == this.input.year.max - 1) {
        this.firstHalfPeriod = this.input.year.min;
        this.secondHalfPeriod = this.input.year.max;
      } else {
        let diffYear = Math.floor(
          (this.input.year.max - this.input.year.min) / 2
        );
        this.firstHalfPeriod =
          this.input.year.min + "-" + (this.input.year.min + diffYear);
        this.secondHalfPeriod =
          this.input.year.max - diffYear + "-" + this.input.year.max;
      }
      this.allDimensionData = [];
      let data = {
        type: this.input.type,
      };
      let url = this.ri_api + "main/dimension_icon.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.allDimensionData = res.data;
      this.allDimensionData.forEach((x) => {
        this.dimensionOptions.push(x.name);
      });
      this.countAllPair = 0;
      this.report.forEach((report) => {
        this.data.forEach((partner) => {
          if (report.iso != partner.iso) {
            this.countAllPair++;
          }
        });
      });
      // console.log("countAllPair", this.countAllPair);
      // console.log(this.allDimensionData);
      // console.log(this.input);
      this.selected = this.dimensionOptions[0];
      this.changeDimension();
    },
    async changeDimension() {
      // that mean change all chart
      for (let i = 0; i < this.allDimensionData.length; i++) {
        if (this.selected == this.allDimensionData[i].name) {
          this.colorSelected = this.allDimensionData[i].color;
          this.dimensionIndex = i + 1;
        }
      }
      this.loadAllChart();
    },
    async loadAllChart() {
      ////////
      this.loadingShow();
      await this.setIndexChart();
      await this.setDataChart();
      await this.setWeightChart();
      await this.setEconomyChart();
      this.loadingHide();
      /////

      this.changeTab();
    },
    changeTab() {
      if (this.tab == "index") {
        this.loadIndexChart();
      } else if (this.tab == "data") {
        this.loadDataChart();
      } else if (this.tab == "weight") {
        this.loadWeightChart();
      } else {
        this.loadEconomyChart();
      }
    },
    goToURL() {
      // this.getURL();
      let dataGet = this.$q.localStorage.getItem("dataAvail");
      this.id = dataGet.key;
      this.$router.push("/ridataavailability/" + this.id);
    },
    /// chart
    async setIndexChart() {
      this.indicatorStr =
        this.allDimensionData[this.dimensionIndex - 1].indicator;
      let dataTemp = {
        input: this.input,
        partnerMap: this.data.map((x) => x.iso),
        reportMap: this.report.map((x) => x.iso),
        index: this.dimensionIndex,
        indicator: this.indicatorStr,
      };
      let url = this.ri_api + "economy/index_dimensiontab.php";
      let res = await axios.post(url, JSON.stringify(dataTemp));
      let result = res.data;
      console.log(result);
      result.sort((a, b) => b.dif - a.dif);
      // console.log(result);
      // let avg = [0, 0];
      // for (let i in result) {
      //   avg[0] += result[i].data[0];
      //   avg[1] += result[i].data[1];
      // }
      // avg[0] /= result.length;
      // avg[1] /= result.length;
      // @ Youy group
      this.indexChart.series[0].data = [];
      this.indexChart.series[1].data = [];
      this.indexChart.series[0].name = this.firstHalfPeriod;
      this.indexChart.series[1].name = this.secondHalfPeriod;
      // this.indexChart.catName[0] = this.yourGroupName;
      // this.indexChart.series[0].data[0] = Number(avg[0].toFixed(2));
      // this.indexChart.series[1].data[0] = Number(avg[1].toFixed(2));

      for (let k = 0; k < result.length; k++) {
        this.indexChart.series[0].data[k] = result[k].data[0];
        this.indexChart.series[1].data[k] = result[k].data[1];
        this.indexChart.catName[k] = result[k].catName;
      }
      // console.log(this.indexChart);
    },
    async loadIndexChart() {
      let _this = this;
      Highcharts.chart("chartIndex", {
        chart: {
          type: "bar",
          backgroundColor: "#EDEDED",
          marginLeft: 230,
        },

        title: {
          text: "",
        },
        xAxis: {
          categories: this.indexChart.catName,
          labels: {
            // align: "left",
            // x: -220,
            align: "center",
            formatter() {
              if (this.value == _this.yourGroupName)
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
            text: "",
          },
          gridLineWidth: 0,
          minorGridLineWidth: 0,
        },
        tooltip: {
          shared: true,
          formatter: function () {
            // console.log(this);
            let points = this.points;
            let pointsLength = points.length;
            let tooltipMarkup = pointsLength
              ? '<span style="font-size: 14px"><b>' +
                points[0].key +
                "</b></span><br/>"
              : "";
            let difData = Number(
              (this.points[1].y - this.points[0].y).toFixed(2)
            );
            let percentDif = Number(
              ((this.points[1].y - this.points[0].y) / this.points[0].y) * 100
            ).toFixed(2);
            let textDif = difData < 0 ? "decreased" : "increased";
            tooltipMarkup +=
              "Average index " +
              textDif +
              " by " +
              Math.abs(difData).toFixed(2) +
              " ( " +
              Math.abs(percentDif).toFixed(2) +
              "% )";

            return tooltipMarkup;
          },
        },
        plotOptions: {
          bar: {
            pointPadding: 0,
            borderWidth: 0,
            dataLabels: {
              align: "right",
              enabled: true,
              borderWidth: 0,
              inside: true,
              // format: "{y} %",
            },
          },
          series: {
            pointPadding: 0,
            borderWidth: 0,
            events: {
              click: function (ev) {
                if (ev.point.category !== _this.yourGroupName) {
                  // console.log(ev);
                  _this.indicatorName = ev.point.category;
                  _this.setIndicatorChart();
                }
              },
              legendItemClick: function (e) {
                e.preventDefault();
              },
            },
          },
        },
        legend: {
          align: "right",
          verticalAlign: "top",
          y: 50,
          layout: "vertical",
        },
        exporting: { enabled: true },
        // legend: { enabled: false },
        credits: { enabled: false },
        series: this.indexChart.series,
      });
    },
    async setDataChart() {
      let dataTemp = {
        input: this.input,
        partnerMap: this.data.map((x) => x.iso),
        reportMap: this.report.map((x) => x.iso),
        dimension: this.dimensionIndex,
      };
      let url = this.ri_api + "economy/data_dimensiontab.php";
      let res = await axios.post(url, JSON.stringify(dataTemp));
      let result = res.data;
      let tableTemp = [];
      let totalIndex = this.indicatorStr.length;
      this.weightDataTemp = [];
      for (let i = 1; i <= totalIndex; i++) {
        let indexCount =
          (result.filter((x) => Number(x.indicator) == i).length /
            this.countAllPair) *
          100;

        // console.log("indexcount", indexCount);
        let tPush = {
          data: indexCount,
          catName: this.indicatorStr[i - 1],
        };
        tableTemp.push(tPush);

        let weightCount =
          result.filter((x) => Number(x.indicator) == i).length / result.length;
        let wPush = {
          data: weightCount,
          catName: this.indicatorStr[i - 1],
        };
        this.weightDataTemp.push(wPush);
      }
      // console.log(this.indicatorStr);
      // console.log(result);
      console.log(tableTemp);
      tableTemp.sort((a, b) => b.data - a.data);
      // console.log(result);
      this.dataChart.catName = tableTemp.map((x) => x.catName);
      this.dataChart.catNameLower = tableTemp.map((x) => {
        return x.catName.charAt(0).toLowerCase() + x.catName.substring(1);
      });
      this.dataChart.series[0].data = tableTemp.map((x) => x.data);
    },
    async loadDataChart() {
      Highcharts.chart("chartData", {
        chart: {
          type: "bar",
          backgroundColor: "#EDEDED",
          marginLeft: 230,
          marginRight: 50,
        },

        title: {
          text: "",
        },
        xAxis: {
          categories: this.dataChart.catName,
          labels: {
            // align: "left",
            // x: -220,
            align: "center",
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
          gridLineWidth: 0,
        },
        tooltip: {
          valueSuffix: " %",
        },
        plotOptions: {
          bar: {
            dataLabels: {
              align: "right",
              enabled: true,
              borderWidth: 0,
              inside: true,
              format: "{y} %",
            },
          },
          series: {
            pointWidth: 50,
            pointPadding: 0,
            borderWidth: 0,
          },
        },
        exporting: { enabled: true },
        legend: { enabled: false },
        credits: { enabled: false },
        series: this.dataChart.series,
      });
    },
    async setWeightChart() {
      this.weightDataTemp.sort((a, b) => b.data - a.data);

      this.weightChart.series[0].data = [];
      this.weightChart.catName = this.weightDataTemp.map((x) => x.catName);
      this.weightChart.catNameLower = this.weightDataTemp.map((x) => {
        return x.catName.charAt(0).toLowerCase() + x.catName.substring(1);
      });
      this.weightChart.series[0].data = this.weightDataTemp.map((x) => x.data);
      // for (let i in result) {
      //   this.weightChart.catName[i] = result[i].catName;
      //   this.weightChart.catNameLower[i] = result[i].catNameLower;
      //   this.weightChart.series[0].data[i] = result[i].data;
      // }

      this.weightChart.equalWeight = (
        1 / this.weightChart.series[0].data.length
      ).toFixed(2);
      // console.log(this.weightChart);
    },
    async loadWeightChart() {
      Highcharts.chart("chartWeight", {
        chart: {
          type: "bar",
          backgroundColor: "#EDEDED",
          marginLeft: 230,
          marginRight: 50,
        },

        title: {
          text: "",
        },
        xAxis: {
          categories: this.weightChart.catName,
          labels: {
            // align: "left",
            // x: -220,
            align: "center",
          },
        },
        yAxis: {
          min: 0,
          max: 1,
          title: {
            text: "",
          },
          gridLineWidth: 0,
          plotLines: [
            {
              color: "#FF0000",
              dashStyle: "dash",
              zIndex: 5,
              width: 2,
              value: this.weightChart.equalWeight,
              label: {
                text: "Equal weighting: " + this.weightChart.equalWeight,
                rotation: 360,
              },
            },
          ],
        },
        tooltip: {},
        plotOptions: {
          bar: {
            dataLabels: {
              align: "right",
              enabled: true,
              borderWidth: 0,
              inside: true,
            },
          },
          series: {
            pointWidth: 50,
            pointPadding: 0,
            borderWidth: 0,
          },
        },
        exporting: { enabled: true },
        legend: { enabled: false },
        credits: { enabled: false },
        series: this.weightChart.series,
      });
    },
    async setIndicatorChart() {
      let yearMin = this.input.year.min;
      let yearMax = this.input.year.max;
      // console.log(yearMin, yearMax);
      let diffYear = Math.floor(
        (this.input.year.max - this.input.year.min) / 2
      );
      let indexI = 0;
      for (let i = 0; i < this.indicatorStr.length; i++) {
        if (this.indicatorName == this.indicatorStr[i]) {
          indexI = i + 1;
        }
      }
      let sendData = {
        input: this.input,
        partnerMap: this.data.map((x) => x.iso),
        reportMap: this.report.map((x) => x.iso),
        dimension: this.dimensionIndex,
        index: indexI,
      };
      // console.log("test");
      // console.log(this.data);
      let url = this.ri_api + "economy/indicatorchart_datatab_dimension.php";
      let res = await axios.post(url, JSON.stringify(sendData));
      let tempTable = res.data;
      let result = [];
      this.indicatorChart.series[0].name = this.firstHalfPeriod;
      this.indicatorChart.series[1].name = this.secondHalfPeriod;

      // console.log("tempTable", tempTable);
      for (let j = 0; j < sendData.partnerMap.length; j++) {
        // console.log(sendData.partnerMap[j]);
        let eachCountry = tempTable.filter(
          (country) =>
            country.reporter == sendData.partnerMap[j] ||
            country.partner == sendData.partnerMap[j]
        );
        // console.log(eachCountry);

        if (eachCountry.length != 0) {
          let firstHalf = eachCountry.filter(
            (x) => x.year <= yearMin + diffYear
          );
          let secondHalf = eachCountry.filter(
            (x) => x.year >= yearMax - diffYear
          );
          // console.log("firstHalf", firstHalf);
          // console.log("secondHalf", secondHalf);
          let firstScore =
            firstHalf.reduce((a, b) => a + Number(b.score), 0) /
            firstHalf.length;
          let secondScore =
            secondHalf.reduce((a, b) => a + Number(b.score), 0) /
            secondHalf.length;
          // console.log("S1", firstScore);
          // console.log("S2", secondScore);
          let tempPush = {
            country: this.data[j].label,
            data: [],
            dif: Number(secondScore - firstScore),
          };
          tempPush.data[0] = Number(firstScore);
          tempPush.data[1] = Number(secondScore);
          // console.log(tempPush);
          result.push(tempPush);
        }
      }
      result.sort((a, b) => b.dif - a.dif);
      for (let k in result) {
        this.indicatorChart.series[0].data[k] = result[k].data[0];
        this.indicatorChart.series[1].data[k] = result[k].data[1];
        this.indicatorChart.catName[k] = result[k].country;
      }
      // console.log(this.indicatorChart);
      this.loadIndicatorChart();
      this.showIndicatorChart = true;
    },
    async loadIndicatorChart() {
      Highcharts.chart("chartIndicator", {
        chart: {
          type: "bar",
          backgroundColor: "#EDEDED",
          marginLeft: 160,
          height:
            this.indicatorChart.catName.length > 9
              ? this.indicatorChart.catName.length * 60
              : 580,
        },

        title: {
          text: "",
        },
        xAxis: {
          categories: this.indicatorChart.catName,
          labels: {
            align: "right",
          },
        },
        yAxis: {
          min: 0,
          max: 1,
          title: {
            text: "",
          },
          gridLineWidth: 0,
          minorGridLineWidth: 0,
        },
        tooltip: {
          shared: true,
          formatter: function () {
            // console.log(this);
            let points = this.points;
            let pointsLength = points.length;
            let tooltipMarkup = pointsLength
              ? '<span style="font-size: 14px"><b>' +
                points[0].key +
                "</b></span><br/>"
              : "";
            let difData = Number(
              (this.points[1].y - this.points[0].y).toFixed(2)
            );
            let percentDif = Number(
              ((this.points[1].y - this.points[0].y) / this.points[0].y) * 100
            ).toFixed(2);
            let textDif = difData < 0 ? "decreased" : "increased";
            tooltipMarkup +=
              "Average index " +
              textDif +
              " by " +
              Math.abs(difData).toFixed(2) +
              " ( " +
              Math.abs(percentDif).toFixed(2) +
              "% )";

            return tooltipMarkup;
          },
        },
        plotOptions: {
          bar: {
            pointPadding: 0,
            borderWidth: 0,
            dataLabels: {
              align: "right",
              enabled: true,
              borderWidth: 0,
              inside: true,
            },
          },
          series: {
            pointPadding: 0,
            borderWidth: 0,
            events: {
              legendItemClick: function (e) {
                e.preventDefault();
              },
            },
          },
        },
        legend: {
          align: "right",
          verticalAlign: "top",
          y: 50,
          layout: "vertical",
        },
        exporting: { enabled: true },
        credits: { enabled: false },
        series: this.indicatorChart.series,
      });
    },
    async setEconomyChart() {
      //
      let dataTemp = {
        input: this.input,
        partner: this.data,
        partnerMap: this.data.map((x) => x.iso),
        reportMap: this.report.map((x) => x.iso),
        dimension: this.selected,
        index: this.dimensionIndex,
      };
      let url = this.ri_api + "economy/economychart_datatab_dimension.php";
      let res = await axios.post(url, JSON.stringify(dataTemp));
      let result = res.data;
      result.sort((a, b) => b.dif - a.dif);
      // console.log(result);
      // let avg = [0, 0];
      // for (let i in result) {
      //   avg[0] += result[i].data[0];
      //   avg[1] += result[i].data[1];
      // }
      // avg[0] /= result.length;
      // avg[1] /= result.length;

      this.economyChart.series[0].data = [];
      this.economyChart.series[1].data = [];
      // @ Youy group
      this.economyChart.series[0].name = this.firstHalfPeriod;
      this.economyChart.series[1].name = this.secondHalfPeriod;
      // this.economyChart.catName[0] = this.yourGroupName;
      // this.economyChart.series[0].data[0] = Number(avg[0].toFixed(2));
      // this.economyChart.series[1].data[0] = Number(avg[1].toFixed(2));
      for (let k = 0; k < result.length; k++) {
        this.economyChart.series[0].data[k] = Number(result[k].data[0]).toFixed(
          4
        );
        this.economyChart.series[1].data[k] = Number(result[k].data[1]).toFixed(
          4
        );
        this.economyChart.catName[k] = result[k].country;
      }
      // console.log(this.economyChart);
    },
    async loadEconomyChart() {
      let _this = this;
      Highcharts.chart("chartEconomy", {
        chart: {
          type: "bar",
          backgroundColor: "#EDEDED",
          marginLeft: 180,
          height: this.data.length > 9 ? this.data.length * 60 : 540,
        },

        title: {
          text: "",
        },
        xAxis: {
          categories: this.economyChart.catName,
          labels: {
            align: "right",

            formatter() {
              if (this.value == _this.yourGroupName)
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
            text: "",
          },
          gridLineWidth: 0,
          minorGridLineWidth: 0,
        },
        tooltip: {
          shared: true,
          formatter: function () {
            // console.log(this);
            let points = this.points;
            let pointsLength = points.length;
            let tooltipMarkup = pointsLength
              ? '<span style="font-size: 14px"><b>' +
                points[0].key +
                "</b></span><br/>"
              : "";
            // let indexs;
            // let y_value;
            // for (indexs = 0; indexs < pointsLength; indexs += 1) {
            //   y_value = points[indexs].y.toFixed(2);

            //   tooltipMarkup +=
            //     '<span style="color:' +
            //     points[indexs].color +
            //     '">\u25CF</span> ' +
            //     points[indexs].series.name +
            //     ": <b>" +
            //     y_value +
            //     "</b><br/>";
            // }
            let difData = Number(
              (this.points[1].y - this.points[0].y).toFixed(2)
            );
            let percentDif = Number(
              ((this.points[1].y - this.points[0].y) / this.points[0].y) * 100
            ).toFixed(2);
            let textDif = difData < 0 ? "decreased" : "increased";
            tooltipMarkup +=
              "Average index " +
              textDif +
              " by " +
              Math.abs(difData).toFixed(2) +
              " ( " +
              Math.abs(percentDif).toFixed(2) +
              "% )";

            return tooltipMarkup;
          },
        },
        plotOptions: {
          bar: {
            pointPadding: 0,
            borderWidth: 0,
            dataLabels: {
              align: "right",
              enabled: true,
              borderWidth: 0,
              inside: true,
              // format: "{y} %",
            },
          },
          series: {
            pointPadding: 0,
            borderWidth: 0,
            events: {
              legendItemClick: function (e) {
                e.preventDefault();
              },
            },
          },
        },
        legend: {
          align: "right",
          y: 50,
          verticalAlign: "top",
          layout: "vertical",
        },
        exporting: { enabled: true },
        credits: { enabled: false },
        series: this.economyChart.series,
      });
    },
    async checkYourName() {
      // console.log(this.input);
      this.yourGroupName = this.input.reporting.label;
      await this.loadData();
    },
  },
  mounted() {
    this.checkYourName();
  },
};
</script>

<style lang="scss" scoped>
.bgGrey {
  background: #ededed;
  height: 940px;
}
.textGrey {
  color: #757575;
}
.inputSelectClass {
  background: #2d9687;
  padding-left: 14px;
  width: 340px;
  color: white;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
}
.cardStyle {
  background: #ededed;
  border: 1px solid #757575;
  height: 700px;
}
////////////
.cardIndicator {
  max-width: 1200px;
  max-height: 800px;
  width: 1200px;
  height: 750px;
  background: #f7f7f7;
  z-index: 999999;
}
.chartincard {
  width: 100%;
  height: 580px;
  background: #c4c4c4;
  overflow-y: auto;
}
.bgDrop {
  background-color: rgba($color: #000000, $alpha: 0.6);
}
.economyOverflow {
  width: 100%;
  height: 540px;
  overflow-y: auto;
}
/////
#chartIndicator {
  min-height: 580px;
  width: 100%;
}
#chartEconomy {
  min-height: 540px;
  width: 100%;
}
#chartIndex {
  height: 460px;
  width: 100%;
}
#chartData,
#chartWeight {
  height: 510px;
  width: 100%;
}
</style>
