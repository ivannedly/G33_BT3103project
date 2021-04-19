<template>
  <div class="row">
    <div class='left'>
    <UserInformation id="userInformation"></UserInformation></div>
    <div class="right">
    <UserStatistics id="userStatistics"></UserStatistics></div>
  </div>
</template>

<script>
import UserInformation from './UserInformation.vue'
import UserStatistics from './UserStatistics.vue'

export default {
  data() {
    return {}
  },
  components: {
    UserInformation,
    UserStatistics,
  }
}
</script>

<style scoped>
.left {
  float: left;
  width: 30%;  
}
.right{
    float: left;
    width: 66%;
    padding-left: 30px;
}
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
