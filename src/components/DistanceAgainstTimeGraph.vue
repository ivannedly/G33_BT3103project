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
        cumulativeDistance: {},
        journeyDate: {},
    },
    data(){
        return {
            data:[{
                x: this.journeyDate,
                y: this.cumulativeDistance,
                type:"scatter"
            }],
            layout:{
                title: "Total Distance Travelled (in km) Against Time"
            } 
        }
    }
})
</script>

<style scoped>
</style>
