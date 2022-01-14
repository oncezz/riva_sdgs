<template>
  <div style="background-color:#404040;height:88px">
    <div class="row items-center fit">
      <div
        v-ripple
        @click="toGVC()"
        :class="{'text-yellow' : activeMenu == 0}"
        class="relative-position col text-white fit flex flex-center cursor-pointer font-20"
        align="center"
      >
        GVC relationships
        <q-tooltip>
          Get an overview of your selected economy’s backward
          <br />and
          forward GVC linkages – by exporting sector
          <br />and partner economy.
        </q-tooltip>
      </div>
      <div
        v-ripple
        @click="toStructure()"
        :class="{'text-yellow' : activeMenu == 1}"
        class="relative-position col text-white fit flex flex-center cursor-pointer font-20"
        align="center"
      >
        Structure of value added
        <q-tooltip>
          Get a breakdown of your selected economy’s
          <br />value-added structure of exports. See how this
          <br />changes
          perception of bilateral trade balances.
        </q-tooltip>
      </div>
      <div
        v-ripple
        @click="toParticipation()"
        :class="{'text-yellow' : activeMenu == 2}"
        class="relative-position col text-white fit flex flex-center cursor-pointer font-20"
        align="center"
      >
        Participation in GVCs
        <q-tooltip>
          Get an overview of your selected economy’s GVC
          <br />related trade.
        </q-tooltip>
      </div>
      <div
        v-ripple
        @click="toBackward()"
        :class="{'text-yellow' : activeMenu == 3}"
        class="relative-position col text-white fit flex flex-center cursor-pointer font-20"
        align="center"
      >
        Backward linkages
        <q-tooltip>
          Find out where your selected economy’s imported
          <br />content used in its exports comes from– by source
          <br />economy and exporting sector.
        </q-tooltip>
      </div>
      <div
        v-ripple
        @click="toForward()"
        :class="{'text-yellow' : activeMenu == 4}"
        class="relative-position col text-white fit flex flex-center cursor-pointer font-20"
        align="center"
      >
        Forward linkages
        <q-tooltip>
          Find out where your selected economy contributes
          <br />towards export production– by exporting sector and
          <br />importing economy.
        </q-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeMenu: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    toGVC() {
      this.$router.push("/gvc-links");
    },
    toStructure() {
      this.$router.push("/structure-of-value-added");
    },
    toParticipation() {
      this.$router.push("/participation-in-gvcs");
    },
    toBackward() {
      this.$router.push("/backward-linkages");
    },
    toForward() {
      this.$router.push("/forward-linkages");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>