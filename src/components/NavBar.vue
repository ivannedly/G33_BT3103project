<template>
<div>
    <nav> 
          <ul> 
            <li><a><router-link to="/" exact>Home</router-link></a></li>
            <li><a><router-link to="/profile" exact>Profile</router-link></a></li>
            <li><a><router-link to="/plan" exact>Plan</router-link></a></li>
            <li><a><router-link to="/plantpal" exact>PlantPal</router-link></a></li>
            <li><a><router-link to="/howtouse" exact>How To Use</router-link></a></li>
            <a v-if="signedIn">
              <li style="float:right"><a href="#" v-on:click = "logOut">LogOut</a></li>
            </a>

            <a v-else>
              <li style="float:right"><router-link to="/login" exact>Log In</router-link></li>
              <li style="float:right"><router-link to="/signUp" exact>Sign Up</router-link></li>
            </a>
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
            signedIn: firebase.auth().currentUser,
            currentUser: false,
        }
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
        console.log('check');
        console.log(firebase.auth().currentUser);
    },
};
</script>

<style scoped>
nav {
    overflow: hidden;
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
  display: inline;
  border-right: 1px solid #bbb;
}

li a{
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}
</style>