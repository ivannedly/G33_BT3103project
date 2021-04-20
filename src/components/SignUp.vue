<template>
  <div class="signup-page">
    <h2>REGISTER</h2>
    <div class="form">
      <form class = "signup-form">
        <h3>PERSONAL INFORMATION</h3>
        <div>Email*:</div>
        <input type="text" v-model="email" placeholder="Email"/>
        <div>Username*:</div>
        <input type="text" v-model="name" placeholder="Name"/>
        <div>Mobile Number:</div>
        <input type="tel" v-model="phone" placeholder="E.g. 9123 4567"/>
        <div>Password*:</div>
        <input type="password" v-model="password" placeholder="Password"/>
        <br><h3>CARD DETAILS</h3>
        <div>Cardholder Name*:</div>
        <input type="text" v-model="cardholder" placeholder="Cardholder Name"/>
        <div>Credit Card Number*:</div>
        <input type="string" v-model="creditNum" placeholder="E.g. 1234-1234-1234-1234"/>
        <div>CVV*:</div>
        <input type="string" v-model="cvv" placeholder="E.g. 333"/>
        <div>Card Expiry date*:</div>
        <input type="date" v-model="expiry" placeholder="Expiry Date"/><br>
        <p style="color: red;">{{alertMessage}}</p>
        <button v-on:click.prevent = "signUp">Sign Up</button>
        <br><p>* indicates required fields.</p><br>
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
      var currentTime = new Date();
      var enteredExpiryDate = new Date(this.expiry);
      if (this.email.length == 0 || this.name.length == 0 || this.password.length == 0 || this.cardholder.length==0 || this.creditNum.length==0 || this.cvv.length==0 || this.expiry==0) {
        this.alertMessage = "You have not filled in one or more of the required fields. Please try again.";
      } else if (enteredExpiryDate.getTime() <= currentTime.getTime() || this.creditNum.length != 19 || this.cvv.length != 3) {
        this.alertMessage = "The card detail(s) that you have provided is/are invalid.";
      } else {
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
          journeyDistance: [],
          journeyTime: [],
          haveProfilePicture: false,
        }
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(cred =>{
          database.collection("users")
                  .doc(cred.user.uid)
                  .set(Object.assign({}, new_user));
          var currUser = firebase.auth().currentUser;
          currUser.sendEmailVerification().then(function() {
          })
          alert("A verification email has been sent to your email, verify your email address now!");
        }).then(() => {
          alert("You have successfully created a new account!");
          this.$router.push({path: "/login"});
        }).catch((error) => {
          this.alertMessage = error.message;
        })
      }
    },
  }
}
</script>

<style scoped>
h2 {
  color: green;
}
div{
  padding-top: 10px;
}
</style>