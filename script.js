class Alerta {
    static exibir(mensagem) {
      window.alert(mensagem);
    }
  }
  
  class SelecaoCidade {
    static confirmar() {
      const city = window.prompt("Escolha sua cidade:");
      if (city) {
        SelecaoCidade.selecionar(city);
      }
    }
  
    static async obterCidades() {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
      const cities = await response.json();
      const cityDropdown = document.getElementById("cityDropdown");
  
      cities.forEach(city => {
        const cityLink = document.createElement("a");
        cityLink.textContent = city.nome;
        cityLink.href = "#";
        cityLink.addEventListener("click", function() {
          SelecaoCidade.selecionar(city.nome);
        });
        cityLink.classList.add("city-item");
        cityDropdown.appendChild(cityLink);
      });
    }
  
    static selecionar(cityName) {
      const selectedCitySpan = document.getElementById("selectedCity");
      selectedCitySpan.textContent = "Sua cidade é: " + cityName;
    }
  
    static filtrarCidades() {
      const searchInput = window.prompt("Digite o nome da cidade:");
      if (searchInput) {
        const filter = searchInput.toUpperCase();
        const cityDropdown = document.getElementById("cityDropdown");
        const cities = cityDropdown.getElementsByTagName("a");
  
        for (let i = 0; i < cities.length; i++) {
          const cityName = cities[i].textContent || cities[i].innerText;
          if (cityName.toUpperCase().indexOf(filter) > -1) {
            cities[i].style.display = "";
          } else {
            cities[i].style.display = "none";
          }
        }
      }
    }
  }
  
  class Postagem {
    static criar() {
      const titleInput = document.getElementById("postTitle");
      const contentInput = document.getElementById("postContent");
  
      const newPost = {
        id: posts.length + 1,
        title: titleInput.value,
        content: contentInput.value
      };
  
      posts.push(newPost);
      Postagem.exibir(); // Atualiza a exibição das postagens após a criação
      titleInput.value = "";
      contentInput.value = "";
    }
  
    static exibir() {
      const postsContainer = document.getElementById("postsContainer");
      postsContainer.innerHTML = ""; // Limpa o conteúdo atual
  
      posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <button onclick="Postagem.excluir(${post.id})">Excluir</button>
        `;
        postsContainer.appendChild(postElement);
      });
    }
  
    static excluir(postId) {
      posts = posts.filter(post => post.id !== postId);
      Postagem.exibir(); // Atualiza a exibição das postagens após a exclusão
    }
  }
  
  // Exemplo de uso
  
  Alerta.exibir("Seja bem-vindo");
  SelecaoCidade.obterCidades();
  Postagem.exibir();
  
  // Função para filtrar cidades usando uma caixa de diálogo
  function filterCities() {
    const searchInput = window.prompt("Digite o nome da cidade:");
    if (searchInput) {
      const filter = searchInput.toUpperCase();
      const cityDropdown = document.getElementById("cityDropdown");
      const cities = cityDropdown.getElementsByTagName("a");
  
      for (let i = 0; i < cities.length; i++) {
        const cityName = cities[i].textContent || cities[i].innerText;
        if (cityName.toUpperCase().indexOf(filter) > -1) {
          cities[i].style.display = "";
        } else {
          cities[i].style.display = "none";
        }
      }
    }
  }
  