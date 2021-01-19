const Ventas = function () {

    const handler = function (json) {
        _listado();
        _limpiarFiltros();
        _controlFiltros();
    };

    /*
    *Control de que haya resultados en la tabla
    */
    const _tablaCheck = function () {

        const $empty = $("#no-result");

        if ($('.columnita').length == 0) {
            $empty.removeClass("d-none");
        } else {
            $empty.addClass("d-none");
        }
    }

    /*
    * Devuelve un listado de las ventas
    */
    const _listado = function () {

        const $errorbd = $("#errorbd");
        const $results = $('.resultados');

        $.ajax({
            url: 'https://localhost:5001/venta',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function (data, status) {
                //Por cada elemento dentro del array data, varruye una fila (tr)
                //y añade celdas con los campos de cada elemento del array.
                $.each(data, function (i, item) {

                    const $div = $('<div class="row resultadito">').append(
                        $('<div class="col m-2 columnita">').text(item.nombre),
                        $('<div class="col m-2 columnita">').text(item.apellidos),
                        $('<div class="col m-2 columnita">').text(item.email),
                        $('<div class="">'),
                        $('<div class="col m-2 columnita">').text(item.importe + "€"),
                        $('<div class="col m-2 columnita"><button class="btn btn-info">Ver empleado</button>"')
                    );

                    $results.append($div);
                });
                _tablaCheck();
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $errorbd.removeClass("d-none");
        });
    }

    /*
    * Vacia todos los filtros
    */
    const _limpiarFiltros = function () {
        const $filter = $('#limpiar_filtros');
        const $input = $('input');

        $filter.on('click', function () {

            $input.val('').trigger('keyup');

        });
    }

    /*
    * Controlador de los filtros
    */
    const _controlFiltros = function () {

        const $empty = $("#no-result");
        $('.filterable .filters input').keyup(function (e) {

            /* Ignorar tabulador */
            const code = e.keyCode || e.which;
            if (code == '9') return;

            /* selectores */
            const $input = $(this),
                inputContent = $input.val().toLowerCase(),
                $panel = $input.parents('.filterable'),
                column = $panel.find('.filters div').index($input.parents('div')),
                $tabla = $panel.find('.resultados'),
                $rows = $tabla.find('.resultadito');

            /* Filtro pocho  */
            const $filteredRows = $rows.filter(function () {
                const value = $(this).find('.columnita').eq(column).text().toLowerCase();
                return value.indexOf(inputContent) === -1;
            });

            /* limpiar error */
            $tabla.find('.no-result').addClass("d-none");

            /* Muestra las filas y oculta las filtradas */
            $rows.show();
            $filteredRows.hide();

            /* Checkeo de si esta vacio */
            if ($filteredRows.length === $rows.length) {
                $empty.removeClass("d-none");
            } else {
                $empty.addClass("d-none");
            }
        });
    }

    

    return {
        init: function () {
            handler();
        },
    };
}();

function volver(){
    window.location.href = "dashboard.html";
}

function logOut(){
    window.location.href = "index.html";
}




