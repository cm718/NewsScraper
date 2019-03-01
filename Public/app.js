$(document).ready(function () {
    $.getJSON('/', function (data) {
        console.log(data)
    });

});

// scrape the website again and push the data to database on click
$(document).on('click', '#scrape', () => {
    $.ajax({
        method: 'GET',
        url: `/scrape`
    }).then(function (data) {
        console.log(data);
        document.location.href = '/';

    })
});

// click event to go to the saved articles page
$(document).on('click', '#saved', () => {
    $.ajax({
        method: 'GET',
        url: '/saved'
    }).then(function () {
        document.location.href = '/saved';

    })
});