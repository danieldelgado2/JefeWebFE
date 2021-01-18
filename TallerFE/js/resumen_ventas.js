var Ventas = function(){

    var handler = function (json) {
        _listado();
        _limpiarFiltros();
        _controlFiltros();
    };

    var _tablaCheck = function(){

        if($('.columnita').length == 0){
            $("#no-result").css("display","block");
        }else{
            $("#no-result").css("display","none");
        }
    }

    var _listado = function(){

        $.ajax({
            url: 'https://localhost:44349/venta',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function(data, status){
                //Por cada elemento dentro del array data, varruye una fila (tr)
                //y añade celdas con los campos de cada elemento del array.
                $.each(data, function(i, item) {
                        var $div = $('<div class="row resultadito">').append(
                            // $('<div class="col m-2">').text(item.login),
                            $('<div class="col m-2 columnita">').text(item.nombre),
                            $('<div class="col m-2 columnita">').text(item.apellidos),
                            $('<div class="col m-2 columnita">').text(item.email),
                            $('<div class="">'),
                            $('<div class="col m-2 columnita">').text(item.importe + "€"),
                           $('<div class="col m-2 columnita">') 
                            ); 
                            $('.resultados').append($div);
                    });
                    _tablaCheck();
                }
            }).fail( function( jqXHR, textStatus, errorThrown ) {
                $("#errorbd").css("display","block"); 
            });
        }
        
    var _limpiarFiltros = function(){
        var $filter = $('#limpiar_filtros');
        var $input = $('input');

        $filter.on('click',function(){

            $input.val('').trigger('keyup');
             
         });
    }

    var _controlFiltros = function(){
        $('.filterable .filters input').keyup(function(e){
            /* Ignore tab key */
            var code = e.keyCode || e.which;
            if (code == '9') return;
            /* Useful DOM data and selectors */
            var $input = $(this),
            inputContent = $input.val().toLowerCase(),
            $panel = $input.parents('.filterable'),
            column = $panel.find('.filters div').index($input.parents('div')),
            $tabla = $panel.find('.resultados'),
            $rows = $tabla.find('.resultadito');
            /* Dirtiest filter function ever ;) */
            var $filteredRows = $rows.filter(function(){
                var value = $(this).find('.columnita').eq(column).text().toLowerCase();
                return value.indexOf(inputContent) === -1;
            });
            /* Clean previous no-result if exist */
            $tabla.find('.no-result').remove();
            /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
            $rows.show();
            $filteredRows.hide();
            /* Prepend no-result row if all rows are filtered */
            if ($filteredRows.length === $rows.length) {
                $("#no-result").css("display","block");
            }else{
                $("#no-result").css("display","none");
            }
        });
    }

    return {
        init: function () {
            handler();
        },
    };
}();





