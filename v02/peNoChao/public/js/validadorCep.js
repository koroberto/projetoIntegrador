// console.log("carregou o validadorCep.js");

const btnPesquisarCEP = document.querySelector("#btnPesquisar");
const inputCep = document.querySelector("#cep");

inputCep.addEventListener("keypress", (e) => {
  if(cep.value.length >= 8 || e.keyCode < 48 || e.keyCode > 57 ){
      e.preventDefault();
  }
})


btnPesquisarCEP.addEventListener("click", event =>{
  event.preventDefault();
  const inputDoCep = document.querySelector("#cep");
  const valorDoCep = inputDoCep.value;
  const url = `https://viacep.com.br/ws/${valorDoCep}/json/`;
  fetch(url).then(response =>{
    return response.json();
      }).then(data =>
    {
    if(data.erro)
    {
    alert("O CEP DIGITADO ESTÁ INVÁLIDO");
    return ;
    }
    atribuirCampos(data);
   })

  function atribuirCampos(data)
        {
        
        const bairro = document.querySelector("#bairro");
        const cidade = document.querySelector("#cidade");
        const estado = document.querySelector("#estado");
        
    
        
        bairro.value = data.bairro;
        cidade.value = data.localidade;
        estado.value = data.uf;
        
                }

        })

  


// fetch('https://viacep.com.br/ws/03818000/json/').then(function(resulado) {
//   return  resulado.json();
// }).then(function(endereco) {
   
    
// })

// const cep = require('cep-promise')
// const inputDoCep = document.querySelector("#cep");
// const valorDoCep = inputDoCep.value;
// const bairro = document.querySelector("#bairro");
// const cidade = document.querySelector("#cidade");

// function buscarEnd ( valorDoCep){
    
//     cep(valorDoCep).then(resposta =>{
//         atribuirCampos(resposta);
//         console.log(resposta)
        
//     })
//     function atribuirCampos(resposta){
    
//     bairro.value += resposta.neighborhood;
//     cidade.value += resposta.city;
    
//     }

