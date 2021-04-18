<template>
    <div>
        {{cumulativeNoOfJourneys}}
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
                title: "Total Number of Journeys Against Time"
            } 
        }
    },
    updated() {
        console.log("this.cumulativeNoOfJourneys in Graph: " + this.cumulativeNoOfJourneys);
    }
})
</script>

<style scoped>
</style>
