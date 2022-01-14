<template>
  <q-page>
    <global-value-chains-header
      :isShowTinaLink="false"
      :isDisableShare="false"
    ></global-value-chains-header>
    <div class="row">
      <!-- indicator -->
      <div style="width: 235px" class>
        <img
          style="width: 100%"
          class="full-height"
          src="../../public/download-side.png"
          alt
        />
      </div>
      <div class="col q-pa-lg" style="background-color: #e5e1e1">
        <div style="width: 90%; max-width: 1200px; margin: auto">
          <p align="center" class="font-24">Download data</p>
          <p>
            Query and download detailed data on value-added trade indicators for
            your economies, sectors and years of interest. Please make your
            desired selection from the menus below.
          </p>
        </div>

        <div
          class="bg-white q-pb-lg rounded-borders"
          style="width: 90%; max-width: 1200px; margin: auto"
        >
          <!-- //header name and logout -->
          <div
            class="row q-mb-md"
            style="
              height: 40px;
              background-color: #2c2f30;
              color: white;
              line-height: 40px;
              border-radius: 5px 5px 0px 0px;
            "
          >
            <div
              class="col q-px-lg"
              align="left"
              style="text-decoration: underline"
            >
              {{ email }}
            </div>
            <div class="col q-px-lg" align="right">
              <q-icon
                class="cursor-pointer"
                @click="signOut()"
                name="fas fa-sign-out-alt"
                size="sm"
              />
            </div>
          </div>

          <!-- menu open save and economy group -->
          <div class="row">
            <div class="col q-pl-lg" align="left">
              <q-icon
                name="fas fa-folder-open"
                size="md"
                class="cursor-pointer"
                @click="isShowQueryList = true"
                title="Open query"
              />
              <q-icon
                name="fas fa-save"
                size="md"
                class="q-px-lg cursor-pointer"
                @click="
                  (isEditQuery = false),
                    (query = ''),
                    (isShowSaveQuery = true),
                    (queryIndexTemp = '')
                "
                title="Save query"
              />
            </div>
            <div align="right" class="q-px-lg q-pb-sm col">
              <q-btn
                @click="isShowEconomyGroupDialog = true"
                label="Create your own economy group"
                style="width: 250px; background-color: #2c2f30; color: white"
                no-caps
              ></q-btn>
            </div>
          </div>

          <hr />
          <div class="q-px-lg">
            <div>
              <q-select
                v-model="indicator"
                :options="indicatorList"
                label="indicator (select one)"
                emit-value
                map-options
                @input="resetDownloadState()"
              />
            </div>

            <!-- exporting country -->
            <div>
              <!-- <q-select
                v-model="exporting"
                :options="countryList"
                label="Exporting economy"
               
           
              />-->

              <q-select
                bg-color="white"
                multiple
                emit-value
                map-options
                label="Exporting economy"
                use-chips
                v-model="exporting"
                :options="countryOptions"
                @input="resetDownloadState()"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section>
                      <q-item-label
                        v-html="scope.opt.label"
                        :class="
                          scope.opt.disable
                            ? 'text-black text-weight-bolder'
                            : 'text-black'
                        "
                      />
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <!-- importing country -->
            <div>
              <!-- <q-select
                v-show="indicator != 'in_07'"
                v-model="importing"
                :options="countryList"
                label="Importing economy"
                multiple
                emit-value
                map-options
                use-chips
                @input="resetDownloadState()"
              /> -->

              <q-select
                v-show="indicator != 'in_07'"
                bg-color="white"
                multiple
                emit-value
                map-options
                label="Importing economy"
                use-chips
                v-model="importing"
                :options="countryOptions"
                @input="resetDownloadState()"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section>
                      <q-item-label
                        v-html="scope.opt.label"
                        :class="
                          scope.opt.disable
                            ? 'text-black text-weight-bolder'
                            : 'text-black'
                        "
                      />
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <!-- Sector -->
            <div>
              <!-- <q-select
                v-show="indicator != 'in_06' && indicator != 'in_08'"
                v-model="sector"
                :options="sectorOptions"
                label="Exporting sector"
                multiple
                emit-value
                map-options
                use-chips
                @input="resetDownloadState()"
              />-->

              <q-select
                v-show="indicator != 'in_06' && indicator != 'in_08'"
                label="Exporting sector"
                bg-color="white"
                v-model="sector"
                :options="sectorOptions"
                map-options
                emit-value
                @input="resetDownloadState()"
                multiple
                use-chips
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section>
                      <q-item-label
                        v-html="scope.opt.label"
                        :class="
                          scope.opt.disable
                            ? 'text-black text-weight-bolder'
                            : 'text-black'
                        "
                      />
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <!-- Source country -->
            <div>
              <!-- <q-select
              
                v-model="source"
                :options="countryList"
                label="Source economy"
                multiple
                emit-value
                map-options
                use-chips
                @input="resetDownloadState()"
              /> -->

                <q-select
                v-show="indicator == 'in_06'"
                label="Source economy"
                bg-color="white"
                v-model="source"
                :options="countryOptions"
                map-options
                emit-value
                @input="resetDownloadState()"
                multiple
                use-chips
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section>
                      <q-item-label
                        v-html="scope.opt.label"
                        :class="
                          scope.opt.disable
                            ? 'text-black text-weight-bolder'
                            : 'text-black'
                        "
                      />
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>


            </div>
            <!-- year -->
            <div>
              <q-select
                @input="resetDownloadState()"
                v-model="year"
                use-chips
                :options="yearList"
                label="Year"
                multiple
              />
            </div>
            <div class="row q-mt-md">
              <div
                class="col-12 row justify-center q-col-gutter-md"
                align="center"
              >
                <div>
                  <q-btn
                    label="Clear All"
                    outline
                    no-caps
                    style="width: 150px"
                    @click="clearBtn()"
                  />
                </div>
                <div>
                  <download-csv
                    v-if="isShowDownloadBtn"
                    class="bg-secondary text-white cursor-pointer"
                    style="
                      width: 150px;
                      border-radius: 3px;
                      height: 35px;
                      line-height: 35px;
                    "
                    :data="downloadData"
                    ref="downloadData"
                    @click="test()"
                    >Download Data</download-csv
                  >

                  <q-btn
                    v-else
                    label="Generate"
                    no-caps
                    style="width: 150px; background-color: #2c2f30"
                    class="text-white"
                    @click="runBtn()"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Dialog -->
    <q-dialog v-model="isLogin" persistent>
      <q-card style="width: 450px; height: 370px">
        <div style="background-color: #2c2f30" class="q-pa-sm" align="center">
          <img src="../assets/logodialog.png" alt />
        </div>
        <div class="q-pa-md" align="center">
          Please log in to access the download data page
        </div>
        <div class="q-px-lg">
          <q-form @submit="signIn()">
            <div>
              <q-input
                outlined
                v-model="login.email"
                label="Email"
                dense
                type="email"
                :rules="[val => !!val]"
                ref="password"
                hide-bottom-space
              />
            </div>
            <div class="q-pt-md q-pb-sm">
              <q-input
                v-model="login.password"
                dense
                label="Password"
                outlined
                :type="isPwd ? 'password' : 'text'"
                hide-bottom-space
                :rules="[val => !!val]"
                ref="password"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div
              style="text-decoration: underline"
              class="cursor-pointer"
              @click="(isShowForgotPasswordDialog = true), (isLogin = false)"
              align="right"
            >
              Forgot password?
            </div>
            <div>
              <q-btn
                type="submit"
                label="Log in"
                style="width: 400px; background-color: #2c2f30; color: white"
                no-caps
                class="q-mt-md"
              ></q-btn>
            </div>
            <div align="center" class="q-pt-lg">
              Not a Riva member?
              <span
                style="color: #2381b8; text-decoration: underline"
                @click="clearData()"
                class="cursor-pointer"
                >Sign up for a free account</span
              >
              / Back to
              <span
                style="color: #2381b8; text-decoration: underline"
                @click="homeLink()"
                class="cursor-pointer"
                >Home</span
              >
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>

    <!-- Sign up dialog -->
    <q-dialog v-model="isSignUp" persistent>
      <q-card style="width: 450px">
        <div style="background-color: #2c2f30" class="q-pa-sm" align="center">
          <img src="../assets/logodialog.png" alt />
        </div>

        <q-form @submit="register()">
          <div class="q-px-lg q-py-lg">
            <div>
              <q-input
                hide-bottom-space
                :rules="[val => !!val]"
                ref="email"
                outlined
                v-model="signUp.email"
                label="Email"
                dense
                type="email"
              />
            </div>
            <div class="q-pt-md q-pb-sm">
              <q-input
                hide-bottom-space
                :rules="[val => !!val]"
                ref="password"
                v-model="signUp.password"
                dense
                label="Password"
                type="text"
                outlined
              ></q-input>
            </div>
            <div class="q-pt-md q-pb-sm">
              <q-input
                hide-bottom-space
                type="text"
                :rules="[val => val == signUp.password]"
                ref="confirm"
                v-model="signUp.confirmPassword"
                dense
                label="Confirm password"
                outlined
              ></q-input>
            </div>
            <div class="q-pt-md q-pb-sm">
              <q-select
                :rules="[val => val != '--- Please Select ---']"
                ref="country"
                outlined
                label="Country"
                dense
                map-options
                emit-value
                v-model="signUp.country"
                :options="countryAllList"
                hide-bottom-space
              ></q-select>
            </div>

            <div class="q-pt-md q-pb-sm">
              <q-select
                hide-bottom-space
                :rules="[val => val != '--- Please Select ---']"
                ref="organization"
                outlined
                label="Organization"
                dense
                map-options
                emit-value
                v-model="signUp.Organization"
                :options="organizationOptions"
              ></q-select>
            </div>

            <div class="q-pt-md">
              <q-checkbox
                v-model="signUp.isSubscribe"
                label="Subscribe for lastest updates"
              ></q-checkbox>
            </div>

            <div>
              <q-btn
                label="Sign up"
                style="width: 400px; background-color: #2c2f30; color: white"
                no-caps
                class="q-mt-md"
                type="submit"
              ></q-btn>
            </div>
            <div align="center" class="q-pt-lg">
              Not a Riva member?
              <span
                style="color: #2381b8; text-decoration: underline"
                @click="(isSignUp = false), (isLogin = true)"
                class="cursor-pointer"
                >Sign in</span
              >
            </div>
          </div>
        </q-form>
      </q-card>
    </q-dialog>
    <!-- Economy Group Table Dialog -->
    <q-dialog v-model="isShowEconomyGroupDialog" persistent>
      <q-card style="width: 650px">
        <q-card-section>
          <q-toolbar>
            <span style="font-size: 20px">Economy group</span>
            <q-space />
            <q-btn
              v-close-popup
              @click="
                (isAddNewGroupDialog = true),
                  (groupSelected = []),
                  (groupName = ''),
                  (isEditGroup = false)
              "
              label="New group"
              class="text-white"
              no-caps
              style="width: 150px; background-color: #2c2f30"
            ></q-btn>
          </q-toolbar>
        </q-card-section>
        <div class="q-px-md">
          <q-separator color="black" spaced="-5px"></q-separator>
        </div>
        <q-card-section>
          <div class="row bg-grey-8 q-pa-xs text-white">
            <div style="width: 150px" class="q-pl-md">Economy group</div>
            <div class="col">Economy</div>
            <div align="center" style="width: 50px">
              <q-icon size="xs" name="fas fa-trash-alt"></q-icon>
            </div>
            <div align="center" style="width: 50px">
              <q-icon size="xs" name="fas fa-edit"></q-icon>
            </div>
          </div>

          <div
            class="row bg-grey-4 q-pa-xs text-black"
            v-for="(item, index) in tempGroup"
            :key="index"
          >
            <div style="width: 150px" class="q-pl-md">{{ item.label }}</div>
            <div class="col">{{ item.value.join(", ") }}</div>
            <div align="center" style="width: 50px">
              <q-icon
                size="xs"
                class="cursor-pointer"
                name="fas fa-trash-alt"
                @click="deleteGroup(index)"
              ></q-icon>
            </div>
            <div align="center" style="width: 50px">
              <q-icon
                size="xs"
                v-close-popup
                @click="editGroup(item, index)"
                class="cursor-pointer"
                name="fas fa-edit"
              ></q-icon>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-pb-md">
          <q-btn
            v-close-popup
            label="Close"
            no-caps
            style="width: 150px; background-color: #2c2f30; color: white"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- add new group dialog -->
    <q-dialog v-model="isAddNewGroupDialog" persistent>
      <q-card style="width: 650px">
        <q-card-section>
          <q-toolbar>
            <span style="font-size: 20px">
              <span v-if="isEditGroup">Edit</span>
              <span v-else>New</span> Economy group
            </span>
            <q-space />
          </q-toolbar>
        </q-card-section>
        <div class="q-px-md">
          <q-separator color="black" spaced="-5px"></q-separator>
        </div>
        <q-card-section>
          <div class="row items-end">
            <div style="width: 65px">Name</div>
            <q-input
              hide-bottom-space
              autofocus
              ref="groupName"
              class="col"
              dense
              :rules="[val => !!val]"
              v-model.trim="groupName"
            ></q-input>
          </div>
          <div class="row items-end">
            <div style="width: 65px">Economy</div>
            <q-select
              hide-bottom-space
              ref="groupSelected"
              :rules="[val => val.length >= 1]"
              map-options
              emit-value
              use-chips
              multiple
              :options="countryOptions.filter(x => typeof x.value != 'object')"
              autofocus
              class="col"
              dense
              v-model="groupSelected"
            ></q-select>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-pb-md">
          <q-btn
            @click="isShowEconomyGroupDialog = true"
            v-close-popup
            label="Cancel"
            no-caps
            style="width: 150px; color: black"
            outline
          ></q-btn>
          <q-btn
            @click="addEconomyGroup()"
            label="Save"
            no-caps
            style="width: 150px; background-color: #2c2f30; color: white"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <my-footer></my-footer>

    <q-dialog v-model="isShowQueryList">
      <q-card style="min-width: 500px; width: 100%">
        <q-toolbar
          class="no-padding"
          style="background-color: #2c2f30; color: white"
        >
          <q-toolbar-title>
            <div class="q-pl-md">Open query</div>
          </q-toolbar-title>
          <q-space></q-space>

          <q-btn icon="fas fa-times" v-close-popup flat></q-btn>
        </q-toolbar>
        <q-card-section class="no-padding">
          <div class="q-px-sm row justify-between q-pt-md">
            <q-select
              style="width: 75%"
              :options="queryList"
              v-model="querySelected"
            ></q-select>
            <q-btn flat icon="fas fa-trash-alt" @click="deleteQuery()"></q-btn>
            <q-btn flat icon="fas fa-pencil-alt" @click="editQuery()"></q-btn>
          </div>

          <div v-if="!queryList" class="q-pa-md">No Query Found</div>
        </q-card-section>

        <q-card-actions align="center" class="q-py-md">
          <q-btn
            label="Load"
            text-color="white"
            @click="loadQuery()"
            no-caps
            style="width: 200px; background-color: #2c2f30"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isShowSaveQuery">
      <q-card style="width: 500px">
        <q-toolbar
          class="no-padding"
          style="background-color: #2c2f30; color: white"
        >
          <q-toolbar-title>
            <div class="q-pl-md">
              <span v-if="isEditQuery">Edit query</span>
              <span v-else>Save query</span>
            </div>
          </q-toolbar-title>
          <q-space></q-space>

          <q-btn icon="fas fa-times" v-close-popup flat></q-btn>
        </q-toolbar>
        <q-card-section class="no-padding">
          <div class="q-px-md q-py-md">
            Query name
            <q-input
              v-model="query"
              label="Query name"
              dense
              outlined
            ></q-input>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="q-pb-md">
          <q-btn
            label="Save"
            text-color="white"
            @click="saveQuery()"
            no-caps
            style="width: 200px; background-color: #2c2f30"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isShowForgotPasswordDialog" persistent>
      <q-card style="width: 500px">
        <q-toolbar
          class="no-padding"
          style="background-color: #2c2f30; color: white"
        >
          <q-toolbar-title>
            <div class="q-pl-md">
              <span>Password Recovery</span>
            </div>
          </q-toolbar-title>
          <q-space></q-space>

          <q-btn
            icon="fas fa-times"
            v-close-popup
            @click="closePasswordRecoveryDialog()"
            flat
          ></q-btn>
        </q-toolbar>
        <q-card-section class="no-padding">
          <div class="q-px-md q-py-md">
            Please Enter Your Email
            <q-input
              v-model="recoveryEmail"
              label="Email"
              dense
              outlined
            ></q-input>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="q-pb-md">
          <q-btn
            label="Save"
            text-color="white"
            @click="sendEmailRecovery()"
            no-caps
            style="width: 200px; background-color: #2c2f30"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Axios from "axios";
