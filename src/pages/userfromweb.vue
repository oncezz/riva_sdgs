<template>
  <q-page>
    <!-- Header Button -->
    <div class="q-pa-md q-py-lg">
      <div align="right">
        <q-btn
          label="Export Data"
          no-caps
          class="bg4 font-content"
          style="width:200px;border-radius:10px"
          @click="exportData()"
        ></q-btn>
      </div>

      <!-- Body Content -->
      <div class="q-pa-md">
        <q-table :data="userData" :pagination.sync="pagination" :columns="columns" row-key="name">
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="text-white"
                style="background-color: #020B3B; font-size:14px"
              >{{ col.label }}</q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="date" :props="props">{{ props.row.dateTime }}</q-td>
              <q-td key="email" :props="props">{{ props.row.email}}</q-td>
              <q-td key="password" :props="props">{{ props.row.password}}</q-td>
              <q-td key="country" :props="props">{{ props.row.country}}</q-td>
              <q-td key="organization" :props="props">{{ props.row.organization}}</q-td>
              <q-td key="validation" :props="props">{{ props.row.is_validation==1?'yes':'no'}}</q-td>
              <q-td key="subscribe" :props="props">{{ props.row.is_subscribe==1?'yes':'no'}}</q-td>
              <q-td key="delete" :props="props">
                <q-icon
                  @click="deleteUserPromt(props.row.id, props.row.email)"
                  class="cursor-pointer"
                  size="18px"
                  name="fas fa-trash-alt"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>

    <!-- Dialog confirm delete -->
    <q-dialog v-model="isDialogDelete">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Are you sure?</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;">
              Do you really want to delete
              <br />
              {{showNameDelete}} ?
            </span>
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
import XLSX from "xlsx"; // import xlsx
export default {
  data() {
    return {
      isDialogDelete: false,
      userIdDelete: "",
      isDialogDeleteCompletely: false,
      showNameDelete: "",
      pagination: { rowsPerPage: 50 },
      columns: [
        {
          name: "date",
          align: "left",
          label: "Date",
          field: "date",
          style: "width:150px",
        },
        {
          name: "email",
          align: "center",
          label: "Email",
          field: "email",
        },
        {
          name: "password",
          align: "center",
          label: "Password",
          field: "password",
          style: "width:100px",
        },
        {
          name: "country",
          align: "center",
          label: "Country",
          field: "country",
          style: "width:150px",
        },
        {
          name: "organization",
          align: "center",
          label: "Organization",
          field: "organization",
          style: "width:150px",
        },
        {
          name: "validation",
          align: "center",
          label: "Validation",
          field: "is_validation",
          style: "width:150px",
        },
        {
          name: "subscribe",
          align: "center",
          label: "Subscribe",
          field: "is_subscribe",
          style: "width:150px",
        },
        {
          name: "delete",
          align: "center",
          label: "Delete",
          field: "delete",
          style: "width:100px",
        },
      ],
      userData: [],
    };
  },
  methods: {
    exportData() {
      // console.log("export Data");
      let exportData = [];

      this.userData.forEach((element) => {
        exportData.push({
          Email: element.email,
          Password: element.password,
          Country: element.country,
          Organization: element.organization,
          Validation: element.is_validation == "1" ? "Yes" : "No",
          Subscribe: element.is_subscribe == "1" ? "Yes" : "No",
        });
      });

      const dataWS = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "export.xlsx");
    },
    loadUser() {
      this.loadingShow();
      this.userData = [];
      let url = this.serverPath + "u_api/get_userweb.php";
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            this.userData = res.data;
          }

          this.loadingHide();
        })
        .catch((err) => {
          console.log(err);
          this.loadingHide();
        });
    },
    deleteUserPromt(id, email) {
      this.showNameDelete = email;
      this.isDialogDelete = true;
      this.userIdDelete = id;
    },
    deleteUser() {
      let id = this.userIdDelete;
      let url = this.serverPath + "u_api/delete_userweb.php";

      axios
        .post(url, JSON.stringify(id))
        .then((res) => {
          this.loadUser();
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(this.userData);
      this.isDialogDelete = false;
      this.isDialogDeleteCompletely = true;
    },
  },

  mounted() {
    this.loadUser();
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}
</style>