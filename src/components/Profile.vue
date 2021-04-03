<template>
  <div>
    <UserInformation></UserInformation>
    <UserStatistics></UserStatistics>
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
