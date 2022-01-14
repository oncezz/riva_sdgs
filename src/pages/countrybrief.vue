<template>
  <q-page>
    <div class="col q-py-lg" align="center">
      <q-card class="my-card q-mx-lg" style="width: 900px;">
        <div class="text-h5 q-pt-md">Country Brief Data Generator</div>
        <div class="q-pa-md">
          <q-select
            outlined
            v-model="dataInput.year"
            :options="year"
            label="Year"
            dense
            style="width: 600px;"
          />
        </div>

        <div>
          <q-select
            outlined
            v-model="dataInput.country"
            :options="countryList"
            dense
            emit-value
            map-options
            label="Economy"
            style="width: 600px;"
          />
        </div>

        <div class="q-pa-md">
          <q-select
            outlined
            v-model="dataInput.dataSet"
            :options="dataSet"
            dense
            emit-value
            map-options
            label="Action"
            style="width: 600px;"
          />
        </div>

        <div class="q-pb-md">
          <q-btn
            no-caps
            class="bg4 font-content"
            label="Genereate Data"
            @click="genData()"
          />
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import json from "../../public/json/country_list_short.json";
export default {
  data() {
    return {
      year: [2007, 2011],
      dataSet: [
        {
          label: "Step 1 : Reset all data",
          value: 1
        },
        {
          label:
            "Step 2 : Recalculate Value-added structure of grossexports to world by exporter (all economies)",
          value: 2
        },
        {
          label:
            "Step 3 : Value-added structure of gross exports to world by exporter",
          value: 3
        },
        {
          label: "Step 4A : Gross and value-added trade balance#1",
          value: 4
        },
        {
          label: "Step 4B : Gross and value-added trade balance#2",
          value: 9
        },
        {
          label: "Step 5 : Global value chain relationships",
          value: 5
        },
        {
          label: "Step 6 : Participation in GVCs",
          value: 6
        },
        {
          label: "Step 7A : Backward linkages#1",
          value: 7
        },
        {
          label: "Step 7B : Backward linkages#2",
          value: 10
        },
        {
          label: "Step 8 : Forward linkages",
          value: 8
        }
      ],
      dataInput: {
        year: 2007,
        dataSet: 1,
        country: "ARG"
      },
      countryList: [
        {
          label: "art",
          value: "ARG"
        },
        {
          label: "art2",
          value: "2"
        }
      ]
    };
  },
  methods: {
    loadData() {
      this.loadingShow();

      let url = this.serverPath + "u_api/get_year.php";

      axios
        .get(url)
        .then(res => {
          this.setDataTemp(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      this.countryList = [];

      json.sort((a, b) => (a.name > b.name ? 1 : -1));

      json.forEach(x => {
        if (x.iso != "RoW" && x.iso != "RoLAC") {
          let temp = {
            label: x.name,
            value: x.iso
          };
          this.countryList.push(temp);
        }
      });
    },
    async genData() {
      this.loadingShow();
      //Step 1
      if (this.dataInput.dataSet == 1) {
        let url = this.serverPath + "u_api/cbreset.php";
        let res = await axios.post(url, JSON.stringify(this.dataInput));
        this.loadingHide();
        this.notifyGreen("Action completely");
      } else if (this.dataInput.dataSet == 2) {
        let url = this.serverPath + "u_api/cbstep2.php";
        let res = await axios.post(url, JSON.stringify(this.dataInput));
        this.loadingHide();
        this.notifyGreen("Action completely");
      }
      //step 3
      else if (this.dataInput.dataSet == 3) {
        let url = this.serverPath + "u_api/cbstep3.php";

        let res = await axios.post(url, JSON.stringify(this.dataInput));
        this.loadingHide();
        if (res.data != "finish") {
          this.notifyRed("Please choose action step 2 first.");
        } else {
          this.notifyGreen("Action completely");
        }
      }
      //step 4
      else if (this.dataInput.dataSet == 4) {
        let url = this.serverPath + "u_api/cbstep4.php";
        let res = await axios.post(url, JSON.stringify(this.dataInput));
        this.loadingHide();
        this.notifyGreen("Action completely");
      }
      //step 9
      else if (this.dataInput.dataSet == 9) {
        let url = this.serverPath + "u_api/cbstep4a.php";
        let res = await axios.post(url, JSON.stringify(this.dataInput));
        this.loadingHide();
        this.notifyGreen("Action completely");
      }
      //step 5
      else if (this.dataInput.dataSet == 5) {
        let url = this.serverPath + "u_api/cbstep5.php";
        let res = await axios.post(url, JSON.stringify(this.dataInput));
        this.loadingHide();
        this.notifyGreen("Action completely");
      }
      //step 6
      else if (this.dataInput.dataSet == 6) {
        let url = this.serverPath + "u_api/cbstep6.php";
        let res = await axios.post(url, JSON.stringify(this.dataInput));
        this.loadingHide();
        this.notifyGreen("Action completely");
      }
      //step 7
      else if (this.dataInput.dataSet == 7) {
        let url = this.serverPath + "u_api/cbstep7.php";
        let res = await axios.post(url, JSON.stringify(this.dataInput));
        this.loadingHide();
        this.notifyGreen("Action completely");
      }
      //step 7B
      else if (this.dataInput.dataSet == 10) {
        let url = this.serverPath + "u_api/cbstep7a.php";
        let res = await axios.post(url, JSON.stringify(this.dataInput));
        this.loadingHide();
        this.notifyGreen("Action completely");
      }
      //step 8
      else if (this.dataInput.dataSet == 8) {
        let url = this.serverPath + "u_api/cbstep8.php";
        let res = await axios.post(url, JSON.stringify(this.dataInput));
        this.loadingHide();
        this.notifyGreen("Action completely");
      }
    },
    setDataTemp(data) {
      this.year = [];
      let temp = data;
      temp.sort((a, b) => {
        return Number(a.year) - Number(b.year);
      });
      temp.forEach(x => {
        this.year.push(x.year);
      });
      // console.log(temp);

      // this.setYearOptions();

      this.loadingHide();
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped></style>
