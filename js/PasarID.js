(function () {
    try {
    var boton=document.getElementById("botonPa");
    // console.log(boton);
    boton.addEventListener("click",guardaId);
    function guardaId() {
        sessionStorage.setItem("ID", "botonPa");
    }
    } catch (error) {
        // console.log('Boton no encontrado');
        var boton=document.getElementById("botonICs");
    boton.addEventListener("click",guardaId);
    function guardaId() {
        sessionStorage.setItem("ID", "botonICs");
        console.log(sessionStorage.getItem("ID"));
    }
    }
}()); 