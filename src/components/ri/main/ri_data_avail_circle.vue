<template>
  <div class="q-px-md">
    <br />
    <div class="font-16"><b>Data availability</b></div>
    <div>
      Based on your selection, this group’s integration score will be based on
    </div>
    <br />
    <div class="q-px-md" align="center">
      <div class="notShowCircular" v-if="!isShowChart">
        <div style="height: 40%"></div>
        <div class="" align="center" style="width: 80%">
          Select your desired group of economics to<br />
          check data availability.
        </div>
      </div>
      <div class="showCircular" v-else>
        <q-circular-progress
          show-value
          font-size="36px"
          :value="score"
          size="200px"
          :thickness="0.36"
          color="orange"
          track-color="grey-5"
        >
          {{ score }}%
        </q-circular-progress>
      </div>
    </div>
    <br />
    <div align="center">of all possible reporter-partner pairs.</div>
    <div
      align="center"
      class="q-pb-md cursor-pointer"
      v-if="isShowChart"
      @click="goToURL()"
    >
      <u>Click here to see this group’s availabilitiy matrix</u>
    </div>
    <div v-else class="q-pb-md">&nbsp;</div>
  </div>
</template>

<script>
export default {
  props: ["score", "isShowChart"],
  data() {
    return {
      urlSend: "",
      id: "",
    };
  },
  methods: {
    goToURL() {
      // this.getURL();
      let dataGet = this.$q.localStorage.getItem("dataAvail");
      this.id = dataGet.key;
      this.$router.push("/ridataavailability/" + this.id);
    },
    // getURL() {
    //   this.id = "";
    //   if (this.type == "intragroup") {
    //     let uuid = require("uuid");
    //     this.id = uuid.v4();
    //     let saveData = {
    //       input: this.inputSend.input,
    //       database: "DigiSRII",
    //       type: "Economy group",
    //       disaggregation: "Pair",
    //       key: this.id,
    //     };

    //     this.$q.localStorage.clear();
    //     this.$q.localStorage.set("dataAvail", saveData);
    //   }
    // },
  },
  // watch: {
  //   inputSend: function (newData, oldData) {
  //     if (this.isShowChart) {
  //       this.getURL();
  //     }
  //   },
  // },
  // mounted() {
  //   this.getURL();
  // },
};
</script>

<style lang="scss" scoped>
.showCircular {
  margin: auto;
  height: 240px;
  line-height: 240px;
}
.notShowCircular {
  margin: auto;

  height: 240px;
  border: 1px dashed #cbcbcb;
}
</style>
