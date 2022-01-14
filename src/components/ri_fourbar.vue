<template>
  <div class="q-py-md">
    <!-- bar#1 -->
    <div class="row q-py-xs" v-for="(item, index) in data" :key="index">
      <div class="col-2">{{ data[index].name }}</div>
      <div class="col-10">
        <div class="grayBar">
          <div
            class="blueBar q-px-md"
            :style="{ width: data[index].value * 100 + '%' }"
            v-if="!data[index].own"
          >
            {{ data[index].value }}
          </div>
          <div
            class="greenBar q-px-md"
            :style="{ width: data[index].value * 100 + '%' }"
            v-else
          >
            {{ data[index].value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style lang="scss" scoped>
.grayBar {
  height: 30px;
  width: 100%;
  background-color: #c4c4c4;
}
.blueBar {
  height: 30px;
  width: 50%;
  background-color: #2381b8;
  line-height: 30px;
  color: white;
  text-align: right;
}
.greenBar {
  height: 30px;
  width: 50%;
  background-color: #2d9687;
  line-height: 30px;
  color: white;
  text-align: right;
}
</style>
