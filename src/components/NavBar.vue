<template>
<div>
    <nav> 
          <ul> 
            <div v-if="signedIn">
              <li><a><router-link to="/" exact>Home</router-link></a></li>
              <li><a><router-link to="/profile" exact>Profile</router-link></a></li>
              <li><a><router-link to="/plan" exact>Plan</router-link></a></li>
              <li><a><router-link to="/plantpal" exact>PlantPal</router-link></a></li>
              <li><a><router-link to="/howtouse" exact>How To Use</router-link></a></li>
              <li style="float:right"><a v-on:click = "logOut">LogOut</a></li>
            </div>

            <div v-else>
              <li style="float:right"><a><router-link to="/login" exact>Log In</router-link></a></li>
              <li style="float:right"><a><router-link to="/signUp" exact>Sign Up</router-link></a></li>
            </div>
          </ul>
    </nav>
</div>   
</template>

<script>
import firebase from "@firebase/app";
require('firebase/auth');

export default {
    data(){
        return{
            signedIn: false,
            currentUser: false,
        }
    },
    methods: {
        logOut: function() {
          firebase.auth().signOut().then(() => {
              localStorage.clear();
              alert("You have successfully logged out!")
          }).then(() => {
            this.$router.push('/login');
            location.reload();
          })
        },
        loginCheck: function() {
          if(localStorage.uid != null){
            this.signedIn = true;
            this.currentUser = localStorage.uid;
          }
        },
    },
    created() {
        this.loginCheck();
    },
};
</script>

<style scoped>
nav {
    overflow: hidden;
    position: sticky;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
  border-right: 1px solid #bbb;
}

li a{
  display: block;
  color: white;
  text-align: center;
  text-decoration: none;
  width: 110px;
  height: 40px;
  padding-top: 6px;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}
</style>