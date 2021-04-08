<template>
  <div>
    <b>Start:</b>
    <GmapAutocomplete @place_changed = 'setPlace'> 
    </GmapAutocomplete>
    
    <b>End:</b>
    <GmapAutocomplete @place_changed = 'setDestination'>
    </GmapAutocomplete>
    <br>
    <button v-on:click = "planTravel"> Plan </button>
    <br>
    <GoogleMap/>
  </div>
</template>

<script>

import firebase from '@firebase/app';
require('firebase/auth');
import database from '../firebase.js';
import GoogleMap from './GoogleMap.vue'

export default {
  components: {
    
    GoogleMap
  },

  data: function() {
    return {
      start: "",
      end: ""
    }
  },
  
  methods: {

    setPlace: function(place) {
      this.start = place.name;
    },

    setDestination: function(place) {
      this.end = place.name;
    },

    planTravel: function() {
      var user = firebase.auth().currentUser.uid
      database.collection('users').doc(user).update({
        start: this.start,
        end: this.end
      })
    }
  }
}
</script>

<style>
.vue-map-container {
  height: 600px;
  position:relative

}
</style>