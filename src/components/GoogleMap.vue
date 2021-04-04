<template>
  <div>
    <b>Start:</b>
    <GmapAutocomplete @place_changed = 'setPlace'>
    </GmapAutocomplete>
    
    <b>End:</b>
    <GmapAutocomplete @place_changed = 'setDestination'>
    </GmapAutocomplete>
    
    <GmapMap :zoom="12" :center="{ lat: 1.364917, lng: 103.822872 }">
      <DirectionsRenderer travelMode="TRANSIT" :origin="start" :destination="end">
        </DirectionsRenderer>
    </GmapMap>
    <br>
  </div>
</template>

<script>

import DirectionsRenderer from "./DirectionsRenderer.js";

export default {
  components: {
    DirectionsRenderer,
  },

  data: function() {
    return {
      start: "",
      end: "",
    }
  },
  
  methods: {
    setPlace: function(place) {
      this.start = place.name
    },
    setDestination: function(place) {
      this.end = place.name
    },
  }
};
</script>

<style>
.vue-map-container {
  height: 600px;
  position:relative

}
</style>