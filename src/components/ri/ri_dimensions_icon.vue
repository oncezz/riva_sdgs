<template>
  <div class="q-pa-md q-px-xl">
      <div class="font-16 row ">
        <div>
          <b>{{ typeName(type) }} dimensions (all included)</b>
        </div>
        <div class="q-px-md">
          <q-icon name="fas fa-question-circle" size="24px">
             <q-tooltip>
              In DigiSRII 2.0 all dimensions are included <br />by default. To
              peruse specific dimensions <br />
              head on to the section “Build you own”
            </q-tooltip>
          
          </q-icon>
        </div>
      </div>
      <div>Hover to reveal included indicators</div>
      <!-- Sustainable integration icon -->
      <div class="q-pt-sm" v-show="type=='A'" style="width:400px;margin:auto" >
        <div class="q-pt-sm row justify-center ">
          <div class="col-4">
            <img
              src="../../../public/ri/dimension01.svg"
              alt=""
              class="iconDimension"
            >
            <q-tooltip>
              Trade and investment<br />
              - Exports to GDP<br />
              - Imports to GDP<br />
              - Import tarriffs<br />
              - FDI inflows to GDP<br />
              - FDI outflows to GDP<br />
            </q-tooltip></img>
          </div>
          <div class="col-4 ">
            <img
              src="../../../public/ri/dimension02.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Financial integration<br />
              - Cross-border portfolio liablilities and assests to GDP<br />
              - Deposit rates dispersion<br />
              - Share price index correlation<br />
            </q-tooltip></img>
          </div>
          <div class="col-4">
               <img
              src="../../../public/ri/dimension03.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Regional value chain integration<br />
              - Export complementarity index<br />
              - RVC participation index<br />
              - Intermediate goods exports to GDP<br />
              - Intermediate goods imports to GDP<br />
            </q-tooltip></img>
          </div>

          </div>
          <div class="q-pt-sm row justify-center ">
          <div class="col-4">
            <img
              src="../../../public/ri/dimension04.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Infrastructure integration<br />
              - Linear shipping connectivity index<br />
              - Trade facilitation implement<br />
              - Average internet quality<br />
              - Average trade cost<br />
            </q-tooltip></img>
          </div>
          <div  class="col-4">
            <img
              src="../../../public/ri/dimension05.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Movement of peolple<br />
              - Stock of emigrants per capita<br />
              - Stock of immigrants per capita<br />
              - Remittances outflow to GDP<br />
              - Remittances inflow to GDP<br />
            </q-tooltip></img>
          </div>
          <div  class="col-4">
           <img
              src="../../../public/ri/dimension06.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Regulatory cooperation<br />
              - Signed FTA (Yes/No)<br />
              - Signed IIA (Yes/No)<br />
              - Embassy (yes/No)<br />
              - Trade regulatory distance<br />
            </q-tooltip></img>
          </div>
          </div>
          <div  class="q-pt-sm">
            <img
              src="../../../public/ri/dimension07.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Digital economy integration<br />
              - ICT goods exports to GDP<br />
              - ICT goods imports to GDP<br />
              - Tariffs on ICT imports<br />
              - Share of online internet shoppers<br />
              - Digital trade regulatory similiarity<br />
            </q-tooltip></img>
          </div>
        
      </div>
        <div  class="q-pt-sm" v-show="type=='B'" style="width:400px;margin:auto" >
         <div class="q-pt-sm row justify-center ">
          <div class="col-4">
            <img
              src="../../../public/ri/dimension01.svg"
              alt=""
              class="iconDimension"
            >
            <q-tooltip>
              Trade and investment<br />
              - Environmental goods exports in GDP of exporting country<br />
              - Environmental goods imports in GDP of importing country<br />
              - Tariff on intraregional imports of environmental goods<br />
              - Employment created by DVA in exports to regional economies<br />
            </q-tooltip></img>
          </div>
          <div  class="col-4">
            <img
              src="../../../public/ri/dimension02.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Financial integration<br />
              - Intraregional real exchange rate volatility<br />
              - Average intraregional financial development index score<br />
              - Volatility weighted pair-wise correlaton of share price index averaged regionally<br />
            </q-tooltip></img>
          </div>
          <div class="col-4">
               <img
              src="../../../public/ri/dimension03.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Regional value chain integration<br />
              - Regional environmental good export complementarity index<br />
              - Sustainable RVC participation index<br />
              - Intraregional exports of intermediates per unit of CO2 emissions  <br />
            </q-tooltip></img>
          </div>
          </div>
           <div class="q-pt-sm row justify-center ">
          <div  class="col-4">
            <img
              src="../../../public/ri/dimension04.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Infrastructure integration<br />
              - Average intraregional rural access to electricity<br />
              - Intraregional sustainable trade facilitation implementation<br />
              - Average intraregional share of Internet users in population<br />
            </q-tooltip></img>
          </div>
          <div class="col-4">
            <img
              src="../../../public/ri/dimension05.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Movement of peolple<br />
              - Average outward remittances per regional immigrant<br />
              - Average inward remittances per emigrant<br />
            </q-tooltip></img>
          </div>
          <div  class="col-4">
           <img
              src="../../../public/ri/dimension06.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Regulatory cooperation<br />
              - Sustainable regional FTA score<br />
              - Sustainable regional IIA score<br />
              - Average intraregional rule of law index score<br />
              - SDG trade regulatory distance from regional partners<br />
            </q-tooltip></img>
          </div>
          </div>
          <div class="q-pt-sm">
            <img
              src="../../../public/ri/dimension07.svg"
              alt=""
              class="iconDimension"
            ><q-tooltip>
              Digital economy integration<br />
              - Average intraregional secure Internet servers<br />
              - Average intraregional proportion of households with Internet access <br />
              - Average intraregional share of female population with financial institution or mobile money account<br />
              - Average intraregional share of female population that use Internet for online purchase<br />
            </q-tooltip></img>
          </div>
        
      </div>
    </div>
</template>

<script>
export default {
  props: ["type"],
  methods: {
      typeName(char) {
      return char == "A"
        ? "Sustainable integration"
        : "Conventional integration";
    },
  },
};
</script>

<style lang="scss" scoped>
.iconDimension {
  width: 120px;
  border: 3px solid #2D9687;
}

</style>
