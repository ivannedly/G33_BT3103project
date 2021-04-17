<template>
  <div class="signup-page">
    <h2>REGISTER</h2>
    <div class="form">
      <form class = "signup-form">
        <div>Email:</div>
        <input type="text" v-model="email" placeholder="Email"/>
        <div>Username:</div>
        <input type="text" v-model="name" placeholder="Name"/>
        <div>Mobile Number:</div>
        <input type="tel" v-model="phone" placeholder="Mobile Number"/>
        <div>Password:</div>
        <input type="password" v-model="password" placeholder="Password"/>
        <div>Cardholder Name:</div>
        <input type="text" v-model="cardholder" placeholder="Cardholder Name"/>
        <div>Credit Card Number:</div>
        <input type="string" v-model="creditNum" placeholder="Credit Card Number"/>
        <div>CSV:</div>
        <input type="string" v-model="csv" placeholder="CSV"/>
        <div>Card Expiry date:</div>
        <input type="date" v-model="expiry" placeholder="Expiry Date"/><br><br>
        <button v-on:click.prevent = "signUp">Sign Up</button>
        <p class="message">Already have an account? Click <router-link to="/login" exact>here</router-link> to log in.</p>
      </form>
    </div>
  </div>
</template>

<script>
import database from '../firebase.js';
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
        start: "", 
        end: "",
        ppLevel: 0,
        noOfJourneys: 0,
        journeyDistance: [],
        journeyTime: [],
      }
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(cred =>{
        database.collection("users")
                .doc(cred.user.uid)
                .set(Object.assign({}, new_user));
      }).then(() => {
        this.$router.push({path: "/login"});
      })
    }
  }
}
</script>

<style scoped>
h2 {
  color: green;
}
</style>