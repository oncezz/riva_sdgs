<template>
  <div class="container shadow-2" style="color:#757575">
    <ri-header :menu="1"></ri-header>

    <!-- //Row 1 -->
    <div class="row q-pa-md">
      <div class="col-3">
        <div class="font-16"><b>Integration type</b></div>
        <div>Select the desired type of integration</div>
      </div>
      <div class="col row">
        <div>
          <div
            :class="input.type == 'A' ? 'btnGreen' : 'btnGrey'"
            @click="changeA()"
            class="cursor-pointer"
          >
            Sustainable Integration
          </div>
        </div>
        <div class="q-px-md">
          <div
            :class="input.type == 'B' ? 'btnGreen' : 'btnGrey'"
            @click="changeB()"
            class="cursor-pointer"
          >
            Conventional Integration
          </div>
        </div>
      </div>
    </div>

    <!-- Row 2 -->
    <div class="q-pa-md">
      <div class="font-16 row">
        <div>
          <b>{{ typeName(input.type) }} dimensions (all included)</b>
        </div>
        <div class="q-px-md">
          <q-icon name="fas fa-question-circle" size="24px">
             <q-tooltip>
              In DigiSRII 2.0 all dimensions are included <br />by default. To
              peruse specific dimensions <br />
              head on to the section “Build you own”
            </q-tooltip>
          
          </q-icon>
        </div>
      </div>
      <div>Hover to reveal included indicators</div>
      <!-- Sustainable integration icon -->
      <div class="q-pt-md" v-show="input.type=='A'">
        <div class="borderGreen q-pa-sm row">
          <div>
            <img
              src="../../public/ri/dimension01.svg"
              alt=""
              class="iconDimension"
            >
            <q-tooltip>
              Trade and investment<br />
              - Exports to GDP<br />
              - Imports to GDP<br />
              - Import tarriffs<br />
              - FDI inflows to GDP<br />
              - FDI outflows to GDP<br />
            </q-tooltip></img>
          </div>
          <div class="q-px-sm">
            <img
              src="../../public/ri/dimension02.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Financial integration<br />
              - Cross-border portfolio liablilities and assests to GDP<br />
              - Deposit rates dispersion<br />
              - Share price index correlation<br />
            </q-tooltip></img>
          </div>
          <div>
               <img
              src="../../public/ri/dimension03.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Regional value chain integration<br />
              - Export complementarity index<br />
              - RVC participation index<br />
              - Intermediate goods exports to GDP<br />
              - Intermediate goods imports to GDP<br />
            </q-tooltip></img>
          </div>
          <div class="q-px-sm">
            <img
              src="../../public/ri/dimension04.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Infrastructure integration<br />
              - Linear shipping connectivity index<br />
              - Trade facilitation implement<br />
              - Average internet quality<br />
              - Average trade cost<br />
            </q-tooltip></img>
          </div>
          <div>
            <img
              src="../../public/ri/dimension05.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Movement of peolple<br />
              - Stock of emigrants per capita<br />
              - Stock of immigrants per capita<br />
              - Remittances outflow to GDP<br />
              - Remittances inflow to GDP<br />
            </q-tooltip></img>
          </div>
          <div class="q-px-sm">
           <img
              src="../../public/ri/dimension06.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Regulatory cooperation<br />
              - Signed FTA (Yes/No)<br />
              - Signed IIA (Yes/No)<br />
              - Embassy (yes/No)<br />
              - Trade regulatory distance<br />
            </q-tooltip></img>
          </div>
          <div>
            <img
              src="../../public/ri/dimension07.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Digital economy integration<br />
              - ICT goods exports to GDP<br />
              - ICT goods imports to GDP<br />
              - Tariffs on ICT imports<br />
              - Share of online internet shoppers<br />
              - Digital trade regulatory similiarity<br />
            </q-tooltip></img>
          </div>
        </div>
      </div>
        <div class="q-pt-md" v-show="input.type=='B'">
        <div class="borderGreen q-pa-sm row">
          <div>
            <img
              src="../../public/ri/dimension01.svg"
              alt=""
              class="iconDimension"
            >
            <q-tooltip>
              Trade and investment<br />
              - Environmental goods exports in GDP of exporting country<br />
              - Environmental goods imports in GDP of importing country<br />
              - Tariff on intraregional imports of environmental goods<br />
              - Employment created by DVA in exports to regional economies<br />
            </q-tooltip></img>
          </div>
          <div class="q-px-sm">
            <img
              src="../../public/ri/dimension02.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Financial integration<br />
              - Intraregional real exchange rate volatility<br />
              - Average intraregional financial development index score<br />
              - Volatility weighted pair-wise correlaton of share price index averaged regionally<br />
            </q-tooltip></img>
          </div>
          <div>
               <img
              src="../../public/ri/dimension03.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Regional value chain integration<br />
              - Regional environmental good export complementarity index<br />
              - Sustainable RVC participation index<br />
              - Intraregional exports of intermediates per unit of CO2 emissions  <br />
            </q-tooltip></img>
          </div>
          <div class="q-px-sm">
            <img
              src="../../public/ri/dimension04.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Infrastructure integration<br />
              - Average intraregional rural access to electricity<br />
              - Intraregional sustainable trade facilitation implementation<br />
              - Average intraregional share of Internet users in population<br />
            </q-tooltip></img>
          </div>
          <div>
            <img
              src="../../public/ri/dimension05.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Movement of peolple<br />
              - Average outward remittances per regional immigrant<br />
              - Average inward remittances per emigrant<br />
            </q-tooltip></img>
          </div>
          <div class="q-px-sm">
           <img
              src="../../public/ri/dimension06.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Regulatory cooperation<br />
              - Sustainable regional FTA score<br />
              - Sustainable regional IIA score<br />
              - Average intraregional rule of law index score<br />
              - SDG trade regulatory distance from regional partners<br />
            </q-tooltip></img>
          </div>
          <div>
            <img
              src="../../public/ri/dimension07.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Digital economy integration<br />
              - Average intraregional secure Internet servers<br />
              - Average intraregional proportion of households with Internet access <br />
              - Average intraregional share of female population with financial institution or mobile money account<br />
              - Average intraregional share of female population that use Internet for online purchase<br />
            </q-tooltip></img>
          </div>
        </div>
      </div>
    </div>

    <!-- Control Panel -->
    <div class="row ">
      <div class="col-6 q-pa-md">
        <br />
        <div class="font-16"><b>Economies</b></div>
        <div>
          Select two or more economies of interest or a pre-selected group.
        </div>
        <div>
          <q-select
            :options="countryOptions"
            v-model="input.partner"
            multiple
            use-chips
            stack-label
            dense
            style="width:90%"
          />
        </div>
        <br />
        <div class="font-16"><b>Period</b></div>
        <div style="width: 250px;" class="row">
          <div class="col-6">
            <div>Start</div>
            <div>
              <q-select
                dense
                :options="year"
                v-model="input.startYear"
                style="width:80px;"
              />
            </div>
          </div>
          <div class="col-6">
            <div>End</div>
            <div>
              <q-select
                dense
                :options="year"
                v-model="input.endYear"
                style="width:80px;"
              />
            </div>
          </div>
        </div>
        <br />
        
        
      </div>
      <!------ right side -------->
      <div class="col-6 q-pa-md">
        <br />
        <div class="font-16"><b>Data availability</b></div>
        <div>
          Based on your selection, this group’s integration will be based on
        </div>
        <br />
        <div class=" q-pr-xl">
          <div class="notShowCircular" v-if="input.partner.length<2"> 
            <div class="" align="center">(Select your desired group of economics to check data availablity)</div>
          </div>
          <div class="showCircular" v-else align="center">
                <q-circular-progress
      show-value
      font-size="36px"
      :value="yourScore*100"
      size="300px"
      :thickness="0.36"
      color="teal"
      track-color="grey-5"
      class="q-ma-md"
    >
      {{ yourScore*100 }}%
    </q-circular-progress>
          </div>
        </div>
        <br />
        <div  align="center">
          off all possible reporter-partner pairs.
        </div>
        <br />
        <div  align="center">
          Click here to see this group’s availablitiy matrix
        </div>
        <br />
      </div>
      <!-- start Btn  -->
      <div class="q-pb-xl" align="center" style="width:100%">
          <div class="btnOutGreen cursor-pointer"  @click="startBtn()">
            Start
          </div>
        </div>
        <br />
       
    </div>
    <!-- Result -->
    <div v-if="showResult" class="q-ma-md">
      <!-- 4 bar result -->
      <div>
        <hr />
        <div class="q-pt-sm">
          Your group's
          <span v-if="input.type == 'A'">sustainable</span
          ><span v-else>conventional</span> Integration score in
          {{ input.endYear }} was
          <span class="text-green"
            ><b>{{ 0.74 }}</b></span
          >
        </div>
        <div>
          <four-bar :data="fourBarData"></four-bar>
        </div>
        <hr />
      </div>
      <!-- select type btn -->
      <div align="center"><div> Select desired level of disaggregation</div>
      <br>
      <div class="row justify-center">
        <div align="center">
          <div
            :class="viewType == 'A' ? 'btnGreen' : 'btnGrey'"
            @click="changeViewA()"
            class="cursor-pointer"
          >
            By country
          </div>
        </div>
        <div class="q-px-md" align="center">
          <div
            :class="viewType == 'B' ? 'btnGreen' : 'btnGrey'"
            @click="changeViewB()"
            class="cursor-pointer"
          >
            By dimension
          </div>
        </div>
      </div>
      <br>
      <div v-if="viewType == 'A'">
        See how each country is integrated with the group
      </div>
      <div v-else>
        See how each dimension is integrated with the group
      </div>
      </div>
      <br />
      <!-- chart view  -->
      <div class="row items-end">
        <div class="col-1"></div>
        <div class="q-px-xs" align="center">
          <div
            :class="showTypeChart == 'A' ? 'btnGreen' : 'btnGrey'"
            @click="chartView('A')"
            class="cursor-pointer"
          >
            Index
          </div>
        </div>
        <div class="q-px-xs" align="center">
          <div
            :class="showTypeChart == 'B' ? 'btnGreen' : 'btnGrey'"
            @click="chartView('B')"
            class="cursor-pointer"
          >
            Data availablity
          </div>
        </div>
        <div class="q-px-xs" align="center">
          <div
            :class="showTypeChart == 'C' ? 'btnGreen' : 'btnGrey'"
            @click="chartView('C')"
            class="cursor-pointer"
          >
            Weights
          </div>
        </div>
        <div class="col"></div>
        <div><u>Click here to see this group’s availablility matrix</u></div>
        <div class="col-1"></div>
      </div>
      <br>
      <!-- Line chart for by country  -->
      <div
        id="lineChartByCountry"
        v-show="showTypeChart == 'A'"
        style="max-width:1024px; width:100%; margin:auto;"
      ></div>
      <br />
      <!-- country box selected -->
      <div class="selectBoxDiv q-pa-sm" v-show="showTypeChart == 'A'">
        <div class="font-18 "><b>Select economies of interst</b></div>
        <div class="">
          Number in parentheses are
          <span v-if="input.type == 'A'">Sustainable</span
          ><span v-else>Conventional</span> Integration Index from the
          {{ input.endYear }}
        </div>
        <div>Click on each country to select / unselect it in the graph</div>
        <div>
          <select-item
            colorBox="#b02054"
            name="Group average"
            value="0.83"
          ></select-item>
        </div>
        <div><hr /></div>
        <div class="row">
        <div class=" q-pt-sm" style="width:20%" v-for="(item,index) in input.partner" :key="index">
          <select-item
            :colorBox="colorPattern[index]"
            :name="item.label"
            value="none"
          ></select-item>
        </div></div>
      </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri_header";
