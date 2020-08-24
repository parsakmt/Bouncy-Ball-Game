import { submitScore, timeSurvived } from "./bounceBall.js"; 

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
    
    dbRefHighScores.orderByChild("score").limitToFirst(1).once("value", function(snapshot){
        var entry = snapshot.val(); 
        var index = Object.keys(entry)[0]; 

        //Remove the previous high score from the database
        firebase.database().ref().child(index).remove(); 
    });
    
    //Hide the input container
    document.getElementById("highScoreContainer").style.display = "none";
    document.getElementById("initialsInput").value = "";
    

    //Push data into the firebase database
    dbRefHighScores.push(scoreInfo); 

    setCurrentHighScore(); 
});

export function checkForHighScore() {
    dbRefHighScores.orderByChild("score").limitToLast(1).once("value", function(snapshot){
        var entry = snapshot.val(); 
        var index = Object.keys(entry)[0]; 

        if(entry[index].score < timeSurvived) {
            document.getElementById("highScoreContainer").style.display = "inline";
        }
        else {
            document.getElementById("highScoreContainer").style.display = "none";
         }
    });

    setCurrentHighScore(); 

}

function setCurrentHighScore() {
    dbRefHighScores.orderByChild("score").limitToLast(1).once("value", function(snapshot){
        var entry = snapshot.val(); 
        var index = Object.keys(entry)[0]; 

         if (document.getElementById("highScoreContainer").style.display == "inline") {
            document.getElementById("currentHighScore").style.display = "none";
        }
        else {
            document.getElementById("currentHighScore").style.display = "inline";
            document.getElementById("timeHighScore").innerHTML = entry[index].score;
            document.getElementById("initialsHighScore").innerHTML = entry[index].initials; 
        }
    });
}





