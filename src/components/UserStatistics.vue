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
        <p><b>TOTAL DISTANCE TRAVELLED (KM): </b>{{totalDistance}}</p>
        <p><b>TOTAL CARBON FOOTPRINT REDUCED (KG): </b>{{totalCarbonCut}}</p>
        <p><b>TOTAL MONEY SAVED (IN SGD): </b>{{moneySave}}</p>
        <CarbonCutAgainstTimeGraph v-bind:cumulativeCarbonCut="cumulativeCarbonCut" v-bind:journeyDate="journeyDate"></CarbonCutAgainstTimeGraph>
        <DistanceAgainstTimeGraph v-bind:cumulativeDistance="cumulativeDistance" v-bind:journeyDate="journeyDate"></DistanceAgainstTimeGraph>
    </div>
</template>

<script>
import database from '../firebase.js';
import CarbonCutAgainstTimeGraph from './CarbonCutAgainstTimeGraph.vue';
import DistanceAgainstTimeGraph from './DistanceAgainstTimeGraph.vue';

export default ({
    data() {
        return {
            totalCarbonCut: 0,
            totalDistance: 0,
            moneySave: 0,
            travelNum: 0,
            journeyCarbonCut: [],
            journeyDate: [],
            cumulativeCarbonCut: [],
            cumulativeDistance: [],
        }
    },
    components: {
        CarbonCutAgainstTimeGraph,
        DistanceAgainstTimeGraph
    },
    methods: {
        fetchUserData() {
            database.collection('users').doc(localStorage.uid).get().then(doc => {
                // Get distance
                var currentTotalDistance = 0;
                for (var k = 0; k < doc.data().distance.length; k++) {
                    currentTotalDistance = Math.round((currentTotalDistance + doc.data().distance[k]) * 1e12) / 1e12;
                    this.cumulativeDistance[k] = currentTotalDistance;
                }
                this.totalDistance = currentTotalDistance;
                
                // Get carbon emissions saved
                var currentTotalCarbonCut = 0;
                for (var i = 0; i < doc.data().journeyCarbonCut.length; i++) {
                    currentTotalCarbonCut = Math.round((currentTotalCarbonCut + doc.data().journeyCarbonCut[i]) * 1e12) / 1e12;
                    this.cumulativeCarbonCut[i] = currentTotalCarbonCut;
                }
                this.totalCarbonCut = currentTotalCarbonCut;

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
