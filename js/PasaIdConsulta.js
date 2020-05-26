(function () {
    class UI{
        PasarID(elemento){
            if (elemento.name==='VMC') {
                var padre=elemento.parentElement.parentElement;
                var Id=padre.getElementsByTagName('td')[0].textContent;
                var IdP=padre.getElementsByTagName('td')[1].textContent;
                sessionStorage.setItem("IDCo", Id);
                sessionStorage.setItem("NombreP", IdP);
                // console.log(Id);
             //    self.location='../html/verMPac.html';
            } 
         }
    }
    try {
        var ui=new UI();
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
        console.log('Script IC');
    }
}());