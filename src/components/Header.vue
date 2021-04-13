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
    
    <!--
    <div>
    <nav id="topnav"> 
          <ul> 
            <li><a><router-link to="/" exact>Home</router-link></a></li>
            <li><a><router-link to="/profile" exact>Profile</router-link></a></li>
            <li><a><router-link to="/plan" exact>Plan</router-link></a></li>
            <li><a><router-link to="/plantpal" exact>PlantPal</router-link></a></li>
            <li><a><router-link to="/howtouse" exact>How To Use</router-link></a></li>
            <a v-if="signedIn" class="login">
              <li style="float:right"><a href="#" v-on:click = "logOut">LogOut</a></li>
            </a>

            <a v-else class="login">
              <li style="float:right"><router-link to="/login" exact>Log In</router-link></li>
              <li style="float:right"><router-link to="/signUp" exact>Sign Up</router-link></li>
            </a>
          </ul>
    </nav></div>
</div>
            <div v-if="signedIn" class="login">
                <ul>
                    <li><router-link to="/profile" exact>Profile</router-link></li>
                    <li><a href="#" v-on:click = "logOut">LogOut</a></li>
                </ul>
            </div>

            <div v-else class="login">
                <ul>
                    <li><router-link to="/login" exact>Log In</router-link></li>
                    <li><router-link to="/signUp" exact>Sign Up</router-link></li>
                </ul>
            </div>
-->
</template>

<script>
import firebase from "@firebase/app";
require('firebase/auth');
import logo from "../assets/logo.jpg";
import NavBar from './NavBar.vue';

export default {
    data(){
        return{
            signedIn: firebase.auth().currentUser,
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
        console.log('check');
        console.log(firebase.auth().currentUser);
    },
};
</script>


<style scoped>
router-link {
    text-decoration: none;
}
img {
    width: 150px;
    height: 150px;
}
.topHeader {
    text-align: center;
    font-family: Monaco;
    font-size: 45px;
    font-style: bold;
}
.app-logo {
    width: 100%;
    text-align: center;
}

.topnav {
  background-color: black;
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

.login {
    display: flex;
    margin-right: 0px;
    height: 50%;
    justify-content: space-evenly;
    text-decoration: none;
}
.login ul li a{
    display: flex;
    padding: 35px 20px;
    font-size: 12px;
    font-weight: bold;
    line-height: 48px;
    font-family: "Monaco";
    float: left;
    text-decoration: none;
}
</style>