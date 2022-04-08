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
        
          v-model="selected"
          :options="countryOptions"
          @input="changeInput()"
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
        <div class="btnOutGreen q-mt-lg " @click="linkToDimension()">
          < {{input.type}} Integration by dimension
        </div>
      </div>
      <div class="lineCenter"></div>
      <!-- right circle  -->
      <div class="col">
      <div id="rightContainer"></div>
      <div class="btnOutGreen q-mt-lg" @click="gotoEcoPartner()">
        {{selected.label}} - Group  integration section >
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
      dimensionAll:[],
      yourGroupName: "Your group",
      leftChart:{
        title:"",
        catName:"",
        series:[]
      },
      rightChart:{
        title:"",
        catName:"",
        series:[]
      }

    };
  },
  methods: {
    linkToDimension(){
      this.$emit("go-to-dimension");
    },
    gotoEcoPartner(){
      let dataTemp = []
      this.data.forEach(item=>{
        if(item.iso != this.selected.iso){
          dataTemp.push(item)
        }
      })
      this.$q.localStorage.clear()
      this.$q.localStorage.set("partner",dataTemp);
      this.$q.localStorage.set("reporter",this.selected);
      this.$q.localStorage.set("year",this.input.year)
      var uuid = require("uuid");
      var id = uuid.v4();
      this.$q.localStorage.set("keyId",id)
      this.$router.push("/rieconomypartner/" +id)
    },
    
    loadChartLeft() {
      Highcharts.chart("leftContainer", {
        chart: {
          type: "column",
          inverted: true,
          polar: true,
          backgroundColor: "#DFEEF480"
        },
        title: {
          text: this.leftChart.title
        },
        tooltip: {
          outside: true
        },        pane: {
          startAngle: 0,
          endAngle: 270,

          innerSize: "15%"
        },
        xAxis: {
          tickInterval: 1,
          labels: {
            align: "right"
          },
          categories: this.leftChart.catName
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
          "#DD3905",
          "#F07979",
          "#DEF844",
          "#00FF94",
          "#00C2FF",
          "#2452F6",
          "#5E1DC8",
          "#BD00FF"
        ],
        exporting: { enabled: false },
        legend: { enabled: false },
        credits: {
          enabled: false
        },
        series: [
          {
            name:"",
            data: this.leftChart.series,
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
          text: this.rightChart.title
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
          categories: this.rightChart.catName
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
          "#DD3905",
          "#F07979",
          "#DEF844",
          "#00FF94",
          "#00C2FF",
          "#2452F6",
          "#5E1DC8",
          "#BD00FF"
        ],
        exporting: { enabled: false },
        legend: { enabled: false },
        credits: {
          enabled: false
        },
        series: [
          {
            name: "",
            data: this.rightChart.series,
            colorByPoint: true
          }
        ]
      });
    },
    loadData() {
      this.countryOptions = this.data;
      this.selected=this.countryOptions[0];
    },
    //// push data from Api to showChart
    async editName() {
      let dataSend={
        countryFullList:this.data,
        countryMap:this.data.map( x => x.iso),
        input:this.input,
        selected:this.selected,
        
      }
      // console.log("left ",dataSend);
      let url = this.ri_api + "intra/circlechart_top7country.php";
      let res = await axios.post(url, JSON.stringify(dataSend));
      let result = res.data;
      this.leftChart.catName = [];
      this.leftChart.series=[];
      console.log(result);
      result.sort((a, b) => b.y - a.y);
      // console.log(result);
      result.forEach(x => {
        if(x.name!=this.selected.label){
        this.leftChart.catName.push(x.name + " (" + x.y.toFixed(2).toString() + ")");
        this.leftChart.series.push(x.y)
        }
        // else{
        //  this.leftChart.catName.push('<span style="color: #F99704; font-weight:bold;">'+(x.name + " (" + x.y.toFixed(2).toString() + ")")+'</span>');
        // }
      }
      );
      // result.forEach(x => this.leftChart.series.push(x));
      this.leftChart.title="By top 7 key partner economics ("+ this.input.year.max +")";
      

      let dataSend2={
         countryFullList:this.data,
        countryMap:this.data.map( x => x.iso),
        input:this.input,
        selected:this.selected,
      }
      // console.log("right ",dataSend2);
      url = this.ri_api + "intra/circlechart_dimension.php";
      let res2 = await axios.post(url, JSON.stringify(dataSend2));
      let tempTable =res2.data;
      let chartB4sort=[{}];
      // console.log(tempTable);
      // console.log(this.dimensionAll);
      for(let i =1;i<=7;i++){
        let eachDimension=tempTable.filter( dim => dim.dimension==i);
        // console.log(eachDimension);
        let avgDim=0;
        if(eachDimension.length==0){
          avgDim=0;
        }else{
          avgDim=eachDimension.reduce((a,b)=>a+Number(b.score),0)/eachDimension.length;
        }
        // console.log(i,avgDim);
        chartB4sort[i-1]={};
        chartB4sort[i-1].y=avgDim;
        chartB4sort[i-1].name=this.dimensionAll[i-1].name;
      }
      // console.log("chart",chartB4sort);
      chartB4sort.sort((a, b) => b.y - a.y);
      this.rightChart.catName=[];
      this.rightChart.series=[];
      chartB4sort.forEach(x => {
        // if(x.name!="Average group index"){
        this.rightChart.catName.push(x.name + " (" + x.y.toFixed(2).toString() + ")");
        // }
        // else{
        //  this.rightChart.catName.push('<span style="color: #F99704; font-weight:bold;">'+(x.name + " (" + x.y.toFixed(2).toString() + ")")+'</span>');
        // }
      }
      );
      chartB4sort.forEach(x => {this.rightChart.series.push(x)});
      this.rightChart.title= "By dimensions ("+this.input.year.max+")";
      ////  may b sort

      // console.log(this.leftChart.series);
      // console.log(this.rightChart.series);
    },
    async changeInput(){
      await this.editName();
      this.loadChartLeft();
      this.loadChartRight();
    },
    async checkYourName() {    
      if (this.input.partner.length == 1) {
        this.yourGroupName = this.input.partner[0].label;
      }
      // console.log(this.yourGroupName);
      await this.loadData();
      await this.editName();
      this.loadChartLeft();
      this.loadChartRight();
    },
    async loadDimension(){
      let data5= {
      type: this.input.type,
    };
    let url2 = this.ri_api + "main/dimension_icon.php";
    let res2 = await axios.post(url2, JSON.stringify(data5));
    this.dimensionAll = res2.data;
    }
  },
  async mounted () {
    this.loadDimension();
    this.checkYourName();
  },
  

};

</script>

<style lang="scss" scoped>
.bgGreen {
  background: #EDEDED;
  height: 860px;
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
