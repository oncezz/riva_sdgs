<template>
  <div>
    <q-page>
      <global-value-chains-header
        :isShowTinaLink="true"
        :isDisableShare="isDisableShare"
        :isDisableTina="isDisableTinaLink"
      ></global-value-chains-header>

      <global-value-chains-menu :activeMenu="3"></global-value-chains-menu>

      <!-- DROPDOWN SELECTION -->
      <div class="bg12" style="height: 290px">
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
                <template
                  v-slot:prepend
                  v-if="
                    exportingSelected.code && exportingSelected.code != 'TW'
                  "
                >
                  <gb-flag :code="exportingSelected.code" size="small" />
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
                      <q-item-label caption>{{
                        scope.opt.description
                      }}</q-item-label>
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
                <template
                  v-slot:prepend
                  v-if="
                    exportingSelected.code && exportingSelected.code != 'TW'
                  "
                >
                  <gb-flag :code="exportingSelected.code" size="small" />
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
                        {{
                        scope.opt.description
                        }}
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
          <div class="col-3 q-px-md" v-if="activeSelect == 1">
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
          <div class="col-3 q-px-md" v-else>
            <div>Source economy</div>
            <q-select
              bg-color="white"
              v-model="sourceEconomySelected"
              :options="countryOptionsShow"
              outlined
              class="q-mt-xs"
              dense
              use-input
              fill-input
              hide-selected
              @filter="filterCountry"
              @input="selectedSourceEconomy()"
            >
              <template v-slot:prepend v-if="sourceEconomySelected.code">
                <gb-flag
                  v-if="
                    sourceEconomySelected.code &&
                      sourceEconomySelected.code != 'TW'
                  "
                  :code="sourceEconomySelected.code"
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
            </q-select>
          </div>
        </div>

        <div class="q-pt-md row justify-center">
          <div class="col-3 q-px-md" align="center">
            <q-btn
              no-caps
              style="background-color: #2c2f30"
              class="fit font-20"
              :class="activeSelect == 1 ? 'text-yellow' : 'text-white'"
              @click="selectMenu(1)"
            >
              Select by exporting
              <br />sector
            </q-btn>
          </div>
          <div class="col-3 q-px-md">
            <q-btn
              :class="activeSelect == 2 ? 'text-yellow' : 'text-white'"
              no-caps
              style="background-color: #2c2f30"
              class="text-white fit font-20"
              @click="selectMenu(2)"
            >
              Select by source
              <br />economy
            </q-btn>
          </div>
        </div>
      </div>
      <!--  -->

      <sorry-duplicate
        v-show="
          exportingSelected.label == importingSelected.label &&
            exportingSelected.label != null &&
            Number(exportingSelected.index) < 75 &&
            Number(importingSelected.index) < 75
        "
      ></sorry-duplicate>
      <div
        v-show="
          (isWaiting && exportingSelected.label != importingSelected.label) ||
            exportingSelected.label == null ||
            importingSelected.label == null
        "
      >
        {{ importingSelected.index }} {{ exportingSelected.index }}
        <!-- <data-waiting
          :text="
            activeSelect == 1
              ? 'Please choose exporting economy, importing economy, exporting sector and year from the drop down menus above'
              : 'Please choose exporting economy, importing economy, source economy and year from the drop down menus above'
          "
        ></data-waiting>-->
        <div class="row">
          <div class="col-6">
            <div class="font-content q-pt-md" align="center">
              <b>Key policy questions (select by exporting sector)</b>
            </div>
            <div>
              <ul>
                <li>
                  Where does
                  {{
                    exportingSelected.label != null
                      ? exportingSelected.label
                      : "an economy"
                  }}'s imported content used in its exports come from?
                </li>
                <li>
                  How does this compare across economies in the same region?
                </li>
              </ul>
            </div>
          </div>
          <div class="col-6">
            <div class="font-content q-pt-md" align="center">
              <b>Key policy questions (select by source economy)</b>
            </div>
            <div>
              <ul>
                <li>
                  How is foreign value-added distributed across
                  {{
                    exportingSelected.label != null
                      ? exportingSelected.label
                      : "an economy"
                  }}'s exporting sectors?
                </li>
                <li>
                  How does this compare across economies in the same region?
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-3 full-height">
            <q-img class="fit" src="../../public/images/bl.jpg"></q-img>
          </div>
          <div class="col" style="background-color: #e5e1e1; padding: 80px 0px">
            <p align="center" class="font-24">
              Where does imported content come from?
            </p>
            <div align="center" class="q-px-lg">
              <p align="center">
                Some part of
                {{
                  exportingSelected.label == null
                    ? "an economy"
                    : exportingSelected.label
                }}’s gross exports consist of imported inputs that originate in
                other source economies.
              </p>

              <div class="row justify-around q-pt-md" style="max-width: 750px">
                <div>
                  Source economy
                  <div v-if="activeSelect == 2">
                    {{ sourceEconomySelected.label }}
                  </div>
                </div>

                <div>
                  <q-img
                    style="width: 60px"
                    src="../../public/arrow-right.png"
                  ></q-img>
                </div>
                <div>
                  Exporting economy
                  <div>{{ exportingSelected.label }}</div>
                </div>
                <div>:</div>
                <div>
                  Exporting sector
                  <div v-if="activeSelect == 1">{{ displaySector }}</div>
                  <div v-else>All</div>
                </div>
                <div>
                  <q-img
                    style="width: 60px"
                    src="../../public/arrow-right.png"
                  ></q-img>
                </div>
                <div>
                  Importing economy
                  <div>{{ importingSelected.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="font-graph q-py-lg" align="center">
          Please choose exporting economy, importing economy, exporting sector
          and year from the drop down menus above
        </div>
      </div>

      <div
        v-if="
          (!isWaiting && exportingSelected.label != importingSelected.label) ||
            Number(importingSelected.index) > 74 ||
            Number(importingSelected.index) > 74
        "
      >
        <div class="row">
          <div class="col-6">
            <div class="font-content q-pt-md" align="center">
              <b>Key policy questions (select by exporting sector)</b>
            </div>
            <div>
              <ul>
                <li>
                  Where does
                  {{
                    exportingSelected.label != null
                      ? exportingSelected.label
                      : "an economy"
                  }}'s imported content used in its exports come from?
                </li>
                <li>
                  How does this compare across economies in the same region?
                </li>
              </ul>
            </div>
          </div>
          <div class="col-6">
            <div class="font-content q-pt-md" align="center">
              <b>Key policy questions (select by source economy)</b>
            </div>
            <div>
              <ul>
                <li>
                  How is foreign value-added distributed across
                  {{
                    exportingSelected.label != null
                      ? exportingSelected.label
                      : "an economy"
                  }}'s exporting sectors?
                </li>
                <li>
                  How does this compare across economies in the same region?
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-3 full-height">
            <q-img class="fit" src="../../public/images/bl.jpg"></q-img>
          </div>
          <div class="col" style="background-color: #e5e1e1; padding: 80px 0px">
            <p align="center" class="font-24">
              Where does imported content come from?
            </p>
            <div align="center" class="q-px-lg">
              <p align="center">
                Some part of {{ exportingSelected.label }}’s gross exports
                consist of imported inputs that originate in other source
                economies.
              </p>

              <div class="row justify-around q-pt-md" style="max-width: 750px">
                <div>
                  Source economy
                  <div v-if="activeSelect == 2">
                    {{ sourceEconomySelected.label }}
                  </div>
                </div>

                <div>
                  <q-img
                    style="width: 60px"
                    src="../../public/arrow-right.png"
                  ></q-img>
                </div>
                <div>
                  Exporting economy
                  <div>{{ exportingSelected.label }}</div>
                </div>
                <div>:</div>
                <div>
                  Exporting sector
                  <div v-if="activeSelect == 1">{{ displaySector }}</div>
                  <div v-else>All</div>
                </div>
                <div>
                  <q-img
                    style="width: 60px"
                    src="../../public/arrow-right.png"
                  ></q-img>
                </div>
                <div>
                  Importing economy
                  <div>{{ importingSelected.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white" v-show="activeSelect == 1">
          <!-- GRAPH -->
          <div style="height: 30px"></div>
          <div
            style="width: 90%; margin: auto; max-width: 1200px"
            id="importedcountry"
          >
            <div align="center" class="q-pa-lg" v-if="!isChart">
              <q-spinner-pie color="primary" size="100px" />
            </div>
            <div
              v-show="
                isChart &&
                  !errorGraph1 &&
                  !errorGraph2 &&
                  !errorChart2 &&
                  !errorChart3
              "
            >
              <div class="row">
                <div id="container" style="width:80%"></div>
                <div style="padding-top: 170px;">
                  <div style="padding-left:30px;">
                    <div class="row">
                      <div
                        style="width:15px; height:15px; background-color:#2381B8"
                      ></div>
                      <div style="padding-left:15px;">Asia-Pacific</div>
                    </div>
                    <div class="row q-pt-lg">
                      <div
                        style="width:15px; height:15px; background-color:#EB1E63"
                      ></div>
                      <div style="padding-left:15px;">Europe</div>
                    </div>
                    <div class="row q-pt-lg">
                      <div
                        style="width:15px; height:15px; background-color:#F99704"
                      ></div>
                      <div style="padding-left:15px;">North America</div>
                    </div>
                    <div class="row q-pt-lg">
                      <div
                        style="width:15px; height:15px; background-color:#2D9687"
                      ></div>
                      <div style="padding-left:15px;">Latin America</div>
                    </div>
                    <div class="row q-pt-lg">
                      <div
                        style="width:15px; height:15px; background-color:#9C26B3"
                      ></div>
                      <div style="padding-left:15px;">Rest of the world</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <error-graph
              :content="
                `Where does ${exportingSelected.label} imported content in exports to ${importingSelected.label} come from?`
              "
              v-if="
                isChart &&
                  (errorGraph1 || errorGraph2 || errorChart2 || errorChart3)
              "
            ></error-graph>
          </div>
          <div style="height: 30px"></div>
          <div
            style="width: 90%; margin: auto; max-width: 1200px"
            id="importedregion"
          >
            <div align="center" class="q-pa-lg" v-if="!isChart1">
              <q-spinner-pie color="primary" size="100px" />
            </div>
            <div
              v-show="
                isChart1 &&
                  !errorGraph2 &&
                  !errorGraph1 &&
                  !errorChart2 &&
                  !errorChart3
              "
            >
              <div id="container1"></div>
            </div>

            <div
              v-if="
                isChart1 &&
                  (errorGraph2 || errorGraph1 || errorChart2 || errorChart3)
              "
            >
              <error-graph
                :content="
                  `Where do ${continent} economies' imported content in exports to ${importingSelected.label} come from?`
                "
              ></error-graph>
            </div>
          </div>
        </div>

        <!-- SELECT BY SOURCE ECONOMY -->
        <div v-show="activeSelect == 2" class="bg-white">
          <!-- GRAPH2 in select by source economy  -->
          <div id="importedregion2" style="height: 30px"></div>
          <div style="width: 90%; margin: auto; max-width: 1200px">
            <div align="center" class="q-pa-lg" v-if="!isChart2">
              <q-spinner-pie color="primary" size="100px" />
            </div>
            <div
              v-show="
                isChart2 &&
                  !errorChart2 &&
                  !errorGraph1 &&
                  !errorGraph2 &&
                  !errorChart3
              "
            >
              <div id="container3"></div>
            </div>

            <error-graph
              v-if="
                isChart2 &&
                  (errorChart2 || errorGraph1 || errorGraph2 || errorChart3)
              "
            ></error-graph>
          </div>

          <!-- GRAPH1 in select by source economy  -->
          <div id="importedcountry1" style="height: 30px"></div>
          <div style="width: 90%; margin: auto; max-width: 1200px">
            <div align="center" class="q-pa-lg" v-if="!isChart3">
              <q-spinner-pie color="primary" size="100px" />
            </div>
            <div
              v-show="
                isChart3 &&
                  !errorChart3 &&
                  !errorChart2 &&
                  !errorGraph1 &&
                  !errorGraph2
              "
            >
              <div id="container2"></div>
            </div>

            <error-graph
              v-if="
                isChart3 &&
                  (errorChart3 || errorChart2 || errorGraph1 || errorGraph2)
              "
              :content="
                `Which sectors in ${exportingSelected.label} rely the most on imported from ${sourceEconomySelected.label} in exports to ${importingSelected.label}?`
              "
            ></error-graph>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <my-footer></my-footer>
    </q-page>
  </div>
</template>

<script>
// new
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import globalValueChainsMenu from "../components/menu";
import myFooter from "../components/footer";
import errorGraph from "../components/errorGraph.vue";
import dataWaiting from "../components/dataWaiting.vue";
import sorryDuplicate from "../components/sorryDuplicate.vue";
import Axios from "axios";
let CancelToken = Axios.CancelToken;
let source = CancelToken.source();
let cancelGraph1;
let cancelGraph2;
let cancelGraph3;
let cancelGraph4;
let cancelGraph5;
let cancelGraph6;
export default {
  components: {
    globalValueChainsHeader,
    globalValueChainsMenu,
    myFooter,
    errorGraph,
    dataWaiting,
    sorryDuplicate
  },
  data() {
    return {
      // NEW
      isWaiting: true,
      errorChart2: false,
      isDisableShare: true,
      isDisableTinaLink: true,
      errorGraph1: false,
      errorGraph2: false,
      errorChart3: false,
      sourceEconomySelected: "",
      displaySector: "",
      activeSelect: 1,
      dataYearList: [],
      displayYear: "",
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
      yearSelected: "",
      importingSelected: "",
      sectorSelected: "",
      sectorOptions: [],
      countryOptions: [],
      countryOptionsShow: [],
      year: "",
      isChart: false,

      isChart1: false,
      isChart2: false,
      isChart3: false,
      chart2DrillDown: [],
      chart2RawData: [],
      chart2AsiaPacific: [],
      chart2Europe: [],
      chart2LatinAmerica: [],
      chart2RestOfTheWorld: [],
      chart2NorthAmerica: [],
      continent: "",

      // set stack chart drilldown 2
      chart3RawData: [],
      countryList: [],
      agricultureData: [],
      miningData: [],
      constructionData: [],
      utilitiesData: [],
      lowtechData: [],
      drilldownData: [],
      hightechData: [],
      tradeRepairData: [],
      tourismData: [],
      transportData: [],
      ictData: [],
      propertyData: [],
      financialData: [],
      publicwData: [],
      privatewData: [],
      sectorName: ""
    };
  },
  methods: {
    selectMenu(menu) {
      this.activeSelect = menu;
      if (cancelGraph1 != undefined) cancelGraph1();
      if (cancelGraph2 != undefined) cancelGraph2();
      if (cancelGraph3 != undefined) cancelGraph3();
      if (cancelGraph4 != undefined) cancelGraph4();
      if (cancelGraph5 != undefined) cancelGraph5();
      if (cancelGraph6 != undefined) cancelGraph6();

      if (menu == 1) {
        if (this.validateSelected()) {
          this.renderGraphSector();
        }
      } else {
        this.isChart3 = false;
        this.isChart2 = false;
        if (this.validateSelected2()) {
          this.renderGraph2();
        }
      }
    },

    validateSelected() {
      this.isDisableTinaLink = true;
      this.isDisableShare = true;
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
        this.isWaiting = false;

        return true;
      } else {
        return false;
      }
    },
    validateSelected2() {
      this.isDisableTinaLink = true;
      this.isDisableShare = true;
      if (
        this.sourceEconomySelected &&
        this.year &&
        this.exportingSelected &&
        this.importingSelected
      ) {
        if (this.exportAvailable.includes(this.exportingSelected.iso)) {
          this.isDisableTinaLink = false;
        }
        this.isWaiting = false;
        this.isDisableShare = false;

        return true;
      } else {
        return false;
      }
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
    },

    changeYear() {
      this.$q.sessionStorage.set("year", this.year.label);
      this.displayYear = this.year.label;
      if (this.activeSelect == 1) {
        if (this.validateSelected()) this.renderGraphSector();
      } else {
        if (this.validateSelected2()) this.renderGraph2();
      }
    },
    selectedExporting() {
      this.$q.sessionStorage.set("expe", this.exportingSelected.iso);

      this.continent = this.exportingSelected.region;

      if (this.activeSelect == 1) {
        if (this.validateSelected()) this.renderGraphSector();
      } else {
        if (this.validateSelected2()) this.renderGraph2();
      }
    },
    selectedImporting() {
      this.$q.sessionStorage.set("impe", this.importingSelected.iso);

      if (this.activeSelect == 1) {
        if (this.validateSelected()) this.renderGraphSector();
      } else {
        if (this.validateSelected2()) this.renderGraph2();
      }
    },
    selectedSector() {
      this.$q.sessionStorage.set("esec", this.sectorSelected);
      this.displaySector = this.sectorOptions.filter(
        x => x.value == this.sectorSelected
      )[0].label;
      if (this.activeSelect == 1) {
        if (this.validateSelected()) this.renderGraphSector();
      } else {
        if (this.validateSelected2()) this.renderGraph2();
      }
    },
    selectedSourceEconomy() {
      this.$q.sessionStorage.set("sourceE", this.sourceEconomySelected.iso);

      if (this.activeSelect == 1) {
        if (this.validateSelected()) this.renderGraphSector();
      } else {
        if (this.validateSelected2()) this.renderGraph2();
      }
    },

    renderGraphSector() {
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
      this.errorGraph1 = false;
      this.errorGraph2 = false;
      let link =
        "riva.negotiatetrade.org/#/backward-linkages" +
        "/" +
        this.exportingSelected.iso +
        "/" +
        this.displayYear +
        "/" +
        this.importingSelected.iso +
        "/" +
        this.sectorSelected +
        "/" +
        this.activeSelect;
      this.$q.sessionStorage.set("shareLink", link);

      this.setData();
      this.setStackChart();
    },

    async setData() {
      this.isChart = false;

      let urlLinkSub =
        this.path_api +
        `/cal_back_country_1a.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.displayYear}&sector=${this.sectorSelected}`;

      if (cancelGraph1 !== undefined) {
        cancelGraph1();
      }

      let getDataSub = await Axios.get(urlLinkSub, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph1 = c;
        })
      });

      if (getDataSub.data.ImportedContent < 1) {
        this.errorGraph1 = true;
        this.isChart = true;
        return;
      }

      let urlLink =
        this.path_api +
        `/cal_back_country_1.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.displayYear}&sector=${this.sectorSelected}`;

      if (cancelGraph2 !== undefined) {
        cancelGraph2();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph2 = c;
        })
      });

      let summaryValue = getData.data.map(x => x.value);
      summaryValue = summaryValue.filter(x => x);

      summaryValue = summaryValue.reduce((a, b) => a + b, 0);

      getData.data.forEach((element, index) => {
        if (index >= 5) {
          element.name = `${element.name}(${(
            (element.value / summaryValue) *
            100
          ).toFixed(2)}%) `;

          element.percent = ((element.value / summaryValue) * 100).toFixed(2);
        }
      });

      getDataSub = getDataSub.data;

      let temp = [...getData.data];

      temp = temp.splice(5);

      temp.sort((a, b) => {
        return b.value - a.value;
      });

      let getValue = temp.map(x => {
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
            sum: ((x.value / sumOfValue) * 100).toFixed(2)
          };

          graphOneDetailsList.push(newData);
        }
      });

      this.isChart = true;

      let subtitle = "";

      // console.log(getDataSub);

      let grossExportMoneyUnitMain =
        getDataSub.grossExport < 1000 ? " million" : " billion";

      let ImportedContentUnitMain =
        getDataSub.ImportedContent < 1000 ? " million" : " billion";

      let grossExportMoneyUnitSub = getDataSub.grossExport < 1000 ? " M" : " B";

      let ImportedContentUnitSub =
        getDataSub.ImportedContent < 1000 ? " M" : " B";

      let grossExportMoney =
        getDataSub.grossExport < 1000
          ? getDataSub.grossExport
          : (getDataSub.grossExport / 1000).toFixed(2);

      let ImportedContent =
        getDataSub.ImportedContent < 1000
          ? getDataSub.ImportedContent
          : (getDataSub.ImportedContent / 1000).toFixed(2);

      Highcharts.chart("container", {
        chart: {
          height: (9 / 12) * 100 + "%", // 16:9 ratio
          style: { fontFamily: "roboto" }
        },

        series: [
          {
            legendType: "point",
            type: "treemap",
            layoutAlgorithm: "squarified",
            alternateStartingDirection: true,

            levels: [
              {
                level: 1,
                dataLabels: {
                  enabled: false,
                  align: "left",
                  verticalAlign: "top",
                  style: {
                    fontSize: "15px",
                    fontWeight: "bold"
                  }
                }
              }
            ],

            data: getData.data,

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
          width: "200",
          // symbolPadding: 200,
          symbolWidth: 0.1,
          symbolHeight: 0.1,
          symbolRadius: 0,
          useHTML: true,
          symbolWidth: 0,
          labelFormatter: function() {
            if (this.name == "Europe") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 15px;height: 15px;background-color: #eb1e63;"></div></td><td style="padding-left:20px;">Europe</td></tr></table></div>';
            } else if (this.name == "Latin America") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 15px;height: 15px;background-color: #2D9687;"></div></td><td style="padding-left:20px;">Latin America</td></tr></table></div>';
            } else if (this.name == "North America") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 15px;height: 15px;background-color: #F99704;"></div></td><td style="padding-left:20px;">North America</td></tr></table></div>';
            } else if (this.name == "Asia-Pacific") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 15px;height: 15px;background-color: #2381B8;"></div></td><td style="padding-left:20px;">Asia-Pacific</td></tr></table></div>';
            } else if (this.name == "Rest of the world") {
              return '<div style="padding-bottom:15px;"><table><tr><td><div style="width: 15px;height: 15px;background-color: #9C26B3;"></div></td><td style="padding-left:20px;">Rest of the world</td></tr></table></div>';
            } else {
              return this.name;
            }
          }
        },
        plotOptions: {
          treemap: {
            dataLabels: {
              enabled: true
            }
          },
          series: {
            dataLabels: {
              enabled: false
            }
          }
        },

        title: {
          style: {
            fontSize: "24px"
          },
          text: `Where does ${this.exportingSelected.label}'s imported content in exports of ${this.sectorName} to ${this.importingSelected.label} come from?`
        },
        credits: {
          enabled: false
        },
        subtitle: {
          useHTML: true,
          style: {
            fontSize: "14px"
          },
          text: `Gross exports of ${this.exportingSelected.label} in ${this.sectorName}  to ${this.importingSelected.label} amount to $${grossExportMoney} ${grossExportMoneyUnitMain} in ${this.displayYear}. Of these exports, $${ImportedContent} ${ImportedContentUnitMain} is imported content that comes from other economies, mainly ${graphOneDetailsList[0].name} , ${graphOneDetailsList[1].name} , ${graphOneDetailsList[2].name} , ${graphOneDetailsList[3].name} and ${graphOneDetailsList[4].name}. <br><br><br>${this.exportingSelected.label}'s imported content in exports to ${this.importingSelected.label}: $${ImportedContent}  ${ImportedContentUnitSub} / ${this.exportingSelected.label}'s gross exports to ${this.importingSelected.label}: $${grossExportMoney} ${grossExportMoneyUnitSub} <br> `,
          align: "left"
        },
        // exporting: this.exportingGraphOptions,
        exporting: {
          allowHTML: true,
          useHTML: true,
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
            chart: {
              events: {
                load: function() {
                  this.legend.update({
                    width: 120,
                    labelFormatter: function() {
                      if (this.name == "Europe") {
                        return '<div  style="padding-bottom:5px;width:100%;white-space: nowrap;"><table><tr><td><div style="width: 7px;height: 7px;background-color: #eb1e63;"></div></td><td style="font-size:8px;padding-left:10px;width:100%;white-space:nowrap">Europe</td></tr></table></div>';
                      } else if (this.name == "Latin America") {
                        return '<div  style="padding-bottom:5px;width:100%"><table><tr><td><div style="width: 7px;height: 7px;background-color: #2D9687;"></div></td><td style="font-size:8px;padding-left:10px;width:100%;white-space:nowrap">Latin America</td></tr></table></div>';
                      } else if (this.name == "North America") {
                        return '<div  style="padding-bottom:5px;width:100%"><table><tr><td><div style="width: 7px;height: 7px;background-color: #F99704;"></div></td><td style="font-size:8px;padding-left:10px;width:100%;white-space:nowrap">North America</td></tr></table></div>';
                      } else if (this.name == "Asia-Pacific") {
                        return '<div  style="padding-bottom:5px;width:100%"><table><tr><td><div style="width: 7px;height: 7px;background-color: #2381B8;"></div></td><td style="font-size:8px;padding-left:10px;width:100%;white-space:nowrap">Asia-Pacific</td></tr></table></div>';
                      } else if (this.name == "Rest of the world") {
                        return '<div  style="padding-bottom:5px;width:100%;"><table><tr><td><div style="width: 7px;height: 7px;background-color: #9C26B3;"></div></td><td style="font-size:8px;padding-left:10px;width:100%;white-space:nowrap">Rest of the world</td></tr></table></div>';
                      }
                    }
                  });
                }
              }
            },

            series: [
              {
                dataLabels: {
                  style: { fontSize: "6px" }
                }
              }
            ],
            title: {
              style: { fontSize: "12px" }
            },
            subtitle: {
              style: { fontSize: "8px" }
            }
          }
        },
        tooltip: {
          useHTML: true,
          formatter: function() {
            let sectorShow = this.key.substring(0, this.key.indexOf("("));
            let percentShow = this.key.substring(
              this.key.indexOf("(") + 1,
              this.key.length - 2
            );
            let tempShowText = "";
            if (this.point.value >= 1000) {
              tempShowText = (this.point.value / 1000).toFixed(2) + " billion";
            } else {
              tempShowText = this.point.value.toFixed(2) + " million";
            }

            return `<div class='text-weight-bold'>${sectorShow}</div><div>Value : $${tempShowText}</div>
            <div>Share: ${percentShow}</div>`;
          }
        }
      });
    },
    // Graph Two
    async setStackChart() {
      this.isChart1 = false;
      this.chart2DrillDown = [];
      this.chart2RawData = [];
      this.chart2AsiaPacific = [];
      this.chart2Europe = [];
      this.chart2LatinAmerica = [];
      this.chart2RestOfTheWorld = [];
      this.chart2NorthAmerica = [];
      let urlLink =
        this.path_api +
        `/cal_back_country_2.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.displayYear}&sector=${this.sectorSelected}`;

      if (cancelGraph3 !== undefined) {
        cancelGraph3();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph3 = c;
        })
      });

      if (getData.data.show == "off") {
        this.isChart1 = true;
        this.errorGraph2 = true;
        return;
      }
      getData = getData.data;

      let countryList = [];

      getData.map(x => {
        countryList.push(x[0].exp_country);
      });

      let rawData = [];
      getData.map(x => {
        let temp = x.filter(y => y.value != 0);
        rawData.push(temp);
      });
      rawData.map(x => {
        x.forEach(y => {
          this.chart2RawData.push(y);
        });
      });

      //สร้าง Drill down สำหรับ Asia pacific
      let asiaRawData = this.chart2RawData.filter(
        x => x.area == "Asia-Pacific"
      );

      countryList.forEach(x => {
        let data = asiaRawData.filter(y => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        let sumM = 0;
        data.forEach(z => {
          let temp = {
            name: z.imp_country,
            y: Number(z.value.toFixed(2)),
            value: Number(z.valueM.toFixed(2))
          };
          sum += z.value;
          sumM += z.valueM;
          dataFinal.push(temp);
        });

        let tempData = {
          type: "pie",
          id: x + " - " + "Asia Pacific",
          name: x + " <br> " + "Asia-Pacific",
          data: dataFinal
        };
        this.chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          value: Number(sumM.toFixed(2)),
          drilldown: x + " - " + "Asia Pacific"
        };
        this.chart2AsiaPacific.push(tempData);
      });

      //สร้าง Drill down สำหรับ Europe
      let europeRawData = this.chart2RawData.filter(x => x.area == "Europe");
      countryList.forEach(x => {
        let data = europeRawData.filter(y => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        let sumM = 0;
        data.forEach(z => {
          let temp = {
            name: z.imp_country,
            y: Number(z.value.toFixed(2)),
            value: Number(z.valueM.toFixed(2))
          };
          sum += z.value;
          sumM += z.valueM;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "Europe",
          name: x + " <br> " + "Europe",
          data: dataFinal
        };
        this.chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          value: Number(sumM.toFixed(2)),
          drilldown: x + " - " + "Europe"
        };
        this.chart2Europe.push(tempData);
      });

      //สร้าง Drill down สำหรับ North America
      let northAmericaRawData = this.chart2RawData.filter(
        x => x.area == "North America"
      );
      countryList.forEach(x => {
        let data = northAmericaRawData.filter(y => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        let sumM = 0;
        data.forEach(z => {
          let temp = {
            name: z.imp_country,
            y: Number(z.value.toFixed(2)),
            value: Number(z.valueM.toFixed(2))
          };
          sum += z.value;
          sumM += z.valueM;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "North America",
          name: x + " <br> " + "North America",
          data: dataFinal
        };
        this.chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          value: Number(sumM.toFixed(2)),
          drilldown: x + " - " + "North America"
        };
        this.chart2NorthAmerica.push(tempData);
      });

      //สร้าง Drill down สำหรับ Latin America
      let latinAmericaRawData = this.chart2RawData.filter(
        x => x.area == "Latin America"
      );
      countryList.forEach(x => {
        let data = latinAmericaRawData.filter(y => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        let sumM = 0;
        data.forEach(z => {
          let temp = {
            name: z.imp_country,
            y: Number(z.value.toFixed(2)),
            value: Number(z.valueM.toFixed(2))
          };
          sum += z.value;
          sumM += z.valueM;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "Latin America",
          name: x + " <br> " + "Latin America",
          data: dataFinal
        };
        this.chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          value: Number(sumM.toFixed(2)),
          drilldown: x + " - " + "Latin America"
        };
        this.chart2LatinAmerica.push(tempData);
      });

      //สร้าง Drill down สำหรับ Rest of the world
      let restRawData = this.chart2RawData.filter(
        x => x.area == "Rest of the world"
      );
      countryList.forEach(x => {
        let data = restRawData.filter(y => y.exp_country == x);
        let dataFinal = [];
        let sum = 0;
        let sumM = 0;
        data.forEach(z => {
          let temp = {
            name: z.imp_country,
            y: Number(z.value.toFixed(2)),
            value: Number(z.valueM.toFixed(2))
          };
          sum += z.value;
          sumM += z.valueM;
          dataFinal.push(temp);
        });
        let tempData = {
          type: "pie",
          id: x + " - " + "Rest of the world",
          name: x + " <br> " + "Rest of the world",
          data: dataFinal
        };
        this.chart2DrillDown.push(tempData);
        tempData = {
          name: x,
          y: Number(sum.toFixed(2)),
          value: Number(sumM.toFixed(2)),
          drilldown: x + " - " + "Rest of the world"
        };
        this.chart2RestOfTheWorld.push(tempData);
      });

      this.isChart1 = true;
      var defaultTitle = "Basic drilldown";
      var drilldownTitle = "More about ";
      var countryName = this.importingSelected.label;
      var exportName = this.exportingSelected.label;
      var continentName = this.continent;
      let ctext = "";
      if (this.continent.length > 0) {
        ctext = this.continent;
      } else {
        ctext = this.exportingSelected.label;
      }
      let sName = this.sectorName;
      var chart = Highcharts.chart(
        "container1",
        {
          chart: {
            type: "column",
            height: (9 / 16) * 100 + "%", // 16:9 ratio
            style: { fontFamily: "roboto" },
            events: {
              drilldown: function(e) {
                chart.setTitle({
                  text: `Where does ${e.point.name}'s imported content in exports of ${sName} to ${countryName} come from?`
                });
                chart.setSubtitle({
                  text: ""
                });
              },
              drillup: function(e) {
                chart.setTitle({
                  text: `Where do ${ctext} economies' imported content in exports of ${this.sectorName} to ${countryName} come from?`
                });
                chart.setSubtitle({
                  text:
                    "Click on a bar to see the individual economies associated with a region."
                });
              }
            }
          },

          xAxis: {
            labels: {
              rotation: -90
            },
            type: "category"
          },
          credits: {
            enabled: false
          },
          yAxis: {
            min: 0,
            title: {
              text: `% of gross exports to ${this.importingSelected.label}`
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
            width: 200,
            itemMarginTop: 25,
            symbolHeight: 15,
            symbolWidth: 50,
            symbolRadius: 0
          },

          tooltip: {
            formatter: function() {
              if (
                this.series.name == "Asia-Pacific" ||
                this.series.name == "Europe" ||
                this.series.name == "Latin America" ||
                this.series.name == "North America" ||
                this.series.name == "Rest of the world"
              ) {
                if (this.point.value >= 1000) {
                  let tempNumber = (this.point.value / 1000).toFixed(1);
                  return `<b>${this.point.name}</b><br>${this.series.name}<br>Value: $${tempNumber} billion<br>Share: ${this.y}%`;
                } else {
                  let tempNumber = this.point.value.toFixed(1);
                  return `<b>${this.point.name}</b><br>${this.series.name}<br>Value: $${tempNumber} million<br>Share: ${this.y}%`;
                }
              } else {
                if (this.point.value >= 1000) {
                  let tempNumber = (this.point.value / 1000).toFixed(1);
                  return `<b>${this.point.name}</b><br>Value: $${tempNumber} billion<br>Share: ${this.y}%`;
                } else {
                  let tempNumber = this.point.value.toFixed(1);
                  return `<b>${this.point.name}</b><br>Value: $${tempNumber} million<br>Share: ${this.y}%`;
                }
              }
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
              name: "Asia-Pacific",
              data: this.chart2AsiaPacific,
              color: "#2381B8"
            },
            {
              name: "Europe",
              data: this.chart2Europe,
              color: "#EB1E63"
            },
            {
              name: "North America",
              data: this.chart2NorthAmerica,
              color: "#f99704"
            },
            {
              name: "Latin America",
              data: this.chart2LatinAmerica,
              color: "#2D9687"
            },
            {
              name: "Rest of the world",
              data: this.chart2RestOfTheWorld,
              color: "#9C26B3"
            }
          ],
          drilldown: {
            activeDataLabelStyle: {
              color: "white",
              textShadow: "0 0 2px black, 0 0 2px black"
            },
            showInLegend: false,
            series: this.chart2DrillDown
          },
          title: {
            style: {
              fontSize: "24px"
            },

            text: `Where do ${ctext} economies' imported content in exports of ${this.sectorName} to ${this.importingSelected.label} come from?`
          },
          subtitle: {
            style: {
              fontSize: "16px"
            },

            text: `Click on a bar to see the individual economies associated with a region.`
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
              title: {
                style: { fontSize: "12px" }
              },
              subtitle: {
                style: { fontSize: "8px" }
              },
              legend: {
                width: 120,
                itemMarginTop: 20,
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
              yAxis: [
                {
                  title: {
                    text: `% of gross exports to ${this.importingSelected.label}`,
                    style: { fontSize: "6px" }
                  },
                  labels: {
                    style: { fontSize: "6px" }
                  }
                }
              ],
              xAxis: [
                {
                  labels: {
                    style: { fontSize: "6px" }
                  },
                  type: "category"
                }
              ]
            }
          }
        },
        (Highcharts.Tick.prototype.drillable = function() {})
      );
    },

    async setData2() {
      this.isChart2 = false;
      this.errorChart2 = false;
      let urlLink =
        this.path_api +
        `/cal_back_sector_1.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.displayYear}&source_country=${this.sourceEconomySelected.iso}`;

      if (cancelGraph4 !== undefined) {
        cancelGraph4();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph4 = c;
        })
      });

      getData = getData.data || [];

      getData.forEach(element => {
        // console.log(element.valuePrecent);
        if (element.valuePrecent) {
          element.name = element.name + "(" + element.valuePrecent + "%)";
        }
      });

      let urlLinkSub =
        this.path_api +
        `/cal_back_sector_1a.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.displayYear}&source_country=${this.sourceEconomySelected.iso}`;

      if (cancelGraph5 !== undefined) {
        cancelGraph5();
      }

      let getDataSub = await Axios.get(urlLinkSub, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph5 = c;
        })
      });

      let fromsouceConvert =
        getDataSub.data.fromsource < 1000
          ? getDataSub.data.fromsource
          : (getDataSub.data.fromsource / 1000).toFixed(2);

      let fromsouceUnitSub =
        getDataSub.data.fromsource < 1000 ? "million" : "billion";
      let fromsouceUnitMain =
        getDataSub.data.fromsource < 1000 ? "million" : "billion";
      // -------------------------------

      let exportToConvert =
        getDataSub.data.exportto < 1000
          ? getDataSub.data.exportto
          : (getDataSub.data.exportto / 1000).toFixed(2);

      let exportToUnitSub =
        getDataSub.data.exportto < 1000 ? "million" : " billion";
      let exportToUnitMain =
        getDataSub.data.exportto < 1000 ? "million" : "billion";

      if (getDataSub.data.fromsource < 1) {
        this.errorChart2 = true;
        this.isChart2 = true;
        return;
      }

      getDataSub = getDataSub.data;

      if (!getData.length) {
        this.errorChart2 = true;
      }
      let top5sector = [];
      for (let i = 14; i < getData.length; i++) {
        top5sector.push(getData[i]);
      }
      top5sector.sort((a, b) => b.value - a.value);

      Highcharts.chart("container3", {
        chart: {
          height: (9 / 10) * 100 + "%", // 16:9 ratio
          style: { fontFamily: "roboto" }
        },
        series: [
          {
            legendType: "point",
            type: "treemap",
            layoutAlgorithm: "squarified",
            alternateStartingDirection: true,
            levels: [
              {
                level: 1,
                // layoutAlgorithm: "sliceAndDice",
                layoutAlgorithm: "squarified",
                dataLabels: {
                  enabled: false,
                  align: "left",
                  verticalAlign: "top",

                  style: {
                    fontSize: "15px"
                    // fontWeight: "bold",
                  }
                }
              }
            ],

            data: [...getData],
            showInLegend: true,
            legendType: "point"
          }
        ],
        legend: {
          useHTML: true,
          layout: "horizontal",
          align: "right",
          verticalAlign: "bottom",

          floating: false,
          borderWidth: 0,
          useHTML: true,
          itemStyle: {
            fontSize: "14px",
            fontWeight: "medium",
            fontFamily: "roboto",
            color: "#00000"
          },

          align: "center",
          verticalAlign: "bottom",
          width: "870",

          symbolWidth: 0.1,
          symbolHeight: 0.1,
          symbolRadius: 0,
          useHTML: true,
          symbolWidth: 0,
          labelFormatter: function() {
            if (this.name == "Agriculture") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #2F978B;"></div></td><td style="padding-left:12px;">Agriculture</td></tr></table></div>';
            } else if (this.name == "Mining") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #9A25B1;"></div></td><td style="padding-left:12px;">Mining</td></tr></table></div>';
            } else if (this.name == "Construction") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #8D243B;"></div></td><td style="padding-left:12px;">Construction</td></tr></table></div>';
            } else if (this.name == "Utilities") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #FA9908;"></div></td><td style="padding-left:12px;">Utilities</td></tr></table></div>';
            } else if (this.name == "Low tech") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #F34336;"></div></td><td style="padding-left:12px;"><div>Manufacturing</div>Low tech </td></tr></table></div>';
            } else if (this.name == "High and medium tech") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #C3165B;"></div></td><td style="padding-left:12px;"><div>Manufacturing</div>High and medium tech</td></tr></table></div>';
            } else if (this.name == "Trade and repair service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #5E6DC1;"></div></td><td style="padding-left:12px;"><div>Services</div>Trade and repair </td></tr></table></div>';
            } else if (this.name == "Tourism") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #3F50B8;"></div></td><td style="padding-left:12px;"><div>Services</div>Tourism</td></tr></table></div>';
            } else if (this.name == "Transport service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #3949AB;"></div></td><td style="padding-left:12px;"><div>Services</div>Transport </td></tr></table></div>';
            } else if (this.name == "ICT service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #1565C0;"></div></td><td style="padding-left:12px;"><div>Services</div>ICT </td></tr></table></div>';
            } else if (this.name == "Property service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #19227D;"></div></td><td style="padding-left:12px;"><div>Services-Property</div>and business </td></tr></table></div>';
            } else if (this.name == "Financial service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #43A7F5;"></div></td><td style="padding-left:12px;"><div>Services</div>Financial </td></tr></table></div>';
            } else if (this.name == "Public and welfare service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #2088E7;"></div></td><td style="padding-left:12px;"><div>Services</div>Public and welfare </td></tr></table></div>';
            } else if (this.name == "Private household service") {
              return '<div style="padding:3px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 35px;height: 35px;background-color: #1564C0;"></div></td><td style="padding-left:12px;"><div>Services</div>Private household </td></tr></table></div>';
            }
          }
        },
        title: {
          style: {
            fontSize: "24px"
          },
          text: `How is ${this.sourceEconomySelected.label}'s value-added in ${this.exportingSelected.label}'s exports to ${this.importingSelected.label} distributed across sectors?`
        },
        credits: {
          enabled: false
        },
        subtitle: {
          useHTML: true,
          style: {
            fontSize: "14px"
          },
          text: `Gross exports of ${this.exportingSelected.label} to ${this.importingSelected.label} amount to $${exportToConvert} ${exportToUnitSub} in ${this.displayYear}. Of these exports, $${fromsouceConvert} ${fromsouceUnitSub} is imported content that comes from ${this.sourceEconomySelected.label}, mainly used in the following exporting sectors in ${this.exportingSelected.label} : ${top5sector[0].name}, ${top5sector[1].name}, ${top5sector[2].name}, ${top5sector[3].name}, ${top5sector[4].name}<br/><br/>
          ${this.exportingSelected.label}'s imported content from ${this.sourceEconomySelected.label} in exports to  ${this.importingSelected.label} :  $${fromsouceConvert} ${fromsouceUnitSub} / ${this.exportingSelected.label}'s gross exports to ${this.importingSelected.label} :   $${exportToConvert}  ${exportToUnitSub}
          `,
          align: "left"
        },

        exporting: {
          allowHTML: true,
          useHTML: true,
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
          width: 1920,
          chartOptions: {
            chart: {
              height: (9 / 16) * 100 + "%",
              events: {
                load: function() {
                  this.legend.update({
                    useHTML: true,
                    align: "right",
                    verticalAlign: "middle",
                    width: 150,

                    labelFormatter: function() {
                      if (this.name == "Agriculture") {
                        return '<div style="padding:2px;font-size:10px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 7px;height: 7px;background-color: #2F978B;"></div></td><td style="padding-left:3px;font-size:8px;white-space:nowrap">Agriculture</td></tr></table></div>';
                      } else if (this.name == "Mining") {
                        return '<div style="padding:2px;font-size:10px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 7px;height: 7px;background-color: #9A25B1;"></div></td><td style="padding-left:3px;font-size:8px;white-space:nowrap">Mining</td></tr></table></div>';
                      } else if (this.name == "Construction") {
                        return '<div style="padding:2px;font-size:10px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 7px;height: 7px;background-color: #8D243B;"></div></td><td style="padding-left:3px;font-size:8px;white-space:nowrap">Construction</td></tr></table></div>';
                      } else if (this.name == "Utilities") {
                        return '<div style="padding:2px;font-size:10px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 7px;height: 7px;background-color: #FA9908;"></div></td><td style="padding-left:3px;font-size:8px;white-space:nowrap">Utilities</td></tr></table></div>';
                      } else if (this.name == "Low tech") {
                        return '<div style="padding:2px;font-size:10px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 7px;height: 7px;background-color: #F34336;"></div></td><td style="padding-left:3px;font-size:8px;white-space:nowrap">Manufacturing Low tech </td></tr></table></div>';
                      } else if (this.name == "High and medium tech") {
                        return '<div style="padding:2px;font-size:10px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 7px;height: 7px;background-color: #C3165B;"></div></td><td style="padding-left:3px;font-size:8px;white-space:nowrap">Manufacturing High and medium tech</td></tr></table></div>';
                      } else if (this.name == "Trade and repair service") {
                        return '<div style="padding:2px;font-size:10px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 7px;height: 7px;background-color: #5E6DC1;"></div></td><td style="padding-left:3px;font-size:8px;white-space:nowrap">Services Trade and repair </td></tr></table></div>';
                      } else if (this.name == "Tourism") {
                        return '<div style="padding:2px;font-size:10px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 7px;height: 7px;background-color: #3F50B8;"></div></td><td style="padding-left:3px;font-size:8px;white-space:nowrap">Services Tourism</td></tr></table></div>';
                      } else if (this.name == "Transport service") {
                        return '<div style="padding:2px;font-size:10px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 7px;height: 7px;background-color: #3949AB;"></div></td><td style="padding-left:3px;font-size:8px;white-space:nowrap">Services Transport </td></tr></table></div>';
                      } else if (this.name == "ICT service") {
                        return '<div style="padding:2px;font-size:10px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 7px;height: 7px;background-color: #1565C0;"></div></td><td style="padding-left:3px;font-size:8px;white-space:nowrap">Services ICT </td></tr></table></div>';
                      } else if (this.name == "Property service") {
                        return '<div style="padding:2px;font-size:10px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 7px;height: 7px;background-color: #19227D;"></div></td><td style="padding-left:3px;font-size:8px;white-space:nowrap">Services Property </td></tr></table></div>';
                      } else if (this.name == "Financial service") {
                        return '<div style="padding:2px;font-size:10px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 7px;height: 7px;background-color: #43A7F5;"></div></td><td style="padding-left:3px;font-size:8px;white-space:nowrap">Services Financial </td></tr></table></div>';
                      } else if (this.name == "Public and welfare service") {
                        return '<div style="padding:2px;font-size:10px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 7px;height: 7px;background-color: #2088E7;"></div></td><td style="padding-left:3px;font-size:8px;white-space:nowrap">Services Public and welfare </td></tr></table></div>';
                      } else if (this.name == "Private household service") {
                        return '<div style="padding:2px;font-size:12px;"><table style=" border-collapse: collapse;"><tr><td><div style="width: 7px;height: 7px;background-color: #1564C0;"></div></td><td style="padding-left:3px;font-size:8px;white-space:nowrap">Services Private household </td></tr></table></div>';
                      }
                    }
                  });
                }
              }
            },
            legend: {
              enabled: true
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
        },
        tooltip: {
          useHTML: true,
          formatter: function() {
            let sectorShow = this.key.substring(0, this.key.indexOf("("));
            let percentShow = this.key.substring(
              this.key.indexOf("(") + 1,
              this.key.length - 1
            );

            let tempShowText = "";
            if (this.point.value >= 1000) {
              tempShowText = (this.point.value / 1000).toFixed(2) + " billion";
            } else {
              tempShowText = this.point.value.toFixed(2) + " million";
            }

            return `<div class='text-weight-bold'>${sectorShow}</div><div>Value : $${tempShowText}</div>
            <div>Share: ${percentShow}</div>`;
          }
        }
      });
      this.isChart2 = true;
    },
    // Graph Two in souce economy
    async setStackChart2() {
      this.isChart3 = false;
      this.errorChart3 = false;
      this.chart3RawData = [];
      this.countryList = [];

      if (cancelGraph6 !== undefined) {
        cancelGraph6();
      }

      let urlLink =
        this.path_api +
        `/cal_back_sector_2.php?exp_country=${this.exportingSelected.iso}&imp_country=${this.importingSelected.iso}&year=${this.displayYear}&source_country=${this.sourceEconomySelected.iso}`;

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph6 = c;
        })
      });

      getData = getData.data;
      if (getData.show == "off") {
        this.errorChart3 = true;
        this.isChart3 = true;
        return;
      }

      let countryTemp = getData.map(x => x.exp_country);
      this.countryList = [...new Set(countryTemp)];
      this.countryList.sort();

      //Agiculture
      this.agricultureData = [];
      let agriculture = getData.filter(x => x.grouping == "Agriculture");
      agriculture.sort((a, b) => (a.exp_country > b.exp_country ? 1 : -1));
      // agriculture = agriculture.map((x) => x.value);
      for (let i = 0; i < agriculture.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: agriculture[i].value,
          value: agriculture[i].valueM
        };
        this.agricultureData.push(temp);
      }

      //Mining
      this.miningData = [];
      let mining = getData.filter(x => x.grouping == "Mining");
      mining.sort((a, b) => (a.exp_country > b.exp_country ? 1 : -1));
      // mining = mining.map((x) => x.value);
      for (let i = 0; i < mining.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: mining[i].value,
          value: mining[i].valueM
        };
        this.miningData.push(temp);
      }

      //construction
      this.constructionData = [];
      let construction = getData.filter(x => x.grouping == "Construction");
      construction.sort((a, b) => (a.exp_country > b.exp_country ? 1 : -1));
      // construction = construction.map((x) => x.value);
      for (let i = 0; i < construction.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: construction[i].value,
          value: construction[i].valueM
        };
        this.constructionData.push(temp);
      }

      //utilities
      this.utilitiesData = [];
      let utilities = getData.filter(x => x.grouping == "Utilities");
      utilities.sort((a, b) => (a.exp_country > b.exp_country ? 1 : -1));
      // utilities = utilities.map((x) => x.value);
      for (let i = 0; i < utilities.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: utilities[i].value,
          value: utilities[i].valueM
        };
        this.utilitiesData.push(temp);
      }

      //Manufacturing-Low tech
      this.lowtechData = [];
      let lowtech = [];
      let lowtechValue = [];
      let lowtechTemp = [];
      for (let i = 0; i < this.countryList.length; i++) {
        lowtechTemp = getData.filter(
          x => x.grouping == "Low tech" && x.exp_country == this.countryList[i]
        );
        let temp = lowtechTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        lowtech.push(Number(temp));
        temp = lowtechTemp.reduce((a, b) => a + Number(b.valueM), 0).toFixed(2);
        lowtechValue.push(Number(temp));
        let tempDataDrillDown = [];
        for (let i = 0; i < lowtechTemp.length; i++) {
          let temp2 = {
            name: lowtechTemp[i].sector,
            y: lowtechTemp[i].value,
            value: lowtechTemp[i].valueM
          };

          tempDataDrillDown.push(temp2);
        }
        let lowtechDrillDown = {
          data: tempDataDrillDown,
          id: this.countryList[i] + "-Low tech",
          type: "pie"
        };
        this.drilldownData.push(lowtechDrillDown);
      }
      for (let i = 0; i < lowtech.length; i++) {
        let temp = {
          drilldown: this.countryList[i] + "-Low tech",
          name: this.countryList[i],
          y: lowtech[i],
          value: lowtechValue[i]
        };
        this.lowtechData.push(temp);
      }

      //Manufacturing-high and medium tech
      this.hightechData = [];
      let hitech = [];
      let hitechValue = [];
      let hitechTemp = [];
      for (let i = 0; i < this.countryList.length; i++) {
        hitechTemp = getData.filter(
          x =>
            x.grouping == "High and medium tech" &&
            x.exp_country == this.countryList[i]
        );
        let temp = hitechTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        hitech.push(Number(temp));
        temp = hitechTemp.reduce((a, b) => a + Number(b.valueM), 0).toFixed(2);
        hitechValue.push(Number(temp));
        //add drill down
        let tempDataDrillDown = [];
        for (let i = 0; i < hitechTemp.length; i++) {
          let temp2 = {
            name: hitechTemp[i].sector,
            y: hitechTemp[i].value,
            value: hitechTemp[i].valueM
          };
          tempDataDrillDown.push(temp2);
        }
        let lowtechDrillDown = {
          data: tempDataDrillDown,
          id: this.countryList[i] + "-High tech",
          type: "pie"
        };
        this.drilldownData.push(lowtechDrillDown);
      }

      for (let i = 0; i < hitech.length; i++) {
        let temp = {
          drilldown: this.countryList[i] + "-High tech",
          name: this.countryList[i],
          y: hitech[i],
          value: hitechValue[i]
        };
        this.hightechData.push(temp);
      }

      //Service Trade and repair
      this.tradeRepairData = [];
      let tradeRepair = [];
      let tradeRepairValue = [];
      let tradeRepairTemp = [];
      for (let i = 0; i < this.countryList.length; i++) {
        tradeRepairTemp = getData.filter(
          x =>
            x.grouping == "Trade and repair service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = tradeRepairTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        tradeRepair.push(Number(temp));
        temp = tradeRepairTemp
          .reduce((a, b) => a + Number(b.valueM), 0)
          .toFixed(2);
        tradeRepairValue.push(Number(temp));
        //add drill down
        let tempDataDrillDown = [];
        for (let i = 0; i < tradeRepairTemp.length; i++) {
          let temp2 = {
            name: tradeRepairTemp[i].sector,
            y: tradeRepairTemp[i].value,
            value: tradeRepairTemp[i].valueM
          };
          tempDataDrillDown.push(temp2);
        }
        let lowtechDrillDown = {
          data: tempDataDrillDown,
          id: this.countryList[i] + "-Trade and repair",
          type: "pie"
        };
        this.drilldownData.push(lowtechDrillDown);
      }

      for (let i = 0; i < tradeRepair.length; i++) {
        let temp = {
          drilldown: this.countryList[i] + "-Trade and repair",
          name: this.countryList[i],
          y: tradeRepair[i],
          value: tradeRepairValue[i]
        };
        this.tradeRepairData.push(temp);
      }

      //Service Tourism
      this.tourismData = [];
      let tourism = [];
      let tourismValue = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let tourismTemp = getData.filter(
          x => x.grouping == "Tourism" && x.exp_country == this.countryList[i]
        );
        let temp = tourismTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        tourism.push(Number(temp));
        temp = tourismTemp.reduce((a, b) => a + Number(b.valueM), 0).toFixed(2);
        tourismValue.push(Number(temp));
      }
      for (let i = 0; i < tourism.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: tourism[i],
          value: tourismValue[i]
        };
        this.tourismData.push(temp);
      }

      //Service Transport
      this.transportData = [];
      let transport = [];
      let transportValue = [];
      let transportTemp = [];
      for (let i = 0; i < this.countryList.length; i++) {
        transportTemp = getData.filter(
          x =>
            x.grouping == "Transport service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = transportTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        transport.push(Number(temp));

        temp = transportTemp
          .reduce((a, b) => a + Number(b.valueM), 0)
          .toFixed(2);
        transportValue.push(Number(temp));
        //add drill down
        let tempDataDrillDown = [];
        for (let i = 0; i < transportTemp.length; i++) {
          let temp2 = {
            name: transportTemp[i].sector,
            y: transportTemp[i].value
          };
          tempDataDrillDown.push(temp2);
        }
        let lowtechDrillDown = {
          data: tempDataDrillDown,
          id: this.countryList[i] + "-Transport",
          type: "pie"
        };
        this.drilldownData.push(lowtechDrillDown);
      }

      for (let i = 0; i < transport.length; i++) {
        let temp = {
          drilldown: this.countryList[i] + "-Transport",
          name: this.countryList[i],
          y: transport[i],
          value: transportValue[i]
        };
        this.transportData.push(temp);
      }
      //Service ICT
      this.ictData = [];
      let ict = [];
      let ictValue = [];

      for (let i = 0; i < this.countryList.length; i++) {
        let ictTemp = getData.filter(
          x =>
            x.grouping == "ICT service" && x.exp_country == this.countryList[i]
        );
        let temp = ictTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        ict.push(Number(temp));

        temp = ictTemp.reduce((a, b) => a + Number(b.valueM), 0).toFixed(2);
        ictValue.push(Number(temp));
      }
      for (let i = 0; i < ict.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: ict[i],
          value: ictValue[i]
        };
        this.ictData.push(temp);
      }

      //Service property
      this.propertyData = [];
      let property = [];
      let propertyValue = [];
      let propertyTemp = [];
      for (let i = 0; i < this.countryList.length; i++) {
        propertyTemp = getData.filter(
          x =>
            x.grouping == "Property service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = propertyTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        property.push(Number(temp));
        temp = propertyTemp
          .reduce((a, b) => a + Number(b.valueM), 0)
          .toFixed(2);
        propertyValue.push(Number(temp));
        //add drill down
        let tempDataDrillDown = [];
        for (let i = 0; i < propertyTemp.length; i++) {
          let temp2 = {
            name: propertyTemp[i].sector,
            y: propertyTemp[i].value
          };
          tempDataDrillDown.push(temp2);
        }
        let lowtechDrillDown = {
          data: tempDataDrillDown,
          id: this.countryList[i] + "-Property",
          type: "pie"
        };
        this.drilldownData.push(lowtechDrillDown);
      }

      for (let i = 0; i < property.length; i++) {
        let temp = {
          drilldown: this.countryList[i] + "-Property",
          name: this.countryList[i],
          y: property[i],
          value: propertyValue[i]
        };
        this.propertyData.push(temp);
      }

      //Service Financial
      this.financialData = [];
      let financial = [];
      let financialValue = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let financialTemp = getData.filter(
          x =>
            x.grouping == "Financial service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = financialTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        financial.push(Number(temp));
        temp = financialTemp
          .reduce((a, b) => a + Number(b.valueM), 0)
          .toFixed(2);
        financialValue.push(Number(temp));
      }
      for (let i = 0; i < financial.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: financial[i],
          value: financialValue[i]
        };
        this.financialData.push(temp);
      }
      //Service public
      this.publicwData = [];
      let publicw = [];
      let publicwValue = [];
      let publicwTemp = [];
      for (let i = 0; i < this.countryList.length; i++) {
        publicwTemp = getData.filter(
          x =>
            x.grouping == "Public and welfare service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = publicwTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        publicw.push(Number(temp));

        temp = publicwTemp.reduce((a, b) => a + Number(b.valueM), 0).toFixed(2);
        publicwValue.push(Number(temp));
        //add drill down
        let tempDataDrillDown = [];
        for (let i = 0; i < publicwTemp.length; i++) {
          let temp2 = {
            name: publicwTemp[i].sector,
            y: publicwTemp[i].value
          };
          tempDataDrillDown.push(temp2);
        }
        let lowtechDrillDown = {
          data: tempDataDrillDown,
          id: this.countryList[i] + "-Public",
          type: "pie"
        };
        this.drilldownData.push(lowtechDrillDown);
      }

      for (let i = 0; i < publicw.length; i++) {
        let temp = {
          drilldown: this.countryList[i] + "-Public",
          name: this.countryList[i],
          y: publicw[i],
          value: publicwValue[i]
        };
        this.publicwData.push(temp);
      }

      //Service private household
      this.privatewData = [];
      let privatew = [];
      let privatewValue = [];
      for (let i = 0; i < this.countryList.length; i++) {
        let privatewTemp = getData.filter(
          x =>
            x.grouping == "Private household service" &&
            x.exp_country == this.countryList[i]
        );
        let temp = privatewTemp.reduce((a, b) => a + b.value, 0).toFixed(2);
        privatew.push(Number(temp));

        temp = privatewTemp
          .reduce((a, b) => a + Number(b.valueM), 0)
          .toFixed(2);
        privatewValue.push(Number(temp));
      }
      for (let i = 0; i < privatew.length; i++) {
        let temp = {
          name: this.countryList[i],
          y: privatew[i],
          value: privatewValue[i]
        };
        this.privatewData.push(temp);
      }

      this.isChart3 = true;
      var sourceName = this.sourceEconomySelected.label;
      var importName = this.importingSelected.label;
      var continentName = this.continent;
      let ctext = "";
      if (this.continent.length > 0) {
        ctext = this.continent;
      } else {
        ctext = this.exportingSelected.label;
      }
      var chart2 = Highcharts.chart(
        "container2",
        {
          chart: {
            type: "column",
            height: (9 / 16) * 100 + "%", // 16:9 ratio
            events: {
              drilldown: function(e) {
                chart2.setTitle({
                  text: `How is ${sourceName}'s value-added in ${e.point.name}'s exports to ${importName} distributed across sectors?`
                });
                chart2.setSubtitle({
                  text: ""
                });
              },
              drillup: function(e) {
                chart2.setTitle({
                  text: `How is ${sourceName}'s value-added in ${ctext} economies' exports to ${importName} distributed across sectors?`
                });
                chart2.setSubtitle({
                  text:
                    "Click on a bar to see the individual economies associated with a region."
                });
              }
            }
          },
          title: {
            style: {
              fontSize: "24px",
              fontFamily: "roboto"
            },

            text: `How is ${this.sourceEconomySelected.label}'s value-added in ${ctext} economies' exports to ${this.importingSelected.label} distributed across sectors?`
          },
          subtitle: {
            style: {
              fontSize: "16px",
              fontFamily: "roboto"
            },

            text: `Click on a bar to see the individual sectors associated with a sector group`
          },
          credits: {
            enabled: false
          },
          xAxis: {
            labels: {
              rotation: -90
            },
            type: "category"
          },
          yAxis: {
            min: 0,
            title: {
              text: `% of gross exports to ${this.importingSelected.label}`
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
          plotOptions: {
            column: {
              stacking: "normal",
              dataLabels: {
                enabled: false
              }
            }
          },
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

          series: [
            {
              name: "Agriculture",
              data: this.agricultureData,
              color: "#2F978B"
            },
            {
              name: "Mining",
              data: this.miningData,
              color: "#9A25B1"
            },
            {
              name: "Construction",
              data: this.constructionData,
              color: "#8D243B"
            },
            {
              name: "Utilities",
              data: this.utilitiesData,
              color: "#FA9908"
            },
            {
              name: "Manufacturing-Low tech",
              data: this.lowtechData,
              color: "#F34336"
            },
            {
              name: "Manufacturing-High and medium tech",
              data: this.hightechData,
              color: "#C3165B"
            },
            {
              name: "Services-Trade and repair",
              data: this.tradeRepairData,
              color: "#5E6DC1"
            },
            {
              name: "Services-Tourism",
              data: this.tourismData,
              color: "#3F50B8"
            },
            {
              name: "Services-Transport",
              data: this.transportData,
              color: "#3949AB"
            },
            {
              name: "Services-ICT",
              data: this.ictData,
              color: "#1565C0"
            },
            {
              name: "Services-Property and business",
              data: this.propertyData,
              color: "#19227D"
            },
            {
              name: "Services-Financial",
              data: this.financialData,
              color: "#43A7F5"
            },
            {
              name: "Services-Public and welfare",
              data: this.publicwData,
              color: "#2088E7"
            },
            {
              name: "Services-Private household",
              data: this.privatewData,
              color: "#1564C0"
            }
          ],
          drilldown: {
            activeDataLabelStyle: {
              color: "white",
              textShadow: "0 0 2px black, 0 0 2px black"
            },
            showInLegend: false,
            series: this.drilldownData
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
            width: 1920,
            chartOptions: {
              legend: {
                width: 200,
                symbolWidth: 10,
                symbolHeight: 10,
                itemMarginTop: 2,
                symbolRadius: 0,
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
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
                  },
                  labels: {
                    style: { fontSize: "6px" }
                  }
                }
              ],
              xAxis: [
                {
                  labels: {
                    style: { fontSize: "6px" }
                  },
                  type: "category"
                }
              ]
            }
          },
          tooltip: {
            useHTML: true,
            headerFormat: "",
            pointFormatter: function() {
              let textShow = "";
              if (this.value >= 1000) {
                textShow = (this.value / 1000).toFixed(2) + " billion";
              } else {
                textShow = this.value.toFixed(2) + " million";
              }
              if (this.category >= 0) {
                return (
                  "<div> <span class='text-bold'>" +
                  this.name +
                  "</span><br>" +
                  this.series.name +
                  "<br>" +
                  " Value: $" +
                  textShow +
                  "<br> Share: " +
                  this.y +
                  "%</div>"
                );
              } else {
                return (
                  "<div> <span class='text-bold'>" +
                  this.name +
                  "</span>" +
                  "<br>" +
                  " Value: $" +
                  textShow +
                  "<br> Share: " +
                  this.y +
                  "%</div>"
                );
              }
            }
          }
        },
        (Highcharts.Tick.prototype.drillable = function() {})
      );
    },

    renderGraph2() {
      let link =
        "riva.negotiatetrade.org/#/backward-linkages" +
        "/" +
        this.exportingSelected.iso +
        "/" +
        this.displayYear +
        "/" +
        this.importingSelected.iso +
        "/" +
        this.sourceEconomySelected.iso +
        "/" +
        this.activeSelect;
      this.$q.sessionStorage.set("shareLink", link);

      this.setData2();
      this.setStackChart2();
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
      this.year = "2017";
      this.displayYear = "2017";
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

      this.displaySector = this.sectorOptions.filter(
        x => x.value == this.sectorSelected
      )[0].label;
    }

    if (this.sectorSelected == "") {
      this.sectorSelected = "0";
      this.displaySector = "all";
    }

    if (
      this.$q.sessionStorage.has("sourceE") ||
      this.$route.params.sectorOrSource
    ) {
      this.sourceEconomySelected = this.$route.params.sectorOrSource
        ? this.countryOptions.filter(
            x => x.iso == this.$route.params.sectorOrSource
          )[0]
        : this.countryOptions.filter(
            x => x.iso == this.$q.sessionStorage.getItem("sourceE")
          )[0];

      this.countryOptionsShow = this.countryOptions;
    }

    if (this.$route.params.menu) {
      this.activeSelect = Number(this.$route.params.menu);

      if (this.activeSelect == 1) {
        // select by exporting sector
        if (this.validateSelected()) {
          this.isWaiting = false;
          this.renderGraphSector();
          this.sourceEconomySelected = "";
        }
      } else {
        // select by source economy
        if (this.validateSelected2()) {
          this.isWaiting = false;
          this.renderGraph2();
        }
      }
    } else {
      if (this.validateSelected()) {
        this.isWaiting = false;
        this.renderGraphSector();
      } else {
        this.isWaiting = true;
      }
    }
  },
  beforeDestroy() {
    if (cancelGraph1 != undefined) cancelGraph1();
    if (cancelGraph2 != undefined) cancelGraph2();
    if (cancelGraph3 != undefined) cancelGraph3();
  }
};
</script>

<style lang="scss" scoped>
.test {
  white-space: nowrap;
}
</style>
