<template>
  <q-page style="overflow:hidden">
    <div class="row">
      <div style="width:calc(100% - 70px)">
        <div class="relative-position" style="height:calc(100vh - 210px)">
          <video id="myVideo" autoplay loop muted>
            <source type="video/mp4" src="../../public/bg-hd.webm" />
          </video>

          <div
            style="padding-top:20px;padding-left:20px"
            class="absolute text-white"
          >
            <q-img style="width:150px" src="../../public/logo.png"></q-img>
          </div>

          <div class="absolute absolute-center" align="center">
            <div
              style="background-color:rgba(44,42,44,0.6);width:600px;border-radius:5px;"
              class="text-white row"
            >
              <div style="width:100%" class="q-pt-md">
                <img src="../../public/logobig2.png" width="400px" alt />
                <div style="height:15px">&nbsp;</div>
              </div>
              <div class="row justify-center" style="width:100%">
                <!-- <div align="center" class="col-6">
              <q-btn
                @click.stop="goToRI()"
                style="width:250px;background-color:#000000;border:1px solid #F4B802"
                label="REGIONAL INTEGRATION"
                class="font-content"
                no-caps
              ></q-btn>
            </div> -->
                <div align="center" class="col-6">
                  <q-btn
                    @click.stop="goToGlobal()"
                    style="width:250px;background-color:#000000;border:1px solid #F4B802"
                    label="VALUE CHAIN ANALYZER"
                    class="font-content"
                    no-caps
                  ></q-btn>
                </div>
              </div>
              <div style="height:15px">&nbsp;</div>
            </div>
          </div>
        </div>

        <my-footer class="absolute-bottom"></my-footer>
      </div>
      <div style="width:70px; height:100vh;" class="brx bg-red">
        <div style="" class="textSDGs brx">
          TRADE AND THE SUSTAINABLE DEVELOPMENT GOAL
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import myFooter from "../components/footer2";
export default {
  components: {
    myFooter
  },
  methods: {
    goToRI() {
      this.$router.push("/riintragroup");
    },
    goToRegional() {
      this.$router.push("/regional-integration");
    },
    goToGlobal() {
      this.$router.push("/gvc-links");
    },
    goToDownload() {
      this.$router.push("/download");
    },
    goToCountryBriefs() {
      this.$router.push("/countrybriefs");
    }
  },
  mounted() {
    document
      .getElementById("myVideo")
      .addEventListener("contextmenu", event => event.preventDefault());
  }
};
</script>

<style lang="scss" scoped>
.bg {
  background-image: url("../../public/bg-world.jpg");
  background-size: cover;
  background-position: center;
}
#myVideo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  min-height: 100%;
}
.textSDGs {
  position: relative;
  top: 300px;
  // width: 300px;
  height: 300px;
  transform: rotate(90deg);
}
</style>
