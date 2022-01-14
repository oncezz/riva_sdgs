<template>
  <q-page class="container bg-white">
    <!-- HEADER BAR -->
    <app-bar></app-bar>

    <!-- MENU -->
    <div class="row" style="border:1px solid">
      <div
        :class="menuSelected == 1 ? 'bg4 text-white' : 'hover-btn'"
        @click="menuSelected = 1,activeMenu = 1,menuDropdownSelected2 = 0,menuDropdownSelected = 0"
        class="col-3 brr q-py-md cursor-pointer"
        align="center"
      >Structure of value added</div>
      <div
        :class="menuSelected == 2 ? 'bg4 text-white' : 'hover-btn'"
        @click="menuSelected = 2,activeMenu = 2,menuDropdownSelected2 = 0,menuDropdownSelected = 0"
        class="col-3 brr q-py-md cursor-pointer"
        align="center"
      >Participation in GVCs</div>
      <div
        :class="menuSelected == 3 ? 'bg4 text-white' : 'hover-btn'"
        @click="menuSelected = 3"
        class="col-3 brr q-py-md cursor-pointer"
        align="center"
      >
        Backward linkages
        <q-icon name="fas fa-caret-down"></q-icon>
        <q-menu fit max-height="200px" square style="width:100%" class>
          <q-list>
            <q-item
              :class="menuDropdownSelected == 1 ? 'bg4' : null"
              clickable
              v-close-popup
              @click="menuDropdownSelected = 1,menuDropdownSelected2 = 0"
            >
              <q-item-section @click="activeMenu = 3">By region</q-item-section>
            </q-item>
            <q-item
              :class="menuDropdownSelected == 2 ? 'bg4' : null"
              clickable
              v-close-popup
              @click="menuDropdownSelected = 2,menuDropdownSelected2 = 0"
            >
              <q-item-section @click="activeMenu = 3">By sector</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
      <div
        :class="menuSelected == 4 ? 'bg4 text-white' : 'hover-btn'"
        @click="menuSelected = 4"
        class="col-3 q-py-md cursor-pointer"
        align="center"
      >
        Forward linkages
        <q-icon name="fas fa-caret-down"></q-icon>
        <q-menu fit max-height="200px" style="width:100%" class>
          <q-list>
            <q-item
              :class="menuDropdownSelected2 == 1 ? 'bg4' : null"
              clickable
              v-close-popup
              @click="menuDropdownSelected2 = 1,menuDropdownSelected = 0"
            >
              <q-item-section @click="activeMenu = 4">By region</q-item-section>
            </q-item>
            <q-item
              :class="menuDropdownSelected2 == 2 ? 'bg4' : null"
              clickable
              v-close-popup
              @click="menuDropdownSelected2 = 2,menuDropdownSelected = 0"
            >
              <q-item-section @click="activeMenu = 4">By sector</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </div>

    <!-- Selection -->
    <div class="row q-py-xl" style="width:50%;min-width:320px;margin:auto">
      <div class="col-6 q-px-md">
        <span>Importing economy</span>
        <q-select dense outlined :options="countryList" v-model="importCountrySelected"></q-select>
      </div>

      <div class="col-6 q-px-md">
        <span>Sector</span>
        <q-select dense outlined :options="sectorOptions" v-model="sectorSelected"></q-select>
      </div>
    </div>

    <!-- menu structure of value added -->
    <div v-show="activeMenu == 1" style="padding-bottom:100px" class>
      <!-- COLUMN -->
      <div class="q-pb-lg">
        <div class="row">
          <div class="q-pa-sm" style="width:300px">
            <div class="br-radius q-pa-md">
              <div align="center" style="font-size:24px">Table of contents:</div>
              <div style="height:10px"></div>
              <div class="font-content">
                1.
                <u>Key polycy questions</u>
              </div>
              <div class="q-pt-sm font-content">
                2.
                <u>Structure of value-added</u>
              </div>
              <div class="q-pt-sm font-content">
                3.
                <u>Comparison with partnerns</u>
              </div>
              <div class="q-pt-sm font-content">
                4.
                <u>Measuring trade balance</u>
              </div>
            </div>
          </div>
          <div class="col q-pa-sm">
            <div class="br-radius fit q-pa-md">
              <div
                style="font-size:24px"
                align="center"
              >How do you disaggregate value-added in gross exports?</div>
              <div align="center">Thailand’s gross exports can be divided into five major parts :</div>
            </div>
          </div>
        </div>
      </div>

      <!-- POLICY -->
      <div class="q-pb-lg">
        <div align="center" class="q-pb-md" style="font-size:24px">Key policy questions</div>
        <div class="q-px-md font-content">
          <div>
            1.
            <u>What happens to Thailand’s exports to a selected importer?</u>
          </div>
          <div class="q-py-md">
            2.
            <u>What happens to South-East Asian economics’s exports to a selected imported?</u>
          </div>
          <div>
            3.
            <u>How does Thailand’s domestic value-added and gross trade balance with the selected imported differ?</u>
          </div>
        </div>
      </div>

      <q-separator></q-separator>
      <div class="q-py-lg">
        <div
          class="q-pb-md"
          style="font-size:24px"
          align="center"
        >What happens to Thailand's exports to China?</div>

        <div style="width:85%;margin:auto" id="container"></div>
      </div>
      <q-separator></q-separator>

      <div class="q-py-xl">
        <div
          class="q-pb-md"
          style="font-size:24px"
          align="center"
        >What happens to South-East Asian economies’ exports to China?</div>
        <div style="width:85%;margin:auto" id="stackChart"></div>
      </div>
      <q-separator></q-separator>

      <div class="q-py-lg">
        <div
          class="q-pb-md"
          style="font-size:24px"
          align="center"
        >How does Thailand’s gross and domestic value-added trade balance with China differ?</div>
        <div style="width:85%;margin:auto" id="stackChart1"></div>
      </div>
      <q-separator></q-separator>
    </div>

    <!-- menu participation in gvcs -->
    <div v-show="activeMenu == 2" style="padding-bottom:100px">
      <div class="q-px-md">
        <!-- block #1 -->
        <div class="q-pa-md" style="border-radius:5px;border:2px solid">
          <p class="font-graph" align="center">Why does GVC participation matter?</p>
          <p
            class="font-content"
          >GVC participation matters for development. GVCs support efficient production and technology diffusion, and access to capital and inputs thereby increasing productivity and income growth, and reducing poverty.</p>
          <p
            class="font-content"
          >In addition, recent developments in digital technology are set to support integration of SMEs into GVCs, further amplifying sustainable outcomes from participation.</p>
        </div>

        <p class="font-graph q-py-lg" align="center">
          How much of Thailand’s exports to China are GVC related
          compared to other South-East Asian economies?
        </p>

        <div style="width:85%;margin:auto" id="stackChart2"></div>
      </div>
    </div>
    <!-- menu backward linkages -->
    <div v-show="activeMenu == 3" style="padding-bottom:100px">
      <div v-show="menuDropdownSelected == 1">
        <div class="q-px-md">
          <div class="q-pa-md" style="border-radius:5px;border:2px solid">
            <p class="font-graph" align="center">Where does imported content come from?</p>
            <p
              class="font-content"
            >Some part of Thailand’s gross exports consist of imported inputs that originate in other source economies.</p>
            <p class="font-content" align="center">
              <span class="q-pr-lg">Source economy</span>
              <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
              <span class="q-pl-lg">Exporting economy (Thailand)</span>
              <span class="q-px-lg text-weight-bold">:</span>
              <span class="q-pr-lg">Sector</span>
              <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
              <span class="q-pl-lg">Importing economy</span>
            </p>
          </div>

          <p align="center" class="font-graph q-py-lg">Key policy questions</p>
          <p class="font-content q-px-md">
            1.
            <u>Where does Thailand’s imported content come from in exports to a selected importer ?</u>
          </p>
          <p class="font-content q-px-md">
            2.
            <u>Where do South-East Asian economies’ imported content come from in exports to a selected importer ?</u>
          </p>
        </div>

        <q-separator></q-separator>
        <div style="height:50px"></div>
        <div class="q-px-md">
          <div style="width:85%;margin:auto" id="stackChart3"></div>
        </div>

        <q-separator></q-separator>

        <div class="q-pt-xl q-px-md">
          <div style="width:85%;margin:auto" id="stackChart4"></div>
        </div>
      </div>

      <div v-show="menuDropdownSelected == 2">
        <div class="q-px-md">
          <div class="q-pa-md" style="border-radius:5px;border:2px solid">
            <p class="font-graph" align="center">Where does imported content come from?</p>
            <p
              class="font-content"
            >Some part of Thailand’s gross exports consist of imported inputs that originate in other source economies.</p>
            <p class="font-content" align="center">
              <span class="q-pr-lg">Source economy</span>
              <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
              <span class="q-pl-lg">Exporting economy (Thailand)</span>
              <span class="q-px-lg text-weight-bold">:</span>
              <span class="q-pr-lg">Sector</span>
              <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
              <span class="q-pl-lg">Importing economy</span>
            </p>
          </div>

          <p align="center" class="font-graph q-py-lg">Key policy questions</p>
          <p class="font-content q-px-sm">
            1.
            <u>Which sectors in Thailand rely the most on imported content for exports to a selected imported?</u>
          </p>
          <p class="font-content q-px-sm">
            2.
            <u>Which sectors in South-East Asian economies rely the most on imported content for exports to a selected importer?</u>
          </p>
        </div>

        <q-separator></q-separator>
        <div style="height:50px"></div>
        <div class="q-px-md">
          <div style="width:85%;margin:auto" id="stackChart5"></div>
          <div align="center">
            <q-img style="width:85%;margin:auto" src="../../public/temp_graph1.png"></q-img>
          </div>
        </div>

        <q-separator></q-separator>
        <div style="height:50px"></div>
        <div class="q-px-md">
          <div style="width:85%;margin:auto" id="stackChart6"></div>
          <div align="center">
            <q-img style="width:85%;margin:auto" src="../../public/temp_graph1.png"></q-img>
          </div>
        </div>
      </div>
    </div>
    <!-- menu forward linkages -->
    <div v-show="activeMenu == 4" style="padding-bottom:100px" class="brx">
      <div v-show="menuDropdownSelected2 == 1">
        <div class="q-px-md">
          <div class="q-pa-md" style="border-radius:5px;border:2px solid">
            <p
              class="font-graph"
              align="center"
            >Where does Thailand contribute towards export production?</p>
            <p class="font-content" align="center">
              Some part of Thailand’s gross exports consist of intermediate inputs that are used by the direct importer to
              produce exports for third economies.
            </p>
            <p class="font-content" align="center">
              <span class="q-pr-lg">Exporting economy(Thailand)</span>
              <span class="q-pl-lg text-weight-bold">:</span>
              <span class="q-pr-lg">Sector</span>
              <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
              <span class="q-px-lg">Importing economy</span>

              <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
              <span class="q-pl-lg">Third economies</span>
            </p>
          </div>

          <p align="center" class="font-graph q-py-lg">Key policy questions</p>
          <p class="font-content q-px-sm">
            1.
            <u>Where does Thailand contribute the most towards export production?</u>
          </p>
          <p class="font-content q-px-sm">
            2.
            <u>Where do South-East Asian economies contribute the most towards export production?</u>
          </p>
        </div>

        <q-separator></q-separator>
        <div style="height:50px"></div>
        <div class="q-px-md">
          <div style="width:85%;margin:auto" id="stackChart7"></div>
        </div>

        <q-separator></q-separator>
        <div style="height:50px"></div>
        <div class="q-px-md">
          <div style="width:85%;margin:auto" id="stackChart8"></div>
        </div>
      </div>
      <div v-show="menuDropdownSelected2 == 2">
        <div class="q-px-md">
          <div class="q-pa-md" style="border-radius:5px;border:2px solid">
            <p
              class="font-graph"
              align="center"
            >Where does Thailand contribute towards export production?</p>
            <p class="font-content" align="center">
              Some part of Thailand’s gross exports consist of intermediate inputs that are used by the direct importer to
              produce exports for third economies.
            </p>
            <p class="font-content" align="center">
              <span class="q-pr-lg">Exporting economy(Thailand)</span>
              <span class="q-pl-lg text-weight-bold">:</span>
              <span class="q-pr-lg">Sector</span>
              <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
              <span class="q-px-lg">Importing economy</span>

              <q-img style="width:66px" src="../../public/arrow-right.png"></q-img>
              <span class="q-pl-lg">Third economies</span>
            </p>
          </div>

          <p align="center" class="font-graph q-py-lg">Key policy questions</p>
          <p class="font-content q-px-sm">
            1.
            <u>
              Which sectors in Thailand are most reliant on export production
              in a selected importer ?
            </u>
          </p>
          <p class="font-content q-px-sm">
            2.
            <u>Which sectors in South-East Asian economies are most reliant on export production in a selected importer?</u>
          </p>
        </div>

        <q-separator></q-separator>
        <div style="height:50px"></div>
        <div class="q-px-md">
          <div style="width:80%;margin:auto" id="stackChart9"></div>
          <div align="center">
            <q-img style="width:85%;margin:auto" src="../../public/temp_graph1.png"></q-img>
          </div>
        </div>

        <q-separator></q-separator>
        <div style="height:50px"></div>
        <div class="q-px-md">
          <div style="width:85%;margin:auto" id="stackChart10"></div>
          <div align="center">
            <q-img style="width:85%;margin:auto" src="../../public/temp_graph1.png"></q-img>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Axios from "axios";
