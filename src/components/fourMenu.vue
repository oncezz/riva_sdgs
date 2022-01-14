<template>
  <div>
    <div class="row" style="border:1px solid">
      <div
        class="col-3 brr q-py-md cursor-pointer"
        :class="{'bg4':activeMenu == 1}"
        align="center"
        @click="$router.push('/structure-of-value-added')"
      >Structure of value added</div>
      <div
        class="col-3 brr q-py-md cursor-pointer"
        align="center"
        :class="{'bg4':activeMenu == 2}"
        @click="$router.push('/participation-in-gvcs')"
      >Participation in GVCs</div>
      <div class="col-3 brr q-py-md cursor-pointer" :class="{'bg4':activeMenu == 3}" align="center">
        Backward linkages
        <q-icon name="fas fa-caret-down"></q-icon>
        <q-menu fit max-height="200px" square style="width:100%" class>
          <q-list>
            <q-item
              :class="$route.name == 'backwardLinkagesRegion' ? 'bg4' :null"
              @click="$router.push('/backward-linkages-by-region')"
              clickable
              v-close-popup
            >
              <q-item-section>Select by Exporting sector</q-item-section>
            </q-item>
            <q-item
              :class="$route.name == 'backwardLinkagesSector' ? 'bg4' :null"
              @click="$router.push('/backward-linkages-by-sector')"
              clickable
              v-close-popup
            >
              <q-item-section>Select by Source economy</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
      <div class="col-3 q-py-md cursor-pointer" :class="{'bg4':activeMenu == 4}" align="center">
        Forward linkages
        <q-icon name="fas fa-caret-down"></q-icon>
        <q-menu fit max-height="200px" style="width:100%" class>
          <q-list>
            <q-item
              :class="$route.name == 'forwardLinkagesRegion' ? 'bg4' :null"
              @click="$router.push('/forward-linkages-by-region')"
              clickable
              v-close-popup
            >
              <q-item-section>Select by Exporting economy</q-item-section>
            </q-item>
            <q-item
              :class="$route.name == 'forwardLinkagesSector' ? 'bg4' :null"
              @click="$router.push('/forward-linkages-by-sector')"
              clickable
              v-close-popup
            >
              <q-item-section>Select by Importing economy</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeMenu: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    emitData(data) {
      this.$emit("optionSelected", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.brr {
  border-right: 1px solid;
}
.br-radius {
  border: 1px solid;
  border-radius: 8px;
}
.hover-btn:hover {
  background-color: #dfefff;
}
</style>