<template>
    <div>
        <!--
        ##### Order of Items #####
        Number of Journeys
        Total Distance Travelled
        Carbon Footprint Reduced
        Money Saved (from rewards)
        -->
        <h1>JOURNEY STATISTICS</h1>
        <p><b>TOTAL NUMBER OF JOUNEYS: </b>{{travelNum}}</p>
        <p><b>TOTAL DISTANCE TRAVELLED (KM): </b>{{distance}}</p>
        <p><b>CARBON FOOTPRINT REDUCED (KG): </b>{{carbonCut}}</p>
        <p><b>MONEY SAVED (IN SGD): </b>{{moneySave}}</p>
        <p>{{journeyCarbonCut}}</p>
        <p>{{journeyDate}}</p>
        <Plotly :data="data1" :layout="layout1"></Plotly>
        <Plotly :data="data2" :layout="layout2"></Plotly>
    </div>
</template>

<script>
import database from '../firebase.js';
import {Plotly} from 'vue-plotly';

export default ({
    data() {
        return {
            carbonCut: 0,
            distance: 0,
            journeyCarbonCut: [],
            journeyDate: [],
            moneySave: 0,
            travelNum: 0,
            cumulativeCarbonCut: [],
            data1: [{
                x: [1,2,3,4],
                y: [10,15,13,17],
                type: "scatter"
            }],
            layout1: {
                title: "My Graph"
            },
            data2: [{
                //x: this.journeyDate,
                x: ["2019-12-31T16:00:00.000Z", "2020-01-31T16:00:00.000Z", "2020-02-29T16:00:00.000Z", "2020-03-31T16:00:00.000Z", "2020-04-30T16:00:00.000Z", "2020-05-31T16:00:00.000Z", "2020-06-30T16:00:00.000Z", "2020-07-31T16:00:00.000Z", "2020-08-31T16:00:00.000Z", "2020-09-30T16:00:00.000Z", "2020-10-31T16:00:00.000Z", "2020-11-30T16:00:00.000Z", "2020-12-31T16:00:00.000Z", "2021-01-31T16:00:00.000Z", "2021-02-28T16:00:00.000Z", "2021-03-31T16:00:00.000Z"],
                y: this.cumulativeCarbonCut,
                type: "scatter"
            }],
            layout2: {
                title: "My Graph"
            },
        }
    },
    components: {
        Plotly,
    },
    methods: {
        fetchUserData() {
            database.collection('users').doc(localStorage.uid).get().then(doc => {
                this.carbonCut = doc.data().carbonCut;
                this.distance = doc.data().distance;
                // Get carbon emissions saved
                this.journeyCarbonCut = doc.data().journeyCarbonCut;
                var journeyCarbonCutFromData = doc.data().journeyDate;
                var currentCarbonCut = 0;
                for (var i = 0; i < journeyCarbonCutFromData; i++) {
                    currentCarbonCut += journeyCarbonCutFromData[i];
                    this.cumulativeCarbonCut.push(currentCarbonCut);
                }
                // Get journey dates
                var journeyDateFromData = doc.data().journeyDate;
                for (var j = 0; j < journeyDateFromData.length; j++) {
                    var currentJourneyDate = journeyDateFromData[j];
                    this.journeyDate.push(currentJourneyDate.toDate().toISOString());
                }

                this.moneySave = doc.data().moneySave;
                this.travelNum = doc.data().travelNum;
            
            })
        },
    },
    created() {
        this.fetchUserData();
    }
})
</script>

<style scoped>
div {
  padding: 30px;
  background-color: #CFD171;
  border-radius: 15px;
}

h1 {
    color: black;
    background-color: white;
    padding: 10px;
}
</style>
