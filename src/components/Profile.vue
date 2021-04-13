<template>
<<<<<<< HEAD
  <div>
    <UserInformation id="userInformation"></UserInformation>
    <UserStatistics id="userStatistics"></UserStatistics>
=======
  <div class="row">
    <div class='left'>
    <UserInformation id="userInformation"></UserInformation></div>
    <div class="right">
    <UserStatistics id="userStatistics"></UserStatistics></div>
>>>>>>> 9debfada622617346b34b269e43c55025edbd023
  </div>
</template>

<script>
import UserInformation from './UserInformation.vue'
import UserStatistics from './UserStatistics.vue'

export default ({
  data() {
    
  },
  components: {
    UserInformation,
    UserStatistics,
  }
})
</script>

<style scoped>
.left {
  float: left;
  width: 30%;
  
}
.right{
    float: left;
    width: 68%;
    padding-left: 20px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

#userStatistics {
  background-color: #CFD171;
  border-radius: 15px;
  height: 100%
}

</style>
<<<<<<< HEAD

=======
>>>>>>> 9debfada622617346b34b269e43c55025edbd023
