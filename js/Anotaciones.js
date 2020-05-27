$(function () {
     // console.log('JQuery is working');
     let edit=false;
     let email=sessionStorage.getItem("User");
     let Usuario=sessionStorage.getItem("Usuario");
     $('#task-result').hide();
     MostrarDatos();
     $('#search').keyup(function (e) {
         if ($('#search').val()) {
             let search=$('#search').val();
             
         // console.log(search);
         $.ajax({
             url: 'https://nutrisystem.000webhostapp.com/php/buscarNotas.php',
             type: 'POST',
             data: {search, email, Usuario},
             success: function (response) {
                //  console.log(response);
                 let tasks=JSON.parse(response);
                 let template ='';
                 tasks.forEach(task => {
                     if (task.success==1) {
                        template+=`
                        <li>
                        ${task.Nombre_Anotacion} : ${task.anotacion}
                        </li>
                        `;
                     }
                 });
                 $('#container').html(template);
                 $('#task-result').show();
             }
         });
         }else{
            $('#task-result').hide();
         }
     });
     $('#search').change(function (){
        if ($('#search').val()) {
        }
        else{
            $('#task-result').hide();
        } 
     });
     $('#formulario').submit(function (e) {
         // console.log('enviando');
         const postData={
             nombre: $('#name').val(),
             descripcion: $('#description').val(),
             id: $('#CRegistrar').val(),
             Usuario: Usuario
         };
         let url= edit === false ? 'https://nutrisystem.000webhostapp.com/php/RegAnot.php' : 'https://nutrisystem.000webhostapp.com/php/task-edit.php';
         // console.log(url);
         $.post(url, postData, function (response) {
            // console.log(response);
         edit=false;
         MostrarDatos();
         $('#formulario').trigger('reset');
         });
         // console.log(postData);
         e.preventDefault();
     });
    function MostrarDatos() {
     $.ajax({
         url:'https://nutrisystem.000webhostapp.com/php/lista.php',
         type:'POST',
         data: {email, Usuario},
         // data:{ nombre: 'susan' },
         success: function (response) {
            //   console.log(response);
             let tasks= JSON.parse(response);
             let template = '';
             tasks.forEach(task=>{
                 template+=`
                 <tr taskIdR="${task.Id_Usu_Anot}">
                     <th >${task.Id_Anotaciones} </th>
                     <td taskIdA="${task.Id_Anotaciones}">
                     <a href="#" class="task-item">
                     ${task.Nombre_Anotacion}
                     </a>
                     </td>
                     <td> ${task.anotacion} </td>
                     <td>${task.fecha_A} / ${task.hora_A}</td>
                     <td>
                     <button class="Elimina-B btn btn-danger">
                     Eliminar
                     </button>
                     </td> 
                 </tr>
                 `;
             });
             $('#tasks').html(template);
         }
     });
    } 
    $(document).on('click', '.Elimina-B', function () {
     //    console.log('Eliminar');
     if (confirm('¿Estas seguro que quieres eliminar la Anotacion?')) {
         let element =$(this)[0].parentElement.parentElement;
     let idR=$(element).attr('taskIdR');
     // console.log(id);
     $.post('https://nutrisystem.000webhostapp.com/php/task-delete.php', {idR, email, Usuario}, function (response) {
         console.log(response);
         MostrarDatos();
     });
     }
    });
    $(document).on('click', '.task-item', function (e) {
     //    console.log('editando');
     e.preventDefault();
     let element=$(this)[0].parentElement;
    //  console.log($(this)[0].parentElement);
     let id=$(element).attr('taskIdA');
    //  console.log(id);
     $.post('https://nutrisystem.000webhostapp.com/php/task-single.php', { id, Usuario, email }, function (response) {
        edit=true;
         const task = JSON.parse(response);
         $('#name').val(task.Nombre_Anotacion);
         $('#description').val(task.anotacion);
         $('#CRegistrar').val(task.Id_Anotaciones);
     });
    });
});