<template>
    <div>
        <h1>JOURNEY STATISTICS</h1>
        <p><b>TOTAL NUMBER OF JOURNEYS: </b>{{totalNoOfJourneys}}</p>
        <p><b>TOTAL DISTANCE TRAVELLED (KM): </b>{{totalDistance}}</p>
        <p><b>TOTAL CARBON FOOTPRINT REDUCED (KG): </b>{{totalCarbonCut}}</p>
        <br>
        <button type="button" v-on:click="showDistanceAgainstTimeGraph()"> Distance VS Time </button>
        <button type="button" v-on:click="showNoOfJourneysAgainstTimeGraph()"> Number of Journeys VS Time </button>
        <DistanceAgainstTimeGraph v-show="showGraph2" v-bind:cumulativeDistance="cumulativeDistance" v-bind:journeyDate="journeyTime"></DistanceAgainstTimeGraph>
        <NoOfJourneysAgainstTimeGraph v-show="showGraph3" v-bind:cumulativeNoOfJourneys="cumulativeNoOfJourneys" v-bind:journeyDate="journeyTime"></NoOfJourneysAgainstTimeGraph>    
    </div>
</template>

<script>
import database from '../firebase.js';
import DistanceAgainstTimeGraph from './DistanceAgainstTimeGraph.vue';
import NoOfJourneysAgainstTimeGraph from './NoOfJourneysAgainstTimeGraph.vue';

export default ({
    data() {
        return {
            totalNoOfJourneys: 0,
            totalCarbonCut: 0,
            totalDistance: 0,
            journeyCarbonCut: [],
            journeyTime: [],
            cumulativeNoOfJourneys: [],
            cumulativeCarbonCut: [],
            cumulativeDistance: [],
            showGraph2: true,
            showGraph3: false,
        }
    },
    components: {
        DistanceAgainstTimeGraph,
        NoOfJourneysAgainstTimeGraph
    },
    methods: {
        fetchUserData() {
            database.collection('users').doc(localStorage.uid).get().then(doc => {               
                var currentTotalDistance = 0;
                var currentTotalNoOfJourneys = 0;
                var sameJourneyDayDistance = 0;
                var sameJourneyDayCounter = 0;
                var currentJourneyTime = null;
                var newJourneyTime = null;
                var date = null;
                for (var j = 0; j < doc.data().journeyTime.length; j++) {

                    newJourneyTime = doc.data().journeyTime[j].toDate();
                    // First Journey
                    if (currentJourneyTime == null) {
                        sameJourneyDayDistance = doc.data().journeyDistance[j];
                        sameJourneyDayCounter += 1;
                        currentJourneyTime = newJourneyTime;

                        // If Last Journey
                        if (j == (doc.data().journeyTime.length - 1)) {
                            currentTotalDistance += sameJourneyDayDistance;
                            currentTotalNoOfJourneys += sameJourneyDayCounter;
                            this.cumulativeDistance.push(currentTotalDistance);
                            this.cumulativeNoOfJourneys.push(currentTotalNoOfJourneys); 
                            date = new Date(newJourneyTime.getFullYear(),newJourneyTime.getMonth(),newJourneyTime.getDate(),0,0,0,0);
                            this.journeyTime.push(date.toISOString());                            
                        }
                    
                    // Not First Journey
                    } else {
                         // If Same Day
                        if (currentJourneyTime.getFullYear() == newJourneyTime.getFullYear() && currentJourneyTime.getMonth() == newJourneyTime.getMonth() && currentJourneyTime.getDate() == newJourneyTime.getDate()) {
                            sameJourneyDayCounter += 1;
                            sameJourneyDayDistance = Math.round((sameJourneyDayDistance + doc.data().journeyDistance[j]) * 1e12) / 1e12;
                            // Last Journey
                            if (j == (doc.data().journeyTime.length - 1)) {
                                currentTotalDistance += sameJourneyDayDistance;
                                currentTotalNoOfJourneys += sameJourneyDayCounter;
                                this.cumulativeDistance.push(currentTotalDistance);
                                date = new Date(newJourneyTime.getFullYear(),newJourneyTime.getMonth(),newJourneyTime.getDate(),0,0,0,0);
                                this.journeyTime.push(date.toISOString());
                                this.cumulativeNoOfJourneys.push(currentTotalNoOfJourneys);                            
                            }

                        // If Different Day
                        } else {
                            currentTotalDistance += sameJourneyDayDistance;
                            currentTotalNoOfJourneys += sameJourneyDayCounter;
                            this.cumulativeDistance.push(currentTotalDistance);
                            this.cumulativeNoOfJourneys.push(currentTotalNoOfJourneys);
                            sameJourneyDayDistance = doc.data().journeyDistance[j];
                            sameJourneyDayCounter = 1;
                            date = new Date(currentJourneyTime.getFullYear(),currentJourneyTime.getMonth(),currentJourneyTime.getDate());
                            currentJourneyTime = newJourneyTime;
                            this.journeyTime.push(date.toISOString());
                            
                            // If Last Journey
                            if (j == (doc.data().journeyTime.length - 1)) {
                                currentTotalDistance += sameJourneyDayDistance;
                                currentTotalNoOfJourneys += sameJourneyDayCounter;
                                this.cumulativeDistance.push(currentTotalDistance);
                                this.cumulativeNoOfJourneys.push(currentTotalNoOfJourneys); 
                                date = new Date(newJourneyTime.getFullYear(),newJourneyTime.getMonth(),newJourneyTime.getDate(),0,0,0,0);
                                this.journeyTime.push(date.toISOString());                            
                            }
                        }
                    }
                }
                this.totalDistance = currentTotalDistance;
                this.totalNoOfJourneys = doc.data().journeyTime.length;
                this.totalCarbonCut = this.totalDistance * 0.005;
                this.totalCarbonCut = Math.round((this.totalCarbonCut + Number.EPSILON) * 100) / 100;
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
  width: 50%;
}

button:hover{
  background-color:white;
  color: black;
}
</style>
