<template>
  <div class="bgGrey font-16 q-pt-md" align="center">
    <div style="width: 90%; margin: auto">
      <div class="row items-center">
        <div align="left">
          <div class="font-30"><b>Partner economy</b></div>
          <div class="font-12">Select an economy to see detail</div>
        </div>
        <div class="" style="width: 400px">
          <q-select
            class="inputSelectClass"
            dark
            dense
            v-model="selected"
            style="width: 300px"
            :options="countryOptions"
            @input="setDimensionChart()"
          />
        </div>
      </div>
      <div class="font-24" align="left">
        How is {{ yourGroupName }} integrated with {{ selected.label }} across
        different dimensions?
      </div>
      <!-- spider web chart -->
      <div v-show="dimShow.length > 2" id="spiderWeb"></div>
      <div
        v-show="dimShow.length <= 2"
        class="q-py-md"
        id="dimensionChart"
      ></div>
      <!-- ---------  -->
      <div class="font-24" align="left">
        How is {{ yourGroupName }} integrated with {{ selected.label }} on each
        dimension across different indicators?
      </div>
      <div class="row q-pt-md" align="left">
        <div
          class="non-selectable"
          v-for="(item, index) in dimShow"
          :key="index"
          style="width: 14.285%; height: 60px"
        >
          <div
            v-if="index == selectDimension"
            class="listDimension isPick"
            align="center"
            :style="{ background: dimShow[index].color }"
          >
            {{ item.name }}
          </div>
          <div
            v-else
            class="listDimension"
            align="center"
            @click="pickDimension(index)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="showBar q-pt-md" align="center">
        <div id="barChart"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["input", "data", "report"],
  data() {
    return {
      selected: {},
      dimPick: [],
      tempDimChart: [],
      yourGroupName: "the reporting group",
      firstHalfLastPeriod: 0,
      secondHalfStartPeriod: 0,
      firstHalfPeriod: "",
      secondHalfPeriod: "",
      countryOptions: [],
      selectDimension: 0,
      indicatorData: [], // all dimension picked
      dimShow: [],
      dimensionChart: {
        catName: [], //  7 type of dimension
        series: [
          {
            name: "",
            data: [],
            color: "#2381B8",
            type: "line",
            dashStyle: "Dash",
          },
          {
            name: "",
            data: [],
            color: "#13405A",
          },
        ],
      },
      /////  may b barChart[7]
      barChart: {
        catName: [], // xAxis of barcchart
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
    };
  },
  methods: {
    async loadData() {
      this.countryOptions = this.data;
      this.selected = this.countryOptions[0];
      let dim = [];
      for (let i = 0; i < this.input.dimensionPicked.length; i++) {
        if (this.input.dimensionPicked[i].picked) dim.push(i + 1);
      }
      this.dimPick = dim;
      // check reporting group
      if (this.input.reporting.length == 1) {
        this.yourGroupName = this.input.reporting[0].label;
      }
      //set name series
      if (this.input.year.min == this.input.year.max - 1) {
        this.firstHalfPeriod = this.input.year.min;
        this.secondHalfPeriod = this.input.year.max;
        this.firstHalfLastPeriod = this.input.year.min;
        this.secondHalfStartPeriod = this.input.year.max;
      } else {
        let diffYear = Math.floor(
          (this.input.year.max - this.input.year.min) / 2
        );
        this.firstHalfPeriod =
          this.input.year.min + "-" + (this.input.year.min + diffYear);
        this.secondHalfPeriod =
          this.input.year.max - diffYear + "-" + this.input.year.max;
        this.firstHalfLastPeriod = this.input.year.min + diffYear;
        this.secondHalfStartPeriod = this.input.year.max - diffYear;
      }
      // set indicator
      this.indicatorData = [];
      let i = 1;
      this.input.dimensionPicked.forEach((x) => {
        let temp = x;
        temp.index = i++;

        if (x.picked == true) this.indicatorData.push(temp);
      });

      this.setDimensionChart();
    },
    pickDimension(x) {
      this.selectDimension = x;
      this.setBarChart();
    },
    async setDimensionChart() {
      this.loadingShow();
      let dataTemp = {
        input: this.input,
        reporter: this.report.map((x) => x.iso),
        dim: this.dimPick,
        selected: this.selected.iso,
      };
      let url = this.ri_api + "buildyourown/spider_chart.php";
      let res = await axios.post(url, JSON.stringify(dataTemp));
      let result = res.data;
      this.dimShow = [];
      let chartTemp = [];
      for (let i = 0; i < this.dimPick.length; i++) {
        let tempData = result.filter((x) => x.dimension == this.dimPick[i]);
        if (tempData.length != 0) {
          let temp1 = tempData.filter(
            (y) => y.year <= this.firstHalfLastPeriod
          );
          let avg1 =
            temp1.reduce((a, b) => a + Number(b.score), 0) / temp1.length;
          let temp2 = tempData.filter(
            (y) => y.year >= this.secondHalfStartPeriod
          );
          let avg2 =
            temp2.reduce((a, b) => a + Number(b.score), 0) / temp2.length;
          this.dimShow.push(this.indicatorData[i]);
          let tempPush = {
            data: [avg1, avg2],
            catName: this.indicatorData[i].name,
          };
          chartTemp.push(tempPush);
        }
      }

      this.dimensionChart.catName = [];
      this.dimensionChart.series[0].data = [];
      this.dimensionChart.series[1].data = [];
      for (let i in chartTemp) {
        this.dimensionChart.catName[i] = chartTemp[i].catName;
        this.dimensionChart.series[0].data[i] = Number(
          chartTemp[i].data[0].toFixed(2)
        );
        this.dimensionChart.series[1].data[i] = Number(
          chartTemp[i].data[1].toFixed(2)
        );
      }
      if (this.dimShow.length > 2) {
        this.loadSpiderChart();
      } else {
        this.loadDimensionChart();
      }
      this.pickDimension(0);
      this.loadingHide();
    },
    loadSpiderChart() {
      this.dimensionChart.series[0].name =
        this.input.year.min + "-" + this.firstHalfLastPeriod;
      this.dimensionChart.series[1].name =
        this.secondHalfStartPeriod + "-" + this.input.year.max;
      Highcharts.chart("spiderWeb", {
        chart: {
          polar: true,
          backgroundColor: "#EDEDED",
        },
        title: {
          text: "",
        },
        pane: {
          // size: "80%",
        },
        xAxis: {
          categories: this.dimensionChart.catName,
          tickmarkPlacement: "on",
          lineWidth: 0,
          gridLineColor: "#C4C4C4",
        },

        yAxis: {
          gridLineInterpolation: "polygon",
          lineWidth: 0,
          min: 0,
          gridLineColor: "#C4C4C4",
        },

        tooltip: {
          shared: true,
        },
        legend: {
          align: "right",
          verticalAlign: "top",
          layout: "vertical",
          y: 50,
        },

        series: this.dimensionChart.series,
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 600,
              },
              chartOptions: {
                legend: {
                  align: "center",
                  verticalAlign: "bottom",
                  layout: "horizontal",
                },
                pane: {
                  size: "70%",
                },
              },
            },
          ],
        },
        exporting: { enabled: true },
        credits: { enabled: false },
      });
    },
    loadDimensionChart() {
      this.dimensionChart.series[0] = {
        name: this.firstHalfPeriod,
        color: "#2381B8",
        data: this.dimensionChart.series[0].data,
      };
      this.dimensionChart.series[1] = {
        name: this.secondHalfPeriod,
        color: "#13405A",
        data: this.dimensionChart.series[1].data,
      };
      Highcharts.chart("dimensionChart", {
        chart: {
          type: "column",
          backgroundColor: "#EDEDED",
          marginRight: 200,
        },
        title: {
          text: "",
        },
        xAxis: {
          categories: this.dimensionChart.catName,
        },
        yAxis: {
          min: 0,
          title: {
            text: "",
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
          },
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          floating: true,
          borderWidth: 0,
          y: 50,
        },
        series: this.dimensionChart.series,
        credits: { enabled: false },
        exporting: { enabled: true },
      });
    },
    async setBarChart() {
      let dim = this.dimShow[this.selectDimension].index;
      let dataTemp = {
        input: this.input,
        reporter: this.report.map((x) => x.iso),
        dim: dim,
        selected: this.selected.iso,
      };

      let url2 = this.ri_api + "buildyourown/spider_indicator.php";
      let res2 = await axios.post(url2, JSON.stringify(dataTemp));
      let allIndicatorData = res2.data;
      let tempChart = [];
      for (
        let i = 0;
        i < this.dimShow[this.selectDimension].indicator.length;
        i++
      ) {
        let EachIndicator = allIndicatorData.filter(
          (x) => x.indicator == i + 1
        );
        let avg1 = 0,
          avg2 = 0;
        if (EachIndicator.length > 0) {
          let data1 = EachIndicator.filter(
            (y) => y.year <= this.firstHalfLastPeriod
          );
          let data2 = EachIndicator.filter(
            (y) => y.year >= this.secondHalfStartPeriod
          );
          avg1 = data1.reduce((a, b) => a + Number(b.score), 0) / data1.length;
          avg2 = data2.reduce((a, b) => a + Number(b.score), 0) / data2.length;
        }
        let tempP = {
          catName: this.dimShow[this.selectDimension].indicator[i],
          data: [avg1, avg2],
        };
        if (EachIndicator.length != 0) {
          tempChart.push(tempP);
        }
      }

      this.barChart.catName = tempChart.map((x) => x.catName);
      this.barChart.series[0].data = tempChart.map((x) =>
        Number(x.data[0].toFixed(2))
      );
      this.barChart.series[1].data = tempChart.map((x) =>
        Number(x.data[1].toFixed(2))
      );
      this.barChart.series[0].name = this.firstHalfPeriod;
      this.barChart.series[1].name = this.secondHalfPeriod;

      this.loadBarChart();
    },
    loadBarChart() {
      Highcharts.chart("barChart", {
        chart: {
          type: "bar",
          backgroundColor: "#DAE7E5",
          marginLeft: 220,
        },

        title: {
          text: "",
        },
        xAxis: {
          labels: {
            align: "center",
          },
          categories: this.barChart.catName,
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
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          bar: {
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
          },
        },
        legend: {
          align: "right",
          verticalAlign: "top",
          layout: "vertical",
          y: 50,
        },
        exporting: { enabled: true },
        credits: { enabled: false },
        series: this.barChart.series,
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.bgGrey {
  width: 100%;
  background: #ededed;
  height: 1260px;
}
.listDimension {
  cursor: pointer;
  font-size: 14px;
  height: 60px;
  line-height: 60px;
  width: 97%;
  border: solid #2d9687;
  border-width: 2px 2px 0px 2px;
}
.isPick {
  height: 100%;
  width: 97%;
  background: #2d9687;
  color: #ffffff;
}
.showBar {
  background: #dae7e5;
  width: 100%;
  height: 400px;
  border: 2px solid #2d9687;
}
.legendBox {
  width: 24px;
  height: 16px;
  background: #eb1e63;
}
.inputSelectClass {
  background: #2d9687;
  padding-left: 10px;
  color: white;
  height: 40px;
  font-size: 24px;
}
#dimensionChart {
  height: 600px;
  width: 60%;
}
#spiderWeb {
  height: 600px;
}
#barChart {
  height: 360px;
  width: 95%;
}
</style>
