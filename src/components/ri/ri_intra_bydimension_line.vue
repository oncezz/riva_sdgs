<template>
  <div class="q-pa-md bg-white" style="width: 100%">
    <div
      id="lineChartByCountry"
      style="max-width: 1024px; width: 100%; margin: auto"
    ></div>
    <br />
    <div class="selectBoxDiv q-pa-sm" align="left">
      <div class="font-18">
        <b>Select dimensions of interest</b>
      </div>
      <div class="q-pb-sm">
        Click on each dimension to select/unselect it in the graph
      </div>

      <div class="row">
        <!-- select  -->
        <div class="row cursor-pointer" @click="toggleGroup()">
          <div
            class="colorBox"
            v-if="showGroup"
            style="background: #3f51b5"
          ></div>
          <div class="colorBox" v-else></div>
          <div class="q-pl-sm">Group average ({{ valueGroup }})</div>
        </div>
        <div class="col"></div>
        <!-- select  -->
      </div>
      <div><hr /></div>
      <div class="row">
        <div
          class="q-py-sm row"
          style="width: 25%"
          v-for="(item, index) in showItem"
          :key="index"
        >
          <div class="row cursor-pointer" @click="toggleItem(index)">
            <div
              class="colorBox"
              v-if="item.visible"
              :style="{ backgroundColor: item.color }"
            ></div>
            <div class="colorBox" v-else></div>
            <div class="q-px-sm">{{ item.name }}</div>
            <div>({{ item.value }})</div>
          </div>
          <div class="col"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "input"],
  data() {
    return {
      valueGroup: 0,
      showGroup: true,
      realChart: [],
      showItem: [],
      colorPattern: [
        "#3F51B5",
        "#64C1E8",
        "#D85B63",
        "#D680AD",
        "#5C5C5C",
        "#C0BA80",
        "#FDC47D",
        "#EA3B46",
      ],
      selected: false,
    };
  },
  methods: {
    toggleItem(index) {
      this.showItem[index].visible = !this.showItem[index].visible;
      this.loadDataChart();
      this.LineChartByCountry();
      //   console.log(this.realChart);
    },
    toggleGroup() {
      this.showGroup = !this.showGroup;
      this.loadDataChart();
      this.LineChartByCountry();
      //   console.log(this.realChart);
    },
    loadDataTable() {
      for (let i = 1; i < this.data.length; i++) {
        let temp = {
          name: this.data[i].name,
          data: this.data[i].data,
          visible: true,
          color: this.colorPattern[i],
          value: this.data[i].data[this.data[i].data.length - 1],
        };
        this.showItem.push(temp);
      }
      this.valueGroup = this.data[0].data[this.data[0].data.length - 1];
      //   console.log(this.showItem);
    },
    loadDataChart() {
      this.realChart = [];
      for (let i = 0; i < this.data.length; i++) {
        let v = true;
        if (i == 0) {
          v = this.showGroup;
        } else {
          v = this.showItem[i - 1].visible;
        }
        let temp = {
          name: this.data[i].name,
          data: this.data[i].data,
          visible: v,
          color: this.colorPattern[i],
        };
        this.realChart.push(temp);
        console.log(this.realChart);
      }
    },
    LineChartByCountry() {
      let yAxisLabel = "";
      if (this.input.type == "A") {
        yAxisLabel = "Sustainable Integration Index";
      } else {
        yAxisLabel = "Conventional Integration Index";
      }

      Highcharts.chart("lineChartByCountry", {
        chart: {
          height: (9 / 16) * 100 + "%", // 16:9 ratio
          style: { fontFamily: "roboto" },
          spacingTop: 30,
        },
        title: {
          text: "",
        },

        yAxis: {
          title: {
            text: yAxisLabel,
          },
          min: 0,
          max: 1,
        },
        xAxis: {
          accessibility: {
            rangeDescription: "Range: 2010 to 2017",
          },
          tickInterval: 1,
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: true,
            },
            pointStart: Number(this.input.year.min),
            pointInterval: 1,
          },
        },

        series: this.realChart,

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
        credits: {
          enabled: false,
        },
        exporting: { enabled: false },
        legend: { enabled: false },
      });
    },
  },
  mounted() {
    this.loadDataTable();
    this.loadDataChart();
    this.LineChartByCountry();
  },
};
</script>

<style lang="scss" scoped>
.colorBox {
  width: 16px;
  height: 16px;
  border: 1px solid #757575;
}
.selectBoxDiv {
  border: 1px solid #757575;
}
</style>
