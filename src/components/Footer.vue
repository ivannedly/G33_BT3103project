<template>
    <div class="row">
      <div class="left">
        <h3> SGTravel Buddy </h3>
        SGTravelBuddy is your companion, determined to help you save the world, one ride at a time. We believe that we can all do our part in making Sinagpore and the world clean and green. The pandemic may be here to stay, but we can still do our part fot the environment!

      </div>
      <div class="middle">
          <h3> Contact Us </h3>
          Tel: 6123 2342 <br>
          Email: helpdesk@sgtravelbuddy.com.sg
          <br>
      </div>
      <div class="right">
        <h3> Follow Us on Social Media! </h3>
        Get connected with us to get the latest changes.
        <br><br>
        <a href="https://www.instagram.com/sgtravel_buddy/"><img :src="ins"/></a>
        <a href="https://www.facebook.com/travelbuddy.sg.7/"><img :src="fb"/></a>
      </div>
    </div>
</template>

<script>
import ins from "../assets/ins.png";
import fb from "../assets/fb.png";
export default {
    data(){
        return{
            ins: ins,
            fb: fb,
        }
    },
}
</script>

<style scoped>
#footer { 
  background-color: rgb(125, 194, 156);
  height: 120px;
  padding: 10px;
  border: none;
}

img {
  height: 30px;
  width: 30px;
  padding-right: 10px;
}

.left {
  float: left;
  width: 47%;
  text-align: left;
}
.middle {
  float: left;
  width: 24%;
  padding-left: 10px;
  text-align: left;
}
.right {
  float: right;
  width: 25%;
  padding-left: 10px;
  text-align: left;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
