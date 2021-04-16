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
    },
    data(){
        return {
            data:[{
                x: this.journeyDate,
                y: this.cumulativeCarbonCut,
                type:"scatter"
            }],
            layout:{
                title: "Total Carbon Cut (in kg) against Time"
            } 
        }
    }
})
</script>

<style scoped>
</style>
