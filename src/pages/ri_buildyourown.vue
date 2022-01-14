<template>
  <div class="container shadow-2" style="color:#757575">
    <ri-header :menu="3"></ri-header>
    <div class="row ">
      <div class="col-6 q-pa-md">
        <br />
        <div class="font-16"><b>Economies</b></div>
        <div>
          Select an economic / economies to create a group or choose a
          pre-selected group
        </div>
        <div>
          <q-select
            :options="countryOptions"
            v-model="input.eco"
            map-options
            emit-value
            multiple
            use-chips
            stack-label
            dense
            style="width:90%"
          />
        </div>
        <br />
        <div class="font-16"><b>Partner economies</b></div>
        <div>
          Select economies to create a group (minimum 3) or choose a
          pre-selected group
        </div>
        <div>
          <q-select
            :options="countryOptions"
            v-model="input.partner"
            multiple
            map-options
            emit-value
            use-chips
            stack-label
            dense
            style="width:90%"
          />
        </div>
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
        <div class="font-16"><b>Integration type</b></div>
        <br />
        <div class="row">
          <div align="center">
            <div
              :class="input.type == 'A' ? 'btnGreen' : 'btnGrey'"
              @click="changeA()"
              class="cursor-pointer"
            >
              Sustainable Integration
            </div>
          </div>
          <div class="q-px-md" align="center">
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
      <div class="col-6 q-pa-md">
        <br />
        <div class="font-16" v-show="input.type == 'A'">
          <b>Sustainable Integration Indicators</b>
        </div>
        <div class="font-16" v-show="input.type == 'B'">
          <b>Conventional Integration Indicators</b>
        </div>
        <div class="font-12">
          Click on any dimension to reveal included indicators
        </div>
        <div>
          <q-select
            dense
            v-model="showDim"
            style="width:90%"
            :options="dimensionList"
            emit-value
            map-options
            @input="showIndicator()"
          />
        </div>
        <div>
          <ul>
            <li v-for="(item, index) in indicatorShow" :key="index">
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <br />
      <div align="center" class="font-16">
        <b>Select the type of integration</b>
      </div>
      <br />
      <div class="row" style="width:800px; margin:auto;">
        <div class="col-6" align="center">
          <div
            :class="input.weight == 'A' ? 'btnGreen' : 'btnGrey'"
            @click="changeWeightA()"
            class="cursor-pointer"
          >
            DigiSRII
          </div>
        </div>
        <div class="col-6" align="center">
          <div
            :class="input.weight == 'B' ? 'btnGreen' : 'btnGrey'"
            @click="changeWeightB()"
            class="cursor-pointer"
          >
            Build your own
          </div>
        </div>
      </div>
      <br />
      <div align="center">Equal weighting across dimensions</div>
      <br />
      <!-- Equalizer -->
      <div>
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10 row justify-around">
            <div style="width: 100px;">
              <q-slider
                v-model="weightBalance[0]"
                :min="0"
                :max="100"
                :color="colorList[0]"
                vertical
                reverse
                label-always
                @change="calActualWeight()"
              />
              <q-input v-model="weightBalance[0]" dense style="width:30px;" />
              <br />
              <div class="boxshow" style="background-color:#2381B8"></div>
              <br />
              <div class="rotateText">{{ dimensionList[0].label }}</div>
            </div>

            <div style="width: 100px;" v-if="dimensionList.length >= 2">
              <q-slider
                v-model="weightBalance[1]"
                :min="0"
                :max="100"
                :color="colorList[1]"
                vertical
                reverse
                label-always
                @change="calActualWeight()"
              />
              <q-input v-model="weightBalance[1]" dense style="width:30px;" />
              <br />
              <div class="boxshow" style="background-color:#EB1E63"></div>
              <br />
              <div class="rotateText">{{ dimensionList[1].label }}</div>
            </div>

            <div style="width: 100px;" v-if="dimensionList.length >= 3">
              <q-slider
                v-model="weightBalance[2]"
                :min="0"
                :max="100"
                :color="colorList[2]"
                vertical
                reverse
                label-always
                @change="calActualWeight()"
              />
              <q-input v-model="weightBalance[2]" dense style="width:30px;" />
              <br />
              <div class="boxshow" style="background-color:#9C26B3"></div>
              <br />
              <div class="rotateText">{{ dimensionList[2].label }}</div>
            </div>

            <div style="width: 100px;" v-if="dimensionList.length >= 4">
              <q-slider
                v-model="weightBalance[3]"
                :min="0"
                :max="100"
                :color="colorList[3]"
                vertical
                reverse
                label-always
                @change="calActualWeight()"
              />
              <q-input v-model="weightBalance[3]" dense style="width:30px;" />
              <br />
              <div class="boxshow" style="background-color:#2D9687"></div>
              <br />
              <div class="rotateText">{{ dimensionList[3].label }}</div>
            </div>

            <div style="width: 100px;" v-if="dimensionList.length >= 5">
              <q-slider
                v-model="weightBalance[4]"
                :min="0"
                :max="100"
                :color="colorList[4]"
                vertical
                reverse
                label-always
                @change="calActualWeight()"
              />
              <q-input v-model="weightBalance[4]" dense style="width:30px;" />
              <br />
              <div class="boxshow" style="background-color:#000000"></div>
              <br />
              <div class="rotateText">{{ dimensionList[4].label }}</div>
            </div>

            <div style="width: 100px;" v-if="dimensionList.length >= 6">
              <q-slider
                v-model="weightBalance[5]"
                :min="0"
                :max="100"
                :color="colorList[5]"
                vertical
                reverse
                label-always
                @change="calActualWeight()"
              />
              <q-input v-model="weightBalance[5]" dense style="width:30px;" />
              <br />
              <div class="boxshow" style="background-color:#886439"></div>
              <br />
              <div class="rotateText">{{ dimensionList[5].label }}</div>
            </div>

            <div style="width: 100px;" v-if="dimensionList.length >= 7">
              <q-slider
                v-model="weightBalance[6]"
                :min="0"
                :max="100"
                :color="colorList[6]"
                vertical
                reverse
                label-always
                @change="calActualWeight()"
              />
              <q-input v-model="weightBalance[6]" dense style="width:30px;" />
              <br />
              <div class="boxshow" style="background-color:#D0AF58"></div>
              <br />
              <div class="rotateText">{{ dimensionList[6].label }}</div>
            </div>

            <div style="width: 100px;" v-if="dimensionList.length >= 8">
              <q-slider
                v-model="weightBalance[7]"
                :min="0"
                :max="100"
                :color="colorList[7]"
                vertical
                reverse
                label-always
                @change="calActualWeight()"
              />
              <q-input v-model="weightBalance[7]" dense style="width:30px;" />
              <br />
              <div class="boxshow" style="background-color:#F78800"></div>
              <br />
              <div class="rotateText">{{ dimensionList[7].label }}</div>
            </div>

            <div style="width: 100px;" v-if="dimensionList.length >= 9">
              <q-slider
                v-model="weightBalance[8]"
                :min="0"
                :max="100"
                :color="colorList[8]"
                vertical
                reverse
                label-always
                @change="calActualWeight()"
              />
              <q-input v-model="weightBalance[8]" dense style="width:30px;" />
              <br />
              <div class="boxshow" style="background-color:#652076"></div>
              <br />
              <div class="rotateText">{{ dimensionList[8].label }}</div>
            </div>

            <div style="width: 100px;" v-if="dimensionList.length >= 10">
              <q-slider
                v-model="weightBalance[9]"
                :min="0"
                :max="100"
                :color="colorList[9]"
                vertical
                reverse
                label-always
                @change="calActualWeight()"
              />
              <q-input v-model="weightBalance[9]" dense style="width:30px;" />
              <br />
              <div class="boxshow" style="background-color:#F7E900"></div>
              <br />
              <div class="rotateText">{{ dimensionList[9].label }}</div>
            </div>
          </div>
          <div class="col-1"></div>
        </div>
        <br /><br />
      </div>
      <!-- Actual weight       -->
      <div>
        <div class="row" style="width:80%; margin:auto;">
          <div class="v1" :style="{ width: actualWeightBalance[0] + '%' }">
            {{ actualWeightBalance[0] > 5 ? actualWeightBalance[0] + "%" : "" }}
          </div>
          <div class="v2" :style="{ width: actualWeightBalance[1] + '%' }">
            {{ actualWeightBalance[1] > 5 ? actualWeightBalance[1] + "%" : "" }}
          </div>
          <div class="v3" :style="{ width: actualWeightBalance[2] + '%' }">
            {{ actualWeightBalance[2] > 5 ? actualWeightBalance[2] + "%" : "" }}
          </div>
          <div class="v4" :style="{ width: actualWeightBalance[3] + '%' }">
            {{ actualWeightBalance[3] > 5 ? actualWeightBalance[3] + "%" : "" }}
          </div>
          <div class="v5" :style="{ width: actualWeightBalance[4] + '%' }">
            {{ actualWeightBalance[4] > 5 ? actualWeightBalance[4] + "%" : "" }}
          </div>
          <div class="v6" :style="{ width: actualWeightBalance[5] + '%' }">
            {{ actualWeightBalance[5] > 5 ? actualWeightBalance[5] + "%" : "" }}
          </div>
          <div class="v7" :style="{ width: actualWeightBalance[6] + '%' }">
            {{ actualWeightBalance[6] > 5 ? actualWeightBalance[6] + "%" : "" }}
          </div>
          <div class="v8" :style="{ width: actualWeightBalance[7] + '%' }">
            {{ actualWeightBalance[7] > 5 ? actualWeightBalance[7] + "%" : "" }}
          </div>
          <div class="v9" :style="{ width: actualWeightBalance[8] + '%' }">
            {{ actualWeightBalance[8] > 5 ? actualWeightBalance[8] + "%" : "" }}
          </div>
          <div class="v10" :style="{ width: actualWeightBalance[9] + '%' }">
            {{ actualWeightBalance[9] > 5 ? actualWeightBalance[9] + "%" : "" }}
          </div>
        </div>
      </div>
      <!-- start -->
      <br />
      <div align="center">
        <div class="btnOutGreen cursor-pointer">Start</div>
      </div>
      <br />
      <br />
    </div>
    <!-- Result -->
    <div v-if="showResult" class="q-ma-md">
      <!-- 4 bar result -->
      <div>
        <hr />
        <div class="q-pt-sm">
          Your group's
          <span v-if="input.type == 'A'">sustainable</span
          ><span v-else>conventional</span> Integration score in
          {{ input.endYear }} was
          <span class="text-green"
            ><b>{{ 0.74 }}</b></span
          >
        </div>
        <div>
          <four-bar :data="fourBarData"></four-bar>
        </div>
        <hr />
      </div>
      <!-- select type btn -->
      <div class="row">
        <div align="center">
          <div
            :class="viewType == 'A' ? 'btnGreen' : 'btnGrey'"
            @click="changeViewA()"
            class="cursor-pointer"
          >
            By country
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
      <div v-if="viewType == 'A'">
        See how each country is integrated with the group
      </div>
      <div v-else>
        See how each dimension is integrated with the group
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri_header";
import myFooter from "../components/footer";
import fourBar from "../components/ri_fourbar";
import Axios from "axios";
export default {
  components: {
    riHeader,
    myFooter,
    fourBar
  },
  data() {
    return {
      countryOptions: [],
      input: {
        eco: [],
        partner: [],
        startYear: "",
        endYear: "",
        type: "A",
        weight: "A"
      },
      showDim: "",
      year: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
      dimensionList: [],
      indicatorList: [],
      indicatorShow: [],
      colorList: [
        "#2381B8",
        "#EB1E63",
        "#9C26B3",
        "#2D9687",
        "#000000",
        "#886439",
        "#D0AF58",
        "#F78800",
        "#652076",
        "#F7E900"
      ],
      weightBalance: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      actualWeightBalance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      showResult: true, //แสดงคำตอบ
      yourScore: 0.74, //คะแนนของตัวเองใน 4 bar
      fourBarData: [
        {
          name: "China-Mongolia",
          value: 0.85,
          own: false
        },
        {
          name: "ASEAN",
          value: 0.73,
          own: false
        },
        {
          name: "Your group",
          value: 0.63,
          own: true
        },
        {
          name: "Asia-Pacific",
          value: 0.56,
          own: false
        }
      ],
      viewType: "A" //A = By country, B= by dimension
    };
  },
  methods: {
    changeViewA() {
      this.viewType = "A";
    },
    changeViewB() {
      this.viewType = "B";
    },
    calActualWeight() {
      this.input.weight = "B";
      this.actualWeightBalance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let sumAll = 0;
      for (let i = 0; i < this.dimensionList.length; i++) {
        sumAll += this.weightBalance[i];
      }
      for (let i = 0; i < this.dimensionList.length; i++) {
        this.actualWeightBalance[i] =
          Math.floor(((this.weightBalance[i] / sumAll) * 100).toFixed(2) * 10) /
          10;
      }
      console.log(this.actualWeightBalance);
    },
    changeWeightB() {
      this.weightBalance[0] = 50;
      this.weightBalance[1] = 50;
      this.weightBalance[2] = 50;
      this.weightBalance[3] = 50;
      this.weightBalance[4] = 50;
      this.weightBalance[5] = 50;
      this.weightBalance[6] = 50;
      this.weightBalance[7] = 50;
      this.weightBalance[8] = 50;
      this.weightBalance[9] = 50;
      this.calActualWeight();
      this.input.weight = "B";
    },
    changeWeightA() {
      this.weightBalance[0] = 100;
      this.weightBalance[1] = 100;
      this.weightBalance[2] = 100;
      this.weightBalance[3] = 100;
      this.weightBalance[4] = 100;
      this.weightBalance[5] = 100;
      this.weightBalance[6] = 100;
      this.weightBalance[7] = 100;
      this.weightBalance[8] = 100;
      this.weightBalance[9] = 100;
      this.calActualWeight();
      this.input.weight = "A";
    },
    changeA() {
      this.input.type = "A";
      this.showIndicator();
    },
    changeB() {
      this.input.type = "B";
      this.showIndicator();
    },
    async loadDimension() {
      this.dimensionList = [];
      let url = this.path_api2 + "/ri_showdimension.php";
      let res = await axios.get(url);
      for (let i = 0; i < res.data.length; i++) {
        let temp = {
          value: res.data[i].id,
          label: res.data[i].name
        };
        this.dimensionList.push(temp);
      }
      this.showDim = this.dimensionList[0].value;
    },
    async loadIndicator() {
      this.indicatorList = [];
      let url = this.path_api2 + "/ri_showindicator.php";
      let res = await axios.get(url);
      this.indicatorList = res.data;
      this.showIndicator();
    },
    showIndicator() {
      this.indicatorShow = [];
      this.indicatorShow = this.indicatorList.filter(
        x => x.type == this.input.type && x.dimensionId == this.showDim
      );
    }
  },
  async mounted() {
    await this.loadDimension();
    await this.getCountryList();
    await this.loadIndicator();
    this.calActualWeight();
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
.btnOutGreen {
  width: 220px;
  height: 45px;
  border: 3px solid #2d9687;
  border-radius: 5px;
  line-height: 45px;
  font-size: 18px;
  text-align: center;
}
.boxshow {
  width: 25px;
  height: 25px;
}
.rotateText {
  writing-mode: vertical-lr;
  // width: 300px;
  // height: 30px;
  // transform: rotate(-90deg);
}
.v1 {
  height: 25px;
  background-color: #2381b8;
  text-align: center;
  color: white;
}
.v2 {
  height: 25px;
  width: 10%;
  background-color: #eb1e63;
  text-align: center;
  color: white;
}
.v3 {
  height: 25px;
  width: 10%;
  background-color: #9c26b3;
  text-align: center;
  color: white;
}
.v4 {
  height: 25px;
  width: 10%;
  background-color: #2d9687;
  text-align: center;
  color: white;
}
.v5 {
  height: 25px;
  width: 10%;
  background-color: #000000;
  text-align: center;
  color: white;
}
.v6 {
  height: 25px;
  width: 10%;
  background-color: #886439;
  text-align: center;
  color: white;
}
.v7 {
  height: 25px;
  width: 10%;
  background-color: #d0af58;
  text-align: center;
  color: white;
}
.v8 {
  height: 25px;
  width: 10%;
  background-color: #f78800;
  text-align: center;
  color: white;
}
.v9 {
  height: 25px;
  width: 10%;
  background-color: #652076;
  text-align: center;
  color: white;
}
.v10 {
  height: 25px;
  width: 10%;
  background-color: #f7e900;
  text-align: center;
  color: white;
}
.btnOutGreen {
  width: 220px;
  height: 45px;
  border: 3px solid #2d9687;
  border-radius: 5px;
  line-height: 45px;
  font-size: 18px;
  text-align: center;
}
</style>
