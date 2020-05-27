(function(){
    var buscar=document.getElementById('search').value;
    var url='';
    if(buscar==='IniSes'){
        var formulario=document.getElementById('formulario');
        formulario.addEventListener('submit',function (e) {
            e.preventDefault();
            var datos=new FormData(formulario);
            url='https://nutrisystem.000webhostapp.com/php/IniciarSesion.php';
            fetch(url,{
                method: 'POST',
                body: datos
            }).then(res=>{
                if (res.ok) {
                    return res.json();
                } else {
                    throw 'Usuario o Contraseña incorrectos';
                }
            } )
            .then(respuesta=>{
                console.log(respuesta);
                if(respuesta.success==1){
                    formulario.reset();
                sessionStorage.setItem("User", respuesta.email);
                sessionStorage.setItem("Usuario", respuesta.Id_Usuario);
                self.location='html/inicio.html';
                }else{
                    showMessage(respuesta.message, 'danger');
                    formulario.reset();
                }
                // self.location='../index.html';
            })
            .catch(error=>{
                showMessage(error, 'danger');
                console.log(error);
            });
        });
    }
    else{
        NoBusacar();
        function NoBusacar() {
            if(buscar==='histo'){
                MostrarHistorial();
            }
            else if(buscar==='consul'){
                MostrarConsulta();
            }
            else if (buscar==='rec') {
                MostrarRecetas();
            }
            else if(buscar==='VMConsultas'){
                MostrarCUP();
            }
        }
        function SiBuscar(valor) {
            if(buscar==='histo'){
                MostrarHistorialCV(valor);
            }
            else if(buscar==='consul'){
                MostrarConsultaCV(valor);
            }
            else if (buscar==='rec') {
                MostrarRecetasCV(valor);
            }
            else if(buscar==='VMConsultas'){
                MostrarCUPCV(valor);
            }
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
        function MostrarHistorialCV(valor) {
            var datos=new FormData();
        datos.append('consulta', valor);
        datos.append('email', sessionStorage.getItem('User'));
        datos.append('Usuario', sessionStorage.getItem('Usuario'));
            fetch('https://nutrisystem.000webhostapp.com/php/ShH.php', {
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
            ).then(respuesta=>{
            //    var count=Object.keys(respuesta).length;
            //     console.log(count);
               var template = '';
                if(respuesta.success==0){
                    template+='No hay Coincidencias :(';
                }else{
                    respuesta.forEach(task=>{
                        // console.log(task.nombre_P);  Id_Usu_Pac
                        template+=`
                        <tr idP="${task.Id_Pacientes}" idRU="${task.Id_Usu_Pac}">
                            <td name="nombreP">${task.nombre_P} ${task.APT_P}</td>
                            <td >${task.edad}</td>
                            <td >${task.status}</td>
                            <td><a class="btnVMH btn btn-outline-dark" href="verMPac.html"> Ver mas <i><img class="imag-fluid" src="../Imagenes/vermas.png" width="20px" height="20px"></i></a></td>
                            </tr>
                        `;
                    });
                 }
                document.getElementById('tasks').innerHTML=template;
            })
            .catch(error=>{
                showMessage(error, 'danger');
                console.log(error);
            });
        }
        function MostrarHistorial() {
            // sessionStorage.removeItem('estatus')
            var datos=new FormData();
            datos.append('email', sessionStorage.getItem('User'));
            datos.append('Usuario', sessionStorage.getItem('Usuario'));
            fetch('https://nutrisystem.000webhostapp.com/php/ShHisto.php', {
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
            ).then(respuesta=>{
                // console.log(respuesta);
                    var template = '';
                    respuesta.forEach(task=>{
                        // console.log(task.nombre_P);  Id_Usu_Pac
                        template+=`
                        <tr idP="${task.Id_Pacientes}" idRU="${task.Id_Usu_Pac}">
                            <td name="nombreP">${task.nombre_P} ${task.APT_P}</td>
                            <td >${task.edad}</td>
                            <td >${task.status}</td>
                            <td><a class="btnVMH btn btn-outline-dark" href="verMPac.html"> Ver mas <i><img class="imag-fluid" src="../Imagenes/vermas.png" width="20px" height="20px"></i></a></td>
                            </tr>
                        `;
                    });
                    // $('#tasks').html(template); verMPac.html
                    document.getElementById('tasks').innerHTML=template;
                // self.location='../index.html';
            })
            .catch(error=>{
                showMessage(error, 'danger');
                console.log(error);
            });
        }
        $(document).on('click', '.btnVMH', function (e) {
        //    e.preventDefault();
           let element =$(this)[0].parentElement.parentElement;
        //    console.log(element);
                    let idR=$(element).attr('idRU');
                    let idU=$(element).attr('idP');
                    sessionStorage.setItem('IdHR', idR);
                    sessionStorage.setItem('IdHP', idU);
                    // console.log(sessionStorage.getItem('IdHR'));
                    // console.log(sessionStorage.getItem('IdHP'));
           });
           function MostrarConsultaCV(valor){
            var datos=new FormData();
        datos.append('consulta', valor);
        datos.append('email', sessionStorage.getItem('User'));
        datos.append('Usuario', sessionStorage.getItem('Usuario'));
            fetch('https://nutrisystem.000webhostapp.com/php/ShC.php', {
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
            ).then(respuesta=>{
                var count=Object.keys(respuesta).length;
                //     console.log(count);
                // console.log(respuesta);
                    var template = '';
                if(respuesta.success==0 || count<=0){
                    template+='No hay Coincidencias :(';
                }else{
                    respuesta.forEach(task=>{
                        // console.log(task.nombre_P);  taskIdRU="${task.Id_Usu_Con}" taskIdRP="${task.Id_Rel_Pac_Con}"
                        template+=`
                        <tr taskIdRU="${task.Id_Usu_Con}" taskIdRP="${task.Id_Rel_Pac_Con}" idC="${task.Id_Consulta}">
                        <td class="ID">${task.Id_Consulta}</td>
                        <td name="nombreP">${task.nombre_P} ${task.APT_P}.</td>
                        <td>${task.fecha_C} / ${task.hora_C}</td>
                        <td><a class="btnVMC btn btn-outline-dark" href="#"> Ver Observaciones <i><img class="imag-fluid" src="../Imagenes/vermas.png" width="20px" height="20px"></i></a></td>
                    </tr>
                        `;
                    });
                }
                    document.getElementById('tasks').innerHTML=template;
            })
            .catch(error=>{
                showMessage(error, 'danger');
                console.log(error);
            });
           }
        function  MostrarConsulta(){
            var datos=new FormData();
            datos.append('email', sessionStorage.getItem('User'));
            datos.append('Usuario', sessionStorage.getItem('Usuario'));
            fetch('https://nutrisystem.000webhostapp.com/php/ShConsulta.php', {
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
            ).then(respuesta=>{
                // console.log(respuesta);
                    var template = '';
                    respuesta.forEach(task=>{
                        // console.log(task.nombre_P);  taskIdRU="${task.Id_Usu_Con}" taskIdRP="${task.Id_Rel_Pac_Con}"
                        template+=`
                        <tr taskIdRU="${task.Id_Usu_Con}" taskIdRP="${task.Id_Rel_Pac_Con}" idC="${task.Id_Consulta}">
                        <td class="ID">${task.Id_Consulta}</td>
                        <td name="nombreP">${task.nombre_P} ${task.APT_P}.</td>
                        <td>${task.fecha_C} / ${task.hora_C}</td>
                        <td><a class="btnVMC btn btn-outline-dark" href="#"> Ver Observaciones <i><img class="imag-fluid" src="../Imagenes/vermas.png" width="20px" height="20px"></i></a></td>
                    </tr>
                        `;
                    });
                    document.getElementById('tasks').innerHTML=template;
            })
            .catch(error=>{
                showMessage(error, 'danger');
                console.log(error);
            });
        }
        $(document).on('click', '.btnVMC', function (e) {
            e.preventDefault();
            let element =$(this)[0].parentElement.parentElement;
            // console.log(element);
                     let idRUC=$(element).attr('taskIdRU');
                     let idRPC=$(element).attr('taskIdRP');
                     let idC=$(element).attr('idC');
                     sessionStorage.setItem('IdUC', idRUC);
                     sessionStorage.setItem('IdPC', idRPC);
                     sessionStorage.setItem('IdC', idC);
                     console.log(sessionStorage.getItem('IdUC'));
                     self.location="../html/verMCo.html"
            });
            function  MostrarRecetasCV(valor) {
                var datos=new FormData();
                datos.append('consulta', valor);
                datos.append('email', sessionStorage.getItem('User'));
                datos.append('Usuario', sessionStorage.getItem('Usuario'));
                    fetch('https://nutrisystem.000webhostapp.com/php/ShR.php', {
                        method: 'POST',
                        body: datos
                }).then(
                    res=>{
        if (res.ok) {
            // console.log(res.text());
            return res.json();
        }else{
            throw 'No se pudo obtener la busqueda';
        }
                    }
                ).then(respuesta=>{
                    var count=Object.keys(respuesta).length;
                    var template = '';
                if(respuesta.success==0 || count<=0){
                            template+='No hay Coincidencias :(';
                        }else{
                            respuesta.forEach(task=>{
                                // console.log(task.nombre_P);
                                template+=`
                                <tr taskIdRU="${task.Id_Rel_Usu_Rec}" taskIdRP="${task.Id_Rel_Pac_Rec}" idR="${task.Id_Receta}">
                                <td name="nombreP">${task.nombre_P} ${task.APT_P}.</td>
                                <td>${task.fecha_R} / ${task.hora_R}</td>
                                <td><a class="btnVMR btn btn-outline-dark" href="Receta.html"> Ver Receta <i><img class="imag-fluid" src="../Imagenes/vermas.png" width="20px" height="20px"></i></a></td>
                            </tr>
                                `;
                            });
                        }
                        document.getElementById('tasks').innerHTML=template;
                })
                .catch(error=>{
                    showMessage(error, 'danger');
                    console.log(error);
                });
            }
        function  MostrarRecetas(){
            var datos=new FormData();
            datos.append('email', sessionStorage.getItem('User'));
            datos.append('Usuario', sessionStorage.getItem('Usuario'));
            fetch('https://nutrisystem.000webhostapp.com/php/ShRecetas.php', {
                method: 'POST',
                body: datos
            }).then(
                res=>{
    if (res.ok) {
        // console.log(res.text());
        return res.json();
    }else{
        throw 'No se pudo obtener la busqueda';
    }
                }
            ).then(respuesta=>{
                // console.log(respuesta);
                    var template = '';
                    respuesta.forEach(task=>{
                        // console.log(task.nombre_P);
                        template+=`
                        <tr taskIdRU="${task.Id_Rel_Usu_Rec}" taskIdRP="${task.Id_Rel_Pac_Rec}" idR="${task.Id_Receta}">
                        <td name="nombreP">${task.nombre_P} ${task.APT_P}.</td>
                        <td>${task.fecha_R} / ${task.hora_R}</td>
                        <td><a class="btnVMR btn btn-outline-dark" href="Receta.html"> Ver Receta <i><img class="imag-fluid" src="../Imagenes/vermas.png" width="20px" height="20px"></i></a></td>
                    </tr>
                        `;
                    });
                    document.getElementById('tasks').innerHTML=template;
            })
            .catch(error=>{
                showMessage(error, 'danger');
                console.log(error);
            });
        }
        $(document).on('click', '.btnVMR', function (e) {
            // e.preventDefault();
            let element =$(this)[0].parentElement.parentElement;
            // console.log(element);
                     let idRUR=$(element).attr('taskIdRU');
                     let idRPR=$(element).attr('taskIdRP');
                     let idR=$(element).attr('idR');
                     sessionStorage.setItem('IdUR', idRUR);
                     sessionStorage.setItem('IdPR', idRPR);
                     sessionStorage.setItem('IdR', idR);
            });
            function MostrarCUPCV(valor){
                var datos=new FormData();
                datos.append('IDPC', sessionStorage.getItem('IdHP'));
                datos.append('consulta', valor);
                datos.append('email', sessionStorage.getItem('User'));
                datos.append('Usuario', sessionStorage.getItem('Usuario'));
                    fetch('https://nutrisystem.000webhostapp.com/php/ShCP.php', {
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
                    ).then(respuesta=>{
                            var template = '';
                            var count=Object.keys(respuesta).length;
                            var template = '';
                        if(respuesta.success==0 || count<=0){
                                    template+='No hay Coincidencias :(';
                                }else{
                                    respuesta.forEach(task=>{
                                        template+=`
                                        <tr taskIdRU="${task.Id_Usu_Con}" taskIdRP="${task.Id_Rel_Pac_Con}" idC="${task.Id_Consulta}">
                                        <td>${task.Id_Consulta}</td>
                                        <td>${task.fecha_C} / ${task.hora_C}</td>
                                        <td><a class="btnVMC btn btn-outline-dark" href="#"> Ver Observaciones <i><img class="imag-fluid" src="../Imagenes/vermas.png" width="20px" height="20px"></i></a></td>
                                    </tr>
                                        `;
                                    });
                                }
                            document.getElementById('tasks').innerHTML=template;
                    })
                    .catch(error=>{
                        showMessage(error, 'danger');
                        console.log(error);
                    });
            }
            function MostrarCUP() {
                var datos=new FormData();
            datos.append('IDPC', sessionStorage.getItem('IdHP'));
            datos.append('email', sessionStorage.getItem('User'));
            datos.append('Usuario', sessionStorage.getItem('Usuario'));
                fetch('https://nutrisystem.000webhostapp.com/php/ShConsultaP.php', {
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
                ).then(respuesta=>{
                        var template = '';
                        var titulo=document.getElementById('NameP');
                        respuesta.forEach(task=>{
                            // console.log(task.nombre_P);
                            titulo.textContent="Notas de: "+task.nombre_P+" "+task.APT_P+" "+task.APM_P;
                            template+=`
                            <tr taskIdRU="${task.Id_Usu_Con}" taskIdRP="${task.Id_Rel_Pac_Con}" idC="${task.Id_Consulta}">
                            <td>${task.Id_Consulta}</td>
                            <td>${task.fecha_C} / ${task.hora_C}</td>
                            <td><a class="btnVMC btn btn-outline-dark" href="#"> Ver Observaciones <i><img class="imag-fluid" src="../Imagenes/vermas.png" width="20px" height="20px"></i></a></td>
                        </tr>
                            `;
                        });
                        document.getElementById('tasks').innerHTML=template;
                })
                .catch(error=>{
                    showMessage(error, 'danger');
                    console.log(error);
                });
            }
            $('#buscador').keyup(function (e) {
                console.log('buscando');
                if ($('#buscador').val()) {
                    console.log($('#buscador').val());
                    let search=$('#buscador').val();
                    SiBuscar(search);
                }else{
                   NoBusacar();
                }
            });
    }
}());