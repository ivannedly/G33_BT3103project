<template>
<div class="row">

  <div class="article">
    <Article></Article>
  </div>

  <div class="plantInfo">
    <div class="plant-info">Plant</div>
    <PlantProgress></PlantProgress>
  </div>

  <div class="rewards">
    <Reward></Reward>
  </div>
</div>
</template>

<script>

import PlantProgress from './PlantProgress.vue';
import Article from './Articles.vue';
import Reward from './Rewards.vue';

export default { 
  components: {
    PlantProgress,
    Article,
    Reward,
  },
  
}
</script>
<style scoped>
.plantInfo {
  float: left;
  width: 33%;
  height: 700px;
  padding-left: 10px;
}
.rewards {
  float: right;
  width: 30%;
  background-color:paleturquoise;
  border-radius: 10px;
  height: 700px;
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
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 30px;
  font-size: 40px;
  text-align: center;
}
</style>