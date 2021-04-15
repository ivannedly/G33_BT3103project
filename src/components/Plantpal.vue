<template>
<div class="row">
  
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
</template>

<script>

import PlantProgress from './PlantProgress.vue';


export default { 
  components: {
    PlantProgress,
    //UserInfo,
  },
  
}
</script>
<style scoped>

.userProfile {
  float: left;
  width: 32%;
  background-color:moccasin;
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
