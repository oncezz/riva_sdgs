<template>
  <q-page class="bg-white" style="padding-bottom:120px">
    <app-bar
      @countrySelected="(val) => displayCountry = val "
      @yearSelected="(val) => displayYear = val "
    ></app-bar>

    <p
      class="font-page q-py-md"
      align="center"
    >Let’s look at {{displayCountry.name}}’s involvement in global value chains in {{displayYear}}</p>

    <div class="row q-px-md" style="width:90%; margin:auto; max-width:1200px;">
      <!-- col1 -->
      <div class="col-3 q-px-sm">
        <div class="bdrs fit q-pa-md relative-position">
          <p align="center" class="text-weight-bold font-graph">What about content of exports?</p>
          <div
            class="font-content q-pb-lg"
            align="center"
          >Get an overview of value-added structure of {{displayCountry.name}}’s exports. Compare across sub-regional partners. See how this changes perception of bilateral trade balances.</div>
          <div class="q-py-lg">
            <div class="absolute-bottom" style="width:190px;margin:auto;bottom:10px" align="center">
              <q-btn
                to="/structure-of-value-added"
                label="Let's go!"
                class="bg4 fit font-content q-mb-md"
                no-caps
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
      <!-- col2 -->
      <div class="col-3 q-px-sm">
        <div class="bdrs fit q-pa-md relative-position">
          <p align="center" class="text-weight-bold font-graph">What about participation in GVCs?</p>
          <div
            class="font-content q-pb-lg"
            align="center"
          >Get an overview of {{displayCountry.name}}’s GVC related trade. Compare across sub-regional partners</div>
          <div class="q-py-lg">
            <div class="absolute-bottom" style="width:190px;margin:auto;bottom:10px" align="center">
              <q-btn
                to="/participation-in-gvcs"
                label="Let's go!"
                class="bg4 fit font-content q-mb-md"
                no-caps
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
      <!-- col3 -->
      <div class="col-3 q-px-sm">
        <div class="bdrs fit q-pa-md relative-position">
          <p align="center" class="text-weight-bold font-graph">What about backward linkages?</p>

          <p
            class="font-content"
            align="center"
          >Find out where {{displayCountry.name}}’s imported content comes from. Examine this by region and sector. Compare across sub-regional partners.</p>
          <div class="q-py-lg">
            <div class="absolute-bottom" style="width:190px;margin:auto;bottom:10px" align="center">
              <q-btn
                to="/backward-linkages-by-region"
                label="Let's go!"
                class="bg4 fit font-content q-mb-md"
                no-caps
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
      <!-- col4 -->
      <div class="col-3 q-px-sm">
        <div class="bdrs fit q-pa-md relative-position">
          <p align="center" class="text-weight-bold font-graph">What about forward linkages?</p>
          <div
            class="font-content"
            align="center"
          >Find out where {{displayCountry.name}} contributes towards export production. Examine this by region and sector. Compare across sub-regional partners.</div>
          <div class="q-py-lg">
            <div class="absolute-bottom" style="width:190px;margin:auto;bottom:10px" align="center">
              <q-btn
                to="/forward-linkages-by-region"
                label="Let's go!"
                class="bg4 fit font-content q-mb-md"
                no-caps
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import appBar from "../components/appBarWithLogo";
export default {
  components: {
    appBar,
  },
  data() {
    return {
      displayCountry: this.$q.sessionStorage.getItem("cselec"),
      displayYear: this.$q.sessionStorage.getItem("cselec").year,
    };
  },
};
</script>

<style>
.bdrs {
  border-radius: 5px;
  border: 2px solid;
}
</style>