<template>
  <div align="center">
    <div class="font-24">
      How did Integration progress across periods? - group and individual
      dimenstions
    </div>
    <p>
      From 2014-16 to 2017-19 the group’s Integration average increased
      {{ 0.08 }} - from {{ 0.63 }} to {{ 0.71 }}
      <br />
      Trade and Investment (+0.14) and Infrastructure (+0.10) progressed the
      most.
      <br />Digital Economy (+0.05) and Regional Cooperation (-0.10) the least.
      <p>Click on a dimension name or bar chart to see the Integration associated with its indicators</p>
    </p>
    <div id="groupBar"></div>
  </div>
</template>

<script>
export default {
  props: ["data", "input"],
  data() {
    return {
      yAxisText:'',
      dimensionList: [
        "Your group",
        "Trade and Investment",
        "Financial",
        "Regional Value Chains",
        "Infrastructure",
        "Movement of People",
        "Regulatory cooperation",
        "Digital Economy",
      ],
      integrationScore:[
        {
        name: 'Year 1800',
        color:'#2381B8',
        data: [.7,.76,.63,.64,.66,.57,.57,.50]
    }, {
        name: 'Year 1900',
        color:'#EB1E63',
        data: [.84,.80,.76,.74,.70,.63,.60,.54]
    }
      ]
    };
  },
  methods: {
    plotChart() {
      Highcharts.chart('groupBar', {
    chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    
    xAxis: {
        categories: this.dimensionList,
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        max:1,
        title: {
            text: this.yAxisText,
        },
        labels: {
            overflow: 'justify'
        },
       
    },
    tooltip: {
        valueSuffix: ''
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true,
                inside:true,
                align:'right'
            }
        },
        series: {
            pointWidth: 20,
          },
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        floating: false,
        borderWidth: 0,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      
    },
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
    series: this.integrationScore
});
      
    }
  },
  mounted () {
    this.plotChart();

  },
};
</script>

<style lang="scss" scoped>
#groupBar{
  width:80%;
  height: 600px;
}
p {
  font-size: 16px;
}
</style>
