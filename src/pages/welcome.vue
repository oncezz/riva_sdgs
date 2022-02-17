<template>
  <q-page class="relative-position">
    <transition
      appear
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutLeft"
    >
      <div class="row" v-show="isRiva">
        <div class="" style="width: calc(100% - 70px)">
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
                  <div align="center" class="col-6">
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
        <div class="rightTagR absolute-right" style="" @click="togglePage()">
          <div class="absolute-right">
            <div class="imgTag">
              <img src="../../public/tagSdgs.png" height="100%" alt="" />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition
      appear
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutLeft"
    >
      <div
        class="absolute-top"
        v-show="!isRiva"
        style="height: 100vh; background: #f2f2f2"
      >
        <div class="row">
          <div class="absolute-left" style="width: calc(100% - 70px)">
            <div class="row" style="height: 25vh">
              <div class="col-3 q-pa-md" style="">
                <img src="../../public/img/logoBlack.png" height="" alt="" />
              </div>
              <div class="col q-pt-md">
                <img
                  src="../../public/img/text.png"
                  style="height: 200px"
                  alt=""
                />
              </div>
              <div class="col-3"></div>
            </div>
            <div class="bigTextSdgs" style="height: 15vh">
              Making trade an effective means of implemention <br />
              achieve the SDGs
            </div>
            <div class="row q-px-xl" style="height: 40vh">
              <div class="">
                <img
                  src="../../public/img/colorWorld.png"
                  height="350px"
                  alt=""
                />
              </div>
              <div class="col q-pa-md q-px-xl">
                <span class="text-h5">About the course</span><br />

                <span class="text-h6"
                  >13 Modules (Average 15-20 minutes per modules)</span
                ><br /><br />

                <p class="text-body1">
                  This course employs a non-technical approach to build basic
                  knowledge, mindsets, general capacities of policymakers and a
                  broad range of stakeholders to understand the roles and
                  limitations of trade and trade policy in promote a country's
                  achievement of the SDGs. The course consists of 4 basic- and 9
                  intermediate levels modules. Each module provides multi-media
                  lecture that include an overview of conceptual linkages, cases
                  and examples, and a guide to supplementary readings. Upon
                  completing all modules, participants will learn about the
                  linkages between trade and sustainable development, especially
                  in the context of SDGs. Participants will understand the roles
                  of trade in helping a country to achieve SDGs and aware about
                  issues that influence their effectiveness, and important
                  points for consideration when designing and implementing trade
                  policy for achieving sustainable development.
                </p>
              </div>
            </div>
            <div class="q-px-xl" align="right">
              <a href="https://yaksaconcept.com/sdgs/#/course" target="blank"
                ><q-btn
                  class="joinBtn"
                  color="primary"
                  label="join our class"
                  no-caps
              /></a>
            </div>
          </div>
          <div class="rightTag absolute-right" @click="togglePage()">
            <div class="absolute-right">
              <div class="imgTag">
                <img src="../../public/tagRiva.png" alt="" height="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
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
