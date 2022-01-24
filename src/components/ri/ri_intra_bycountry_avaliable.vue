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
    loadData() {
      //  let data &load API for all country
      this.data.forEach(x => {
        this.catName.push(x.label);
      });
    },
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
          max: 100
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
    }
  },
  mounted() {
    this.loadData();
    this.loadChart();
  }
};
</script>
<style lang="scss" scoped></style>
