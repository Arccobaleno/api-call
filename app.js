const userTable = document.getElementById('userData');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentPage = 1;
const usersPerPage = 5;
let totalUsers = 0;

async function fetchUsers(page) {
  const response = await fetch(`https://randomuser.me/api/?page=${page}&results=${usersPerPage}`);
  const data = await response.json();
  return data.results;
}

function renderUsers(users) {
  userTable.innerHTML = ''; // Clear previous data
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${user.picture.thumbnail}" alt="${user.name.first} ${user.name.last}"></td>
      <td>${user.name.first} ${user.name.last}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.location.city}, ${user.location.country}</td>
    `;
    userTable.appendChild(row);
  });
}

async function loadUsers() {
  const users = await fetchUsers(currentPage);
  renderUsers(users);
  updatePaginationButtons();
}

function updatePaginationButtons() {
  prevButton.disabled = currentPage === 1;
  // Assuming a total of 100 users, you can adjust this based on your needs
  nextButton.disabled = currentPage * usersPerPage >= totalUsers;
}

prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadUsers();
  }
});

nextButton.addEventListener('click', () => {
  currentPage++;
  loadUsers();
});

// Initial load
loadUsers();
