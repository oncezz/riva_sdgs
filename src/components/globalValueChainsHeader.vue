<template>
  <div>
    <div class="bg flex flex-center relative-position" style="height:390px">
      <div class="q-mx-lg absolute" style="max-width:180px;top:22px;left:0px;">
        <q-img style="width:150px" src="../../public/logo.png"></q-img>
      </div>
      <q-btn
        class="absolute"
        style="top:0px;left:170px"
        to="/"
        color="white"
        flat
        round
        size="35px"
        dense
        icon="home"
      />
      <div class="row justify-center">
        <div
          class="text-white col-12 text-stroke"
          align="center"
          style="font-size:48px"
        >
          Global Value Chains
        </div>
        <div align="center" class="text-stroke text-white font-graph q-pt-lg">
          Gain insight into your economy’s participation in global value chains
          (GVCs).
          <br />Uncover the sources of intermediate inputs and destinations of
          domestic value-added.
        </div>
      </div>

      <div
        class="absolute q-pa-md text-white"
        style="top:0px;"
        :style="isShowTinaLink ? 'right:140px' : 'right:0px'"
      >
        <q-btn
          :disable="isDisableShare"
          label="share"
          @click="isShowShareOptions = true"
          outline
          icon="fas fa-share"
        ></q-btn>
      </div>
      <div
        class="absolute q-pa-md text-white"
        style="top:0px;right:0px"
        v-if="isShowTinaLink"
      >
        <q-btn
          :disable="isDisableTina"
          label="TINA Link"
          no-caps
          outline
          icon="fas fa-share"
          @click="toTinaLink()"
        ></q-btn>
      </div>
      <div class="absolute q-pa-md text-white" style="bottom:50px;left:0px">
        <q-btn
          label="User guide"
          no-caps
          outline
          @click="goToIntro()"
          style="width:180px;"
        ></q-btn>
      </div>
      <div class="absolute q-pa-md text-white" style="bottom:0px;left:0px">
        <q-btn
          label="Demonstration video"
          no-caps
          outline
          @click="goToDemo()"
          style="width:180px;"
        ></q-btn>
      </div>
      <div class="absolute q-pa-md text-white" style="bottom:100px;right:0px">
        <q-btn
          label="Download data"
          no-caps
          outline
          @click="goToDownload()"
          style="width:150px;"
        ></q-btn>
      </div>
      <div class="absolute q-pa-md text-white" style="bottom:50px;right:0px">
        <q-btn
          label="Country briefs"
          no-caps
          outline
          @click="goToCountryBriefs()"
          style="width:150px;"
        ></q-btn>
      </div>
      <div class="absolute q-pa-md text-white" style="bottom:0px;right:0px">
        <q-btn
          label="Techincal notes"
          no-caps
          outline
          @click="toNote()"
          style="width:150px;"
        ></q-btn>
      </div>
    </div>

    <q-dialog v-model="isShowShareOptions" persistent>
      <q-card class="relative-position" style="width:400px">
        <q-icon
          class="absolute cursor-pointer z-top"
          style="right:5px;top:5px"
          name="fas fa-times"
          size="16px"
          color="grey-8"
          flat
          v-close-popup
        ></q-icon>
        <q-card-section>
          <div class="q-pb-sm">Share</div>
          <div class="row">
            <div align="center" class="col fb-hover cursor-pointer">
              <ShareNetwork
                network="facebook"
                :url="$q.sessionStorage.getItem('shareLink')"
                hashtags
                title
              >
                <img src="../../public/facebook.png" alt />
                <div align="center">Facebook</div>
              </ShareNetwork>
            </div>
            <div align="center" class="col tw-hover cursor-pointer q-px-lg">
              <ShareNetwork
                network="twitter"
                :url="$q.sessionStorage.getItem('shareLink')"
                title
                description
                quote="The hot reload is so fast it\'s near instant. - Evan You"
                hashtags
              >
                <img src="../../public/twitter.png" alt />
                <div align="center">Twitter</div>
              </ShareNetwork>
            </div>
            <div align="center" class="col link-hover cursor-pointer">
              <ShareNetwork
                network="linkedIn"
                :url="$q.sessionStorage.getItem('shareLink')"
                hashtags
                title
              >
                <img src="../../public/linkedin.png" alt />
                <div align="center">LinkedIn</div>
              </ShareNetwork>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row bg-grey-4 q-pa-sm">
            <div
              class="col"
              style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap"
              id="shareLink"
            >
              {{ $q.sessionStorage.getItem("shareLink") }}
            </div>
            <div
              style="width:50px"
              class="text-blue cursor-pointer"
              @click="copyLink()"
            >
              <b>COPY</b>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isShowDemo" persistent>
      <q-card style="width:1500px; height:380px;">
        <q-icon
          class="absolute cursor-pointer z-top"
          style="right:5px;top:5px"
          name="fas fa-times"
          size="24px"
          color="grey-8"
          flat
          v-close-popup
        ></q-icon>
        <div class="q-pt-xl" align="center">
          <video controls style="width:95%">
            <source src="../../public/demo.webm" type="video/mp4" />
          </video>
        </div>
      </q-card>
      <!-- <div style="width:800px;">
        <q-icon
          class="absolute cursor-pointer z-top"
          style="right:5px;top:5px"
          name="fas fa-times"
          size="16px"
          color="grey-8"
          flat
          v-close-popup
        ></q-icon>
      </div>
      <div>
        <!-- <video controls style="width:80%">
          <source src="../../public/demo.mp4" type="video/mp4" />
        </video> -->
      <!-- </div> -->
      -->
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isShowTinaLink: {
      type: Boolean,
      default: true
    },
    isDisableTina: {
      type: Boolean,
      default: true
    },
    isDisableShare: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShowDemo: false,
      isShowShareOptions: false,
      link: window.location.href
    };
  },
  methods: {
    goToDemo() {
      this.isShowDemo = true;
    },
    goToDownload() {
      this.$router.push("/download");
    },
    goToCountryBriefs() {
      this.$router.push("/countrybriefs");
    },
    toTinaLink() {
      let exp_country = this.$q.sessionStorage.getItem("expe");
      let imp_country = this.$q.sessionStorage.getItem("impe");

      window.open(
        "https://tina.tiid.org/app/dashboard/" +
          exp_country +
          "-" +
          imp_country +
          "/current-trade/"
      );
    },
    toNote() {
      window.open("https://riva.negotiatetrade.org/note/");
    },
    goToIntro() {
      window.open("https://riva.negotiatetrade.org/intro/");
    },
    copyLink() {
      var range = document.createRange();
      range.selectNode(document.getElementById("shareLink"));
      window.getSelection().removeAllRanges(); // clear current selection
      window.getSelection().addRange(range); // to select text
      document.execCommand("copy");
      window.getSelection().removeAllRanges(); // to deselect
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.bg {
  background-color: #04284d;
}
.fb-hover :hover {
  transform: scale(1.1);
}
.tw-hover :hover {
  transform: scale(1.1);
}
.link-hover :hover {
  transform: scale(1.1);
}
.diashow {
  width: 800px;
}
</style>
