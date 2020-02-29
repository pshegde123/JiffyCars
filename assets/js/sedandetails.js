let currentCardName = "";
let count = 0;

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

    
    //Display data on page
    database.ref('/sedan').on("child_added", function (childSnapshot) {
        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val());

        //create html elements
        var card = $("<div class='card col-4 p-0 m-1' id='card"+count+"'>");
        var image = $("<img src=" + childSnapshot.val().image + " class='card-img-top' style='width:100%;height:180px;' alt='card' required>");
        var body = $("<div class='card-body bg-dark text-white'>");
        var title = $("<h2 class='card-title' required>"+childSnapshot.val().carMaker+' '+childSnapshot.val().carModel + "</h5>");
        var carMaker = $("<p class='card-text' required>Maker: "+childSnapshot.val().carMaker+"</p>");
        var mfgYear = $("<p class='card-text' required>Manufacturing Year: "+childSnapshot.val().makeYear+"</p>");
        var numberOfSeats = $("<p class='card-text' required>Number of seats: "+childSnapshot.val().seats+"</p>");
        var pricePerDay = $("<p class='card-text' required>Price Per Day($): "+childSnapshot.val().dailyCharges+"</p>");
        var rentedDateFrom = $("<p class='card-text' required>Rented Date From: "+childSnapshot.val().fromDate+"</p>");
        var rentedDateTo = $("<p class='card-text' required>Rented Date To: "+childSnapshot.val().toDate+"</p>");

        var status = childSnapshot.val().status;
        var button = "";
        
        if (status === "available") {
            button = $("<p class='card-text'>Availability: <button type='button' class='btn btn-success'>Available</button></p>");
        }
        else {
            button = $("<p class='card-text'>Availability: <button type='button' class='btn btn-danger'>Rented</button></p>");
        }
        var editButton = $("<button type='button' class='btn btn-primary edit-button m-1' style='width:40%;'>Edit</button>");
        var deleteButton = $("<button type='button' class='btn btn-primary close-button m-1' style='width:40%;'>Delete</button>");

        deleteButton.attr("id", "card"+count);
        deleteButton.attr("data-key", childSnapshot.key);

        editButton.attr("id", "card"+count);
        editButton.attr("data-key", childSnapshot.key);
       
        card.append(image);
        card.append(body);
        body.append(title);
        body.append(carMaker);
        body.append(mfgYear);
        body.append(numberOfSeats);
        body.append(pricePerDay);
        body.append(rentedDateFrom);
        body.append(rentedDateTo);
        body.append(button);
        body.append(editButton);
        body.append(deleteButton);
        // full list of items to the displayCard div
        $("#displayCard").append(card);
        count++;
        // Handle the errors
    }, function (errorObject) {
        console.log("Errors: " + errorObject.code);
    });

    $("#plus").on('click', function (event) {
        event.preventDefault();
        sessionStorage.vehicleCatagory = "sedan";
        window.location.href = "./add.html";
    });

    //delete button event handler
    function removeCard(){
        var cardToRemove = $(this).attr('id');
        //console.log("delete card id=", cardToRemove);
        var element = document.getElementById(cardToRemove);
        //console.log("element=",element);
        element.remove();
    
        //delete database record
        sessionStorage.vehicleCatagory = "sedan";
        var childNode = database.ref("/sedan").child($(this).attr("data-key"));
        //console.log(childNode);
        childNode.remove();   
    }

    //edit button event handler
    function editData(){
        sessionStorage.item_id=$(this).attr('data-key');
        //console.log(sessionStorage.item_id);
        sessionStorage.vehicleCatagory = "sedan";
        window.location.href="./edit.html";
    }

    
    //remove this card from dom and database.
    //delete button event handler
    $(document).on("click", ".close-button", removeCard);
    //edit button handler
    $(document).on("click",".edit-button",editData);
});