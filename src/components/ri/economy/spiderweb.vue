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
        How is {{ input.reporting.label }} integrated with
        {{ selected.label }} across different dimensions?
      </div>
      <!-- spider web chart -->
      <div id="spiderWeb"></div>
      <!-- ---------  -->
      <hr />
      <div class="font-24" align="left">
        How is {{ input.reporting.label }} integrated with
        {{ selected.label }} on each dimension across different indicators?
      </div>
      <div class="row justify-between q-py-md">
        <div
          class="listDimension"
          v-for="(item, index) in spiderChart.listDimension"
          :key="index"
          @click="pickDimension(index)"
        >
          <div
            v-if="index == selectDimension"
            class="isPick"
            :style="{ background: indicatorData[index].color }"
          >
            {{ item }}
          </div>
          <div v-else>{{ item }}</div>
        </div>
        <div class="showBar q-pt-md" align="center">
          <div id="barChart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["input"],
  data() {
    return {
      selected: {
        label: "",
      },
      countryOptions: [],
      selectDimension: 0,
      indicatorData: [], // all dimension
      spiderChart: {
        listDimension: [], //  7 type of dimension
        chartData: [
          {
            name: "2014-2016",
            data: [87, 64, 85, 78, 43, 90, 74],
            pointPlacement: "on",
            color: "#2381B8",
            type: "line",
            dashStyle: "Dash",
          },
          {
            name: "2017-2019",
            data: [56, 47, 63, 84, 58, 64, 73],
            pointPlacement: "on",
            color: "#13405A",
          },
        ],
      },
      barChart: {
        indicatorOfDimension: [], // xAxis of barcchart
        chartData: [
          {
            name: "2014-2016",
            color: "#2381B8",
            data: [0.7, 0.76, 0.63, 0.64, 0.66],
          },
          {
            name: "2017-2019",
            color: "#13405A",
            data: [0.84, 0.8, 0.76, 0.74, 0.7],
          },
        ],
      },
    };
  },
  methods: {
    async loadData() {
      this.indicatorData = [];
      let data = {
        type: this.input.type,
      };
      let url = this.ri_api + "dimension_icon.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.indicatorData = res.data;
      this.indicatorData.forEach((x) => {
        this.spiderChart.listDimension.push(x.name);
      });
      this.pickDimension(0);
      // set partner
      this.countryOptions = this.input.partner;
      this.selected = this.countryOptions[0];
      //set year range
      // this.year1Range.min = input.year.min;
      // this.year1Range.max =
      //   input.year.min + Math.floor((input.year.max - input.year.min) / 2);
      // if (this.year1Range)
      //   this.year2Range.min =
      //     input.year.max - Math.floor((input.year.max - input.year.min) / 2);
      // this.year2Range.max = input.year.max;
    },
    changePartner() {
      // load API spiderChart data
      //load API integrated barChart data
    },
    pickDimension(index) {
      this.selectDimension = index;
      this.barChart.indicatorOfDimension = this.indicatorData[index].indicator;
      this.loadBarChart();
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
          size: "80%",
        },

        xAxis: {
          categories: this.spiderChart.listDimension,
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
        },

        series: this.spiderChart.chartData,

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
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
        exporting: { enabled: false },
        credits: { enabled: false },
      });
    },
    loadBarChart() {
      // console.log(this.barChart.indicatorOfDimension);
      // console.log(this.barChart.chartData);
      Highcharts.chart("barChart", {
        chart: {
          type: "bar",
          backgroundColor: "#DAE7E5",
        },

        title: {
          text: "",
        },
        xAxis: {
          categories: this.barChart.indicatorOfDimension,
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
          // valueSuffix: " %",
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
            pointWidth: 20,
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
        // legend: { enabled: false },
        credits: { enabled: false },
        series: this.barChart.chartData,
      });
    },
  },
  watch: {
    data: function (newData, oldData) {
      this.loadData();
    },
  },
  async mounted() {
    await this.loadData();
    this.loadSpiderChart();
    this.loadBarChart();
  },
};
</script>

<style lang="scss" scoped>
.bgGrey {
  background: #ededed;
  height: 1260px;
}
.listDimension {
  cursor: pointer;
  width: 14%;
  font-size: 14px;
  height: 60px;
  line-height: 60px;
  border: solid #2d9687;
  border-width: 2px 2px 0px 2px;
}
.isPick {
  height: 100%;
  width: 100%;
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

#spiderWeb {
  height: 600px;
  margin: 0 auto;
}
#barChart {
  height: 360px;
  width: 90%;
  margin: auto;
}
</style>
