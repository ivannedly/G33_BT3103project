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
        <p><b>TOTAL NUMBER OF JOURNEYS: </b>{{totalNoOfJourneys}}</p>
        <p><b>TOTAL DISTANCE TRAVELLED (KM): </b>{{totalDistance}}</p>
        <p><b>TOTAL CARBON FOOTPRINT REDUCED (KG): </b>{{totalCarbonCut}}</p>
        <br>
        <button type="button" v-on:click="showCarbonCutAgainstTimeGraph()"> Carbon Cut VS Time </button> 
        <button type="button" v-on:click="showDistanceAgainstTimeGraph()"> Distance VS Time </button>
        <button type="button" v-on:click="showNoOfJourneysAgainstTimeGraph()"> Number of Journeys VS Time </button>
        <CarbonCutAgainstTimeGraph v-show="showGraph1" v-bind:cumulativeCarbonCut="cumulativeCarbonCut" v-bind:journeyDate="journeyDate"></CarbonCutAgainstTimeGraph>
        <DistanceAgainstTimeGraph v-show="showGraph2" v-bind:cumulativeDistance="cumulativeDistance" v-bind:journeyDate="journeyDate"></DistanceAgainstTimeGraph>
        <NoOfJourneysAgainstTimeGraph v-show="showGraph3" v-bind:cumulativeDistance="cumulativeNoOfJourneys" v-bind:journeyDate="journeyDate"></NoOfJourneysAgainstTimeGraph>    
    </div>
</template>

<script>
import database from '../firebase.js';
import CarbonCutAgainstTimeGraph from './CarbonCutAgainstTimeGraph.vue';
import DistanceAgainstTimeGraph from './DistanceAgainstTimeGraph.vue';
import NoOfJourneysAgainstTimeGraph from './NoOfJourneysAgainstTimeGraph.vue';

export default ({
    data() {
        return {
            totalNoOfJourneys: 0,
            totalCarbonCut: 0,
            totalDistance: 0,
            journeyCarbonCut: [],
            journeyDate: [],
            cumulativeNoOfJourneys: [],
            cumulativeCarbonCut: [],
            cumulativeDistance: [],
            showGraph1: true,
            showGraph2: false,
            showGraph3: false,
        }
    },
    components: {
        CarbonCutAgainstTimeGraph,
        DistanceAgainstTimeGraph,
        NoOfJourneysAgainstTimeGraph
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
                var currentTotalNoOfJourneys = 0;
                for (var j = 0; j < doc.data().journeyDate.length; j++) {
                    currentTotalNoOfJourneys += 1;
                    this.cumulativeNoOfJourneys[j] = currentTotalNoOfJourneys;
                    var currentJourneyDate = doc.data().journeyDate[j];
                    this.journeyDate.push(currentJourneyDate.toDate().toISOString());
                }
                this.totalNoOfJourneys = currentTotalNoOfJourneys;            
            })
        },
        showCarbonCutAgainstTimeGraph() {
            this.showGraph1 = true;
            this.showGraph2 = false;
            this.showGraph3 = false;
        },
        showDistanceAgainstTimeGraph() {
            this.showGraph1 = false;
            this.showGraph2 = true;
            this.showGraph3 = false;
        },
        showNoOfJourneysAgainstTimeGraph() {
            this.showGraph1 = false;
            this.showGraph2 = false;
            this.showGraph3 = true;
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
    border-radius: 10px;
}

button {
  text-align: center;
  background: none;
  transition-duration: 0.4s;
  padding: 10px 24px;
  background-color:black;
  color: white;
  width: 33%;
}

button:hover{
  background-color:white;
  color: black;
}
</style>
