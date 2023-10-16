// Client facing scripts here
$(() => {
    $('#fetch-users').on('click', () => {
      $.ajax({
        method: 'GET',
        url: '/profileEdit'
      })
      .done((response) => {
        const $usersList = $('#users');
        $usersList.empty();
  
        for(const user of response.users) {
          $(`<li class="user">`).text(user.name).appendTo($usersList);
        }
      });
    });
  });
  
  
  document.addEventListener('DOMContentLoaded', () => {
    fetch('/user-data')
      .then((response) => response.json())
      .then((userData) => {
        document.querySelector('.user-name').textContent = userData.username;
        document.querySelector('.user-email').textContent = userData.email;
        document.querySelector('input[name="username"]').value = userData.username;
        document.querySelector('input[name="email"]').value = userData.email;
        document.querySelector('input[name="password"]').value = userData.password;
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  });