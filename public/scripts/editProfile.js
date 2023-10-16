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
  
