<template>
  <div class="col q-px-xl q-pt-xl">
    <div class="row">
      <div class="col-4">
        <div class="font-16"><b>Integration type</b></div>
        <div>Select the desired type of integration</div>
      </div>
      <div class="col-3">
        <q-radio
          v-model="input.type"
          val="Sustainable"
          label="Sustainable integration"
          color="secondary"
          @input="changeInputTypeSustainable()"
        />
      </div>
      <q-radio
        v-model="input.type"
        val="Conventional"
        label="Conventional integration"
        color="secondary"
        @input="changeInputTypeConventional()"
      />
    </div>

    <!-- Input Panel -->

    <br />
    <div class="font-16"><b>Period</b></div>
    <div class="q-pt-md" align="center">
      <q-range
        v-model="input.year"
        marker-labels
        :min="periodSetup.min"
        :max="periodSetup.max"
        label-always
        markers
        style="width: 95%"
        color="secondary"
        @input="changeYear()"
      />
    </div>
    <div class="q-pt-md font-16"><b>Economies</b></div>
    <div>
      Please select two or more economies of interest or a pre-selected group.
    </div>
    <div>
      <q-select
        :options="countryIntraOption"
        v-model="input.partner"
        multiple
        use-chips
        stack-label
        dense
        style="width: 98%"
        @input="showSelectedPartnerList()"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section avatar>
              <gb-flag
                v-if="
                  scope.opt.code &&
                  scope.opt.code != 'TW' &&
                  scope.opt.type != 2
                "
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
    <br />
    <div class="selectedPartner relative-position q-pa-sm">
      <div class="font-16"><b>Selected economies</b></div>
      <div class="q-pt-sm">
        <div class="row" style="width: 90%">
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
    <!-- start Btn  -->

    <div class="q-py-lg row justify-evenly" align="center" style="width: 100%">
      <div class="clearAllBtnDiv" @click="clearAllBtn()">Clear all</div>
      <div class="startBtnDiv" @click="startBtn()">Start</div>
    </div>
    <!-- dialog  check data lag -->
    <q-dialog v-model="warnDialog.show">
      <q-card class="warnBox">
        <div class="font-24 text-grey-7 text-bold q-pt-sm" align="center">
          Lack of data
          <q-icon
            class="fas fa-exclamation-circle"
            color="grey-7"
            size="28px"
          />
        </div>
        <hr />

        <div style="width: 650px; margin: auto">
          <div class="font-18 text-grey-7">
            The following economies were excluded from your selection due to
            lack of data:
          </div>
          <div class="font-14 text-grey-7">Economy(ies):</div>
          <div class="row q-py-sm" v-if="warnDialog.economic.length != 0">
            <div v-for="(item, i) in warnDialog.economic" :key="i">
              <div class="countryTag q-mr-sm q-px-md q-mb-sm">
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="q-pt-lg row justify-evenly"
          align="center"
          style="width: 100%"
        >
          <div class="clearAllBtnDiv" @click="doNotThing()">Back</div>
          <div class="startBtnDiv" @click="okInWarnDialog()">Start</div>
        </div>
        <div class="q-pa-sm"></div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";

// import countryJsonInputCon from "../../../../public/country_intragroup_con.json";
// import countryJsonInputSus from "../../../../public/country_intragroup_sus.json";
import countryJsonInputCon from "../../../../public/country_allcompare.json";
import countryJsonInputSus from "../../../../public/country_allcompare.json";

