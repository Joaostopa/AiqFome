// Função para adicionar um comentário
function voltar() {
  window.history.back();
}
function addComment(name, comment) {
  var commentList = document.getElementById("comment-list");
  var li = document.createElement("li");
  li.innerHTML = "<b>" + name + ":</b> " + comment + " <button class='edit-comment'>Editar</button> <button class='delete-comment'>Excluir</button>";
  commentList.appendChild(li);
}

// Função para salvar um comentário no localStorage
function saveComment(name, comment) {
  var comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push({ name: name, comment: comment });
  localStorage.setItem("comments", JSON.stringify(comments));
}

// Função para carregar os comentários do localStorage
function loadComments() {
  var comments = JSON.parse(localStorage.getItem("comments")) || [];
  var commentList = document.getElementById("comment-list");
  commentList.innerHTML = "";
  for (var i = 0; i < comments.length; i++) {
    addComment(comments[i].name, comments[i].comment);
  }
}

// Função para buscar comentários pelo nome ou conteúdo
function searchComments(query) {
  var comments = JSON.parse(localStorage.getItem("comments")) || [];
  var filteredComments = comments.filter(function (comment) {
    return comment.name.toLowerCase().includes(query.toLowerCase()) ||
      comment.comment.toLowerCase().includes(query.toLowerCase());
  });
  var commentList = document.getElementById("comment-list");
  commentList.innerHTML = "";
  for (var i = 0; i < filteredComments.length; i++) {
    var name = filteredComments[i].name;
    var comment = filteredComments[i].comment;
    var highlightedName = name.replace(new RegExp(query, "gi"), "<span class='highlight'>$&</span>");
    var highlightedComment = comment.replace(new RegExp(query, "gi"), "<span class='highlight'>$&</span>");
    var li = document.createElement("li");
    li.innerHTML = "<b>" + highlightedName + ":</b> " + highlightedComment + " <button class='edit-comment'>Editar</button> <button class='delete-comment'>Excluir</button>";
    commentList.appendChild(li);
  }
}

// Função para editar um comentário
function editComment(index, newName, newComment) {
  var comments = JSON.parse(localStorage.getItem("comments")) || [];
  if (index >= 0 && index < comments.length) {
    comments[index].name = newName;
    comments[index].comment = newComment;
    localStorage.setItem("comments", JSON.stringify(comments));
    loadComments();
  }
}

// Função para excluir um comentário
function deleteComment(index) {
  var comments = JSON.parse(localStorage.getItem("comments")) || [];
  if (index >= 0 && index < comments.length) {
    comments.splice(index, 1);
    localStorage.setItem("comments", JSON.stringify(comments));
    loadComments();
  }
}

// Carregar os comentários ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  loadComments();
});

// Adicionar evento de envio de comentário
document.getElementById("add-comment-form").addEventListener("submit", function (e) {
  e.preventDefault();
  var name = document.getElementById("name").value;
  var comment = document.getElementById("comment").value;
  addComment(name, comment);
  saveComment(name, comment);
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
});

// Adicionar evento de busca de comentários
document.getElementById("search-button").addEventListener("click", function () {
  var query = document.getElementById("search-input").value;
  searchComments(query);
});

// Delegar eventos de edição e exclusão de comentários
document.getElementById("comment-list").addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-comment")) {
    var li = e.target.parentNode;
    var index = Array.prototype.indexOf.call(li.parentNode.children, li);
    var name = prompt("Digite o novo nome:", li.firstChild.textContent);
    var comment = prompt("Digite o novo comentário:", li.childNodes[2].textContent);
    editComment(index, name, comment);
  } else if (e.target.classList.contains("delete-comment")) {
    var li = e.target.parentNode;
    var index = Array.prototype.indexOf.call(li.parentNode.children, li);
    deleteComment(index);
  }
});
