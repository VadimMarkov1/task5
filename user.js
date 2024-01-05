document.addEventListener('DOMContentLoaded', function() {
  const queryParams = new URLSearchParams(window.location.search);
  const userId = queryParams.get('userId');
  fetchUserDetails(userId);
});

function fetchUserDetails(userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => response.json())
      .then(user => {
          const userDetails = document.getElementById('user-details');
          userDetails.innerHTML = `
              <div class="user-card">
                  <img src="https://via.placeholder.com/150/${Math.floor(Math.random()*16777215).toString(16)}" alt="User Photo">
                  <h2>${user.name}</h2>
                  <p>Username: ${user.username}</p>
                  <p>Email: ${user.email}</p>
                  <p>Phone: ${user.phone}</p>
                  <p>Website: <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                  <p>Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
                  <p>Company: ${user.company.name}</p>
                  <p>Catchphrase: ${user.company.catchPhrase}</p>
                  <p>BS: ${user.company.bs}</p>
              </div>
          `;
      });
}
