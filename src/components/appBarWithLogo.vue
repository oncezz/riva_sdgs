<template>
  <div class="bg-white q-py-sm">
    <q-toolbar class>
      <q-btn to="/" class="color4" flat round size="35px" dense icon="home" />
      <span style="font-size:30px" class="text-black">
        <b v-if="isShowTitle">Key GVC relationships</b>
      </span>

      <div style="top:30px;left:100px" v-if="isShowKeyGVCBtn">
        <q-btn
          class="bg4"
          @click="$router.push('/gvc-links')"
          label="Key GVC links"
          no-caps
        ></q-btn>
      </div>
      <q-space></q-space>
      <div class="row q-py-sm">
        <div>
          Exporting economy
          <q-select
            style="width:240px"
            dense
            :options="countryOptions"
            v-model="countrySelected"
            outlined
            emit-value
            map-options
            @input="selectData()"
          ></q-select>
        </div>
        <div class="q-pl-lg">
          Year
          <q-select
            style="width:144px"
            dense
            :options="yearOptions"
            v-model="yearSelected"
            @input="selectData()"
            outlined
          ></q-select>
        </div>
      </div>
    </q-toolbar>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  props: {
    isShowKeyGVCBtn: {
      type: Boolean,
      default: true
    },
    isShowTitle: {
      type: Boolean,
      default: false
    },
    isShowLogo: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      yearOptions: [],
      yearSelected: "",
      countryOptions: [],
      countrySelected: ""
    };
  },
  methods: {
    selectData() {
      let countrySelected = this.countryOptions.filter(
        x => x.value == this.countrySelected
      )[0];

      let selectedData = {
        name: countrySelected.label,
        region: countrySelected.region,
        iso: countrySelected.iso,
        year: this.yearSelected
      };

      this.$emit("countrySelected", selectedData);

      this.$q.sessionStorage.set("cselec", selectedData);
    },
    async loadYear() {
      this.getCountryList();

      this.yearSelected = this.$q.sessionStorage.has("cselec")
        ? this.$q.sessionStorage.getItem("cselec").year
        : "";
      let countryId = this.$q.sessionStorage.has("cselec")
        ? this.countryOptions.filter(
            x => x.iso == this.$q.sessionStorage.getItem("cselec").iso
          )
        : "";

      this.countrySelected = this.$q.sessionStorage.has("cselec")
        ? countryId[0].value
        : "";

      let url = this.path_api + "/get_year_active.php";

      // if (this.$route.name == "getStarted") {
      //   (this.countrySelected = ""), (this.yearSelected = "");
      //   this.$q.sessionStorage.clear();
      // }

      let getYear = await Axios.get(url);

      this.yearOptions = getYear.data;
    }
  },

  created() {
    this.loadYear();
  }
};
</script>

<style scoped></style>
