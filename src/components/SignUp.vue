<template>
  <div class="signup-page">
    <header>Register</header>
    <div class="form">
      <form class = "signup-form">
        <div>Email:</div>
        <input type="text" v-model="email" placeholder="Email"/>
        <div>Name:</div>
        <input type="text" v-model="name" placeholder="Name"/>
        <div>Mobile Number:</div>
        <input type="tel" v-model="phone" placeholder="Mobile Number"/>
        <div>Password:</div>
        <input type="password" v-model="password" placeholder="Password"/>
        <div>Cardholder Name:</div>
        <input type="text" v-model="cardholder" placeholder="CardHolder Name"/>
        <div>Credit Card Number:</div>
        <input type="number" v-model="creditNum" placeholder="Credit Card Number"/>
        <div>CSV:</div>
        <input type="number" v-model="csv" placeholder="CSV"/>
        <div>Expiry date:</div>
        <input type="text" v-model="expiry" placeholder="Expiry Date"/><br><br>
        <button v-on:click.prevent = "signUp">Sign Up</button>
        <p class="message">Already have an account?  <router-link to="/login" exact>Login</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import db from '../firebase.js';
import firebase from '@firebase/app';
require('firebase/auth');
export default {
  data() {
    return {
      email: "",
      name: "",
      password: "",
      phone: "",
      cardholder: "",
      creditNum: "",
      csv: "",
      expiry: "",
    }
  },
  methods:{
    signUp: function(){
      const new_user = {
        email: this.email,
        name: this.name,
        mobile: this.phone,
        cardholder: this.cardholder,
        creditNum: this.creditNum,
        csv: this.csv,
        expiry: this.expiry,
        travelNum: 0, 
        distance: 0, 
        carbonCut: 0, 
        moneySave: 0, 
        start: "singapore", 
        end: "singapore" 
      }
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(cred =>{
        db.collection("users").doc(cred.user.uid).set(
          Object.assign({}, new_user)
        )
        this.$router.push({path:"/"})
        this.$parent.forceRerender();
      })
    }
  }
}
</script>

<style>
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