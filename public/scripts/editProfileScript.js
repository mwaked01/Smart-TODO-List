$(() => {
    $('#update-form').on('submit', () => {
      const newName = $('#new-name').val();
      const newEmail = $('#new-email').val();
      const newPassword = $('#new-password').val();
  
      const postData = { name: newName, email: newEmail, password: newPassword };
      $.ajax({
        method: 'POST',
        url: '/update',
        data: postData,
        success: function () {
          console.log(`'${word}' updated profile`);
        },
        error: function (error) {
          console.error('Error adding task:', error);
        }
      });
    });
  });