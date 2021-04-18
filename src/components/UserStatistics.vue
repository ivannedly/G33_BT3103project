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
        <CarbonCutAgainstTimeGraph v-show="showGraph1" v-bind:cumulativeCarbonCut="cumulativeCarbonCut" v-bind:journeyDate="journeyTime"></CarbonCutAgainstTimeGraph>
        <DistanceAgainstTimeGraph v-show="showGraph2" v-bind:cumulativeDistance="cumulativeDistance" v-bind:journeyDate="journeyTime"></DistanceAgainstTimeGraph>
        <NoOfJourneysAgainstTimeGraph v-show="showGraph3" v-bind:cumulativeDistance="cumulativeNoOfJourneys" v-bind:journeyDate="journeyTime"></NoOfJourneysAgainstTimeGraph>    
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
            journeyTime: [],
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
                var currentTotalDistance = 0;
                var currentTotalNoOfJourneys = 0;
                var sameJourneyDayDistance = 0;
                var sameJourneyDayCounter = 0;
                var currentJourneyTime = null;
                var newJourneyTime = null;
                var date = null;
                for (var j = 0; j < doc.data().journeyTime.length; j++) {
                    console.log("");
                    console.log("##### Journey Number " + (j+1));
                    newJourneyTime = doc.data().journeyTime[j].toDate();
                    console.log("newJourneyTime: " + newJourneyTime);
                    if (currentJourneyTime == null) {
                        sameJourneyDayDistance = doc.data().journeyDistance[j];
                        sameJourneyDayCounter += 1;
                        currentJourneyTime = newJourneyTime;
                    } else {
                        console.log("Previous Year: " + currentJourneyTime.getFullYear() + ", Previous Month: " + currentJourneyTime.getMonth() + ", Previous Date: " + currentJourneyTime.getDate());
                        console.log("New Year: " + newJourneyTime.getFullYear() + ", New Month: " + newJourneyTime.getMonth() + ", New Date: " + newJourneyTime.getDate());
                        // if same day
                        if (currentJourneyTime.getFullYear() == newJourneyTime.getFullYear() && currentJourneyTime.getMonth() == newJourneyTime.getMonth() && currentJourneyTime.getDate() == newJourneyTime.getDate()) {
                            console.log("same day!");
                            sameJourneyDayCounter += 1;
                            sameJourneyDayDistance = Math.round((sameJourneyDayDistance + doc.data().journeyDistance[j]) * 1e12) / 1e12;
                            if (j == (doc.data().journeyTime.length - 1)) {
                                console.log("Last journey!");
                                currentTotalDistance += sameJourneyDayDistance;
                                currentTotalNoOfJourneys += sameJourneyDayCounter;
                                this.cumulativeDistance.push(currentTotalDistance);
                                date = new Date(newJourneyTime.getFullYear(),newJourneyTime.getMonth(),newJourneyTime.getDate(),0,0,0,0);
                                this.journeyTime.push(date.toISOString());
                                this.cumulativeNoOfJourneys.push(currentTotalNoOfJourneys); 
                                console.log("this.journeyTime: " + this.journeyTime);
                                console.log("this.cumulativeDistance: " + this.cumulativeDistance);
                                console.log("this.cumulativeNoOfJourneys: " + this.cumulativeNoOfJourneys);                               
                            }
                        } else {
                            console.log("Different day!");
                            currentTotalDistance += sameJourneyDayDistance;
                            currentTotalNoOfJourneys += sameJourneyDayCounter;
                            this.cumulativeNoOfJourneys.push(currentTotalNoOfJourneys);
                            //currentTotalNoOfJourneys += sameJourneyDayCounter;
                            date = new Date(currentJourneyTime.getFullYear(),currentJourneyTime.getMonth(),currentJourneyTime.getDate());
                            console.log("date: " + date);
                            currentJourneyTime = newJourneyTime;
                            this.cumulativeDistance.push(currentTotalDistance);
                            this.journeyTime.push(date.toISOString());
                            console.log("currentTotalNoOfJourneys: " + currentTotalNoOfJourneys);
                            console.log("this.cumulativeDistance: " + this.cumulativeDistance);
                            console.log("this.journeyTime: " + this.journeyTime);
                            sameJourneyDayDistance = doc.data().journeyDistance[j];
                            sameJourneyDayCounter = 1;
                            if (j == (doc.data().journeyTime.length - 1)) {
                                console.log("Last journey!");
                                currentTotalDistance += sameJourneyDayDistance;
                                currentTotalNoOfJourneys += sameJourneyDayCounter;
                                this.cumulativeDistance.push(currentTotalDistance);
                                date = new Date(newJourneyTime.getFullYear(),newJourneyTime.getMonth(),newJourneyTime.getDate(),0,0,0,0);
                                this.journeyTime.push(date.toISOString());
                                this.cumulativeNoOfJourneys.push(currentTotalNoOfJourneys); 
                                console.log("this.journeyTime: " + this.journeyTime);
                                console.log("this.cumulativeDistance: " + this.cumulativeDistance);
                                console.log("this.cumulativeNoOfJourneys: " + this.cumulativeNoOfJourneys);                               
                            }
                        }
                    }
                }
                this.totalDistance = currentTotalDistance;
                this.totalNoOfJourneys = doc.data().journeyTime.length;            
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
