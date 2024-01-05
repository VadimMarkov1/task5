document.addEventListener('DOMContentLoaded', function() {
  fetchPosts();
  fetchUsers();
});

function fetchPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then(response => response.json())
      .then(posts => {
          const container = document.getElementById('slider-container');

          posts.forEach(post => {
              const postElement = document.createElement('div');
              postElement.className = 'slide';
              postElement.innerHTML = `<h3>${post.title}, post № ${post.id}</h3><p>${post.body}</p>`;
              container.appendChild(postElement);
          });

          createSlider();
      });
}

function fetchUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
          const userList = document.getElementById('user-list');
          users.forEach(user => {
              const userElement = document.createElement('div');
              userElement.innerHTML = `
                  <img src="https://via.placeholder.com/150/${Math.floor(Math.random()*16777215).toString(16)}" alt="User Image">
                  <p>${user.name}</p>
              `;
              userElement.addEventListener('click', () => {
                  window.location.href = `user.html?userId=${user.id}`;
              });
              userList.appendChild(userElement);
          });
      });
}


function createSlider() {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const visibleSlides = 3;
  let currentSlide = 0;

  function updateSlide() {
      slides.forEach(slide => {
          slide.style.display = 'none';
      });
      for (let i = 0; i < visibleSlides; i++) {
          let index = (currentSlide + i) % totalSlides;
          slides[index].style.display = 'block';
          slides[index].style.order = i;
      }

  }

  document.getElementById('next').addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlide();
  });

  document.getElementById('prev').addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlide();
  });

  updateSlide();
}

