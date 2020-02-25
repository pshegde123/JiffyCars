$(document).ready(function () {
    $('#btnCheckFleet').on('click', function (event) {
        event.preventDefault();
        window.location.href="fleet.html";
    });

    $('#submit').on('click',function(event){
        var fname = $('#firstname').val();
        alert("We will get back to you!");
    })
});