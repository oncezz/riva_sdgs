<template>
  <q-page
    class="container"
    :class="!isShowPage ? 'bg-loading' : 'bg-white'"
    style="padding-bottom:120px"
  >
    <app-bar :isShowLogo="false" @countrySelected="getEmitData"></app-bar>
    <div class="bg-white">
      <header-menu :activeMenu="4"></header-menu>
      <div class="q-px-md q-py-lg" style="width:500px;margin:auto">
        <span>Exporting sector</span>
        <q-select
          @input="getStructureOfValue()"
          dense
          outlined
          :options="sectorOptions"
          v-model="sectorSelected"
          emit-value
          map-options
        ></q-select>
      </div>
    </div>

    <div
      class="absolute-center font-graph"
      v-if="!isShowPage"
      style="width:90%; margin:auto; max-width:700px; text-align:center "
    >Please choose your Importing economy and Exporting sector.</div>

    <div v-if="isShowPage">
      <div class="q-px-md" style="margin:auto; max-width:1050px;width:95%;">
        <div class="q-pa-md" style="border-radius:5px;border:2px solid">
          <p class="font-graph" align="center">
            Where does {{ displayExportingEconomy }} contribute towards export
            production?
          </p>
          <p class="font-content" align="center">
            Some part of {{ displayExportingEconomy }}’s gross exports consist
            of intermediate inputs that are used by the direct importer to
            produce exports for third economy.
          </p>
          <p class="font-content" align="center">
            <span class="q-px-lg">Exporting economy ({{ displayExportingEconomy }})</span>
            <span class="q-pr-md text-weight-bold">:</span>
            <span class="q-pr-lg color4">
              <b>Exporting Sector</b>
            </span>

            <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
            <span class="q-px-lg">Importing economy</span>
            <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
            <span class="q-pl-lg">Third economies</span>
          </p>
        </div>

        <!-- Key policy questions -->
        <p align="center" class="font-graph q-py-lg">Key policy questions</p>
        <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#importedcountry'">
          1.
          <u>
            Where does {{ displayExportingEconomy }} contribute the most towards
            export production?
          </u>
        </p>
        <p class="font-content q-px-sm cursor-pointer" v-scroll-to="'#importedregion'">
          2.
          <u>
            Where do {{ continent }} economies contribute the most towards
            export production?
          </u>
        </p>
      </div>

      <div style="height:30px"></div>
      <hr />

      <!-- Where does Thailand's imported content -->
      <div id="importedcountry" style="height:30px"></div>
      <div style="width:90%;margin:auto;max-width:1200px">
        <div align="center" class="q-pa-lg" v-if="!isChart">
          <q-spinner-pie color="primary" size="100px" />
        </div>
        <div v-show="isChart">
          <div id="container"></div>
        </div>
      </div>
      <div style="height:30px"></div>
      <hr />

      <div id="importedregion" style="height:30px"></div>
      <div style="width:90%;margin:auto;max-width:1200px">
        <div align="center" class="q-pa-lg" v-if="!isChart1">
          <q-spinner-pie color="primary" size="100px" />
        </div>
        <div v-show="isChart1">
          <div id="container1"></div>
        </div>
      </div>
    </div>

    <!-- Title box -->
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
import headerMenu from "../components/fourMenu";
import sector from "../components/sector";
import Axios from "axios";

