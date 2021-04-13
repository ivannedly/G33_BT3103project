<template>
  <div>
    <GmapMap :zoom="12" :center="{ lat: 1.364917, lng: 103.822872 }">
      <DirectionsRenderer travelMode="TRANSIT" :origin="start" :destination="end">
        </DirectionsRenderer>
    </GmapMap>
    <br>
  </div>
</template>

<script>

import DirectionsRenderer from "./DirectionsRenderer.js";
import database from '../firebase.js'
import firebase from '@firebase/app'
require('firebase/auth');


export default {
  components: {
    DirectionsRenderer,
  },

  data: function() {
    return {
      start: "",
      end: "",
      name: ""
    }
  },

  methods: { 
    fetchItems: function() {
      var user = firebase.auth().currentUser.uid;
      database.collection('users').doc(user).get().then(doc => {
      this.start = doc.data().start;
      this.end = doc.data().end;
      this.name = doc.data().name;
      });
    }
  },

  created() {
    this.fetchItems();
    console.log(firebase.auth().currentUser.uid);
    console.log("hello")
  }
}
</script>

<style>
.vue-map-container {
  height: 600px;
  position:relative

}
</style>