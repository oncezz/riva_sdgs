<template>
  <div class="q-pa-md">
    <!-- bar#1 -->
    <div class="q-pt-sm font-24 q-pb-md">
      Your group's
      <span v-if="type == 'Sustainable'">sustainable</span
      ><span v-else>conventional</span> Integration score in {{ year }} was
      <span class="text-green"
        ><b>{{ score }}</b></span
      >
    </div>
    <div class="row q-py-xs" v-for="(item, index) in data" :key="index">
      <div class="col-2 q-pr-md" align="right">{{ data[index].name }}</div>
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
  props: ["data", "type", "year"],
  data() {
    return {
      score: 0,
    };
  },
  methods: {
    calYourGroupScore() {
      let temp = this.data.filter((x) => x.own);
      this.score = temp[0].value;
    },
  },
  watch: {
    data: function (newData, oldData) {
      this.calYourGroupScore();
    },
  },
  mounted() {
    setTimeout(() => {
      this.calYourGroupScore();
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.grayBar {
  height: 30px;
  width: 100%;
  background-color: #ededed;
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
  background-color: #ff9800;
  line-height: 30px;
  color: white;
  text-align: right;
}
</style>
