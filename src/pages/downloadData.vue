<template>
  <q-page class="bg-white">
    <!-- NOTE : Menu bar Header -->
    <q-toolbar class="text-primary q-pa-sm shadow-1">
      <div class="col q-px-md">
        <q-btn class="color4" flat round size="35px" dense icon="home" to="/" />
      </div>
      <q-space />
      <div class="col q-pr-md" align="right">
        <span class="font-header text-black">Download Data</span>
      </div>
    </q-toolbar>

    <!-- NOTE : Selected List -->
    <div class="q-pa-md q-mt-lg" v-if="!isModify">
      <!-- Indicator -->
      <div class="row q-mt-lg justify-center">
        <div style="width:150px" class="self-center q-pa-md" align="center">
          <div>
            <span class="font-content">Indicator</span>
          </div>
        </div>
        <div class="col q-px-md">
          <div class="border">
            <div class="q-pa-sm bg4">
              <span>Selected Indicator (max 5 indicators)</span>
            </div>
            <q-scroll-area visible style="height: 200px;" class>
              <div
                class="border-bottom q-pa-sm"
                :class="index % 2 == 1 ? 'bg11' : null"
                v-for="(item, index) in indicatorList"
                :key="index"
              >
                {{ item.label }}
              </div>
            </q-scroll-area>
          </div>
        </div>

        <div style="width:120px" class="self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Indicator', 'indicator')"
          ></q-btn>
        </div>
      </div>
      <!-- Exporting economy -->
      <div class="row q-mt-md justify-center">
        <div style="width:150px" class="self-center q-pa-md" align="center">
          <span class="font-content">Exporting economy</span>
        </div>
        <div class="col q-px-md">
          <div class="border">
            <div class="q-pa-sm bg4">
              <span>Selected exporting economy (max 5 economies)</span>
            </div>
            <q-scroll-area visible style="height: 200px;" class>
              <div
                class="border-bottom q-pa-sm"
                :class="index % 2 == 1 ? 'bg11' : null"
                v-for="(item, index) in exportList"
                :key="index"
              >
                {{ item.label }}
              </div>
            </q-scroll-area>
          </div>
        </div>

        <div style="width:120px" class="self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Exporting economy', 'exportting')"
          ></q-btn>
        </div>
      </div>

      <!-- Importing economy -->
      <div class="row q-mt-lg justify-center">
        <div style="width:150px" class="self-center q-pa-md" align="center">
          <span class="font-content">Importing economy</span>
        </div>
        <div class="col q-px-md">
          <div class="border">
            <div class="q-pa-sm bg4">
              <span>Selected importing economy (max 5 economies)</span>
            </div>
            <q-scroll-area visible style="height: 200px;" class>
              <div
                class="border-bottom q-pa-sm"
                :class="index % 2 == 1 ? 'bg11' : null"
                v-for="(item, index) in importingList"
                :key="index"
              >
                {{ item.label }}
              </div>
            </q-scroll-area>
          </div>
        </div>

        <div style="width:120px" class="self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Importing economy', 'importing')"
          ></q-btn>
        </div>
      </div>

      <!-- Source economy (For FVA only) -->
      <!-- v-if="indicatorList.findIndex(x => x.label == 'Backward linkages, all exporting sectors (Back_link_sector)') >= 0" -->

      <!-- :style="indicatorList.findIndex(x => x.label == 'Backward linkages, all exporting sectors (Back_link_sector)') >= 0 ? :'opacity:1' : 'opacity:0.5'" -->
      <div
        class="row q-mt-lg justify-center"
        :class="
          indicatorList.findIndex(
            x =>
              x.label ==
              'Backward linkages, all exporting sectors (Back_link_sector)'
          ) >= 0
            ? null
            : 'disable-source no-pointer-events'
        "
      >
        <div style="width:150px" class="self-center q-pa-md" align="center">
          <div>
            <span class="font-content">Source economy</span>
          </div>
        </div>
        <div class="col q-px-md">
          <div class="border">
            <div class="q-pa-sm bg4 relative-position">
              <span>Selected Source economy (max 5 economies)</span>
              <span
                class="absolute-right flex flex-center q-pr-md"
                align="right"
                >Back_link_sector only</span
              >
            </div>
            <q-scroll-area visible style="height: 200px;" class>
              <div
                class="border-bottom q-pa-sm"
                :class="index % 2 == 1 ? 'bg11' : null"
                v-for="(item, index) in sourceList"
                :key="index"
              >
                {{ item.label }}
              </div>
            </q-scroll-area>
          </div>
        </div>

        <div style="width:120px" class="self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Source economy', 'source')"
          ></q-btn>
        </div>
      </div>

      <!-- Sector -->
      <div class="row q-mt-lg justify-center">
        <div style="width:150px" class="self-center q-pa-md" align="center">
          <div>
            <span class="font-content">Sector</span>
          </div>
        </div>
        <div class="col q-px-md">
          <div class="border">
            <div class="q-pa-sm bg4">
              <span>Selected Sector(s) (Max 5 sectors)</span>
            </div>
            <q-scroll-area visible style="height: 200px;" class>
              <div
                class="border-bottom q-pa-sm"
                :class="index % 2 == 1 ? 'bg11' : null"
                v-for="(item, index) in sectorList"
                :key="index"
              >
                {{ item.label }}
              </div>
            </q-scroll-area>
          </div>
        </div>

        <div style="width:120px" class="self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Sector', 'sector')"
          ></q-btn>
        </div>
      </div>

      <!-- Year -->
      <div class="row q-mt-lg justify-center">
        <div style="width:150px" class="self-center q-pa-md" align="center">
          <div>
            <span class="font-content">Year</span>
          </div>
        </div>
        <div class="col q-px-md">
          <div class="border">
            <div class="q-pa-sm bg4">
              <span>Selected Year(s)</span>
            </div>
            <q-scroll-area visible style="height: 200px;" class>
              <div
                class="border-bottom q-pa-sm"
                :class="index % 2 == 1 ? 'bg11' : null"
                v-for="(item, index) in yearList"
                :key="index"
              >
                {{ item.label }}
              </div>
            </q-scroll-area>
          </div>
        </div>

        <div style="width:120px" class="self-center" align="center">
          <q-btn
            class="bg4 q-px-sm"
            rounded
            label="Modify"
            no-caps
            @click="editModify('Year', 'year')"
          ></q-btn>
        </div>
      </div>

      <div
        class="q-my-xl row justify-center"
        style="padding-bottom:70px;"
        align="center"
      >
        <div class="q-pr-md">
          <q-btn
            class="font-content"
            outline
            label="Clear All"
            no-caps
            style="width:200px;border-radius:10px;"
            @click="clearAllData()"
          ></q-btn>
        </div>
        <div class="q-pl-md">
          <download-csv
            v-if="isShowDownloadBtn"
            class="bg-secondary font-content text-white cursor-pointer"
            style="width:200px;border-radius:10px;height:45px;line-height:45px"
            :data="resultList"
            ref="downloadData"
            >Download Data</download-csv
          >

          <q-btn
            v-else
            class="bg-warning font-content"
            label="Generate"
            no-caps
            style="width:200px;border-radius:10px;"
            @click="runBtn()"
          ></q-btn>
        </div>
      </div>
    </div>

    <!-- NOTE : Modify -->
    <div class="q-pa-md" v-if="isModify">
      <div class="row justify-center">
        <!-- Modify Type -->
        <div class="col-11 q-pa-sm">
          <span class="font-graph"
            >{{ modifyContent }} {{ modifySubText }}</span
          >
        </div>
        <div class="col-5">
          <!-- Select Form -->
          <q-expansion-item
            class="bg4"
            header-class="q-pa-sm"
            dense
            dense-toggle
            expand-separato
            default-opened
            :label="modifySelectFormText"
          >
            <q-card class="border text-black">
              <q-scroll-area visible style="height: 400px;" class>
                <div
                  v-ripple
                  class="relative-position cursor-pointer"
                  :class="modifySelectDataList.includes(item) ? 'bg4' : null"
                  align="left"
                  v-for="(item, index) in modifyDataList"
                  :key="index"
                  style="padding:7px;border-bottom:1px solid #EDEDED"
                  @click="activeIndividual(item)"
                >
                  {{ item.label }}
                </div>
              </q-scroll-area>
            </q-card>
          </q-expansion-item>
        </div>

        <!-- Click Data to Draft -->
        <div class="col-1 self-center" style="width:70px;" align="center">
          <q-btn
            @click="clickDataToDraft()"
            label=">"
            dense
            class="bg4 q-px-sm"
          ></q-btn>
        </div>

        <!-- Select Draft Data -->
        <div class="col-5 border">
          <div class="bg4 row" style="padding:10px;">
            <span>{{ modifySelectDraftText }}</span>
            <q-space />
            <span
              @click="clearAllSelectedData()"
              class="text-underline cursor-pointer"
              >clear all</span
            >
          </div>
          <q-scroll-area visible style="height: 200px;">
            <div
              class="row border-bottom q-pa-sm"
              :class="index % 2 == 1 ? 'bg11' : null"
              v-for="(item, index) in modifyDraftList"
              :key="index"
            >
              <div>{{ item.label }}</div>
              <q-space />
              <div class="q-pr-sm">
                <span
                  class="text-underline cursor-pointer"
                  @click="clearSelectData(item)"
                  >clear</span
                >
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>

      <div class="q-pa-md q-mt-xl" align="center">
        <q-btn
          label="Cancel"
          style="width:200px;border-radius:10px;"
          outline
          class="q-mx-md font-content"
          no-caps
          @click="isModify = false"
        ></q-btn>
        <q-btn
          label="Save"
          style="width:200px;border-radius:10px;"
          class="q-mx-md font-content bg4"
          no-caps
          @click="saveData()"
        ></q-btn>
      </div>
    </div>

    <q-dialog v-model="isShowExceededQuotaDialog">
      <q-card style="width:400px;">
        <div class="bg4 q-py-sm" align="center" style="font-size:20px">
          Exceeded Quota
        </div>
        <q-card-section class="q-py-lg">
          <div align="center" style="font-size:16px">
            {{ errorExceededQuotaMessage }}
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-pb-lg">
          <q-btn
            class="bg4 font-content"
            style="width:150px"
            v-close-popup
            label="ok"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Axios from "axios";
