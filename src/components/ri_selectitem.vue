<template>
  <div>
    <div class="row cursor-pointer" style="width: 200px" @click="selectBtn()">
      <div
        class="colorBox"
        v-if="selected"
        :style="{ backgroundColor: colorBox }"
      ></div>
      <div class="colorBox" v-else></div>
      <div class="q-px-sm">{{ name }} ({{ value }})</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["colorBox", "name", "value"],
  data() {
    return {
      selected: false
    };
  },
  methods: {
    selectBtn() {
      this.selected = !this.selected;
    }
  }
};
</script>

<style lang="scss" scoped>
.colorBox {
  width: 16px;
  height: 16px;
  border: 1px solid #757575;
}
</style>