import myFooter from "../components/footer";
import fourBar from "../components/ri_fourbar";
import selectItem from "../components/ri_selectitem";
import Axios from "axios";
// import { visibility } from 'html2canvas/dist/types/css/property-descriptors/visibility';
export default {
  components: {
    riHeader,
    myFooter,
    fourBar,
    selectItem
  },
  data() {
    return {
      colorPattern:["#F44336","#2196F3","#8BC34A","#FF5722","#795548","#CDDC39","#03A9F4","#E91E63","#9C27B0","#00BCD4"," #FFEB3B","#9E9E9E","#673AB7","#009688","#FFC107","#607D8B","#536DFE","#FF9800","#4CAF50","#3F51B5"],
      countryOptions: [],
      input: {
        partner: [],
        startYear: "2014",
        endYear: "2019",
        type: "A"
      },
      showTypeChart:"A",
      showDim: "",
      year: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
      dimensionList: [],
      indicatorList: [],
      indicatorShow: [],
      showResult: true, //แสดงคำตอบ
      yourScore: 0.74, //คะแนนของตัวเองใน 4 bar
      fourBarData: [
        {
          name: "China-Mongolia",
          value: 0.91,
          own: false
        },
        {
          name: "ASEAN",
          value: 0.81,
          own: false
        },
        {
          name: "Your group",
          value: 0.74,
          own: true
        },
        {
          name: "Asia-Pacific",
          value: 0.56,
          own: false
        }
      ],
      viewType: "A", //A = By country, B= by dimension
      lineChartByCountryData: [
        {
          name: "Your group",
          data: [0.82, 0.84, 0.87, 0.88, 0.9, 0.91]
        },
        {
          name: "Singapore",
          data: [0.9, 0.92, 0.92, 0.93, 0.94, 0.96]
        },
        {
          name: "China",
          data: [0.75, 0.78, 0.79, 0.81, 0.82, 0.92]
        },
        {
          name: "Brazil",
          data: [0.63, 0.67, 0.8, 0.82, 0.87, 0.9]
        },
        {
          name: "Paraguay",
          data: [0.56, 0.59, 0.63, 0.7, 0.72, 0.87]
        },
        {
          name: "Ecuador",
          data: [0.56, 0.59, 0.63, 0.8, 0.85, 0.86]
        },
        {
          name: "Argentina",
          data: [0.43, 0.5, 0.53, 0.55, 0.57, 0.79]
        },
        {
          name: "Bolivia",
          data: [0.53, 0.5, 0.63, 0.65, 0.67, 0.69]
        },
        {
          name: "Chille",
          data: [0.43, 0.6, 0.63, 0.65, 0.67, 0.69]
        },
        {
          name: "Uruguay",
          data: [0.53, 0.6, 0.63, 0.65, 0.67, 0.69]
        }
      ]
      
    };
  },
  methods: {
    //Return type name form type = A =>Sustainable integration, type=B=> Conventional integration
    typeName(type) {
      return type == "A"
        ? "Sustainable integration"
        : "Conventional integration";
    },

    LineChartByCountry() {
      let yAxisLabel = "";
      if (this.input.type == "A") {
        yAxisLabel = "Sustainable Integration Index";
      } else {
        yAxisLabel = "Conventional Integration Index";
      }
      console.log(this.lineChartByCountryData[0].data[0]);

      let subTitle =
        "Since " +
        this.input.startYear +
        ", this group's Integration increased by";

      Highcharts.chart("lineChartByCountry", {
        chart: {
          height: (9 / 16) * 100 + "%", // 16:9 ratio
          style: { fontFamily: "roboto" }
        },
        title: {
          text:
            "How did Integration progress across year? - group and individual economics"
        },

        subtitle: {
          text: subTitle
        },

        yAxis: {
          title: {
            text: yAxisLabel
          },
          min: 0,
          max: 1
        },
        xAxis: {
          accessibility: {
            rangeDescription: "Range: 2010 to 2017"
          },
          tickInterval: 1
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle"
          
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: true
            },
            pointStart: Number(this.input.startYear),
            pointInterval: 1
          }
        },

        series: this.lineChartByCountryData,

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
                }
              }
            }
          ]
        },
         credits: {
    enabled: false
  },
      });
    },
    chartView(type){
      this.showTypeChart=type;
    },
    startBtn() {
      this.showResult = true;
    },
    changeViewA() {
      this.viewType = "A";
      this.LineChartByCountry();
    },
    changeViewB() {
      this.viewType = "B";
    },
    changeA() {
      this.input.type = "A";
      this.showIndicator();
    },
    changeB() {
      this.input.type = "B";
      this.showIndicator();
    },
    async loadDimension() {
      this.dimensionList = [];
      let url = this.path_api2 + "/ri_showdimension.php";
      let res = await axios.get(url);
      for (let i = 0; i < res.data.length; i++) {
        let temp = {
          value: res.data[i].id,
          label: res.data[i].name
        };
        this.dimensionList.push(temp);
      }
      this.showDim = this.dimensionList[0].value;
    },
    async loadIndicator() {
      this.indicatorList = [];
      let url = this.path_api2 + "/ri_showindicator.php";
      let res = await axios.get(url);
      this.indicatorList = res.data;
      this.showIndicator();
    },
    showIndicator() {
      this.indicatorShow = [];
      this.indicatorShow = this.indicatorList.filter(
        x => x.type == this.input.type && x.dimensionId == this.showDim
      );
    }
  },
  async mounted() {
    await this.getCountryList();
    await this.loadDimension();
    await this.loadIndicator();
  }
};
</script>

<style lang="scss" scoped>
.btnGreen {
  text-align: center;
  border-radius: 5px;
  width: 220px;
  height: 40px;
  line-height: 40px;
  color: white;
  background-color: #2d9687;
}
.btnGrey {
  text-align: center;
  border-radius: 5px;
  width: 220px;
  height: 40px;
  line-height: 40px;
  color: white;
  background-color: #757575;
}
.btnOutGreen {
  width: 335px;
  height: 45px;
  border: 3px solid #2d9687;
  border-radius: 5px;
  line-height: 45px;
  font-size: 18px;
  text-align: center;
}
.borderGreen {
  border: 3px solid #2d9687;
  width: 910px;
}
.iconDimension {
  width: 120px;
}
.footer-bg {
  background-image: url("../../public/footer.jpg");
  background-size: inherit;
  background-position: bottom;
}
.selectBoxDiv {
  border: 1px solid #757575;
}
.showCircular{
  height: 450px;
  line-height: 450px;
}
.notShowCircular{
  height: 450px;
  line-height: 450px;
  background: #E8E4E4;
}
</style>
