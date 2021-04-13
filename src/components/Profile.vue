<template>
  <div>
    <UserInformation id="userInformation"></UserInformation>
    <UserStatistics id="userStatistics"></UserStatistics>
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
#userInformation {
  float: left;
  width: 30%;
  height: 100%;
}

#userStatistics {
  float: right;
  width: 60%;
  background-color: #CFD171;
  border-radius: 15px;
  height: 100%
}

</style>