import appBar from "../components/appBarWithLogo";
export default {
  components: {
    appBar,
  },
  data() {
    return {
      countryList: ["Thailand", "China"],
      countrySelected: "Thailand",
      yearList: [2017, 2018, 2019, 2020],
      yearSelected: 2020,
      importCountrySelected: "Thailand",
      sectorSelected: "All",
      sectorOptions: ["All", "Sector #1", "Sector #2"],
      menuSelected: 0,
      activeMenu: 0,
      menuDropdownSelected: 0,
      menuDropdownSelected2: 0,
    };
  },
  methods: {
    async setData() {
      let getData = await Axios.get(
        "https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-mortality.json"
      );

      let data = getData.data;
      var points = [],
        regionP,
        regionVal,
        regionI = 0,
        countryP,
        countryI,
        causeP,
        causeI,
        region,
        country,
        cause,
        causeName = {
          "Communicable & other Group I": "Communicable diseases",
          "Noncommunicable diseases": "Non-communicable diseases",
          Injuries: "Injuries",
        };

      for (region in data) {
        if (data.hasOwnProperty(region)) {
          regionVal = 0;
          regionP = {
            id: "id_" + regionI,
            name: region,
            color: Highcharts.getOptions().colors[regionI],
          };
          countryI = 0;
          for (country in data[region]) {
            if (data[region].hasOwnProperty(country)) {
              countryP = {
                id: regionP.id + "_" + countryI,
                name: country,
                parent: regionP.id,
              };
              points.push(countryP);
              causeI = 0;
              for (cause in data[region][country]) {
                if (data[region][country].hasOwnProperty(cause)) {
                  causeP = {
                    id: countryP.id + "_" + causeI,
                    name: causeName[cause],
                    parent: countryP.id,
                    value: Math.round(+data[region][country][cause]),
                  };
                  regionVal += causeP.value;
                  points.push(causeP);
                  causeI = causeI + 1;
                }
              }
              countryI = countryI + 1;
            }
          }
          regionP.value = Math.round(regionVal / countryI);
          points.push(regionP);
          regionI = regionI + 1;
        }
      }
      Highcharts.chart("container", {
        series: [
          {
            type: "treemap",
            layoutAlgorithm: "squarified",
            allowDrillToNode: true,
            animationLimit: 1000,
            dataLabels: {
              enabled: false,
            },
            levelIsConstant: false,
            levels: [
              {
                level: 1,
                dataLabels: {
                  enabled: true,
                },
                borderWidth: 3,
              },
            ],
            data: points,
          },
        ],
        subtitle: {
          text:
            'Click points to drill down. Source: <a href="http://apps.who.int/gho/data/node.main.12?lang=en">WHO</a>.',
        },
        title: {
          text: "Global Mortality Rate 2012, per 100 000 population",
        },
      });

      Highcharts.chart("stackChart3", {
        series: [
          {
            type: "treemap",
            layoutAlgorithm: "squarified",
            allowDrillToNode: true,
            animationLimit: 1000,
            dataLabels: {
              enabled: false,
            },
            levelIsConstant: false,
            levels: [
              {
                level: 1,
                dataLabels: {
                  enabled: true,
                },
                borderWidth: 3,
              },
            ],
            data: points,
          },
        ],
        subtitle: {
          text: `Gross exports of Thailand  in All sector(s) to China amount to *$40* billion in *year*. Of these exports, *$8* billion is imported content that comes from other economies, mainly United States of America (*19.05*%), Hong Kong (*10.9*%), Japan (*5.61*%), Rep. of Korea (*3.98*%) and Germany (*4.39*%).`,
        },
        title: {
          text:
            "Where does Thailand’s imported content in exports to China come from?",
        },
      });
      Highcharts.chart("stackChart5", {
        series: [
          {
            type: "treemap",
            layoutAlgorithm: "squarified",
            allowDrillToNode: true,
            animationLimit: 1000,
            dataLabels: {
              enabled: false,
            },
            levelIsConstant: false,
            levels: [
              {
                level: 1,
                dataLabels: {
                  enabled: true,
                },
                borderWidth: 3,
              },
            ],
            data: points,
          },
        ],
        subtitle: {
          text: `Imported content from China in exports to United States : $8B`,
        },
        title: {
          text: `Which sectors in Thailand rely the most on imported content from China
in exports to United States?`,
        },
      });
      Highcharts.chart("stackChart7", {
        series: [
          {
            type: "treemap",
            layoutAlgorithm: "squarified",
            allowDrillToNode: true,
            animationLimit: 1000,
            dataLabels: {
              enabled: false,
            },
            levelIsConstant: false,
            levels: [
              {
                level: 1,
                dataLabels: {
                  enabled: true,
                },
                borderWidth: 3,
              },
            ],
            data: points,
          },
        ],
        subtitle: {
          text: `Gross exports of Thailand  in *All* sector(s) to the world amount to *$40* billion in *year*. Of these exports, *$8* billion is Thailand’s contribution to export production in other economies, mainly United States of America (*19.05*%), Hong Kong (*10.9*%), Japan (*5.61*%), Rep. of Korea (*3.98*%) and Germany (*4.39*%).

`,
        },
        title: {
          text: `Where does Thailand contribute the most towards export production?`,
        },
      });
      Highcharts.chart("stackChart9", {
        chart: {
          height: (9 / 16) * 100 + "%", // 16:9 ratio
        },
        series: [
          {
            type: "treemap",
            layoutAlgorithm: "squarified",
            allowDrillToNode: true,
            animationLimit: 1000,
            dataLabels: {
              enabled: false,
            },
            levelIsConstant: false,
            levels: [
              {
                level: 1,
                dataLabels: {
                  enabled: true,
                },
                borderWidth: 3,
              },
            ],
            data: points,
          },
        ],
        subtitle: {
          text: `Contribution to China’s export production : $8B

`,
        },
        title: {
          text: `Which sectors in Thailand are most reliant on export production in China? 
`,
        },
      });
    },
    setStackChart() {
      Highcharts.chart("stackChart", {
        chart: {
          type: "column",
        },
        title: {
          text: "Stacked column chart",
        },
        xAxis: {
          categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"],
        },
        yAxis: {
          min: 0,
          title: {
            text: "Total fruit consumption",
          },
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true,
        },
        plotOptions: {
          column: {
            stacking: "percent",
          },
        },
        series: [
          {
            name: "John",
            data: [5, 3, 4, 7, 2],
          },
          {
            name: "Jane",
            data: [2, 2, 3, 2, 1],
          },
          {
            name: "Joe",
            data: [3, 4, 4, 2, 5],
          },
        ],
      });
    },
    setStackChart1() {
      Highcharts.chart("stackChart1", {
        chart: {
          type: "column",
        },
        title: {
          text: "Column chart with negative values",
        },
        xAxis: {
          categories: ["Apples", "Oranges"],
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: "John",
            data: [-3, -1],
          },
          {
            name: "Jane",
            data: [-2, -2],
          },
        ],
      });
    },
    setStackChart2() {
      Highcharts.chart("stackChart2", {
        chart: {
          type: "column",
        },
        title: {
          text: "Stacked column chart",
        },
        xAxis: {
          categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"],
        },
        yAxis: {
          min: 0,
          title: {
            text: "Total fruit consumption",
          },
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true,
        },
        plotOptions: {
          column: {
            stacking: "percent",
          },
        },
        series: [
          {
            name: "John",
            data: [5, 3, 4, 7, 2],
          },
          {
            name: "Jane",
            data: [2, 2, 3, 2, 1],
          },
          {
            name: "Joe",
            data: [3, 4, 4, 2, 5],
          },
        ],
      });

      Highcharts.chart("stackChart4", {
        chart: {
          type: "column",
        },
        title: {
          text: `Where do South-East Asian economies’ imported content
 in exports to China come from  ?
`,
        },
        xAxis: {
          categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"],
        },
        yAxis: {
          min: 0,
          title: {
            text: "Total fruit consumption",
          },
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true,
        },
        plotOptions: {
          column: {
            stacking: "percent",
          },
        },
        series: [
          {
            name: "John",
            data: [5, 3, 4, 7, 2],
          },
          {
            name: "Jane",
            data: [2, 2, 3, 2, 1],
          },
          {
            name: "Joe",
            data: [3, 4, 4, 2, 5],
          },
        ],
      });

      Highcharts.chart("stackChart6", {
        chart: {
          type: "column",
        },
        title: {
          text: `Which sectors in South-East Asian economies rely the most on imported content 
from China in exports to United States?
`,
        },
        xAxis: {
          categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"],
        },
        yAxis: {
          min: 0,
          title: {
            text: "Total fruit consumption",
          },
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true,
        },
        plotOptions: {
          column: {
            stacking: "percent",
          },
        },
        series: [
          {
            name: "John",
            data: [5, 3, 4, 7, 2],
          },
          {
            name: "Jane",
            data: [2, 2, 3, 2, 1],
          },
          {
            name: "Joe",
            data: [3, 4, 4, 2, 5],
          },
        ],
      });

      Highcharts.chart("stackChart8", {
        chart: {
          type: "column",
        },
        title: {
          text: `Where do South-East Asian economies’ imported content
 in exports to China come from  ?

`,
        },
        xAxis: {
          categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"],
        },
        yAxis: {
          min: 0,
          title: {
            text: "Total fruit consumption",
          },
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true,
        },
        plotOptions: {
          column: {
            stacking: "percent",
          },
        },
        series: [
          {
            name: "John",
            data: [5, 3, 4, 7, 2],
          },
          {
            name: "Jane",
            data: [2, 2, 3, 2, 1],
          },
          {
            name: "Joe",
            data: [3, 4, 4, 2, 5],
          },
        ],
      });

      Highcharts.chart("stackChart10", {
        chart: {
          type: "column",
          height: (9 / 16) * 100 + "%", // 16:9 ratio
        },
        title: {
          text: `Which sectors in South-East Asian economies are most reliant on export production in China`,
        },
        xAxis: {
          labels: {
            rotation: -90,
          },
          categories: [
            "Thailand",
            "Vietnam",
            "Malaysia",
            "Singapore",
            "Indonesia",
            "Lao PDR",
            "Cambodia",
            "Brunei Darussalam",
          ],
        },
        yAxis: {
          min: 0,
          title: {
            text: "% of gross exports to China",
          },
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true,
        },
        plotOptions: {
          column: {
            stacking: "percent",
          },
        },
        series: [
          {
            name: "John",
            data: [5, 3, 4, 7, 2, 4, 2, 1],
            color: "#F99704",
          },
          {
            name: "Jane",
            data: [2, 2, 3, 2, 1, 4, 2, 3],
            color: "#9C26B3",
          },
          {
            name: "Joe",
            data: [3, 4, 4, 2, 5, 3, 2, 1],
            color: "#EB1E63",
          },
          {
            name: "Joey",
            data: [4, 2, 2, 5, 1, 1, 2, 3],
            color: "#2381B8",
          },
        ],
      });
    },
  },
  mounted() {
    this.setData();
    this.setStackChart();
    this.setStackChart1();

    // participation in gvcs graph
    this.setStackChart2();
  },
};
</script>

<style lang="scss" scoped>
.brr {
  border-right: 1px solid;
}
.br-radius {
  border: 1px solid;
  border-radius: 8px;
}
.hover-btn:hover {
  background-color: #dfefff;
}
</style>