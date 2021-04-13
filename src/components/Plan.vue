<template>
  <div>
    <b>Start:</b>
    <GmapAutocomplete @place_changed = 'setPlace'> 
    </GmapAutocomplete>
    
    <b>End:</b>
    <GmapAutocomplete @place_changed = 'setDestination'>
    </GmapAutocomplete>
    <br>
    <div>
    <button v-on:click = "planTravel"> Plan </button>
    </div>
    <br>
    <GmapMap :zoom="12" :center="{ lat: 1.364917, lng: 103.822872 }">
      <DirectionsRenderer travelMode="TRANSIT" :origin="start" :destination="end">
        </DirectionsRenderer>
    </GmapMap>
  </div>
</template>

<script>

import firebase from '@firebase/app';
require('firebase/auth');
import database from '../firebase.js';
import DirectionsRenderer from './DirectionsRenderer.js'

export default {
  components: {
    DirectionsRenderer
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
      var user = firebase.auth().currentUser.uid;
      const increaseBy = firebase.firestore.FieldValue.increment(4);
      database.collection('users').doc(user).update({
        start: this.start,
        end: this.end,
        ppLevel: increaseBy
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