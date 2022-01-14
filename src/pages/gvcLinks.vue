<template>
  <q-page style="background-color:white">
    <global-value-chains-header
      :isShowTinaLink="true"
      :isDisableShare="isDisableShare"
    ></global-value-chains-header>
    <!-- MENU -->
    <global-value-chains-menu :activeMenu="0"></global-value-chains-menu>

    <div class="row justify-center bg12 q-pt-md q-pb-lg">
      <div class="col-6 row">
        <div class="col q-px-md">
          <span>Exporting economy</span>
          <!-- <q-select
            v-model="exp_country"
            :options="exp_optionsShow"
            outlined
            bg-color="white"
            dense
            use-input
            fill-input
            hide-selected
            @filter="filterCountry"
            @input="selectedExpCountry"
          >
            <template v-slot:prepend v-if="overviewCountry">
              <gb-flag
                v-if="overviewCountry.code && overviewCountry.code != 'TW'"
                :code="overviewCountry.code"
                size="small"
              />
            </template>

            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section avatar>
                  <gb-flag
                    v-if="scope.opt.code && scope.opt.code !='TW' "
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
          </q-select> -->

          <q-select
            dense=""
            bg-color="white"
            outlined=""
            v-model="exp_country"
            :options="countryOptions"
            @input="selectedExpCountry()"
          >
            <template v-slot:prepend v-if="overviewCountry">
              <gb-flag
                v-if="overviewCountry.code && overviewCountry.code != 'TW'"
                :code="overviewCountry.code"
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

        <div class="col q-px-md">
          <span>Year</span>
          <q-select
            v-model="year"
            :options="yearOptions"
            outlined
            bg-color="white"
            emit-value
            map-options
            dense
            @input="selectedYear"
          ></q-select>
        </div>
      </div>
    </div>

    <div v-if="exp_country && year">
      <div class="row justify-center q-pa-md">
        <div class="col-2 font-graph q-pt-md">Scroll to:</div>
        <div class="col-8 row font-content" style="width:900px;" align="center">
          <div class="col q-pr-lg">
            <q-btn
              class="bg-white q-py-md fit"
              v-scroll-to="'#pageOverview'"
              outline
              no-caps
              style="border-radius:0px;"
            >
              <span class="font-content">Overview</span>
            </q-btn>
          </div>
          <div class="col q-mx-lg q-px-lg">
            <q-btn
              v-scroll-to="'#pageSector'"
              class="bg-white q-py-md fit"
              outline
              no-caps
              style="border-radius:0px;"
            >
              <span class="font-content" no-caps>By exporting sector</span>
            </q-btn>
          </div>
          <div class="col q-pl-lg">
            <q-btn
              v-scroll-to="'#pageEconomy'"
              class="bg-white q-py-md fit"
              outline
              no-caps
              style="border-radius:0px;"
            >
              <span class="font-content">By partner economy</span>
            </q-btn>
          </div>
        </div>
        <div class="col-2"></div>
      </div>

      <q-separator class="no-margin bg-grey-5 shadow-1" id="pageOverview" />

      <div align="center" class="q-pa-lg" v-if="!isGraphGVC">
        <q-spinner-pie color="primary" size="100px" />
      </div>

      <div class="q-pa-md" v-else>
        <div align="center" class="q-my-md">
          <span class="font-title"
            >{{ overviewCountry.label }}'s GVC relationships: Overview</span
          >
        </div>

        <div class="q-mt-md">
          <div class="row justify-center">
            <div class="col-10 row q-mt-md">
              <!-- Imported Content  -->
              <div class="col row font-content" align="center">
                <div class="col-12 self-start text-teal">
                  <div class="text-bold">
                    Foreign production consumed by the importer
                    <!-- Imported content used in {{ overviewCountry.label }}'s exports -->
                    <br />(Backward linkages)
                  </div>

                  <div class="q-mt-sm" align="center">
                    Share: {{ graphGVC.import_percent }}% of
                    {{ overviewCountry.label }}'s gross exports
                    <br />
                    Value: ${{
                      graphGVC.import_value > 1000
                        ? (graphGVC.import_value / 1000).toFixed(2) + " billion"
                        : graphGVC.import_value + " millon"
                    }}
                  </div>
                </div>
              </div>
              <!-- Export Content  -->
              <div class="col font-content" align="center">
                <div class="col-12 self-start" style="color: #EB1E63">
                  <div class="text-bold">
                    <!-- <span>{{ overviewCountry.label }}'s export of intermediates used in</span> -->
                    <span>Domestic production used in</span>
                    <br />
                    <span class="text-no-wrap"
                      >the importer's exports(Forward linkages)</span
                    >
                  </div>

                  <div class="q-mt-sm" align="center">
                    <span>
                      Share: {{ graphGVC.export_percent }}% of
                      {{ overviewCountry.label }}'s gross exports
                    </span>
                    <br />
                    <span>
                      Value: ${{
                        graphGVC.export_value > 1000
                          ? (graphGVC.export_value / 1000).toFixed(2) +
                            " billion"
                          : graphGVC.export_value + " millon"
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-9 row q-pb-md">
              <div
                class="col self-center relative-position"
                style="height:200px;"
              >
                <div class="self-center">
                  <q-img
                    :width="leftContainer"
                    class="absolute-center"
                    :src="require('../../public/arrow/greencon.png')"
                  ></q-img>
                  <!-- graphGVC.import_value -->
                </div>
              </div>

              <!-- Country Content -->
              <div
                class="col-3 self-center"
                align="center"
                style="width:270px;"
              >
                <div
                  v-if="
                    overviewCountry.code &&
                      overviewCountry.code != 'TW' &&
                      overviewCountry.code != 'NP'
                  "
                >
                  <img
                    :src="
                      require('../../src/assets/flagfull/' +
                        overviewCountry.code +
                        '.png')
                    "
                    height="100px"
                    style="border: 1px solid black"
                  />
                </div>
                <div
                  v-if="overviewCountry.code && overviewCountry.code == 'NP'"
                >
                  <img
                    :src="
                      require('../../src/assets/flagfull/' +
                        overviewCountry.code +
                        '.png')
                    "
                    height="100px"
                  />
                </div>
                <div class="relative-position">
                  <span class="font-title">{{ overviewCountry.label }}</span>
                </div>
              </div>

              <div
                class="col self-center relative-position"
                style="height:200px;"
              >
                <div class>
                  <q-img
                    :width="rightContainer"
                    class="absolute-center"
                    :src="require('../../public/arrow/redcon2.png')"
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <q-separator class="no-margin bg-grey-5 shadow-1" id="pageSector" />

      <div align="center" class="q-pa-lg" v-if="!isGraphGVCSector">
        <q-spinner-pie color="primary" size="100px" />
      </div>

      <div class="q-pa-md" v-else>
        <div align="center" class="q-mt-lg">
          <span class="font-title"
            >GVC relationships: top 5 exporting sectors</span
          >
        </div>
        <div align="center">
          <span class="font-content "
            >Click on a sector to see the top 5 partner of
            {{ overviewCountry.label }} in each sector</span
          >
        </div>

        <div class="row justify-center q-mt-lg">
          <div class="col-8 row">
            <div class="col q-pa-md">
              <div class="font-footer text-teal" align="right">
                <span class="font-content text-bold"
                  >Largest backward linked sectors</span
                >
              </div>
            </div>

            <!-- Country Content -->
            <div class="col-3 self-center" align="center"></div>
            <div class="col q-pa-md">
              <div class="font-footer" style="color: #EB1E63">
                <span class="font-content text-bold"
                  >Largest forward linked sectors</span
                >
              </div>
            </div>
          </div>

          <!-- backward gvc exporting sector -->

          <div class="col-10 row q-pb-xl self-center">
            <div class="col q-pb-lg">
              <div class="relative-position" v-if="backwardSectorLinkToggle">
                <div
                  class="c q-py-xs"
                  @click="highchartBackwardSector(item)"
                  v-for="(item, index) in graphBackwardGVCSector"
                  :key="index"
                >
                  <div class align="right">
                    <div
                      class="q-pa-sm cursor-pointer relative-position bg-teal"
                      style="height:53px;"
                      :style="
                        'width:' +
                          Math.ceil(
                            (100 /
                              Math.max(
                                ...graphBackwardGVCSector.map(x => x.value)
                              )) *
                              item.value
                          ) +
                          '%'
                      "
                    >
                      <div
                        class="absolute-right q-pa-sm"
                        style="white-space:nowrap"
                      >
                        <div class="text-black">{{ item.sector }}</div>
                        <div class="text-black">
                          {{ item.precent.toFixed(2) }}% , ${{
                            item.value > 1000
                              ? (item.value / 1000).toFixed(2) + "B"
                              : item.value + "M"
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div align="right" class="q-pt-md">
                  <span class="text-bold">Sector</span>
                  <br />
                  <span
                    >Share of foreign value-added in
                    {{ overviewCountry.label }}'s sectoral gross exports
                    (%)</span
                  >
                  <br />
                  <span>Foreign value-added ($)</span>
                </div>
              </div>

              <div v-show="!backwardSectorLinkToggle">
                <div
                  style="border:1px solid;border-radius:10px;"
                  class="q-pa-md"
                >
                  <div id="backwardSector"></div>
                </div>

                <div class="q-mt-md" align="center">
                  <q-btn
                    style="width:160px;"
                    outline
                    label="Back to main chart"
                    no-caps
                    @click="
                      backwardSectorLinkToggle = !backwardSectorLinkToggle
                    "
                  ></q-btn>
                </div>
              </div>
            </div>
            <!-- Country Content -->
            <div class="col-3 self-center" style="width:200px;" align="center">
              <div
                v-if="
                  overviewCountry.code &&
                    overviewCountry.code != 'TW' &&
                    overviewCountry.code != 'NP'
                "
              >
                <img
                  :src="
                    require('../../src/assets/flagfull/' +
                      overviewCountry.code +
                      '.png')
                  "
                  height="80px"
                  style="border: 1px solid black"
                />
              </div>
              <div v-if="overviewCountry.code && overviewCountry.code == 'NP'">
                <img
                  :src="
                    require('../../src/assets/flagfull/' +
                      overviewCountry.code +
                      '.png')
                  "
                  height="80px"
                />
              </div>
              <div class="relative-position">
                <span class="font-title">{{ overviewCountry.label }}</span>
              </div>
            </div>

            <div class="col q-pb-lg self-center">
              <div class="relative-position" v-if="forwardSectorLinkToggle">
                <div
                  class="cursor-pointer q-py-xs"
                  @click="highchartForwardSector(item)"
                  v-for="(item, index) in graphForwardGVCSector"
                  :key="index"
                >
                  <div align="left">
                    <div
                      class="q-pa-sm relative-position"
                      style="height:53px; background-color: #EB1E63"
                      :style="
                        'width:' +
                          Math.ceil(
                            (100 /
                              Math.max(
                                ...graphForwardGVCSector.map(x => x.value)
                              )) *
                              item.value
                          ) +
                          '%'
                      "
                    >
                      <div
                        class="absolute-left q-pa-sm"
                        style="white-space:nowrap"
                      >
                        <div class="text-black">{{ item.sector }}</div>
                        <div class="text-black">
                          {{ item.precent.toFixed(2) }}% , ${{
                            item.value > 1000
                              ? (item.value / 1000).toFixed(2) + "B"
                              : item.value + "M"
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div align="left" class="q-pt-md">
                  <span class="text-bold">Sector</span>
                  <br />
                  <span
                    >Share of {{ overviewCountry.label }}'s sectoral gross
                    exports used in further export production (%)</span
                  >
                  <br />
                  <span>Contribution to partner exports ($)</span>
                </div>
              </div>

              <div v-show="!forwardSectorLinkToggle">
                <div
                  style="border:1px solid;border-radius:10px;"
                  class="q-pa-md"
                >
                  <div id="forwardSector"></div>
                </div>

                <div class="q-mt-md" align="center">
                  <q-btn
                    style="width:160px;"
                    outline
                    label="Back to main chart"
                    no-caps
                    @click="forwardSectorLinkToggle = !forwardSectorLinkToggle"
                  ></q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <q-separator class="no-margin bg-grey-5 shadow-1" id="pageEconomy" />

      <div align="center" class="q-pa-lg" v-if="!isGraphGVCEconomy">
        <q-spinner-pie color="primary" size="100px" />
      </div>

      <div class="q-pa-md" v-else>
        <div align="center" class="q-mt-lg">
          <span class="font-title"
            >GVC relationships: top 5 partner economies</span
          >
        </div>
        <div align="center">
          <span class="font-content"
            >Click on a partner economy to see the top 5 sectors of
            {{ overviewCountry.label }} associated with each partner
          </span>
        </div>

        <div class="row justify-center q-mt-lg">
          <div class="col-8 row">
            <div class="col q-pa-md">
              <div class="font-footer text-teal" align="right">
                <span class="font-content text-bold"
                  >Largest backward linked partners</span
                >
                <!-- <br />
                <span class="text-bold">Source economy</span>
                <br />
                <span>Share of foreign value-added in gross exports (%)</span>
                <br />
                <span>Foreign value-added ($)</span>-->
              </div>
            </div>
            <!-- Country Content -->
            <div class="col-3 self-center" align="center"></div>
            <div class="col q-pa-md">
              <div class="font-footer" align="left" style="color:#EB1E63">
                <span class="font-content text-bold"
                  >Largest forward linked partners</span
                >
                <!-- <br />
                <span class="text-bold">Improting economy</span>
                <br />
                <span>Share of contribution to partner exports, in gross exports (%)</span>
                <br />
                <span>Contribution to partner exports ($)</span>-->
              </div>
            </div>
          </div>

          <div class="col-10 row q-pb-xl">
            <div class="col q-pb-lg">
              <div class="relative-position" v-if="backwardEconomyLinkToggle">
                <div
                  class="cursor-pointer q-py-xs"
                  @click="highchartBackwardEconomy(item)"
                  v-for="(item, index) in graphBackwardGVCEconomy"
                  :key="index"
                >
                  <div align="right">
                    <div
                      class="q-pa-sm relative-position bg-teal"
                      style="height:53px;"
                      :style="
                        'width:' +
                          Math.ceil(
                            (100 /
                              Math.max(
                                ...graphBackwardGVCEconomy.map(x => x.value)
                              )) *
                              item.value
                          ) +
                          '%'
                      "
                    >
                      <div
                        class="absolute-right q-pa-sm"
                        style="white-space:nowrap"
                      >
                        <div class="text-black">{{ item.fullName }}</div>
                        <div class="text-black">
                          {{ item.precent }}% , ${{
                            item.value > 1000
                              ? (item.value / 1000).toFixed(2) + "B"
                              : item.value + "M"
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div align="right" class="q-pt-md">
                  <span class="text-bold">Source economy</span>
                  <br />
                  <span
                    >Share of foreign value-added in
                    {{ overviewCountry.label }}'s gross exports (%)</span
                  >
                  <br />
                  <span>Foreign value-added ($)</span>
                </div>
              </div>

              <div v-show="!backwardEconomyLinkToggle">
                <div
                  style="border:1px solid;border-radius:10px;"
                  class="q-pa-md"
                >
                  <div id="backwardEconomy"></div>
                </div>

                <div class="q-mt-md" align="center">
                  <q-btn
                    style="width:160px;"
                    outline
                    label="Back to main chart"
                    no-caps
                    @click="
                      backwardEconomyLinkToggle = !backwardEconomyLinkToggle
                    "
                  ></q-btn>
                </div>
              </div>
            </div>
            <!-- Country Content -->
            <div class="col-3 self-center" style="width:200px;" align="center">
              <div
                v-if="
                  overviewCountry.code &&
                    overviewCountry.code != 'TW' &&
                    overviewCountry.code != 'NP'
                "
              >
                <img
                  :src="
                    require('../../src/assets/flagfull/' +
                      overviewCountry.code +
                      '.png')
                  "
                  height="80px"
                  style="border: 1px solid black"
                />
              </div>
              <div v-if="overviewCountry.code && overviewCountry.code == 'NP'">
                <img
                  :src="
                    require('../../src/assets/flagfull/' +
                      overviewCountry.code +
                      '.png')
                  "
                  height="80px"
                />
              </div>
              <div class="relative-position">
                <span class="font-title">{{ overviewCountry.label }}</span>
              </div>
            </div>
            <div class="col q-pb-lg">
              <div class="relative-position" v-show="forwardEconomyLinkToggle">
                <div
                  class="cursor-pointer q-py-xs"
                  @click="highchartForwardEconomy(item)"
                  v-for="(item, index) in graphForwardGVCEconomy"
                  :key="index"
                >
                  <div align="left">
                    <div
                      class="q-pa-sm relative-position"
                      style="height:53px; background-color: #EB1E63"
                      :style="
                        'width:' +
                          Math.ceil(
                            (100 /
                              Math.max(
                                ...graphForwardGVCEconomy.map(x => x.value)
                              )) *
                              item.value
                          ) +
                          '%'
                      "
                    >
                      <div
                        class="absolute-left q-pa-sm"
                        style="white-space:nowrap"
                      >
                        <div class="text-black">{{ item.fullName }}</div>
                        <div class="text-black">
                          {{ item.precent }}% , ${{
                            item.value > 1000
                              ? (item.value / 1000).toFixed(2) + "B"
                              : item.value + "M"
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div align="left" class="q-pt-md">
                  <span class="text-bold">Importing economy</span>
                  <br />
                  <span
                    >Share of {{ overviewCountry.label }}'s gross exports used
                    in further export production (%)</span
                  >
                  <br />
                  <span>Contribution to partner exports ($)</span>
                </div>
              </div>

              <div v-show="!forwardEconomyLinkToggle" class>
                <div
                  style="border:1px solid;border-radius:10px;"
                  class="q-pa-md"
                >
                  <div id="forwardEconomy"></div>
                </div>

                <div class="q-mt-md" align="center">
                  <q-btn
                    style="width:160px;"
                    outline
                    label="Back to main chart"
                    no-caps
                    @click="
                      forwardEconomyLinkToggle = !forwardEconomyLinkToggle
                    "
                  ></q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div>
        <q-img src="../../public/waiting.png" width="100%">
          <div
            style="width:100%;background-color: rgba(0, 0, 0, 0.05);"
            class="text-black font-16"
          >
            <span class="font-graph">Key policy questions</span>
            <ul>
              <li>
                How much do imports from abroad play a role in an economy’s
                export production? (backward linkages)
              </li>
              <li>
                Which exporting sectors in this economy rely the most on
                imported content from other economies? (backward linkages)
              </li>
              <li>
                Which economies contribute the most towards this economy’s
                exports? (backward linkages)
              </li>
              <br />
              <li>
                How much does an economy’s value-added in exports contribute to
                export production in other economies? (forward linkages)
              </li>
              <li>
                Which exporting sectors is this economy contribute the most to
                export production in other economies? (forward linkages)
              </li>
              <li>
                Which economies are most dependent on this economy’s exports for
                their own export production? (forward linkages)
              </li>
            </ul>
          </div>
          <div
            class="font-graph text-black"
            style="width:100%;position:relative; top:450px;background-color: rgba(0, 0, 0, 0);"
            align="center"
          >
            Please choose exporting economy and year from the drop down menus
            above
          </div>
        </q-img>
      </div>
    </div>

    <footer-menu></footer-menu>
  </q-page>
</template>

<script>
import backwardGraphGvc from "../components/backwardGVC.vue";
import forwardGraphGvc from "../components/forwardGVC.vue";
import appBar from "../components/appBarWithLogo";
import Axios from "axios";

// NEW
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import globalValueChainsMenu from "../components/menu";
import footerMenu from "../components/footer";

let CancelToken = Axios.CancelToken;
let source = CancelToken.source();
let cancelGraph1;
let cancelGraph2;
let cancelGraph3;
let cancelGraph4;
let cancelGraph5;
let cancelGraph6;
let cancelGraph7;

export default {
  components: {
    appBar,
    backwardGraphGvc,
    forwardGraphGvc,
    globalValueChainsHeader,
    globalValueChainsMenu,
    footerMenu
  },
  data() {
    return {
      test: [50, 60, 70, 30, 90],
      isDisableShare: true,
      countryOptions: [],

      exp_optionsShow: [],

      exp_country: "",

      yearOptions: [],
      year: "",

      backwardSectorHover: null,
      forwardSectorHover: null,

      backwardEconomyHover: null,
      forwardEconomyHover: null,

      graphGVC: {},

      graphBackwardGVCSector: [],
      graphForwardGVCSector: [],

      graphBackwardGVCEconomy: [],
      graphForwardGVCEconomy: [],

      isGraphGVC: false,
      isGraphGVCSector: false,
      isGraphGVCEconomy: false,

      isShowContent: false,

      backwardSectorLinkToggle: true,
      forwardSectorLinkToggle: true,

      backwardEconomyLinkToggle: true,
      forwardEconomyLinkToggle: true,
      leftContainer: "300px",
      rightContainer: "300px"
    };
  },

  computed: {
    overviewCountry() {
      if (this.exp_country) {
        let res = this.countryOptions.filter(
          x => x.value == this.exp_country.value
        )[0];

        return res;
      }
    }
  },
  methods: {
    hoverSector(index, type) {
      if (type == "backwardSector") {
        this.backwardSectorHover = index;
      }

      if (type == "forwardSector") {
        this.forwardSectorHover = index;
      }

      if (type == "backwardEconomy") {
        this.backwardEconomyHover = index;
      }

      if (type == "forwardEconomy") {
        this.forwardEconomyHover = index;
      }
    },
    outHoverSector(index, type) {
      if (type == "backwardSector") {
        this.backwardSectorHover = null;
      }

      if (type == "forwardSector") {
        this.forwardSectorHover = null;
      }

      if (type == "backwardEconomy") {
        this.backwardEconomyHover = null;
      }

      if (type == "forwardEconomy") {
        this.forwardEconomyHover = null;
      }
    },
    filterCountry(val, update) {
      update(async () => {
        this.exp_optionsShow = this.countryOptions.filter(
          x => x.label.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    },
    selectedExpCountry() {
      this.$q.sessionStorage.set("expe", this.exp_country.iso);

      this.backwardSectorLinkToggle = true;
      this.forwardSectorLinkToggle = true;
      this.backwardEconomyLinkToggle = true;
      this.forwardEconomyLinkToggle = true;

      if (this.validateSelected()) {
        this.renderGraph();
      }
    },
    selectedYear() {
      this.$q.sessionStorage.set("year", this.year);

      this.backwardSectorLinkToggle = true;
      this.forwardSectorLinkToggle = true;
      this.backwardEconomyLinkToggle = true;
      this.forwardEconomyLinkToggle = true;

      if (this.validateSelected()) {
        this.renderGraph();
      }
    },

    validateSelected() {
      if (this.exp_country != "" && this.year != "") {
        this.isDisableShare = false;
        return true;
      } else {
        false;
      }
    },

    renderGraph() {
      this.loadGVCGraph();
      this.loadGVCGraphSector();
      this.loadGVCGraphEconomy();

      let link =
        "https://riva.negotiatetrade.org/#/gvc-links" +
        "/" +
        this.exp_country.iso +
        "/" +
        this.year;
      this.$q.sessionStorage.set("shareLink", link);

      // this.$router.push("/gvc-links/" + this.exp_country.iso + "/" + this.year);
    },

    // ------------------------- END -------------------------

    toInvolvement() {
      this.$router.push("/involvement");
      // cselec  = country and year that user selected
      this.$q.sessionStorage.set("cselec", this.exp_country);
    },

    async loadGVCGraph() {
      this.isGraphGVC = false;

      let urlLink =
        this.path_api +
        `/cal_gvc_title.php?country=${this.exp_country.iso}&year=${this.year}`;

      let formatData = {
        total_percent: 0,
        total_value: 0,
        import_percent: 0,
        import_value: 0,
        export_percent: 0,
        export_value: 0
      };

      if (cancelGraph1 !== undefined) {
        cancelGraph1();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph1 = c;
        })
      });

      this.graphGVC = getData.data == "" ? formatData : getData.data;
      let ratioGVC = this.graphGVC.export_value / this.graphGVC.import_value;
      let redConSize = 300;
      let blueConSize = 300;
      if (ratioGVC > 1) {
        redConSize = 300;
        blueConSize = redConSize / ratioGVC;
      } else {
        redConSize = ratioGVC * 300;
        blueConSize = 300;
      }

      this.rightContainer = redConSize + "px";
      this.leftContainer = blueConSize + "px";

      this.isGraphGVC = true;
    },

    async loadGVCGraphSector() {
      this.isGraphGVCSector = false;

      let urlLink =
        this.path_api +
        `/cal_gvc_graph1.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      if (cancelGraph2 !== undefined) {
        cancelGraph2();
      }
      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph2 = c;
        })
      });

      getData = [...getData.data];
      let backData = getData.sort(
        (a, b) => b.backward.value - a.backward.value
      );
      // console.log(backData);
      let getDataTemp = getData;
      this.graphBackwardGVCSector = [];
      this.graphForwardGVCSector = [];
      // console.log(getDataTemp[0], getDataTemp[9]);
      for (let i = 4; i >= 0; i--) {
        this.graphBackwardGVCSector.push(backData[i].backward);
      }
      let forData = getData.sort((a, b) => b.forward.value - a.forward.value);
      for (let i = 4; i >= 0; i--) {
        this.graphForwardGVCSector.push(forData[i].forward);
      }
      // console.log(this.graphBackwardGVCSector);
      // this.graphBackwardGVCSector = getData.slice(0, 5);
      // console.log(this.graphBackwardGVCSector);
      // this.graphBackwardGVCSector.sort((a, b) => a.value - b.value);
      // this.graphForwardGVCSector = getData.slice(5, 10);
      // this.graphForwardGVCSector.sort((a, b) => a.value - b.value);

      this.isGraphGVCSector = true;
    },

    async loadGVCGraphEconomy() {
      this.isGraphGVCEconomy = false;

      let urlLink =
        this.path_api +
        `/cal_gvc_graph2.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      if (cancelGraph3 !== undefined) {
        cancelGraph3();
      }

      let getData = await Axios.get(urlLink, {
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph3 = c;
        })
      });

      getData = [...getData.data];

      getData.forEach(x => {
        let newCountry = this.countryOptions.filter(
          xx => xx.iso == x.country
        )[0].label;

        x.fullName = newCountry;
      });

      this.graphBackwardGVCEconomy = getData.slice(0, 5);
      this.graphBackwardGVCEconomy.sort((a, b) => a.value - b.value);
      this.graphForwardGVCEconomy = getData.slice(5, 10);
      this.graphForwardGVCEconomy.sort((a, b) => a.value - b.value);
      this.isGraphGVCEconomy = true;
    },

    async highchartBackwardSector(val) {
      let urlLink = this.path_api + `/cal_gvc_graph1a.php`;

      if (cancelGraph4 !== undefined) {
        cancelGraph4();
      }

      let getData = await Axios.post(urlLink, {
        exporting: this.exp_country.iso,
        sector: val.sector,
        year: this.year,
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph4 = c;
        })
      });

      getData = getData.data;

      let setColor = ["#E41A1C", "#377EB8", "#4DAF4A", "#FF7F00", "#984EA3"];

      getData.forEach((x, index) => {
        let newCountry = this.countryOptions.filter(
          xx => xx.iso == x.country
        )[0].label;

        let newVal = x.val.toFixed(0);

        x.color = setColor[index];
        x.name = newCountry;
        x.y = Number(newVal);
      });

      this.backwardSectorLinkToggle = false;

      Highcharts.chart("backwardSector", {
        chart: {
          type: "column"
        },
        title: {
          text: val.sector
        },
        subtitle: {
          text: `${val.precent}%, ${val.value}M`
        },

        exporting: {
          enabled: false
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          categories: ["", "", "", "", ""]
        },
        yAxis: {
          title: {
            text: "Foreign value-added ($)"
          }
        },
        legend: {
          symbolRadius: 0
        },
        plotOptions: {
          column: {
            groupPadding: 0.05,
            pointPadding: 0.25
          },
          series: {
            borderWidth: 0,

            dataLabels: {
              enabled: true,
              format: "${point.y}M"
            }
          }
        },

        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b> ${point.y}M</b>'
        },
        credits: {
          enabled: false
        },

        series: [
          {
            data: [getData[0]],
            color: getData[0].color,
            name: getData[0].country
          },
          {
            data: [getData[1]],
            color: getData[1].color,
            name: getData[1].country
          },
          {
            data: [getData[2]],
            color: getData[2].color,
            name: getData[2].country
          },
          {
            data: [getData[3]],
            color: getData[3].color,
            name: getData[3].country
          },
          {
            data: [getData[4]],
            color: getData[4].color,
            name: getData[4].country
          }
        ]
      });
    },

    async highchartForwardSector(val) {
      let urlLink = this.path_api + `/cal_gvc_graph1b.php`;

      if (cancelGraph5 !== undefined) {
        cancelGraph5();
      }

      let getData = await Axios.post(urlLink, {
        exporting: this.exp_country.iso,
        sector: val.sector,
        year: this.year,
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph5 = c;
        })
      });

      getData = getData.data;

      let setColor = ["#E41A1C", "#377EB8", "#4DAF4A", "#FF7F00", "#984EA3"];

      getData.forEach((x, index) => {
        let newCountry = this.countryOptions.filter(
          xx => xx.iso == x.country
        )[0].label;

        let newVal = x.val.toFixed(0);

        x.color = setColor[index];
        x.name = newCountry;
        x.y = Number(newVal);
      });

      this.forwardSectorLinkToggle = false;

      Highcharts.chart("forwardSector", {
        chart: {
          type: "column"
        },
        title: {
          text: val.sector
        },
        subtitle: {
          text: `${val.precent}%, ${val.value}M`
        },

        exporting: {
          enabled: false
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          categories: ["", "", "", "", ""]
        },
        yAxis: {
          title: {
            text: "Contribution to partner exports ($)"
          }
        },
        legend: {
          symbolRadius: 0
        },
        plotOptions: {
          column: {
            groupPadding: 0.05,
            pointPadding: 0.25
          },
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: "${point.y}M"
            }
          }
        },

        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b> ${point.y}M</b>'
        },
        credits: {
          enabled: false
        },

        series: [
          {
            data: [getData[0]],
            color: getData[0].color,
            name: getData[0].country
          },
          {
            data: [getData[1]],
            color: getData[1].color,
            name: getData[1].country
          },
          {
            data: [getData[2]],
            color: getData[2].color,
            name: getData[2].country
          },
          {
            data: [getData[3]],
            color: getData[3].color,
            name: getData[3].country
          },
          {
            data: [getData[4]],
            color: getData[4].color,
            name: getData[4].country
          }
        ]
      });
    },

    async highchartBackwardEconomy(val) {
      let urlLink = this.path_api + `/cal_gvc_graph2a.php`;

      if (cancelGraph6 !== undefined) {
        cancelGraph6();
      }

      let getData = await Axios.post(urlLink, {
        exporting: this.exp_country.iso,
        sourcing: val.country,
        year: this.year,
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph6 = c;
        })
      });

      getData = getData.data;
      console.log(getData);

      let setColor = ["#E41A1C", "#377EB8", "#4DAF4A", "#FF7F00", "#984EA3"];

      getData.forEach((x, index) => {
        let newVal = x.val.toFixed(0);

        x.color = setColor[index];
        x.name = x.sector;
        x.y = Number(newVal);
      });

      this.backwardEconomyLinkToggle = false;

      Highcharts.chart("backwardEconomy", {
        chart: {
          type: "column"
        },
        title: {
          text: val.fullName
        },
        subtitle: {
          text: `${val.precent}%, ${val.value}M`
        },

        exporting: {
          enabled: false
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          categories: ["", "", "", "", ""]
        },
        yAxis: {
          title: {
            text: "Foreign value-added ($)"
          }
        },
        legend: {
          symbolRadius: 0
        },
        plotOptions: {
          column: {
            groupPadding: 0.05,
            pointPadding: 0.25
          },
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: "${point.y}M"
            }
          }
        },

        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b> ${point.y}M</b>'
        },
        credits: {
          enabled: false
        },

        series: [
          {
            data: [getData[0]],
            color: getData[0].color,
            name: getData[0].sector
          },
          {
            data: [getData[1]],
            color: getData[1].color,
            name: getData[1].sector
          },
          {
            data: [getData[2]],
            color: getData[2].color,
            name: getData[2].sector
          },
          {
            data: [getData[3]],
            color: getData[3].color,
            name: getData[3].sector
          },
          {
            data: [getData[4]],
            color: getData[4].color,
            name: getData[4].sector
          }
        ]
      });
    },

    async highchartForwardEconomy(val) {
      let urlLink = this.path_api + `/cal_gvc_graph2b.php`;

      if (cancelGraph7 !== undefined) {
        cancelGraph7();
      }

      let getData = await Axios.post(urlLink, {
        exporting: this.exp_country.iso,
        sourcing: val.country,
        year: this.year,
        cancelToken: new CancelToken(function executor(c) {
          cancelGraph7 = c;
        })
      });

      getData = getData.data;

      let setColor = ["#E41A1C", "#377EB8", "#4DAF4A", "#FF7F00", "#984EA3"];

      getData.forEach((x, index) => {
        let newVal = x.val.toFixed(0);

        x.color = setColor[index];
        x.name = x.sector;
        x.y = Number(newVal);
      });

      this.forwardEconomyLinkToggle = false;

      Highcharts.chart("forwardEconomy", {
        chart: {
          type: "column"
        },
        title: {
          text: val.fullName
        },
        subtitle: {
          text: `${val.precent}%, ${val.value}M`
        },

        exporting: {
          enabled: false
        },

        xAxis: {
          categories: ["", "", "", "", ""]
        },
        yAxis: {
          title: {
            text: "Contribution to partner exports ($)"
          }
        },
        legend: {
          symbolRadius: 0
        },
        plotOptions: {
          column: {
            groupPadding: 0.05,
            pointPadding: 0.25
          },
          series: {
            dataLabels: {
              enabled: true,
              format: "${point.y}M"
            }
          }
        },
        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b> ${point.y}M</b>'
        },
        credits: {
          enabled: false
        },

        series: [
          {
            data: [getData[0]],
            color: getData[0].color,
            name: getData[0].sector
          },
          {
            data: [getData[1]],
            color: getData[1].color,
            name: getData[1].sector
          },
          {
            data: [getData[2]],
            color: getData[2].color,
            name: getData[2].sector
          },
          {
            data: [getData[3]],
            color: getData[3].color,
            name: getData[3].sector
          },
          {
            data: [getData[4]],
            color: getData[4].color,
            name: getData[4].sector
          }
        ]
      });
    },

    async getYear() {
      let url = this.path_api + "/get_year_active.php";
      let data = await Axios.get(url);
      let temp = [];
      data.data.forEach(element => {
        temp.push({ value: Number(element), label: element });
      });
      this.yearOptions = temp;
    }
  },

  async mounted() {
    // Check Session and Params Year
    this.$q.sessionStorage.remove("shareLink");
    await this.getCountryList();
    await this.getYear();

    if (this.$q.sessionStorage.has("year") || this.$route.params.year) {
      this.year = this.$route.params.year
        ? this.$route.params.year
        : this.$q.sessionStorage.getItem("year");
    }
    if (this.year == "") {
      this.year = "2017";
    }

    if (this.$q.sessionStorage.has("expe") || this.$route.params.expe) {
      this.exp_country = this.$route.params.expe
        ? this.countryOptions.filter(x => x.iso == this.$route.params.expe)[0]
        : this.countryOptions.filter(
            x => x.iso == this.$q.sessionStorage.getItem("expe")
          )[0];

      this.exp_optionsShow = this.countryOptions;
    }

    if (this.validateSelected()) {
      this.renderGraph();
    }

    // this.checkPlatform();
  },
  beforeDestroy() {
    if (cancelGraph1 !== undefined) {
      cancelGraph1();
    }

    if (cancelGraph2 !== undefined) {
      cancelGraph2();
    }

    if (cancelGraph3 !== undefined) {
      cancelGraph3();
    }

    if (cancelGraph4 !== undefined) {
      cancelGraph4();
    }

    if (cancelGraph5 !== undefined) {
      cancelGraph5();
    }

    if (cancelGraph6 !== undefined) {
      cancelGraph6();
    }

    if (cancelGraph7 !== undefined) {
      cancelGraph7();
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-blue {
  background-color: #2381b8;
}
.chart-blue:hover {
  background-color: #0d4e74;
}
.chart-red {
  background-color: #8d273d;
}
.chart-red:hover {
  background-color: #b86b7a;
}
.box-border {
  border: 1px solid;
}

.c-blue {
  color: #283891;
}

.c-red {
  color: #8d273d;
}

// Graph left

.graph-arrow-center {
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  -moz-transform: translate(0%, -50%);
  -webkit-transform: translate(0%, -50%);
  -o-transform: translate(0%, -50%);
}
</style>
