<template>
  <div class="row" v-if="signedIn">
    <div class="map" v-if="inTrip">
      <GoogleMap/>
      <button type="button" class="payment-button" v-on:click="finishTrip">Pay for current trip</button> <br> <br>
    </div>
    <div class="map-2" v-else>
      <div class="trip-msgbox">
        <a class="notrip-msg">You currently don't have upcoming trips.
          <br> Go Plan page and start planning your next trip! 
        </a> 
      </div>
    </div>

    <div class="userProfile">
      <div class="welcome-msg">Welcome Back {{this.name}}! </div>
      <img src = "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8dHJlZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt = "Photo of Tree">
      <div class="summary-box">
        <div class="user-summary">
          <a>You have saved... </a> <br> <br>
          <div class="stats-box">
            <a>{{this.carbonSaved}}kg of CO2</a>
          </div> <br>
          <a>for taking a train or bus instead of a car.</a> <br> <br>
          <a>Well Done!</a>
        </div>
      </div>
      <p class="message"><router-link to="/profile" exact>More in Profile</router-link></p>
    </div>
    <div class="plantInfo">
      <div class="plant-info">Your Plantpal</div>
      <PlantProgress></PlantProgress>
    </div>
  </div>
  <div v-else>
    <SignIn></SignIn>
  </div>
</template>

<script>
import GoogleMap from './GoogleMap.vue'
import database from '../firebase.js';
import firebase from '@firebase/app';
require('firebase/auth');
import PlantProgress from './PlantProgress.vue';
import SignIn from './SignIn.vue'

export default { 
  components: {
    GoogleMap,
    PlantProgress,
    SignIn,
  },
  
  data() {
    return {
      name: "",
      carbonSaved: 0,
      signedIn: false,
      inTrip: false,
      distances: []
    };
  },

  methods: {
    fetchUserName: function(){
      if(localStorage.uid != null){
        database.collection('users').doc(localStorage.uid).get().then(doc => {
          this.name = doc.data().name;
          this.carbonSaved = doc.data().carbonCut;
          this.distances = doc.data().distance;
          this.signedIn = true;
          if(doc.data().start != ""){
            this.inTrip=true;
          }
        })
      }
    },

    finishTrip: function(){
      const increaseBy7 = firebase.firestore.FieldValue.increment(7);
      console.log(this.distances)
      this.distances.push(Number(localStorage.distance)) //update local array distances
      console.log(this.distances)
      database.collection('users').doc(localStorage.uid).update({
        start: "", //after payment, reset the start and end states to empty strings
        end: "", 
        distance: this.distances, //push updated distance array to database
        ppLevel: increaseBy7
      })
      this.inTrip =false;
    }
  },

  created() {
    this.fetchUserName();
  }
}
</script>
<style scoped>
img {
  border: 1px solid #ddd;
  border-radius: 50%;
  padding: 5px;
  width: 150px;
  height: 150px;
  object-fit: cover;
}

img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}

.map {
  float: left;
  width: 30%;
  border-radius: 10px;
  height: 610px;
  padding-bottom: 30px;
  border:3px solid seagreen;
}

.map-2 {
  float: left;
  width: 30%;
  border-radius: 10px;
  height: 610px;
  padding-bottom: 30px;
  border:3px solid seagreen;
  background-image: url("../assets/map.jpg");
  padding-left: 30px;
  padding-right: 30px;
}

.trip-msgbox {
  vertical-align: center;
  background: rgba(143, 188, 139, 0.55);
  padding-top: 250px;
  padding-bottom: 255px;
  padding-left: 50px;
  padding-right: 50px;
}

.notrip-msg {
  font-size: 25px;
  font-weight: bold;
  color: black;
  vertical-align: center;
}

.userProfile {
  float: left;
  width: 32%;
  padding-left: 30px;
}

.plantInfo {
  float: right;
  width: 27%;
  border:3px solid seagreen;
  border-radius: 10px;
  height: 610px;
  padding: 5px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.payment-button {
  text-align: center;
  border: none;
  font-size: 15px;
}

.welcome-msg {
  padding-top: 20px;
  text-align: center;
  padding-bottom: 30px;
  font-size: 30px;
}

.summary-box {
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.user-summary {
  text-align: center;
  font-size: 20px;
  background-color: powderblue;
  border-radius: 5px;
  padding-left: 17px;
  padding-right: 17px;
  padding-top: 30px;
  padding-bottom: 30px;
}

.stats-box {
  text-align: center;
  font-size: 25px;
  background-color:skyblue;
  border-radius: 0px;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: bold;
}

.plant-info {
  text-align: left;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 30px;
  font-size: 30px;
  text-align: center;
}
</style>