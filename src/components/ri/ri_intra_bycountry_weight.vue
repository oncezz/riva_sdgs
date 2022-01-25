<template>
  <div>
    <div id="weightBar"></div>
  </div>
</template>

<script>
export default {
  props: ["data", "year"],
  data() {
    return {
      catName: [],
      valueBar: [0.8, 0.7, 0.6, 0.4, 0.2, 0.25]
    };
  },
  methods: {
    loadChart() {
      Highcharts.chart("weightBar", {
        chart: {
          type: "bar"
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: this.catName
        },
        yAxis: {
          min: 0,
          max: 1,
          title: {
            text: ""
          },
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: "transparent"
        },
        tooltip: {
          valueSuffix: " %"
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
              format: "{y} %"
            }
          },
          series: {
            pointWidth: 60
          },
          trendline: {
            // shared options for all trendline series
          }
        },
        exporting: { enabled: false },
        legend: { enabled: false },
        credits: { enabled: false },
        series: [
          {
            name: "",
            data: this.valueBar
          }
          // {
          //   // specific options for this series instance
          //   type: "trendline",
          //   data: [0.25]
          // }
        ]
      });
    },
    loadData() {
      //  let data &load API for all country
      this.data.forEach(x => {
        this.catName.push(x.label);
      });
    }
  },
  mounted() {
    this.loadData();
    this.loadChart();
  }
};
</script>
<style lang="scss" scoped>
#weightBar {
  height: 600px;
  width: 1000px;
  margin: auto;
}
</style>
