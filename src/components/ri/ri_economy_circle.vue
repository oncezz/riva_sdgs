<template>
  <div class="bgClean font-16 q-pa-md" align="center">
    <div class=" row items-center justify-center">
      <div align="left">
        <div><b>Economies</b></div>
        <div class="font-12">Select an economy to see detail</div>
      </div>
      <div class="" style="width:400px">
        <q-select
          v-model="selected"
          style="width:300px"
          :options="countryOptions"
          label=""
        />
      </div>
    </div>
    <div class="font-24 q-pt-md">
      How is Singapore Integrated with the rest of the group?<br />
      by individual economies and dimensions
    </div>
    <div class="row" style="height:600px">
      <!-- left circle  -->
      <div class="col">
        <div class="font-18">By top 7 key partner economics (2019)</div>
        <div id="container"></div>
      </div>
      <!-- <div class="lineCenter "></div>
    
      <div class="col">
        <div class="font-18">By dimension (2019)</div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "type"],
  data() {
    return {
      selected: "",
      countryOptions: []
    };
  },
  methods: {
    loadChart() {
      Highcharts.chart("container", {
        chart: {
          type: "column",
          inverted: true,
          polar: true,
          marginTop: 25
        },
        title: {
          text: "Stacked inverted polar bars"
        },
        xAxis: {
          tickInterval: 1,
          labels: {
            y: 15
          }
        },
        yAxis: {
          min: 0,
          max: 45
        },
        plotOptions: {
          column: {
            stacking: "normal",
            borderWidth: 0,
            pointPadding: 0,
            pointPlacement: "between",
            dataLabels: {
              enabled: true,
              allowOverlap: true,
              textPath: {
                enabled: true,
                attributes: {
                  textAnchor: "start",
                  startOffset: 5,
                  dy: 11.5
                }
              }
            }
          }
        },
        series: [
          {
            data: [7, 6, 9, 14, 18, 21, 25, 26, 23, 18]
          },
          {
            data: [3, 4, 5, 8, 11, 15, 17, 16, 14, 10]
          }
        ]
      });
    },
    loadData() {
      this.countryOptions = this.data;
    }
  },
  mounted() {
    this.loadData();
    this.loadChart();
  }
};
</script>

<style lang="scss" scoped>
.bgClean {
  background: rgba(223, 238, 244, 0.5);
}
.lineCenter {
  margin-top: 5%;
  margin-bottom: 5%;
  width: 1px;
  background: #757575;
}

#container {
  height: 600px;
  margin: 0 auto;
}
</style>
