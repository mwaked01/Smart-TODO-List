// When the "Save Profile" button is clicked
$('#profile-save-button').on('click', () => {
    const formData = {
      name: $('input[name="name"]').val(),
      newName: $('input[name="newName"]').val(),
      newEmail: $('input[name="newEmail"]').val(),
      newPassword: $('input[name="newPassword"]').val(),
    };
  
    // Make a POST request to the server with the form data
    $.ajax({
      method: 'POST',
      url: '/editProfile',
      data: formData,
    })
      .done((response) => {
        // Handle the response from the server (e.g., display a success message)
        console.log(response);
      });
  });