(function(){
try {
    var email=sessionStorage.getItem("User");
        var Usuario=sessionStorage.getItem("Usuario");
        $(document).on('click', '#btnElimina', function (e) {
            e.preventDefault();
            var url='https://nutrisystem.000webhostapp.com/php/';
            var pagina='../html/';
            if (confirm('¿Estas seguro que quieres eliminar esto?')) {
            var datos=new FormData();
            if($("#btnElimina").attr('name')==='Paciente'){
                url+='BajaPac.php';
                datos.append('IDRe', sessionStorage.getItem('IdHP'));
                pagina+='verMPac.html';
            }else if ($("#btnElimina").attr('name')==='Consulta') {
                url+='EliminaCon.php'
                datos.append('Consulta', sessionStorage.getItem('IdC'));
                datos.append('RUC', sessionStorage.getItem('IdUC'));
                datos.append('RPC', sessionStorage.getItem('IdPC'));
                pagina+='NotasConsulta.html';
            }
            datos.append('email', email);
            datos.append('Usuario', Usuario);
            fetch(url,{
                method: 'POST',
                body: datos
            }).then(res=>{
                // console.log(res);
                if (res.ok) {
                    // console.log(res.text());
                    return res.json();
                } else {
                    throw 'Error al Insertar'
                }
            } )
            .then(respuesta=>{
                console.log(respuesta);
                if (respuesta.success==1) {
                    url='https://nutrisystem.000webhostapp.com/php/';
                    if($("#btnElimina").attr('name')==='Paciente'){
                        sessionStorage.setItem('estatus', 'Inactivo');
                    }
                    showMessage(respuesta.message, 'success');
                    self.location=pagina;
                }else{
                    showMessage(respuesta.message, 'danger');
                }
            })
            .catch(error=>{
                showMessage(error, 'danger');
                console.log(error);
            });
            }
           });
           function showMessage(message, cssClass){
            const div=document.createElement('div');
            div.className=`alerta alert-${cssClass} m-2`;
            div.appendChild(document.createTextNode(message));
            const contenedor=document.querySelector('#aviso');
            contenedor.appendChild(div);
            setTimeout(function () {
                document.querySelector('.alerta').remove();
            }, 3000);
        }
} catch (error) {
    console.log('error de estatus');
    console.error();
}
}());