<template>
  <div class="bgInput" align="center">
    <div class="row justify-center q-py-md"></div>

    <q-card flat class="cardBox">
      <q-tabs
        v-model="input.compareType"
        class="text-grey"
        active-color="secondary"
        indicator-color="secondary"
        align="justify"
        narrow-indicator
        no-caps
        @input="changCompareType()"
      >
        <q-tab name="group" label="Economy group" />
        <q-tab name="specific" label="Specific reporter(s) and partner(s)" />

        <q-space style="width: 300px" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="input.compareType" animated>
        <!-- tab1 -->
        <q-tab-panel name="group">
          <div class="row justify-center q-pt-md">
            <div class="col-10">
              <div class="row items-center font-16">
                <div class="col-4" align="left">
                  <div class="font-16 fontW700">Integration type</div>
                  <div class="font-14">
                    Select the desired type of integration
                  </div>
                </div>
                <div class="col-4 row items-center">
                  <q-radio
                    v-model="input.integration"
                    val="sustainable"
                    color="secondary"
                    @input="resetStartBtn()"
                  />
                  <div align="left">
                    <div class="fontW500 font-16">Sustainable integration</div>
                  </div>
                </div>
                <div class="col-3 items-center row">
                  <q-radio
                    v-model="input.integration"
                    val="conventional"
                    color="secondary"
                    @input="resetStartBtn()"
                  />
                  <div align="left">
                    <div class="fontW500 font-16">Conventional integration</div>
                  </div>
                </div>
              </div>

              <div class="row items-center font-16 q-pt-md">
                <div class="col-4" align="left">
                  <div class="font-16 fontW700">Database</div>
                  <div class="font-14">Select database of interest</div>
                </div>
                <div class="col-4 row items-center">
                  <q-radio
                    v-model="input.dataBase"
                    val="digi"
                    color="secondary"
                    @input="resetStartBtn()"
                  />
                  <div align="left">
                    <div class="fontW500 font-16">DigiSRII</div>
                  </div>
                </div>
                <div class="col-3 row items-center">
                  <q-radio
                    v-model="input.dataBase"
                    val="all"
                    color="secondary"
                    @input="resetStartBtn()"
                  />
                  <div align="left">
                    <div class="fontW500 font-16">All Data</div>
                  </div>
                </div>
              </div>

              <div class="row items-center font-16 q-pt-md">
                <div class="col-4" align="left">
                  <div class="font-16 fontW700">Level of disaggregation</div>
                  <div class="font-14">
                    Include all previous disaggregation levels
                  </div>
                </div>
                <div class="col-2 fontW500" align="left">
                  <q-radio
                    v-model="input.disaggregation"
                    val="pair"
                    label="Pair"
                    color="secondary"
                    @input="resetStartBtn()"
                  />
                </div>
                <div class="col-2 fontW500" align="left">
                  <q-radio
                    v-model="input.disaggregation"
                    val="dimension"
                    label="Dimension"
                    color="secondary"
                    @input="resetStartBtn()"
                  />
                </div>
                <div class="col-2 fontW500" align="left">
                  <q-radio
                    v-model="input.disaggregation"
                    val="indicator"
                    label="Indicator"
                    color="secondary"
                    @input="resetStartBtn()"
                  />
                </div>
              </div>

              <div class="q-pt-md" align="left">
                <div class="font-18 fontW700">Economy group</div>
                <div class="font-14">
                  Select two or more economies of interest or a pre-selected
                  group
                </div>
              </div>
              <div class="q-pb-lg">
                <q-select
                  :options="countryOptions"
                  v-model="input.economy"
                  multiple
                  use-chips
                  stack-label
                  dense
                  @input="showSelectedEconomyList()"
                />
              </div>
              <div class="selectedBox q-pa-sm" align="left">
                <div class="font-16 fontW700">Selected economy group</div>

                <div class="q-pt-sm">
                  <div class="row">
                    <div
                      class="countryTag q-mr-sm q-px-md q-mb-sm"
                      v-for="(item, index) in countryEconomyList"
                      :key="index"
                    >
                      {{ item.label }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>
        <!-- tab2 -->
        <q-tab-panel name="specific">
          <div class="row justify-center q-pt-md">
            <div class="col-10" align="left">
              <div class="row items-center font-16">
                <div class="col-4" align="left">
                  <div class="font-16 fontW700">Integration type</div>
                  <div class="font-14">
                    Select the desired type of integration
                  </div>
                </div>
                <div class="col-4 row items-center">
                  <q-radio
                    v-model="input.integration"
                    val="sustainable"
                    color="secondary"
                    @input="resetStartBtn()"
                  />
                  <div align="left">
                    <div class="fontW500 font-16">Sustainable integration</div>
                  </div>
                </div>
                <div class="col-3 items-center row">
                  <q-radio
                    v-model="input.integration"
                    val="conventional"
                    color="secondary"
                    @input="resetStartBtn()"
                  />
                  <div align="left">
                    <div class="fontW500 font-16">Conventional integration</div>
                  </div>
                </div>
              </div>

              <div class="row items-center font-16 q-pt-md">
                <div class="col-4" align="left">
                  <div class="font-16 fontW700">Database</div>
                  <div class="font-14">Select database of interest</div>
                </div>
                <div class="col-4 row items-center">
                  <q-radio
                    v-model="input.dataBase"
                    val="digi"
                    color="secondary"
                    @input="resetStartBtn()"
                  />
                  <div align="left">
                    <div class="fontW500 font-16">DigiSRII</div>
                  </div>
                </div>
                <div class="col-3 row items-center">
                  <q-radio
                    v-model="input.dataBase"
                    val="all"
                    color="secondary"
                    @input="resetStartBtn()"
                  />
                  <div align="left">
                    <div class="fontW500 font-16">All Data</div>
                  </div>
                </div>
              </div>
              <div class="row items-center q-pt-md font-16">
                <div class="col-4" align="left">
                  <div class="font-16 fontW700">Level of disaggregation</div>
                  <div class="font-14">
                    Include all previous disaggregation levels
                  </div>
                </div>
                <div class="col-2 fontW500">
                  <q-radio
                    v-model="input.disaggregation"
                    val="pair"
                    label="Pair"
                    color="secondary"
                    @input="resetStartBtn()"
                  />
                </div>
                <div class="col-2 fontW500">
                  <q-radio
                    v-model="input.disaggregation"
                    val="dimension"
                    label="Dimension"
                    color="secondary"
                    @input="resetStartBtn()"
                  />
                </div>
                <div class="col-2 fontW500">
                  <q-radio
                    v-model="input.disaggregation"
                    val="indicator"
                    label="Indicator"
                    color="secondary"
                    @input="resetStartBtn()"
                  />
                </div>
              </div>
              <div class="q-pt-md">
                <div class="font-18 fontW700">
                  <b>Reporting economy</b>
                </div>
                <div>
                  Select a reporting economy or a pre-selected group of interest
                </div>
              </div>
              <div>
                <q-select
                  :options="countryOptions"
                  v-model="input.reporting"
                  multiple
                  use-chips
                  stack-label
                  dense
                  @input="showSelectedReportList()"
                />
              </div>

              <div class="q-pt-md">
                <div class="font-18 fontW700">Partner economy</div>
                <div class="font-14">
                  Select one, many or a pre-selected group of partner economies
                  of interest.
                </div>
              </div>
              <div class="q-pb-lg">
                <q-select
                  :options="countryOptions"
                  v-model="input.partner"
                  multiple
                  use-chips
                  stack-label
                  dense
                  @input="showSelectedGroupList()"
                />
              </div>
              <div class="selectedBox q-pa-sm">
                <div class="font-16 fontW700">Selected reporting economy</div>
                <div
                  class=""
                  style="height: 30px"
                  v-show="countryReportList.length == 0"
                ></div>
                <div class="q-pt-sm">
                  <div class="row">
                    <div
                      class="countryTag q-mr-sm q-px-md q-mb-sm"
                      v-for="(item, index) in countryReportList"
                      :key="index"
                    >
                      {{ item.label }}
                    </div>
                  </div>
                </div>
                <div class="font-16 fontW700">Selected partner economy</div>

                <div class="q-pt-sm">
                  <div class="row">
                    <div
                      class="countryTag q-mr-sm q-px-md q-mb-sm"
                      v-for="(item, index) in countryPartnerList"
                      :key="index"
                    >
                      {{ item.label }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <div class="q-py-lg row justify-center" align="center" style="width: 100%">
      <div class="clearAllBtnDiv" @click="clearAllBtn()">Clear all</div>
      <div style="width: 150px"></div>
      <div class="startBtnDiv" @click="sartBtnSendInput()">Start</div>
    </div>
    <!-- <div class="q-pa-md"></div>
    <div class="startBtn" @click="sartBtnSendInput()">Start</div>
    <div class="q-pa-md"></div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["dataSend"],
  data() {
    return {
      countryOptions: [],
      countryPartnerList: [],
      countryReportList: [],
      countryEconomyList: [],
      input: {
        integration: "sustainable",
        dataBase: "digi",
        compareType: "group",
        disaggregation: "pair",
        partner: [],
        reporting: [],
        economy: [],
      },
    };
  },
  methods: {
    clearAllBtn() {
      this.$router.push("/reloadpage/ridataavailability");
    },
    showSelectedEconomyList() {
      this.resetStartBtn();
      this.countryEconomyList = [];
      let countryPartyTemp = [];
      let iso = this.input.economy.map((x) => x.iso);

      iso.forEach((isoData) => {
        let tempList = this.countryGroupList(isoData);
        countryPartyTemp = countryPartyTemp.concat(tempList);
      });
      let test = [...new Set(countryPartyTemp)];
      test.forEach((x) => {
        let temp = this.countryOptions.filter((y) => y.iso == x);
        let inputCountry = {
          label: temp[0].label,
          iso: temp[0].iso,
        };
        this.countryEconomyList.push(inputCountry);
      });
      this.countryEconomyList.sort((a, b) => (a.label > b.label ? 1 : -1));
    },
    showSelectedReportList() {
      this.resetStartBtn();
      this.countryReportList = [];
      let countryPartyTemp = [];
      let iso = this.input.reporting.map((x) => x.iso);

      iso.forEach((isoData) => {
        let tempList = this.countryGroupList(isoData);
        countryPartyTemp = countryPartyTemp.concat(tempList);
      });
      let test = [...new Set(countryPartyTemp)];
      test.forEach((x) => {
        let temp = this.countryOptions.filter((y) => y.iso == x);
        let inputCountry = {
          label: temp[0].label,
          iso: temp[0].iso,
        };
        this.countryReportList.push(inputCountry);
      });
      this.countryReportList.sort((a, b) => (a.label > b.label ? 1 : -1));
    },
    showSelectedGroupList() {
      this.resetStartBtn();
      this.countryPartnerList = [];
      let countryPartyTemp = [];
      let iso = this.input.partner.map((x) => x.iso);

      iso.forEach((isoData) => {
        let tempList = this.countryGroupList(isoData);
        countryPartyTemp = countryPartyTemp.concat(tempList);
      });
      let test = [...new Set(countryPartyTemp)];
      test.forEach((x) => {
        let temp = this.countryOptions.filter((y) => y.iso == x);
        let inputCountry = {
          label: temp[0].label,
          iso: temp[0].iso,
        };
        this.countryPartnerList.push(inputCountry);
      });
      this.countryPartnerList.sort((a, b) => (a.label > b.label ? 1 : -1));
    },
    sartBtnSendInput() {
      if (this.input.compareType == "group") {
        this.$emit("start-btn", {
          input: this.input,
          partner: this.countryEconomyList,
          report: this.countryEconomyList,
        });
      } else {
        this.$emit("start-btn", {
          input: this.input,
          partner: this.countryPartnerList,
          report: this.countryReportList,
        });
      }
    },
    resetStartBtn() {
      this.$emit("reset-start-btn");
    },
    changCompareType() {
      this.resetStartBtn();
      // this.input.partner = [];
      // this.input.reporting = [];
      // this.countryPartnerList = [];
      // this.countryReportList = [];
    },
    loadInput() {
      if (this.dataSend.type == "Economy group") {
        this.input.economy = this.dataSend.input.partner;
        this.showSelectedEconomyList();
      } else if (this.dataSend.type == "Specific") {
        this.input.compareType = "specific";
        this.input.partner = this.dataSend.input.partner;
        let temp = [];
        temp.push(this.dataSend.input.reporting);
        this.input.reporting = temp;
        this.showSelectedGroupList();
        this.showSelectedReportList();
      } else if (this.dataSend.type == "SpecificAllData") {
        this.input.compareType = "specific";
        this.input.partner = this.dataSend.input.partner;
        this.input.reporting = this.dataSend.input.reporting;
        this.input.disaggregation = "dimension";
        this.input.dataBase = "all";
        this.showSelectedGroupList();
        this.showSelectedReportList();
      }
    },
  },
  async mounted() {
    await this.getCountryList();
    if (this.dataSend != []) {
      this.loadInput();
    }
  },
};
</script>

<style lang="scss" scoped>
.fontW500 {
  font-weight: 500;
}
.fontW700 {
  font-weight: 700;
}
.cardBox {
  border: 2px solid #c4c4c4;
  width: 90%;
  height: 750px;
}
.selectedBox {
  width: 100%;
  height: 220px;
  border: 1px dashed #c4c4c4;
}
.countryTag {
  background-color: #dedede;
  color: #626262;
  display: inline;
  border-radius: 50px;
}
.startBtnDiv {
  cursor: pointer;
  width: 280px;
  background-color: #2d9687;
  height: 45px;
  line-height: 45px;
  font-size: 20px;
  color: white;
  border-radius: 5px;
  border: 3px solid #2d9687;
}
.clearAllBtnDiv {
  cursor: pointer;
  width: 280px;
  height: 45px;
  line-height: 45px;
  font-size: 20px;
  color: #757575;
  border-radius: 5px;
  border: 3px solid #2d9687;
}
.bgInput {
  width: 100%;
}
</style>
