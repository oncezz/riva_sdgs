<template>
  <q-page class="relative-position">
    <div class="">
      <div class="absolute-top" style="height: calc(100vh - 210px)">
        <video id="myVideo" autoplay loop muted>
          <source type="video/mp4" src="../../public/bg-hd.webm" />
        </video>

        <div class="bg-white" style="padding-top: 20px; padding-left: 20px">
          <q-img style="width: 150px" src="../../public/logo.png"></q-img>
        </div>

        <div class="absolute-center" align="center">
          <div
            style="
              background-color: rgba(44, 42, 44, 0.6);
              width: 600px;
              border-radius: 5px;
            "
            class="text-white row"
          >
            <div style="width: 100%" class="q-pt-md">
              <img src="../../public/logobig2.png" width="400px" alt />
              <div style="height: 15px">&nbsp;</div>
            </div>
            <div class="row justify-center" style="width: 100%">
              <div align="center" class="col-6" v-if="false">
                <q-btn
                  @click.stop="goToRI()"
                  style="
                    width: 250px;
                    background-color: #000000;
                    border: 1px solid #f4b802;
                  "
                  label="REGIONAL INTEGRATION"
                  class="font-content"
                  no-caps
                ></q-btn>
              </div>
              <div align="center" class="col-6">
                <q-btn
                  @click.stop="goToGlobal()"
                  style="
                    width: 250px;
                    background-color: #000000;
                    border: 1px solid #f4b802;
                  "
                  label="VALUE CHAIN ANALYZER"
                  class="font-content"
                  no-caps
                ></q-btn>
              </div>
            </div>
            <div style="height: 15px">&nbsp;</div>
          </div>
        </div>
      </div>
      <!------------------------- footer --------------------------->
      <div class="bottomDiv"><Footer></Footer></div>
      <!-------------------------- end footer  --------------------->
    </div>
  </q-page>
</template>

<script>
import Footer from "src/components/footer.vue";
import myFooter from "../components/footer2";
export default {
  components: {
    myFooter,
    Footer,
  },
  data() {
    return {
      isRiva: true,
    };
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
    },
    togglePage() {
      this.isRiva = !this.isRiva;
    },
  },
  mounted() {
    document
      .getElementById("myVideo")
      .addEventListener("contextmenu", (event) => event.preventDefault());
  },
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
.bottomDiv {
  position: relative;
  top: calc(100vh - 210px);
}
.rightTagR {
  cursor: pointer;
  width: 70px;
  height: 100vh;
  background: url("../../public/tagBgR.png");
}
.rightTag {
  cursor: pointer;

  width: 70px;
  height: 100vh;
  background: url("../../public/tagBg.png");
}
.imgTag {
  transition: 0.3s;
  height: 100vh;
}
.imgTag:hover {
  transform: translateX(-20px);
}
.slideInRight {
  animation-duration: 2s;
}
.slideOutLeft {
  animation-duration: 2s;
}
.fadeInRight {
  animation-duration: 2s;
}
.fadeOutLeft {
  animation-duration: 2s;
}
.fadeOut {
  animation-delay: 2s;
  animation-duration: 2s;
}
// animate --------------------
.bigTextSdgs {
  font-weight: bold;
  font-size: 50px;
  line-height: 59px;
  text-align: center;
  color: #4185c2;
}
.joinBtn {
  width: 250px;
  height: 70px;
  font-size: 30px;
  // line-height: 40px;
  border-radius: 10px;
}
A {
  text-decoration: none;
}
</style>
