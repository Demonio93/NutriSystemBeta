(function () {
    var formulario=document.getElementById('formulario');
    var decide=document.getElementById('CRegistrar').value;
    var url='https://nutrisystem.000webhostapp.com/php/';
        if (decide==='RegUsu') {
            url+='RegUsu.php';
        }
       else if (decide==='RegPac') {
            url+='RegPac.php';
            //agregar a datos el id usuario
        }
        else if (decide==='RegCon') {
            url+='RegCon.php';
            //agregar a datos el id usuario
        }
        else if (decide==='RegRec') {
            url+='RegRec.php';
            //agregar a datos el id usuario
        }
        else if (decide==='RegAnot') {
            url+='RegAnot.php';
             //agregar a datos el id usuario
        }
        else{
            url='';
            showMessage('Error al insertar', 'danger');
        }
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        var datos=new FormData(formulario);
        fetch(url,{
            method: 'POST',
            body: datos
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
                    sessionStorage.setItem('IdR', respuesta.IdR);
                    self.location='../html/Receta.html';
                }
                url='../php/';
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