
$(() => {
  const $category = $('#categoryResult');
  $('#categoryForm').on('submit', (e) => {
    e.preventDefault();
    const word = $('#word').val();
    const apiUrl = `/newTask?word=${word}`;
    const $submitButton = $("#submit-button");
    const $loadingIcon = $("#loading-icon");

    $submitButton.hide();
    $loadingIcon.show();

    $.ajax({
      method: 'GET',
      url: apiUrl
    })
      .done((response) => {
        $submitButton.show();
        $loadingIcon.hide();
        $category.empty();
        $category.text(`'${word}' added to: ${response}`);
      })
      .fail(() => {
        $category.empty();
        $category.text('An error occurred.');
      });
  });
});
