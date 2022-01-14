<template>
  <q-page>
    <!-- Header Button -->
    <div class="q-pa-md q-py-lg">
      <div align="right">
        <q-btn
          label="Add user"
          no-caps
          class="bg4 font-content"
          style="width:200px;border-radius:10px"
          @click="isDialogAddUser = true,userDetails = {},isAddMode = true"
        ></q-btn>
      </div>
    </div>

    <!-- Body Content -->
    <div class="q-px-md q-pb-md">
      <table class="table shadow-1">
        <tr style="font-size:16px;" class="bg12">
          <th style="padding:14px;border-top-left-radius:5px;width:30%;">
            <div align="left" class="q-px-sm">
              <span>Username</span>
            </div>
          </th>
          <th style="padding:10px;width:30%;">
            <div>
              <span>Email</span>
            </div>
          </th>
          <th style="width:150px;">
            <div>
              <span>Delete</span>
            </div>
          </th>
          <th style="border-top-right-radius:5px;width:150px;">
            <div>
              <span>Edit</span>
            </div>
          </th>
        </tr>
        <tr v-if="!userList.length">
          <td colspan="4">
            <div class="q-pa-md row items-center">
              <q-icon size="xs" name="fas fa-exclamation-triangle" class="q-mr-sm"></q-icon>
              <span style="font-size:12px;">No Data available</span>
            </div>
          </td>
        </tr>
        <tr
          v-if="userList.length"
          style="font-size:16px;"
          v-for="(item,index) in userList"
          :key="index"
          :class="index % 2 == 1 ? 'bg-grey-4' : ''"
        >
          <td>
            <div class="q-pa-sm q-px-md">
              <span>{{ item.username }}</span>
            </div>
          </td>
          <td style="width:50%;">
            <div class="q-pa-sm" align="center">
              <span>{{item.email}}</span>
            </div>
          </td>
          <td style="width:150px;">
            <div class="q-pa-sm" align="center">
              <span v-if="item.status == 'admin'">-</span>
              <q-btn
                dense
                flat
                round
                v-if="item.status == 'user'"
                @click="isDialogDelete = true,showNameDelete = item.username,deleteKey = item.id"
              >
                <q-icon size="xs" name="fas fa-trash-alt"></q-icon>
              </q-btn>
            </div>
          </td>
          <td style="width:150px;">
            <div class="q-pa-sm" align="center">
              <q-btn dense flat round @click="editUser(item)">
                <q-icon size="xs" name="fas fa-edit"></q-icon>
              </q-btn>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Dialog Popup -->
    <q-dialog v-model="isDialogAddUser" persistent>
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">{{isAddMode ? 'Add' : 'Edit'}} user</span>
        </q-card-section>

        <q-card-section class="q-py-md" align="center">
          <div style="width:320px;">
            <div align="left">
              <span style="font-size:16px;">Username</span>
            </div>
            <q-input
              :readonly="!isAddMode"
              outlined
              v-model="userDetails.username"
              :rules="[val => !!val]"
              ref="username"
            ></q-input>
          </div>
          <div style="width:320px;">
            <div align="left">
              <span style="font-size:16px;">Email</span>
            </div>
            <q-input
              outlined
              v-model="userDetails.email"
              :rules="[val => !!val,validatePatternEmail,validateCheckHasEmail]"
              ref="email"
            ></q-input>
          </div>
          <div style="width:320px;">
            <div align="left">
              <span style="font-size:16px;">Password</span>
            </div>
            <q-input
              outlined
              v-model="userDetails.password"
              :rules="[val => !!val ,val => val.length >= 6]"
              ref="password"
            ></q-input>
            <div align="left">
              <span class="text-grey-6">At least 6 characters</span>
            </div>
          </div>
        </q-card-section>

        <q-card-actions class="q-py-lg" align="center">
          <div>
            <q-btn
              class="font-content q-mx-md"
              style="width:150px;border-radius:10px;"
              outline
              label="Cancel"
              color="black"
              v-close-popup
              no-caps
            />
            <q-btn
              class="font-content q-mx-md bg4"
              style="width:150px;border-radius:10px;"
              label="Save"
              no-caps
              @click="saveData()"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isDialogDelete">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Are you sure?</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;">Do you really want to delete “{{showNameDelete}}”?</span>
          </div>
        </q-card-section>

        <q-card-actions class="q-py-lg" align="center">
          <div>
            <q-btn
              class="font-content q-mx-md"
              style="width:150px;border-radius:10px;"
              outline
              label="Cancel"
              color="black"
              v-close-popup
              no-caps
            />
            <q-btn
              class="font-content q-mx-md bg4"
              style="width:150px;border-radius:10px;"
              label="Delete"
              no-caps
              @click="deleteUser()"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog Save Completely -->
    <q-dialog v-model="isDialogSaveCompletely" persistent>
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">{{isAddMode ? 'Add' : 'Edit'}} user completely</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span
              style="font-size:16px;"
            >{{isAddMode ? 'Add' : 'Edit'}} “{{userDetails.username}}” completely</span>
          </div>
        </q-card-section>

        <q-card-actions class="q-py-lg" align="center">
          <div>
            <q-btn
              class="font-content q-mx-md bg4"
              style="width:150px;border-radius:10px;"
              label="OK"
              v-close-popup
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog Delete Completely -->
    <q-dialog v-model="isDialogDeleteCompletely">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Delete completely</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;">Delete “{{showNameDelete}}” complete</span>
          </div>
        </q-card-section>

        <q-card-actions class="q-py-lg" align="center">
          <div>
            <q-btn
              class="font-content q-mx-md bg4"
              style="width:150px;border-radius:10px;"
              label="OK"
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
      // รายละเอียดข้อมูลผู้ใช้งาน
      userDetails: {
        username: "",
        email: "",
        password: "",
      },
      deleteKey: "",
      showNameDelete: "",
      userEditDetails: {},
      userList: [], // ข้อมูลผู้ใช้งานทั้งหมด
      isAddMode: true, // เช็คสถานะ true = เพิ่มผู้ใช้งาน , false = แก้ไขผู้ใช้งาน
      isDialogAddUser: false, // ใช้ในการเปิดปิด Dialog สำหรับเพิ่มและแก้ไข
      isDialogDelete: false, // เปิด Dialog สำหรับลบข้อมูล
      isDialogSaveCompletely: false, // เปิด Dialog บันทึกข้อมูลเรียบร้อย

      isDialogDeleteCompletely: false, // เปิด Dialog Delete completely
    };
  },
  methods: {
    deleteUser() {
      this.isDialogDelete = false;

      let url = this.serverPath + "u_api/delete_user.php";

      axios
        .post(url, JSON.stringify(this.deleteKey))
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            this.isDialogDeleteCompletely = true;
            this.setDataTemp(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editUser(data) {
      this.isDialogAddUser = true;
      this.isAddMode = false;

      this.userDetails = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      this.userEditDetails = { id: data.id, ...this.userDetails };
    },
    // เช็คความถูกต้องของรูปแบบอีเมล
    validatePatternEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    // เช็คว่ามีอีเมลอยู่ในระบบแล้วหรือยัง
    validateCheckHasEmail() {
      // กรณีเป็น add user
      if (this.isAddMode) {
        // เช็คว่ามีข้อมูล user ในระบบไหม
        let checkEmail = this.userList.filter(
          (x) => x.email === this.userDetails.email
        );

        // มี email แล้ว
        if (checkEmail.length) {
          this.notifyRed("มีอีเมลนี้อยู่ในระบบแล้ว");
          return !checkEmail.length;
        }
      }
      // กรณีเป็น Edit user
      else {
        // กรณีถ้า email ไม่เท่ากับ email เดิมให้เช็คว่ามี email ซ้ำไหม
        if (this.userEditDetails.email != this.userDetails.email) {
          let checkEmail = this.userList.filter(
            (x) => x.email == this.userDetails.email
          );

          // มี email แล้ว
          if (checkEmail.length) {
            this.notifyRed("มีอีเมลนี้อยู่ในระบบแล้ว");
            return !checkEmail.length;
          }
        }
      }
    },
    async saveData() {
      this.$refs.username.validate();
      this.$refs.email.validate();
      this.$refs.password.validate();

      if (
        this.$refs.password.hasError ||
        this.$refs.email.hasError ||
        this.$refs.username.hasError
      ) {
        return;
      }

      this.isDialogAddUser = false;

      let data;
      let url = "";

      let sendData = { ...this.userDetails };

      if (this.isAddMode) {
        url = this.serverPath + "u_api/add_user.php";
      } else {
        url = this.serverPath + "u_api/edit_user.php";

        sendData.id = this.userEditDetails.id;
      }

      let res = await axios
        .post(url, (data = JSON.stringify(sendData)))
        .catch((err) => {
          console.log(err);
        });

      if (res.data == "Error Dulpicate Email") {
      } else {
        this.isDialogSaveCompletely = true;
        this.setDataTemp(res.data);
      }
    },
    setDataTemp(data) {
      let temp = [];
      temp = data;
      temp.sort((a, b) => {
        return a.username > b.username ? 1 : -1;
      });

      this.userList = temp;
    },
    loadData() {
      this.loadingShow();

      let url = this.serverPath + "u_api/get_user.php";
      axios
        .get(url)
        .then((res) => {
          if (res.data) {
            this.setDataTemp(res.data);
          }

          this.loadingHide();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}
</style>