<template>
    <div>
        <!--
        ##### Order of Items #####
        Photo
        "Change Profile Photo" Button
        Name Label and Field 
        Email Label and Field    
        Password Label and Field (to be changed?)
        "Update Personal Information" Button
        "Edit Card Details" Button
        -->
        <img src = "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8dHJlZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt = "Photo of Tree"> <!--need to make sure they are all cropped to the same size-->
        <br> <!--To be changed later with photo url from databse-->
        <button>Change Profile Photo</button>
        <p><b>NAME</b></p>
        <p class="field">{{name}}</p>
        <p><b>EMAIL</b></p>
        <p class="field">{{email}}</p>
        <button id="changePasswordButton" v-on:click="openChangePasswordBox">Change Password</button> 
        <button>Update Personal Information</button>
        <br><br>
        <button>Edit Card Details</button>
        
        <div id="changePasswordBox">
            <div id="changePasswordContent">
                <p class="close" v-on:click="closeChangePasswordBox">Close this Page</p>
                <h1><b>Change Password</b></h1>
                <form>
                    <label for="pwd1">New Password: </label>
                    <input type="password" id="pwd1" name="pwd1" v-model="newPassword1">
                    <br><br>
                    <label for="pwd2">Confirm Your New Password: </label>
                    <input type="password" id="pwd2" name="pwd2" v-model="newPassword2">
                    <br><br>
                    <p style="color: red;">{{alertMessage}}</p>
                    <input type="submit" value="Change Password" v-on:click.prevent="changePassword">
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import database from '../firebase.js';
import firebase from '@firebase/app';

export default ({
    data() {
        return {
            //userInformation: [],
            carbonCut: 0,
            cardholder: "",
            creditNum: "",
            csv: "",
            distance: 0,
            email: "",
            expiry: "",
            mobile: "",
            moneySave: "",
            name: "",
            travelNum: 0,
            newPassword1: "",
            newPassword2: "",
            alertMessage: "",
        }
    },
    methods: {
        fetchUserData() {
            // Problem accessing current user
            //database.collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
            database.collection('users').doc("kF6WPySduVVLpNHxD6gFLP12uA52").get().then(doc => {
                this.carbonCut = doc.data().carbonCut;
                this.cardHolder = doc.data().cardHolder;
                this.creditNum = doc.data().creditNum;
                this.csv = doc.data().csv;
                this.distance = doc.data().distance;
                this.email = doc.data().email;
                this.expiry = doc.data().expiry;
                this.mobile = doc.data().mobile;
                this.moneySave = doc.data().moneySave;
                this.name = doc.data().name;
                this.travelNum = doc.data().travelNum;
                console.log(this.expiry);
            })
        },
        openChangePasswordBox() {
            console.log("Activating openChangePasswordBox...");
            var modal = document.getElementById("changePasswordBox");
            modal.style.display = "block";
        },
        closeChangePasswordBox() {
            var modal = document.getElementById("changePasswordBox");
            modal.style.display = "none";
        },
        // Need to try this method again after sign-in page has been added as "user" currently has null value.
        changePassword() {
            if (this.newPassword1 != this.newPassword2 || this.newPassword1.length == 0) {
                console.log("Passwords do not match");
                this.alertMessage = "The password(s) you have entered do not match. Please try again.";
            } else {
                console.log("Passwords match");
                this.alertMessage = "";
                var user = firebase.auth().currentUser;
                user.updatePassword(this.newPassword1);
                alert("Your password has been updated successfully");
            }
        }
    },
    created() {
        //alert("Current User ID: " + firebase.auth().currentUser.uid);
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
    align-content: center;
    width: auto;
    border-radius: 15px;
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

#changePasswordContent {
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