export default {
  data() {
    return {
      countryOptions: [],
      countryIntraOption: [],
      countryFullList: [],
      periodSetup: {
        min: 2000,
        max: 2100,
      },
      input: {
        partner: [],
        year: {
          min: 2010,
          max: 2019,
        },
        type: "Sustainable",
        disaggregation: "country",
      },
      dataTemp: [],
      warnDialog: {
        show: false,
        economic: [],
      },
    };
  },
  methods: {
    clearAllBtn() {
      this.$router.push("/reloadpage/riintragroup");
    },
    startBtn() {
      if (this.input.year.min == this.input.year.max) {
        this.notifyRed("Start and end year can not be the same.");
        return;
      }
      // if (this.countryFullList.length > 24) {
      //   this.notifyRed(
      //     "Selected partner economies can not be selected more than 24 economies."
      //   );
      //   return;
      // }

      if (this.countryFullList.length >= 2) {
        this.loadDataTemp();
        // this.$emit("start-btn", {
        //   input: this.input,
        //   countryFullList: this.countryFullList,
        // });
      } else {
        this.notifyRed("Please select two or more economies.");
      }
    },
    changeInputTypeSustainable() {
      this.input.type = "Sustainable";
      this.$emit("change-integration-type", "Sustainable");
      this.loadCountry();
      this.input.partner = [];
      this.countryFullList = [];
      this.resetStartBtn();
      this.checkDataAvailability();
    },
    changeInputTypeConventional() {
      this.input.type = "Conventional";
      this.$emit("change-integration-type", "Conventional");
      this.loadCountry();
      this.input.partner = [];
      this.countryFullList = [];
      this.resetStartBtn();
      this.checkDataAvailability();
    },
    resetStartBtn() {
      this.$emit("reset-start-btn");
    },
    async loadPeriod() {
      let url = this.ri_api + "main/period_start_end.php";
      let res = await axios.get(url);
      this.periodSetup.min = Number(res.data.start);
      this.periodSetup.max = Number(res.data.end);
      this.input.year.min = Number(res.data.start);
      this.input.year.max = Number(res.data.end);
    },
    showSelectedPartnerList() {
      this.resetStartBtn();
      this.countryFullList = [];
      let countryPartyTemp = [];
      // console.log(this.input.partner);
      let iso = this.input.partner.map((x) => x.value);
      // console.log(iso);
      iso.forEach((isoData) => {
        let tempList = this.countryGroupListRiva2(isoData);
        // console.log(tempList);
        countryPartyTemp = countryPartyTemp.concat(tempList);
      });
      let test = [...new Set(countryPartyTemp)];

      test.forEach((x) => {
        let temp = this.countryIntraOption.filter((y) => y.value == x);
        if (temp.length > 0) {
          let inputCountry = {
            label: temp[0].label,
            iso: temp[0].value,
          };
          this.countryFullList.push(inputCountry);
        }
      });

      this.countryFullList.sort((a, b) => (a.label > b.label ? 1 : -1));
      this.checkDataAvailability();
    },
    //////////////////////////////////////////////////////////////////////
    async loadDataTemp() {
      let data = {
        economic: this.countryFullList.map((x) => x.iso),
        type: this.input.type,
      };
      let url = this.ri_api + "intra/circle_loaddata.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.dataTemp = res.data;
      this.checkCountryNodata();
    },
    checkCountryNodata() {
      let countTemp = 0;
      let countAlert = 0;
      this.warnDialog.economic = [];
      // console.log("all data table", this.dataTemp);
      for (let j = 0; j < this.countryFullList.length; j++) {
        countTemp = 0;
        this.dataTemp.forEach((x) => {
          if (
            x.partner == this.countryFullList[j].iso ||
            x.reporting == this.countryFullList[j].iso
          ) {
            countTemp++;
          }
        });
        // console.log("countpart -- ", j, countTemp, this.warnDialog);
        if (countTemp == 0) {
          countAlert++;
          this.warnDialog.economic.push(this.countryFullList[j]);
        }
      }
      if (countAlert == 0) {
        ///////
        this.$emit("start-btn", {
          input: this.input,
          countryFullList: this.countryFullList,
          reportingList: this.countryReportList,
        });
      } else {
        this.warnDialog.show = true;
      }
      // console.log(this.warnDialog);
    },
    okInWarnDialog() {
      for (let j = 0; j < this.countryFullList.length; j++) {
        let checkEconomic = false;
        this.warnDialog.economic.forEach((partner) => {
          if (partner.iso == this.countryFullList[j].iso) {
            this.countryFullList.splice(j, 1);
            checkEconomic = true;
          }
        });
        if (checkEconomic) {
          j--;
        }
      }
      if (this.countryFullList.length < 2) {
        this.notifyRed("At least two country data are required for analysis.");
        this.warnDialog.show = false;
        return;
      }
      this.checkDataAvailability();
      this.warnDialog.show = false;
      this.$emit("start-btn", {
        input: this.input,
        countryFullList: this.countryFullList,
      });
    },
    doNotThing() {
      this.warnDialog.show = false;
    },
    ///////////////////////////////////////////////////////////////////////////////////////
    checkDataAvailability() {
      if (this.countryFullList.length >= 2) {
        //ทำการบันทึกข้อมูลเข้า localStorage
        let uuid = require("uuid");
        this.id = uuid.v4();
        let saveData = {
          input: this.input,
          database: "DigiSRII",
          type: "Economy group",
          disaggregation: "Pair",
          key: this.id,
        };

        this.$q.localStorage.clear();
        this.$q.localStorage.set("dataAvail", saveData);

        this.$emit("get-input", {
          showDataAvailChart: true,
          input: this.input,
          countryFullList: this.countryFullList,
        });
      } else {
        this.$emit("get-input", {
          showDataAvailChart: false,
          input: this.input,
          countryFullList: this.countryFullList,
        });
      }
    },
    changeYear() {
      this.resetStartBtn();
      this.checkDataAvailability();
    },
    loadCountry() {
      let countryJsonInput = [];
      this.countryIntraOption = [];
      if (this.input.type == "Sustainable") {
        countryJsonInput = countryJsonInputSus;
      } else {
        countryJsonInput = countryJsonInputCon;
      }
      countryJsonInput.forEach((element) => {
        let tempData = {
          label: element.country,
          value: element.iso,
          code: element.code,
          disable: element.disable ? true : false,
        };
        this.countryIntraOption.push(tempData);
      });
    },
  },

  async mounted() {
    await this.loadCountry();
    await this.loadPeriod();
  },
};
</script>

<style lang="scss" scoped>
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

.countryTag {
  background-color: #dedede;
  color: #626262;
  display: inline;
  border-radius: 50px;
}

.selectedPartner {
  width: 98%;
  height: 440px;
  border: 1px dashed #c4c4c4;
  overflow-y: auto;
}
.warnMoreThan24 {
  color: #ee0202;
  font-size: 18px;
}
.warnBox {
  max-width: 850px;
  width: 750px;
}
</style>
