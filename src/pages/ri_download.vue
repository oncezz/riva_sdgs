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
              val="Sustainable"
              label="Sustainable Integration"
              color="secondary"
            />
          </div>
          <div class="col-3 font-16 fontw500">
            <q-radio
              v-model="input.type"
              val="Conventional"
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
              v-model="input.dataBase"
              val="digisrii"
              label="DigiSRII"
              color="secondary"
            />
          </div>
          <div class="col-3 q-pt-md row items-center font-16 fontw500">
            <q-radio
              v-model="input.dataBase"
              label="All Data"
              val="alldata"
              color="secondary"
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
              v-model="input.indicator"
              val="pair"
              label="Pair"
              color="secondary"
            />
          </div>
          <div class="col-2 row items-center font-16 fontw500">
            <q-radio
              v-model="input.dataBase"
              label="Dimension"
              val="dimention"
              color="secondary"
            />
          </div>
          <div class="col-2 row items-center font-16 fontw500">
            <q-radio
              v-model="input.dataBase"
              label="Indicator"
              val="indicator"
              color="secondary"
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
        type: "Sustainable",
        disaggregation: "country",
        dimensionPicked: [],
        dataBase: "digisrii",
        indicator: "pair",
      },
      score: [67, 89, 90, 78, 87, 75, 89, 90],
      student: [
        { id: 1, name: "Art", score: 56 },
        { id: 2, name: "Kae", score: 87 },
        { id: 3, name: "Mooyor", socre: 67 },
      ],
    };
  },
  methods: {
    doubleScore() {
      let doubleScore = [];
      for (let i = 0; i < this.score.length; i++) {
        doubleScore.push(this.score[i] * 2);
      }

      //***********Map */
      //Modify value in array
      if (this.score != null) {
        doubleScore = this.score.map((x) => (x / 150) * 100);
        console.log(doubleScore);
      }

      // //get value from object
      console.log(this.student.map((x) => x.name));

      // //***Sort */
      this.score.sort();
      console.log(this.score);
      // this.student.sort((a, b) => b.score - a.score);
      this.student.sort((a, b) => (a.name > b.name ? 1 : -1));
      console.log(this.student);

      //filter
      console.log(this.student.filter((x) => x.score > 80));

      console.log(this.score);
      let score2 = [...this.score];
      console.log(score2);
    },
  },
  mounted() {
    this.doubleScore();
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
