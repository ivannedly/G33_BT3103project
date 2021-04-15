<template>
<div class="row" v-if="signedIn">
  <div class="map">
    <GoogleMap/>
  </div>
  <div class="userProfile">
    <div class="welcome-msg">Welcome Back {{this.name}}!</div>
    <!-- temp profile photo to demonstrate the layout
      -->
    <img src = "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8dHJlZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt = "Photo of Tree">
    <div class="summary-box">
      <div class="user-summary">
        <a>You have saved...</a><br><br>
        <div class="stats-box">
          <a>{{this.carbonSaved}}kg of CO2</a>
        </div><br>
        <a>for taking a train or bus instead of a car.</a><br><br>
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
    };
  },

  methods: {
    fetchUserName: function(){
      if(localStorage.uid != null){
        database.collection('users').doc(localStorage.uid).get().then(doc => {
          this.name = doc.data().name;
          this.carbonSaved = doc.data().carbonCut;
          this.signedIn = true;
        })
      }
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
}
.userProfile {
  float: left;
  width: 32%;
  padding-left: 60px;
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