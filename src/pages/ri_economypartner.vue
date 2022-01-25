<template>
  <div class="container shadow-2 bg-white" style="color:#757575">
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
    <div class="row ">
      <div class="col-6 q-pa-md">
        <br />
        <div class="font-16"><b>Period</b></div>
        <div style="width: 250px;" class="row">
          <div class="col-6">
            <div>Start</div>
            <div>
              <q-select
                dense
                :options="year"
                v-model="input.startYear"
                style="width:80px;"
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
                style="width:80px;"
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
            style="width:90%"
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
            style="width:90%"
            @input="checkPartnerCountry()"
          />
        </div>
        <br />
        <div v-show="countryReportList.length > 0">
          <div class="font-16"><b>Selected report economy(ies)</b></div>
          <div class="q-pt-sm">
            <div class=" row " style="width:90%">
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
            <div class=" row " style="width:90%">
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
  </div>
</template>

<script>
import riHeader from "../components/ri_header";
import dimensionsIcon from "../components/ri/ri_dimensions_icon";
import circleAvail from "../components/ri/ri_data_avail_circle";
export default {
  components: {
    riHeader,
    dimensionsIcon,
    circleAvail
  },
  data() {
    return {
      input: {
        report: "",
        partner: [],
        startYear: "2014",
        endYear: "2019",
        type: "A"
      },
      countryReportList: [],
      countryPartnerList: [],
      countryOptions: [],
      year: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
      circleChartData: {
        //  circle Data availability
        type: 2, //  type=1  country <2 , type=2 show circle
        score: 70
      }
    };
  },
  methods: {
    changeA() {
      this.input.type = "A";
    },
    changeB() {
      this.input.type = "B";
    },
    checkReportCountry() {
      let iso = this.input.report.iso;
      let countryIsoList = this.countryGroupList(iso);
      this.countryReportList = [];
      countryIsoList.forEach(isoList => {
        let countryDetailData = this.countryOptions.filter(
          item => item.iso == isoList.toUpperCase()
        );
        let temp = {
          iso: countryDetailData[0].iso,
          label: countryDetailData[0].label
        };
        this.countryReportList.push(temp);
      });
      this.countryReportList.sort((a, b) => (a.label > b.label ? 1 : -1));
    },
    checkPartnerCountry() {
      this.countryPartnerList = [];
      let iso = this.input.partner;
      iso.forEach(isoData => {
        let tempList = this.countryGroupList(isoData.iso);
        console.log(tempList);
      });
      // let countryIsoList = this.countryGroupList(iso.toLowerCase());
      // console.log(countryIsoList);

      // iso.forEach(isoList => {
      //   let countryDetailData = this.countryOptions.filter(
      //     item => item.iso == isoList.iso.toUpperCase()
      //   );
      //   countryDetailData.forEach(item => {
      //     let temp = {
      //       iso: item.iso,
      //       label: item.label
      //     };
      //     this.countryPartnerList.push(temp);
      //   });
      // });
      // this.countryPartnerList.sort((a, b) => (a.label > b.label ? 1 : -1));
    }
  },
  async mounted() {
    await this.getCountryList();
  }
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
</style>
