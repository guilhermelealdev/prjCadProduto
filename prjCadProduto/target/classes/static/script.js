document.addEventListener("DOMContentLoaded", () => {
  const cadastroForm = document.getElementById("cadastroForm");

  const pesquisaForm = document.getElementById("pesquisaForm");

  cadastroForm.addEventListener("submit", cadastrarJogo);

  pesquisaForm.addEventListener("submit", function (e) {
    e.preventDefault();
    pesquisarProduto();
  });
});

function cadastrarProduto(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;
  const brand = document.getElementById("brand").value;
  const stock = document.getElementById("stock").value;
  const description = document.getElementById("description").value;
  const thumbnail = document.getElementById("thumbnail").files[0];

  const produto = {
    name: name,
    price: price,
    brand: brand,
	category: category,
	stock: stock,
	description: description,
  };

  const formData = new FormData();

  formData.append(
    "produto",
    new Blob([JSON.stringify(produto)], { type: "application/json" }),
  );

  formData.append("thumbnail", thumbnail);

  fetch("http://localhost:8080/jogos", {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      alert("Jogo Cadastrado com Sucesso");
    })
    .catch((error) => console.error(error));
}

function excluirProduto() {
  const searchId = document.getElementById("searchId").value;
  if (searchId === "") {
    alert("Digite um ID para exluir");
    return;
  }
  fetch(`http://localhost:8080/jogos/${searchId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao exluir");
      }
      alert("Jogo Excluido com sucesso");
      document.getElementById("pesquisaForm").reset();
      document.getElementById("resultadoPesquisa").innerHTML = "";
    })
    .catch((error) => {
      console.error(error);
      alert("Erro ao excluir o Jogo");
    });
}

function pesquisarProduto() {
  const searchId = document.getElementById("searchId").value;

  if (searchId === "") {
    alert("Digite um ID");
    return;
  }

  fetch(`http://localhost:8080/jogos/${searchId}`)
    .then((response) => {
      if (response.status === 404) {
        throw new Error("Jogo não encontrado");
      }

      return response.json();
    })
    .then((data) => {
      document.getElementById("name").value = data.name;
      document.getElementById("brand").value = data.brand;
      document.getElementById("price").value = data.price;
      document.getElementById("category").value = data.category;
	  document.getElementById("stock").value = data.stock;
	document.getElementById("description").value = data.description;

      const resultadoPesquisa = document.getElementById("resultadoPesquisa");

      resultadoPesquisa.innerHTML = `
<h3>ID: ${data.id}</h3>
<img style="max-width:200px" src="data:image/jpeg;base64,${data.thumbnail}" alt="thumbnail do produto ${data.name}">
`;
    })
    .catch((error) => {
      console.error(error);

      const resultadoPesquisa = document.getElementById("resultadoPesquisa");

      resultadoPesquisa.innerHTML = "Produto não encontrado. Inserir ID válido";
    });
}
