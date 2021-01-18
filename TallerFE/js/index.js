$(document).ready(function(){


    $("#acceder").click(function(e){
        // e.preventDefault();

        var username = $("#username").val().trim();
        var password = $("#password").val().trim();

        if( username != "" && password != "" ){
            $.ajax({
                url: 'https://localhost:44349/login',
                dataType: 'json',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({login:username,password:password}),
                success: function(data, status){
                    //alert("Data: " + data + "\nStatus: " + status);
                    if(data){ 
                        window.location.href = "resumen_ventas.html";
                    } else {
                        $("#error").css("display","block");
                    }
                }                
            }).fail( function( jqXHR, textStatus, errorThrown ) {
                $("#errorbd").css("display","block");
            });
        } else {
            $('#campos_vacios').css("display","block");
        }
    });
});