<template>
  <div class="q-pa-md">
      <div class="font-16 row ">
        <div>
          <b>{{ type }} Integration dimensions (all included)</b>
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
      <div class="q-pt-sm"  style="width:400px;margin:auto" >
        <div class="q-pt-sm row justify-start ">
          <div class="col-4 q-pt-sm" v-for="(item,index) in indicatorData" :key="index">
            <img
              :src="filePic(item.icon)"
              alt=""
              class="iconDimension"
            >
            <q-tooltip>
              {{item.name}}<br />
              <div v-for="(item2,index2) in item.indicator" :key="index2">- {{item2}} </div>
            </q-tooltip></img>
          </div>
          </div> 
      </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["type"],
  data() {
    return {
      indicatorData: []
    }
  },
  methods: {
    filePic(fileName){
      return this.ri_api + "pic/" + fileName
    },
    async loadData(){
     
      this.indicatorData = []
      let data = {
        type: this.type
      }
        let url = this.ri_api + "dimension_icon.php";
        let res = await axios.post(url, JSON.stringify(data));
        this.indicatorData = res.data
    }
  },  
  watch: {
    type: function(newData, oldData) {
     this.loadData()
    }
  },
 
  mounted () {
    this.loadData();
  },

};
</script>

<style lang="scss" scoped>
.iconDimension {
  width: 120px;
  border: 3px solid #2D9687;
}

</style>
