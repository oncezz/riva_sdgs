<template>
  <q-page>
    <q-img
      src="../../public/regionalintegration.png"
      style="height:400px"
      class="relative-position"
    >
      <q-btn
        class="absolute"
        style="top:0px;left:0px"
        to="/"
        color="white"
        flat
        round
        size="35px"
        dense
        icon="home"
      />
      <div class="absolute-center bg-transparent" style="width:100%">
        <div class="font-48 text-weight-bold" align="center">Regional Integration</div>
        <div class="font-30" align="center">
          ESCAP DigiSRII provides insights on the structure and
          <br />progress of regional integration in Asia-Pacific
        </div>
      </div>
    </q-img>

    <div class="q-py-xl" align="center">
      <img src="../../public/underconstruction.png" style="width:50%" alt />
      <div align="center">
        <p class="font-header">UNDER CONSTRUCTION</p>
        <p class="font-content">PLEASE COME BACK LATER</p>
      </div>
    </div>
    <!-- FOOTER -->
    <my-footer></my-footer>
  </q-page>
</template>

<script>
import myFooter from "../components/footer";
export default {
  components: {
    myFooter,
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background-image: url("../../public/regional-bg.jpg");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
}
</style>