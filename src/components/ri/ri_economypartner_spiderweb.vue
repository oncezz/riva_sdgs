<template>
  <div class="bgGreen font-16 q-pa-md" align="center">
    <div class="row items-center justify-center">
      <div align="left">
        <div><b>Partner economies</b></div>
        <div class="font-12">Select an economy to see detail</div>
      </div>
      <div class="" style="width: 400px">
        <q-select
          v-model="selected"
          style="width: 300px"
          :options="countryOptions"
          label=""
        />
      </div>
    </div>
    <div class="font-24 q-pt-md">
      How is {{ input.report.label }} Integrated with
      {{ selected.label }} across different dimensions<br />
    </div>
    <div id="spiderWeb"></div>
    <div class="font-24">
      How is {{ input.report.label }} integrated with {{ selected.label }} on
      each dimension across different indicators?
    </div>
    <div class="row justify-between q-py-md" style="width: 90%">
      <div
        class="listDimension"
        :class="{ isPick: selectDimension == index }"
        v-for="(item, index) in dimensionList"
        :key="index"
        @click="pickDimension(index)"
      >
        {{ item }}
      </div>
      <div class="showBar"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["input", "partner"],
  data() {
    return {
      selected: "",
      selectDimension: 0,
      dimensionList: [
        "Trade and Investment",
        "Financial",
        "Regional Value Chains",
        "Infrastructure",
        "Movement of People",
        "Regulatory cooperation",
        "Digital Economy",
      ],
      indicatorDimension: [[], []],
      countryOptions: [],
    };
  },
  methods: {
    loadData() {
      this.countryOptions = this.partner;
      // console.log(this.data);
    },
    pickDimension(index) {
      this.selectDimension = index;
    },
    loadSpiderChart() {
      Highcharts.chart("spiderWeb", {
        chart: {
          polar: true,
          type: "line",
          backgroundColor: "#DFEEF480",
        },

        title: {
          text: "",
        },

        pane: {
          size: "80%",
        },

        xAxis: {
          categories: this.dimensionList,
          tickmarkPlacement: "on",
          lineWidth: 0,
          gridLineColor: "#C4C4C4",
        },

        yAxis: {
          gridLineInterpolation: "polygon",
          lineWidth: 0,
          min: 0,
          max: 1,
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

        series: [
          {
            name: "2014-2016",
            data: [0.87, 0.64, 0.85, 0.78, 0.43, 0.9, 0.74],
            pointPlacement: "on",
            color: "#2381B8",
          },
          {
            name: "2017-2019",
            data: [0.56, 0.47, 0.63, 0.84, 0.58, 0.64, 0.73],
            pointPlacement: "on",
            color: "#EB1E63",
          },
        ],

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
  },
  mounted() {
    this.loadData();
    this.loadSpiderChart();
  },
};
</script>

<style lang="scss" scoped>
.bgGreen {
  background: #dfeef4;
  height: 1200px;
}
.listDimension {
  cursor: pointer;
  width: 14%;
  height: 45px;

  border: solid #757575;
  border-width: 1px 1px 0px 1px;
}
.isPick {
  background: #2d9687;
  color: #ffffff;
}
.showBar {
  width: 100%;
  height: 246px;
  border: 1px solid #757575;
}

#spiderWeb {
  height: 600px;
  margin: 0 auto;
}
</style>
