<template>
  <q-page class="bg-white">
    <global-value-chains-header
      :isShowTinaLink="true"
      :isDisableShare="isDisableShare"
      :isDisableTina="isDisableTinaLink"
    ></global-value-chains-header>

    <global-value-chains-menu :activeMenu="1"></global-value-chains-menu>

    <!-- DROPDOWN SELECTION -->
    <div class="bg12" style="height:180px">
      <div class="row q-pt-md justify-center">
        <div class="col-3 q-px-md">
          <div>Exporting economy</div>
          <div>
            <!-- <q-select
              v-model="exportingSelected"
              :options="countryOptionsShow"
              outlined
              bg-color="white"
              class="q-mt-xs"
              dense
              use-input
              fill-input
              hide-selected
              @filter="filterCountry"
              @input="selectedExporting()"
            >
              <template v-slot:prepend v-if="exportingSelected.code">
                <gb-flag
                  v-if="exportingSelected.code != 'TW'"
                  :code="exportingSelected.code"
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
                    <q-item-label v-html="scope.opt.label" />
                    <q-item-label caption>
                      {{ scope.opt.description }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>-->

            <q-select
              dense
              bg-color="white"
              outlined
              v-model="exportingSelected"
              :options="countryOptions"
              @input="selectedExporting()"
            >
              <template v-slot:prepend v-if="exportingSelected.code">
                <gb-flag
                  v-if="exportingSelected.code != 'TW'"
                  :code="exportingSelected.code"
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
          <div>Year</div>
          <div>
            <q-select
              outlined
              bg-color="white"
              v-model="year"
              dense
              :options="dataYearList"
              map-options
              emit-value
              @input="changeYear()"
            ></q-select>
          </div>
        </div>
      </div>

      <div class="row q-pt-md justify-center">
        <div class="col-3 q-px-md">
          <div>Importing economy</div>
          <div>
            <!-- <q-select
              bg-color="white"
              v-model="importingSelected"
              :options="countryOptionsShow"
              outlined
              class="q-mt-xs"
              dense
              use-input
              fill-input
              hide-selected
              @filter="filterCountry"
              @input="selectedImporting()"
            >
              <template v-slot:prepend v-if="importingSelected.code">
                <gb-flag
                  v-if="
                    importingSelected.code && importingSelected.code != 'TW'
                  "
                  :code="importingSelected.code"
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
                    <q-item-label v-html="scope.opt.label" />
                    <q-item-label caption>
                      {{ scope.opt.description }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>-->

            <q-select
              dense
              bg-color="white"
              outlined
              v-model="importingSelected"
              :options="countryOptions"
              @input="selectedImporting()"
            >
              <template v-slot:prepend v-if="importingSelected.code">
                <gb-flag
                  v-if="
                    importingSelected.code && importingSelected.code != 'TW'
                  "
                  :code="importingSelected.code"
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
          <div>Exporting sector</div>
          <div>
            <!-- <q-select
              bg-color="white"
              v-model="sectorSelected"
              dense
              :options="sectorOptions"
              outlined
              map-options
              emit-value
              @input="selectedSector()"
            ></q-select>-->

            <q-select
              bg-color="white"
              dense
              filled
              v-model="sectorSelected"
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
    <!--  -->

    <div
      v-if="exportingSelected && year && importingSelected && sectorSelected"
    >
      <sorry-duplicate v-if="checkDuplicateSelected"></sorry-duplicate>

      <div class="bg-white" v-else>
        <!-- <div class="row q-px-md q-py-lg font-content">
          <div class="col q-px-md" align="center">
            <div
              style="border:1px solid;height:60px"
              class="flex flex-center cursor-pointer relative-position"
              v-scroll-to="'#keypolicy'"
              v-ripple
            >Key policy questions</div>
          </div>
          <div class="col q-px-md" align="center">
            <div
              style="border:1px solid;height:60px"
              class="flex flex-center cursor-pointer relative-position"
              v-scroll-to="'#structure'"
              v-ripple
            >Structure of value-added</div>
          </div>
          <div class="col q-px-md" align="center">
            <div
              style="border:1px solid;height:60px"
              class="flex flex-center cursor-pointer relative-position"
              v-scroll-to="'#measuring'"
              v-ripple
            >Measuring trade balance</div>
          </div>
          <div class="col q-px-md" align="center">
            <div
              style="border:1px solid;height:60px"
              class="flex flex-center cursor-pointer relative-position"
              v-ripple
              v-scroll-to="'#comparison'"
            >Comparison with sub-regional partners</div>
          </div>
        </div>-->

        <!--  -->
        <!-- <div class="row" style="height:340px">
          <div class="col-3">
            <q-img src="../../public/images/image-58.png"></q-img>
          </div>
          <div class="col flex flex-center" align="center" style="background-color:#E5E1E1">
            <div class="divRight">
              <p
                class="font-24"
                align="center"
              >How do you disaggregate value-added in gross exports?</p>

              <div class="font-content q-pb-sm" align="center">
                {{ exportingSelected.label }}'s gross exports can be divided
                into five major parts:
              </div>
              <div class="row q-pt-md" style="width:95%; margin:auto;">
                <div style="width:20%" align="center">Used in importer's consumption</div>
                <div style="width:20%" align="center">Used in domestic consumption</div>
                <div style="width:20%" align="center">Used in importer's export production</div>
                <div style="width:20%" align="center">Imported content</div>
                <div
                  style="width:20%"
                  align="center"
                >Double counted exports from repeated border crossing</div>
              </div>
              <div class="bracketLeft"></div>
              <div class="bracketRight"></div>
              <div
                class="textLeft font-content"
              >{{ exportingSelected.label }}'s valued-added in exports</div>
              <div class="textRight font-content">GVC releated exports</div>
            </div>
          </div>
        </div>-->

        <div style="height:600px;">
          <div class="font-graph q-pa-md">Key policy questions</div>
          <div v-if="exportingSelected == ''">
            <ul>
              <li>How is an economy’s gross exports produced and utilised?</li>
              <li>
                How does this economy’s value-added trade balance differ from
                its gross trade balance?
              </li>
              <li>
                How are gross exports produced and consumed across other
                economies in the same region?
              </li>
            </ul>
          </div>
          <div v-else>
            <ul>
              <li>
                How is {{ exportingSelected.label }}’s gross exports produced
                and utilised?
              </li>
              <li>
                How does {{ exportingSelected.label }}’s value-added trade
                balance differ from its gross trade balance?
              </li>
              <li>
                How are gross exports produced and consumed across other
                economies in the same region?
              </li>
            </ul>
          </div>

          <hr />
          <div class="row" style="background-color:#E5E1E1;">
            <div style="background-color:#F8F8F6; width:350px;">
              <q-img
                src="../../public/images/sva.jpg"
                style="width:350px;"
              ></q-img>
            </div>
            <div class="col q-py-md font-content" align="center">
              <div
                class="text-black"
                v-if="exportingSelected == '' || importingSelected == ''"
              >
                Exporter's gross exports to importer can be divided into 6
                parts,
                <br />depending on where they come from and how they are used:
              </div>
              <div class="text-black" v-else>
                {{ exportingSelected.label }}'s gross exports to
                {{ importingSelected.label }} can be divided into 6 parts,
                <br />depending on where they come from and how they are used:
              </div>
              <q-img
                style="width:850px;"
                src="../../src/assets/titlesva2.jpg"
              ></q-img>
            </div>
          </div>
          <hr />
        </div>
      </div>

      <!-- GRAPH1 -->
      <div style="height:30px" id="structure"></div>
      <div style="width:90%;margin:auto;max-width:1200px">
        <div align="center" class="q-pa-lg" v-if="!isStructureChart">
          <q-spinner-pie color="primary" size="100px" />
        </div>
        <div v-show="isStructureChart" class="q-mt-xl">
          <div
            id="container"
            v-if="!errorGraph1 && !errorGraph2 && !errorGraph3"
          ></div>
        </div>

        <!-- :exportCountry="exportingSelected.label"
        :importCountry="importingSelected.label"-->
        <error-graph
          v-if="errorGraph1 || errorGraph2 || errorGraph3"
          :content="
            `How are ${exportingSelected.label}'s exports to ${importingSelected.label} produced and utilsed?`
          "
        ></error-graph>
      </div>
      <hr />
      <!-- GRAPH2 -->
      <div id="measuring" style="height:30px"></div>

      <div style="width:90%;margin:auto;max-width:1200px">
        <div align="center" class="q-pa-lg" v-if="!isMeasuringChart">
          <q-spinner-pie color="primary" size="100px" />
        </div>
        <div v-show="isMeasuringChart">
          <div
            id="container2"
            v-if="!errorGraph1 && !errorGraph2 && !errorGraph3"
          ></div>
        </div>

        <error-graph
          v-if="errorGraph3 || errorGraph1 || errorGraph2"
          :content="
            `How does ${exportingSelected.label}'s gross and domestic value-added trade balance with  ${importingSelected.label} differ?`
          "
        ></error-graph>
      </div>

      <hr />

      <!--GRAPH3  -->
      <div id="comparison" style="height:30px"></div>

      <div style="width:90%;margin:auto;max-width:1200px">
        <div align="center" class="q-pa-lg" v-if="!isComparisonChart">
          <q-spinner-pie color="primary" size="100px" />
        </div>
        <div v-show="isComparisonChart">
          <div
            id="container1"
            v-if="!errorGraph1 && !errorGraph3 && !errorGraph2"
          ></div>
        </div>

        <error-graph
          v-if="errorGraph2 || errorGraph1 || errorGraph3"
          :content="
            `How are ${this.continent} economies’ exports to ${this.importingSelected.label} produced and utilised?`
          "
        ></error-graph>
      </div>
    </div>

    <div v-else>
      <div style="height:750px;">
        <div class="font-graph q-pa-md">Key policy questions</div>
        <div v-if="exportingSelected == ''">
          <ul>
            <li>How is an economy’s gross exports produced and utilised?</li>
            <li>
              How does this economy’s value-added trade balance differ from its
              gross trade balance?
            </li>
            <li>
              How are gross exports produced and consumed across other economies
              in the same region?
            </li>
          </ul>
        </div>
        <div v-else>
          <ul>
            <li>
              How is {{ exportingSelected.label }}’s gross exports produced and
              utilised?
            </li>
            <li>
              How does {{ exportingSelected.label }}’s value-added trade balance
              differ from its gross trade balance?
            </li>
            <li>
              How are gross exports produced and consumed across other economies
              in the same region?
            </li>
          </ul>
        </div>

        <hr />
        <div class="row" style="background-color:#E5E1E1;">
          <div style="background-color:#F8F8F6; width:350px;">
            <q-img
              src="../../public/images/sva.jpg"
              style="width:350px;"
            ></q-img>
          </div>
          <div class="col q-py-md" align="center">
            <div
              class="text-black"
              v-if="exportingSelected == '' || importingSelected == ''"
            >
              Exporter's gross exports to importer can be divided into 6 parts,
              <br />depending on where they come from and how they are used:
            </div>
            <div class="text-black" v-else>
              Exporter's ({{ exportingSelected.label }}) gross exports to
              importer ({{ importingSelected.label }}) can be divided into 6
              parts, <br />depending on where they come from and how they are
              used:
            </div>
            <q-img
              style="width:850px;"
              src="../../src/assets/titlesva2.jpg"
            ></q-img>
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
import Axios from "axios";
import errorPage from "../components/error-page";
// new
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import globalValueChainsMenu from "../components/menu";
import myFooter from "../components/footer";

import sorryDuplicate from "../components/sorryDuplicate.vue";
import errorGraph from "../components/errorGraph.vue";
let CancelToken = Axios.CancelToken;
let source = CancelToken.source();
let cancelGraph1;
let cancelGraph2;
let cancelGraph3;
export default {
  components: {
    appBar,
    headerMenu,
    importingSelect,
    errorPage,
    globalValueChainsHeader,
    globalValueChainsMenu,
    myFooter,
    sorryDuplicate,
    errorGraph
  },
  data() {
    return {
      // NEW
      isDisableShare: true,
      isDisableTinaLink: true,
      CancelToken: "",
      source: "",
      errorGraph1: false,
      errorGraph2: false,
      errorGraph3: false,

      exportingOptions: [
        {
          label: "Argentina",
          value: "ARG",
          flag:
            "https://www.iconfinder.com/data/icons/ensign-11/512/16_Ensign_Flag_Nation_Argentina-512.png"
        },

        {
          label: "United State",
          value: "USA",
          flag:
            "https://www.iconfinder.com/data/icons/ensign-11/512/274_Ensign_Flag_Nation_states-512.png"
        }
      ],
      exportingSelected: "",
      year: "",
      importingSelected: "",
      countryOptionsShow: [],
      dataYearList: [],

      // OLD
      isShowPage: false,
      countryOptions: [],
      importingEconomy: "",

      sectorOptions: [],
      sectorSelected: "",

      continent: "",

      displayYear: "",

      exp_country: this.$q.sessionStorage.has("cselec")
        ? this.$q.sessionStorage.getItem("cselec").iso
        : "",

      displaySector: "",
      sector: "",
      sectorName: "",

      dataChart1Percent: {
        imp_cons: 0,
        imp_exp: 0,
        dom_cons: 0,
        double: 0,
        imp_cont: 0,
        final: 0
      },
      isStructureChart: false,
      isComparisonChart: false,
      isMeasuringChart: false,

      isShowErrorWarning: false
    };
  },
  methods: {
    changeYear() {
      this.$q.sessionStorage.set("year", this.year.label);
      this.displayYear = this.year.label;
      if (this.validateSelected()) this.renderGraph();
    },
    selectedExporting() {
      this.$q.sessionStorage.set("expe", this.exportingSelected.iso);

      this.continent = this.exportingSelected.region;

      if (this.validateSelected()) this.renderGraph();
    },
    selectedImporting() {
      this.$q.sessionStorage.set("impe", this.importingSelected.iso);

      if (this.validateSelected()) this.renderGraph();
    },
    selectedSector() {
      this.$q.sessionStorage.set("esec", this.sectorSelected);
      if (this.validateSelected()) this.renderGraph();
    },

    validateSelected() {
      this.isDisableTinaLink = true;
      this.isDisableShare = true;
      this.errorGraph1 = false;
      this.errorGraph2 = false;
      this.errorGraph3 = false;
      if (
        this.sectorSelected &&
        this.year &&
        this.exportingSelected &&
        this.importingSelected
      ) {
        if (this.exportAvailable.includes(this.exportingSelected.iso)) {
          this.isDisableTinaLink = false;
        }

        this.isDisableShare = false;

        return true;
      } else {
        return false;
      }
    },

    // Render Graph
    renderGraph() {
      // this.source.cancel("Operation canceled by the user.");
      this.sectorName = this.sectorOptions.filter(
        x => x.value == this.sectorSelected
      );
      this.sectorName = this.sectorName[0].label

        .slice(this.sectorName[0].label.indexOf(" "))
        .trim()
        .toLowerCase();
      if (this.sectorSelected == 0) {
        this.sectorName = "all sectors";
      }
      // console.log(this.sectorName[0].label.indexOf(" "));
      this.setStackChart();
      this.setStackChart2();
      this.setStackChart3();
      let link =
        "https://riva.negotiatetrade.org/#/structure-of-value-added" +
        "/" +
        this.exportingSelected.iso +
        "/" +
        this.displayYear +
        "/" +
        this.importingSelected.iso +
        "/" +
        this.sectorSelected;
      this.$q.sessionStorage.set("shareLink", link);
    },

    async setStackChart() {
      this.isStructureChart = false;
      let _this = this;

      let urlLink =
        this.path_api +
        `/cal_structure_1.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.displayYear}&sector=${this.sectorSelected}`;

      if (cancelGraph1 !== undefined) {
        cancelGraph1();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph1 = c;
        })
      });

      if (getData.data.text_export_to_import_country == 0) {
        this.errorGraph1 = true;
        this.isStructureChart = true;
        return;
      }

      getData = getData.data;
      console.log(getData);

      this.dataChart1Percent.final = (
        (getData.final /
          (getData.imp_cons +
            getData.imp_exp +
            getData.dom_cons +
            getData.double +
            getData.imp_cont +
            getData.final)) *
        100
      ).toFixed(2);
      this.dataChart1Percent.imp_cons = (
        (getData.imp_cons /
          (getData.imp_cons +
            getData.imp_exp +
            getData.dom_cons +
            getData.double +
            getData.imp_cont +
            getData.final)) *
        100
      ).toFixed(2);

      this.dataChart1Percent.imp_exp = (
        (getData.imp_exp /
          (getData.imp_cons +
            getData.imp_exp +
            getData.dom_cons +
            getData.double +
            getData.imp_cont +
            getData.final)) *
        100
      ).toFixed(2);

      this.dataChart1Percent.dom_cons = (
        (getData.dom_cons /
          (getData.imp_cons +
            getData.imp_exp +
            getData.dom_cons +
            getData.double +
            getData.imp_cont +
            getData.final)) *
        100
      ).toFixed(2);

      this.dataChart1Percent.double = (
        (getData.double /
          (getData.imp_cons +
            getData.imp_exp +
            getData.dom_cons +
            getData.double +
            getData.imp_cont +
            getData.final)) *
        100
      ).toFixed(2);

      this.dataChart1Percent.imp_cont = (
        (getData.imp_cont /
          (getData.imp_cons +
            getData.imp_exp +
            getData.dom_cons +
            getData.double +
            getData.imp_cont +
            getData.final)) *
        100
      ).toFixed(2);

      this.isStructureChart = true;

      Highcharts.chart("container", {
        chart: {
          height: (9 / 16) * 100 + "%", // 16:9 ratio
          style: { fontFamily: "roboto" }
        },
        series: [
          {
            dataLabels: {
              enabled: true,
              formatter: function() {
                console.log(getData);
                let total =
                  getData.imp_cons +
                  getData.final +
                  getData.imp_exp +
                  getData.dom_cons +
                  getData.double;
                if (this.point.options.name.includes("Intermediate")) {
                  if ((getData.imp_cons / total) * 100 > 1) {
                    return this.point.options.name;
                  } else {
                    return "";
                  }
                } else if (
                  this.point.options.name.includes("Final domestic production")
                ) {
                  if ((getData.final / total) * 100 > 1) {
                    return this.point.options.name;
                  } else {
                    return "";
                  }
                } else if (
                  this.point.options.name.includes("Domestic production used")
                ) {
                  if ((getData.imp_exp / total) * 100 > 1) {
                    return this.point.options.name;
                  } else {
                    return "";
                  }
                } else if (
                  this.point.options.name.includes(
                    "Domestic production that returns"
                  )
                ) {
                  if ((getData.dom_cons / total) * 100 > 1) {
                    return this.point.options.name;
                  } else {
                    return "";
                  }
                } else if (this.point.options.name.includes("Double counted")) {
                  if ((getData.double / total) * 100 > 1) {
                    return this.point.options.name;
                  } else {
                    return "";
                  }
                } else if (
                  this.point.options.name.includes(
                    "Foreign production consumed"
                  )
                ) {
                  if ((getData.imp_cont / total) * 100 > 1) {
                    return this.point.options.name;
                  } else {
                    return "";
                  }
                }
              },
              style: {
                fontSize: "12px"
              }
            },
            type: "treemap",
            layoutAlgorithm: "strip",
            data: [
              {
                name: `Intermediate domestic production <br>consumed by the importer (${this.dataChart1Percent.imp_cons}%)`,
                value: getData.imp_cons,
                color: "#37C9D2",
                label: `Intermediate output produced in <br>${this.exportingSelected.label} -  consumed in <br> ${this.importingSelected.label}`
              },
              {
                name: `Final domestic production <br>consumed by the importer (${this.dataChart1Percent.final}%)`,
                value: getData.final,
                color: "#2381B8",
                label: `Final output produced in ${this.exportingSelected.label} - <br> consumed in ${this.importingSelected.label}`
              },
              {
                name: `Domestic production used in <br>the importer's exports (${this.dataChart1Percent.imp_exp}%)`,
                value: getData.imp_exp,
                color: "#EB1E63",
                label: `Produced in ${this.exportingSelected.label} - used in <br> ${this.importingSelected.label}'s exports`
              },
              {
                name: `Domestic production that returns <br>via the importer's exports (${this.dataChart1Percent.dom_cons}%)`,
                value: getData.dom_cons,
                color: "#F99704",
                label: `Produced in ${this.exportingSelected.label} - used in <br> ${this.importingSelected.label}’s exports consumed in <br>${this.exportingSelected.label}`
              },
              {
                name: `Double counted (${this.dataChart1Percent.double}%)`,
                value: getData.double,
                color: "#9C26B3",
                label:
                  "Double counted exports from <br>repeated border crossings"
              },
              {
                name: `Foreign production consumed by <br>the importer (${this.dataChart1Percent.imp_cont}%)`,
                value: getData.imp_cont,
                color: "#2D9687",
                label: `Produced abroad (used in <br>${this.exportingSelected.label}'s exports) - consumed in <br>${this.importingSelected.label}`
              }
            ],
            showInLegend: true,
            legendType: "point"
          }
        ],
        legend: {
          useHTML: true,
          itemStyle: {
            fontSize: "14px",
            fontWeight: "medium",
            fontFamily: "roboto",
            color: "#00000"
          },

          align: "right",
          verticalAlign: "middle",
          width: 350,
          itemMarginTop: 20,
          symbolWidth: 50,
          symbolHeight: 15,
          symbolRadius: 0,

          labelFormatter: function() {
            return this.label;
          }
        },
        title: {
          style: {
            fontSize: "24px"
          },
          text:
            "How are " +
            this.exportingSelected.label +
            "'s exports of " +
            this.sectorName +
            " to " +
            this.importingSelected.label +
            " produced and utilised?"
        },
        subtitle: {
          text: `${this.exportingSelected.label}'s gross exports to ${
            this.importingSelected.label
          }: $${
            getData.text_export_to_import_country > 1000
              ? (getData.text_export_to_import_country / 1000).toFixed(2) +
                " billion"
              : getData.text_export_to_import_country + " million"
          } / ${this.exportingSelected.label}'s gross exports to World: $${
            getData.text_export_to_world > 1000
              ? (getData.text_export_to_world / 1000).toFixed(2) + " billion"
              : getData.text_export_to_world + " million"
          }`,
          align: "left"
        },
        credits: {
          enabled: false
        },
        tooltip: {
          useHTML: true,
          pointFormatter: function() {
            if (this.name.includes("Intermediate domestic")) {
              return `<div class='text-weight-bold'>Intermediate output produced in ${
                _this.exportingSelected.label
              } - consumed in ${
                _this.importingSelected.label
              }</div><div>Share: ${
                _this.dataChart1Percent.imp_cons
              }%</div><div>Value: $${
                this.value >= 1000
                  ? (this.value / 1000).toFixed(2) + " billion"
                  : this.value + " million"
              } </div>`;
            } else if (this.name.includes("Final domestic")) {
              return `<div class='text-weight-bold'>Final output produced in ${
                _this.exportingSelected.label
              } - consumed in ${
                _this.importingSelected.label
              }</div><div>Share: ${
                _this.dataChart1Percent.final
              }%</div><div>Value: $${
                this.value >= 1000
                  ? (this.value / 1000).toFixed(2) + " billion"
                  : this.value + " million"
              } </div>`;
            } else if (this.name.includes("Domestic production used")) {
              return `<div class='text-weight-bold'>Produced in ${
                _this.exportingSelected.label
              } - used in ${
                _this.importingSelected.label
              }'s exports</div><div>Share: ${
                _this.dataChart1Percent.imp_exp
              }%</div><div>Value: $${
                this.value >= 1000
                  ? (this.value / 1000).toFixed(2) + " billion"
                  : this.value + " million"
              } </div>`;
            } else if (this.name.includes("Domestic production that")) {
              return `<div class='text-weight-bold'>Produced in ${
                _this.exportingSelected.label
              } - used in  ${
                _this.importingSelected.label
              } exports consumed in ${
                _this.exportingSelected.label
              }</div><div>Share: ${
                _this.dataChart1Percent.dom_cons
              }%</div><div>Value: $${
                this.value >= 1000
                  ? (this.value / 1000).toFixed(2) + " billion"
                  : this.value + " million"
              } </div>`;
            } else if (this.name.includes("Double counted")) {
              return `<div class='text-weight-bold'>Double counted exports from repeated border crossing</div><div>Share: ${
                _this.dataChart1Percent.double
              }%</div><div>Value: $${
                this.value >= 1000
                  ? (this.value / 1000).toFixed(2) + " billion"
                  : this.value + " million"
              }</div>`;
            } else {
              return `<div class='text-weight-bold'>Produced abroad (used in ${
                _this.exportingSelected.label
              }'s exports) - consumed in ${
                _this.importingSelected.label
              }</div><div>Share: ${
                _this.dataChart1Percent.imp_cont
              }%</div><div>Value: $${
                this.value >= 1000
                  ? (this.value / 1000).toFixed(2) + " billion"
                  : this.value + " million"
              } </div>`;
            }
          }
        },

        exporting: {
          useHTML: true,
          allowHTML: true,
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
              useHTML: true,
              itemStyle: {
                fontSize: "6px",
                fontWeight: "medium",
                fontFamily: "roboto",
                color: "#00000"
              },

              align: "right",
              verticalAlign: "middle",
              layout: "vertical",
              width: 150,
              itemMarginTop: 5,
              symbolWidth: 0.1,
              symbolHeight: 0.1,
              symbolRadius: 0,

              // <div style="width:10px;height:10px;background-color:${this.color};display:inline-block"></div>
              // <div style='white-space:nowrap;display:inline-block'>
              // ${this.label}
              // </div>

              labelFormatter: function() {
                return `

             <table>
              <tr>
                <td><div style="width:10px;height:10px;background-color:${this.color};display:inline-block"></div></td>
                <td style='font-size:6px; vertical-align: top;'><span style="white-space:nowrap">${this.label}</span></td>
              </tr>
             </table>


                `;
              }
            },
            title: {
              style: { fontSize: "12px" }
            },
            subtitle: {
              style: { fontSize: "8px" }
            },
            series: [
              {
                dataLabels: {
                  style: { fontSize: "6px" }
                }
              }
            ]
          }
        }
      });
    },

    async setStackChart2() {
      this.isComparisonChart = false;

      let urlLink =
        this.path_api +
        `/cal_structure_2.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.displayYear}&sector=${this.sectorSelected}`;

      if (cancelGraph2 !== undefined) {
        cancelGraph2();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph2 = c;
        })
      });

      if (getData.data.show == "off") {
        this.errorGraph2 = true;
        this.isComparisonChart = true;
        return;
      }

      getData = getData.data;

      let country = [];
      let imp_cons = [];
      let imp_exp = [];
      let imp_cont = [];
      let dom_cons = [];
      let double = [];
      let final = [];
      country = getData.map(x => x.imp_country);

      getData.map(x => {
        country.push(x.imp_country.precent);
        // imp_cons.push(x.imp_cons.precent);
        final.push({
          value: x.final.value,
          y: x.final.precent
        });

        imp_cons.push({
          value: x.imp_cons.value,
          y: x.imp_cons.precent
        });

        // imp_exp.push(x.imp_exp.precent);

        imp_exp.push({
          value: x.imp_exp.value,
          y: x.imp_exp.precent
        });

        // imp_cont.push(x.imp_cont.precent);
        imp_cont.push({
          value: x.imp_cont.value,
          y: x.imp_cont.precent
        });
        // dom_cons.push(x.dom_cons.precent);
        dom_cons.push({
          value: x.dom_cons.value,
          y: x.dom_cons.precent
        });

        // double.push(x.double.precent);
        double.push({
          value: x.double.value,
          y: x.double.precent
        });
      });
      // console.log(country);
      this.isComparisonChart = true;

      let ctext = "";
      if (this.continent.length > 0) {
        ctext = this.continent;
      } else {
        ctext = this.exportingSelected.label;
      }

      Highcharts.chart("container1", {
        chart: {
          type: "column",
          height: (9 / 16) * 100 + "%" // 16:9 ratio
        },
        title: {
          style: {
            fontSize: "24px",
            fontFamily: "roboto"
          },
          text: `How are ${ctext} economies’ exports of ${this.sectorName} to ${this.importingSelected.label} produced and utilised?`
        },
        xAxis: {
          labels: {
            rotation: -90,
            style: {
              fontSize: "14px"
            }
          },

          categories: country
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: `% of gross exports to ${this.importingSelected.label}`,
            style: {
              fontSize: "14px"
            }
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
        legend: {
          useHTML: true,
          itemStyle: {
            fontSize: "14px",
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
          useHTML: true,
          headerFormat: "<b>{point.x}</b><br/>",

          // pointFormat: "<div>{series.name}</div><div>Share: {point.y}%</div><div>Value: " + this + "</div>",

          pointFormatter: function() {
            return (
              // "<div> <span class=''>" + this.series.name + "</span>" +
              // "<br>" +
              // "Share: $" +
              // this.y +
              // "%" +
              // "</div>"

              `<div>
                <span>
                  ${this.series.name}
                </span>
                <br>
                Share : ${this.y}%
                <br>
                Value : $${
                  this.options.value >= 1000
                    ? (this.options.value / 1000).toFixed(2) + " billion"
                    : this.options.value + " million"
                }
              </div>`
            );
          }
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
            name: `Intermediate domestic production<br> consumed by the importer`,
            data: imp_cons,
            color: "#37C9D2"
          },
          {
            name: `Final domestic production<br> consumed by the importer`,
            data: final,
            color: "#2381B8"
          },
          {
            name: `Domestic production used in<br> the importer's exports`,
            data: imp_exp,
            color: "#EB1E63"
          },
          {
            name: `Domestic production that returns <br> via the importer's exports`,
            data: dom_cons,
            color: "#f99704"
          },
          {
            name: "Double counted exports from <br>repeated border crossings",
            data: double,
            color: "#9C26B3"
          },
          {
            name: `Foreign production consumed <br> by the importer`,
            data: imp_cont,
            color: "#2D9687"
          }
        ],
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
              width: 120,
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
            // yAxis: [
            //   {
            //     title: {
            //       text: `% of gross exports to ${this.importingSelected.label}`,
            //       style: {
            //         fontSize: "16px"
            //       }
            //     }
            //   }
            // ],
            xAxis: [
              {
                categories: country,
                labels: {
                  rotation: -90,
                  style: { fontSize: "6px" }
                }
              }
            ]
          }
        }
      });
    },
    async setStackChart3() {
      this.isMeasuringChart = false;

      let urlLink =
        this.path_api +
        `/cal_structure_3.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.displayYear}&sector=${this.sectorSelected}`;

      if (cancelGraph3 !== undefined) {
        cancelGraph3();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph3 = c;
        })
      });

      getData = getData.data;

      if (getData.show == "off") {
        this.errorGraph3 = true;
        this.isMeasuringChart = true;
        return;
      }

      this.isMeasuringChart = true;

      Highcharts.chart("container2", {
        legend: {
          useHTML: true,
          itemStyle: {
            fontSize: "14px",
            fontWeight: "medium",
            fontFamily: "roboto",
            color: "#00000"
          },
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
          itemDistance: 10,
          width: 300,
          itemMarginTop: 25,
          symbolHeight: 15,
          symbolWidth: 50,
          symbolRadius: 0
        },
        chart: {
          type: "column",
          height: (9 / 16) * 100 + "%" // 16:9 ratio
        },

        title: {
          style: {
            fontSize: "24px",
            fontFamily: "roboto"
          },
          text: `How does ${this.exportingSelected.label}'s gross and value-added trade balance in ${this.sectorName} with ${this.importingSelected.label} differ?`
        },
        xAxis: {
          categories: ["", ""]
        },
        yAxis: {
          title: {
            text: `% of gross exports to ${this.importingSelected.label}`,
            style: {
              fontSize: "14px"
            }
          },
          style: { fontSize: "12px" }
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: "Value-added trade balance",
            data: [getData.blue],
            color: "#2381B8"
          },
          {
            name: "Gross trade balance",
            data: [getData.red],
            color: "#EB1E63"
          }
        ],
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
              width: 120,
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
                  text: `% of gross exports to ${this.importingSelected.label}`,
                  style: { fontSize: "6px" }
                }
              }
            ]
          }
        },
        tooltip: {
          useHTML: true,
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat:
            "<div class='text-weight-bold'>{series.name}</div><div> Value : {point.y}%</div>"
        }
      });
    },

    filterCountry(val, update) {
      update(async () => {
        this.countryOptionsShow = this.countryOptions.filter(
          x => x.label.indexOf(val) > -1
        );
      });
    },

    async getYear() {
      let url = this.path_api + "/get_year_active.php";
      let data = await Axios.get(url);
      let temp = [];
      data.data.forEach(element => {
        temp.push({ index: Number(element), label: element });
      });
      this.dataYearList = temp;
    }
  },
  async mounted() {
    this.$q.sessionStorage.remove("shareLink");
    await this.getSectorList();
    await this.getYear();
    this.getCountryList();

    if (this.$q.sessionStorage.has("year") || this.$route.params.year) {
      this.year = this.$route.params.year
        ? this.$route.params.year
        : this.$q.sessionStorage.getItem("year");

      this.displayYear = this.$route.params.year
        ? this.$route.params.year
        : this.$q.sessionStorage.getItem("year");
    }
    if (this.year == "") {
      this.year = 2017;
      this.displayYear = 2017;
    }

    // Check Session and Params Exporting
    if (this.$q.sessionStorage.has("expe") || this.$route.params.expe) {
      this.exportingSelected = this.$route.params.expe
        ? this.countryOptions.filter(x => x.iso == this.$route.params.expe)[0]
        : this.countryOptions.filter(
            x => x.iso == this.$q.sessionStorage.getItem("expe")
          )[0];
      this.countryOptionsShow = this.countryOptions;
      this.continent = this.exportingSelected.region;
      this.exportingSelected.label;
    }

    if (this.$q.sessionStorage.has("impe") || this.$route.params.impe) {
      this.importingSelected = this.$route.params.impe
        ? this.countryOptions.filter(x => x.iso == this.$route.params.impe)[0]
        : this.countryOptions.filter(
            x => x.iso == this.$q.sessionStorage.getItem("impe")
          )[0];
      this.countryOptionsShow = this.countryOptions;
    }

    if (this.$q.sessionStorage.has("esec") || this.$route.params.sector) {
      this.sectorSelected = this.$route.params.sector
        ? this.$route.params.sector
        : this.$q.sessionStorage.getItem("esec");
    } else {
      this.sectorSelected = "0";
    }

    if (this.validateSelected()) {
      this.renderGraph();
    }
  },
  computed: {
    checkDuplicateSelected() {
      if (
        Number(this.exportingSelected.value) > 74 ||
        Number(this.importingSelected.value) > 74
      ) {
        return false;
      }
      return this.exportingSelected.iso == this.importingSelected.iso;
    }
  },
  beforeDestroy() {
    if (cancelGraph1 != undefined) cancelGraph1();

    if (cancelGraph2 != undefined) cancelGraph2();
    if (cancelGraph3 != undefined) cancelGraph3();
  }
};
</script>

<style>
.divLeft {
  /* height: 300px; */
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px 0px;
}
.divRight {
  margin-left: 20px;
  width: 750px;
}
.bracketLeft {
  margin-left: -270px;
  width: 400px;
  height: 10px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.bracketRight {
  margin-top: 15px;
  margin-left: 300px;
  width: 400px;
  height: 10px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.textLeft {
  margin-top: 20px;
  margin-left: -470px;
  width: 200px;
  text-align: center;
}
.textRight {
  margin-top: -50px;
  margin-left: 400px;
  width: 200px;
  text-align: center;
}
</style>
