<template>
  <div class="row" v-if="signedIn">
    <div class="map" v-if="inTrip">
      <GoogleMap/>
      <button id="button1" type="button" class="buttonClass" v-on:click="finishTrip">Complete Trip</button>
      <button id="button2" class="buttonClass" v-on:click="cancelTrip">Cancel Trip</button>
    </div>
    <div class="map-2" v-else>
      <div class="trip-msgbox">
        <a class="notrip-msg">You currently don't have upcoming trips.
          <br> Go Plan page and start planning your next trip! 
        </a> 
      </div>
    </div>
    <!--QR Code Pop-up-->
    <div id = "qrCodeBox">
      <div id = "popUpContent">
        <p class="close" v-on:click="closeQrCodeBox">Close this Page</p>
        <h1><b>Scan the QR code below to make payment! </b></h1>
        <img :src="qrCode" /> <br>
      </div>
    </div>

    <div class="userProfile">
      <div class="welcome-msg">Welcome Back, {{this.name}}! </div>
      <img :src="profilePicture">
      <div class="summary-box">
        <div class="user-summary">
          <a>You have travelled a total distance of ... </a> <br> <br>
          <div class="stats-box">
            <a>{{totalDistance.toFixed(2)}} km</a>
          </div> <br>
          <a>... by using public transport instead of private transport!</a> <br> <br>
          <a><b>Well Done!</b></a>
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
import qrCode from "../assets/qr_code.png";

export default { 
  components: {
    GoogleMap,
    PlantProgress,
    SignIn,
  },
  
  data() {
    return {
      name: "",
      signedIn: false,
      inTrip: false,
      qrCode: qrCode,
      profilePicture: "",
      currentDistance: 0,
      journeyDistance: [],
      journeyTime: [],
      totalDistance: 0,
      haveProfilePicture: false,
    };
  },

  methods: {
    fetchUserData: function(){
      if(localStorage.uid != null){
        database.collection('users').doc(localStorage.uid).get().then(doc => {
          this.name = doc.data().name;
          this.haveProfilePicture = doc.data().haveProfilePicture;
          this.currentDistance = doc.data().currentDistance;
          this.signedIn = true;
          this.journeyDistance = doc.data().journeyDistance;
          console.log(1);
          for (var i = 0; i < this.journeyDistance.length; i++) {
            this.totalDistance += this.journeyDistance[i];
          }
          console.log(2);
          this.journeyTime = doc.data().journeyTime;
          console.log(this.currentDistance);
          if(doc.data().start != ""){
            this.inTrip=true;
          }
        }).then(() => {
          if (this.haveProfilePicture) {
            var storageRef = firebase.storage().ref('/profilePicture/' + localStorage.uid);
            storageRef.getDownloadURL().then((url) => {
              this.profilePicture = url;
            })
          } else {
            storageRef = firebase.storage().ref('/profilePicture/default_user_pic.png');
            storageRef.getDownloadURL().then((url) => {
              this.profilePicture = url;
            })
          }
        })
      }
    },

    // Change how ppLevel is increased
    finishTrip: function(){
      const increaseBy7 = firebase.firestore.FieldValue.increment(7);
      database.collection('users').doc(localStorage.uid).update({
        start: "", //after payment, reset the start and end states to empty strings
        end: "", 
        ppLevel: increaseBy7,
      })
      this.inTrip =false;

      // Generate QR Code
      var modal = document.getElementById("qrCodeBox");
      modal.style.display = "block";

      // Update arrays
      this.journeyDistance.push(this.currentDistance);
      this.journeyTime.push(firebase.firestore.Timestamp.fromDate(new Date()));

      // To add: Time + Distance
      database.collection('users').doc(localStorage.uid).update({
        journeyDistance: this.journeyDistance,
        journeyTime: this.journeyTime,
      })
    },    
    closeQrCodeBox: function() {
      var modal = document.getElementById("qrCodeBox");
      modal.style.display = "none";
      location.reload();
    },
    cancelTrip: function() {
      this.inTrip = false;
      database.collection('users').doc(localStorage.uid).update({
        start: "",
        end: "",
      }).then(() => {
        alert("You have successfully cancelled your trip!");
        location.reload();
      })
    }
  },
  created() {
    this.fetchUserData();
  }
}
</script>
<style scoped>
#qrCodeBox {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
}
#popUpContent {
    background-color: white;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid black;
    width: 80%;
}

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
  height: 620px;
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
  height: 640px;
  vertical-align: middle;
  display: table-cell;
  padding-left: 50px;
  padding-right: 50px;
}

.notrip-msg {
  font-size: 25px;
  font-weight: bold;
  color: black;
  vertical-align: middle;
}

.userProfile {
  float: left;
  width: 32%;
  margin-left: 4%;
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

button {
  display: inline-block;
}

#button1 {
  margin-right: 15px;
}

.buttonClass {
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