import countryJson from "../../public/country_list.json";
import countryAll from "../assets/country.json";
import sectorJson from "../../public/sector.json";
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import myFooter from "../components/footer";
export default {
  components: {
    myFooter,
    globalValueChainsHeader
  },
  data() {
    return {
      countryOptions: [],
      sectorOptions: [],
      recoveryEmail: "",
      isShowForgotPasswordDialog: false,
      queryIndexTemp: "",
      isEditQuery: false,
      query: "",
      queryList: [],
      isShowQueryList: false,
      isShowSaveQuery: false,
      email: "",
      organizationOptions: [
        "Academic",
        "Government",
        "International Organisation",
        "NGO",
        "Private sector",
        "Think tank"
      ],
      isLogin: false, //เปิดปิด login dialog
      login: {
        email: "",
        password: ""
      },
      signUp: {
        email: "",
        password: "",
        confirmPassword: "",
        country: "--- Please Select ---",
        Organization: "--- Please Select ---",
        isSubscribe: false
      },
      isPwd: true,
      isSignUp: false, //เปิดปิด Sign up dialog
      countryAllList: [],
      isEditGroup: false,
      groupSelected: [],
      groupName: "",
      isAddNewGroupDialog: false,
      isShowEconomyGroupDialog: false,
      indicator: "in_01",
      indicatorList: [
        {
          value: "in_01",
          label: "Structure of value added"
        },
        {
          value: "in_02",
          label: "Value-added trade balance"
        },
        {
          value: "in_03",
          label: "Gross trade balance"
        },
        {
          value: "in_04",
          label: "GVC participation"
        },
        {
          value: "in_05",
          label: "Backward linkages (by exporting sector)"
        },
        {
          value: "in_06",
          label: "Backward linkages (by source economy)"
        },
        {
          value: "in_07",
          label: "Forward linkages (by exporting sector)"
        },
        {
          value: "in_08",
          label: "Forward linakages (by importing economy)"
        },
        {
          value: "in_09",
          label: "Gross exports"
        }
      ],
      countryList: [],
      source: null,
      exporting: [],
      importing: [],
      sector: null,
      sectorList: [],
      year: null,
      yearList: [],
      isShowDownloadBtn: false,
      downloadData: null,
      tempGroup: [],
      tempIndex: null,
      querySelected: "--- Please Select ---"
    };
  },
  methods: {
    closePasswordRecoveryDialog() {
      if (!this.$q.sessionStorage.has("uid")) {
        this.isLogin = true;
      }
    },
    homeLink() {
      this.$router.push("/");
    },
    async sendEmailRecovery() {
      this.$q.loading.show();
      const url = this.path_api + "/recovery_password.php";
      const response = await Axios.post(url, { email: this.recoveryEmail });

      if (response.data == "success") {
        this.$q
          .dialog({
            html: true,
            title: "Please check your email ",
            message: `We sent an recovery password to <br><b>${this.recoveryEmail}</b><br>If you don't see it, you may need to check your spam folder.`,
            cancel: true,
            persistent: true,
            ok: "Login"
          })
          .onOk(() => {
            this.isShowForgotPasswordDialog = false;
            this.isSignUp = false;
            this.isLogin = true;
          });
      } else {
        this.$q.notify({
          message: "Email not found",
          color: "red",
          position: "top"
        });
      }
      this.$q.loading.hide();
    },
    clearData() {
      this.isSignUp = true;
      this.isLogin = false;
      this.signUp.email = "";
      this.signUp.password = "";
      this.signUp.confirmPassword = "";
      this.country = "--- Please Select ---";
      this.Organization = "--- Please Select ---";
      this.isSubscribe = false;
    },
    deleteGroup(index) {
      this.tempGroup.splice(index, 1);
      this.exporting = [];
      this.importing = [];
      this.countryList = this.countryList.filter(
        x => typeof x.value != "object"
      );

      this.countryList = [...this.tempGroup, ...this.countryList];
    },
    editGroup(item, index) {
      this.isEditGroup = true;
      this.groupName = item.label;
      this.groupSelected = item.value;
      this.isAddNewGroupDialog = true;
      this.tempIndex = index;
    },
    addEconomyGroup() {
      this.$refs.groupName.validate();
      this.$refs.groupSelected.validate();

      if (this.$refs.groupName.hasError || this.$refs.groupSelected.hasError)
        return;

      if (this.isEditGroup) {
        this.tempGroup[this.tempIndex].label = this.groupName;
        this.tempGroup[this.tempIndex].value = this.groupSelected;
        this.tempIndex = null;
        this.countryOptions = this.countryOptions.filter(
          x => typeof x.value != "object"
        );

        this.countryOptions = [...this.tempGroup, ...this.countryOptions];
        this.isAddNewGroupDialog = false;
        this.exporting = [];
        this.importing = [];
      } else {
        // add group
        this.countryOptions.unshift({
          label: this.groupName,
          value: this.groupSelected
        });

        this.tempGroup.push({
          label: this.groupName,
          value: this.groupSelected
        });
        this.isAddNewGroupDialog = false;
      }

      (this.isAddNewGroupDialog = false),
        (this.isShowEconomyGroupDialog = true);
    },
    resetDownloadState() {
      this.isShowDownloadBtn = false;
    },
    loadCountryList() {
      this.countryList = [];
      countryJson.forEach(data => {
        let tempCountryList = {
          value: data.iso,
          label: data.name
        };
        this.countryList.push(tempCountryList);
      });
      this.countryList.sort((a, b) => (a.label < b.label ? -1 : 1));

      this.countryAllList = [];
      countryAll.forEach(data => {
        let temp = {
          value: data.iso,
          label: data.Country
        };
        this.countryAllList.push(temp);
      });
    },
    loadSectorList() {
      this.sectorList = [];
      sectorJson.forEach(data => {
        let tempSectorList = {
          value: data.id,
          label: data.name
        };
        this.sectorList.push(tempSectorList);
      });
    },
    async loadYearList() {
      this.yearList = [];
      let url = this.path_api + "/get_year_active.php";
      let data = await Axios.get(url);
      data.data.forEach(x => {
        this.yearList.push(x);
      });
    },
    clearBtn() {
      this.exporting = null;
      this.importing = null;
      this.sector = null;
      this.year = null;
      this.indicator = "in_01";
      this.isShowDownloadBtn = false;
    },
    async runBtn() {
      // exporting group
      let getGroup = this.exporting.filter(x => typeof x == "object");
      let tempGroup = [];
      getGroup.forEach(element => {
        element.forEach(x => tempGroup.push(x));
      });

      let filterExporting = this.exporting.filter(x => typeof x != "object");
      let finalGroup = [...tempGroup, ...filterExporting];

      finalGroup = [...new Set(finalGroup)];

      let exportingGroup = finalGroup.filter(x => x);

      // importing economy group
      let getImportGroup = this.importing.filter(x => typeof x == "object");
      let tempImportGroup = [];
      getImportGroup.forEach(element => {
        element.forEach(x => tempImportGroup.push(x));
      });

      let filterImporting = this.importing.filter(x => typeof x != "object");
      let finalImportGroup = [...tempImportGroup, ...filterImporting];
      finalImportGroup = [...new Set(finalImportGroup)];

      let importingGroup = finalImportGroup.filter(x => x);

      let _this = this;
      function validateInput() {
        if (
          !_this.exporting ||
          !_this.importing ||
          !_this.sectorList ||
          !_this.year
        ) {
          if (!_this.exporting) {
            _this.$q.notify({
              message: "Please add an exporting economy",
              color: "red",
              position: "top"
            });
          }
          if (!_this.importing) {
            _this.$q.notify({
              message: "Please add an importing economy",
              color: "red",
              position: "top"
            });
          }
          if (!_this.sector) {
            _this.$q.notify({
              message: "Please add a sector",
              color: "red",
              position: "top"
            });
          }
          if (!_this.year) {
            _this.$q.notify({
              message: "Please add a year",
              color: "red",
              position: "top"
            });
          }
          return;
        }
      }

      if (this.indicator == "Back_link_sector") {
        if (!this.source) {
          this.$q.notify({
            message: "Please add an source economy",
            color: "red",
            position: "top"
          });
        }
        validateInput();
      } else {
        validateInput();
      }
      this.loadingShow();
      let obj;
      if (
        !(
          this.indicator == "in_06" ||
          this.indicator == "in_07" ||
          this.indicator == "in_08"
        )
      ) {
        this.sector.sort();
        obj = {
          exporting: exportingGroup,
          importing: importingGroup,
          sector: this.sector,
          year: this.year
        };
      } else if (this.indicator == "in_06") {
        obj = {
          exporting: exportingGroup,
          importing: importingGroup,
          source: this.source,
          year: this.year
        };
      } else if (this.indicator == "in_07") {
        obj = {
          exporting: exportingGroup,
          sector: this.sector,
          year: this.year
        };
      } else if (this.indicator == "in_08") {
        obj = {
          exporting: exportingGroup,
          importing: importingGroup,
          year: this.year
        };
      }

      let url = "";
      if (this.indicator == "in_01") {
        url = this.path_api + "/in_01.php";
      } else if (this.indicator == "in_02") {
        url = this.path_api + "/in_02.php";
      } else if (this.indicator == "in_03") {
        url = this.path_api + "/in_03.php";
      } else if (this.indicator == "in_04") {
        url = this.path_api + "/in_04.php";
      } else if (this.indicator == "in_05") {
        url = this.path_api + "/in_05.php";
      } else if (this.indicator == "in_06") {
        url = this.path_api + "/in_06.php";
      } else if (this.indicator == "in_07") {
        url = this.path_api + "/in_07.php";
      } else if (this.indicator == "in_08") {
        url = this.path_api + "/in_08.php";
      } else if (this.indicator == "in_09") {
        url = this.path_api + "/in_09.php";
      }

      let data = await Axios.post(url, obj);
      this.downloadData = data.data;
      console.log(this.downloadData);
      this.loadingHide();
      this.isShowDownloadBtn = true;
    },

    async getEmail(id) {
      const url = this.path_api2 + "/getEmail.php?id=" + id;
      const result = await Axios.get(url);
      this.querySelected = "--- Please Select ---";

      this.email = result.data[0].email;

      if (result.data[0].query == "") {
        this.queryList = [];
      } else {
        let queryList = JSON.parse(result.data[0].query) || [];
        queryList.forEach((element, index) => {
          element.index = index;
        });
        this.queryList = queryList;
      }
    },

    async signIn() {
      this.loadingShow();
      const url = this.path_api2 + "/signIn.php";

      const obj = {
        email: this.login.email,
        password: this.login.password
      };
      let data = await Axios.post(url, obj);
      if (data.data == 0) {
        // Failed Login
        this.$q.notify({
          message: "Incorrect email address or password",
          color: "red"
        });
      } else {
        // Success Login
        this.$q.sessionStorage.set("uid", data.data[0].id);
        await this.getEmail(data.data[0].id);
        this.isLogin = false;
        this.$q.notify({
          message: `Welcome ${this.email}`,
          color: "secondary"
        });
        this.getCountryList();

        this.countryOptions = this.countryOptions.map(x => {
          return {
            label: x.label,
            value: x.iso,
            disable: x.disable ? true : false
          };
        });
      }

      this.loadingHide();
    },

    async register() {
      this.loadingShow();
      const url = this.path_api2 + "/signup.php";

      const obj = {
        email: this.signUp.email,
        password: this.signUp.password,
        country: this.signUp.country,
        organization: this.signUp.Organization,
        isSubscribe: this.signUp.isSubscribe
      };
      let data = await Axios.post(url, obj);

      if (data.data == 0) {
        this.$q.notify({
          message: "This email has already been taken.",
          color: "red"
        });
      } else {
        this.$q
          .dialog({
            html: true,
            title: "Please verify your email address",
            message: `You're almost there! We sent an email to <br><b>${this.signUp.email}</b><br><br> Just click on the link in that email to complete your signup.<br>If you don't see it, you may need to check your spam folder.`,
            cancel: true,
            persistent: true,
            ok: "Login"
          })
          .onOk(() => {
            this.isSignUp = false;
            this.isLogin = true;
          });
      }

      this.loadingHide();
    },
    deleteQuery() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to delete the query?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.queryList.splice(this.querySelected.index, 1);
          this.querySelected = "--- Please Select ---";
          this.$q.notify({
            message: "Query Deleted",
            color: "teal"
          });

          this.updateQueryToDb();
        });
    },
    saveQuery() {
      if (!this.query) {
        this.$q.notify({
          message: "Please enter query name.",
          color: "red"
        });
      } else {
        if (this.isEditQuery) {
          this.queryList[this.queryIndexTemp].label = this.query;
          this.queryList.push("");
          this.queryList.pop();
          this.$q.notify({
            message: "Query Updated",
            color: "teal"
          });
          this.isShowSaveQuery = false;
          this.updateQueryToDb();
        } else {
          let query = {
            indicator: this.indicator,
            exporting: this.exporting,
            importing: this.importing,
            exportingSector: this.sector,
            year: this.year,
            name: this.query
          };

          this.queryList.push({
            label: this.query,
            value: query
          });
          this.query = "";
          this.isShowSaveQuery = false;
          this.$q.notify({
            message: "Query Added",
            color: "teal"
          });
          this.updateQueryToDb();
        }
      }
    },
    editQuery() {
      let index = this.querySelected.index;
      this.queryIndexTemp = index;
      this.query = this.queryList[index].label;
      this.isShowSaveQuery = true;
      this.isEditQuery = true;
    },
    loadQuery() {
      this.exporting = this.querySelected.value.exporting;
      this.importing = this.querySelected.value.importing;
      this.sector = this.querySelected.value.exportingSector;
      this.year = this.querySelected.value.year;
      this.indicator = this.querySelected.value.indicator;
      this.isShowQueryList = false;
    },
    async updateQueryToDb() {
      this.loadingShow();
      const url = this.path_api2 + "/update_query.php";
      const obj = {
        uid: this.$q.sessionStorage.getItem("uid"),
        query: JSON.stringify(this.queryList)
      };
      let data = await Axios.post(url, obj);

      // console.log(data.data);
      this.getEmail(this.$q.sessionStorage.getItem("uid"));

      this.loadingHide();
    },
    signOut() {
      this.$q
        .dialog({
          html: true,
          title: "Sign Out",
          message: `Are you sure you want to sign out?`,
          cancel: true,
          persistent: true,
          ok: "Sign Out"
        })
        .onOk(() => {
          this.email = "";
          this.$q.sessionStorage.remove("uid");
          this.isLogin = true;
        });
    }
  },
  async mounted() {
    if (!this.$q.sessionStorage.has("uid")) {
      this.isLogin = true;
    } else {
      this.getCountryList();
      this.countryOptions = this.countryOptions.map(x => {
        return {
          label: x.label,
          value: x.iso,
          disable: x.disable ? true : false
        };
      });
      this.getEmail(this.$q.sessionStorage.getItem("uid"));
    }
    await this.getSectorList();
    this.$q.sessionStorage.set("shareLink", "riva.negotiatetrade.org/download");
    this.loadYearList();
    this.loadCountryList();
    this.loadSectorList();
  }
};
</script>

<style scoped></style>
