<template>
  <q-page>
    <div class="bg flex flex-center relative-position" style="height:200px">
      <div class="row justify-center">
        <div
          class="text-white col-12 text-stroke"
          align="center"
          style="font-size:48px"
        >Verify Email Address</div>
        <!-- <div align="center" class="text-stroke text-white font-graph q-pt-lg">
          Gain insight into your economy’s participation in global value chains (GVCs).
          <br />Uncover the
          sources of
          intermediate inputs and destinations of domestic value-added
        </div>-->
      </div>
    </div>

    <div class="absolute-center" align="center" style="width:100%" v-if="isLoaded">
      <q-icon style="font-size:100px" name="fas fa-check-circle" color="teal"></q-icon>

      <div class="text-h4 q-pt-lg">Email Address Verified</div>
      <div class="text-h5 q-pt-lg">{{ email }} has been verified.</div>

      <div class="q-pt-lg">
        <q-btn label="Login" style="width:250px" color="teal" to="/download"></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      email: "",
      isLoaded: false,
    };
  },
  methods: {
    async getEmail() {
      this.loadingShow();
      const url = this.path_api + "/getEmail.php?id=" + this.$route.params.id;
      try{
 const result = await Axios.get(url);

      this.email = result.data[0].email;
      this.isLoaded = true;
      }catch(error){
          this.$router.push("/")
      }
     

      this.loadingHide();
    },
    async verifyEmail() {
      const url =
        this.path_api + "/verify_email.php?id=" + this.$route.params.id;
      const result = await Axios.get(url);

      this.getEmail();
    },
  },
  mounted() {
    this.verifyEmail();
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background-image: url("/bg-global-value.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>