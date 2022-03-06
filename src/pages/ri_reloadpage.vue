<template>
  <div>reload page</div>
</template>

<script>
export default {
  methods: {
    reloadPage() {
      let page = this.$route.params.page;
      this.$router.push("/" + page);
    },
  },
  mounted() {
    this.reloadPage();
  },
};
</script>

<style lang="scss" scoped></style>
