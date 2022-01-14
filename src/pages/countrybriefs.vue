<template>
  <q-page>
    <global-value-chains-header
      :isShowTinaLink="false"
      :isDisableShare="false"
    ></global-value-chains-header>
    <div class="row">
      <!-- indicator -->
      <div style="width:250px" class>
        <img
          style="width:100%"
          class="full-height"
          src="../../public/countrybrief3.png"
          alt
        />
      </div>
      <div class="col q-pa-lg" style="background-color:#E5E1E1">
        <div style="width:90%;max-width:1200px; margin:auto;">
          <p align="center" class="font-24">Country brief</p>
          <p align="center">
            Get a summary of trade in value-added exports and GVC linkages for
            your economy of choice.
          </p>
        </div>

        <div
          class="bg-white q-py-lg q-px-xl rounded-borders"
          style="width:90%;max-width:1200px; margin:auto;"
        >
          <div class="row justify-center">
            <div class="col-4 q-px-md">
              <span>Economy</span>
              <q-select
                v-model="exp_country"
                :options="exp_optionsShow"
                outlined
                bg-color="white"
                dense
                use-input
                fill-input
                hide-selected
                @filter="filterCountry"
                @input="selectedExpCountry"
              >
                <template v-slot:prepend v-if="overviewCountry">
                  <gb-flag
                    v-if="overviewCountry.code && exp_country.code != 'TW'"
                    :code="overviewCountry.code"
                    size="small"
                  />
                </template>

                <template v-slot:option="scope" v-if="exp_country.code != 'TW'">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section avatar>
                      <gb-flag
                        v-if="scope.opt.code && scope.opt.code != 'TW'"
                        :code="scope.opt.code"
                        size="small"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label v-html="scope.opt.label" />
                      <q-item-label caption>{{
                        scope.opt.description
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>

          <div class="row justify-center q-mt-md">
            <div class="col-4 q-px-md">
              <span>Year</span>
              <q-select
                v-model="year"
                :options="yearOptions"
                outlined
                bg-color="white"
                emit-value
                map-options
                dense
                @input="selectedYear"
              ></q-select>
            </div>
          </div>
          <div class="row q-mt-md">
            <div
              class="col-12 row justify-center q-col-gutter-md"
              align="center"
            >
              <!-- @click="$router.push('/countrybriefs/data')" -->

              <div>
                <q-btn
                  label="Generate"
                  no-caps
                  style="width:150px;background-color:#2C2F30;"
                  class="text-white"
                  @click="genarateData()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <my-footer></my-footer>
  </q-page>
</template>

<script>
import Axios from "axios";
import countryJson from "../../public/country_list_short.json";
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
      exp_country: "",
      exp_optionsShow: [],
      year: 2017,
      yearOptions: []
    };
  },
  methods: {
    selectedYear() {
      this.$q.sessionStorage.set("year", this.year);
    },
    selectedExpCountry() {
      this.$q.sessionStorage.set("expe", this.exp_country.iso);
    },
    filterCountry(val, update) {
      update(async () => {
        this.exp_optionsShow = this.countryOptions.filter(
          x => x.label.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    },
    async getYear() {
      let url = this.path_api + "/get_year_active.php";

      let data = await Axios.get(url);

      let temp = [];

      data.data.forEach(element => {
        temp.push({ value: Number(element), label: element });
      });
      this.yearOptions = temp;
    },
    async genarateData() {
      // let urlLink =
      //   this.path_api +
      //   `/country_brief_set1.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      // this.loadingShow();

      // let getData = await Axios.get(urlLink);

      // console.log(`%c${getData.data}`, "color:green");

      // urlLink =
      //   this.path_api +
      //   `/country_brief_set2.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      // getData = await Axios.get(urlLink);

      // console.log(`%c${getData.data}`, "color:green");

      // urlLink =
      //   this.path_api +
      //   `/country_brief_set3.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      // getData = await Axios.get(urlLink);

      // console.log(`%c${getData.data}`, "color:green");

      // urlLink =
      //   this.path_api +
      //   `/country_brief_set4.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      // getData = await Axios.get(urlLink);

      // console.log(`%c${getData.data}`, "color:green");

      // urlLink =
      //   this.path_api +
      //   `/country_brief_set5.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      // getData = await Axios.get(urlLink);

      // console.log(`%c${getData.data}`, "color:green");

      // urlLink =
      //   this.path_api +
      //   `/country_brief_set6.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      // getData = await Axios.get(urlLink);

      // console.log(`%c${getData.data}`, "color:green");

      // urlLink =
      //   this.path_api +
      //   `/country_brief_set7.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      // getData = await Axios.get(urlLink);

      // console.log(`%c${getData.data}`, "color:green");

      // urlLink =
      //   this.path_api +
      //   `/country_brief_set8.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      // getData = await Axios.get(urlLink);

      // console.log(`%c${getData.data}`, "color:green");

      // urlLink =
      //   this.path_api +
      //   `/country_brief_set9.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      // getData = await Axios.get(urlLink);

      // console.log(`%c${getData.data}`, "color:green");

      // urlLink =
      //   this.path_api +
      //   `/country_brief_set10.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      // getData = await Axios.get(urlLink);

      // console.log(`%c${getData.data}`, "color:green");

      // urlLink =
      //   this.path_api +
      //   `/country_brief_set11.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      // getData = await Axios.get(urlLink);

      // console.log(`%c${getData.data}`, "color:green");

      // urlLink =
      //   this.path_api +
      //   `/country_brief_set12.php?exp_country=${this.exp_country.iso}&year=${this.year}`;

      // getData = await Axios.get(urlLink);

      // console.log(`%c${getData.data}`, "color:green");

      setTimeout(() => {
        // this.loadingHide();

        this.$router.push("/countrybriefs/data");
      }, 1000);
    }
  },
  computed: {
    overviewCountry() {
      if (this.exp_country) {
        let res = this.countryOptions.filter(
          x => x.value == this.exp_country.value
        )[0];

        return res;
      }
    }
  },
  async mounted() {
    await this.getCountryListShort();
    await this.getYear();
    this.selectedYear();

    // if (this.$q.sessionStorage.has("year") || this.$route.params.year) {
    //   this.year = this.$route.params.year
    //     ? this.$route.params.year
    //     : this.$q.sessionStorage.getItem("year");
    // }

    // if (this.$q.sessionStorage.has("expe") || this.$route.params.expe) {
    //   this.exp_country = this.$route.params.expe
    //     ? this.countryOptions.filter(x => x.iso == this.$route.params.expe)[0]
    //     : this.countryOptions.filter(
    //         x => x.iso == this.$q.sessionStorage.getItem("expe")
    //       )[0];

    //   this.exp_optionsShow = this.countryOptions;
    // }
  }
};
</script>

<style scoped></style>
