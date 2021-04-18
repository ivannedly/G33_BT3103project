<template>
  <div class="signup-page">
    <h2>REGISTER</h2>
    <div class="form">
      <form class = "signup-form">
        <br><h3>PERSONAL INFORMATION</h3>
        <div>Email:</div>
        <input type="text" v-model="email" placeholder="Email"/>
        <div>Username:</div>
        <input type="text" v-model="name" placeholder="Name"/>
        <div>Mobile Number:</div>
        <input type="tel" v-model="phone" placeholder="E.g. 9123 4567"/>
        <div>Password:</div>
        <input type="password" v-model="password" placeholder="Password"/>
        <br><br><h3>CARD DETAILS</h3>
        <div>Cardholder Name:</div>
        <input type="text" v-model="cardholder" placeholder="Cardholder Name"/>
        <div>Credit Card Number:</div>
        <input type="string" v-model="creditNum" placeholder="E.g. 1234-1234-1234-1234"/>
        <div>CVV:</div>
        <input type="string" v-model="cvv" placeholder="E.g. 333"/>
        <div>Card Expiry date:</div>
        <input type="date" v-model="expiry" placeholder="Expiry Date"/><br><br>
        <p style="color: red;">{{invalidCardMessage}}</p>
        <br><p style="color: red;">{{alertMessage}}</p>
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
      cvv: "",
      expiry: "",
      alertMessage: "",
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
        cvv: this.cvv,
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
      }).catch((error) => {
        this.alertMessage = error.message;
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