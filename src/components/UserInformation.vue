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
        <img :src = pic1>
        <button>Change Profile Photo</button>
        <input type="file" @change="onFileSelected">
        <button @click="onUpload">Upload</button>
        
        <p><b>NAME</b></p>
        <p class="field">{{name}}</p>
        <p><b>EMAIL</b></p>
        <p class="field">{{email}}</p>
        
        <button v-on:click="openChangePasswordBox">Change Password</button> 
        <button v-on:click="openUpdatePersonalInformationBox">Update Personal Information</button>
        <br><br>
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

        <!--Change Password Pop-up-->
        <div id="changePasswordBox">
            <div id="popUpContent">
                <p class="close" v-on:click="closeChangePasswordBox">Close this Page</p>
                <h1><b>Change Password</b></h1>
                <form>
                    <label for="pwd1">New Password: </label>
                    <input type="password" id="pwd1" name="pwd1" v-model="newPassword1">
                    <br><br>
                    <label for="pwd2">Confirm Your New Password: </label>
                    <input type="password" id="pwd2" name="pwd2" v-model="newPassword2">
                    <br><br>
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
                    <label for="cardholderName">Cardholder Name: </label>
                    <input type="string" id="cardholderName" name="cardholderName" v-model="newCardholderName">
                    <br><br>
                    <label for="creditCardNumber">Credit Card Number: </label>
                    <input type="string" id="creditCardNumber" name="creditCardNumber" v-model="newCreditCardNumber">
                    <br><br>
                    <label for="csv">CSV: </label>
                    <input type="string" id="csv" name="csv" v-model="newCsv">
                    <br><br>
                    <label for="cardExpiryDate">Expiry Date: </label>
                    <input type="date" id="cardExpiryDate" name="cardExpiryDate" v-model="newCardExpiryDate">
                    <br><br>
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
import 'firebase/storage';

export default ({
    data() {
        return {
            //userInformation: [],
            carbonCut: 0,
            distance: 0,
            email: "",
            mobile: "",
            moneySave: "",
            name: "",
            travelNum: 0,
            newPassword1: "",
            newPassword2: "",
            alertMessage1: "",
            selectedFile: null,
            pic1: "",
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
        onFileSelected(event) {
            console.log(event);
            // Stores the file in data
            this.selectedFile = event.target.files[0];
        },
        onUpload() {
            // Stores the file in Firestore Storgae
            const ref = firebase.storage().ref().child('some-child');
            ref.put(this.selectedFile).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                console.log(snapshot);
            });

            // Need to figure out how to get the link from Firestore Storage to Firestore Database

            /*database.collection('users').doc(localStorage.uid).update({
                profilePhoto: ref.getDownloadURL(),
            })*/
            /*uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
            });*/
        },
        fetchUserData() {
            database.collection('users').doc(localStorage.uid).get().then(doc => {
                this.name = doc.data().name;
                this.email = doc.data().email;
                this.originalFile = doc.data().profilePic;
                this.pic1 = doc.data().pic1;
            })
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
                this.alertMessage1 = "The password(s) you have entered do not match. Please try again.";
            } else {
                console.log("Passwords match");
                this.alertMessage1 = "";
                var user = firebase.auth().currentUser;
                user.updatePassword(this.newPassword1);
                alert("Your password has been updated successfully!");
                location.reload();
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