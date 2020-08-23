import { submitScore } from "./bounceBall.js"; 

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA3zVAc8KiBkuLeBOXS8NPnDHr-9Eg_gaU",
    authDomain: "bouncy-ball-game-b3d7c.firebaseapp.com",
    databaseURL: "https://bouncy-ball-game-b3d7c.firebaseio.com",
    projectId: "bouncy-ball-game-b3d7c",
    storageBucket: "bouncy-ball-game-b3d7c.appspot.com",
    messagingSenderId: "835572942751",
    appId: "1:835572942751:web:a203c672e7ac2c4a449faa",
    measurementId: "G-6DZHQBWHLZ"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const dbRefHighScores = firebase.database().ref();
var scoreInfo;

var scoreDataSubmitButton = document.getElementById("scoreSubmit");

scoreDataSubmitButton.addEventListener("click", function() {
    scoreInfo = submitScore(); 
    
    document.getElementById("highScoreContainer").style.display = "none";
    document.getElementById("initialsInput").value = "";
    
    //Push data into the firebase database
    dbRefHighScores.push(scoreInfo); 

    //dbRefHighScores.on("value", isHighScore); 
});

function isHighScore(snapshot) {
    //console.log(scoreInfo.score); 
    snapshot.forEach(function(key) {
        //console.log(key.val().score); 
    });
}
