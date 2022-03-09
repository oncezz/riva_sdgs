<template>
  <div class="container shadow-2 bg-white" style="color: #757575">
    <ri-header></ri-header>
    <div class="font-36 q-ma-lg fontw700" align="center">Download data</div>
    <div class="row">
      <div class="selectDataDownloadBox q-pa-xl col-8">
        <div class="row items-center">
          <div class="col-4">
            <div class="font-16"><b>Integration type</b></div>
            <div>Select the desired type of integration</div>
          </div>
          <div class="col-4 font-16 fontw500">
            <q-radio
              v-model="input.type"
              val="sustainable"
              label="Sustainable Integration"
              color="secondary"
            />
          </div>
          <div class="col-3 font-16 fontw500">
            <q-radio
              v-model="input.type"
              val="conventional"
              label="Conventional Integration"
              color="secondary"
            />
          </div>
          <div class="col-4 q-pt-lg">
            <div class="font-16 fontw700">Database</div>
            <div class="font-14">Select database of interest</div>
          </div>
          <div class="col-4 q-pt-md row items-center font-16 fontw500">
            <q-radio
              v-model="input.database"
              val="digiSRII"
              label="DigiSRII"
              color="secondary"
              @input="selectDatabase()"
            />
          </div>
          <div class="col-3 q-pt-md row items-center font-16 fontw500">
            <q-radio
              v-model="input.database"
              label="All Data"
              val="allData"
              color="secondary"
              @input="selectDatabase()"
            />
          </div>
          <div class="col-4 q-pt-lg">
            <div class="font-16 fontw700">Level of disaggregation</div>
            <div class="font-14">
              Include all previous disaggregation levels
            </div>
          </div>
          <div class="col-2 row items-center font-16 fontw500">
            <q-radio
              v-model="input.disaggregation"
              val="pair"
              label="Pair"
              color="secondary"
              :disable="disaggregationEnable"
            />
          </div>
          <div class="col-2 row items-center font-16 fontw500">
            <q-radio
              v-model="input.disaggregation"
              label="Dimension"
              val="dimension"
              color="secondary"
              :disable="disaggregationEnable"
            />
          </div>
          <div class="col-2 row items-center font-16 fontw500">
            <q-radio
              v-model="input.disaggregation"
              label="Indicator"
              val="indicator"
              color="secondary"
              :disable="disaggregationEnable"
            />
          </div>
        </div>
        <div style="height: 100px"></div>
        <div align="center">
          <div class="donwloadDataBtn font-24 fontw700">Download data</div>
        </div>
      </div>
    </div>
    <div style="height: 100px"></div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri/main/ri_header";
import myFooter from "../components/footer";
export default {
  components: {
    riHeader,
    myFooter,
  },
  data() {
    return {
      input: {
        type: "sustainable",
        database: "digiSRII",
        disaggregation: "pair",
      },
      disaggregationEnable: false,
    };
  },
  methods: {
    selectDatabase() {
      if (this.input.database == "allData") {
        this.disaggregationEnable = true;
      } else {
        this.disaggregationEnable = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.selectDataDownloadBox {
  margin: auto;
  border: 2px solid #c4c4c4;
  box-sizing: border-box;
  height: 500px;
}

.fontw700 {
  font-weight: 700;
}
.fontw500 {
  font-weight: 500;
}
.donwloadDataBtn {
  cursor: pointer;
  width: 347px;
  height: 49px;
  line-height: 49px;
  background: #2d9687;
  border: 3px solid #2d9687;
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
}
</style>
