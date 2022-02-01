<template>
  <div class="bgGrey font-16 q-pa-md" align="center">
    <div style="width: 90%; margin: auto">
      <div class="row items-center">
        <div align="left">
          <div class="font-30"><b>Partner economy</b></div>
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
          v-for="(item, index) in listDimension"
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
        <div class="showBar q-pa-md row" align="left">
          <div class="col-10">
            <div v-for="(item2, index2) in indicatorOfDimension" :key="index2">
              <div class="q-py-sm">{{ item2 }}</div>
            </div>
          </div>
          <div class="col font-16">
            <div class="row items-center">
              <div class="legendBox"></div>
              <div class="q-pl-sm">
                {{ input.year.min }}
                <span
                  v-show="
                    input.year.min +
                      Math.floor((input.year.max - input.year.min) / 2) !=
                    input.year.min
                  "
                  >-
                  {{
                    input.year.min +
                    Math.floor((input.year.max - input.year.min) / 2)
                  }}</span
                >
              </div>
            </div>
            <div class="row items-center">
              <div class="legendBox" style="background: #2381b8"></div>
              <div class="q-pl-sm">
                <span
                  v-show="
                    input.year.max -
                      Math.floor((input.year.max - input.year.min) / 2) !=
                    input.year.max
                  "
                >
                  {{
                    input.year.max -
                    Math.floor((input.year.max - input.year.min) / 2)
                  }}
                  - </span
                >{{ input.year.max }}
              </div>
            </div>
          </div>
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
      selected: "",
      selectDimension: 0,
      indicatorData: [],
      listDimension: [],
      indicatorOfDimension: [],
      countryOptions: [],
    };
  },
  methods: {
    async loadData() {
      // console.log(this.input);
      this.indicatorData = [];
      let data = {
        type: this.input.type,
      };
      let url = this.ri_api + "dimension_icon.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.indicatorData = res.data;
      this.indicatorData.forEach((x) => {
        this.listDimension.push(x.name);
      });
      this.pickDimension(0);
      //
      this.countryOptions = this.input.partner;
      this.selected = this.countryOptions[0];
    },
    pickDimension(index) {
      this.selectDimension = index;
      this.indicatorOfDimension = this.indicatorData[index].indicator;
    },
    loadSpiderChart() {
      Highcharts.chart("spiderWeb", {
        chart: {
          polar: true,
          type: "line",
          backgroundColor: "#EDEDED",
        },

        title: {
          text: "",
        },

        pane: {
          size: "80%",
        },

        xAxis: {
          categories: this.listDimension,
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
  watch: {
    data: function (newData, oldData) {
      this.loadData();
    },
  },
  async mounted() {
    await this.loadData();
    this.loadSpiderChart();
  },
};
</script>

<style lang="scss" scoped>
.bgGrey {
  background: #ededed;
  height: 1200px;
}
.listDimension {
  cursor: pointer;
  width: 14%;
  height: 60px;
  line-height: 60px;
  border: solid #2d9687;
  border-width: 1px 1px 0px 1px;
}
.isPick {
  height: 100%;
  width: 100%;
  background: #2d9687;
  color: #ffffff;
}
.showBar {
  background: rgba(45, 150, 135, 0.1);
  width: 100%;
  height: 300px;
  border: 2px solid #2d9687;
}
.legendBox {
  width: 24px;
  height: 16px;
  background: #eb1e63;
}

#spiderWeb {
  height: 600px;
  margin: 0 auto;
}
</style>
