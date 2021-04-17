<template>
  <div id="content">
    <img :src = profilePicture> <br>
    <button v-on:click="openChangeProfilePictureBox">Change Profile Picture</button>
    <!--Change Profile Picture Pop-up-->
    <div id = "changeProfilePictureBox">
      <div id = "popUpContent">
        <p class="close" v-on:click="closeChangeProfilePictureBox">Close this Page</p>
        <h1><b>My New Profile Picture</b></h1>
        <input id="uploadImage" type="file" @change="updateSelectedFile"> <br>
        <img id="uploadPreview"> <br>
        <button @click="uploadSelectedFile">Upload</button>
      </div>
    </div>
    <p>
      <b>NAME</b>
    </p>
    <p class="field">{{name}}</p>
    <p>
      <b>EMAIL</b>
    </p>
    <p class="field">{{email}}</p>
    <button v-on:click="openUpdatePersonalInformationBox">Update Personal Information</button> <br><br>
    <button v-on:click="openEditCardDetailsBox">Update Card Details</button>
    <!--Update Personal Information Pop-up-->
    <div id="updatePersonalInformationBox">
      <div id="popUpContent">
        <p class="close" v-on:click="closeUpdatePersonalInformationBox">Close this Page</p>
          <h1><b>Update Personal Information</b></h1>
          <form>
          <label for="newName">New Username: </label>
            <input type="string" id="newName" name="newName" v-model="newName">
            <br><br>
            <label for="newEmail">New Email Account: </label>
            <input type="string" id="newEmail" name="newEmail" v-model="newEmail">
            <br><br>
            <p style="color: red;">{{alertMessage3}}</p>
            <input type="submit" value="Update Personal Information" v-on:click.prevent="updatePersonalInformation">
          </form>
      </div>
    </div>
    <!--Change Card Details Pop-up-->
    <div id="editCardDetailsBox">
      <div id="popUpContent">
        <p class="close" v-on:click="closeEditCardDetailsBox">Close this Page</p>
        <h1><b>Update Card Details</b></h1>
        <form>
          <label for="cardholderName">Cardholder Name*: </label>
          <input type="string" id="cardholderName" name="cardholderName" v-model="newCardholderName">
          <br><br>
          <label for="creditCardNumber">Credit Card Number*: </label>
          <input type="string" id="creditCardNumber" name="creditCardNumber" v-model="newCreditCardNumber">
          <br><br>
          <label for="csv">CSV*: </label>
          <input type="string" id="csv" name="csv" v-model="newCsv">
          <br><br>
          <label for="cardExpiryDate">Expiry Date*: </label>
          <input type="date" id="cardExpiryDate" name="cardExpiryDate" v-model="newCardExpiryDate">
          <br><br>
          <p>* indicates required fields</p>
          <p style="color: red;">{{alertMessage2}}</p>
          <input type="submit" value="Update Card Details" v-on:click.prevent="updateCardDetails">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import database from '../firebase.js';
import firebase from 'firebase';
require('firebase/auth');

export default ({
  data() {
    return {
      email: "",
      name: "",
      profilePicture: "",
      
      selectedFile: null,

      newCardholderName: "",
      newCreditCardNumber: "",
      newCardExpiryDate: "",
      newCsv: "",
      alertMessage2: "",

      newName: "",
      newEmail: "",
      alertMessage3: "",
    }
  },
  methods: {
    fetchUserData: function() {
      database.collection('users').doc(localStorage.uid).get().then(doc => {
        this.name = doc.data().name;
        this.email = doc.data().email;
      })
      var storageRef = firebase.storage().ref('/profilePicture/' + localStorage.uid);
      storageRef.getDownloadURL().then((url) => {
        this.profilePicture = url;
      })
    },

    updateSelectedFile: function(event) {
      console.log(event);
      this.selectedFile = event.target.files[0];
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);
      oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
      };
    },
    
    uploadSelectedFile: function() {
      var storageRef = firebase.storage().ref('/profilePicture/'+ localStorage.uid);
      storageRef.put(this.selectedFile).then(() => {
          alert("You have successfully changed your profile picture!");
          location.reload();
      })
    },

    openChangeProfilePictureBox: function() {
      var modal = document.getElementById("changeProfilePictureBox");
      modal.style.display = "block";
    },
        
    closeChangeProfilePictureBox: function() {
      var modal = document.getElementById("changeProfilePictureBox");
      modal.style.display = "none";
    },

    openUpdatePersonalInformationBox: function() {
      console.log("Activating openChangePasswordBox...");
      var modal = document.getElementById("updatePersonalInformationBox");
      modal.style.display = "block";
    },

    closeUpdatePersonalInformationBox: function() {
      var modal = document.getElementById("updatePersonalInformationBox");
      modal.style.display = "none";
    },
    // Take out email
    updatePersonalInformation: function() {
      if (this.newName.length == 0) {
        if (this.newEmail.length == 0) {
          this.alertMessage3 = "You have not keyed in any new username and/or email.";
        } else {
          this.alertMessage3 = "";
          firebase.auth().currentUser.updateEmail(this.newEmail).then(() => {
            database.collection('users').doc(localStorage.uid).update({
              email: this.newEmail
            }).then(() => {
              alert("You have successfully updated your email!");
              location.reload();
            })
          })
        }
      } else {
        this.alertMessage3 = "";
        database.collection('users').doc(localStorage.uid).update({
          name: this.newName
        }).then(() => {
          alert("You have successfully updated your username!");
          location.reload();
        })
      }
    },
    openEditCardDetailsBox() {
      var modal = document.getElementById("editCardDetailsBox");
      modal.style.display = "block";
    },        
    closeEditCardDetailsBox() {
      var modal = document.getElementById("editCardDetailsBox");
      modal.style.display = "none";
    },
    updateCardDetails() {
      if (this.newCardholderName.length==0 || this.newCreditCardNumber.length==0 || this.newCsv.length==0 || this.newCardExpiryDate.length==0) {
        this.alertMessage2 = "You have not filled in one or more of the required fields. Please try again.";
      } else {
        this.alertMessage2 = "";
        database.collection('users').doc(localStorage.uid).update({
          cardholder: this.newCardholderName,
          creditNum: this.newCreditCardNumber,
          csv: this.newCsv,
          expiry: this.newCardExpiryDate,
        }).then(() => {
          alert("Your card details have been updated successfully!");
          location.reload()
        });
      }
    }
  },
  created() {
    this.fetchUserData();
  }
})
</script>


<style scoped>
p {
    text-align: left;
}

button {
    margin: 15px;
}

img {
  border: 1px solid #ddd;
  border-radius: 50%;
  padding: 5px;
  width: 150px;
  height: 150px;
  object-fit: cover;
}

img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}

.field {
    background-color: green;
    color: white;
    padding: 10px;
    width: 400px;
    border-radius: 15px;
}

#changeProfilePictureBox {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
}

#updatePersonalInformationBox {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
}

.close {
    color: black;
    float: right;
    font-size: 15px;
    text-decoration: underline;
}

#editCardDetailsBox {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
}
#popUpContent {
    background-color: white;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid black;
    width: 80%;
}


.close:hover,
.close:focus {
    color: red;
    cursor: pointer;
}

form {
    text-align: left;
}

</style> 