(function () {
class UI{
    showMessage2(message, cssClass){
        const div=document.createElement('div');
        div.className=`alerta alert-${cssClass} m-2`;
        div.appendChild(document.createTextNode(message));
        const contenedor=document.querySelector('.main');
        const app=document.querySelector('#TablaC');
        contenedor.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alerta').remove();
        }, 3000);
    }
    buscarPaciente(busqueda){
        var pacientes=document.getElementsByName('IdC');//.textContent
        var element=document.getElementById('buscadorC');
        if(element.value===''){
            for(var x=pacientes.length-1; x>=0; x--){
                    pacientes[x].parentElement.style.display='table-row';//vuelbe a mostrarlos
                    // pacientes[x].parentElement.setAttribute('display', 'table');
                   // pacientes[x].parentElement.style.visibility='visible';//vuelve a hacerlos visibles
            }
        }else{
            var b=false;
            for(var x=pacientes.length-1; x>=0; x--){
                if((pacientes[x].textContent)===busqueda){
                    b=true;
                }else{
                    // pacientes[x].parentElement.remove();
                    pacientes[x].parentElement.style.display='none';//oculta elemento
                    //pacientes[x].parentElement.style.visibility='hidden';//oculta a la vista, pero sigue ocpando su espacio a la vista
                }
            }
            if(!b){
                this.showMessage2('Id no encontrado', 'danger');
                for(var x=pacientes.length-1; x>=0; x--){
                    pacientes[x].parentElement.style.display='table-row';
            }
            }
        }
    }
    PasarID(elemento){
       if (elemento.name==='VMC') {
           var padre=elemento.parentElement.parentElement;
           var Id=padre.getElementsByTagName('td')[0].textContent;
           sessionStorage.setItem("IDCo", Id);
           console.log(Id);
        //    self.location='../html/verMPac.html';
       } 
    }
}
try {
    var ui=new UI();
    document.getElementById('buscadorC').addEventListener('change', function (e) {//evento del buscador
        var busqueda=document.getElementById('buscadorC').value;
        ui.buscarPaciente(busqueda);
    }); 
    var botones=document.getElementsByName('VMC');
        for (var index = 0; index < botones.length; index++) {
            // console.log(index, botones.length);
            var element = botones[index];
            element.addEventListener('click', function (e) {
                // e.preventDefault();
                ui.PasarID(e.target);
                
            });
        }
} catch (error) {
    console.log('Scrpt consultas: '+error.message);
}
}());