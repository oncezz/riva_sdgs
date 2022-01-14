<template>
  <q-page class="flex flex-center q-pa-md">
    <div class="q-mb-xl q-pb-xl">
      <div align="center">
        <span style="font-size:20px;">Are you sure you want to log out?</span>
      </div>
      <div align="center" class="q-py-lg">
        <q-btn
          label="Cancel"
          outline
          class="q-py-xs q-mr-sm"
          style="width:145px;border-radius:10px;"
          @click="$router.go(-1)"
        ></q-btn>
        <q-btn
          label="Logout"
          class="q-py-xs q-ml-sm bg4"
          style="width:145px;border-radius:10px;"
          @click="logout()"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$q.sessionStorage.remove("ssid");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>