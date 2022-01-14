<template>
  <q-page>
    <global-value-chains-header
      :isShowTinaLink="true"
      :isDisableShare="isDisableShare"
      :isDisableTina="isDisableTinaLink"
    ></global-value-chains-header>

    <global-value-chains-menu :activeMenu="2"></global-value-chains-menu>

    <!-- DROPDOWN SELECTION -->
    <div class="bg12 q-pb-lg">
      <div class="row q-pt-md justify-center">
        <div class="col-3 q-px-md">
          <span>Exporting economy</span>
          <div>
            <!-- <q-select
              v-model="exp_country"
              :options="exp_optionsShow"
              outlined
              bg-color="white"
              dense
              use-input
              fill-input
              hide-selected
              @filter="filterExpCountry"
              @input="selectedExpCountry()"
            >
              <template v-slot:prepend v-if="expCountry">
                <gb-flag
                  class="q-mr-sm"
                  v-if="expCountry.code && expCountry.code !='TW'"
                  :code="expCountry.code"
                  size="small"
                />
              </template>

              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section avatar>
                    <gb-flag
                      v-if="scope.opt.code && scope.opt.code !='TW'"
                      :code="scope.opt.code"
                      size="small"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label" />
                    <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>-->

            <q-select
              dense
              bg-color="white"
              outlined
              v-model="exp_country"
              :options="countryOptions"
              @input="selectedExpCountry()"
            >
              <template v-slot:prepend v-if="expCountry">
                <gb-flag
                  class="q-mr-sm"
                  v-if="expCountry.code && expCountry.code != 'TW'"
                  :code="expCountry.code"
                  size="small"
                />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section avatar>
                    <gb-flag
                      v-if="scope.opt.code && scope.opt.code != 'TW'"
                      :code="scope.opt.code"
                      size="small"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label
                      v-html="scope.opt.label"
                      :class="
                        scope.opt.disable
                          ? 'text-black text-weight-bolder'
                          : 'text-black'
                      "
                    />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
        <div class="col-3 q-px-md">
          <span>Year</span>
          <div>
            <q-select
              v-model="year"
              :options="yearOptions"
              outlined
              bg-color="white"
              dense
              @input="selectedYear()"
            ></q-select>
          </div>
        </div>
      </div>

      <div class="row q-pt-md justify-center">
        <div class="col-3 q-px-md">
          <span>Importing economy</span>
          <div>
            <!-- <q-select
              v-model="imp_country"
              :options="imp_optionsShow"
              outlined
              bg-color="white"
              class="q-mb-xs"
              dense
              use-input
              fill-input
              hide-selected
              @filter="filterImpCountry"
              @input="selectedImpCountry()"
            >
              <template v-slot:prepend v-if="impCountry">
                <gb-flag
                  class="q-mr-sm"
                  v-if="impCountry.code&&impCountry.code!='TW'"
                  :code="impCountry.code"
                  size="small"
                />
              </template>

              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section avatar>
                    <gb-flag
                      v-if="scope.opt.code && scope.opt.code !='TW'"
                      :code="scope.opt.code"
                      size="small"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label" />
                    <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>-->

            <q-select
              dense
              bg-color="white"
              outlined
              v-model="imp_country"
              :options="countryOptions"
              @input="selectedImpCountry()"
            >
              <template v-slot:prepend v-if="impCountry">
                <gb-flag
                  class="q-mr-sm"
                  v-if="impCountry.code && impCountry.code != 'TW'"
                  :code="impCountry.code"
                  size="small"
                />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section avatar>
                    <gb-flag
                      v-if="scope.opt.code && scope.opt.code != 'TW'"
                      :code="scope.opt.code"
                      size="small"
                    />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label
                      v-html="scope.opt.label"
                      :class="
                        scope.opt.disable
                          ? 'text-black text-weight-bolder'
                          : 'text-black'
                      "
                    />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
        <div class="col-3 q-px-md">
          <span>Exporting sector</span>
          <div>
            <!-- <q-select
              bg-color="white"
              class="q-mb-xs"
              v-model="sector"
              emit-value
              map-options
              dense
              :options="sectorOptions"
              outlined
              @input="selectedSector()"
            ></q-select>-->

            <q-select
              bg-color="white"
              dense
              filled
              v-model="sector"
              :options="sectorOptions"
              map-options
              emit-value
              @input="selectedSector()"
              outlined
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section>
                    <q-item-label
                      v-html="scope.opt.label"
                      :class="
                        scope.opt.disable
                          ? 'text-black text-weight-bolder'
                          : 'text-black'
                      "
                    />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
      </div>
    </div>

    <!-- Show Details -->
    <div v-if="exp_country && year && imp_country && sector">
      <!-- Sorry Duplicates -->
      <div
        v-if="
          exp_country == imp_country &&
            exp_country.value < 74 &&
            imp_country.value < 74
        "
      >
        {{ exp_country.value }}
        <sorry-duplicate
          text="Please choose exporting economy, importing economy, exporting sector and year from the drop down menus above"
        ></sorry-duplicate>
      </div>

      <!-- Details -->
      <div class="bg-white" v-else>
        <div class="row">
          <div class="col-3">
            <q-img cover src="../../public/images/pgvc.jpg"></q-img>
          </div>
          <div class="col-9 q-py-lg" style="background-color:#E5E1E1">
            <div class="q-mt-md">
              <p align="center" class="font-graph text-bold">
                Why does GVC participation matter?
              </p>
            </div>
            <div
              align="center"
              class="q-px-lg font-content"
              style="max-width:1000px;width:100%;margin:auto;"
            >
              <p align="left">
                GVC participation matters for development. GVCs support
                efficient production and technology diffusion, and accesfs to
                capital and inputs thereby increasing productivity and income
                growth, and reducing poverty.
              </p>
              <p align="left">
                In addition, recent developments in digital technology are set
                to support integration of SMEs into GVCs, further amplifying
                sustainable outcomes from participation.
              </p>
            </div>
          </div>
        </div>
        <!-- GRAPH -->
        <div style="height:30px"></div>
        <div class="q-py-xl" style="width:90%;margin:auto;max-width:1200px">
          <div align="center" class="q-pa-lg" v-if="!isChart">
            <q-spinner-pie color="primary" size="100px" />
          </div>

          <!-- Graph -->
          <div v-show="isChart">
            <div id="container"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Waiting -->
    <div v-else>
      <div style="height:450px;">
        <div class="row">
          <div class="col-3">
            <q-img cover src="../../public/images/pgvc.jpg"></q-img>
          </div>
          <div class="col-9 q-py-lg" style="background-color:#E5E1E1">
            <div class="q-mt-md">
              <p align="center" class="font-graph text-bold">
                Why does GVC participation matter?
              </p>
            </div>
            <div
              align="center"
              class="q-px-lg font-content"
              style="max-width:1000px;width:100%;margin:auto;"
            >
              <p align="left">
                GVC participation matters for development. GVCs support
                efficient production and technology diffusion, and access to
                capital and inputs thereby increasing productivity and income
                growth, and reducing poverty.
              </p>
              <p align="left">
                In addition, recent developments in digital technology are set
                to support integration of SMEs into GVCs, further amplifying
                sustainable outcomes from participation.
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div
          class="font-graph text-black q-pt-xl"
          style="width:100%;"
          align="center"
        >
          Please choose exporting economy, importing economy, exporting sector
          and year from the drop down menus above
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <my-footer></my-footer>
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
import headerMenu from "../components/fourMenu";
import importingSelect from "../components/importEconomySelect";
import errorPage from "../components/error-page";
import Axios from "axios";

