<template>
  <div class="signin-page">
    <header>Login</header>
    <div class="form">
      <form class = "signin-form">
          <div>Email:</div>
          <input type="text" v-model="email" placeholder="Email"/>
          <div>Password:</div>
          <input type="password" v-model="password" placeholder="Password"/>
          <button v-on:click.prevent = "signIn">Login</button>
          <p class="message">Not register yet?  <router-link to="/signup" exact>Sign Up</router-link></p>
          <p class="message">Forgot your password?  <router-link to="/changePw" exact>Reset Password</router-link></p>
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
    }
  },
  methods:{
    signIn: function(){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) =>{
          var currUser = user.user;
          localStorage.uid = currUser.uid;
          console.log(localStorage.uid)
          alert("You are now successfully logged in as " + currUser.email);
      }).then(() => {
        this.$router.push('/');
        location.reload();
      });
    }
  },
}
</script>

<style scoped>
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
</style>