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
        <br> <!--To be changed later-->
        <button>Change Profile Photo</button>
        <p><b>NAME</b></p>
        <p class="field">{{name}}</p>
        <p><b>EMAIL</b></p>
        <p class="field">{{email}}</p>
        <button>Change Password</button> 
        <button>Update Personal Information</button>
        <br><br>
        <button>Edit Card Details</button>

    </div>
</template>

<script>
import database from '../firebase.js';

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
        }
    },
    methods: {
        fetchUserData() {
            //Uncommented after figuring out how to add in "firebase"
            //var user = firebase.auth().currentUser;

            //Using speific uid first
            database.collection('users').doc("LLE0xYwfEFSV9SvSwnoqvAx9tpz2").get().then(doc => {
                //this.userInformation.push(doc.data());
                //console.log(doc.data());
                this.carbonCut = doc.data().carbonCut;
                this.distance = doc.data().distance;
                this.email = doc.data().email;
                this.mobile = doc.data().mobile;
                this.moneySave = doc.data().moneySave;
                this.name = doc.data().name;
                this.travelNum = doc.data().travelNum;
                console.log(this.name);
            })
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
</style> 
-->