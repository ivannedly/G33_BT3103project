<template>
    <div>
        <!--
        ##### Order of Items #####
        Number of Journeys
        Total Distance Travelled
        Carbon Footprint Reduced
        Money Saved (from rewards)
        -->
        <h1>Journey Statistics</h1>
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
            distance: 0,
            email: "",
            mobile: "",
            moneySave: "",
            name: "",
            travelNum: 0,
        }
    },
    methods: {
        fetchUserData() {
            //Uncommented after figuring out how to add in "firebase"
            //var user = firebase.auth().currentUser;

            //Using speific uid first
            database.collection('users').doc("LLE0xYwfEFSV9SvSwnoqvAx9tpz2").get().then(doc => {
                //this.userInformation.push(doc.data());
                //console.log(doc.data());
                this.carbonCut = doc.data().carbonCut;
                this.distance = doc.data().distance;
                this.email = doc.data().email;
                this.mobile = doc.data().mobile;
                this.moneySave = doc.data().moneySave;
                this.name = doc.data().name;
                this.travelNum = doc.data().travelNum;
                console.log(this.name);
            })
        }
    },
    created() {
        this.fetchUserData();
    }
})
</script>

<style scoped>

</style>
