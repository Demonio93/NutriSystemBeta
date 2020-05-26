(function(){
//     VerReceta();
//     function VerReceta() {
//         var datos=new FormData();
//         datos.append('IDR', sessionStorage.getItem('IdR'));
//         fetch('../php/UnReceta.php', {
//             method: 'POST',
//             body: datos
//         }).then(
//             res=>{
// if (res.ok) {
//     return res.json();
// }else{
//     throw 'No se pudo obtener la busqueda';
// }
//             }
//         ).then(receta=>{
//                 var template = '';
//                     if(receta.success==1){
//                         template+=`
//                         <img class="imag-fluid m-3 d-inline" src="../Imagenes/ManzanaAzul.png" width="5%" height="5%">
//                         <h1 class="d-inline"> Receta Medica </h1>
//                         <img width="5%" height="5%"  src="../Imagenes/nutricion1.png " class="imag-fluid" alt="Responsive image">
//                         <h2>Nutriologo: ${receta.nombre} ${receta.APT} ${receta.APM}</h2>
//                         <h5>Cedula No.: ${receta.cedula}</h5>
//                         <h5>Receta No.: ${sessionStorage.getItem('IdR')}</h5>
//                         <h4>Datos del paciente</h4>
//                         <h3>Nombre: ${receta.APT_P} ${receta.APM_P} ${receta.nombre_P}</h3>
//                         <h5>Peso: ${receta.peso}kg      Estatura: ${receta.estatura}m   Talla: ${receta.talla}</h5>
//                         <h5>Fecha: ${receta.fecha_R}   Hora: ${receta.hora_R}.</h5>
//                         <hr>
//                             ${receta.Receta}
//                         `;
//                     }else{
//                         template+="La consulta No existe";
//                     }
//                 document.getElementById('tasks').innerHTML=template;
//             // self.location='../index.html';
//         })
//         .catch(error=>{
//             showMessage(error, 'danger');
//             console.log(error);
//         });
//     }
 var btn=document.getElementById("Cpdf");
 btn.addEventListener('click', function (e){
    var tasks=document.getElementById("tasks");
//     var pdf = new jsPDF('p', 'pt', 'a4');
//     pdf.text(20, 20, 'Hello world.');
//     pdf.addHTML(tasks, 15, 15, {
//  });
    // pdf.save('Test.pdf');
    e.preventDefault();
    // var tasks=document.getElementById("tasks");
    // var pdf = new jsPDF('p', 'pt', 'a4');
    // pdf.addHTML(tasks, 15, 15, {
    // });
    // pdf.save('Receta.pdf');
    html2canvas(tasks, {
        onrendered: function(canvas){
            var imgData=canvas.toDataURL('image/png');
            // console.log('Report Image URL: '+imgData);
            var doc =new jsPDF('p', 'mm', [300, 250]);
            doc.addImage(imgData, 'PNG', 4, 7, 80, 90);
            doc.save('Receta.pdf');
        }
    });
    // var doc=new jsPDF('p', 'pt', 'a4');
    // var specialElementHandlers={

    // };
    // doc.fromHTML($('#tasks').get(0), 15, 15, {
    //     'width': 250,
    //     'margin': 1,
    //     'pagesplit': true,
    //     'elementHandlers': specialElementHandlers
    // });
    // doc.save('sample_file.pdf')
 });
}());