export default {
  components: {
    appBar,
    headerMenu,
    sector,
  },
  data() {
    return {
      isShowPage: false,
      sectorOptions: [],
      sectorSelected: "",

      continent: this.$q.sessionStorage.has("cselec")
        ? this.$q.sessionStorage.getItem("cselec").region
        : "",
      displayYear: this.$q.sessionStorage.has("cselec")
        ? this.$q.sessionStorage.getItem("cselec").year
        : "",

      displayExportingEconomy: this.$q.sessionStorage.has("cselec")
        ? this.$q.sessionStorage.getItem("cselec").name
        : "",
      exp_country: this.$q.sessionStorage.has("cselec")
        ? this.$q.sessionStorage.getItem("cselec").iso
        : "",

      displaySector: "",
      sector: "",
      chart2RawData: [], //Chart 2 raw data
      chart2DrillDown: [], //Chart 2 drill down
      chart2AsiaPacific: [], //Chart2 สำหรับตัว main (Asia-Pacific)
      chart2Europe: [], //Chart2 สำหรับตัว main (Europe)
      chart2NorthAmerica: [], //Chart2 สำหรับตัว main (North America)
      chart2LatinAmerica: [], //Chart2 สำหรับตัว main (Latin America)
      chart2RestOfTheWorld: [], //Chart2 สำหรับตัว main (Rest of the world)

      isChart: false,
      isChart1: false,
    };
  },
  methods: {
    checkShowPage() {
      if (
        this.displayExportingEconomy != "" &&
        this.displayYear != "" &&
        this.displaySector != ""
      ) {
        this.isShowPage = true;
        return true;
      } else {
        return false;
      }
    },

    // Get Emit Data
    getEmitData(val) {
      // Exporting Economy
      this.displayExportingEconomy = val.name;
      this.exp_country = val.iso;
      this.continent = val.region;
      this.displayYear = val.year;

      this.getStructureOfValue();
    },

    // Get Structure Of Value
    getStructureOfValue() {
      let sectorData = this.sectorOptions.filter(
        (x) => x.value == this.sectorSelected
      )[0];

      if (sectorData) {
        this.displaySector = sectorData.label;
        this.sector = sectorData.value;
      }

      let check = this.checkShowPage();
      if (check) {
        this.renderGraph(); // Render Graph
      }
    },
    renderGraph() {
      this.setData();
      this.setStackChart();
    },
    async setData() {
      this.isChart = false;

      let urlLink =
        this.path_api +
        `/cal_forward_country_1.php?exp_country=${this.exp_country}&year=${this.displayYear}&sector=${this.sector}`;

      let getData = await Axios.get(urlLink);

      getData = getData.data;

      let temp = [...getData];

      temp = temp.splice(5);

      temp.sort((a, b) => {
        return b.value - a.value;
      });

      let getValue = temp.map((x) => {
        return x.value;
      });

      let sumOfValue = getValue.reduce((a, b) => {
        return a + b;
      }, 0);

      let graphOneDetailsList = [];

      let getFirstFive = temp.map((x, index) => {
        if (index < 5) {
          let newData = {
            name: x.name,
            sum: ((x.value / sumOfValue) * 100).toFixed(2),
          };

          graphOneDetailsList.push(newData);
        }
      });

      let urlLinkSub =
        this.path_api +
        `/cal_forward_country_1a.php?exp_country=${this.exp_country}&year=${this.displayYear}&sector=${this.sector}`;

      let getDataSub = await Axios.get(urlLinkSub);

      getDataSub = getDataSub.data;

      this.isChart = true;

      Highcharts.chart("container", {
        chart: {
          height: (9 / 16) * 100 + "%", // 16:9 ratio
          style: { fontFamily: "roboto" },
        },
        series: [
          {
            type: "treemap",
            layoutAlgorithm: "squarified",
            alternateStartingDirection: true,
            levels: [
              {
                level: 1,
                // layoutAlgorithm: "sliceAndDice",
                dataLabels: {
                  enabled: true,
                  align: "left",
                  verticalAlign: "top",
                  style: {
                    fontSize: "15px",
                    fontWeight: "bold",
                  },
                },
              },
            ],

            data: getData,
            showInLegend: true,
            legendType: "point",
          },
        ],
        title: {
          style: {
            fontSize: "24px",
          },
          text: `Where does ${this.displayExportingEconomy} contribute the most towards export production?`,
        },
        credits: {
          enabled: false,
        },
        legend: {
          useHTML: true,
          itemStyle: {
            fontSize: "14px",
            fontWeight: "medium",
            fontFamily: "roboto",
            color: "#00000",
          },

          align: "right",
          verticalAlign: "middle",
          width: "200",
          // symbolPadding: 200,
          symbolWidth: 0.1,
          symbolHeight: 0.1,
          symbolRadius: 0,
          useHTML: true,
          symbolWidth: 0,
          labelFormatter: function () {
            // return "<div>" + this.name + "</div>";
            if (this.name == "Europe") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 15px;height: 15px;background-color: #eb1e63;"></div></td><td style="padding-left:20px;">Euroupe</td></tr></table></div>';
            } else if (this.name == "Latin America") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 15px;height: 15px;background-color: #2D9687;"></div></td><td style="padding-left:20px;">Latin America</td></tr></table></div>';
            } else if (this.name == "North America") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 15px;height: 15px;background-color: #F99704;"></div></td><td style="padding-left:20px;">North America</td></tr></table></div>';
            } else if (this.name == "Asia-Pacific") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 15px;height: 15px;background-color: #2381B8;"></div></td><td style="padding-left:20px;">Asia-Pacific</td></tr></table></div>';
            } else if (this.name == "Rest of the world") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 15px;height: 15px;background-color: #9C26B3;"></div></td><td style="padding-left:20px;">Rest of the world</td></tr></table></div>';
            }
          },
        },
        subtitle: {
          style: {
            fontSize: "14px",
          },
          text: `Gross exports of ${this.displayExportingEconomy} in ${this.displaySector} sector(s) to World amount to *$${getDataSub.grossExport}* billion in *year*. Of these exports, *$${getDataSub.contribution}* billion is ${this.displayExportingEconomy}'s contribution to export production in other economies, mainly  ${graphOneDetailsList[0].name} (*${graphOneDetailsList[0].sum}*%), ${graphOneDetailsList[1].name} (*${graphOneDetailsList[1].sum}*%), ${graphOneDetailsList[2].name} (*${graphOneDetailsList[2].sum}*%), ${graphOneDetailsList[3].name} (*${graphOneDetailsList[3].sum}*%) and ${graphOneDetailsList[4].name} (*${graphOneDetailsList[4].sum}*%). <br>Contribution to export production: $${getDataSub.contribution}B / Gross exports to World: $${getDataSub.grossExport}B`,
          align: "center",
        },
        exporting: {
          buttons: {
            contextButton: {
              menuItems: ["downloadCSV", "downloadXLS"],
            },
          },
        },
      });
    },
    async setStackChart() {
      this.isChart1 = false;

      let urlLink =
        this.path_api +
        `/cal_forward_country_2.php?exp_country=${this.exp_country}&year=${this.displayYear}&sector=${this.sector}`;

      let getData = await Axios.get(urlLink);

      getData = getData.data;
      let countryList = [];

      getData.map((x) => {
        countryList.push(x[0].exp_country);
      });
      let rawData = [];
      getData.map((x) => {
        let temp = x.filter((y) => y.value != 0);
        rawData.push(temp);
      });
      rawData.map((x) => {
        x.forEach((y) => {
          this.chart2RawData.push(y);
        });
      });

      //สร้าง Drill down สำหรับ Asia pacific
      let asiaRawData = this.chart2RawData.filter(
        (x) => x.area == "Asia-Pacific"
      );
      countryList.forEach((x) => {
        let data = asiaRawData.filter((y) => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        data.forEach((z) => {
          let temp = {
            name: z.imp_country,
            y: z.value,
          };
          sum += z.value;
          dataFinal.push(temp);
        });

        let tempData = {
          type: "pie",
          id: x + " - " + "Asia Pacific",
          name: x + " <br> " + "Asia-Pacific",
          data: dataFinal,
        };
        this.chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "Asia Pacific",
        };
        this.chart2AsiaPacific.push(tempData);
      });

      //สร้าง Drill down สำหรับ Europe
      let europeRawData = this.chart2RawData.filter((x) => x.area == "Europe");
      countryList.forEach((x) => {
        let data = europeRawData.filter((y) => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        data.forEach((z) => {
          let temp = {
            name: z.imp_country,
            y: z.value,
          };
          sum += z.value;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "Europe",
          name: x + " <br> " + "Europe",
          data: dataFinal,
        };
        this.chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "Europe",
        };
        this.chart2Europe.push(tempData);
      });

      //สร้าง Drill down สำหรับ North America
      let northAmericaRawData = this.chart2RawData.filter(
        (x) => x.area == "North America"
      );
      countryList.forEach((x) => {
        let data = northAmericaRawData.filter((y) => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        data.forEach((z) => {
          let temp = {
            name: z.imp_country,
            y: z.value,
          };
          sum += z.value;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "North America",
          name: x + " <br> " + "North America",
          data: dataFinal,
        };
        this.chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "North America",
        };
        this.chart2NorthAmerica.push(tempData);
      });

      //สร้าง Drill down สำหรับ Latin America
      let latinAmericaRawData = this.chart2RawData.filter(
        (x) => x.area == "Latin America"
      );
      countryList.forEach((x) => {
        let data = latinAmericaRawData.filter((y) => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        data.forEach((z) => {
          let temp = {
            name: z.imp_country,
            y: z.value,
          };
          sum += z.value;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "Latin America",
          name: x + " <br> " + "Latin America",
          data: dataFinal,
        };
        this.chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "Latin America",
        };
        this.chart2LatinAmerica.push(tempData);
      });

      //สร้าง Drill down สำหรับ Rest of the world
      let restRawData = this.chart2RawData.filter(
        (x) => x.area == "Rest of the world"
      );
      countryList.forEach((x) => {
        let data = restRawData.filter((y) => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        data.forEach((z) => {
          let temp = {
            name: z.imp_country,
            y: z.value,
          };
          sum += z.value;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "Rest of the world",
          name: x + " <br> " + "Rest of the world",
          data: dataFinal,
        };
        this.chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          drilldown: x + " - " + "Rest of the world",
        };
        this.chart2RestOfTheWorld.push(tempData);
      });

      this.isChart1 = true;

      Highcharts.chart(
        "container1",
        {
          chart: {
            type: "column",
            height: (9 / 16) * 100 + "%", // 16:9 ratio
            style: { fontFamily: "roboto" },
          },

          xAxis: {
            labels: {
              rotation: -90,
            },
            type: "category",
          },
          credits: {
            enabled: false,
          },
          yAxis: {
            min: 0,
            title: {
              text: "% of gross exports to world",
            },
            stackLabels: {
              enabled: false,
              style: {
                fontWeight: "bold",
                color:
                  // theme
                  (Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color) ||
                  "gray",
              },
            },
          },
          legend: {
            useHTML: true,
            itemStyle: {
              fontSize: "14px",
              fontWeight: "medium",
              fontFamily: "roboto",
              color: "#00000",
            },
            align: "right",
            verticalAlign: "middle",
            width: 200,
            itemMarginTop: 25,
            symbolHeight: 15,
            symbolWidth: 50,
            symbolRadius: 0,
          },

          tooltip: {
            pointFormat:
              "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
          },
          plotOptions: {
            column: {
              stacking: "normal",
              dataLabels: {
                enabled: false,
              },
            },
          },

          series: [
            {
              name: "Asia-Pacific",
              data: this.chart2AsiaPacific,
              color: "#2381B8",
            },
            {
              name: "Europe",
              data: this.chart2Europe,
              color: "#EB1E63",
            },
            {
              name: "North America",
              data: this.chart2NorthAmerica,
              color: "#f99704",
            },
            {
              name: "Latin America",
              data: this.chart2LatinAmerica,
              color: "#2D9687",
            },
            {
              name: "Rest of the world",
              data: this.chart2RestOfTheWorld,
              color: "#9C26B3",
            },
          ],
          drilldown: {
            activeDataLabelStyle: {
              color: "white",
              textShadow: "0 0 2px black, 0 0 2px black",
            },
            showInLegend: false,
            series: this.chart2DrillDown,
          },
          title: {
            style: {
              fontSize: "24px",
            },
            text: `Where do ${this.continent} economies contribute the most towards export production?`,
          },
          exporting: {
            buttons: {
              contextButton: {
                menuItems: ["downloadCSV", "downloadXLS"],
              },
            },
          },
        },
        (Highcharts.Tick.prototype.drillable = function () {})
      );
    },
  },
  async mounted() {
    await this.getSectorList();
  },
};
</script>

<style scoped></style>
