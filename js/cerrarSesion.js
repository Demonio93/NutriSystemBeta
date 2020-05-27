(function(){
  
                sessionStorage.removeItem('User');
                sessionStorage.removeItem('Usuario');
                self.location='../';
           
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