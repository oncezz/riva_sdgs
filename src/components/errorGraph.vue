<template>
  <div class="relative-position" style="height:500px">
    <div align="center" style="font-size:24px" class="q-pt-md">{{ content }}</div>
    <div align="center" class="absolute-center flex flex-center font-content" style="width:540px">
      <img style="width:50px" src="../../public/images/alert.png" alt />Graph unavailable due to negligible export values
    </div>
  </div>
</template>

<script>
export default {
  props: ["content"],
};
</script>

<style lang="scss" scoped>
</style>