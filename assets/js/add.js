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
        const addModel = $("#addModel").val();
        const addMakeYear = $("#addMakeyear").val();
        const addImage = $("#addImage").val();

        const addCarMaker = $("#addCarMaker").val();
        const addSeats= $("#addSeats").val();
        const addDailyCharges = $("#addDailyCharges").val();
        const rentedFromDate = $("#addFromDate").val();
        const rentedToDate = $("#addToDate").val();

        //console.log(addModel,addMakeYear,addImage);
        //console.log(addCarMaker,addSeats,addDailyCharges,rentedFromDate,rentedToDate);
        //validate all the input fields
        if(!addModel||
            !addCarMaker ||
            !addSeats ||
            !addDailyCharges ||
            !rentedToDate ||
            !rentedFromDate||
            !addImage)
            {
                alert("Please fill out all the fields!");
            }
            else{
                var vehicleCatagory = sessionStorage.vehicleCatagory;
                //console.log("vehicleCatagory=",vehicleCatagory);
                if(vehicleCatagory === "van"){
                    database.ref('/vans').push({
                        carMaker:addCarMaker,
                        carModel:addModel,
                        makeYear:addMakeYear,
                        seats:addSeats,
                        dailyCharges:addDailyCharges,
                        fromDate:rentedFromDate,
                        toDate:rentedToDate,
                        image:addImage,
                        status: "available"
                    });
                    window.location.href="./van.html";    
                }
                else if(vehicleCatagory === "suv"){
                    database.ref('/suvs').push({
                        carMaker:addCarMaker,
                        carModel:addModel,
                        makeYear:addMakeYear,
                        seats:addSeats,
                        dailyCharges:addDailyCharges,
                        fromDate:rentedFromDate,
                        toDate:rentedToDate,
                        image:addImage,
                        status: "available"
                    });
                    window.location.href="./suv.html";    
                }
                else if(vehicleCatagory === "sedan"){
                    database.ref('/sedan').push({
                        carMaker:addCarMaker,
                        carModel:addModel,
                        makeYear:addMakeYear,
                        seats:addSeats,
                        dailyCharges:addDailyCharges,
                        fromDate:rentedFromDate,
                        toDate:rentedToDate,
                        image:addImage,
                        status: "available"
                    });
                    window.location.href="./sedan.html";    
                }
            }
    });
});