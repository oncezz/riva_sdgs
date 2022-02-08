<template>
  <div class="row">
    <div class="col-8 q-px-xl q-pt-xl">
      <div class="row">
        <div class="col-4">
          <div class="font-16"><b>Integration type</b></div>
          <div>Select the desired type of integration</div>
        </div>
        <div class="col-3">
          <q-radio
            v-model="input.type"
            val="Sustainable"
            label="Sustainable Integration"
            color="secondary"
            @input="changeInputTypeSustainable()"
          />
        </div>
        <q-radio
          v-model="input.type"
          val="Conventional"
          label="Conventional Integration"
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
          @input="resetStartBtn()"
        />
      </div>
      <div class="q-pt-md font-16"><b>Reporting economy</b></div>
      <div>Select one, many or pre-selected group or reporting economies of interest.</div>
      <div>
        <q-select
          :options="countryOptions"
          v-model="input.reporting"
          multiple
          stack-label
          dense
          use-chips
          style="width: 98%"
          @input="showSelectedReportList()"
        />
      </div>
      <br />
      <div class="q-pt-md font-16"><b>Partner economy(ies)</b></div>
      <div>
        Select one, many or pre-selected group of partner economies of interest.
      </div>
      <div>
        <q-select
          :options="countryOptions"
          v-model="input.partner"
          multiple
          use-chips
          stack-label
          dense
          style="width: 98%"
          @input="showSelectedPartnerList()"
        />
      </div>
      <br />
      <div class="selectedPartner">
        <div class="font-16"><b>Selected reporting economy(ies)</b></div>
        <div class="q-pt-sm">
          <div class="row" style="width: 90%; height: 100px">
            <div
              class="countryTag q-mr-sm q-px-md q-mb-sm"
              v-for="(item, index) in countryReportList"
              :key="index"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="font-16"><b>Selected partner economy(ies)</b></div>
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
      <div class="q-pt-lg" align="center" style="width: 100%">
        <q-btn label="Start" class="startBtn" @click="startBtn()" />
      </div>
    </div>
    <!-- dimension icon  -->
    <div class="col-4 font-16 q-pa-md">
      <div class="">
        <b>{{ input.type }} Integration dimensions (all included)</b>
      </div>
      <div>
        Select dimensions of interest. Hover to reveal included indicators.
      </div>
      <div class="q-pt-sm"  style="width:400px;margin:auto" >
        <div class="q-pt-sm row justify-start">
          <div class="col-4 q-pt-sm" v-for="(item,index) in indicatorData" :key="index">
            <div  v-if="item.picked" @click="toggleSelectDimension(index)"><img
              :src="filePic(item.icon)"
              alt=""
              class="iconDimension cursor-pointer isPicked"
             
            ></div>
          
            <div v-else @click="toggleSelectDimension(index)"><img
              :src="filePic(item.icon)"
              alt=""
              class="iconDimension cursor-pointer"
            ></div>

            <q-tooltip>
              {{item.name}}<br />
              <div v-for="(item2,index2) in item.indicator" :key="index2">- {{item2}} </div>
            </q-tooltip></img>
          </div>
          </div> 
      </div>
    </div>
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
      indicatorData: [],
      pickAll:0,
      periodSetup: {
        min: 2000,
        max: 2020,
      },
      input: {
        partner: [],
        reporting: [],
        year: {
          min: 2012,
          max: 2020,
        },
        type: "Sustainable",
        disaggregation: "country",
        dimensionPicked:[],
      },
    };
  },
  methods: {
    startBtn() {
      if(this.pickAll==0){
       this.notifyRed("Please select one dimension");
  return ;
      }

      if (
        this.countryReportList.length > 0 &&
        this.countryFullList.length > 0
      ) {
        this.$emit("start-btn", {
          input: this.input,
          countryFullList: this.countryFullList,
        });
      } else {
        this.notifyRed("Please select Reporting economy and Partner economy");
      }
      console.log(this.input);
    },
    changeInputTypeSustainable() {
      this.input.type = "Sustainable";
      this.$emit("change-integration-type", "Sustainable");
      this.loadData();
      this.resetStartBtn();
    },
    changeInputTypeConventional() {
      this.input.type = "Conventional";
      this.$emit("change-integration-type", "Conventional");
      this.loadData();
      this.resetStartBtn();
    },
    resetStartBtn() {
      this.$emit("reset-start-btn");
    },
    async loadPeriod() {
      let url = this.ri_api + "period_start_end.php";
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
        this.countryFullList.push(inputCountry);
      });
      this.countryFullList.sort((a, b) => (a.label > b.label ? 1 : -1));
      if (
        this.countryReportList.length > 0 &&
        this.countryFullList.length > 0
      ) {
        this.$emit("show-dataavail-chart", true);
      } else {
        this.$emit("show-dataavail-chart", false);
      }
    },
    showSelectedReportList() {
      this.resetStartBtn();
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
      if (
        this.countryReportList.length > 0 &&
        this.countryFullList.length > 0
      ) {
        this.$emit("show-dataavail-chart", true);
      } else {
        this.$emit("show-dataavail-chart", false);
      }
    },
    toggleSelectDimension(index){
      let pick=this.indicatorData[index].picked;
      this.indicatorData[index].picked=!pick;
      if(!pick){
        this.pickAll++;
      }
      else{
        this.pickAll--;
      }
      console.log(this.pickAll);
      
      this.indicatorData.push(0);
      this.indicatorData.pop();
    },
    filePic(fileName) {
      return this.ri_api + "pic/" + fileName;
    },
    async loadData() {
      this.pickAll=0;
      this.indicatorData = [];
      let data = {
        type: this.input.type,
      };
      let url = this.ri_api + "dimension_icon.php";
      let res = await axios.post(url, JSON.stringify(data));
      this.indicatorData = res.data;
      this.indicatorData.forEach(x => x.picked=false);

    },
  },
  async mounted() {
    await this.loadData();
    await this.getCountryList();
    await this.loadPeriod();
  },
};
</script>

<style lang="scss" scoped>
.startBtn {
  cursor: pointer;
  font-size: 20px;
  text-align: center;
  border-radius: 5px;
  width: 400px;

  color: white;
  background-color: #2d9687;
}
.countryTag {
  background-color: #dedede;
  color: #626262;
  border-radius: 50px;
  height: 20px;
}

.selectedPartner {
  width: 98%;
  height: 340px;
  border: 1px dashed #c4c4c4;
}
.iconDimension {
  opacity: .35;
  width: 120px;
  transition: all 0.2s ease-out;
}
.isPicked{
  opacity: 1;
  transform: scale(1.1);
  border: 3px solid #2d9687;
}
</style>
