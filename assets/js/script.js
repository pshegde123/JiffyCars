$(document).ready(function () {
    $('#btnCheckFleet').on('click', function (event) {
        event.preventDefault();
        window.location.href="fleet.html";
    });

    $('#submit').on('click',function(event){
        var fname = $('#firstname').val();
        alert("We will get back to you!");
    })

    $('#btn-van').on('click',function(){
        window.location.href="van.html"
    });
    $('#btn-suv').on('click',function(){
        window.location.href="suv.html"
    });
    $('#btn-sedan').on('click',function(){
        window.location.href="sedan.html"
    });
});