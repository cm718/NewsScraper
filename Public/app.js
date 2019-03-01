$(document).ready(function () {
    $.getJSON('/', function (data) {
        console.log(data)
    });

});


// function displayArticles(articles) {

//     articles.forEach(article => {
//         let link = article.link;
//         const card = `<h1>${link}</h1>`;
//         $(".card-list").append(card);
//     });
// }

// $.getJSON("/", function (data) {
//     displayArticles(data);
// });