<template>
  <div class="row">
    <div class="left">
      <a>
        <div> 
          <button type="button" v-on:click="showPart1()"> PlantPal </button> 
        </div>
        <div> 
          <button type="button" v-on:click="showPart2()"> Payment </button>
        </div>
        <div> 
          <button type="button" v-on:click="showPart3()"> FAQs </button>
        </div>
      </a>
    </div>
  
    <div class="right">
      <div v-if="part1">
        <h1>How does it work?</h1>
        <p> 
          As you commute around Singapore, use the credit/debit card that you have registered your account with, and earn points as you travel!
          Grow your PlantPal with these points, and receive rewards as you go! 
        </p>
      </div>

      <div v-if="part2">
        <h1>Payment methods: </h1>
        <p>
          These are the various types of payment modes that are accepted on SG Travel Buddy.
          Only wireless payment modes will be accepted. 
        </p>
        <img :src="visa"/> 
        <img :src="mastercard"/> 
        <img :src="americanexpress"/>
      </div>

      <div v-if="part3">
        <h1><b>FAQs</b></h1> <br> 
        <h2> How do I earn points for my PlantPal? </h2>
        <p> You can earn points by planning your trips via this application, and the points will be credited to you the moment you make the planned trip. </p>
        <br>
        <h2> How do I redeem my rewards? </h2>
        <p> Once you have earned a reward, the discounts will automatically be applied to your next public transport commute. </p>
        <br>
        <h2> Are there any benefits at different PlantPal levels? </h2>
        <p> Yes! There will be attractive rewards the moment your PlantPal evolves to the next stage. You will know when your PlantPal changes, and the rewards will automatically be credited into your account! </p>
        <br>
        <h2> My card might be expiring soon. Where can I update my card details? </h2>
        <p> Simply click on the Profile page, and there will be a button which will direct you to change your card details. </p>
      </div>
    </div>
  </div>
</template>

<script>
import visa from "../assets/visa.png";
import mastercard from "../assets/mastercard.png"
import americanexpress from "../assets/americanexpress.png"

export default {
  data() {
    return {
      part1: true,
      part2: false,
      part3: false,
      visa: visa,
      mastercard: mastercard,
      americanexpress: americanexpress,
    }
  },
  
  methods: {
    showPart1: function(){
      this.part1=true,
      this.part2=false,
      this.part3=false
    },
    showPart2: function(){
      this.part1=false,
      this.part2=true,
      this.part3=false
    },
    showPart3: function(){
      this.part1=false,
      this.part2=false,
      this.part3=true
    },
  }
}
</script>

<style scoped>
.left {
  float: left;
  width: 30%;
}

.right{
  float: left;
  width: 70%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

button {
  text-align: center;
  background: none;
  transition-duration: 0.4s;
  padding: 10px 24px;
  border: 2px solid #4CAF50; /* Green */
  width: 300px;
}

button:hover{
  background-color: #4CAF50;
  color: white;
}

p {
  padding: 20px;
}

img {
  width: 120px;
  height: 80px;
  padding-left: 40px;
  padding-right: 20px;
}

</style>