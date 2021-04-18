<template>
  <div>
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
    <p>
      <b>MOBILE NUMBER</b>
    </p>
    <p class="field">{{mobile}}</p>
    <button v-on:click="openChangePasswordBox">Change Password</button> 
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
            <label for="newMobile">New Mobile Number: </label>
            <input type="string" id="newMobile" name="newMobile" v-model="newMobile">
            <br><br>
            <p style="color: red;">{{alertMessage3}}</p>
            <input type="submit" value="Update Personal Information" v-on:click.prevent="updatePersonalInformation">
          </form>
      </div>
    </div>
    <!--Change Password Pop-up-->   
    <div id="changePasswordBox">
      <div id="popUpContent">
        <p class="close" v-on:click="closeChangePasswordBox">Close this Page</p>
        <h1>
          <b>Change Password</b>
        </h1>
        <form>
          <label for="pwd1">New Password: </label>
          <input type="password" id="pwd1" name="pwd1" v-model="newPassword1"> <br> <br>
          <label for="pwd2">Confirm Your New Password: </label>
          <input type="password" id="pwd2" name="pwd2" v-model="newPassword2"> <br> <br>
          <p style="color: red;">{{alertMessage1}}</p>
          <input type="submit" value="Change Password" v-on:click.prevent="changePassword">
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
          <label for="cvv">CVV*: </label>
          <input type="string" id="cvv" name="cvv" v-model="newCvv">
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
      name: "",
      email: "",
      mobile: "",
      profilePicture: "",
      
      selectedFile: null,

      newPassword1: "",
      newPassword2: "",
      alertMessage1: "",

      newCardholderName: "",
      newCreditCardNumber: "",
      newCardExpiryDate: "",
      newCvv: "",
      alertMessage2: "",

      newName: "",
      newEmail: "",
      newMobile: "",
      alertMessage3: "",
    }
  },
  methods: {
    fetchUserData: function() {
      database.collection('users').doc(localStorage.uid).get().then(doc => {
        this.name = doc.data().name;
        this.email = doc.data().email;
        this.mobile = doc.data().mobile;
      })
      var storageRef = firebase.storage().ref('/profilePicture/' + localStorage.uid);
      storageRef.getDownloadURL().then((url) => {
        this.profilePicture = url;
      }).catch((error) => {
        console.log(error);
        storageRef = firebase.storage().ref('/profilePicture/default_user_pic.png');
        storageRef.getDownloadURL().then((url) => {
          this.profilePicture = url;
        })
      })
    },

    updateSelectedFile: function(event) {
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
      var modal = document.getElementById("updatePersonalInformationBox");
      modal.style.display = "block";
    },

    closeUpdatePersonalInformationBox: function() {
      var modal = document.getElementById("updatePersonalInformationBox");
      modal.style.display = "none";
    },

    updatePersonalInformation: function() {
      if (this.newName.length == 0 && this.newEmail.length == 0 && this.newMobile.length == 0) {
        this.alertMessage3 = "You have not keyed in any new username, email and/or mobile number.";
      } else {
        if (this.newName.length != 0) {
          database.collection('users').doc(localStorage.uid).update({
            name: this.newName
          })
        }
        if (this.newEmail.length != 0) {
          firebase.auth().currentUser.updateEmail(this.newEmail).then(() => {
            database.collection('users').doc(localStorage.uid).update({
              email: this.newEmail
            })
          })
        }
        if (this.newMobile.length != 0) {
          database.collection('users').doc(localStorage.uid).update({
            mobile: this.newMobile
          })
        }
        alert("You have successfully updated your personal information!")
        location.reload();
      } 
    },
    
    openChangePasswordBox: function() {
      var modal = document.getElementById("changePasswordBox");
      modal.style.display = "block";
    },
    
    closeChangePasswordBox: function() {
        var modal = document.getElementById("changePasswordBox");
        modal.style.display = "none";
    },

    changePassword: function() {
      if (this.newPassword1 != this.newPassword2) {
        this.alertMessage1 = "The password(s) you have entered do not match. Please try again.";
      } else if (this.newPassword1.length == 0) {
        this.alertMessage1 = "You have not enetered a new password. Please try again.";
      } else if (this.newPassword1 == this.newPassword2 && this.newPassword1.length < 6) {
        this.alertMessage1 = "Your new password must contain at least 6 characters.";
      } else {
        this.alertMessage = "";
        var user = firebase.auth().currentUser;
        user.updatePassword(this.newPassword1).then(() => {
          alert("Your password has been updated successfully");
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
      var currentTime = new Date();
      var enteredExpiryDate = new Date(this.newCardExpiryDate);
      if (this.newCardholderName.length==0 || this.newCreditCardNumber.length==0 || this.newCvv.length==0 || this.newCardExpiryDate.length==0) {
        this.alertMessage2 = "You have not filled in one or more of the required fields. Please try again.";
      } else if (enteredExpiryDate.getTime() <= currentTime.getTime() || this.newCreditCardNumber.length != 19 || this.newCvv.length != 3) {
        this.alertMessage2 = "The card detail(s) that you have provided is/are invalid.";
      } else {
        this.alertMessage2 = "";
        database.collection('users').doc(localStorage.uid).update({
          cardholder: this.newCardholderName,
          creditNum: this.newCreditCardNumber,
          cvv: this.newCvv,
          expiry: this.newCardExpiryDate,
        }).then(() => {
          alert("Your card details have been updated successfully!");
          location.reload()
        });
      }
    },
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


#changePasswordBox {
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

.close {
    color: black;
    float: right;
    font-size: 15px;
    text-decoration: underline;
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