<template>
<div class="row">
  <div class="column">
      <a>
          <div><button type="button" v-on:click="showPart1()">What is SGTravel Buddy?</button></div>
          <div><button type="button" v-on:click="showPart2()">PlantPal</button></div>
          <div><button type="button" v-on:click="showPart3()">Payment</button></div>
          <div><button type="button" v-on:click="showPart4()">FAQs</button></div>
      </a>
  </div>

  <div>
      <div v-if="part1">
          <p>SGTravelBuddy is your companion, determined to help you save the world, one ride at a time. We believe that we can all do our part in making Sinagpore and the world clean and green. The pandemic may be here to stay, but we can still do our part fot the environment!</p>
      </div>

      <div v-if="part2">
          <h2>How does it work?</h2>
          <p>As you commute around Singapore, use the card you have registered in this account, and earn points as you travel. These points will grow your PlantPal, and as you achieve the different growth levels, you will receive rewards which are automatically credited into your account.</p>
          <p>That's simple!</p>
      </div>

      <div v-if="part3">
          <p>temp payment</p>
      </div>

      <div v-if="part4">
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
            part4: false,
        }
    },
    methods: {
        showPart1: function(){
            this.part1=true,
            this.part2=false,
            this.part3=false,
            this.part4=false
        },
        showPart2: function(){
            this.part1=false,
            this.part2=true,
            this.part3=false,
            this.part4=false
        },
        showPart3: function(){
            this.part1=false,
            this.part2=false,
            this.part3=true,
            this.part4=false
        },
        showPart4: function(){
            this.part1=false,
            this.part2=false,
            this.part3=false,
            this.part4=true
        },
    }
}
</script>

<style>
.column {
  float: left;
  width: 30%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

button {
    border: none;
    background: none;
}
</style>