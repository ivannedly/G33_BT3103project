<template>
  <header>
    <div>
      <a class="app-logo">
        <img :src="logo"/>   
      </a>
      <div class="topHeader">SGTravel Buddy</div>
      <NavBar></NavBar>
    </div>
  </header>
</template>

<script>
import firebase from "@firebase/app";
require('firebase/auth');
import logo from "../assets/logo.jpg";
import NavBar from './NavBar.vue';

export default {
  data(){
    return{
      signedIn: false,
      currentUser: false,
      logo: logo,
    }
  },
    
  components: {
    NavBar,
  },
  
  methods: {
    logOut: function() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/login')
      })
    },
    
    loginCheck: function() {
      if(firebase.auth().currentUser != null) {
        console.log(this.signedIn)
        this.signedIn = true;
        this.currentUser = firebase.auth().currentUser;
      }
    },
  },
  
  created() {
    this.loginCheck();
  },
};
</script>


<style scoped>
img {
  padding-top: 10px;
  width: 150px;
  height: 150px;
}

.topHeader {
  text-align: center;
  font-size: 45px;
  font-weight: bold;
  color: black;
}

.app-logo {
  padding-top: 10px;
  width: 100%;
  text-align: center;
}

</style>