import sectorJson from "../../public/sector.json";

export default {
  data() {
    return {
      isShowDownloadBtn: false,
      countryOptions: "",
      errorExceededQuotaMessage: "",
      sectorOptions: "",
      isModify: false,
      modifySubText: "",
      modifyType: "",
      modifyContent: "",
      modifySelectFormText: "",
      modifySelectDraftText: "",

      dataIndicatorList: [
        {
          label: "Gross exports used in importer's comsumption (Imp_cons)",
          index: 0
        },
        {
          label: "Gross exports used in importer’s export production (Imp_exp)",
          index: 1
        },
        {
          label:
            "Gross exports that return home and used in the exporter’s domestic consumption (Dom_cons)",
          index: 2
        },
        {
          label:
            "Double counted exports from repeated border crossings (Double)",
          index: 3
        },
        {
          label: "Imported content in gross exports (Imp_cont)",
          index: 4
        },
        {
          label: "Domestic value-added trade balance (DVA_tradebalance)",
          index: 5
        },
        {
          label: "Domestic value-added trade balance (DVA_tradebalance_$)",
          index: 13
        },
        {
          label: "Gross trade balance (Gross_tradebalance)",
          index: 6
        },
        {
          label: "Domestic value-added trade balance (DVA_tradebalance_$)",
          index: 14
        },
        {
          label: "GVC participation",
          index: 7
        },
        {
          label: "Backward linkages, all source countries (Back_link_country)",
          index: 8
        },
        {
          label: "Backward linkages, all exporting sectors (Back_link_sector)",
          index: 9
        },
        {
          label:
            "Forward linkages, all importing countries (Forward_link_country)",
          index: 10
        },
        {
          label:
            "Forward linkages, all exporting sectors (Forward_link_sector)",
          index: 11
        },
        {
          label: "Gross exports (Gross_exports)",
          index: 12
        }
      ],
      dataYearList: [],

      modifyDataList: [],
      modifyDraftList: [],

      exportList: [],
      importingList: [],
      sourceList: [],
      sectorList: [],
      yearList: [],
      indicatorList: [],

      modifySelectDataList: [],
      modifySelectCountryList: [],
      isShowExceededQuotaDialog: false,
      resultList: [],
      promiseBucket: []
    };
  },
  methods: {
    clearAllData() {
      this.exportList = [];
      this.importingList = [];
      this.indicatorList = [];
      this.sourceList = [];
      this.yearList = [];
      this.sectorList = [];
      this.isShowDownloadBtn = false;
    },
    saveData() {
      if (this.modifyType == "exportting") {
        this.exportList = [...this.modifyDraftList];
      } else if (this.modifyType == "importing") {
        this.importingList = [...this.modifyDraftList];
      } else if (this.modifyType == "source") {
        this.sourceList = [...this.modifyDraftList];
      } else if (this.modifyType == "sector") {
        this.sectorList = [...this.modifyDraftList];
      } else if (this.modifyType == "indicator") {
        this.indicatorList = [...this.modifyDraftList];
      } else {
        this.yearList = [...this.modifyDraftList];
      }
      this.isModify = false;
      this.isShowDownloadBtn = false;
    },

    activeIndividual(val) {
      if (this.modifySelectDataList.includes(val)) {
        this.modifySelectDataList.splice(
          this.modifySelectDataList.indexOf(val),
          1
        );
      } else {
        this.modifySelectDataList.push(val);
      }
    },
    clickDataToDraft() {
      let _this = this;
      // The maximum of selected items.
      let maximumSelected = 5;
      function checkLength() {
        if (_this.modifyType == "exportting") {
          _this.isShowExceededQuotaDialog = true;
          _this.errorExceededQuotaMessage =
            "The maximum of selected export economy is " +
            maximumSelected +
            " economics. ";
        } else if (_this.modifyType == "importing") {
          _this.isShowExceededQuotaDialog = true;
          _this.errorExceededQuotaMessage =
            "The maximum of selected importing economy is " +
            maximumSelected +
            " economics. ";
        } else if (_this.modifyType == "source") {
          _this.isShowExceededQuotaDialog = true;
          _this.errorExceededQuotaMessage =
            "The maximum of selected source economy is " +
            maximumSelected +
            " economics. ";
        } else if (_this.modifyType == "sector") {
          _this.isShowExceededQuotaDialog = true;
          _this.errorExceededQuotaMessage =
            "The maximum of selected sector is " +
            maximumSelected +
            " sectors. ";
        } else if (_this.modifyType == "indicator") {
          _this.isShowExceededQuotaDialog = true;
          _this.errorExceededQuotaMessage =
            "The maximum of selected indicators is " +
            maximumSelected +
            " indicators. ";
        }
      }
      this.modifySelectDataList.forEach(element => {
        let findIndex = this.modifyDataList.findIndex(
          x => x.index == element.index
        );
        if (
          this.modifyType != "exportting" &&
          this.modifyType != "importing" &&
          this.modifyType != "source" &&
          this.modifyType != "sector" &&
          this.modifyType != "indicator"
        ) {
          this.modifyDataList.splice(findIndex, 1);
          this.modifyDraftList.push(element);
        } else {
          if (this.modifyDraftList.length < maximumSelected) {
            this.modifyDataList.splice(findIndex, 1);
            this.modifyDraftList.push(element);
          } else {
            checkLength();
          }
        }
      });
      this.modifySelectDataList = [];
    },
    clearAllSelectedData() {
      this.modifyDraftList = [];

      let _this = this;
      function getCountry() {
        let temp = [];
        _this.countryOptions.forEach(element => {
          temp.push({
            index: Number(element.index),
            label: element.label + " -- " + element.iso
          });
        });
        return temp;
      }
      if (this.modifyType == "exportting") {
        this.modifyDataList = getCountry();
      } else if (this.modifyType == "importing") {
        this.modifyDataList = getCountry();
      } else if (this.modifyType == "source") {
        this.modifyDataList = getCountry();
      } else if (this.modifyType == "sector") {
        let finalData = [];
        sectorJson.forEach(element => {
          finalData.push({
            ...element,
            index: element.id,
            label: element.name
          });
        });
        this.modifyDataList = finalData;
      } else if (this.modifyType == "indicator") {
        this.modifyDataList = [...this.dataIndicatorList];
      } else {
        this.modifyDataList = [...this.dataYearList];
      }
    },
    clearSelectData(item) {
      let findIndex = this.modifyDraftList.findIndex(
        x => x.index == item.index
      );
      this.modifyDraftList.splice(findIndex, 1);

      this.modifyDataList.push(item);

      this.modifyDataList.sort((a, b) => a.index - b.index);
    },
    editModify(name, type) {
      let _this = this;
      function getCountry() {
        let temp = [];
        _this.countryOptions.forEach(element => {
          temp.push({
            index: Number(element.index),
            label: element.label + " -- " + element.iso
          });
        });
        return temp;
      }

      this.modifyContent = name;

      this.modifyType = type;

      function displayCorrectRelativeData() {
        if (_this.modifyDraftList.length) {
          let mapSelectedId = _this.modifyDraftList.map(x => x.index);
          _this.modifyDataList = _this.modifyDataList.filter(
            x => !mapSelectedId.includes(x.index)
          );
        }
      }

      if (type == "exportting") {
        this.modifyDraftList = [...this.exportList];
        this.modifyDataList = getCountry();
        this.modifySubText = "(max 5 economies)";

        this.modifySelectFormText = "Select from Individual Contries:";
        this.modifySelectDraftText = "Selected exporting economy";
        displayCorrectRelativeData();
      } else if (type == "importing") {
        this.modifyDraftList = [...this.importingList];
        this.modifyDataList = getCountry();
        this.modifySubText = "(max 5 economies)";
        this.modifySelectFormText = "Select from Individual Contries:";
        this.modifySelectDraftText = "Selected importing economy";
        displayCorrectRelativeData();
      } else if (type == "source") {
        this.modifyDraftList = [...this.sourceList];
        this.modifyDataList = getCountry();
        displayCorrectRelativeData();
        this.modifySubText = "(max 5 economies)";
        this.modifySelectFormText = "Select from Individual Contries:";
        this.modifySelectDraftText = "Selected source economy";
      } else if (type == "sector") {
        this.modifyDraftList = [...this.sectorList];
        let finalData = [];
        sectorJson.forEach(element => {
          finalData.push({
            ...element,
            index: element.id,
            label: element.name
          });
        });

        this.modifyDataList = finalData;
        displayCorrectRelativeData();
        this.modifySubText = "(max 5 sectors)";
        this.modifySelectFormText = "Select from sector";
        this.modifySelectDraftText = "Selected sector(s)";
      } else if (type == "indicator") {
        this.modifyDraftList = [...this.indicatorList];
        this.modifyDataList = [...this.dataIndicatorList];
        displayCorrectRelativeData();
        this.modifySelectFormText = "indicator";
        this.modifySubText = "(max 5 indicators)";
        this.modifySelectDraftText = "Selected indicator";
      } else {
        this.modifyDraftList = [...this.yearList];
        this.modifyDataList = [...this.dataYearList];
        displayCorrectRelativeData();
        this.modifySubText = "";
        this.modifySelectFormText = "year";
        this.modifySelectDraftText = "Selected Year(s)";
      }

      this.isModify = true;
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
    runBtn() {
      this.resultList = [];
      this.promiseBucket = [];

      let totalLoop =
        this.indicatorList.length *
        this.exportList.length *
        this.sectorList.length *
        this.yearList.length;

      for (
        let indicatorIndex = 0;
        indicatorIndex < this.indicatorList.length;
        indicatorIndex++
      ) {
        for (
          let exportIndex = 0;
          exportIndex < this.exportList.length;
          exportIndex++
        ) {
          for (
            let importIndex = 0;
            importIndex < this.importingList.length;
            importIndex++
          ) {
            for (
              let sectorIndex = 0;
              sectorIndex < this.sectorList.length;
              sectorIndex++
            ) {
              for (
                let yearIndex = 0;
                yearIndex < this.yearList.length;
                yearIndex++
              ) {
                let index = this.indicatorList[indicatorIndex].index;
                let exportData = this.exportList[exportIndex].label.split(
                  " -- "
                )[1];
                let importData = this.importingList[importIndex].label.split(
                  " -- "
                )[1];
                let sectorData = this.sectorList[sectorIndex].index;
                let yearData = this.yearList[yearIndex].label;

                if (index != 9) {
                  //กรณีไม่ใช่ back_link_sector
                  if (exportData != importData) {
                    this.indicatorApi(
                      index,
                      exportData,
                      importData,
                      sectorData,
                      yearData
                    );
                  }
                } else {
                  //กรณีมี back_link_sector
                  for (
                    let sourceIndex = 0;
                    sourceIndex < this.sourceList.length;
                    sourceIndex++
                  ) {
                    let sourceData = this.sourceList[sourceIndex].label.split(
                      " -- "
                    )[1];
                    if (
                      exportData != importData ||
                      exportData != sourceData ||
                      importData != sourceData
                    ) {
                      this.indicatorApi2(
                        index,
                        exportData,
                        importData,
                        sectorData,
                        yearData,
                        sourceData
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }
      this.loadingShow();
      // All data will be generated finish in this section.
      Promise.all(this.promiseBucket).then(values => {
        if (
          values.length == 0 ||
          this.indicatorList.length == 0 ||
          this.importingList.length == 0 ||
          this.exportList.length == 0 ||
          this.yearList.length == 0 ||
          this.sectorList.length == 0
        ) {
          // PLEASE ADD INDICATOR
          if (this.indicatorList.length == 0) {
            this.$q.notify({
              message:
                "<div style='width:250px' align='center'>Please add an indicator</div>",
              color: "red",
              position: "top",
              html: true
            });
          }
          if (this.exportList.length == 0) {
            this.$q.notify({
              message:
                "<div style='width:250px' align='center'>Please add an exporting economy</div>",
              color: "red",
              position: "top",
              classes: "notify-width",
              html: true
            });
          }
          if (this.importingList.length == 0) {
            this.$q.notify({
              message:
                "<div style='width:250px' align='center'>Please add an importing economy</div>",
              color: "red",
              position: "top",
              classes: "notify-width",
              html: true
            });
          }
          if (this.yearList.length == 0) {
            this.$q.notify({
              message:
                "<div style='width:250px' align='center'>Please add a year</div>",
              color: "red",
              position: "top",
              classes: "notify-width",
              html: true
            });
          }
          if (this.sectorList.length == 0) {
            this.$q.notify({
              message:
                "<div style='width:250px' align='center'>Please add a sector</div>",
              color: "red",
              position: "top",
              classes: "notify-width",
              html: true
            });
          }
          if (
            this.indicatorList.findIndex(
              x =>
                x.label ==
                "Backward linkages, all exporting sectors (Back_link_sector)"
            ) >= 0
          ) {
            this.$q.notify({
              message:
                "<div style='width:250px' align='center'>Please add a source economy</div>",
              color: "red",
              position: "top",
              classes: "notify-width",
              html: true
            });
          }

          this.loadingHide();
          return;
        }
        this.resultList = values;
        this.isShowDownloadBtn = true;
        this.loadingHide();
      });
    },
    //indicator api link no sourceData
    async indicatorApi(index, exportData, importData, sectorData, yearData) {
      let url = "";
      let typeData = 1;
      let testPromise = [];
      if (index == 0) {
        url =
          this.path_api +
          "/indicator_imp_cons.php?imp_country=" +
          importData +
          "&exp_country=" +
          exportData +
          "&year=" +
          yearData +
          "&sector=" +
          sectorData;
      } else if (index == 1) {
        url =
          this.path_api +
          "/indicator_imp_exp.php?imp_country=" +
          importData +
          "&exp_country=" +
          exportData +
          "&year=" +
          yearData +
          "&sector=" +
          sectorData;
      } else if (index == 2) {
        url =
          this.path_api +
          "/indicator_dom_cons.php?imp_country=" +
          importData +
          "&exp_country=" +
          exportData +
          "&year=" +
          yearData +
          "&sector=" +
          sectorData;
      } else if (index == 3) {
        url =
          this.path_api +
          "/indicator_double.php?imp_country=" +
          importData +
          "&exp_country=" +
          exportData +
          "&year=" +
          yearData +
          "&sector=" +
          sectorData;
      } else if (index == 4) {
        url =
          this.path_api +
          "/indicator_imp_cont.php?imp_country=" +
          importData +
          "&exp_country=" +
          exportData +
          "&year=" +
          yearData +
          "&sector=" +
          sectorData;
      } else if (index == 5) {
        url =
          this.path_api +
          "/indicator_dva_tradebalance.php?imp_country=" +
          importData +
          "&exp_country=" +
          exportData +
          "&year=" +
          yearData +
          "&sector=" +
          sectorData;
      } else if (index == 6) {
        url =
          this.path_api +
          "/indicator_gross_tradebalance.php?imp_country=" +
          importData +
          "&exp_country=" +
          exportData +
          "&year=" +
          yearData +
          "&sector=" +
          sectorData;
      } else if (index == 7) {
        url =
          this.path_api +
          "/indicator_gvc_participation.php?imp_country=" +
          importData +
          "&exp_country=" +
          exportData +
          "&year=" +
          yearData +
          "&sector=" +
          sectorData;
        typeData = 2;
      } else if (index == 8) {
        url =
          this.path_api +
          "/indicator_back_link_country.php?imp_country=" +
          importData +
          "&exp_country=" +
          exportData +
          "&year=" +
          yearData +
          "&sector=" +
          sectorData;
        typeData = 2;
      } else if (index == 10) {
        url =
          this.path_api +
          "/indicator_forward_link_country.php?exp_country=" +
          exportData +
          "&year=" +
          yearData +
          "&sector=" +
          sectorData;
        typeData = 2;
      } else if (index == 11) {
        url =
          this.path_api +
          "/indicator_forward_link_sector.php?imp_country=" +
          importData +
          "&exp_country=" +
          exportData +
          "&year=" +
          yearData;
        typeData = 2;
      } else if (index == 12) {
        url =
          this.path_api +
          "/indicator_gross_exports.php?imp_country=" +
          importData +
          "&exp_country=" +
          exportData +
          "&year=" +
          yearData +
          "&sector=" +
          sectorData;
      }

      let dataPromise = new Promise(async (a, b) => {
        let data = await Axios.get(url);
        if (typeData == 2) {
          data.data.forEach(x => {
            let tempInput = {
              source_country: x.source_country,
              exp_country: x.exp_country,
              exp_sector: x.exp_sector,
              imp_country: x.imp_country,
              variable_set: x.variable_set,
              value: x.value,
              year: x.year,
              indicator: x.indicator
            };
            a(tempInput);
          });
        } else {
          let tempInput = {
            source_country: data.data.source_country,
            exp_country: data.data.exp_country,
            exp_sector: data.data.exp_sector,
            imp_country: data.data.imp_country,
            variable_set: data.data.variable_set,
            value: data.data.value,
            year: data.data.year,
            indicator: data.data.indicator
          };
          a(tempInput);
        }
      });

      this.promiseBucket.push(dataPromise);
    },

    //indicator api link with sourceData
    async indicatorApi2(
      index,
      exportData,
      importData,
      sectorData,
      yearData,
      sourceData
    ) {
      let url =
        this.path_api +
        "/indicator_back_link_sector.php?imp_country=" +
        importData +
        "&exp_country=" +
        exportData +
        "&year=" +
        yearData +
        "&source_country=" +
        sourceData;

      let dataPromise = new Promise(async (a, b) => {
        let data = await Axios.get(url);
        data.data.forEach(x => {
          let tempInput = {
            source_country: x.source_country,
            exp_country: x.exp_country,
            exp_sector: x.exp_sector,
            imp_country: x.imp_country,
            variable_set: x.variable_set,
            value: x.value,
            year: x.year,
            indicator: x.indicator
          };
          a(tempInput);
        });
      });

      this.promiseBucket.push(dataPromise);
    }
  },
  mounted() {
    this.getSectorList();
    this.getCountryList();
    this.getYear();
  }
};
</script>

<style lang="scss" scoped>
.border {
  border: 1px solid;
}

.border-bottom {
  border-bottom: 1px solid;
}

.text-underline {
  text-decoration: underline;
}

.disable-source {
  opacity: 0.5;
}
.notify-width {
  width: 200px;
}
</style>
