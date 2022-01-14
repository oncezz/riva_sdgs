<template>
  <div class="bg-transparent">
    <div class="footer-bg container">
      <div
        style="height:40px;background-color:rgba(0,0,0,0.70);border-bottom:1px solid white"
      >
        <div class="row q-pr-lg items-center fit">
          <div class="row" style="width:100%">
            <div class="text-white q-px-md col" align="left">
              <img src="../../public/rivabanner.png" style="height:38px;" alt />
            </div>
            <div class="row" style="width:270px" align="right">
              <div style="width:90px;" class="q-pt-sm" align="right">
                <ShareNetwork
                  network="facebook"
                  title
                  url="https://riva.negotiatetrade.org"
                >
                  <img
                    style="width:22px"
                    src="../../public/fb-ico.png"
                    class="cursor-pointer"
                  />
                </ShareNetwork>
              </div>
              <div style="width:90px" align="right" class="q-pt-sm">
                <ShareNetwork
                  network="twitter"
                  url="https://riva.negotiatetrade.org"
                  title
                  description
                  quote
                >
                  <img
                    style="width:22px"
                    src="../../public/twitter-ico.png"
                    alt
                    class="cursor-pointer"
                  />
                </ShareNetwork>
              </div>
              <div style="width:90px" align="right" class="q-pt-sm">
                <ShareNetwork
                  network="linkedIn"
                  url="https://riva.negotiatetrade.org"
                  title
                >
                  <img
                    style="width:22px"
                    src="../../public/linkin-ico.png"
                    alt
                    class="cursor-pointer"
                  />
                </ShareNetwork>
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-toolbar class="q-px-md items-center" style="height:70px;">
        <!-- <div
          class="q-mx-lg cursor-pointer"
          @click="toUnescap()"
          style="max-width:180px"
        >
          <q-img style="width:120px" src="../../public/logo.png"></q-img>
        </div> -->
        <div
          class="q-ml-lg cursor-pointer "
          @click="toFealac()"
          style="max-width:210px"
        >
          <q-img style="width:200px" src="../../public/fealac.png"></q-img>
        </div>
        <div class="q-px-md">
          <q-img style="width:45px" src="../../public/12x.png"></q-img>
        </div>
        <div>
          <q-img style="width:50px" src="../../public/adb.png"></q-img>
        </div>
        <div style="width:200px;"></div>
        <q-space />
        <div class="row full-width font-content" align="right">
          <div class="col-12 q-px-md">
            <div class="row justify-between">
              <div
                class="text-white"
                @click="showAboutDialog()"
                style="text-decoration:none;"
              >
                <span class="cursor-pointer">About</span>
              </div>
              <div
                to="/"
                @click="toTradeEtools()"
                class="text-white cursor-pointer"
                style="text-decoration:none;"
              >
                <span>Trade-etools</span>
              </div>
              <!-- <div
                @click="toEscapTrade()"
                class="text-white cursor-pointer"
                style="text-decoration:none;"
              >
                <span>
                  <q-tooltip content-class="bg-indigo">
                    <span class="text-subtitle1"
                      >ESCAP Trade, Investment and Innovation Division</span
                    > </q-tooltip
                  >ESCAP TIID
                </span>
              </div> -->
              <div
                @click="toTradeEtoolsPolicy()"
                class="text-white cursor-pointer"
                style="text-decoration:none;"
              >
                <span>
                  <q-tooltip content-class="bg-indigo" style="font-size:14px">
                    <span class="text-subtitle1"
                      >Trade Intelligence and Negotiation Advisor</span
                    > </q-tooltip
                  >TINA
                </span>
              </div>
              <div
                @click="showTermOfUseDialog()"
                class="text-white cursor-pointer"
                style="text-decoration:none;"
              >
                <span>Terms of use</span>
              </div>
            </div>
          </div>
        </div>
      </q-toolbar>
      <div
        class="flex items-center"
        style="min-height:70px;background-color:rgba(0,0,0,0.70)"
      >
        <div class="row text-white q-py-sm" style="padding-left:35px">
          <div class="col-5">
            <div class="font-footer">ABOUT RIVA</div>
            <div style="font-size:11px">
              RIVA is developed by the Trade, Investment and Innovation Division
              of the United Nations Economic and Social Commission for Asia and
              the Pacific, in collaboration with the Asian Development Bank,
              Economic Commission for Latin America and the Caribbean, Economic
              Commission for Africa, and Forum for East Asia-Latin America
              Cooperation. For questions, please contact us at
              <a
                href="mailto: escap-tiid@un.org"
                style="text-decoration:underline;color:white"
                >escap-tiid@un.org</a
              >
            </div>
          </div>
          <div class="col-2"></div>
          <div class="col-5 q-pr-md">
            <div class="font-footer">DISCLAIMER</div>
            <div style="font-size:11px">
              ESCAP gratefully acknowledges use of data from the ADB MRIO
              database to analyze value chains, and databases of ILO, IMF, ITU,
              OECD, UNESCAP, UN Comtrade, UNCTAD and World Bank to analyze
              regional integration
            </div>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="isShowAboutDialog">
      <q-card style="width:100%;min-width:750px;border-radius:15px">
        <q-card-section>
          <div
            class="bg-white q-pa-md"
            style="border-radius:10px;"
            align="center"
          >
            <div>
              <p class="font-graph">About</p>
              <div style="width:90%;border-bottom:2px solid #283891"></div>
              <div style="height:20px"></div>
              <span class="font-content"
                >RIVA Value Chain Analyzer, version 1.0, is an online tool
                developed by ESCAP, in collaboration with ECLAC, and sponsored
                by FEALAC. It has been designed to support policy makers,
                analysts and researchers to better understand their economy's
                integration in global value chains (GVCs). RIVA Value Chain
                Analyzer provides data and indicators based on estimated trade
                in value added flows between 72 economies in 38 sectors for
                2007, 2011 and 2017.</span
              >
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isShowTermOfUseDialog">
      <q-card style="width:100%;min-width:750px;border-radius:15px">
        <q-card-section>
          <div
            class="row justify-center items-center bg-white q-pa-md"
            style="border-radius:10px;"
            align="center"
          >
            <div>
              <p class="font-graph">Terms of use</p>
              <div style="width:90%;border-bottom:2px solid #283891"></div>
              <p class="font-content q-pt-md" align="left">
                All users may publish information taken directly or derived from
                the platform, on the condition that:
              </p>
              <ul class="font-content" align="left">
                <li>
                  The platform in acknowledged, cited as ESCAP RIVA, accessed
                  (month year), available at
                  <u class="cursor-pointer" @click="gotoRiva()"
                    >riva.negotiatetrade.org</u
                  >
                </li>
                <li>
                  Any conclusions or analyses based on the data and
                  visualizations provided are accompanied by a disclaimer
                  stating that they are the responsibility of the authors and do
                  not necessarily represent the opinion of the United Nations.
                </li>
                <li>
                  Any re-dissemination by third parties of the data based on
                  data downloads which goes beyond the purpose of publication of
                  analytical work must be approved by the United Nations
                  Secretariat prior to such re-dissemination.
                </li>
              </ul>
              <div class="font-content" align="left">
                Requests can be sent to:
                <br />Trade, Investment and Innovation Division, <br />United
                Nations ESCAP, Email: escap-tiid@un.org
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowAboutDialog: false,
      isShowTermOfUseDialog: false
    };
  },
  methods: {
    gotoRiva() {
      window.open("https://riva.negotiatetrade.org");
    },
    toFealac() {
      window.open("https://www.fealac.org/new/m/index.do");
    },
    toUnescap() {
      window.open("https://www.unescap.org");
    },
    showAboutDialog() {
      this.isShowAboutDialog = true;
    },
    showTermOfUseDialog() {
      this.isShowTermOfUseDialog = true;
    },
    toEscapTrade() {
      window.open("https://unescap.org/our-work/trade-investment-innovation");
    },
    toTradeEtools() {
      window.open("https://artnet.unescap.org/databases");
    },
    toTradeEtoolsPolicy() {
      window.open("https://tina.trade/");
    }
  }
};
</script>

<style lang="scss" scoped>
.footer-bg {
  background-image: url("../../public/footer.jpg");
  background-size: inherit;
  background-position: bottom;
}
</style>
