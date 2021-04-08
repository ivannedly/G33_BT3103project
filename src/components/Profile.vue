<template>
  <div>
    <UserInformation id="userInformation"></UserInformation>
    <UserStatistics id="userStatistics"></UserStatistics>
    <GoogleMap/> 
  </div>
</template>

<script>
import UserInformation from './UserInformation.vue'
import UserStatistics from './UserStatistics.vue'
import GoogleMap from './GoogleMap.vue'

export default ({
  data() {
    
  },
  components: {
    UserInformation,
    UserStatistics,
    GoogleMap
  }
})
</script>

<!--
<style scoped>

div {
    padding-top: 100px;
}

#userInformation {
  float: left;
  padding-left: 200px;
}

#userStatistics {
  float: right;
  padding-right: 250px;
  background-color: #CFD171;
  border-radius: 15px;
}

</style>
-->
