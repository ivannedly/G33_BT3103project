<template>
  <div>
    <div>
      <h2>Your Location</h2>
      <GmapAutocomplete @place_changed='setPlace'> </GmapAutocomplete>
      <button v-on:click='addMarker'> Add </button>
    </div>
    <br>
    <GmapMap
      :center='center' 
      :zoom='12'
      style='width:100%;  height: 400px;'
      >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      >
      </GmapMarker>
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  data() {
    return {
      center: { lat: 1.364917, lng: 103.822872 },
      currentPlace: null,
      markers: [],
      places: []
    }
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    initMap: function() {
      const directionsRenderer = new google.maps.DirectionsRenderer();
      const directionsService = new google.maps.DirectionsService();
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 41.85, lng: -87.65 },
      });
      directionsRenderer.setMap(map);
      directionsRenderer.setPanel(document.getElementById("right-panel"));
      const control = document.getElementById("floating-panel");
      control.style.display = "block";
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

      const onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
      };
      document.getElementById("start").addEventListener("change", onChangeHandler);
      document.getElementById("end").addEventListener("change", onChangeHandler);
    },
    calculateAndDisplayRoute: function(directionsService, directionsRenderer) {
      const start = document.getElementById("start").value;
      const end = document.getElementById("end").value;
      directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
      );
    }
  },
};
</script>