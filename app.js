let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  fetchUsers(currentPage);

  document.getElementById("next").addEventListener("click", () => {
    currentPage++;
    fetchUsers(currentPage);
  });

  document.getElementById("prev").addEventListener("click", () => {
    currentPage--;
    fetchUsers(currentPage);
  });
});

function fetchUsers(page) {
  fetch(`https://randomuser.me/api/?page=${page}&results=5`)
    .then(response => response.json())
    .then(data => {
      displayUsers(data.results);
      toggleButtons(page);
    })
    .catch(error => console.log('Error:', error));
}

function displayUsers(users) {
  const tableBody = document.getElementById('userData');
  tableBody.innerHTML = '';
  users.forEach(user => {
    const row = `<tr>
      <td><img src="${user.picture.thumbnail}" alt="User Photo"></td>
      <td>${user.name.first} ${user.name.last}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.location.city}, ${user.location.country}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

function toggleButtons(page) {
  document.getElementById("prev").disabled = page === 1;
}
fetch('https://randomuser.me/api/?page=1&results=5')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Check if the API data is fetched correctly
  })
  .catch(error => console.log('Error:', error));
