<template>
  <div class="container shadow-2 bg-white" style="color: #757575">
    <ri-header :menu="2"></ri-header>

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
    <dimensions-icon :type="input.type"></dimensions-icon>

    <!-- Control Panel -->
    <div class="row">
      <div class="col-6 q-pa-md">
        <br />
        <div class="font-16"><b>Period</b></div>
        <div style="width: 250px" class="row">
          <div class="col-6">
            <div>Start</div>
            <div>
              <q-select
                dense
                :options="year"
                v-model="input.startYear"
                style="width: 80px"
                @input="resetStart()"
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
                style="width: 80px"
                @input="resetStart()"
              />
            </div>
          </div>
        </div>
        <br />
        <div class="font-16"><b>Report economy</b></div>
        <div>
          Select a reporting economy or a pre-selected group of interest.
        </div>
        <div>
          <q-select
            :options="countryOptions"
            v-model="input.report"
            stack-label
            dense
            style="width: 90%"
            @input="checkReportCountry()"
          />
        </div>
        <br />
        <div class="font-16"><b>Partner economy(ies)</b></div>
        <div>
          Select one, many or pre-selected group of partner economies of
          interest
        </div>
        <div>
          <q-select
            :options="countryOptions"
            v-model="input.partner"
            multiple
            use-chips
            stack-label
            dense
            style="width: 90%"
            @input="checkPartnerCountry()"
          />
        </div>
        <br />
        <div v-show="countryReportList.length > 0">
          <div class="font-16"><b>Selected report economy(ies)</b></div>
          <div class="q-pt-sm">
            <div class="row" style="width: 90%">
              <div
                class="countryTag q-mr-sm q-px-md q-mb-sm"
                v-for="(item, index) in countryReportList"
                :key="index"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>

        <br />
        <div v-show="countryPartnerList.length > 0">
          <div class="font-16"><b>Selected partner economy(ies)</b></div>
          <div class="q-pt-sm">
            <div class="row" style="width: 90%">
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
      <!------ right side -------->
      <div class="col-6 q-pa-md">
        <circle-avail
          :score="circleChartData.score"
          :type="circleChartData.type"
        ></circle-avail>
        <div align="center">
          Click here to see this group’s availablitiy matrix
        </div>
        <br />
      </div>
    </div>
    <div class="q-pb-xl" align="center" style="width: 100%">
      <q-btn
        color="secondary"
        label="Start"
        style="width: 280px"
        @click="startBtn()"
        :disable="enableStart"
      />
      <!-- <div class="btnOutGreen cursor-pointer" @click="startBtn()">
        Start
      </div> -->
    </div>
    <!-- ///////////////////////  -->
    <div v-if="showResult" class="q-pa-md">
      <!-- 4 bar result -->
      <div>
        <hr />
        <div>
          <four-bar
            :type="input.type"
            :year="input.endYear"
            :data="fourBarData"
          ></four-bar>
        </div>
        <hr />
      </div>
      <!-- select type btn -->
      <div align="center">
        <div>Select desired level of disaggregation</div>
        <br />
        <div class="row justify-center">
          <div align="center">
            <div
              :class="viewType == 'A' ? 'btnGreen' : 'btnGrey'"
              @click="changeViewA()"
              class="cursor-pointer"
            >
              By partner
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
        <br />
      </div>
      <br />
      <!-- By partner Section -->
      <div v-show="viewType == 'A'">
        <div>
          How did {{ countryReportList[0].label }}'s Integration with this group
          progress across year? - group and individual economies
        </div>
        <div>Since 2014,</div>
      </div>
      <!-- By dimension section -->
      <div v-show="viewType == 'B'">By dimension</div>
      <!-- <spider-web :input="input" :partner="countryPartnerList"></spider-web> -->
    </div>
  </div>
</template>

<script>
import riHeader from "../components/ri_header";
import dimensionsIcon from "../components/ri/ri_dimensions_icon";
import circleAvail from "../components/ri/ri_data_avail_circle";
import fourBar from "../components/ri/ri_fourbar";
import spiderWeb from "../components/ri/ri_economypartner_spiderweb";
export default {
  components: {
    riHeader,
    dimensionsIcon,
    circleAvail,
    fourBar,
    spiderWeb,
  },
  data() {
    return {
      input: {
        report: "",
        partner: [],
        startYear: "2014",
        endYear: "2019",
        type: "A",
      },
      enableStart: true,
      showResult: false,
      countryReportList: [],
      countryPartnerList: [],
      countryOptions: [],
      year: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
      circleChartData: {
        //  circle Data availability
        type: 1, //  type=1  country <2 , type=2 show circle
        score: 70,
      },
      fourBarData: [
        {
          name: "China-Mongolia",
          value: 0.91,
          own: false,
        },
        {
          name: "ASEAN",
          value: 0.81,
          own: false,
        },
        {
          name: "Your group",
          value: 0.74,
          own: true,
        },
        {
          name: "Asia-Pacific",
          value: 0.56,
          own: false,
        },
      ],
      viewType: "A", //A = By partner, B= by dimension
    };
  },
  methods: {
    changeViewA() {
      this.viewType = "A";
    },
    changeViewB() {
      this.viewType = "B";
    },
    changeA() {
      this.input.type = "A";
    },
    changeB() {
      this.input.type = "B";
    },
    startBtn() {
      this.showResult = true;
    },
    resetStart() {
      this.enableStart = false;
    },
    calPieChart() {
      this.enableStart = false;
      this.circleChartData.type = 2;
      this.circleChartData.score = Math.floor(Math.random() * 101);
    },
    checkReportCountry() {
      this.showResult = false;
      let iso = this.input.report.iso;
      let countryIsoList = this.countryGroupList(iso);
      this.countryReportList = [];
      countryIsoList.forEach((isoList) => {
        let countryDetailData = this.countryOptions.filter(
          (item) => item.iso == isoList.toUpperCase()
        );
        let temp = {
          iso: countryDetailData[0].iso,
          label: countryDetailData[0].label,
        };
        this.countryReportList.push(temp);
      });
      this.countryReportList.sort((a, b) => (a.label > b.label ? 1 : -1));
      if (
        this.countryReportList.length >= 1 &&
        this.countryPartnerList.length >= 2
      ) {
        this.calPieChart();
      } else {
        this.circleChartData.type = 1;
      }
    },
    checkPartnerCountry() {
      this.showResult = false;
      this.countryPartnerList = [];
      let countryPartyTemp = [];
      let iso = this.input.partner.map((x) => x.iso);

      // check country group list
      iso.forEach((isoData) => {
        let tempList = this.countryGroupList(isoData);
        countryPartyTemp = countryPartyTemp.concat(tempList);
      });

      //duplicate array
      let test = [...new Set(countryPartyTemp)];
      // console.log(test);

      // turn into OBJ
      test.forEach((x) => {
        let temp = this.countryOptions.filter((y) => y.iso == x);
        let inputCountry = {
          label: temp[0].label,
          iso: temp[0].iso,
        };
        this.countryPartnerList.push(inputCountry);
      });
      this.countryPartnerList.sort((a, b) => (a.label > b.label ? 1 : -1));
      if (
        this.countryReportList.length >= 1 &&
        this.countryPartnerList.length >= 2
      ) {
        this.calPieChart();
      } else {
        this.circleChartData.type = 1;
      }
    },
  },
  async mounted() {
    await this.getCountryList();
  },
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
.countryTag {
  background-color: #dedede;
  color: #626262;
  display: inline;
  border-radius: 50px;
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
</style>
