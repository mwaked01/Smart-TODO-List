$(() => {
  const $category = $('#categoryResult');
  const $form = $('#categoryForm');
  $form.on('submit', (e) => {
    e.preventDefault();
    const word = $('#word').val();
    const edamamApiUrl = `/api/toBuy?word=${word}`;
    $form.addClass("loading");
    $.ajax({
      method: 'GET',
      url: edamamApiUrl
    })
      .done((edamamResponse) => {

        if (edamamResponse.category === 'Products') {
          $form.removeClass("loading");
          const postData = { word: word, category: 4 };
          $.ajax({
            method: 'POST',
            url: '/api/toBuy',
            data: postData,
            success: function (task) {
              console.log(`'${word}' added as a task.`);
              location.reload(true);
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
                $form.removeClass("loading");
                const postData = { word: word, category: 2 };
                $.ajax({
                  method: 'POST',
                  url: '/api/toEat',
                  data: postData,
                  success: function (task) {
                    console.log(`'${word}' added as a task.`);
                    location.reload(true);
                  },
                  error: function (error) {
                    console.error('Error adding task:', error);
                  }
                });
              }

              if (yelpResponse.category === 'Not Found') {
                const openlibraryApiUrl = `/api/toRead?word=${word}`;
                $.ajax({
                  method: 'GET',
                  url: openlibraryApiUrl
                })
                  .done((openlibraryResponse) => {

                    if (openlibraryResponse.category === 'Books') {
                      $form.removeClass("loading");
                      const postData = { word: word, category: 3 };
                      $.ajax({
                        method: 'POST',
                        url: '/api/toRead',
                        data: postData,
                        success: function (task) {
                          console.log(`'${word}' added as a task.`);
                          location.reload(true);
                        },
                        error: function (error) {
                          console.error('Error adding task:', error);
                        }
                      });
                    }
                    if (openlibraryResponse.category === 'Not Found') {

                      const tmdbApiUrl = `/api/toWatch?word=${word}`;
                      $.ajax({
                        method: 'GET',
                        url: tmdbApiUrl
                      })
                        .done((tmbdResponse) => {
                          if (tmbdResponse.category === 'Films') {
                            $form.removeClass("loading");
                            const postData = { word: word, category: 1 };
                            $.ajax({
                              method: 'POST',
                              url: '/api/toWatch',
                              data: postData,
                              success: function (task) {
                                console.log(`'${word}' added as a task.`);
                                location.reload(true);
                              },
                              error: function (error) {
                                console.error('Error adding task:', error);
                              }
                            });
                            $category.empty();
                            $category.text(`'${word}' added to: ${tmbdResponse.category}`);
                          }

                          if (tmbdResponse.category === 'Not Found') {
                            $form.removeClass("loading");
                            const postData = { word: word, category: 5 };
                            $.ajax({
                              method: 'POST',
                              url: '/uncategorized',
                              data: postData,
                              success: function (task) {
                                console.log(`'${word}' added as a task.`);
                                location.reload(true);
                              },
                              error: function (error) {
                                console.error('Error adding task:', error);
                              }
                            });
                            $category.empty();
                            $category.text(`${word} added to Uncategorized`);
                          }

                        })
                        .fail(() => {
                          $category.empty();
                          $category.text('An error occurred.');
                        });
                    } else {
                      $category.empty();
                      $category.text(`${word} added to ${openlibraryResponse.category}`);
                    }

                  })
                  .fail(() => {
                    $category.empty();
                    $category.text('An error occurred.');
                  });
              } else {
                $category.empty();
                $category.text(`${word} added to ${yelpResponse.category}`);
              }
            })
            .fail(() => {
              $category.empty();
              $category.text('An error occurred.');
            });
        } else {
          $category.empty();
          $category.text(`${word} added to ${edamamResponse.category}`);
        }
      })
      .fail(() => {
        $category.empty();
        $category.text('An error occurred.');
      });
  });
});
