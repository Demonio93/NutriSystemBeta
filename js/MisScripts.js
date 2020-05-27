(function(){
  try {
    var email=sessionStorage.getItem("User");
    var Usuario=sessionStorage.getItem("Usuario");
    if (sessionStorage.getItem('estatus')==='Inactivo') {
      document.getElementById('botonPa').remove();
      document.getElementById('edit').remove();
      document.getElementById('btnElimina').remove();
      Desactivar();
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
                datos.append('email', email);
            datos.append('Usuario', Usuario);
                var pagina='../html/verMPac.html';
                fetch('https://nutrisystem.000webhostapp.com/php/AltaPac.php',{
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
  } catch (error) {
    console.error();
  }
}());