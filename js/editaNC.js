(function (){

    var id=sessionStorage.getItem("ID");
    // console.log(id);
        if(id=='botonPa'){
            ConsultaUPac();
        }
        else if (id=='botonICs') {
            var opc=document.getElementById("opcionesC");
            opc.remove();
            consultaPacientes();
        } 
        function ConsultaUPac() {
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
            ).then(respuesta=>{
                    var template = '';
                        template+=`
                        <option value="${sessionStorage.getItem('IdHP')}">${respuesta.nombre_P} ${respuesta.APT_P} ${respuesta.APM_P}</option>
                        `;
                    document.getElementById('NombreP').innerHTML=template;
            })
            .catch(error=>{
                // showMessage(error, 'danger');
                console.log(error);
            });
        }
       function consultaPacientes(){
            fetch('https://nutrisystem.000webhostapp.com/php/ShHisto.php', {
                method: 'GET'
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
                    respuesta.forEach(task=>{
                        if (task.status==='Activo') {
                            template+=`
                        <option value="${task.Id_Pacientes}">${task.nombre_P} ${task.APT_P} ${task.APM_P}</option>
                        `;
                        }
                    });
                    document.getElementById('NombreP').innerHTML=template;
            })
            .catch(error=>{
                // showMessage(error, 'danger');
                console.log(error);
            });
        }
}());