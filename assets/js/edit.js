var item_key = "";
var database = "";
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
    database = firebase.database();

    console.log("sessionStorage.vehicleCatagory=", sessionStorage.vehicleCatagory);
    if (sessionStorage.vehicleCatagory === "van") {
        let edit_id = database.ref('/vans').child(sessionStorage.item_id);
        //console.log("sessionstorage = ", edit_id.key);
        database.ref('/vans').orderByKey().equalTo(edit_id.key).on("value", function (snapshot) {
            let snap = snapshot.val();
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                item_key = key;
                var childData = childSnapshot.val();

                //console.log(childData);
                document.getElementById("editModel").value = childData.carModel;
                document.getElementById("editCarMaker").value = childData.carMaker;
                document.getElementById("editMakeYear").value = childData.makeYear;
                document.getElementById("editSeats").value = childData.seats;
                document.getElementById("editPricePerDay").value = childData.dailyCharges;
                document.getElementById("editRentedDateFrom").value = childData.fromDate;
                document.getElementById("editRentedDateTo").value = childData.toDate;
                document.getElementById("editImage").value = childData.image;

                $(".dropdown-menu li a").click(function () {
                    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
                    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
                });
            });
        });
    } //if ends
    else if (sessionStorage.vehicleCatagory === "suv") {
        let edit_id = database.ref('/suvs').child(sessionStorage.item_id);
        //console.log("sessionstorage = ", edit_id.key);
        database.ref('/suvs').orderByKey().equalTo(edit_id.key).on("value", function (snapshot) {
            let snap = snapshot.val();
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                item_key = key;
                var childData = childSnapshot.val();

                //console.log(childData);
                document.getElementById("editModel").value = childData.carModel;
                document.getElementById("editCarMaker").value = childData.carMaker;
                document.getElementById("editMakeYear").value = childData.makeYear;
                document.getElementById("editSeats").value = childData.seats;
                document.getElementById("editPricePerDay").value = childData.dailyCharges;
                document.getElementById("editRentedDateFrom").value = childData.fromDate;
                document.getElementById("editRentedDateTo").value = childData.toDate;
                document.getElementById("editImage").value = childData.image;

                $(".dropdown-menu li a").click(function () {
                    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
                    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
                });
            });
        });
    }// else if ends
    else if (sessionStorage.vehicleCatagory === "sedan") {
        let edit_id = database.ref('/sedan').child(sessionStorage.item_id);
        //console.log("sessionstorage = ", edit_id.key);
        database.ref('/sedan').orderByKey().equalTo(edit_id.key).on("value", function (snapshot) {
            let snap = snapshot.val();
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                item_key = key;
                var childData = childSnapshot.val();

                //console.log(childData);
                document.getElementById("editModel").value = childData.carModel;
                document.getElementById("editCarMaker").value = childData.carMaker;
                document.getElementById("editMakeYear").value = childData.makeYear;
                document.getElementById("editSeats").value = childData.seats;
                document.getElementById("editPricePerDay").value = childData.dailyCharges;
                document.getElementById("editRentedDateFrom").value = childData.fromDate;
                document.getElementById("editRentedDateTo").value = childData.toDate;
                document.getElementById("editImage").value = childData.image;

                $(".dropdown-menu li a").click(function () {
                    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
                    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
                });
            });
        });
    }//else if ends
});

/* Update data in the database.*/
$("#editVanDetail").on('click', function (event) {
    event.preventDefault();
    const model = $("#editModel").val();
    const year = $("#editMakeYear").val();
    const image = $("#editImage").val();
    const maker = $("#editCarMaker").val();
    const seats = $("#editSeats").val();
    const pricePerDay = $("#editPricePerDay").val();
    const rentedDateFrom = $("#editRentedDateFrom").val();
    const rentedDateTo = $("#editRentedDateTo").val();

    const status = document.querySelector('#select1').value;
    console.log("EDIT:", model, year, image, status, maker, seats, pricePerDay, rentedDateFrom, rentedDateTo);
    //console.log("ref=",'/vans/'+item_key);

    //validate edit input fields
    if (!model ||
        !maker ||
        !seats ||
        !pricePerDay ||
        !rentedDateTo ||
        !rentedDateFrom ||
        !image) {
        alert("Please fill out all the fields!");
    }
    else {
        if (sessionStorage.vehicleCatagory === "van") {
            console.log("here 1");
            database.ref('/vans/' + item_key).update({
                carMaker: maker,
                carModel: model,
                makeYear: year,
                seats: seats,
                dailyCharges: pricePerDay,
                fromDate: rentedDateFrom,
                toDate: rentedDateTo,
                image: image,
                status: status
            });
            window.location.href = "./van.html";
        }
        else if (sessionStorage.vehicleCatagory === "suv") {
            console.log("here 2");
            database.ref('/suvs/' + item_key).update({
                carMaker: maker,
                carModel: model,
                makeYear: year,
                seats: seats,
                dailyCharges: pricePerDay,
                fromDate: rentedDateFrom,
                toDate: rentedDateTo,
                image: image,
                status: status
            });
            window.location.href = "./suv.html";
        }
        else if (sessionStorage.vehicleCatagory === "sedan") {
            console.log("here 3");
            database.ref('/sedan/' + item_key).update({
                carMaker: maker,
                carModel: model,
                makeYear: year,
                seats: seats,
                dailyCharges: pricePerDay,
                fromDate: rentedDateFrom,
                toDate: rentedDateTo,
                image: image,
                status: status
            });
            window.location.href = "./sedan.html";
        }
    }
});
