<template>
    <div>
        <img :src = profilePicture>
        <br>
        <button v-on:click="openChangeProfilePictureBox">Change Profile Picture</button>

        <!--Change Profile Picture Pop-up-->
        <div id = "changeProfilePictureBox">
            <div id = "popUpContent">
                <p class="close" v-on:click="closeChangeProfilePictureBox">Close this Page</p>
                <p>Please choose your new profile picture:</p>
                <input id="uploadImage" type="file" @change="updateSelectedFile">
                <br>
                <img id="uploadPreview">
                <br>
                <button @click="uploadSelectedFile">Upload</button>
            </div>
        </div>
        
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
import firebase from 'firebase';
require('firebase/auth');

export default ({
    data() {
        return {
            email: "",
            name: "",
            profilePicture: "",

            selectedFile: null,

            newPassword1: "",
            newPassword2: "",
            alertMessage1: "",

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
        fetchUserData() {
            database.collection('users').doc(localStorage.uid).get().then(doc => {
                this.name = doc.data().name;
                this.email = doc.data().email;
            })
            var storageRef = firebase.storage().ref('/profilePicture/' + localStorage.uid);
            storageRef.getDownloadURL().then((url) => {
                this.profilePicture = url;
            })
        },
        updateSelectedFile(event) {
            console.log(event);
            this.selectedFile = event.target.files[0];
            var oFReader = new FileReader();
            oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);
            oFReader.onload = function (oFREvent) {
            document.getElementById("uploadPreview").src = oFREvent.target.result;
        };
        },
        uploadSelectedFile() {
            var storageRef = firebase.storage().ref('/profilePicture/'+ localStorage.uid);
            storageRef.put(this.selectedFile).then(() => {
                alert("You have successfully changed your profile picture!");
                location.reload();
            })
        },
        openChangeProfilePictureBox() {
            var modal = document.getElementById("changeProfilePictureBox");
            modal.style.display = "block";
        },
        closeChangeProfilePictureBox() {
            var modal = document.getElementById("changeProfilePictureBox");
            modal.style.display = "none";
        },
        openUpdatePersonalInformationBox() {
            console.log("Activating openChangePasswordBox...");
            var modal = document.getElementById("updatePersonalInformationBox");
            modal.style.display = "block";
        },
        closeUpdatePersonalInformationBox() {
            var modal = document.getElementById("updatePersonalInformationBox");
            modal.style.display = "none";
        },
        updatePersonalInformation() {
            if (this.newName.length == 0) {
                if (this.newEmail.length == 0) {
                    this.alertMessage3 = "You have not keyed in any new username or email in the fields above.";
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
        openChangePasswordBox() {
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
        this.fetchUserData();
    }
})
</script>

<!--
<style scoped>
p {
    text-align: left;
}

button {
    margin: 15px;
}

.field {
    background-color: green;
    color: white;
    padding: 10px;
    width: 300px;
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
-->