$(document).ready(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyBEiUYDDMCjCdpXfg6HXx4dXGBJyN6Rrww",
        authDomain: "jiffycars-d5648.firebaseapp.com",
        databaseURL: "https://jiffycars-d5648.firebaseio.com",
        projectId: "jiffycars-d5648",
        storageBucket: "jiffycars-d5648.appspot.com",
        messagingSenderId: "223019146846",
        appId: "1:223019146846:web:369b6e0bcb297a7d1bdecf"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    //Remove preloaded data
    let vanDataRef = database.ref('/vans');
 
    /* Add new entry to database.*/
    $("#addVanButton").on('click',function(event){
        event.preventDefault();
        console.log("Here");
        const addModel = $("#addModel").val();
        const addMakeYear = $("#addMakeyear").val();
        const addImage = $("#addImage").val();
        console.log(addModel,addMakeYear,addImage);
        database.ref('/vans').push({
            carModel: addModel,
            makeYear: addMakeYear,
            image: addImage,
            status: "available"
        });
        window.location.href="./van.html";
    });
});