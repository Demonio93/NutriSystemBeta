(function () {
    
    ///id="tasks"
    // $('#buscador').keyup(function (e) {
    //     let b=0;
    //     if ($('#buscador').val()) {
    //         let search=$('#buscador').val();
    //     // console.log(search);
    //     $.ajax({
    //         url: '../php/buscarConsultas.php',
    //         type: 'POST',
    //         data: {search},
    //         success: function (response) {
    //            //  console.log(response);
    //             let tasks=JSON.parse(response);
    //             let template ='';
    //             tasks.forEach(task => {
    //                 if (task.success==1) {
    //                    template+=`
    //                    <tr idP="${task.Id_Pacientes}" idRU="${task.Id_Usu_Pac}">
    //                    <td name="nombreP">${task.nombre_P} ${task.APT_P}</td>
    //                    <td >${task.edad}</td>
    //                    <td >${task.status}</td>
    //                    <td><a class="btnVMH btn btn-outline-dark" href="verMPac.html"> Ver mas <i><img class="imag-fluid" src="../Imagenes/vermas.png" width="20px" height="20px"></i></a></td>
    //                    </tr>
    //                    `;
    //                 }
    //             });
    //             $('#task').html(template);
    //             // $('#task-result').show();
    //         }
    //     });
    //     }else{
    //        $('#task-result').hide();
    //     }
    // });
}());