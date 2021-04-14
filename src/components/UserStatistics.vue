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
            //userInformation: [],
            carbonCut: 0,
            cardholder: "",
            creditNum: "",
            csv: "",
            distance: 0,
            email: "",
            expiry: "",
            journeyCarbonCut: [],
            journeyDate: [],
            mobile: "",
            moneySave: "",
            name: "",
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
                //y: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
                y: this.journeyCarbonCut,
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
            // Problem accessing current user
            //database.collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
            database.collection('users').doc("kF6WPySduVVLpNHxD6gFLP12uA52").get().then(doc => {
                this.carbonCut = doc.data().carbonCut;
                this.cardHolder = doc.data().cardHolder;
                this.creditNum = doc.data().creditNum;
                this.csv = doc.data().csv;
                this.distance = doc.data().distance;
                this.email = doc.data().email;
                this.expiry = doc.data().expiry;

                this.journeyCarbonCut = doc.data().journeyCarbonCut;
                var journeyCarbonCutFromData = doc.data().journeyDate;
                var currentCarbonCut = 0;
                for (var i = 0; i < journeyCarbonCutFromData; i++) {
                    currentCarbonCut += journeyCarbonCutFromData[i];
                    this.cumulativeCarbonCut.push(currentCarbonCut);
                }
                var journeyDateFromData = doc.data().journeyDate;
                for (var j = 0; j < journeyDateFromData.length; j++) {
                    var currentJourneyDate = journeyDateFromData[j];
                    this.journeyDate.push(currentJourneyDate.toDate().toISOString());
                }

                this.mobile = doc.data().mobile;
                this.moneySave = doc.data().moneySave;
                this.name = doc.data().name;
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
