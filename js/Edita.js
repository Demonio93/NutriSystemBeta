(function () {
    var email=sessionStorage.getItem("User");
    var Usuario=sessionStorage.getItem("Usuario");
    var formulario=document.getElementById('formulario');
    var decide=document.getElementById('CEditar').value;
    mostrar();
    var url='https://nutrisystem.000webhostapp.com/php/', dato;
    // var datos=new FormData(formulario);
    if (decide==='EdPac') {
        // datos.append('IDRe', sessionStorage.getItem('IdHP'));
        dato=sessionStorage.getItem('IdHP');
        url+='EdPac.php';
    }
    else if(decide==='EdCon'){
        // console.log(decide);
        dato=sessionStorage.getItem('IdC');
        url+='EdCon.php';
    }
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        var datos=new FormData(formulario);
        datos.append('ID', dato);
        datos.append('email', email);
        datos.append('Usuario', Usuario);
        fetch(url,{
            method: 'POST',
            body: datos
        }).then(res=>{
            if (res.ok) {
                return res.json();
            } else {
                throw 'Error al Insertar'
            }
        } )
        .then(respuesta=>{
            // console.log(respuesta);
            formulario.reset();
            if (respuesta.success==1) {
                url='https://nutrisystem.000webhostapp.com/php/';
                mostrar();
                showMessage(respuesta.message, 'success');
            }else{
                showMessage(respuesta.message, 'danger');
            }
                
            // self.location='../index.html';
        })
        .catch(error=>{
            showMessage(error, 'danger');
            console.log(error);
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
    function mostrar() {
        var decide=document.getElementById('CEditar').value;
        var datos=new FormData();
        datos.append('email', email);
        datos.append('Usuario', Usuario);
        var url='https://nutrisystem.000webhostapp.com/php/', dato, b;
        if (decide==='EdPac') {
            dato=sessionStorage.getItem('IdHP');
            url+='UnPaciente.php';
            b=1;
        }
        else if(decide==='EdCon'){
            dato=sessionStorage.getItem('IdUC');
            url+='UnConsulta.php';
            b=2;
        }
            if (b==1) {
                datos.append('IDRe', dato);
            }else{
                datos.append('IDUC', dato);
            }
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
                // console.log(respuesta);
                // formulario.reset();
                if (respuesta.success==1) {
                    url='../php/';
                    if (b==1) {
                        mostrarP(respuesta);
                    }else{
                      mostrarC(respuesta);
                    }
                }else{
                    showMessage(respuesta.message, 'danger');
                }
                    
                // self.location='../index.html';
            })
            .catch(error=>{
                showMessage(error, 'danger');
                console.log(error);
            });
    }
           function  mostrarP(respuesta) {
                document.getElementById('NameP').textContent="Editar datos de: "+respuesta.nombre_P;
                document.getElementById('edad').value=respuesta.edad;
                document.getElementById('peso').value=respuesta.peso;
                document.getElementById('estatura').value=respuesta.estatura;
                document.getElementById('talla').value=respuesta.talla;
                document.getElementById('correo').value=respuesta.email_P;
                document.getElementById('estadoC').value=respuesta.estadoC;
                document.getElementById('numeroT').value=respuesta.telefono;
                
            }
           function  mostrarC(respuesta){
                document.getElementById('NombreP').value=respuesta.nombre_P+" "+respuesta.APT_P+" "+respuesta.APM_P;
                document.getElementById('anotacionesC').value=respuesta.Consulta;
            }
}());