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
        cumulativeNoOfJourneys: {},
        journeyDate: {},
    },
    data(){
        return {
            data:[{
                x: this.journeyDate,
                y: this.cumulativeNoOfJourneys,
                type:"scatter"
            }],
            layout:{
                title: "Total Number of Journeys Against Time Graph"
            } 
        }
    }
})
</script>

<style scoped>
</style>
