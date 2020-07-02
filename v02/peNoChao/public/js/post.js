var postFile = document.querySelector(".postFile");
const btnPostar = document.getElementById("botaoPublicar");
const msgFoto = document.getElementById("msgFoto");

btnPostar.addEventListener("click", (event) => {
    if(postFile.files.length == 0){
        event.preventDefault();
        msgFoto.classList.toggle("d-none"); 
    }
})