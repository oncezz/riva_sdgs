<template>
  <div class="container shadow-2 bg-white" style="color: #757575">
    <ri-header :menu="3"></ri-header>
    <div style="height: 1000px">
      <div><input-section /></div>
    </div>
  </div>
</template>

<script>
import riHeader from "../components/ri_header";
import myFooter from "../components/footer";
import inputSection from "../components/ri/buildyourown/input_section";
import fourBar from "../components/ri/ri_fourbar";
import selectDesired from "../components/ri/ri_select_desired_level";
export default {
  components: {
    riHeader,
    myFooter,
    inputSection,
    fourBar,
    selectDesired,
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
