<template>
<div class="row" v-if="signedIn">
  <div class="map">
    <GoogleMap/>
  </div>
  <div class="userProfile">
    <div class="welcome-msg">Welcome Back {{this.name}}!</div>
    <UserInfo></Userinfo>
    <p class="message"><router-link to="/profile" exact>More in Profile</router-link></p>
  </div>
  <div class="plantInfo">
    <div class="plant-info">You are currently at: </div>
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
import UserInfo from './UserInformation.vue';
import SignIn from './SignIn.vue'

export default { 
  components: {
    GoogleMap,
    PlantProgress,
    UserInfo,
    SignIn,
  },
  
  data() {
    return {
      name: "",
      signedIn: false,
    };
  },

  methods: {
    fetchUserName: function(){
      if(localStorage.uid != null){
        database.collection('users').doc(localStorage.uid).get().then(doc => {
          this.name = doc.data().name;
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
.map {
  float: left;
  width: 33%;
  border-radius: 10px;
}
.userProfile {
  float: left;
  width: 32%;
  background-color:mintcream;
  border-radius: 10px;
  padding-left: 10px;
}
.plantInfo {
  float: right;
  width: 29%;
  background-color:moccasin;
  border-radius: 10px;
  height: 600px;
  padding: 5px;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}

.welcome-msg {
  padding-top: 50px;
  text-align: center;
  padding-bottom: 30px;
}
.plant-info {
  text-align: left;
  padding-top: 50px;
  padding-left: 20px;
  padding-bottom: 30px;
}
</style>