<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  props: ["data", "year"],
  data() {
    return {
      catName: [],
      valueBar: [82, 65, 65, 62, 51, 40, 30, 20, 10]
    };
  },
  methods: {
    loadChart() {
      Highcharts.chart("container", {
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
          max: 100,
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
            pointWidth: 60,
            pointPadding: 0
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
        ]
      });
    },
    loadData() {
      //  let data &load API for all country // เลือกสีให้่ your group เป็นสีเขียวด้วย
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
#container {
  height: 800px;
  width: 1000px;
  margin: auto;
}
</style>
