<template>
  <div>
    <vue-ellipse-progress 
      :progress = "newLevel"
      :legend = true
      :legend-value = newLevel
      >
      <span slot="legend-value">/20</span>
      <p slot="legend-caption" v-if="this.currentLevel==0"> Level 0/20</p>
      <p slot="legend-caption" v-else> Level {{ Math.floor(this.currentLevel/20) }} </p>
    </vue-ellipse-progress>
    <div>
      <p v-if="Math.floor(this.currentLevel/20) < 10"> <img :src="seeds" class="seed"/> </p>
      <p v-else-if="Math.floor(this.currentLevel/20) < 20"> <img :src="sprout" class="sprout"/> </p>
      <p v-else-if="Math.floor(this.currentLevel/20) < 30"> <img :src="plant" class ="plant"/> </p>
      <p v-else> <img :src="tree" class="tree"/> </p>
    </div>
  </div>
</template>

<script>
import database from "../firebase.js"
import seeds from "../assets/seeds.jpg"
import sprout from "../assets/sprout.jpg"
import plant from "../assets/plant.jpg"
import tree from "../assets/tree.jpg"

export default {
  data: function() {
    return {
      currentLevel: 0,
      seeds: seeds,
      sprout: sprout,
      plant: plant,
      tree: tree,
      newLevel:0,  
    }
  },

  methods: {
    fetchItems:function() {
      database.collection('users').doc(localStorage.uid).get().then(doc => {
      this.currentLevel = doc.data().ppLevel;
      this.newLevel = this.currentLevel%20;
      });
    }
  },

  created() {
    this.fetchItems();
  }
}
</script>

<style>
  .seed { 
    width: 8%;
    padding: 100px;
    margin-left: auto;
    margin-right: auto;
  }

  .sprout {
    width: 20%;
    padding: 100px;
    margin-left: auto;
    margin-right: auto;
  }

  .plant {
    width: 24%;
    padding: 100px;
    margin-left: auto;
    margin-right: auto;
  }

  .tree {
    width: 50%;
    padding: 45px;
    margin-left: auto;
    margin-right: auto;  
  }
</style>