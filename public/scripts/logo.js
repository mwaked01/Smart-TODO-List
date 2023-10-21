
$(() => {
  $('#logo').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/tasks',
      data: postData,
      success: function () {
        console.log(`'${word}' redirected to tasks`);
      },
      error: function (error) {
        console.error('Error adding task:', error);
      }
    });
  });
});
