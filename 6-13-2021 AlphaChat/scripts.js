// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBL9XQXi--Ws3-P5HrD4dCJnAGqhK_eQo8",
    authDomain: "alphachat-a84b6.firebaseapp.com",
    databaseURL: "https://alphachat-a84b6-default-rtdb.firebaseio.com",
    projectId: "alphachat-a84b6",
    storageBucket: "alphachat-a84b6.appspot.com",
    messagingSenderId: "264349697001",
    appId: "1:264349697001:web:6ea110b08eae08075b8178",
    measurementId: "G-QNDR6FFZCP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();

//chat app
let senderName, message;
//checks for message and name blank, also sets up values for sending to database
function ready(){ 
    let Nname = document.getElementById("name").value;
    let Nmessage = document.getElementById('message').value;
    if(Nname === "" || Nmessage === ""){
        alert("Please dont leave the name or message blank!");
        return false;
    } else {
        senderName = Nname;
        message = Nmessage;
        return true;
    }
}

//pushes the message to database
document.getElementById("send").onclick = function(){
    if(ready()){
        database.ref("messages").push({
            name : senderName,
            value : message
        })
        
    }
    document.querySelector('#message').value="";
    
}

document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        if(ready()){
            database.ref("messages").push({
                name : senderName,
                value : message
                
            });
        }
        document.querySelector('#message').value="";
    }
});

//prints messages on the website
let msgCount = 0;
database.ref("messages").on('child_added', function(message) {

let messages = document.getElementById("messages");
let name = message.val().name;
let value = message.val().value;

let div = document.createElement("div");
let span = document.createElement("span");
span.innerHTML = "@" + name;
let p = document.createElement("p");
p.innerHTML = value;

if(msgCount%2==0){
    div.classList.add('even_messages');
}
else{
    div.classList.add('odd_messages');
}
msgCount++;

div.appendChild(span);
div.appendChild(p);

messages.appendChild(div);
messages.scrollTop = messages.scrollHeight;
// <div>, span, p </div>

})
//scroll to bottom
window.onload=function () {
    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
}