<template>
  <div>
    <vue-ellipse-progress 
      :progress="currentLevel"
      :legend= true
      :legendValue= this.currentLevel%3>
      <span slot="legend-value">/20</span>
      <p slot="legend-caption">Level {{ Math.floor(this.currentLevel/20) }}</p>
    </vue-ellipse-progress>
    <br>
    <div>
      <h v-if="Math.floor(this.currentLevel/20) < 10"> <img :src="seeds" class="seed"/> </h>
      <h v-else-if="Math.floor(this.currentLevel/20) < 20"> <img :src="sprout" class="sprout"/> </h>
      <h v-else-if="Math.floor(this.currentLevel/20) < 30"> <img :src="plant" class ="plant"/> </h>
      <h v-else> <img :src="tree" class="tree"/> </h>
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
      tree: tree 
    }
  },

  methods: {
    fetchItems:function() {
      database.collection('users').doc(localStorage.uid).get().then(doc => {
      this.currentLevel = doc.data().ppLevel;
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
    width: 2%;
    padding: 100px;
    margin-left: auto;
    margin-right: auto;
  }

  .sprout {
    width: 5%;
    padding: 100px;
    margin-left: auto;
    margin-right: auto;
  }

  .plant {
    width: 8%;
    padding: 100px;
    margin-left: auto;
    margin-right: auto;
  }

  .tree {
    width: 20%;
    padding: 100px;
    margin-left: auto;
    margin-right: auto;  
  }

</style>