let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}


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
let username, place, items;
//checks for location and name blank, also sets up values for sending to database
function ready(){ 
    let Nname = document.getElementById("name").value;
    let Nplace = document.getElementById('location').value;
    let Nitems = document.getElementById('items').value;
    if(Nname === "" || Nplace === "" || Nitems === ""){
        alert("Please dont leave the name, location, or items blank!");
        return false;
    } else {
        username = Nname;
        place = Nplace;
        items = Nitems
        return true;
    }
}

//pushes the location to database
document.getElementById("submit").onclick = function(){
  if(ready()){
      database.ref("locations & items").push({
          name : username,
          location : place,
          type : items
      })
      
  }
  document.querySelector('#location').value="";
  document.querySelector('#items').value="";
}


document.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
      if(ready()){
          database.ref("locations & items").push({
              name : username,
              location : place,
              type : items             
          });
      }
      document.querySelector('#location').value="";
      document.querySelector('#items').value="";
  }
});