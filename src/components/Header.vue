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
        console.log('check');
        console.log(firebase.auth().currentUser);
    },
};
</script>


<style scoped>
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

</style>