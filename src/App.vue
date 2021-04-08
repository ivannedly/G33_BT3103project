<template>
  <div id="app">
      <Header></Header>
        <nav> 
          <ul> 
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/profile" exact>Profile</router-link></li>
            <li><router-link to="/plan" exact>Plan</router-link></li>
            <li><router-link to="/plantpal" exact>PlantPal</router-link></li>
            <li><router-link to="/howtouse" exact>How To Use</router-link></li>
          </ul>
        </nav>
        

    <div id="content">
      <router-view></router-view>
    </div>

    <div id="footer">
      <footer>
        <h3> Contact Us </h3>
        Tel: 6123 2342 <br>
        Email: helpdesk@sgtravelbuddy.com.sg 
      </footer>
      </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
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
  float: bottom;
  padding: 60px;
  background-color: rgb(171, 249, 207);

  border: none;
}

#footer { 
  background-color: rgb(125, 194, 156);
  height: 120px;
  padding: 10px;
  border: none;
}
#map {
  height: 100%;
}
</style>
