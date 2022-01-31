<template>
  <div class="bgGreen font-16 q-pa-md q-px-xl" align="center">
    <div class=" row items-center ">
      <div align="left">
        <div class="font-30"><b>Economies</b></div>
        <div class="font-12">Select an economy to see detail</div>
      </div>
      <div class="q-pl-lg" style="width:400px">
        <q-select
        class="inputSelectClass"
        input-style="color:white"
        transition-show="flip-up"
        transition-hide="flip-down"
          v-model="selected"
          :options="countryOptions"
        dark
        />
      </div>
    </div>
    <div class="font-24 q-pt-md" align="left">
      How is {{ selected.label }} Integrated with the rest of the group?
      by individual economies and dimensions<br />
    </div>
    <div class="row q-pt-md" style="height:600px">
      <!-- left circle  -->
      <div class="col">
        <div id="leftContainer"></div>
        <div class="q-py-sm">
          {{ selected.label }} has available data with
          <span class="font-24">{{ scoreGroup * 100 }}%</span>
          of economics in this group
        </div>
        <div class="percentBar" style="width:80%" align="left">
          <div
            class="innerBar"
            :style="{ width: scoreGroup * 100 + '%' }"
          ></div>
        </div>
        <div class="btnOutGreen q-mt-lg">
          < Sustainable Integration by dimension
        </div>
      </div>
      <div class="lineCenter"></div>
      <!-- right circle  -->
      <div class="col">
      <div id="rightContainer"></div>
        <div class="q-py-sm">
          {{ selected.label }} has available data with
          <span class="font-24">{{ scoreDimension * 100 }}%</span>
          of economics in this group
        </div>
        <div class="percentBar" style="width:80%" align="left">
          <div
            class="innerBar"
            :style="{ width: scoreDimension * 100 + '%' }"
          ></div>
        </div>
        <div class="btnOutGreen q-mt-lg">
          Singapore - Group  integration section >
        </div>
      </div>


      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["data", "input"],
  data() {
    return {
      selected: "",
      countryOptions: [],
      scoreGroup: 0.8,
      scoreDimension: 0.5,
      dataLeft: [],
      dataRight:[],
      catNameLeft: [
      ],
      catNameRight: [
      ],
      ////// request data from API
      // topKeyData: [
      //   {
      //     name: "China",
      //     value: 0.93
      //   },
      //   {
      //     name: "Vietnam",
      //     value: 0.85
      //   },
      //   {
      //     name: "Thailand",
      //     value: 0.8
      //   },
      //   {
      //     name: "South Korea",
      //     value: 0.78
      //   },
      //   {
      //     name: "You group",
      //     value: 0.7
      //   },
      //   {
      //     name: "Spain",
      //     value: 0.64
      //   },
      //   {
      //     name: "Mlaysia",
      //     value: 0.6
      //   },
      //   {
      //     name: "Peru",
      //     value: 0.5
      //   }
      // ],
      // dimensionData: [
      //   {
      //     name: "Trade and Investment ",
      //     value: 0.91
      //   },
      //   {
      //     name: "Digital Economy",
      //     value: 0.90
      //   },
      //   {
      //     name: "Financial",
      //     value: 0.83
      //   },
      //   {
      //     name: "Regional Value Chains",
      //     value: 0.73
      //   },
      //   {
      //     name: "Average Index",
      //     value: 0.71
      //   },
      //   {
      //     name: "Infrastructure",
      //     value: 0.62
      //   },
      //   {
      //     name: "Movement of People",
      //     value: 0.6
      //   },
      //   {
      //     name: "Regional Cooperation",
      //     value: 0.4
      //   }
      // ]
    };
  },
  methods: {
    loadChartLeft() {
      Highcharts.chart("leftContainer", {
        chart: {
          type: "column",
          inverted: true,
          polar: true,
          backgroundColor: "#DFEEF480"
        },
        title: {
          text: "By top 7 key partner economics (2019)"
        },
        tooltip: {
          outside: true
        },
        pane: {
          startAngle: 0,
          endAngle: 270,

          innerSize: "15%"
        },
        xAxis: {
          tickInterval: 1,
          labels: {
            align: "right"
          },
          categories: this.catNameLeft
        },
        yAxis: {
          crosshair: {
            enabled: true,
            color: "#333"
          },

          min: 0,
          max: 1,
          endOnTick: true,
          showLastLabel: true
        },

        plotOptions: {
          column: {
            borderWidth: 0,
            pointPadding: 0,
            groupPadding: 0
          }
        },
        colors: [
          "#8DBDD9",
          "#C0E0DB",
          "#E8B0CB",
          "#F99704",
          "#EB1E63",
          "#2D9687",
          "#2381B8",
          "#C4C4C4"
        ],
        exporting: { enabled: false },
        legend: { enabled: false },
        credits: {
          enabled: false
        },
        series: [
          {
            data: this.dataLeft,
            colorByPoint: true
          }
        ]
      });
    },
    loadChartRight() {
      Highcharts.chart("rightContainer", {
        chart: {
          type: "column",
          inverted: true,
          polar: true,
          backgroundColor: "#DFEEF480"
        },
        title: {
          text: "By dimensions (2019)"
        },
        tooltip: {
          outside: true
        },
        pane: {
          startAngle: 0,
          endAngle: 270,

          innerSize: "15%"
        },
        xAxis: {
          tickInterval: 1,
          labels: {
            align: "right"
          },
          categories: this.catNameRight
        },
        yAxis: {
          crosshair: {
            enabled: true,
            color: "#333"
          },

          min: 0,
          max: 1,
          endOnTick: true,
          showLastLabel: true
        },

        plotOptions: {
          column: {
            borderWidth: 0,
            pointPadding: 0,
            groupPadding: 0
          }
        },
        colors: [
          "#8DBDD9",
          "#C0E0DB",
          "#E8B0CB",
          "#F99704",
          "#EB1E63",
          "#2D9687",
          "#2381B8",
          "#C4C4C4"
        ],
        exporting: { enabled: false },
        legend: { enabled: false },
        credits: {
          enabled: false
        },
        series: [
          {
            name: "",
            data: this.dataRight,
            colorByPoint: true
          }
        ]
      });
    },
    loadData() {
      this.countryOptions = this.data;
      this.selected=this.countryOptions[0];

      // console.log(this.data);
    },
    //// push data from Api to showChart
    async editName() {
      // // may b sort from value
      // this.catNameLeft = [];
      // this.topKeyData.forEach(x =>
      //   this.catNameLeft.push(x.name + " (" + x.value.toString() + ")")
      // );
      // this.topKeyData.forEach(x =>
      //   this.dataLeft.push(x.value)
      // );
      // // console.log(this.catnameLeft);
      // this.catNameRight=[];
      // this.dimensionData.forEach(x => this.catNameRight.push(x.name + " (" + x.value.toString() + ")"));
      // this.dimensionData.forEach(x => this.dataRight.push(x.value));

      let dataSend={
        countryFullList:this.data,
        input:this.input
      }
      let url = this.ri_api + "intra_circlechart_top7country.php";
      let res = await axios.post(url, JSON.stringify(dataSend));
      let result = res.data;
      
      this.catNameLeft = [];
      this.dataLeft=[];
      result.forEach(x => 
      this.catNameLeft.push(x.name + " (" + x.value.toString() + ")")
      );
      result.forEach(x => this.dataLeft.push(x.value));
      console.log(this.catNameLeft);
      console.log(this.dataLeft);
      let dataSend2={
        countryFullList:this.data,
        input:this.input
      }
      url = this.ri_api + "intra_circlechart_dimension.php";
      let res2 = await axios.post(url, JSON.stringify(dataSend2));
      let result2 =res2.data;
      this.catNameRight=[];
      this.dataRight=[];
      result2.forEach(x => this.catNameRight.push(x.name + " (" + x.value.toString() + ")") );
      result2.forEach(x => this.dataRight.push(x.value));
    }
  },
  async mounted() {
    this.loadData();
  await this.editName();
    this.loadChartLeft();
    this.loadChartRight();
  }
};
</script>

<style lang="scss" scoped>
.bgGreen {
  background: #dfeef4;
  height: 960px;
}
.lineCenter {
  margin-top: 5%;
  margin-bottom: 5%;
  width: 1px;
  background: #757575;
}
.percentBar {
  height: 30px;
  background: #c4c4c4;
}
.innerBar {
  height: 30px;
  background: #2d9687;
}
.btnOutGreen {
  cursor: pointer;
  width: 340px;
  height: 35px;
  line-height: 30px;
  border: 3px solid #2d9687;
  border-radius: 5px;
}
.inputSelectClass{
  background: #2D9687;
  padding-left: 10px;
  color: white;
  font-size: 24px;
}

#leftContainer,#rightContainer {
  height: 600px;
  margin: 0 auto;
}

</style>
