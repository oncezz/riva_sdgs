<template>
  <q-page>
    <!-- Header Button -->
    <div class="q-pa-md q-py-lg row justify-between">
      <div class="row">
        <div>
          <q-btn
            label="RI Mode"
            no-caps
            class="bg4 font-content"
            style="width:200px;border-radius:10px"
            v-show="modeDisplay == 'VA'"
          ></q-btn>
          <q-btn
            label="RI Mode"
            no-caps
            class="font-content"
            style="width:200px;border-radius:10px"
            @click="vaModeBtn()"
            v-show="modeDisplay == 'RI'"
          ></q-btn>
        </div>
        <div class="q-pl-md">
          <q-btn
            label="VA Mode"
            no-caps
            class="bg4 font-content"
            style="width:200px;border-radius:10px"
            v-show="modeDisplay == 'RI'"
          ></q-btn>
          <q-btn
            label="VA Mode"
            no-caps
            class="font-content"
            style="width:200px;border-radius:10px"
            @click="riModeBtn()"
            v-show="modeDisplay == 'VA'"
          ></q-btn>
        </div>
      </div>

      <div align="right">
        <q-btn
          label="Add Year"
          no-caps
          class="bg4 font-content"
          style="width:200px;border-radius:10px"
          @click="addYearDialog()"
          v-show="modeDisplay == 'RI'"
        ></q-btn>

        <q-btn
          label="Add Year"
          no-caps
          class="bg4 font-content"
          style="width:200px;border-radius:10px"
          @click="addYearDialogVA()"
          v-show="modeDisplay == 'VA'"
        ></q-btn>
      </div>
    </div>

    <!-- Body Content RI Mode -->
    <div class="q-px-md q-pb-md" v-show="modeDisplay == 'RI'">
      <table class="table shadow-1">
        <tr style="font-size:16px;" class="bg12a">
          <th style="padding:14px;border-top-left-radius:5px;">
            <div align="left" class="q-px-sm">
              <span>Year</span>
            </div>
          </th>
          <th style="padding:10px;">
            <div>
              <span>Status</span>
            </div>
          </th>
          <th style="border-top-right-radius:5px;">
            <div>
              <span>Delete</span>
            </div>
          </th>
        </tr>
        <tr v-if="!yearList.length">
          <td colspan="3">
            <div class="q-pa-md row items-center">
              <q-icon
                size="xs"
                name="fas fa-exclamation-triangle"
                class="q-mr-sm"
              ></q-icon>
              <span style="font-size:12px;">No Data available</span>
            </div>
          </td>
        </tr>
        <tr
          v-if="yearList.length"
          style="font-size:16px;"
          v-for="(item, index) in yearList"
          :key="index"
          :class="index % 2 == 1 ? 'bg-grey-4' : ''"
        >
          <td>
            <div class="q-pa-sm q-px-md">
              <span>{{ item.year }}</span>
            </div>
          </td>
          <td style="width:70%;">
            <div class="q-pa-sm" align="center">
              <span
                class="cursor-pointer"
                style="text-decoration:underline;"
                @click="updateData(item.status, item.year)"
                >{{ item.status == 1 ? "Active" : "Inactive" }}</span
              >
            </div>
          </td>
          <td style="width:150px;">
            <div class="q-pa-sm" align="center">
              <q-btn
                dense
                flat
                round
                @click="(isDialogDelete = true), (selectDeleteYear = item.year)"
              >
                <q-icon size="xs" name="fas fa-trash-alt"></q-icon>
              </q-btn>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Body Content VA Mode -->
    <div class="q-px-md q-pb-md" v-show="modeDisplay == 'VA'">
      <table class="table shadow-1">
        <tr style="font-size:16px;" class="bg12a">
          <th style="padding:14px;border-top-left-radius:5px;">
            <div align="left" class="q-px-sm">
              <span>Year</span>
            </div>
          </th>
          <th style="padding:10px;">
            <div>
              <span>Status</span>
            </div>
          </th>
          <th style="border-top-right-radius:5px;">
            <div>
              <span>Delete</span>
            </div>
          </th>
        </tr>
        <tr v-if="!yearListVA.length">
          <td colspan="3">
            <div class="q-pa-md row items-center">
              <q-icon
                size="xs"
                name="fas fa-exclamation-triangle"
                class="q-mr-sm"
              ></q-icon>
              <span style="font-size:12px;">No Data available</span>
            </div>
          </td>
        </tr>
        <tr
          v-if="yearListVA.length"
          style="font-size:16px;"
          v-for="(item, index) in yearListVA"
          :key="index"
          :class="index % 2 == 1 ? 'bg-grey-4' : ''"
        >
          <td>
            <div class="q-pa-sm q-px-md">
              <span>{{ item.year }}</span>
            </div>
          </td>
          <td style="width:70%;">
            <div class="q-pa-sm" align="center">
              <span
                class="cursor-pointer"
                style="text-decoration:underline;"
                @click="updateDataVA(item.status, item.year)"
                >{{ item.status == 1 ? "Active" : "Inactive" }}</span
              >
            </div>
          </td>
          <td style="width:150px;">
            <div class="q-pa-sm" align="center">
              <q-btn
                dense
                flat
                round
                @click="
                  (isDialogDeleteVA = true), (selectDeleteYearVA = item.year)
                "
              >
                <q-icon size="xs" name="fas fa-trash-alt"></q-icon>
              </q-btn>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Dialog Popup RI Mode -->
    <q-dialog v-model="isAddData" persistent>
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Add Year</span>
        </q-card-section>

        <q-card-section class="q-py-lg" align="center">
          <div style="width:150px;">
            <div align="left">
              <span style="font-size:16px;">Year</span>
            </div>
            <q-select
              outlined
              :options="yearOptions"
              v-model="yearSelected"
            ></q-select>
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
              @click="saveData()"
              no-caps
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog Popup VA Mode-->
    <q-dialog v-model="isAddDataVA" persistent>
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Add Yearx</span>
        </q-card-section>

        <q-card-section class="q-py-lg" align="center">
          <div style="width:150px;">
            <div align="left">
              <span style="font-size:16px;">Year</span>
            </div>
            <q-select
              outlined
              :options="yearOptionsVA"
              v-model="yearSelectedVA"
            ></q-select>
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
              @click="saveDataVA()"
              no-caps
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
            <span style="font-size:16px;"
              >Do you really want to delete “{{ selectDeleteYear }}”?</span
            >
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
              @click="deleteData(selectDeleteYear)"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isDialogDeleteVA">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Are you sure?</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;"
              >Do you really want to delete “{{ selectDeleteYearVA }}”?</span
            >
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
              @click="deleteDataVA(selectDeleteYearVA)"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Dialog Save Completely -->
    <q-dialog v-model="isSaveCompletely">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Add year completely</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;"
              >Add “{{ yearAdded }}” completely</span
            >
          </div>
        </q-card-section>

        <q-card-actions class="q-py-lg" align="center">
          <div>
            <q-btn
              class="font-content q-mx-md bg4"
              style="width:150px;border-radius:10px;"
              label="OK"
              @click="userDetails = {}"
              v-close-popup
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog Save Completely RI Mode-->
    <q-dialog v-model="isDialogDeleteSuccess">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Done</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;"
              >“{{ selectDeleteYear }}” is successfully deleted</span
            >
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

    <!-- Dialog Save Completely VA Mode-->
    <q-dialog v-model="isDialogDeleteSuccessVA">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Done</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;"
              >“{{ selectDeleteYearVA }}” is successfully deleted</span
            >
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
import axios from "axios";
export default {
  data() {
    return {
      modeDisplay: "RI",
      selectDeleteYear: "",
      selectDeleteYearVA: "",
      yearSelected: null,
      yearSelectedVA: null,
      yearOptions: [],
      yearOptionsVA: [],
      pagination: {
        page: 1,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          align: "left",
          label: "Year",
          style: "font-size:16px;"
        },
        {
          name: "status",
          align: "center",
          label: "Status",
          style: "font-size:16px;text-decoration:underline"
        },
        {
          name: "delete",
          align: "center",
          label: "Delete",
          style: "width:150px;font-size:16px;"
        }
      ],
      yearList: [],
      yearListVA: [],
      isAddData: false,
      isAddDataVA: false,

      isDialogDelete: false,
      isDialogDeleteVA: false,
      isSaveCompletely: false,

      isDialogDeleteSuccess: false,
      isDialogDeleteSuccessVA: false,
      yearAdded: ""
    };
  },
  methods: {
    // RI Mode
    riModeBtn() {
      // ปุ่ม RI Mode
      this.modeDisplay = "RI";
    },
    addYearDialog() {
      //เพิ่มตัวเลือกในปี
      for (let i = 2001; i <= 2040; i++) {
        this.yearOptions.push(i);
      }
      this.yearList.forEach(y => {
        let index = this.yearOptions.findIndex(x => x == y.year);
        this.yearOptions.splice(index, 1);
      });
      this.yearSelected = this.yearOptions[0];
      //เปิด Dialog year
      this.isAddData = true;
    },
    async saveData() {
      //เพิ่มปีใหม่เข้ามา
      let sendData = {
        year: this.yearSelected
      };
      this.yearAdded = this.yearSelected;
      let url = this.serverPath + "u_api/add_year.php";

      this.isAddData = false;

      let res = await axios.post(url, JSON.stringify(sendData));
      if (res.data == "Error Dulpicate Data") {
      } else {
        this.sortYear(res.data);
        this.isSaveCompletely = true;
      }
    },
    sortYear(data) {
      //เรียงปีเพื่อใช้ในการแสดง
      let temp = data;
      temp.sort((a, b) => {
        return Number(a.year) - Number(b.year);
      });
      this.yearList = temp;
    },
    deleteData(year) {
      //ลบปี
      this.isDialogDelete = false;
      let sendData = {
        year: year
      };
      let url = this.serverPath + "u_api/delete_year.php";
      axios.post(url, JSON.stringify(sendData)).then(res => {
        this.sortYear(res.data);
        this.isDialogDeleteSuccess = true;
      });
    },
    updateData(status, year) {
      //เปลี่ยน status
      if (status == 0) {
        status = 1;
      } else {
        status = 0;
      }
      let sendData = {
        year: year,
        status: status
      };
      let url = this.serverPath + "u_api/update_year.php";
      axios.post(url, JSON.stringify(sendData)).then(res => {
        this.sortYear(res.data);
      });
    },

    //VA Mode
    vaModeBtn() {
      //ปุ่มเปลี่ยน VA Mode
      this.modeDisplay = "VA";
    },
    updateDataVA(status, year) {
      //เปลี่ยน status
      if (status == 0) {
        status = 1;
      } else {
        status = 0;
      }
      let sendData = {
        year: year,
        status: status
      };
      let url = this.serverPath + "u_api/va_update_year.php";
      axios.post(url, JSON.stringify(sendData)).then(res => {
        this.sortYearVA(res.data);
      });
    },
    sortYearVA(data) {
      //เรียงปีเพื่อใช้ในการแสดง
      let temp = data;
      temp.sort((a, b) => {
        return Number(a.year) - Number(b.year);
      });
      this.yearListVA = temp;
    },
    addYearDialogVA() {
      //เพิ่มตัวเลือกในปี
      for (let i = 2001; i <= 2040; i++) {
        this.yearOptionsVA.push(i);
      }
      this.yearListVA.forEach(y => {
        let index = this.yearOptionsVA.findIndex(x => x == y.year);
        this.yearOptionsVA.splice(index, 1);
      });
      this.yearSelectedVA = this.yearOptionsVA[0];
      //เปิด Dialog year
      this.isAddDataVA = true;
    },
    async saveDataVA() {
      //เพิ่มปีใหม่เข้ามา
      let sendData = {
        year: this.yearSelectedVA
      };
      this.yearAdded = this.yearSelectedVA;
      let url = this.serverPath + "u_api/va_add_year.php";

      this.isAddDataVA = false;

      let res = await axios.post(url, JSON.stringify(sendData));
      if (res.data == "Error Dulpicate Data") {
      } else {
        this.sortYearVA(res.data);
        this.isSaveCompletely = true;
      }
    },
    deleteDataVA(year) {
      //ลบปี
      this.isDialogDeleteVA = false;
      let sendData = {
        year: year
      };
      let url = this.serverPath + "u_api/va_delete_year.php";
      axios.post(url, JSON.stringify(sendData)).then(res => {
        this.sortYearVA(res.data);
        this.isDialogDeleteSuccessVA = true;
      });
    },

    async loadData() {
      //Load ข้อมูลเบื้องต้น
      let url = this.serverPath + "u_api/get_year.php";
      let res = await axios.get(url);
      this.sortYear(res.data);
      let url2 = this.serverPath + "u_api/va_year_list.php";
      let res2 = await axios.get(url2);
      let temp2 = res2.data;
      this.sortYearVA(res2.data);
      // temp2.sort((a, b) => {
      //   return Number(a.year) - Number(b.year);
      // });
      // this.yearListVA = temp2;
      // this.setYearOptionsVA;
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}
.btMode {
  width: 200px;
  border: 1px solid black;
  border-radius: 10px;
}
</style>
