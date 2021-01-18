const Index = function(){

    const handler = function (json) {
        _login();
    };

    const _login = function(){

        $("#acceder").click(function(e){
            // e.preventDefault();
    
            const $username = $("#username").val().trim();
            const $password = $("#password").val().trim();
            const $error = $("#error");
            const $errorbd = $("#errorbd");
            const $empty = $("#campos_vacios");
    
            if( $username != "" && $password != "" ){
                $.ajax({
                    url: 'https://localhost:44349/login',
                    dataType: 'json',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({login:$username,password:$password}),
                    success: function(data, status){
                        //alert("Data: " + data + "\nStatus: " + status);
                        if(data){ 
                            window.location.href = "resumen_ventas.html";
                        } else {
                            $error.css("display","block");
                        }
                        
                    }                
                }).fail( function( jqXHR, textStatus, errorThrown ) {
                    $errorbd.css("display","block");
                });
            }else {
                $empty.css("display","block");
            }
        });
    }

    return {
        init: function () {
            handler();
        },
    };
}();