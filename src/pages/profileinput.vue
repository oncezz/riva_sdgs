<template>
  <q-page class="flex flex-center q-pa-xl">
    <div class="box-profile q-pa-lg row">
      <div class="col-12" align="center">
        <div align="left">
          <span>Username</span>
        </div>
        <q-input outlined v-model="userDetails.username"></q-input>
      </div>

      <div class="col-12 q-mt-md" align="center">
        <div align="left">
          <span>Email</span>
        </div>
        <q-input outlined v-model="userDetails.email"></q-input>
      </div>

      <div class="col-12 q-mt-md" align="center">
        <div align="left">
          <span>Old Password</span>
        </div>
        <q-input
          outlined
          v-model="userDetails.password"
          :rules="[val => !!val,val => val.length >= 6]"
          hide-bottom-space
        ></q-input>
        <div align="left" class="text-grey-6"></div>
      </div>

      <div class="col-12 q-mt-md" align="center">
        <div align="left">
          <span>New Password</span>
        </div>
        <q-input
          outlined
          v-model="newPassword"
          ref="newpassword"
          :rules="[val => !!val,val => val.length >= 6]"
          hide-bottom-space
        ></q-input>
        <div align="left" class="text-grey-6">
          <span>At least 6 characters</span>
        </div>
      </div>

      <div class="col-12 row justify-between q-mt-lg" align="center">
        <q-btn
          label="Cancel"
          outline
          class="q-py-xs"
          no-caps
          style="width:150px;border-radius:10px;font-size:18px"
          to="/profile"
        ></q-btn>
        <q-btn
          label="Save"
          class="bg4 q-py-xs"
          no-caps
          style="width:150px;border-radius:10px;font-size:18px"
          @click="updateProfile()"
        ></q-btn>
      </div>
    </div>

    <!-- Dialog Update Completely -->
    <q-dialog v-model="isDialogUpdateCompletely" persistent>
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Edit Profile Completely</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;">Update profile completely</span>
          </div>
        </q-card-section>

        <q-card-actions class="q-py-lg" align="center">
          <div>
            <q-btn
              class="font-content q-mx-md bg4"
              style="width:150px;border-radius:10px;"
              label="OK"
              to="/profile"
              v-close-popup
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
      userDetails: {
        username: "",
        password: "",
        email: "",
      },
      newPassword: "",

      isDialogUpdateCompletely: false,
    };
  },
  methods: {
    async updateProfile() {
      console.clear();

      if (
        this.userDetails.username == "" ||
        this.userDetails.email == "" ||
        this.userDetails.password == ""
      ) {
        this.notifyRed("Please fill in Old Password / New Password");
        return;
      }

      if (this.userDetails.password != this.newPassword) {
        this.notifyRed("Old Password is incorrect");
        return;
      }

      let data;
      let url = this.serverPath + "u_api/edit_profile.php";

      let sendData = {
        ...this.userDetails,
        id: this.userId,
      };

      let res = await axios.post(url, (data = sendData));

      if (res.data == "Success") {
        console.log(res.data);
        this.isDialogUpdateCompletely = true;
      }
    },
    getUser() {
      let userData = this.$q.sessionStorage.getItem("ssid");

      this.userId = userData.id;

      this.userDetails.username = userData.username;
      this.userDetails.email = userData.email;
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>
.box-profile {
  width: 400px;
  border-radius: 10px;
  border: 1px solid#000;
}
</style>
