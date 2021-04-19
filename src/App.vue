<template>
  <div id="app">
    <Header></Header>

    <div id="content">
      <br>
      <router-view></router-view>
    </div>
    
    <div id="footer">
    <Footer></Footer>
    </div>

    <div id="bottom">
    </div>
 </div>

</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'


export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color:rgb(125, 194, 156);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #02305e;
  margin-top: 0px;
  border: none;
}

#content {
  float: bottom;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 40px;
  padding-bottom: 20px;
  background-color: white;
  border: none;
  min-height: 650px;
}

#footer { 
  background-color: rgb(125, 194, 156);
  height: 160px;
  padding: 10px;
  border: none;
}
#bottom {
  background-color: seagreen;
  height: 30px;
  border: none;
  padding: 10px;
}
</style>
