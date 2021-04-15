<template>
    <div>
        <Plotly :data="data" :layout="layout"></Plotly>
    </div>
</template>

<script>
import { Plotly } from 'vue-plotly'

export default({
    components: {
        Plotly,
    },
    props: {
        cumulativeCarbonCut: {},
        journeyDate: {},
        //graphData: {}
    },
    data(){
        return {
            data:[{
                //x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
                x: this.journeyDate,
                //y: [10,15,13,17],
                y: this.cumulativeCarbonCut,
                //y: this.graphData[0],
                type:"scatter"
            }],
            layout:{
                title: "StatisticsGraph.vue"
            } 
        }
    }
})
</script>

<style scoped>
</style>
