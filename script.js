  

  /* */

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
  