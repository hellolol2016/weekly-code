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
let username, password, zipcode;
//checks for password and name blank, also sets up values for sending to database
function ready(){ 
    let Nname = document.getElementById("username").value;
    let Npassword = document.getElementById('password').value;
    let Nzipcode = document.getElementById('zipcode').value;
    if(Nname === "" || Npassword === "" || Nzipcode === ""){
        alert("You must fill out all fields!");
        return false;
    } else {
        username = Nname;
        password = Npassword;
        zipcode = Nzipcode
        return true;
    }
}
// let id;
// var ref = firebase.database().ref("user signup info");
// ref.once("value")
//   .then(function(snapshot) {
//     var Nid = snapshot.numChildren(); // 1 ("name")
//     id = Nid;
//   });

//pushes the location to database
document.getElementById("submit").onclick = function(){
    if(ready()){

        console.log("sending")
        database.ref(`user signup info/` + username).set({
            username : username,
            password : password,
            zip : zipcode
        })
        console.log("send info");
        
        document.querySelector('#username').value="";
        document.querySelector('#password').value="";
        document.querySelector('#zipcode').value="";
        setTimeout(() => { self.location = "index.html"; }, 500);
        
    }


  }

document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        if(ready()){
            console.log("sending")
            database.ref(`user signup info/`+username).set({
                username : username,
                password : password,
                zip : zipcode
            })
            console.log("send info");

            document.querySelector('#username').value="";
            document.querySelector('#password').value="";
            document.querySelector('#zipcode').value="";
            setTimeout(() => { self.location = "index.html"; }, 500);
        }
    }
});
