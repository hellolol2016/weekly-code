// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let storage = window.sessionStorage;
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

let user, item;

//checks for password and name blank, also sets up values for sending to database
function ready(){ 
    let Nname = document.getElementById("name").value;
    let Nitem = document.getElementById('items').value;
    if(Nname === "" || Nitem === ""){
        alert("You must fill out all fields!");
        return false;
    } else {
        user = Nname;
        item = Nitem;
        return true;
    }
}

let database = firebase.database();


  function initMap() {
	var mapOptions = {
		zoom: 3,
		center: new google.maps.LatLng(37.0902, -95.7129),
		mapTypeId: 'roadmap'
	};
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  //Irvine, CA
	var recyclingCenter = {lat: 33.6761216,lng: -117.7660269};
	var marker = new google.maps.Marker({
			position: recyclingCenter,
			map: map,
			title: 'Irvine Household Hazardous Waste Collection Center'
			});
  
  //Irvine, CA
  var recyclingCenter2 = {lat: 33.6428299,lng: -117.7398098};
  var marker2 = new google.maps.Marker({
      position: recyclingCenter2,
      map: map,
      title: 'YouRenew'
      });

  //Kalamazoo, MI
  var recyclingCenter3 = {lat: 42.2849097,lng: -85.5708447};
  var marker3 = new google.maps.Marker({
      position: recyclingCenter3,
      map: map,
      title: 'Michigan Recycling Industries, LLC'
      });
  
  //NYC, NY
  var recyclingCenter4 = {lat: 40.7245292,lng: -73.9320297};
  var marker4 = new google.maps.Marker({
      position: recyclingCenter4,
      map: map,
      title: 'City Recycling'
      });

  //Austin, TX
  var recyclingCenter5 = {lat: 30.2132704,lng: -97.7381713};
  var marker5 = new google.maps.Marker({
      position: recyclingCenter5,
      map: map,
      title: 'Austin Recycle & Reuse Drop-off'
      });

  //Miami, FL
  var recyclingCenter6 = {lat: 25.8302073,lng: -80.2537179};
  var marker6 = new google.maps.Marker({
      position: recyclingCenter6,
      map: map,
      title: 'GORGY RECYCLING COMPANY, INC.'
      });  
      
  //Chicago, IL
  var recyclingCenter7 = {lat: 41.8344650,lng: -87.6990890};
  var marker7 = new google.maps.Marker({
      position: recyclingCenter7,
      map: map,
      title: 'Lakeshore Recycling Systems'
      });  

  //Las Vegas, NV
  var recyclingCenter8 = {lat: 36.1497229,lng: -115.1620060};
  var marker8 = new google.maps.Marker({
      position: recyclingCenter8,
      map: map,
      title: 'Nevada State Recycle'
      }); 

  //Denver, CO
  var recyclingCenter9 = {lat: 39.8076628,lng: -105.0257480};
  var marker9 = new google.maps.Marker({
      position: recyclingCenter9,
      map: map,
      title: 'Can Land Recycling Center'
      });

  //Nashville, TN
  var recyclingCenter10 = {lat: 36.1875015,lng: -86.6801226};
  var marker10 = new google.maps.Marker({
      position: recyclingCenter10,
      map: map,
      title: 'Recycling drop off'
      });

}



//https://maps.googleapis.com/maps/api/place/textsearch/xml?query=tennis+court+near+92618s&key=AIzaSyB7SK2BBMhJ9SUnxYZQW4Bd_gpc-4XCum0



//pushes the location to database
document.getElementById("submit").onclick = function(){
  if(ready()){
        storage.setItem('name', user);
        console.log("sending")
        database.ref("user items/"+user).push({
            user : user,
            item : item
        })
        console.log("send info");
        
        console.log(storage.getItem('name'));
        document.querySelector('#items').value="";
    }
  }
  
  document.querySelector('#name').value=storage.getItem('name');

  document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        if(ready()){
            storage.setItem('name', user);
            console.log("sending")
            database.ref("user items/" + user).push({
              user : user,
              item : item

            })
            console.log("send info");
            console.log(storage.getItem('name'));
            document.querySelector('#items').value="";
        }
    }
  });

  let items = document.querySelector("#item-list");
  username = storage.getItem('name').trim();
  let prompt = `user items/${username}`
  database.ref(prompt).on('child_added', function(item){
    user = item.val().user;
    let value = item.val().item;
    console.log(value);

    let span = document.createElement('span');
    span.innerHTML = user;
    
    let div = document.createElement("div");
    let p = document.createElement("p");
    p.innerHTML = value;


    div.appendChild(span);
    div.appendChild(p);
    items.appendChild(div);
    
  });

const done = document.querySelector("#done");
done.addEventListener('click',function(x){
    database.ref("user items/"+username).remove();
    
})

database.ref(prompt).on('child_removed', function(item){
    user = item.val().user;
    let value = item.val().item;
    console.log(value);

    let span = document.createElement('span');
    span.innerHTML = user;
    
    let div = document.createElement("div");
    let p = document.createElement("p");
    p.innerHTML = value;


    div.appendChild(span);
    div.appendChild(p);
    items.appendChild(div);
    
  });