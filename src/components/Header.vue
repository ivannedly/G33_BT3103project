<template>
<div>
    <header>
        <nav>
            <div>
                <a href="#" class="app-logo">
                   <img src="src/assets/logo.jpg"/>
                </a>
            </div>

            <div v-if="signedIn" class="login">
                <ul>
                    <li><router-link to="/" exact>Home</router-link></li>
                    <li><router-link to="/profile" exact>Profile</router-link></li>
                    <li><a href="#" v-on:click = "logOut">LogOut</a></li>
                </ul>
            </div>

            <div v-else>
            <div class="login">
                <ul>
                    <li><router-link to="/login" exact>Log In</router-link></li>
                    <li><router-link to="/signUp" exact>Sign Up</router-link></li>
                </ul>
            </div>
            </div>

        </nav>
    </header>
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
                this.$parent.forceRerender();
            })
        },
        loginCheck: function() {
            if(firebase.auth().currentUser) {
                console.log(this.signedIn)
                this.signedIn = true;
                this.currentUser = firebase.auth().currentUser;
            }
        },
    },
    created() {
        this.loginCheck(); //check whether user is logged in already.
    }
}
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
    height: 100px;
}
.app-logo {
    display: flex;
    margin-left: 50px;
    height: 50%;
    width: 50%;
    float: left;
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