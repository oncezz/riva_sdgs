<template>
  <div align="center">
    <div class="row justify-center q-py-md">
      <div class="col-2" align="left">
        <div class="font-16 fontW700">Database</div>
        <div class="font-14">Select database of interest</div>
      </div>
      <div class="col-3 row items-center">
        <q-radio v-model="input.dataBase" val="digi" color="secondary" />
        <div align="left">
          <div class="fontW500 font-16">DigiSRII</div>
          <div class="font-14">Data restrictions for robustness apply</div>
        </div>
      </div>
      <div class="col-3 row">
        <q-radio v-model="input.dataBase" val="all" color="secondary" />
        <div align="left">
          <div class="fontW500 font-16">All Datra</div>
          <div class="font-14">No data restrictions</div>
        </div>
      </div>
    </div>

    <q-card flat class="cardBox">
      <q-tabs
        v-model="input.compareType"
        class="text-grey"
        active-color="secondary"
        indicator-color="secondary"
        align="justify"
        narrow-indicator
        no-caps
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
            <div class="col-9">
              <div class="row items-center font-16">
                <div class="col-3 fontW700 font-18" align="left">
                  Level of disaggregation
                </div>
                <div class="col-3">
                  <q-radio
                    v-model="input.disaggregation"
                    val="pair"
                    label="Pair"
                    color="secondary"
                  />
                </div>
                <div class="col-4">
                  <q-radio
                    v-model="input.disaggregation"
                    val="dimension"
                    label="Dimension and indicator"
                    color="secondary"
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
                  v-model="input.group"
                  multiple
                  use-chips
                  stack-label
                  dense
                  @input="showSelectedGroupList()"
                />
              </div>
              <div class="selectedBox q-pa-sm" align="left">
                <div class="font-16 fontW700">Selected economy group</div>

                <div class="q-pt-sm">
                  <div class="row">
                    <div
                      class="countryTag q-mr-sm q-px-md q-mb-sm"
                      v-for="(item, index) in countryFullList"
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
            <div class="col-9" align="left">
              <div class="row items-center font-16">
                <div class="col-3 fontW700 font-18">
                  Level of disaggregation
                </div>
                <div class="col-3">
                  <q-radio
                    v-model="input.disaggregation"
                    val="pair"
                    label="Pair"
                    color="secondary"
                  />
                </div>
                <div class="col-4">
                  <q-radio
                    v-model="input.disaggregation"
                    val="dimension"
                    label="Dimension and indicator"
                    color="secondary"
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
                  dense
                  use-chips
                  style="width: 98%"
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
                  v-model="input.group"
                  multiple
                  use-chips
                  stack-label
                  dense
                  @input="showSelectedGroupList()"
                />
              </div>
              <div class="selectedBox q-pa-sm">
                <div class="font-16 fontW700">Selected reporting economy</div>
                <div class="font14" v-show="countryReportList.length == 0">
                  &nbsp;
                </div>
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
                      v-for="(item, index) in countryFullList"
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
    <div class="q-pa-md"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      countryOptions: [],
      countryFullList: [],
      countryReportList: [],
      input: {
        dataBase: "digi",
        compareType: "group",
        disaggregation: "pair",
        group: [],
        reporting: null,
      },
    };
  },
  methods: {
    showSelectedReportList() {
      this.countryReportList = [];

      //   let iso = this.input.reporting.iso;
      let isos = this.input.reporting.iso;
      let tempList = this.countryGroupList(isos);

      let test = [...new Set(tempList)];

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
      this.countryFullList = [];
      let countryPartyTemp = [];
      let iso = this.input.group.map((x) => x.iso);

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
        this.countryFullList.push(inputCountry);
      });
      this.countryFullList.sort((a, b) => (a.label > b.label ? 1 : -1));
    },
  },
  async mounted() {
    await this.getCountryList();
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
  width: 1360px;
  height: 600px;
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
  height: 20px;
}
</style>
