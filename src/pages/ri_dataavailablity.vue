<template>
  <div class="container shadow-2 bg-white" style="color: #757575">
    <ri-header></ri-header>
    <div
      class="q-pt-lg"
      style="font-size: 32px; font-weight: 600"
      align="center"
    >
      Data avaliability
    </div>
    <input-data></input-data>
    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri_header";
import myFooter from "../components/footer";

import fourBar from "../components/ri/ri_fourbar";
import inputData from "../components/ri/data_availablity/input_data.vue";
export default {
  components: {
    riHeader,
    myFooter,
    fourBar,
    inputData,
  },
};
</script>

<style lang="scss" scoped>
.footer-bg {
  background-image: url("../../public/footer.jpg");
  background-size: inherit;
  background-position: bottom;
}
</style>
