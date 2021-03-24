<template>
  <div id="app">
    <header>
      <h1> SGTravelBuddy </h1>
        <nav> 
          <ul> 
            <li> Home </li>
            <li> Profile </li>
            <li> Plan </li>
            <li> PlantPal </li>
            <li> How To Use </li>
          </ul>
        </nav>
    </header>
    <div id="content">
      hehehehehehehe
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>

header {
  padding: 10px;
}

ul {
  display: flex;
  flex-wrap: none;
  list-style-type: none;
  padding: 0px;
}

li {
  flex-grow: 1;
  flex-basis: 200px;
  text-align: center;
  padding: 0px;
  border: none;
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: rgb(159, 227, 159);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #02305e;
  margin-top: 0px;
  border: none;
}

#content {
  float: center;
  padding: 60px;
  width: 91.5%;
  background-color: rgb(171, 249, 207);
  height: 500px; 
  border: none;
}
</style>
