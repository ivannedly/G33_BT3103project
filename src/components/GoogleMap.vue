<template>
  <div>
    <b>Start:</b>
    <GmapAutocomplete @place_changed = 'setPlace'>
    </GmapAutocomplete>
    <b>End:</b>
    <GmapAutocomplete @place_changed = 'setDestination'>
    </GmapAutocomplete>
    <GmapMap :zoom="12" :center="{ lat: 1.364917, lng: 103.822872 }">
      <DirectionsRenderer
        travelMode="TRANSIT"
        :origin="origin"
        :destination="destionation"
      />
    </GmapMap>
  </div>
</template>

<script>
import DirectionsRenderer from "@/components/DirectionsRenderer";

export default {
  components: {
    DirectionsRenderer,
  },

  data: () => ({
    start: "",
    end: "",
  }),

  computed: {
    origin() {
      if (!this.start) return null;
      console.log( this.start );
      return { query: this.start };
    },
    destionation() {
      if (!this.end) return null;
      return { query: this.end };
    },
  },

  methods: {
    setPlace: function(place) {
      this.start = place.name
    },

    setDestination: function(place) {
      this.end = place.name
    }
  }
};
</script>

<style>
.vue-map-container {
  height: 600px;
}
</style>