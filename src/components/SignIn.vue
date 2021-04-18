<template>
  <div class="signin-page">
    <h2>LOGIN</h2>
    <div class="form">
      <form class = "signin-form">
        <div>Email:</div>
        <input type="text" v-model="email" placeholder="Email"/>
        <div>Password:</div>
        <input type="password" v-model="password" placeholder="Password"/>
        <p style="color: red;">{{alertMessage}}</p>
        <button v-on:click.prevent = "signIn">Login</button>
        <p class="message">Not registered yet? Click  
          <router-link to="/signup" exact>here</router-link>
          to sign up.
        </p>
        <p class="message">Forgot your password? Click 
          <router-link to="/changePw" exact>here</router-link>
          to reset your password.
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from '@firebase/app';
require('firebase/auth');

export default {
  data() {
    return {
      email: "",
      password: "",
      alertMessage: "",
    }
  },
  methods:{
    signIn: function(){
      if (this.email.length == 0 || this.password.length == 0) {
        this.alertMessage = "You have not entered your email and/or your password.";
      } else {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) =>{
          var currUser = user.user;
          localStorage.uid = currUser.uid;
          console.log(localStorage.uid)
          alert("You are now successfully logged in as " + currUser.email);
        }).then(() => {
          this.$router.push('/');
          location.reload();
        }).catch((error) => {
          this.alertMessage = error.message;
          if (error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
            this.alertMessage = "The email you have provided is invalid.";
          } else if (error.message == "The password is invalid or the user does not have a password.") {
            this.alertMessage = "The password you have entered is invalid for the email you have provided.";
          } else {
            this.alertMessage = error.message;
          }
        })
      }
    }
  },
}
</script>

<style scoped>
h2 {
  color: green;
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
</style>