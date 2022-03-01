<template>
  <div class="bgGrey font-16 q-pt-md" align="center">
    <div class="" style="width: 90%; margin: auto">
      <div class="q-py-xl row items-center">
        <div class="font-12" align="left">
          <div class="font-30"><b>Dimension</b></div>
          <div class="">Select a specific dimension</div>
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

      <!-- <div class="q-pt-xl font-24" align="left">
        {{ firstHalfPeriod }} , {{ secondHalfPeriod }}
      </div> -->

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

            <div class="font-12 cursor-pointer q-px-md" align="right">
              <u>Click here to see this group’s availability matrix</u>
            </div>
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated style="background: #ededed">
            <q-tab-panel name="economy">
              <div class="q-px-xl" align="left">
                <div class="font-24">
                  Which economies are performing best in
                  {{ selected.toLowerCase() }}?
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="index">
              <div class="q-px-xl" align="left">
                <div class="font-24">
                  Which indicators are driving the group’s
                  {{ selected.toLowerCase() }} Integration score?
                </div>
                <p class="font-16">
                  From {{ firstHalfPeriod }} to {{ secondHalfPeriod }} Trade and
                  Investment Integration for this group increased 0.14 - from
                  0.70 to 0.84.Environmental goods exports to GDP (+0.10)
                  progressed the most. Employment created by DVA in exports
                  (-0.04) progressed the least.
                </p>
              </div>
              <div id="chartIndex"></div>
            </q-tab-panel>

            <q-tab-panel name="data">
              <div class="q-px-xl" align="left">
                <div class="font-24">
                  How much data is available for each indicator in trade and
                  investment?
                  <q-icon name="fas fa-question-circle" size="24px">
                    <q-tooltip>
                      Data availability for each indicator is calculated<br />
                      as the ratio between the number of pairs with<br />
                      available data and all the possible relevant pair<br />
                      combinations. The higher the data availability<br />
                      the more accurate the indicator score is.<br />
                      Concomitantly, the more prominent this<br />
                      indicator will be in driving dimension and<br />
                      overall integration scores.<br /><br />

                      E.g., take any indicator A and a 3 country group<br />
                      (X, Y and Z). For indicator A, there are 6 <br />
                      possible unique pairs: (X-Y), (X-Z), (Y-X), (Y-Z),<br />
                      (Z-X), (Z-Y). If data is available for 3 of these<br />
                      pairs, data availability for indicator A will be set<br />
                      at 50% (3/6)
                    </q-tooltip>
                  </q-icon>
                </div>
                <p class="font-16">
                  Environmental goods exports to GDP has the most data available
                  (80%), while import tariffs on environmental goods has the
                  least (35%). <br />
                </p>
              </div>
              <div id="chartData"></div>
            </q-tab-panel>

            <q-tab-panel name="weight">
              <div class="q-px-xl" align="left">
                <div class="font-24">
                  How much is each indicator contributing to this group's trade
                  and investment score?
                  <q-icon name="fas fa-question-circle" size="24px">
                    <q-tooltip>
                      Within a dimension and a particular pair,<br />
                      all available indicators are weighted equally.<br />
                      As such, indicator weights largely reflect data<br />
                      availability, albeit not perfectly. To learn more<br />
                      about indicator weights please visit our<br />
                      Technical note (upper-right corner).
                    </q-tooltip>
                  </q-icon>
                </div>
                <p class="font-16">
                  Environmental goods exports to GDP (80%) was the most
                  prominent indicator in the trade and investment dimension,
                  while Import tariffs on environmental goods (35%) were the
                  least.
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
  props: ["data", "input"],

  data() {
    return {
      selected: "",
      tab: "economy",
      colorSelected: "",
      dimensionOptions: [],
      allDimensionData: [],
      firstHalfPeriod: "",
      secondHalfPeriod: "",
      //
      showIndicatorChart: false,
      indicatorName: "",
      indicatorIndex: 0,
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

      //
      indexChart: {
        //change catname when change dimension
        catName: [],
        series: [
          {
            name: "2014-2016",
            color: "#2381B8",
            data: [0.74, 0.76, 0.76, 0.7, 0.74],
          },
          {
            name: "2017-2019",
            color: "#13405A",
            data: [0.84, 0.82, 0.78, 0.74, 0.7],
          },
        ],
      },
      dataChart: {
        catName: [],
        series: [
          {
            color: "#2381B8",
            data: [80, 76, 42, 32],
          },
        ],
      },
      weightChart: {
        equalWeight: 1,
        catName: [],
        series: [
          {
            color: "#2381B8",
            data: [80, 76, 42, 32],
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
      // console.log(this.allDimensionData);
      // console.log(this.input);
      this.selected = this.dimensionOptions[0];
      this.changeDimension();
    },
    async changeDimension() {
      // that mean change all chart
      await this.allDimensionData.forEach((x) => {
        if (this.selected == x.name) {
          this.colorSelected = x.color;
        }
      });
      // set data to all chart
      await this.setIndexChart();
      await this.setDataChart();
      await this.setWeightChart();
      /////
      this.changeTab();
    },
    changeTab() {
      if (this.tab == "index") {
        this.loadIndexChart();
      } else if (this.tab == "data") {
        this.loadDataChart();
      } else {
        this.loadWeightChart();
      }
    },

    async setIndexChart() {
      let dataTemp = {
        input: this.input,
        data: this.data,
        selected: this.selected,
      };

      let url = this.ri_api + "intra/index_dimensiontab.php";
      let res = await axios.post(url, JSON.stringify(dataTemp));
      this.indexChart = {
        catName: [],
        series: res.data,
      };
      for (let i = 0; i < this.allDimensionData.length; i++) {
        if (this.selected == this.allDimensionData[i].name) {
          this.indexChart.catName = [...this.allDimensionData[i].indicator];
        }
      }
      this.indexChart.catName.unshift("Your group");
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
            align: "left",
            x: -220,
            useHTML: true,
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
            text: "Sustainable Integration Index",
          },
          gridLineWidth: 0,
          minorGridLineWidth: 0,
        },
        tooltip: {
          // valueSuffix: " %",
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
                if (ev.point.category !== "Your group") {
                  _this.indicatorName = ev.point.category;
                  _this.indicatorIndex = ev.point.index;
                  _this.setIndicatorChart(ev.point.index);
                }
              },
            },
          },
        },
        legend: {
          align: "right",
          verticalAlign: "top",
          layout: "vertical",
        },
        exporting: { enabled: false },
        // legend: { enabled: false },
        credits: { enabled: false },
        series: this.indexChart.series,
      });
    },
    async setDataChart() {
      let dataTemp = {
        input: this.input,
        data: this.data,
        selected: this.selected,
      };

      let url = this.ri_api + "intra/data_dimensiontab.php";
      let res = await axios.post(url, JSON.stringify(dataTemp));
      // console.log(res.data);
      this.dataChart = {
        catName: [],
        series: [
          {
            color: "#2381B8",
            data: res.data[0].data,
          },
        ],
      };

      for (let i = 0; i < this.allDimensionData.length; i++) {
        if (this.selected == this.allDimensionData[i].name) {
          // console.log(this.allDimensionData[i].indicator);
          this.dataChart.catName = [...this.allDimensionData[i].indicator];
        }
      }
      // console.log(this.dataChart);
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
            align: "left",
            x: -220,
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
        legend: {
          align: "right",
          verticalAlign: "top",
          layout: "vertical",
        },
        exporting: { enabled: false },
        legend: { enabled: false },
        credits: { enabled: false },
        series: this.dataChart.series,
      });
    },
    async setWeightChart() {
      let dataTemp = {
        input: this.input,
        data: this.data,
        selected: this.selected,
      };

      let url = this.ri_api + "intra/weight_dimensiontab.php";
      let res = await axios.post(url, JSON.stringify(dataTemp));
      // console.log(res.data);

      this.weightChart = {
        catName: [],
        series: [
          {
            color: "#2381B8",
            data: res.data[0].data,
          },
        ],
      };
      //Change catName & data
      // console.log(this.dataChart.catName);
      for (let i = 0; i < this.allDimensionData.length; i++) {
        if (this.selected == this.allDimensionData[i].name) {
          // console.log(this.allDimensionData[i].indicator);
          this.weightChart.catName = [...this.allDimensionData[i].indicator];
        }
      }
      this.weightChart.equalWeight = (
        1 / this.weightChart.catName.length
      ).toFixed(2);
      //load API
      // this.weightChart.series[0].color = "#2381B8";
      // this.weightChart.series[0].data = [];
      // for (let i = 0; i < this.weightChart.catName.length; i++) {
      //   this.weightChart.series[0].data.push(
      //     Number((Math.random() * 100).toFixed())
      //   );
      // }
      //
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
            align: "left",
            x: -220,
          },
        },
        yAxis: {
          min: 0,
          max: 1,
          title: {
            text: "",
          },
          labels: {},
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
        legend: {
          align: "right",
          verticalAlign: "top",
          layout: "vertical",
        },
        exporting: { enabled: false },
        legend: { enabled: false },
        credits: { enabled: false },
        series: this.weightChart.series,
      });
    },
    async loadIndicatorChart() {
      Highcharts.chart("chartIndicator", {
        chart: {
          type: "bar",
          backgroundColor: "#EDEDED",
          marginLeft: 180,
          height: this.data.length > 9 ? this.data.length * 60 : 580,
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
        tooltip: {},
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
          },
        },
        legend: {
          align: "right",
          verticalAlign: "top",
          layout: "vertical",
        },
        exporting: { enabled: false },
        credits: { enabled: false },
        series: this.indicatorChart.series,
      });
    },
    async setIndicatorChart(index) {
      let sendData = {
        input: this.input,
        data: this.data,
        dimension: this.selected,
        index: index,
      };
      let url = this.ri_api + "intra/indicatorchart_datatab_dimension.php";
      let res = await axios.post(url, JSON.stringify(sendData));

      let result = res.data;
      result.sort((a, b) => b.dif - a.dif);
      console.log(result);

      this.indicatorChart.series[0].name = this.firstHalfPeriod;
      this.indicatorChart.series[1].name = this.secondHalfPeriod;
      for (let k in result) {
        this.indicatorChart.series[0].data[k] = result[k].data1;
        this.indicatorChart.series[1].data[k] = result[k].data2;
        this.indicatorChart.catName[k] = result[k].country;
      }
      console.log(this.indicatorChart);
      this.loadIndicatorChart();
      this.showIndicatorChart = true;
    },
  },

  async mounted() {
    await this.loadData();
    console.log(this.input);
    console.log(this.data);
  },
};
</script>

<style lang="scss" scoped>
.bgGrey {
  background: #ededed;
  height: 920px;
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
//////////
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
////
#chartIndicator {
  min-height: 580px;
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
