<template>
  <el-card>
    <crumbs left="数据统计" right="数据列表"></crumbs>
    <br>
     <div ref="main" id="main" style="width: 600px;height:400px;"></div>
  </el-card>
</template>

<script>
import myEchart from 'echarts'

export default {
  name: 'report',
  mounted(){
    this.useEchart()
  },
  methods:{
     async useEchart(){
      //init
      // var myEchart = myEchart.init(this.$refs.main)
      var myChart = myEchart.init(document.getElementById('main'));
      
      //option
      // var option = {
      //       title: {
      //           text: 'ECharts 入门示例'
      //       },
      //       tooltip: {},
      //       legend: {
      //           data:['销量']
      //       },
      //       xAxis: {
      //           data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      //       },
      //       yAxis: {},
      //       series: [{
      //           name: '销量',
      //           type: 'bar',
      //           data: [5, 20, 36, 10, 10, 20]
      //       }]
      // };
     
      const res = await this.$http.get('/report/:type')
      console.log(res.data.data);
      var arr1 = []
      var arr2 = []
      var arr3 = []
      var arr4 = []
      var arr5 = []
      res.data.data.forEach(item=>{
        if(item.rp1_area === '华东'){
         arr1.push(item.rp1_user_count)
        }
        if(item.rp1_area === '华北'){
         arr2.push(item.rp1_user_count)
        }
        if(item.rp1_area === '西部'){
         arr3.push(item.rp1_user_count)
        }
        if(item.rp1_area === '华南'){
         arr4.push(item.rp1_user_count)
        }
        if(item.rp1_area === '其他'){
         arr5.push(item.rp1_user_count)
        }
      })
      console.log(arr1);
  
     var option = {
        title: {
            text: '堆叠区域图'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
         legend: {
          data: ['华东', '华南', '华北', '西部', '其他']
        },
        toolbox: {
          feature: {
              saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['2017-12-27','2017-12-29','2017-12-31']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
            {
                name: '华东',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: arr1
            },
            {
                name: '华南',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: arr2
            },
            {
                name: '华北',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: arr3
            },
            {
                name: '西部',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: arr4
            },
            {
                name: '其他',
                type: 'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {},
                data: arr5
            }
        ]

      }


      

      myChart.setOption(option);
    }
  }

}
</script>

<style scoped>

</style>
