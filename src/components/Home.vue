<template>
<div class="row">
  <div class="map">
    <GoogleMap/>
  </div>
  <div class="userProfile">
    <a>temp profile</a>
  </div>
  <div class="plantInfo">
    <a> temp plant info</a>
  </div>
</div>
</template>

<script>
import GoogleMap from './GoogleMap.vue'


export default { 
  components: {
    GoogleMap
  },
  
  data() {
    return {
      user: ""
    };
  }
}
</script>
<style scoped>
.map {
  float: left;
  width: 33%;
}
.userProfile {
  float: left;
  width: 32%;
  background-color:mintcream;
  border-radius: 10px;
  height: 600px;
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
</style>