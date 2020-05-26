(function(){
    fetch("https://nutrisystem.000webhostapp.com/php/Cerrar_Sesion.php",{
        method: 'GET'
    }).then(res=>{
        // console.log(res);
        if (res.ok) {
            // console.log(res.text());
            return res.json();
            // return res;
        } else {
            throw 'Error al Insertar'
        }
    } )
    .then(respuesta=>{
        // console.log(respuesta);
        formulario.reset();
        if (respuesta.success==1) {
            if (respuesta.IdR!=null) {
                sessionStorage.removeItem('User');
                self.location='../';
            }
            showMessage(respuesta.message, 'success');
        }else{
            showMessage(respuesta.message, 'danger');
        }
            
        // self.location='../index.html';
    })
    .catch(error=>{
        showMessage(error, 'danger');
        // console.log(error);
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
}());