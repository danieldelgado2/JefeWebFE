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
        const $error_permiso = $("#error_permiso");
        const $empty = $("#campos_vacios");

        $("#acceder").click(function (e) {

            //Valores ingresados por el usuario
            const $username = $("#username").val().trim();
            const $password = $("#password").val().trim();

            //Se ocultan todos los errores
            $error.addClass('d-none');
            $errorbd.addClass('d-none');
            $error_permiso.addClass('d-none');
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

                        if (data==null) {
                            $error.toggleClass('d-none');
                        } else if(data.tipo != "jefe"){
                            $error_permiso.toggleClass('d-none');
                        } else {
                            localStorage.setItem("nombre", data.nombre);
                            localStorage.setItem("email", data.email);
                            localStorage.setItem("apellidos", data.apellidos);
                            localStorage.setItem("login", data.login);   
                            window.location.href = "dashboard.html";
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