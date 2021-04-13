<template>
  <div id = "app">
      <Plotly :data="data1" :layout="layout1"></Plotly>
      <Plotly :data="data2" :layout="layout2"></Plotly>
  </div>
</template>

<script>
//import database from '../firebase.js';
import {Plotly} from 'vue-plotly';

export default ({
  name: 'app',
  data () {
    return {
      data1: [{
                x: [-1,2,3,4],
                y: [1,3,13,10],
                mode:'markers',
                name:'East',
                text:['East: Bedok - Number of Cases: 10' , 
                    'East: Parkway - Number of Cases: 11', 
                    'East: Tampines - Number of Cases: 12', 
                    'East: Pasir Ris - Number of Cases: 19'],
                marker: {
            color: 'rgb(164, 194, 244)',
            size: 12,
            line: {
                color: 'white',
                width: 1
            }
                },
                type: "scatter"
            }],
            layout1: {
                title: "Covid Graph"
            },
        data2: [{
            x: [2,3,4],
            y: [4,5,6],
            mode:'markers',
            name: 'West',
            text:['Kent Ridge', 'Clementi', 'Holland Village'],
            marker: {
                color: 'rgb(255, 217, 102)',
                size: 12
            },
            type: 'scatter'
            
        }],
        layout2: {
            title: "West Graph"
        }

    }
  },
  components: {
        Plotly
  }
})
/*export default ({
  data: function() {
    return {

    }

  }

})*/
</script>

<style>
#app {
  margin-top: 60px;
}
</style>