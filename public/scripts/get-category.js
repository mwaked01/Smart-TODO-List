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
      .done((edamamResponse) => {

        if (edamamResponse.category === 'Products') {
          const postData = { word: word, category: 4 };
          $.ajax({
            method: 'POST',
            url: '/api/toBuy',
            data: postData,
            success: function (task) {
              console.log(`'${word}' added as a task.`);
            },
            error: function (error) {
              console.error('Error adding task:', error);
            }
          });
        }

        if (edamamResponse.category === 'Not Found') {
          // If Edamam API didn't find a match, check the themoviedb API
          const yelpApiUrl = `/api/toEat?word=${word}`;
          $.ajax({
            method: 'GET',
            url: yelpApiUrl
          })
            .done((yelpResponse) => {

              if (yelpResponse.category === 'Restaurants') {
                const postData = { word: word, category: 2 };
                $.ajax({
                  method: 'POST',
                  url: '/api/toEat',
                  data: postData,
                  success: function (task) {
                    console.log(`'${word}' added as a task.`);
                  },
                  error: function (error) {
                    console.error('Error adding task:', error);
                  }
                });
              }

              if (yelpResponse.category === 'Not Found') {
                // If TMDB API didn't find a match, check the yelp API
                const tmbdApiUrl = `/api/toWatch?word=${word}`;
                $.ajax({
                  method: 'GET',
                  url: tmbdApiUrl
                })
                  .done((tmbdResponse) => {

                    if (tmbdResponse.category === 'Films') {
                      const postData = { word: word, category: 1 };
                      $.ajax({
                        method: 'POST',
                        url: '/api/toWatch',
                        data: postData,
                        success: function (task) {
                          console.log(`'${word}' added as a task.`);
                        },
                        error: function (error) {
                          console.error('Error adding task:', error);
                        }
                      });
                    }

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
          $category.text(`'${word}' added to: ${edamamResponse.category}`);
        }
      })
      .fail(() => {
        $category.empty();
        $category.text('An error occurred.');
      });
  });
});
