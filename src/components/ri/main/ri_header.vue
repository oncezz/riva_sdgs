<template>
  <div>
    <div class="bgblue relative-position">
      <div style="padding-top: 20px; padding-left: 20px" class="row">
        <div class="col-1" style="width: 150px">
          <img src="../../../../public/logo.png" style="height: 39px" alt="" />
        </div>
        <div class="col-6">
          <div
            class="cursor-pointer"
            @click="gotoMainPage()"
            style="width: 50px"
          >
            <img src="../../../../public/home.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="font-36" align="center">Regional Integration</div>
          <div class="font-18" align="center">
            ESCAP DIGISRII provides insights on the structure and<br />progress
            of integration for Asia and the Pacific economies.
          </div>
        </div>
        <div class="absolute-right" style="width: 160px; padding-top: 20px">
          <div class="whitebox cursor-pointer">Demonstration Video</div>
          <div style="height: 5px"></div>
          <div class="whitebox cursor-pointer">User notes</div>
          <div style="height: 5px"></div>
          <div class="whitebox cursor-pointer">Technical notes</div>
          <div style="height: 5px"></div>
          <div
            class="whitebox cursor-pointer"
            :class="{ greenbox: page == 'data' }"
            @click="gotoDataAvailablity()"
          >
            Data availability
          </div>
          <div style="height: 5px"></div>
          <div
            class="whitebox cursor-pointer"
            :class="{ greenbox: page == 'download' }"
            @click="gotoDownload()"
          >
            Download data
          </div>
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
    <div class="row" style="height: 85px; background-color: #404040">
      <div
        class="col-4 borderwhite cursor-pointer text-white brx"
        :style="menu == 1 ? 'background-color:#2D9687' : ''"
        align="center"
        @click="gotoIntra()"
      >
        <div class="row" style="width: 320px">
          <div class="q-pa-sm">
            <img src="../../../../public/icon01.svg" alt="" />
          </div>
          <div align="left">
            <div class="font-16 q-pt-sm">Intra-group integration</div>
            <div class="font-12">
              Select a group of economies to<br />
              assess intra-group integration
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-4 borderwhite cursor-pointer text-white"
        :style="menu == 2 ? 'background-color:#2D9687' : ''"
        align="center"
        @click="gotoPartner()"
      >
        <div class="row" style="width: 350px">
          <div class="q-pa-md">
            <img src="../../../../public/icon02.svg" alt="" />
          </div>
          <div align="left">
            <div class="font-16 q-pt-sm">Economy-partner(s) integration</div>
            <div class="font-12">
              Select one or more economies to examine<br />
              integration with other economies
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-4 borderwhite cursor-pointer text-white"
        :style="menu == 3 ? 'background-color:#2D9687' : ''"
        align="center"
        @click="gotoBuildYourOwn()"
      >
        <div class="row" style="width: 350px">
          <div class="q-pa-md">
            <img src="../../../../public/icon03.svg" alt="" />
          </div>
          <div align="left">
            <div class="font-16 q-pt-sm">Build your own</div>
            <div class="font-12">
              Select specific dimensions and any combination<br />
              of economies to build your own integration index
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["menu"],
  data() {
    return {
      page: "",
    };
  },
  methods: {
    gotoMainPage() {
      this.$router.push("/");
    },
    gotoIntra() {
      this.$router.push("/riintragroup");
    },
    gotoPartner() {
      this.$router.push("/rieconomypartner");
    },
    gotoBuildYourOwn() {
      this.$router.push("/ribuildyourown");
    },
    gotoDataAvailablity() {
      this.$router.push("/ridataavailability");
    },
    gotoDownload() {
      this.$router.push("/ridownload");
    },
  },
  mounted() {
    if (this.$route.name == "ridataavailability") {
      this.page = "data";
    } else if (this.$route.name == "ridownload") {
      this.page = "download";
    }
  },
};
</script>

<style lang="scss" scoped>
.bgblue {
  height: 230px;
  background-color: #04284d;
  color: white;
}
.whitebox {
  height: 35px;
  width: 150px;
  border: 1px solid white;
  border-radius: 3px;
  line-height: 35px;
  text-align: center;
}
.whiteboxLeft {
  height: 35px;
  width: 150px;
  border: 1px solid white;
  border-radius: 3px;
  line-height: 35px;
  text-align: center;
  position: relative;
  left: 10px;
  top: 120px;
}
.greenbox {
  background: #2d9687;
}
.borderwhite {
  border: 1px solid white;
  height: 85px;
}
</style>
