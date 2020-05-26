(function (){
    var CVM=document.getElementById('CVM').value;
    if (CVM==='HPaciente') {
        // sessionStorage.setItem('estatus', '');
        // console.log(sessionStorage.getItem('estatus'));
        VerPaciente();
    }
    else if(CVM==='VMConsultas'){
        VerConsulta();
    }
    else if(CVM==='VMRecetas'){
        VerReceta();
    }
    else{
        showMessage('Error de consulta', 'danger');
    }
    function showMessage(message, cssClass){
        let div=document.createElement('div');
        div.className=`alerta alert-${cssClass} m-2`;
        div.appendChild(document.createTextNode(message));
        let contenedor=document.querySelector('#aviso');
        contenedor.appendChild(div);
        setTimeout(function () {
            document.querySelector('.alerta').remove();
        }, 3000);
    }
    function VerPaciente() {
        var datos=new FormData();
        datos.append('IDRe', sessionStorage.getItem('IdHP'));
        fetch('https://nutrisystem.000webhostapp.com/php/UnPaciente.php', {
            method: 'POST',
            body: datos
        }).then(
            res=>{
if (res.ok) {
    return res.json();
}else{
    throw 'No se pudo obtener la busqueda';
}
            }
        ).then(paciente=>{
            // console.log(respuesta);
                var template = '';
                    // console.log(task.nombre_P);  Id_Usu_Pac <img class="imag-fluid m-3" src="../Imagenes/paciente.jpg" width="18%" height="18%">
                    if(paciente.success==1){
                        sessionStorage.setItem('estatus', paciente.status);
                        // console.log(sessionStorage.getItem('estatus'));
                        template+=`
                        <h1 id="PacienteName">${paciente.nombre_P}</h1>
                        <div class="container table-responsive">
                         <table class="table table-striped table-bordered table-hover">
                             <tr class="active">
                                 <th>Nombre</th>
                                 <td>${paciente.nombre_P} ${paciente.APT_P} ${paciente.APM_P}</td>
                             </tr>
                             <tr>
                                 <th>Edad</th>
                                 <td>${paciente.edad}</td>
                             </tr>
                             <tr>
                                 <th>Peso</th>
                                 <td>${paciente.peso} kg</td>
                             </tr>
                             <tr>
                                 <th>Estatura</th>
                                 <td>${paciente.estatura} m</td>
                             </tr>
                             <tr>
                                 <th>Talla</th>
                                 <td>${paciente.talla}</td>
                             </tr>
                             <tr>
                                 <th>Email</th>
                                 <td>${paciente.email_P}</td>
                             </tr>
                             <tr>
                                 <th>Estado Civil</th>
                                 <td>${paciente.estadoC}</td>
                             </tr>
                             <tr>
                                 <th>Numero Telefonico</th>
                                 <td>${paciente.telefono}</td>
                             </tr>
                             <tr>
                                 <th>Genero</th>
                                 <td>${paciente.genero}</td>
                             </tr>
                             <tr>
                                 <th>Fecha de Nacimiento</th>
                                 <td>${paciente.fecha_P}</td>
                             </tr>
                             <tr>
                                 <th>Estatus</th>
                                 <td>${paciente.status}</td>
                             </tr>
                         </table>
                     </div>
                        `;
                        Desactivar();
                    }else{
                        template+="El Paciente No existe";
                    }
                // $('#tasks').html(template); verMPac.html
                document.getElementById('tasks').innerHTML=template;
            // self.location='../index.html';
        })
        .catch(error=>{
            showMessage(error, 'danger');
            console.log(error);
        });
    }
    function VerConsulta() {
        var datos=new FormData();
        sessionStorage.setItem('ID','botonPa');
        datos.append('IDPC', sessionStorage.getItem('IdPC'));
        datos.append('IDUC', sessionStorage.getItem('IdUC'));
        // console.log(sessionStorage.getItem('IdUC'));
        fetch('https://nutrisystem.000webhostapp.com/php/UnConsulta.php', {
            method: 'POST',
            body: datos
        }).then(
            res=>{
if (res.ok) {
    return res.json();
}else{
    throw 'No se pudo obtener la busqueda';
}
            }
        ).then(consulta=>{
            var template = '';
            // console.log(respuesta);
                    if(consulta.success==1){
                        sessionStorage.setItem('IdHP', consulta.IdP);
                        sessionStorage.setItem('estatus', consulta.status);
                        // console.log(sessionStorage.getItem('IdHP'));
                        template+=`
                        <h1>Consulta Numero: ${sessionStorage.getItem('IdC')}</h1>
                        <h2>${consulta.nombre_P} ${consulta.APT_P} ${consulta.APM_P}</h2>
                        <h5>${consulta.fecha_C} / ${consulta.hora_C}hrs.</h5>
                        <img class="imag-fluid m-3" src="../Imagenes/paciente.jpg" width="18%" height="18%">
                        <textarea class="form-control" name="AnotacionesC" readonly rows="7" id="AnotacionesC" placeholder="Observaciones">
                            ${consulta.Consulta}
                        </textarea>
                        `;
                    }else{
                        template+="La consulta No existe";
                    }
                document.getElementById('tasks').innerHTML=template;
        })
        .catch(error=>{
            showMessage(error, 'danger');
            console.log(error);
        });
    }
    function VerReceta() {
        var datos=new FormData();
        datos.append('IDR', sessionStorage.getItem('IdR'));
        fetch('https://nutrisystem.000webhostapp.com/php/UnReceta.php', {
            method: 'POST',
            body: datos
        }).then(
            res=>{
if (res.ok) {
    return res.json();
}else{
    throw 'No se pudo obtener la busqueda';
}
            }
        ).then(receta=>{
                var template = '';
                    if(receta.success==1){
                        template+=`
                        <img class="imag-fluid m-3 d-inline" src="../Imagenes/ManzanaAzul.png" width="5%" height="5%">
                        <h1 class="d-inline"> Receta Medica </h1>
                        <img width="5%" height="5%"  src="../Imagenes/nutricion1.png " class="imag-fluid" alt="Responsive image">
                        <div class="datosPacienteR">
                        <img class="imag-fluid d-inline" src="../Imagenes/herramientaD.png" width="2%" height="5%">
                        <h2 class="d-inline">Nutriologo: ${receta.nombre} ${receta.APT} ${receta.APM}</h2>
                        <h5>Cedula No.: ${receta.cedula}</h5>
                        <h5>Receta No.: ${sessionStorage.getItem('IdR')}</h5>
                        <h4>Datos del paciente</h4>
                        <h3>Nombre: ${receta.APT_P} ${receta.APM_P} ${receta.nombre_P}</h3>
                        <h5>Peso: ${receta.peso}kg      Estatura: ${receta.estatura}m   Talla: ${receta.talla}</h5>
                        <h5>Fecha: ${receta.fecha_R}   Hora: ${receta.hora_R}.</h5>
                        <hr>
                        </div>
                        <div class="textoR">
                            ${receta.Receta}
                            </div>
                            <div class="Firma">
                            ______________________________________<br>
                                            firma
                            </div>
                            <div class="pieRe">
                            <img width="10%" height="7%"  src="../Imagenes/NutriSystem.png" class="imag-fluid" alt="Responsive image">
                            </div>
                        `;
                    }else{
                        template+="La consulta No existe";
                    }
                document.getElementById('tasks').innerHTML=template;
            // self.location='../index.html';
        })
        .catch(error=>{
            showMessage(error, 'danger');
            console.log(error);
        });
    }
    function Desactivar() {
        if (sessionStorage.getItem('estatus')==='Inactivo') {
            document.getElementById('opc').remove();
           var template2=`
            <div id="opc">
        <a name="Paciente" id="btnAltaPac" class="btn btn-warning d-block m-1" href="#"><i><img class="imag-fluid" src="../Imagenes/ManzanaVerde.png" width="30px" height="30px"></i> Dar de  Alta</a>
        </div>
            `;
            document.getElementById('ContOpciones').innerHTML=template2;
            document.getElementById("btnAltaPac").addEventListener('click', function (e) {
                e.preventDefault();
                if (confirm('¿Estas seguro que quieres dar de alta al paciente?')) {
                    var datos=new FormData();
                    datos.append('IDRe', sessionStorage.getItem('IdHP'));
                    var pagina='../html/verMPac.html';
                    fetch('https://nutrisystem.000webhostapp.com/php/AltaPac.php',{
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
                            showMessage(respuesta.message, 'success');
                            sessionStorage.setItem('estatus', 'Activo');
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
        }
    }
} ());