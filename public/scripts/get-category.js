$(() => {
  const $category = $('#categoryResult');
  $('#categoryForm').on('submit', (e) => {
    e.preventDefault();
    const word = $('#word').val();
    const edamamApiUrl = `/api/toBuy?word=${word}`;
    const $submitButton = $("#submit-button");
    const $loadingIcon = $("#loading-icon");

    $submitButton.hide();
    $loadingIcon.show();

    $.ajax({
      method: 'GET',
      url: edamamApiUrl
    })
      .done((response) => {
        if (response.category === 'Not Found') {
          // If Edamam API didn't find a match, check the themoviedb API
          const yelpApiUrl = `/api/toEat?word=${word}`;
          $.ajax({
            method: 'GET',
            url: yelpApiUrl
          })
            .done((yelpResponse) => {
              if (yelpResponse.category === 'Not Found') {
                // If TMDB API didn't find a match, check the yelp API
                const tmbdApiUrl = `/api/toWatch?word=${word}`;
                $.ajax({
                  method: 'GET',
                  url: tmbdApiUrl
                })
                  .done((tmbdResponse) => {
                    $submitButton.show();
                    $loadingIcon.hide();
                    $category.empty();
                    $category.text(`'${word}' added to: ${tmbdResponse.category}`);
                  })
                  .fail(() => {
                    $category.empty();
                    $category.text('An error occurred.');
                  });
              } else {
                $submitButton.show();
                $loadingIcon.hide();
                $category.empty();
                $category.text(`'${word}' added to: ${yelpResponse.category}`);
              }
            })
            .fail(() => {
              $category.empty();
              $category.text('An error occurred.');
            });
        } else {
          $submitButton.show();
          $loadingIcon.hide();
          $category.empty();
          $category.text(`'${word}' added to: ${response.category}`);
        }
      })
      .fail(() => {
        $category.empty();
        $category.text('An error occurred.');
      });
  });
});
