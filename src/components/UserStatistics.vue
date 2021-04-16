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
        <CarbonCutAgainstTimeGraph v-bind:cumulativeCarbonCut="cumulativeCarbonCut" v-bind:journeyDate="journeyDate"></CarbonCutAgainstTimeGraph>
    </div>
</template>

<script>
import database from '../firebase.js';
import CarbonCutAgainstTimeGraph from './CarbonCutAgainstTimeGraph.vue';

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
        }
    },
    components: {
        CarbonCutAgainstTimeGraph
    },
    methods: {
        fetchUserData() {
            console.log(localStorage.uid);
            database.collection('users').doc(localStorage.uid).get().then(doc => {
                this.carbonCut = doc.data().carbonCut;
                this.distance = doc.data().distance;
                // Get carbon emissions saved
                this.journeyCarbonCut = doc.data().journeyCarbonCut;
                var journeyCarbonCutFromData = doc.data().journeyCarbonCut;
                var currentCarbonCut = 0;
                for (var i = 0; i < journeyCarbonCutFromData.length; i++) {
                    currentCarbonCut = Math.round((currentCarbonCut + journeyCarbonCutFromData[i]) * 1e12) / 1e12;
                    this.cumulativeCarbonCut[i] = currentCarbonCut;
                }
                console.log(this.cumulativeCarbonCut);
                // Get journey dates
                var journeyDateFromData = doc.data().journeyDate;
                for (var j = 0; j < journeyDateFromData.length; j++) {
                    var currentJourneyDate = journeyDateFromData[j];
                    this.journeyDate.push(currentJourneyDate.toDate().toISOString());
                }
                this.graphData[0] = this.cumulativeCarbonCut;
                this.graphData[1] = this.journeyDate;
                console.log("Graph Data: " + this.graphData);

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
