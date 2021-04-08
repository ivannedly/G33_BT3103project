<template>
<div>
    <header>
        <nav>
            <div>
                <a class="app-logo">
                   <img :src="logo"/>
                   <h1>SGTravel Buddy</h1>
                </a>
            </div>


            <div v-if="signedIn" class="login">
                <ul>
                    <li><router-link to="/" exact>Home</router-link></li>
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

        </nav>
    </header>
</div>
</template>

<script>
import firebase from "@firebase/app";
require('firebase/auth');
import logo from "../assets/logo.jpg";

export default {
    data(){
        return{
            signedIn: firebase.auth().currentUser,
            currentUser: false,
            logo: logo,
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
router-link {
    text-decoration: none;
}
header {
    padding: 10px;
    height: 50%;
}
img {
    width: 150px;
    height: 150px;
}
.app-logo {
    display: flex;
    margin-left: 50px;
    height: 50%;
    width: 50%;
    float: left;
    text-align: center;
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
    font-size: 18px;
    font-weight: bold;
    line-height: 48px;
    font-family: "Monaco";
    float: left;
    text-decoration: none;
}
</style>