// new
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import globalValueChainsMenu from "../components/menu";
import sorryDuplicate from "../components/sorryDuplicate.vue";
import myFooter from "../components/footer";

let CancelToken = Axios.CancelToken;
let source = CancelToken.source();
let cancelGraph;

export default {
  components: {
    appBar,
    headerMenu,
    importingSelect,
    errorPage,
    globalValueChainsHeader,
    globalValueChainsMenu,
    myFooter,
    sorryDuplicate
  },
  data() {
    return {
      // NEW
      // Country List
      countryOptions: [],
      isDisableTinaLink: true,
      isDisableShare: true,

      // Show Country when filter for Exporting
      exp_optionsShow: [],
      exp_country: "",

      // Show Country when filter for Importing
      imp_optionsShow: [],
      imp_country: "",

      // Year List
      yearOptions: [],
      year: "",

      // OLD
      isShowPage: false,
      importingEconomy: "",

      sectorOptions: [],
      sector: "",
      sectorName: "",
      isShowErrorWarning: false,

      isChart: false
    };
  },
  computed: {
    expCountry() {
      if (this.exp_country) {
        let res = this.countryOptions.filter(
          x => x.value == this.exp_country.value
        )[0];

        return res;
      }
    },

    impCountry() {
      if (this.imp_country) {
        let res = this.countryOptions.filter(
          x => x.value == this.imp_country.value
        )[0];

        return res;
      }
    }
  },
  methods: {
    filterExpCountry(val, update) {
      update(async () => {
        this.exp_optionsShow = this.countryOptions.filter(
          x => x.label.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    },
    filterImpCountry(val, update) {
      update(async () => {
        this.imp_optionsShow = this.countryOptions.filter(
          x => x.label.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    },

    selectedExpCountry() {
      this.$q.sessionStorage.set("expe", this.exp_country.iso);

      if (this.validateSelected()) {
        this.renderGraph();
      }
    },
    selectedImpCountry() {
      this.$q.sessionStorage.set("impe", this.imp_country.iso);
      if (this.validateSelected()) {
        this.renderGraph();
      }
    },
    selectedYear() {
      this.$q.sessionStorage.set("year", this.year);
      if (this.validateSelected()) {
        this.renderGraph();
      }
    },
    selectedSector() {
      this.$q.sessionStorage.set("esec", this.sector);
      if (this.validateSelected()) {
        this.renderGraph();
      }
    },

    validateSelected() {
      if (this.exp_country && this.imp_country && this.year && this.sector) {
        this.isDisableShare = false;
        if (this.exportAvailable.includes(this.exp_country.iso)) {
          this.isDisableTinaLink = false;
        }
        return true;
      } else {
        return false;
      }
    },

    renderGraph() {
      this.sectorName = this.sectorOptions.filter(x => x.value == this.sector);
      this.sectorName = this.sectorName[0].label

        .slice(this.sectorName[0].label.indexOf(" "))
        .trim()
        .toLowerCase();
      if (this.sector == 0) {
        this.sectorName = "all sectors";
      }
      this.setStackChart();
      let link =
        "https://riva.negotiatetrade.org/#/participation-in-gvcs/" +
        this.exp_country.iso +
        "/" +
        this.year +
        "/" +
        this.imp_country.iso +
        "/" +
        this.sector;
      this.$q.sessionStorage.set("shareLink", link);
    },

    async setStackChart() {
      this.isChart = false;

      let urlLink =
        this.path_api +
        `/cal_participation.php?exp_country=${this.exp_country.iso}&imp_country=${this.imp_country.iso}&year=${this.year}&sector=${this.sector}`;

      console.log(urlLink);

      if (cancelGraph !== undefined) {
        cancelGraph();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph = c;
        })
      });

      let region = this.countryOptions.filter(
        x => x.iso == this.exp_country.iso
      )[0].region;

      getData = getData.data;
      // console.log(getData);

      let countryList = [];
      let forwardList = [];
      let backwardList = [];
      let doubleList = [];
      let finalList = [];

      getData.map(x => {
        countryList.push(x.country);

        let newForward = {
          y: x.forward,
          name: x.forward,
          valM: x.forward_v
        };
        forwardList.push(newForward);

        let newBackward = {
          y: x.backward,
          name: x.backward,
          valM: x.backward_v
        };
        backwardList.push(newBackward);

        let newDouble = {
          y: x.double,
          name: x.double,
          valM: x.double_v
        };

        doubleList.push(newDouble);

        let newFinal = {
          y: x.final,
          name: x.final,
          valM: x.final_v
        };
        finalList.push(newFinal);
      });

      // console.log(forwardList);
      // console.log(backwardList);
      // console.log(doubleList);
      // console.log(finalList);

      forwardList.forEach((element, index) => {
        forwardList[index]["totalY"] = Number(
          element.valM +
            backwardList[index]["valM"] +
            doubleList[index]["valM"] +
            finalList[index]["valM"]
        ).toFixed(2);
        backwardList[index]["totalY"] = Number(
          element.valM +
            backwardList[index]["valM"] +
            doubleList[index]["valM"] +
            finalList[index]["valM"]
        ).toFixed(2);
        doubleList[index]["totalY"] = Number(
          element.valM +
            backwardList[index]["valM"] +
            doubleList[index]["valM"] +
            finalList[index]["valM"]
        ).toFixed(2);

        finalList[index]["totalY"] = Number(
          element.valM +
            backwardList[index]["valM"] +
            doubleList[index]["valM"] +
            finalList[index]["valM"]
        ).toFixed(2);
      });

      this.isChart = true;

      Highcharts.chart("container", {
        chart: {
          type: "column",
          height: (9 / 16) * 100 + "%" // 16:9 ratio
        },

        xAxis: {
          labels: {
            rotation: -90
          },
          categories: countryList
        },
        yAxis: {
          min: 0,
          title: {
            text: `% of gross exports to ${this.imp_country.label}`
          },
          stackLabels: {
            enabled: false,
            style: {
              fontWeight: "bold",
              color:
                // theme
                (Highcharts.defaultOptions.title.style &&
                  Highcharts.defaultOptions.title.style.color) ||
                "gray"
            }
          }
        },
        credits: {
          enabled: false
        },
        exporting: {
          buttons: {
            contextButton: {
              menuItems: [
                "downloadPNG",
                "downloadJPEG",
                "separator",
                "downloadCSV",
                "downloadXLS"
              ]
            }
          },
          width: "1920px",
          chartOptions: {
            legend: {
              width: 150,
              itemMarginTop: 5,
              symbolWidth: 10,
              symbolHeight: 10,
              symbolRadius: 0,

              itemStyle: {
                fontSize: "7px",
                fontWeight: "medium",
                fontFamily: "roboto",
                color: "#00000"
              }
            },
            title: {
              style: { fontSize: "12px" }
            },
            subtitle: {
              style: { fontSize: "8px" }
            },
            yAxis: [
              {
                title: {
                  text: `% of gross exports to ${this.imp_country.label}`,
                  style: { fontSize: "6px" }
                },
                labels: {
                  style: { fontSize: "10px" }
                }
              }
            ],
            xAxis: [
              {
                categories: countryList,
                labels: {
                  rotation: -90,
                  style: { fontSize: "20px" }
                }
              }
            ]
          }
        },
        legend: {
          useHTML: true,
          itemStyle: {
            fontSize: "12px",
            fontWeight: "medium",
            fontFamily: "roboto",
            color: "#00000"
          },
          width: 350,
          layout: "vertical",
          enabled: true,
          align: "right",
          verticalAlign: "middle",
          itemMarginTop: 25,
          symbolHeight: 15,
          symbolWidth: 50,
          symbolRadius: 0
        },
        tooltip: {
          // pointFormatter:function(){
          //   console.log("{point}");
          // },
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat:
            "{series.name} : {point.name}% <br/>Value: ${point.valM} million<br/>Total GVC exports: ${point.totalY} million"
        },
        plotOptions: {
          column: {
            stacking: "normal",
            dataLabels: {
              enabled: false
            }
          }
        },
        series: [
          {
            name: `Domestic production used in<br> the importer's exports`,
            data: forwardList,
            color: "#EB1E63"
          },
          {
            name: `Domestic production that returns <br> via the importer's exports`,
            data: finalList,
            color: "#f99704"
          },
          {
            name: "Double counted exports from <br> repeated border crossings",
            data: doubleList,
            color: "#9C26B3"
          },
          {
            name: `Foreign production consumed <br> by the importer`,
            data: backwardList,
            color: "#2D9687"
          }
        ],
        title: {
          style: {
            fontSize: "24px",
            fontFamily: "roboto"
          },

          text: `How much of ${this.exp_country.label}’s exports of ${this.sectorName} to ${this.imp_country.label} are GVC related compared across ${region} economies?`
        }
      });
    },

    async getYear() {
      let url = this.path_api + "/get_year_active.php";
      let data = await Axios.get(url);
      let temp = [];
      data.data.forEach(element => {
        temp.push(element);
      });
      this.yearOptions = temp;
    }
  },
  async mounted() {
    this.$q.sessionStorage.remove("shareLink");
    await this.getCountryList();
    await this.getSectorList();
    await this.getYear();

    if (this.$q.sessionStorage.has("expe") || this.$route.params.expe) {
      this.exp_country = this.$route.params.expe
        ? this.countryOptions.filter(x => x.iso == this.$route.params.expe)[0]
        : this.countryOptions.filter(
            x => x.iso == this.$q.sessionStorage.getItem("expe")
          )[0];

      this.exp_optionsShow = this.countryOptions;
    }

    if (this.$q.sessionStorage.has("impe") || this.$route.params.impe) {
      this.imp_country = this.$route.params.impe
        ? this.countryOptions.filter(x => x.iso == this.$route.params.impe)[0]
        : this.countryOptions.filter(
            x => x.iso == this.$q.sessionStorage.getItem("impe")
          )[0];
      this.imp_optionsShow = this.countryOptions;
    }

    if (this.$q.sessionStorage.has("year") || this.$route.params.year) {
      this.year = this.$route.params.year
        ? this.$route.params.year
        : this.$q.sessionStorage.getItem("year");
    }
    if (this.year == "") {
      this.year = "2017";
    }

    if (this.$q.sessionStorage.has("esec") || this.$route.params.sector) {
      this.sector = this.$route.params.sector
        ? this.$route.params.sector
        : this.$q.sessionStorage.getItem("esec");
    }
    if (this.sector == "") {
      this.sector = "0";
    }

    if (this.validateSelected()) {
      this.renderGraph();
    }
  },

  beforeDestroy() {
    if (cancelGraph !== undefined) {
      cancelGraph();
    }
  }
};
</script>

<style lang="scss" scoped></style>
