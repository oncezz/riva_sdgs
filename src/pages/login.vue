<template>
  <div>
    <div class="row justify-center container shadow-1 bg-white" style="height:100vh">
      <div class="col-12">
        <!-- NOTE : Menu bar Header -->
        <q-toolbar class="text-primary bg-white q-pa-sm shadow-4">
          <div class="col-3 q-px-md" style="width:350px;">
            <q-img :src="require('../../public/images/header-logo.png')" style></q-img>
          </div>
          <q-space />
          <div class="col" align="right">
            <span class="font-header text-black q-pr-md">Data Entry</span>
          </div>
        </q-toolbar>
      </div>

      <div
        class="col-6 q-pa-md q-pb-xl q-mt-md"
        v-show="!isForgotPasswordClicked"
        align="center"
        style="width:500px;"
      >
        <div class="text-left" style="width:250px;">
          <span>Username</span>
          <div align="center">
            <q-input style="width:250px;" ref="username" v-model="username" outlined></q-input>
          </div>
        </div>

        <div align="left" class="q-mt-lg" style="width:250px;">
          <span>Password</span>
          <q-input
            v-model="password"
            outlined
            :type="isShowPassword ? 'password' : 'text'"
            style="width:250px;"
            @keyup.enter="login()"
          >
            <template v-slot:append>
              <q-icon
                :name="isShowPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isShowPassword = !isShowPassword"
              />
            </template>
          </q-input>
        </div>

        <div align="center" class="q-mt-lg q-py-sm q-px-lg" style="width:250px;">
          <q-btn
            class="bg4 font-content full-width"
            style="border-radius:10px;"
            label="Login"
            no-caps
            @click="login()"
          ></q-btn>
        </div>

        <div align="center" class="q-mt-sm">
          <span
            class="cursor-pointer font-content"
            style="text-decoration:underline;white-space: nowrap;"
            @click="isForgotPasswordClicked = true"
          >Forgot my username / password?</span>
        </div>
      </div>
    </div>
    <div
      class="absolute-center"
      align="center"
      style="width:500px;"
      v-show="isForgotPasswordClicked"
    >
      <p style="font-size:20px">Find your email</p>
      <p style="font-size:16px">Enter your recovery email</p>
      <div align="left" style="width:300px">
        email
        <q-input outlined v-model="recoveryEmail"></q-input>
      </div>

      <div class="row justify-center q-pt-lg" style="width:300px">
        <div class="q-pr-sm col-6">
          <q-btn
            @click="isForgotPasswordClicked = false"
            label="Cancel"
            style="width:100%;"
            no-caps
            outline
            class="font-content"
          ></q-btn>
        </div>
        <div class="q-pl-sm col-6">
          <q-btn
            label="Recovery"
            @click="recoveryPassword()"
            style="width:100%;"
            no-caps
            class="bg4 font-content"
          ></q-btn>
        </div>
      </div>
    </div>

    <q-dialog v-model="isRecoverySuccessDialog">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Recovery Password {{ recoveryTitleMessage }}</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;">{{ recoveryMessage }}</span>
          </div>
        </q-card-section>

        <q-card-actions class="q-py-lg" align="center">
          <div>
            <q-btn
              class="font-content q-mx-md bg4"
              style="width:150px;border-radius:10px;"
              label="OK"
              no-caps
              @click="checkRecoveryPassword()"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isShowWrongLoginDialog">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Login failed</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;">Username or password is incorrect.</span>
          </div>
        </q-card-section>

        <q-card-actions class="q-py-lg" align="center">
          <div>
            <q-btn
              class="font-content q-mx-md bg4"
              style="width:150px;border-radius:10px;"
              label="OK"
              no-caps
              v-close-popup
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import unFooter from "../components/footer.vue";
export default {
  data() {
    return {
      username: "",
      password: "",
      isShowPassword: true,
      isForgotPasswordClicked: false,
      recoveryEmail: "",
      isRecoverySuccessDialog: false,
      recoveryMessage: "",
      isShowWrongLoginDialog: false,
      recoveryTitleMessage: "",
      isSuccessRecovery: false,
    };
  },
  components: {
    unFooter,
  },
  methods: {
    checkRecoveryPassword() {
      this.isRecoverySuccessDialog = false;
      if (this.isSuccessRecovery) {
        this.isForgotPasswordClicked = false;
        this.recoveryEmail = "";
      }
    },
    recoveryPassword() {
      this.isRecoverySuccessDialog = true;
      if (this.recoveryEmail) {
        this.recoveryMessage =
          "The reset password has been sent to your email.";
        this.recoveryTitleMessage = "successfully";
        this.isSuccessRecovery = true;
      } else {
        this.recoveryMessage = "Sorry! There is no email in our system.";
        this.recoveryTitleMessage = "failed";
        this.isSuccessRecovery = false;
      }
    },
    async login() {
      if (this.username == "" || this.password == "") {
        this.$refs.username.focus();
        this.isShowWrongLoginDialog = true;
        return;
      }

      let data;
      let url = this.serverPath + "u_api/check_login.php";

      let sendData = {
        username: this.username,
        password: this.password,
      };

      let res = await axios.post(url, (data = sendData));
      if (res.data == "Login Failed") {
        this.isShowWrongLoginDialog = true;
        return;
      } else {
        this.$q.sessionStorage.set("ssid", res.data);
        this.$router.push("/year");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>