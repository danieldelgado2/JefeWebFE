const Index = function () {

    const handler = function (json) {
        _login();
    };

    /*
    * Control del login
    */
    const _login = function () {
        //Divs de errores
        const $error = $("#error");
        const $errorbd = $("#errorbd");
        const $empty = $("#campos_vacios");

        $("#acceder").click(function (e) {

            //Valores ingresados por el usuario
            const $username = $("#username").val().trim();
            const $password = $("#password").val().trim();

            //Se ocultan todos los errores
            $error.addClass('d-none');
            $errorbd.addClass('d-none');
            $empty.addClass('d-none');
            
            //Comprobación de que no esten vacios los campos
            if ($username != "" && $password != "") {
                $.ajax({
                    url: 'https://localhost:5001/login',
                    dataType: 'json',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({ login: $username, password: $password }),
                    success: function (data, status) {
                        
                        if (data) {
                            window.location.href = "resumen_ventas.html";
                        } else {
                            $error.toggleClass('d-none');
                        }

                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    $errorbd.toggleClass('d-none');
                });
            } else {
                $empty.toggleClass('d-none');
            }
        });
    }

    return {
        init: function () {
            handler();
        },
    };
}();