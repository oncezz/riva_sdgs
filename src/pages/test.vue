<template>
  <q-page class="container bg-white">
    <q-select @input="(val) => changeFlag(val)" outlined v-model="model" :options="options">
      <template v-slot:prepend>
        <!-- <img style="width:30px" :src="activeFlag" alt=""> -->
      </template>
    </q-select>
    <div id="container"></div>
  </q-page>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      model: "Argentina",
      activeFlag: "/public/test/flag1.png",
      options: [
        {
          value: "Argentina",
          label: "Argentina",
          flag:
            "https://teerapornclinic.com/wp-content/uploads/2017/07/usa-flag.jpg",
        },
        {
          value: "Australia",
          label: "Australia",
          flag:
            "https://static.dezeen.com/uploads/2020/06/mississippi-state-flag-design-dezeen-2364-hero.jpg",
        },
      ],
    };
  },
  methods: {
    changeFlag(val) {
      console.log(val);
      this.activeFlag = val.flag;
    },
    loadGraph() {
      Highcharts.chart("container", {
        series: [
          {
            dataLabels: {
              enabled: true,
            },
            type: "treemap",
            layoutAlgorithm: "squarified",
            alternateStartingDirection: true,
            levelIsConstant: false,

            levels: [
              {
                level: 1,
                layoutAlgorithm: "sliceAndDice",
                dataLabels: {
                  enabled: false,
                  align: "left",
                  verticalAlign: "top",
                  style: {
                    fontSize: "15px",
                    fontWeight: "bold",
                  },
                },
              },
            ],
            data: [
              {
                id: "A",
                name: "Apples",
                color: "#EC2500",
              },
              {
                id: "B",
                name: "Bananas",
                color: "#ECE100",
              },
              {
                id: "O",
                name: "Oranges",
                color: "#EC9800",
              },
              {
                name: "Anne",
                parent: "A",
                value: 5,
              },
              {
                name: "Rick",
                parent: "A",
                value: 3,
              },
              {
                name: "Peter",
                parent: "A",
                value: 4,
              },
              {
                name: "Anne",
                parent: "B",
                value: 4,
              },
              {
                name: "Rick",
                parent: "B",
                value: 10,
              },
              {
                name: "Peter",
                parent: "B",
                value: 1,
              },
              {
                name: "Anne",
                parent: "O",
                value: 1,
              },
              {
                name: "Rick",
                parent: "O",
                value: 3,
              },
              {
                name: "Peter",
                parent: "O",
                value: 3,
              },
              {
                name: "Susanne",
                parent: "Kiwi",
                value: 2,
                color: "#9EDE00",
              },
            ],
          },
        ],
        title: {
          text: "Fruit consumption",
        },
      });
    },
  },
  mounted() {
    this.loadGraph();
  },
};
</script>

<style lang="scss" scoped>
</style>