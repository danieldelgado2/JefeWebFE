/*
Please consider that the JS part isn't production ready at all, I just code it to show the concept of merging filters and titles together !
*/
$(document).ready(function(){

    $.ajax({
        url: 'https://localhost:5001/venta',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function(data, status){
            //Por cada elemento dentro del array data, construye una fila (tr)
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
        }
    });

    $('#limpiar_filtros').on('click',function(){

       $('input').val('');
       $('.filterable .filters input').trigger('keyup'); 
        
    });




    $('.filterable .btn-filter').click(function(){
        var $panel = $(this).parents('.filterable'),
        $filters = $panel.find('.filters input'),
        $tbody = $panel.find('.tabla tbody');
        if ($filters.prop('disabled') == true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
    });

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
            $tabla.find('.filterable').prepend($('<div class="col m-2 columnita no-result text-center">Sin coincidencias</div>'));
        }
    });
});