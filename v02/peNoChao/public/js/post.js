const postFile = document.querySelector(".postFile");
const btnPostar = document.getElementById("botaoPublicar");
const msgFoto = document.getElementById("msgFoto");

btnPostar.addEventListener("click", (event) => {
    if(postFile.files.length == 0){
        event.preventDefault();
        msgFoto.classList.remove("d-none");
        msgFoto.textContent = "Carregue a imagem";
        msgFoto.style.color = 'red';
    }
})

postFile.addEventListener("change", (event) => {
    if(postFile.files.length != 0){
        // msgFoto.classList.add("d-none");
        msgFoto.textContent = "Imagem carregada";
        msgFoto.style.color = 'green';
    }
})