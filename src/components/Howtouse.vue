<template>
<div class="row">
  <div class="left">
      <a>
          <div><button type="button" v-on:click="showPart1()">PlantPal</button></div>
          <div><button type="button" v-on:click="showPart2()">Payment</button></div>
          <div><button type="button" v-on:click="showPart3()">FAQs</button></div>
      </a>
  </div>

  <div class="right">

      <div v-if="part1">
          <h2>How does it work?</h2>
          <p>As you commute around Singapore, use the card you have registered in this account, and earn points as you travel. These points will grow your PlantPal, and as you achieve the different growth levels, you will receive rewards which are automatically credited into your account.</p>
          <p>That's simple!</p>
      </div>

      <div v-if="part2">
          <p>temp payment</p>
      </div>

      <div v-if="part3">
          <p>temp FAQs</p>
      </div>
  </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            part1: true,
            part2: false,
            part3: false,
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
</style>