<template>
  <div>
    <div style="border:2px solid black;width:90%;margin:auto">
      <div
        class="flex flex-center items-center q-pa-md"
        style="width:75%;margin:auto"
        align="center"
      >
        <div align="center" class style="width:150px">
          <q-icon
            name="fas fa-exclamation-triangle"
            size="100px"
            color="red"
          ></q-icon>
        </div>
        <div align="left">
          <p style="font-size:28px">
            <b>Sorry, this page isn't available</b>
          </p>
          <p>{{ displayText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    displayText: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped></style>
