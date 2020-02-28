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

    //load seed(default) data
    function loadSeedData() {
        var seedData = [{ carModel: "RAM Promaster Cargo", makeYear: "2017", image: "https://d1zgdcrdir5wgt.cloudfront.net/media/vehicle/images/pr1-lXc_S6S4IzP6o6N-iw.1440x700.jpg", status: "available" },
        { carModel: "RAM 1500", makeYear: "2019", image: "https://www.greenbrierdodge.com/assets/shared/CustomHTMLFiles/Responsive/MRP/RAM/2019/1500/images/2019-RAM-1500-01.jpg", status: "rented" },
        { carModel: "GMC Canyon", makeYear: "2019", image: "https://www.gmc.com/content/dam/gmc/na/us/english/index/vehicles/2019/trucks/canyon-mov/01-images/2019-canyon-mov-sle-slt-19PGCN00251-v7.jpg?imwidth=600", status: "available" }];
        // Your web app's Firebase configuration

        //Remove preloaded data
        let vanDataRef = database.ref('/vans');
        //vanDataRef.remove();

        var carModel = "";
        var makeYear = "";
        var imageURL = "";
        var status = "";

        // Load seed data
        for (let iter = 0; iter < seedData.length; iter++) {
            //console.log("seeddata=", seedData[iter]);
            carModel = seedData[iter].carModel;
            makeYear = seedData[iter].makeYear;
            imageURL = seedData[iter].image;
            status = seedData[iter].status;
            database.ref('/vans').push({
                carModel: carModel,
                makeYear: makeYear,
                image: imageURL,
                status: status
            });
        }
    }

    //Display data on page
    database.ref('/vans').on("child_added", function (childSnapshot) {
        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val());

        var card = $("<div class='card col-4 p-0 m-1' id='card"+count+"'>");
        var image = $("<img src=" + childSnapshot.val().image + " class='card-img-top' style='width:100%;height:180px;' alt='card'>");
        var body = $("<div class='card-body bg-dark text-white'>");
        var title = $("<h5 class='card-title'>" + childSnapshot.val().carModel + "</h5>");
        var status = childSnapshot.val().status;
        var button = "";
        if (status === "available") {
            button = $("<p class='card-text'>Availability: <button type='button' class='btn btn-success'>Available</button></p>");
        }
        else {
            button = $("<p class='card-text'>Availability: <button type='button' class='btn btn-danger'>Rented</button></p>");
        }
        var editButton = $("<button type='button' class='btn btn-primary edit-button mb-1' style='width:200px;'>Edit</button>");
        var deleteButton = $("<button type='button' class='btn btn-primary close-button' style='width:200px;'>Delete</button>");

        deleteButton.attr("id", "card"+count);
        deleteButton.attr("data-key", childSnapshot.key);

        editButton.attr("id", "card"+count);
        editButton.attr("data-key", childSnapshot.key);
       
        card.append(image);
        card.append(body);
        body.append(title);
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
        var childNode = database.ref("/vans").child($(this).attr("data-key"));
        //console.log(childNode);
        childNode.remove();   
    }

    //edit button event handler
    function editData(){
        sessionStorage.item_id=$(this).attr('data-key');
        //console.log(sessionStorage.item_id);
        window.location.href="./edit.html";
    }

    //loadSeedData();
    //remove this card from dom and database.
    //delete button event handler
    $(document).on("click", ".close-button", removeCard);
    //edit button handler
    $(document).on("click",".edit-button",editData);
});