<template>
<div>
    <div class="reward-title">Rewards</div><br>

    <div class="whole-list">

        <div v-if="reward1">
            <div class="reward-reach">
                <a>$3 off next train/bus ride!</a>
            </div>
        </div>
        <div v-else>
            <div class="reward-list">
                <a>$3 off next train/bus ride!</a>
            </div>
            <a style="float:right">Reach Level 10 to lock reward!</a>
        </div>
        <br>

        <div v-if="reward2">
            <div class="reward-reach">
                <a>$5 off next train/bus ride!</a>
            </div>
        </div>
        <div v-else>
            <div class="reward-list">
                <a>$5 off next train/bus ride!</a>
            </div>
            <a style="float:right">Reach Level 20 to lock reward!</a>
        </div>
        <br>

        <div v-if="reward3">
            <div class="reward-reach">
                <a>$10 cashback!</a>
            </div>
        </div>
        <div v-else>
            <div class="reward-list">
                <a>$10 cashback!</a>
            </div>
            <a style="float:right">Reach Level 30 to lock reward!</a>
        </div>
        <br>

        <div v-if="reward4">
            <div class="reward-reach">
                <a>$15 cashback!</a>
            </div>
        </div>
        <div v-else>
            <div class="reward-list">
                <a>$15 cashback!</a>
            </div>
            <a style="float:right">Reach Level 40 to lock reward!</a>
        </div>
        <br>

    </div>
</div>
</template>

<script>
import database from "../firebase.js"

export default {
    data() {
        return {
            reward1: false,
            reward2: false,
            reward3: false,
            reward4: false,
            rewardLevel: 0,
        }
    },

    methods: {
    fetchPlantInfo:function() {
      database.collection('users').doc(localStorage.uid).get().then(doc => {
          this.rewardLevel = Math.floor(doc.data().ppLevel/20);
          if(this.rewardLevel < 20 && this.rewardLevel >= 10){
            this.reward1 = true;
            console.log(this.rewardLevel);
            console.log(this.reward1);
          }else if(this.rewardLevel < 30 && this.rewardLevel >= 20){
                this.reward1 = true;
                this.reward2 = true;
          }else if(this.rewardLevel < 40 && this.rewardLevel >= 30){
                this.reward1 = true;
                this.reward2 = true;
                this.reward3 = true;
          }else{
              this.reward1 = true;
              this.reward2 = true;
              this.reward3 = true;
              this.reward4 = true;
          }
      });
    },
  },

  created() {
    this.fetchPlantInfo();
    console.log("1");
  }
}
</script>

<style scoped>
.reward-title {
    text-align: center;
    font-size: 40px;
    padding-top: 20px;
}
.whole-list {
    position:relative;
    padding-left: 50px;
    padding-right: 50px;
}
.reward-list {
    border: 1px solid black;
    border-radius: 2px;
    text-align: center;
    font-size: 18px;
    vertical-align: center;
    color: grey;
    background-color:aliceblue;
    height: 40px;
}
.reward-reach {
    border: 3px solid black;
    border-radius: 2px;
    text-align: center;
    font-size: 22px;
    vertical-align: center;
    color: black;
    background-color:aliceblue;
    height: 40px;
    text-shadow: 0.5px 0.5px black;
}
</style>