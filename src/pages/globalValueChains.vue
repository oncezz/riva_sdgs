<template>
  <q-page>
    <global-value-chains-header
      :isDisableShare="false"
      :isShowTinaLink="false"
    ></global-value-chains-header>
    <!-- MENU -->
    <div class="q-pa-md">
      <div class="row q-pb-md">
        <div
          @mouseenter="hoverOnCard(index)"
          @mouseleave="deactiveHoverCard()"
          @click="cardClick(card.router)"
          v-for="(card, index) in cardList1"
          :key="index"
          class="col-sm-4 col-lg cursor-pointer q-pa-md"
          align="center"
        >
          <div
            style="padding:30px"
            class="menu-card card-color shadow-5"
            v-show="hoverActiveIndex != index"
          >
            <div class="q-pt-md">
              <div align="center" style="height:80px;">
                <q-img :src="card.icon" style="width:76px"></q-img>
              </div>
              <div class="q-pt-lg font-16" align="center">{{ card.text }}</div>
            </div>
          </div>

          <div
            class="q-pa-md menu-card card-hover-color shadow-5"
            v-show="hoverActiveIndex == index"
          >
            <div class="q-pt-md q-px-sm">
              <div class="font-20 text-white" align="center">
                {{ card.text }}
              </div>

              <div class="font-14 text-white q-pt-md">{{ card.hover }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="q-px-md">
        <q-separator color="grey-5" size="2px" />
      </div>

      <div class="row q-pt-md">
        <div
          v-for="(card, index) in cardList2"
          :key="index"
          class="col q-pa-md"
          align="center"
          @mouseenter="hoverOnCard2(index)"
          @mouseleave="deactiveHoverCard()"
          @click="index == 0 ? cardClick(card.router) : null"
          :class="
            index == 1 ? 'cursor-not-allowed disabled' : 'cursor-pointer '
          "
        >
          <div
            class="menu-card card-color shadow-5"
            v-show="hoverActiveIndex2 != index"
          >
            <div>
              <q-img
                :src="card.icon"
                style="border-radius:5px 5px 0px 0px; height:180px;"
              ></q-img>

              <div class="q-pt-md font-16" align="center">{{ card.text }}</div>
            </div>
          </div>

          <div
            class="q-pa-md menu-card card-hover-color shadow-5"
            v-show="hoverActiveIndex2 == index"
          >
            <div class="q-pt-md q-px-sm">
              <div class="font-20 text-white" align="center">
                {{ card.text }}
              </div>
              <div
                class="font-16 text-white q-pt-md"
                style="width: 70%; max-width:400px;"
              >
                {{ card.hover }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <myFooter></myFooter>
  </q-page>
</template>

<script>
import globalValueChainsHeader from "../components/globalValueChainsHeader";
import myFooter from "../components/footer";
export default {
  components: {
    globalValueChainsHeader,
    myFooter
  },
  data() {
    return {
      hoverActiveIndex: null,
      hoverActiveIndex2: null,
      cardList1: [
        {
          icon: require("../../public/images/icon01.png"),
          text: "What about key GVC relationships?",
          hover:
            "Get an overview of key backward and forward linkages for your economy of choice.",
          router: "/gvc-links"
        },
        {
          icon: require("../../public/images/icon02.png"),
          text: "What about content of exports?",
          hover:
            "Get an overview of value-added export structure for your economy of choice. See how this changes perception of bilateral trade balances",
          router: "/structure-of-value-added"
        },
        {
          icon: require("../../public/images/icon03.png"),
          text: "What about participation in GVCs?",
          hover:
            "Get an overview of GVC related trade for your economy of choice. Compare across sub-regional partners",
          router: "/participation-in-gvcs"
        },
        {
          icon: require("../../public/images/icon04.png"),
          text: "What about backward linkages?",
          hover:
            "Find out where imported content used in exports comes from for your economy of choice. Examine this by region and sector. Compare across sub-regional partners ",
          router: "/backward-linkages"
        },
        {
          icon: require("../../public/images/icon05.png"),
          text: "What about forward linkages?",
          hover:
            "Find out where your economy of choice contributes towards export production. Examine this by region and sector. Compare across sub-regional partners ",
          router: "/forward-linkages"
        }
      ],
      cardList2: [
        {
          icon: require("../../public/downloaddata.png"),
          text: "Download data",
          hover:
            "Query and download detailed data on value-added trade indicators for your economies, sectors and years of interest",
          router: "/download"
        },
        {
          icon: require("../../public/countrybrief.png"),
          text: "Country briefs",
          hover:
            "Get a summary of involvement in value-chains for your economy of choice",
          router: "/countrybriefs"
        }
      ]
    };
  },
  methods: {
    hoverOnCard(index) {
      this.hoverActiveIndex = index;
    },
    deactiveHoverCard() {
      this.hoverActiveIndex = null;
      this.hoverActiveIndex2 = null;
    },
    hoverOnCard2(index) {
      this.hoverActiveIndex2 = index;
    },
    cardClick(router) {
      console.log(router);
      this.$router.push(router);
    }
  },
  mounted() {
    this.$q.sessionStorage.set(
      "shareLink",
      "riva.negotiatetrade.org/#/global-value-chains"
    );
  }
};
</script>

<style lang="scss" scoped>
.bg {
  background-image: url("../../public/bg-global-value.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.menu-card {
  width: 100%;
  margin: auto;
  border-radius: 5px;
  height: 250px;
}
.card-color {
  background-color: #e5e1e1;
}
.card-hover-color {
  background: #020b3b;
}
</style>
