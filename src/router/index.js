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
      // path_api2:"http://localhost/u_api",
      // path_api:"http://localhost/u_api",
      path_api: "https://riva.negotiatetrade.org/u_api",
      // ri_api:"https://yaksaconcept.com/ri_api/",
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
      // this.countrySelected =""
      // this.importingEconomy =""
      // this.sourceEconomy =""
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
      // this.countrySelected =""
      // this.importingEconomy =""
      // this.sourceEconomy =""
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
          "BRN",
          "CAN",
          "CHL",
          "CHN",
          "HKG",
          "IDN",
          "JPN",
          "KOR",
          "MEX",
          "MYS",
          "NZL",
          "PER",
          "PHL",
          "PNG",
          "RUS",
          "SGP",
          "THA",
          "TWN",
          "USA",
          "VNM",
        ];
      } else if (iso == "apta") {
        return ["BGD", "IND", "LAO", "LKA", "MNG", "CHN", "KOR"];
      } else if (iso == "asean") {
        return [
          "KHM",
          "MMR",
          "BRN",
          "IDN",
          "MYS",
          "PHL",
          "SGP",
          "THA",
          "VNM",
          "LAO",
        ];
      } else if (iso == "bimstec") {
        return ["BTN", "NPL", "BGD", "IND", "LKA", "MMR", "THA"];
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
      } else if (iso == "ene_asia") {
        return ["MAC", "PRK", "HKG", "TWN", "MNG", "CHN", "KOR", "JPN"];
      } else if (iso == "escap") {
        return [
          "AFG",
          "ARM",
          "ASM",
          "AZE",
          "COK",
          "FJI",
          "FSM",
          "GEO",
          "GUM",
          "IRN",
          "KAZ",
          "KGZ",
          "KIR",
          "MDV",
          "MHL",
          "MNP",
          "NCL",
          "NIU",
          "NRU",
          "PAK",
          "PLW",
          "PYF",
          "SLB",
          "TJK",
          "TKM",
          "TLS",
          "TON",
          "TUR",
          "TUV",
          "UZB",
          "VUT",
          "WSM",
          "PNG",
          "RUS",
          "KHM",
          "IDN",
          "PHL",
          "LAO",
          "BTN",
          "NPL",
          "BGD",
          "IND",
          "LKA",
          "MMR",
          "THA",
          "AUS",
          "NZL",
          "BRN",
          "MYS",
          "SGP",
          "VNM",
          "MAC",
          "PRK",
          "HKG",
          "MNG",
          "CHN",
          "KOR",
          "JPN",
        ];
      } else if (iso == "fealac") {
        return [
          "ARG",
          "BOL",
          "BRA",
          "COL",
          "CRI",
          "CUB",
          "DOM",
          "ECU",
          "GTM",
          "HND",
          "NIC",
          "PAN",
          "PRY",
          "SLV",
          "SUR",
          "URY",
          "VEN",
          "CHL",
          "MEX",
          "PER",
          "KHM",
          "IDN",
          "PHL",
          "LAO",
          "MMR",
          "THA",
          "AUS",
          "NZL",
          "BRN",
          "MYS",
          "SGP",
          "VNM",
          "MNG",
          "CHN",
          "KOR",
          "JPN",
        ];
      } else if (iso == "high_income") {
        return [
          "ABW",
          "AIA",
          "ALA",
          "AND",
          "ANT",
          "ARE",
          "ATG",
          "AUT",
          "BEL",
          "BES",
          "BHR",
          "BHS",
          "BLM",
          "BMU",
          "BRB",
          "BVT",
          "CHE",
          "CHI",
          "CUW",
          "CYM",
          "CYP",
          "CZE",
          "DEU",
          "DNK",
          "ESP",
          "EST",
          "FIN",
          "FLK",
          "FRA",
          "FRO",
          "GBR",
          "GGY",
          "GIB",
          "GLP",
          "GRC",
          "GRL",
          "GUF",
          "HRV",
          "HUN",
          "IMN",
          "IRL",
          "ISL",
          "ITA",
          "JEY",
          "KNA",
          "KWT",
          "LIE",
          "LTU",
          "LUX",
          "LVA",
          "MAF",
          "MCO",
          "MLT",
          "MTQ",
          "NFK",
          "NLD",
          "NOR",
          "OMN",
          "PCN",
          "POL",
          "PRI",
          "PRT",
          "QAT",
          "REU",
          "SAU",
          "SJM",
          "SMR",
          "SSD",
          "SVK",
          "SVN",
          "SWE",
          "SXM",
          "SYC",
          "TCA",
          "TTO",
          "VAT",
          "VGB",
          "VIR",
          "USA",
          "CAN",
          "TWN",
          "GUM",
          "MNP",
          "NCL",
          "PYF",
          "RUS",
          "MAC",
          "HKG",
          "ARG",
          "URY",
          "VEN",
          "CHL",
          "AUS",
          "NZL",
          "BRN",
          "SGP",
          "KOR",
          "JPN",
        ];
      } else if (iso == "landlocked_dev") {
        return [
          "BDI",
          "BFA",
          "BWA",
          "CAF",
          "ETH",
          "LSO",
          "MDA",
          "MKD",
          "MLI",
          "MWI",
          "NER",
          "RWA",
          "SWZ",
          "TCD",
          "UGA",
          "ZMB",
          "ZWE",
          "AFG",
          "ARM",
          "AZE",
          "KAZ",
          "KGZ",
          "TJK",
          "TKM",
          "UZB",
          "BTN",
          "NPL",
          "BOL",
          "PRY",
          "LAO",
          "MNG",
          "SSD",
        ];
      } else if (iso == "ldc") {
        return [
          "AGO",
          "BEN",
          "COD",
          "COM",
          "DJI",
          "ERI",
          "GIN",
          "GMB",
          "GNB",
          "HTI",
          "LBR",
          "MDG",
          "MOZ",
          "MRT",
          "SDN",
          "SEN",
          "SLE",
          "SOM",
          "STP",
          "TGO",
          "TZA",
          "YEM",
          "KIR",
          "SLB",
          "TLS",
          "TUV",
          "VUT",
          "BGD",
          "KHM",
          "MMR",
          "BDI",
          "BFA",
          "CAF",
          "ETH",
          "LSO",
          "MLI",
          "MWI",
          "NER",
          "RWA",
          "TCD",
          "UGA",
          "ZMB",
          "AFG",
          "BTN",
          "NPL",
          "LAO",
          "SSD",
        ];
      } else if (iso == "lldc") {
        return [
          "BDI",
          "BFA",
          "CAF",
          "ETH",
          "LSO",
          "MLI",
          "MWI",
          "NER",
          "RWA",
          "TCD",
          "UGA",
          "ZMB",
          "AFG",
          "BTN",
          "NPL",
          "LAO",
          "SSD",
        ];
      } else if (iso == "low_income") {
        return [
          "TKL",
          "PRK",
          "ZWE",
          "TJK",
          "BEN",
          "COD",
          "COM",
          "ERI",
          "GIN",
          "GMB",
          "GNB",
          "HTI",
          "LBR",
          "MDG",
          "MOZ",
          "SEN",
          "SLE",
          "SOM",
          "TGO",
          "TZA",
          "KHM",
          "MMR",
          "BDI",
          "BFA",
          "CAF",
          "ETH",
          "MLI",
          "MWI",
          "NER",
          "RWA",
          "TCD",
          "UGA",
          "AFG",
          "NPL",
        ];
      } else if (iso == "lower_middle_income") {
        return [
          "CIV",
          "CMR",
          "COG",
          "CPV",
          "EGY",
          "ESH",
          "GHA",
          "GUY",
          "KEN",
          "MAR",
          "MSR ",
          "NGA",
          "PSE",
          "SHN",
          "SYR",
          "UKR",
          "WLF",
          "XKX",
          "FSM",
          "GEO",
          "PAK",
          "WSM",
          "PNG",
          "IND",
          "LKA",
          "GTM",
          "HND",
          "NIC",
          "SLV",
          "IDN",
          "PHL",
          "VNM",
          "MDA",
          "SWZ",
          "ARM",
          "KGZ",
          "UZB",
          "BOL",
          "DJI",
          "MRT",
          "SDN",
          "STP",
          "YEM",
          "KIR",
          "SLB",
          "TLS",
          "VUT",
          "BGD",
          "LSO",
          "ZMB",
          "BTN",
          "LAO",
          "SEN",
        ];
      } else if (iso == "nc_asia") {
        return ["RUS", "AZE", "KAZ", "TKM", "TJK", "GEO", "ARM", "KGZ", "UZB"];
      } else if (iso == "pacific") {
        return [
          "ASM",
          "COK",
          "FJI",
          "MHL",
          "NIU",
          "NRU",
          "PLW",
          "TON",
          "GUM",
          "MNP",
          "NCL",
          "PYF",
          "AUS",
          "NZL",
          "TUV",
          "FSM",
          "WSM",
          "PNG",
          "KIR",
          "SLB",
          "VUT",
        ];
      } else if (iso == "pacific_developing") {
        return [
          "ASM",
          "COK",
          "FJI",
          "MHL",
          "NIU",
          "NRU",
          "PLW",
          "TON",
          "GUM",
          "MNP",
          "NCL",
          "PYF",
          "TUV",
          "FSM",
          "WSM",
          "PNG",
          "KIR",
          "SLB",
          "VUT",
        ];
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
      } else if (iso == "rcep") {
        return [
          "THA",
          "MYS",
          "CHN",
          "BRN",
          "SGP",
          "KOR",
          "JPN",
          "KHM",
          "MMR",
          "IDN",
          "PHL",
          "VNM",
          "LAO",
          "AUS",
          "NZL",
        ];
      } else if (iso == "saarc") {
        return ["MDV", "AFG", "NPL", "PAK", "IND", "LKA", "BGD", "BTN"];
      } else if (iso == "se_asia") {
        return [
          "TLS",
          "THA",
          "MYS",
          "BRN",
          "SGP",
          "KHM",
          "MMR",
          "IDN",
          "PHL",
          "VNM",
          "LAO",
        ];
      } else if (iso == "sids") {
        return [
          "BLZ",
          "DMA",
          "GRD",
          "JAM",
          "LCA",
          "MUS",
          "VCT",
          "CUB",
          "DOM",
          "SUR",
          "ABW",
          "AIA",
          "ATG",
          "BHS",
          "BMU",
          "BRB",
          "CUW",
          "CYM",
          "GLP",
          "KNA",
          "MTQ",
          "PRI",
          "SXM",
          "SYC",
          "TCA",
          "TTO",
          "VGB",
          "VIR",
          "COM",
          "GNB",
          "HTI",
          "CPV",
          "GUY",
          "MSR ",
          "STP",
          "ASM",
          "COK",
          "FJI",
          "MHL",
          "NIU",
          "NRU",
          "PLW",
          "TON",
          "GUM",
          "MNP",
          "NCL",
          "PYF",
          "TUV",
          "FSM",
          "WSM",
          "PNG",
          "KIR",
          "SLB",
          "VUT",
          "MDV",
          "TLS",
          "SGP",
        ];
      } else if (iso == "speca") {
        return ["AZE", "KAZ", "TKM", "TJK", "KGZ", "UZB", "AFG"];
      } else if (iso == "ssw_asia") {
        return [
          "IRN",
          "TUR",
          "NPL",
          "PAK",
          "IND",
          "LKA",
          "BGD",
          "BTN",
          "MDV",
          "AFG",
        ];
      } else if (iso == "upper_middle_income") {
        return [
          "ALB",
          "BGR",
          "BIH",
          "BLR",
          "DZA",
          "GAB",
          "GNQ",
          "IRQ",
          "ISR",
          "JOR",
          "LBN",
          "LBY",
          "MNE",
          "MYT",
          "NAM",
          "ROU",
          "SPM",
          "SRB",
          "TUN",
          "ZAF",
          "BRA",
          "COL",
          "CRI",
          "ECU",
          "PAN",
          "MEX",
          "PER",
          "BWA",
          "MKD",
          "PRY",
          "MNG",
          "AGO",
          "CHN",
          "THA",
          "MYS",
          "BLZ",
          "DMA",
          "GRD",
          "JAM",
          "LCA",
          "MUS",
          "VCT",
          "CUB",
          "DOM",
          "SUR",
          "GUY",
          "ASM",
          "COK",
          "FJI",
          "MHL",
          "NIU",
          "NRU",
          "PLW",
          "TON",
          "TUV",
          "AZE",
          "KAZ",
          "TKM",
          "IRN",
          "TUR",
          "MDV",
        ];
      } else {
        return [iso];
      }
    },
  },
});
