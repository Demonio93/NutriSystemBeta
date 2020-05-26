$(document).ready(function(){
    $('#pass2').keyup(function(){
    var pass1 = $('#pass1').val();
    var pass2 = $('#pass2').val(); 

    if (pass1==pass2){
        $('#error2').text("Coinciden").css("color","green");
    }else{
        $('#error2').text("No Coinciden").css("color","red");
    }
    if(pass2==""){
        $('#error2').text("No se puede dejar en blanco").css("color","red");
    }
    
    });
});