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
    <br>
    <button v-on:click = "planTravel(); getDistance()"> Plan </button>
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
      startcoords: {lat: 0, lng: 0},
      end: "",
      endcoords: {lat: 0, lng: 0},
      uid: "",
      distance: 0
    }
  },
  
  methods: {

    setPlace: function(place) {
      this.start = place.name;
      this.startcoords.lat = place.geometry.location.lat();
      this.startcoords.lng = place.geometry.location.lng();
    },

    setDestination: function(place) {
      this.end = place.name;
      this.endcoords.lat = place.geometry.location.lat();
      this.endcoords.lng = place.geometry.location.lng();
      console.log(this.endcoords.lng)
    },

    getDistance: function() {
      const earthRadius = 12742;
      const mathPi = 0.017453292519943295; // (Math.PI / 180) for converting to radians
      const cos = Math.cos; // Cos function
      const distanceFactor = 0.5 - cos((this.endcoords.lat - this.startcoords.lat) * mathPi)/2 +
        cos(this.startcoords.lat * mathPi) * cos(this.endcoords.lat * mathPi) *
        (1 - cos((this.endcoords.lng - this.startcoords.lng) * mathPi))/2;
      this.distance = parseFloat(Number(earthRadius * Math.asin(Math.sqrt(distanceFactor))).toFixed(1));
      localStorage.distance = this.distance  
      console.log(localStorage.distance)
    },

    planTravel: function() {
      this.uid = firebase.auth().currentUser.uid;
      const increaseBy2 = firebase.firestore.FieldValue.increment(2);
      database.collection('users').doc(this.uid).update({
        start: this.start,
        end: this.end,
        ppLevel: increaseBy2,
        planTime: firebase.firestore.Timestamp.fromDate(new Date())
      })
      console.log("Trip planned")
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