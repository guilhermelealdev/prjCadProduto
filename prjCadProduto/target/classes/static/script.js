document.addEventListener("DOMContentLoaded",()=>{
   const cadastroForm = document.getElementById("cadastroForm");
   
   const pesquisaForm = document.getElementById("pesquisaForm");
   
   cadastroForm.addEventListener("submit",cadastrarJogo);
   
   pesquisaForm.addEventListener("submit",function(e){
       e.preventDefault();
       pesquisarJogo();
   });
});


function cadastrarJogo(event){
   event.preventDefault();
   
   const name = document.getElementById("name").value;
   const platform = document.getElementById("platform").value;
   const price = document.getElementById("price").value;
   const category = document.getElementById("category").value;
   const thumbnail=document.getElementById("thumbnail").files[0];
   
   const jogo = {
       name:name,
       platform:platform,
       price:price,
       category:category        
   }
   
   const formData = new FormData();
   
   formData.append(
       "jogo",
       new Blob([JSON.stringify(jogo)],{type:"application/json"})
   );
   
   formData.append("thumbnail",thumbnail)
   
   fetch("http://localhost:8080/jogos",{
       method:"POST",
       body:formData
   })
   .then(data=>{
       alert("Jogo Cadastrado com Sucesso");
   })
   .catch(error=>console.error(error))
}