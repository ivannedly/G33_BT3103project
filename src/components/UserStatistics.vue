<template>
    <div>
        <!--
        ##### Order of Items #####
        Number of Journeys
        Total Distance Travelled
        Carbon Footprint Reduced
        Money Saved (from rewards)
        -->
        <h1 style="color: white;">JOURNEY STATISTICS</h1>
        <p><b>TOTAL NUMBER OF JOUNEYS: </b>{{travelNum}}</p>
        <p><b>TOTAL DISTANCE TRAVELLED (KM): </b>{{distance}}</p>
        <p><b>CARBON FOOTPRINT REDUCED (KG): </b>{{carbonCut}}</p>
        <p><b>MONEY SAVED (IN SGD): </b>{{moneySave}}</p>
    </div>
</template>

<script>
import database from '../firebase.js';

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
            mobile: "",
            moneySave: "",
            name: "",
            travelNum: 0,
        }
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
                this.mobile = doc.data().mobile;
                this.moneySave = doc.data().moneySave;
                this.name = doc.data().name;
                this.travelNum = doc.data().travelNum;
                console.log(this.expiry);
            })
        },
    },
    created() {
        this.fetchUserData();
    }
})
</script>

<!--<style scoped>
</style>-->
