// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBC1wJWfMgKxG99mUxn4YHkQVS_-MnBx_0",
    authDomain: "recy-dc387.firebaseapp.com",
    projectId: "recy-dc387",
    storageBucket: "recy-dc387.appspot.com",
    messagingSenderId: "205601819575",
    appId: "1:205601819575:web:a0f5e587d1036ccd073632",
    measurementId: "G-RL5PSZZ9CL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let database = firebase.database();


//input
let username, password;
//checks for password and name blank, also sets up values for sending to database
function ready(){ 
    let Nname = document.getElementById("username").value;
    let Npassword = document.getElementById('password').value;
    if(Nname === "" || Npassword === ""){
        alert("You must fill out all fields!");
        return false;
    } else {
        username = Nname;
        password = Npassword;
        return true;
    }
}

//pushes the location to database
document.getElementById("enter").onclick = function(){
    if(ready()){
        console.log("sending");
        database.ref("user sign-in").push({
            username : username,
            password : password,
        })
        console.log("Send info");

        document.querySelector('#username').value="";
        document.querySelector('#password').value="";

        ref = firebase.database(); 
        ref.child("user signup info").orderByChild("name").equalTo(username).once("password",snapshot => {
            if (snapshot.contains(password)){
                setTimeout(() => { self.location = "map.html"; }, 1);
            } else {
                //incorrect password, show error message
            }
        });

        
    }
}

document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        if(ready()){
            console.log("seding");
            database.ref("user sign-in").push({
                username : username,
                password : password,
            })
            console.log("send info");

            document.querySelector('#username').value="";
            document.querySelector('#password').value="";
            setTimeout(() => { self.location = "map.html"; }, 1);
        }

    }
});
