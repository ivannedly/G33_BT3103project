<template>
  <div>
    <vue-ellipse-progress 
      :progress="getCurrentLevel()"
      :legend= true
      :legendValue= this.currentLevel%7>
      <span slot="legend-value">/20</span>
      <p slot="legend-caption">Level {{Math.floor(this.currentLevel/20)}}</p>
    </vue-ellipse-progress>
    <br>
    <h v-if="Math.floor(this.currentLevel/20) < 10"> <img :src="seeds"/> </h>
    <h v-else-if="Math.floor(this.currentLevel/20) < 20"> <img :src="sprout"/> </h>
    <h v-else-if="Math.floor(this.currentLevel/20) < 30"> <img :src="plant"/> </h>
    <h v-else> <img :src="tree"/> </h>

  </div>

</template>

<script>
import database from "../firebase.js"
import firebase from '@firebase/app'
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
      var user = firebase.auth().currentUser.uid;
      database.collection('users').doc(user).get().then(doc => {
      this.currentLevel = doc.data().ppLevel;
    });
    },

    getCurrentLevel: function() {
      return this.currentLevel
    }
  },

  created() {
    this.fetchItems();
  }
}

</script>