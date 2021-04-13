import { MapElementFactory } from "vue2-google-maps";

export default MapElementFactory({
  name: "directionsRenderer",
  ctr() {
    return window.google.maps.DirectionsRenderer;
  },
  events: [],
  mappedProps: {},
  props: {
    origin: { type: String },
    destination: { type: String },
    travelMode: { type: String },
  }, 
  afterCreate(directionsRenderer) {
    let directionsService = new window.google.maps.DirectionsService();
    this.$watch(
      () => [this.origin, this.destination, this.travelMode],
      () => {
        let { origin, destination, travelMode } = this;
        directionsService.route(
          { origin, destination, travelMode},
          (response, status) => {
            if (status == "OK") {
            directionsRenderer.setDirections(response);
            }
          }
        );
      }
    );
  }
});