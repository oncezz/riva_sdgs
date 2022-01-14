<template>
  <q-layout view="lHh Lpr lFf" style="height:100%">
    <!-- <q-footer class="bg-transparent" reveal id="footerBar" v-show="showNavbar">
      <div class="footer-bg container">
        <div style="height:55px;background-color:rgba(0,0,0,0.70);border-bottom:2px solid white">
          <div class="row q-pr-lg justify-end items-center fit">
            <div style="width:90px" align="right">
              <img style="width:32px" src="../../public/fb-ico.png" class="cursor-pointer" />
            </div>
            <div style="width:90px" align="right">
              <img style="width:32px" src="../../public/twitter-ico.png" alt class="cursor-pointer" />
            </div>
            <div style="width:90px" align="right">
              <img style="width:32px" src="../../public/linkin-ico.png" alt class="cursor-pointer" />
            </div>
          </div>
        </div>
        <q-toolbar class="q-px-sm q-pb-sm q-pt-sm items-center">
          <div class="q-mx-lg cursor-pointer" @click="toUnescap()" style="max-width:180px">
            <q-img style="width:162px" src="../../public/logo.png"></q-img>
          </div>
          <div class="q-mx-lg cursor-pointer" @click="toFealac()" style="max-width:180px">
            <q-img style="width:162px" src="../../public/fealac.png"></q-img>
          </div>
          <q-space />
          <div class="row full-width font-content" align="right">
            <div class="col-12 q-px-md">
              <div class="row justify-between">
                <div class="text-white" @click="showAboutDialog()" style="text-decoration:none;">
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
                <div
                  @click="toEscapTrade()"
                  class="text-white cursor-pointer"
                  style="text-decoration:none;"
                >
                  <span>
                    <q-tooltip content-class="bg-indigo">
                      <span class="text-subtitle1">ESCAP Trade, Investment and Innovation Division</span>
                    </q-tooltip>ESCAP TIID
                  </span>
                </div>
                <div
                  @click="toTradeEtoolsPolicy()"
                  class="text-white cursor-pointer"
                  style="text-decoration:none;"
                >
                  <span>
                    <q-tooltip content-class="bg-indigo" style="font-size:14px">
                      <span class="text-subtitle1">ESCAP Trade Policy and Integration</span>
                    </q-tooltip>ESCAP TPI
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
        <div class="flex items-center" style="min-height:90px;background-color:rgba(0,0,0,0.70)">
          <div class="row text-white q-py-sm" style="padding-left:35px">
            <div class="col-5">
              <div class="font-footer">CONTACT US</div>
              <div style="font-size:12px">
                The Trade, Investment and Innovation Division of the United Nations Economic
                and Social Commission for Asia and the Pacific, located in Bangkok, Thailand. For questions, please contact us at escap-xxx@un.org or visit www.unescap.org
              </div>
            </div>
            <div class="col-2"></div>
            <div class="col-5 q-pr-md">
              <div class="font-footer">DESCLAIMER</div>
              <div style="font-size:12px">
                This portal is currently in a testing-phase and is best viewed on desktop devices in
                modern web browsers such as Firefox and Chrome with JavaScript enabled.
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-footer>-->

    <q-page-container class="relative-position">
      <router-view class="container shadow-10" />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",

  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.checkPlatform();
    // window.addEventListener("scroll", this.onScroll);
  }
};
</script>

<style>
.brx {
  border: 1px solid red;
}
.footer-bg {
  background-image: url("../../public/footer.jpg");
  background-size: inherit;
  background-position: bottom;
}

@media print {
  .shadow-10 {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>
