<template>
  <div>
    <!-- mobile  -->
    <div
      class="mobile-only lt-sm"
      style="height: 100vh; background-color: white"
    >
      <div class="headbarMobile">
        <div>
          <img
            class="q-ma-sm"
            height="39px"
            src="../../public/img/logoWhite.png"
            alt=""
          />
        </div>
      </div>
      <div align="center" class="q-ma-md">
        <img src="../../public/img/monitorIcon.png" alt="" />
      </div>
      <div class="row" style="color: #757575">
        <div class="col-1"></div>
        <div class="col">
          <div class="font-16" style="font-weight: 500">
            This website is designed for desktop only.
          </div>
          <div class="font-14" style="font-weight: 400">
            It can be viewed from mobile devices in the <br />
            following ways,
          </div>
        </div>
        <div class="col-1"></div>
      </div>
      <div style="height: 20px"></div>
      <div class="q-ma-sm">
        <div class="row items-center" style="color: #757575">
          <div class="col-2" align="center">
            <img src="../../public/img/chromeIcon.png" alt="" />
          </div>
          <div class="col">
            <div class="font-18" style="font-weight: 500">On Google Chrome</div>
            <div class="font-14" style="font-weight: 400">
              click on the ‘...’ <br />
              option in the bottom right corner of the screen and select the
              ‘Request Desktop Site’ option from the list of options.
            </div>
          </div>
          <div class="col-1"></div>
        </div>
        <div style="height: 20px"></div>
        <div class="row items-center" style="color: #757575">
          <div class="col-2" align="center">
            <img src="../../public/img/safariIcon.png" alt="" />
          </div>
          <div class="col">
            <div class="font-18" style="font-weight: 500">On Safari</div>
            <div class="font-14" style="font-weight: 400">
              click on the ‘AA’ <br />
              option in the top left corner of the screen and select the
              ‘Request Desktop Site’ option from the list of options.
            </div>
          </div>
          <div class="col-1"></div>
        </div>
      </div>
    </div>
    <!-- tablet  -->
    <div
      class="mobile-only gt-xs"
      style="height: 100vh; background-color: white"
    >
      <div class="headbarTablet">
        <img
          class="q-ma-sm"
          width="230px"
          src="../../public/img/logoWhite.png"
          alt=""
        />
      </div>
      <div align="center">
        <div>
          <img
            class="q-pt-xl"
            width="500px"
            src="../../public/img/monitorIcon.png"
            alt=""
          />
        </div>
        <div class="q-pt-lg" style="color: #757575">
          <div class="font-24" style="font-weight: 500">
            This website is designed for desktop only.
          </div>
          <div class="font-18" style="font-weight: 400">
            It can be viewed from mobile devices in the following ways,
          </div>
        </div>
      </div>
      <div class="q-pt-lg row items-center">
        <div class="col-2" align="right">
          <img width="70px" src="../../public/img/chromeIcon.png" alt="" />
        </div>
        <div style="width: 30px"></div>
        <div class="col" style="color: #757575">
          <div class="font-18" style="font-weight: 500">On Google Chrome</div>
          <div class="font-14" style="font-weight: 400">
            click on the ‘...’ option in the bottom right corner of the screen
            and select the ‘Request Desktop Site’ option from the list of
            options.
          </div>
        </div>
        <div class="col-2"></div>
      </div>
      <div class="q-pt-lg row items-center">
        <div class="col-2" align="right">
          <img width="70px" src="../../public/img/safariIcon.png" alt="" />
        </div>
        <div style="width: 30px"></div>
        <div class="col" style="color: #757575">
          <div class="font-18" style="font-weight: 500">On Safari</div>
          <div class="font-14" style="font-weight: 400">
            click on the ‘AA’ option in the top left corner of the screen and
            select the ‘Request Desktop Site’ option from the list of options.
          </div>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$q.platform.is.desktop) {
      this.$router.go(-1);
    }
  },
};
</script>

<style lang="scss" scoped>
.headbarMobile {
  width: 100%;
  height: 54px;
  background: #030b3c;
}
.headbarTablet {
  width: 100%;
  height: 86px;
  background: #030b3c;
}
</style>
