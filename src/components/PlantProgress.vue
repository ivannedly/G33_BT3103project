<template>
<vue-ellipse-progress 
  :progress="getCurrentLevel()"
  :legend= true
  :legendValue= this.currentLevel%7>
  
  <span slot="legend-value">/20</span>
  <p slot="legend-caption">Level {{Math.floor(this.currentLevel / 20)}}</p>
</vue-ellipse-progress>
</template>

<script>
import database from "../firebase.js"
import firebase from '@firebase/app'

export default {
  data: function() {
    return {
      currentLevel: 0
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