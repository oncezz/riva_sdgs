<template>
  <div>
    <q-img src="../../public/waiting.png" width="100%">
      <span class="absolute-center font-graph" style="width:650px;" align="center">{{text}}</span>
    </q-img>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
</style>