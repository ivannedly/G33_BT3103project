<template>
  <div id="app">
    <GoogleMap />
    <div id = "directions_panel">I am directions panel.</div>
  </div>
</template>

<script>
import GoogleMap from './GoogleMap.vue'

export default {
  name: 'App',
  components: {
    GoogleMap,
  },
  methods: {
  }
}
</script>