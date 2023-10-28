document.addEventListener("DOMContentLoaded", function () {
    const githubForm = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    githubForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const searchTerm = searchInput.value;
  
      // Clear previous search results
      userList.innerHTML = "";
      reposList.innerHTML = "";
  
      // GitHub User Search Endpoint
      fetch(`https://api.github.com/search/users?q=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          displayUserResults(data.items);
        });
    });
  
    function displayUserResults(users) {
      users.forEach((user) => {
        const userItem = document.createElement("li");
        userItem.innerHTML = `
          <h3>${user.login}</h3>
          <img src="${user.avatar_url}" alt="Avatar">
          <a href="${user.html_url}" target="_blank">GitHub Profile</a>
        `;
  
        userItem.addEventListener("click", function () {
          // GitHub User Repos Endpoint
          fetch(`https://api.github.com/users/${user.login}/repos`)
            .then((response) => response.json())
            .then((repos) => {
              displayUserRepositories(repos);
            });
        });
  
        userList.appendChild(userItem);
      });
    }
  
    function displayUserRepositories(repositories) {
      repositories.forEach((repo) => {
        const repoItem = document.createElement("li");
        repoItem.innerHTML = `
          <h3>${repo.name}</h3>
          <a href="${repo.html_url}" target="_blank">Repository Link</a>
        `;
  
        reposList.appendChild(repoItem);
      });
    }
  });