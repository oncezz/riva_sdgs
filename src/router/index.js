import Vue from "vue";
import HighchartsVue from "highcharts-vue";
import VueRouter from "vue-router";
import routes from "./routes";
import JsonCSV from "vue-json-csv";
import CountryFlag from "vue-country-flag";
import axios from "axios";
import VueAxios from "vue-axios";
import VueGtag from "vue-gtag";

import VueFlags from "@growthbunker/vueflags";
import VueSocialSharing from "vue-social-sharing";
var VueScrollTo = require("vue-scrollto");
Vue.use(VueGtag, {
  config: { id: "UA-1234567-1" },
});
Vue.use(VueScrollTo);
Vue.use(VueRouter);
Vue.use(HighchartsVue);
Vue.component("downloadCsv", JsonCSV);
Vue.component("country-flag", CountryFlag);
Vue.use(VueSocialSharing);
Vue.use(VueAxios, axios);
Vue.use(VueFlags, {
  // Specify the path of the folder where the flags are stored.
  iconPath: "../flags",
});
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  return Router;
}
import countryJson from "../../public/country_list.json";
import countryJsonShort from "../../public/country_list_short.json";
import sectorJson from "../../public/sectorListNew.json";
import json from "../../public/json/country_list.json";
Vue.mixin({
  data() {
    return {
      serverPath: "https://riva.negotiatetrade.org/",
      path_api2: "https://riva.negotiatetrade.org/u_api",
      // path_api2: "http://localhost/u_api",
      // path_api: "http://localhost/u_api",
      path_api: "https://riva.negotiatetrade.org/u_api",
      // ri_api: "https://yaksaconcept.com/ri_api/",
      ri_api: "http://localhost/ri_api/",
      exportAvailable: [
        "AUS",
        "BTN",
        "BRN",
        "KHM",
        "JFI",
        "HKG",
        "IND",
        "IDN",
        "JPN",
        "KAZ",
        "KGZ",
        "LAO",
        "MYS",
        "MDV",
        "MNG",
        "NPL",
        "PAK",
        "PHL",
        "CHN",
        "RUS",
        "SGP",
        "THA",
        "TUR",
        "VNM",
      ],
      exportingGraphOptions: {
        buttons: {
          contextButton: {
            menuItems: [
              "downloadPNG",
              "downloadJPEG",
              "separator",
              "downloadCSV",
              "downloadXLS",
            ],
          },
        },
        width: "1280px",
        chartOptions: {
          legend: {
            width: 180,
            itemStyle: {
              fontSize: "7px",
              fontWeight: "medium",
              fontFamily: "roboto",
              color: "#00000",
            },
          },
          title: {
            style: { fontSize: "12px" },
          },
          subtitle: {
            style: { fontSize: "8px" },
          },
        },
      },
    };
  },

  methods: {
    getCountryList() {
      let tempOptions = [];

      // CID = country id
      // impEc = Importing economy id
      countryJson.forEach((element) => {
        let data = {
          label: element.name,
          value: element.id,
          region: element.region,
          iso: element.iso,
          index: element.id,
          code: element.code,
          region2: element.region2,
          disable: element.disable ? true : false,
        };
        tempOptions.push(data);
      });
      // tempOptions.sort((a, b) => (a.label > b.label ? 1 : -1));

      this.countryOptions = tempOptions;
      // this.countrySelected = ""
      // this.importingEconomy = ""
      // this.sourceEconomy = ""
    },
    getCountryListShort() {
      let tempOptions = [];

      // CID = country id
      // impEc = Importing economy id
      countryJsonShort.forEach((element) => {
        let data = {
          label: element.name,
          value: element.id,
          region: element.region,
          iso: element.iso,
          index: element.id,
          code: element.code,
          region2: element.region2,
        };
        tempOptions.push(data);
      });
      tempOptions.sort((a, b) => (a.label > b.label ? 1 : -1));

      this.countryOptions = tempOptions;
      // this.countrySelected = ""
      // this.importingEconomy = ""
      // this.sourceEconomy = ""
    },
    getSectorList() {
      let tempOptions = [];
      sectorJson.forEach((element) => {
        let data = {
          label: element.name,
          value: element.id,
          disable: element.disable || false,
        };
        tempOptions.push(data);
      });
      this.sectorOptions = tempOptions;
      this.sectorSelected = "";
    },
    notifyGreen(message) {
      this.$q.notify({
        message: message,
        color: "green",
        position: "top",
        timeout: "2500",
      });
    },
    notifyRed(message) {
      this.$q.notify({
        message: message,
        color: "negative",
        position: "top",
        timeout: "2500",
      });
    },
    loadingShow() {
      this.$q.loading.show({
        delay: 400,
      });
    },
    loadingHide() {
      this.$q.loading.hide();
    },
    checkPlatform() {
      if (this.$q.platform.is.mobile) {
        this.$router.push("/not-support");
      }
    },
    countryGroupList(iso) {
      if (iso == "enea") {
        return ["HKG", "KOR", "MNG", "JPN", "TWN", "CHN"];
      } else if (iso == "sea") {
        return ["BRN", "KHM", "IDN", "LAO", "MYS", "PHL", "SGP", "THA", "VNM"];
      } else if (iso == "sswa") {
        return ["BGD", "BTN", "IND", "MDV", "NPL", "PAK", "LKA", "TUR"];
      } else if (iso == "nca") {
        return ["KAZ", "KGZ", "RUS"];
      } else if (iso == "pac") {
        return ["AUS", "FJI"];
      } else if (iso == "lac") {
        return [
          "ARG",
          "BOL",
          "BRA",
          "CHL",
          "COL",
          "ECU",
          "MEX",
          "PRY",
          "PER",
          "RoLAC",
          "URY",
          "VEN",
        ];
      } else if (iso == "apta") {
        return ["BGD", "IND", "KOR", "LAO", "MNG", "CHN", "LKA"];
      } else if (iso == "saarc") {
        return ["BGD", "BTN", "IND", "MDV", "NPL", "PAK", "LKA"];
      } else if (iso == "mercosur") {
        return [
          "ARG",
          "BOL",
          "BRA",
          "CHL",
          "COL",
          "ECU",
          "PRY",
          "PER",
          "URY",
          "VEN",
        ];
      } else if (iso == "cptpp") {
        return [
          "AUS",
          "BRN",
          "CAN",
          "CHL",
          "JPN",
          "MYS",
          "MEX",
          "PER",
          "SGP",
          "VNM",
        ];
      } else if (iso == "rcep") {
        return [
          "AUS",
          "BRN",
          "KHM",
          "IDN",
          "JPN",
          "KOR",
          "LAO",
          "MYS",
          "PHL",
          "CHN",
          "SGP",
          "THA",
          "VNM",
        ];
      } else if (iso == "pac_alliance") {
        return ["CHL", "COL", "MEX", "PER"];
      } else if (iso == "bimstec") {
        return ["BGD", "BTN", "IND", "NPL", "LKA", "THA"];
      } else if (iso == "ap") {
        return [
          "AUS",
          "IND",
          "JPN",
          "KOR",
          "CHN",
          "RUS",
          "SGP",
          "TWN",
          "THA",
          "VNM",
        ];
      } else if (iso == "ap") {
        return ["BGD", "BTN", "IND", "NPL", "LKA", "THA"];
      } else if (iso == "euz") {
        return [
          "AUT",
          "BEL",
          "FRA",
          "DEU",
          "IRL",
          "ITA",
          "NLD",
          "POL",
          "ESP",
          "SWE",
        ];
      } else if (iso == "eur") {
        return [
          "BEL",
          "FRA",
          "DEU",
          "IRL",
          "ITA",
          "NLD",
          "POL",
          "ESP",
          "CHE",
          "GBR",
        ];
      } else if (iso == "apec") {
        return [
          "AUS",
          "CAN",
          "JPN",
          "KOR",
          "MEX",
          "CHN",
          "RUS",
          "SGP",
          "TWN",
          "USA",
        ];
      } else if (iso == "fealac") {
        return [
          "AUS",
          "BRA",
          "JPN",
          "KOR",
          "MYS",
          "MEX",
          "CHN",
          "SGP",
          "THA",
          "VNM",
        ];
      } else if (iso == "wld") {
        return [
          "CAN",
          "FRA",
          "DEU",
          "ITA",
          "JPN",
          "KOR",
          "NLD",
          "CHN",
          "GBR",
          "USA",
        ];
      } else {
        return [iso];
      }
    },
    /////////////
    countryGroupListRiva2(iso) {
      if (iso == "apec") {
        return [
          "AUS",
          "CAN",
          "CHL",
          "CHN",
          "HKG",
          "JPN",
          "KOR",
          "MEX",
          "NZL",
          "PER",
          "PNG",
          "RUS",
          "TWN",
          "USA",
          "BRN",
          "IDN",
          "MYS",
          "PHL",
          "SGP",
          "THA",
          "VNM",
        ];
      } else if (iso == "apta") {
        return ["BGD", "CHN", "IND", "KOR", "LKA", "MNG", "LAO"];
      } else if (iso == "ap") {
        // can't find Asia-Pacific
        return [iso];
      } else if (iso == "bimstec") {
        return ["BGD", "BTN", "IND", "LKA", "NPL", "MMR", "THA"];
      } else if (iso == "cptpp") {
        return [
          "AUS",
          "CAN",
          "CHL",
          "JPN",
          "MEX",
          "NZL",
          "PER",
          "BRN",
          "MYS",
          "SGP",
          "VNM",
        ];
      } else if (iso == "enea") {
        //East and North-East Asia
        return ["CHN", "HKG", "JPN", "KOR", "MAC", "MNG", "PRK", "TWN"];
      } else if (iso == "eur") {
        // Europe
        return [
          "ALA",
          "ALB",
          "AND",
          "AUT",
          "BEL",
          "BGR",
          "BIH",
          "BLR",
          "CHE",
          "CHI",
          "CSK",
          "CYP",
          "CZE",
          "DEU",
          "DNK",
          "ESP",
          "EST",
          "FIN",
          "FRA",
          "FRO",
          "GBR",
          "GGY",
          "GIB",
          "GRC",
          "HRV",
          "HUN",
          "IMN",
          "IRL",
          "ISL",
          "ITA",
          "JEY",
          "LIE",
          "LTU",
          "LUX",
          "LVA",
          "MCO",
          "MDA",
          "MKD",
          "MLT",
          "MNE",
          "NLD",
          "NOR",
          "POL",
          "PRT",
          "ROU",
          "SJM",
          "SMR",
          "SRB",
          "SVK",
          "SVN",
          "SWE",
          "UKR",
          "VAT",
          "XKX",
          "YUG",
        ];
      } else if (iso == "euz") {
        // European Union
        return [
          "AUT",
          "BEL",
          "BGR",
          "CYP",
          "CZE",
          "DEU",
          "DNK",
          "ESP",
          "EST",
          "FIN",
          "FRA",
          "GBR",
          "GRC",
          "HRV",
          "HUN",
          "IRL",
          "ITA",
          "LTU",
          "LUX",
          "LVA",
          "MLT",
          "NLD",
          "POL",
          "PRT",
          "ROU",
          "SVK",
          "SVN",
          "SWE",
        ];
      } else if (iso == "fealac") {
        return [
          "ARG",
          "AUS",
          "BOL",
          "BRA",
          "CHL",
          "CHN",
          "COL",
          "CRI",
          "CUB",
          "DOM",
          "ECU",
          "GTM",
          "HND",
          "JPN",
          "KOR",
          "MEX",
          "MNG",
          "NIC",
          "NZL",
          "PAN",
          "PER",
          "PRY",
          "SLV",
          "SUR",
          "URY",
          "VEN",
          "BRN",
          "IDN",
          "KHM",
          "LAO",
          "MMR",
          "MYS",
          "PHL",
          "SGP",
          "THA",
          "VNM",
        ];
      } else if (iso == "lac") {
        // Latin America
        return [
          "ARG",
          "BOL",
          "BRA",
          "CHL",
          "COL",
          "ECU",
          "MEX",
          "PER",
          "PRY",
          "URY",
          "VEN",
        ];
      } else if (iso == "mercosur") {
        return [
          "ARG",
          "BOL",
          "BRA",
          "CHL",
          "COL",
          "ECU",
          "PER",
          "PRY",
          "URY",
          "VEN",
        ];
      } else if (iso == "nafta") {
        return ["CAN", "MEX", "USA"];
      } else if (iso == "nca") {
        //North and Central Asia
        return ["ARM", "AZE", "GEO", "KAZ", "KGZ", "RUS", "TJK", "TKM", "UZB"];
      } else if (iso == "pac") {
        // Pacific
        return [
          "ASM",
          "AUS",
          "COK",
          "FJI",
          "FSM",
          "GUM",
          "KIR",
          "MHL",
          "MNP",
          "NCL",
          "NIU",
          "NRU",
          "NZL",
          "PLW",
          "PNG",
          "PYF",
          "SLB",
          "TON",
          "TUV",
          "VUT",
          "WSM",
        ];
      } else if (iso == "pac_alliance") {
        // Pacific Alliance
        return ["CHL", "COL", "MEX", "PER"];
      } else if (iso == "rcep") {
        return [
          "AUS",
          "BRN",
          "CHN",
          "IDN",
          "JPN",
          "KHM",
          "KOR",
          "LAO",
          "MMR",
          "MYS",
          "NZL",
          "PHL",
          "SGP",
          "THA",
          "VNM",
        ];
      } else if (iso == "saarc") {
        return ["AFG", "BGD", "BTN", "IND", "LKA", "MDV", "NPL", "PAK"];
      } else if (iso == "sswa") {
        // South and South-West Asia
        return [
          "AFG",
          "BGD",
          "BTN",
          "IND",
          "IRN",
          "LKA",
          "MDV",
          "NPL",
          "PAK",
          "TUR",
        ];
      } else if (iso == "sea") {
        // South-East Asia
        return [
          "BRN",
          "IDN",
          "KHM",
          "LAO",
          "MMR",
          "MYS",
          "PHL",
          "SGP",
          "THA",
          "TLS",
          "VNM",
        ];
      } else if (iso == "wld") {
        // select all ?
        return [iso];
      } else {
        return [iso];
      }
    },
  },
});
