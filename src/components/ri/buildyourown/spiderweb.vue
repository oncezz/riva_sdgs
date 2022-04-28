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
            @input="changePartner()"
          />
        </div>
      </div>
      <div class="font-24" align="left">
        How is {{ yourGroupName }} integrated with {{ selected.label }} across
        different dimensions?
      </div>
      <!-- spider web chart -->
      <div v-if="indicatorData.length > 2" id="spiderWeb"></div>
      <div v-else class="q-py-md" id="dimensionChart"></div>
      <!-- ---------  -->
      <div class="font-24" align="left">
        How is {{ yourGroupName }} integrated with {{ selected.label }} on each
        dimension across different indicators?
      </div>
      <div class="row q-pt-md" align="left">
        <div
          class="non-selectable"
          v-for="(item, index) in indicatorData"
          :key="index"
          style="width: 14.285%; height: 60px"
        >
          <div
            v-if="index == selectDimension"
            class="listDimension isPick"
            align="center"
            :style="{ background: indicatorData[index].color }"
          >
            {{ item.name }}
          </div>
          <div
            v-else
            class="listDimension"
            align="center"
            @click="pickDimension(index, item.name)"
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
      fullData: [],
      fullDataIndicator: [],
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
      indicatorData: [], // all dimension
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
      let dim = [];
      for (let i = 0; i < this.input.dimensionPicked.length; i++) {
        if (this.input.dimensionPicked[i].picked) dim.push(i + 1);
      }
      this.dimPick = dim;
      let dataTemp = {
        input: this.input,
        partner: this.data.map((x) => x.iso),
        reporter: this.report.map((x) => x.iso),
        dim: this.dimPick,
      };
      console.log(dataTemp);
      let url = this.ri_api + "buildyourown/spider_chart.php";
      let res = await axios.post(url, JSON.stringify(dataTemp));
      // console.log(res.data);
      this.fullData = res.data;
      let url2 = this.ri_api + "buildyourown/spider_indicator.php";
      let res2 = await axios.post(url2, JSON.stringify(dataTemp));
      this.fullDataIndicator = res2.data;
      // console.log(this.fullDataIndicator);

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
        // console.log(temp);
        if (x.picked == true) this.indicatorData.push(temp);
      });
      // console.log(this.indicatorData);
      this.setDimensionChart();
      // console.log(this.indicatorData);
    },
    changePartner() {
      // console.log(this.selected);
      let selectedData = this.fullData.filter(
        (x) => x.partner == this.selected.iso
      );
      this.tempDimChart = [];
      let count = 0;
      this.dimPick.forEach((x) => {
        let firstData = selectedData.filter(
          (y) => y.dimension == x && y.year <= this.firstHalfLastPeriod
        );
        let avgFirst =
          (firstData.reduce((a, b) => a + Number(b.score), 0) /
            firstData.length) *
          100;
        let secondData = selectedData.filter(
          (y) => y.dimension == x && y.year >= this.secondHalfStartPeriod
        );
        let avgSecond =
          (secondData.reduce((a, b) => a + Number(b.score), 0) /
            secondData.length) *
          100;
        // console.log(this.indicatorData);
        let tempPush = {
          dimension: this.indicatorData[x - 1].name,
          avgFirst: avgFirst,
          avgSecond: avgSecond,
        };
        // console.log(tempPush);
        if (firstData.length != 0 && secondData.length != 0) {
          this.tempDimChart.push(tempPush);
        }
      });
      // console.log(this.tempDimChart);
      this.setDimensionChart();
      this.pickDimension(0, this.indicatorData[0].name);
    },
    pickDimension(index, dimension) {
      this.selectDimension = index;
      this.setBarChart();

      // console.log(dimension, index);
    },
    async setDimensionChart() {
      this.dimensionChart.catName = this.tempDimChart.map((x) => x.dimension);
      this.dimensionChart.series[0].data = this.tempDimChart.map(
        (x) => x.avgFirst
      );
      this.dimensionChart.series[0].name = this.firstHalfPeriod;
      this.dimensionChart.series[1].data = this.tempDimChart.map(
        (x) => x.avgSecond
      );
      this.dimensionChart.series[1].name = this.secondHalfPeriod;
      // console.log(this.dimensionChart);
      // let dataTemp = {
      //   input: this.input,
      //   selected: this.selected.label,
      //   indicator: this.indicatorData,
      // };
      // let url = this.ri_api + "buildyourown/spider_chart.php";
      // let res = await axios.post(url, JSON.stringify(dataTemp));
      // let result = res.data;
      // for (let i in result) {
      //   this.dimensionChart.catName[i] = result[i].name;
      //   this.dimensionChart.series[0].data[i] = result[i].data[0];
      //   this.dimensionChart.series[1].data[i] = result[i].data[1];
      // }
      // console.log(this.dimensionChart);
      //
      if (this.indicatorData.length > 2) {
        this.loadSpiderChart();
      } else {
        this.loadDimensionChart();
      }
    },
    loadSpiderChart() {
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
          max: 100,
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
        name: this.firstHalfPeriod,
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
          max: 100,
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
      let dim = this.indicatorData[this.selectDimension].index;
      // console.log(this.selectDimension, dim);
      // console.log(this.selected);
      let allIndicatorData = this.fullDataIndicator.filter(
        (x) => x.dimension == dim && x.partner == this.selected.iso
      );
      let tempChart = [];
      for (
        let i = 0;
        i < this.indicatorData[this.selectDimension].indicator.length;
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
          // console.log(avg1, avg2);
        }
        let tempP = {
          catName: this.indicatorData[this.selectDimension].indicator[i],
          data: [avg1, avg2],
        };
        if (EachIndicator.length != 0) {
          tempChart.push(tempP);
        }
      }

      this.barChart.catName = tempChart.map((x) => x.catName);
      this.barChart.series[0].data = tempChart.map((x) => x.data[0]);
      this.barChart.series[1].data = tempChart.map((x) => x.data[1]);
      this.barChart.series[0].name = this.firstHalfPeriod;
      this.barChart.series[1].name = this.secondHalfPeriod;
      // result.forEach((x) => {
      //   this.barChart.catName.push(x.catName);
      //   this.barChart.series[0].data.push(x.data[0]);
      //   this.barChart.series[1].data.push(x.data[1]);
      // });
      console.log(this.barChart);
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
  async mounted() {
    await this.loadData();
    this.countryOptions = this.data;
    this.selected = this.countryOptions[0];
    await this.changePartner();
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
