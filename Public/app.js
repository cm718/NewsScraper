
function displayArticles(articles) {
    $("tbody").empty();

    articles.forEach(article => {
        let href = article.link;
        const tr = $("<tr>").append(
            $("<td>").text(article.title),
            $(`<a href='${href}'>${href}</a>`)
        );
        $("tbody").append(tr);
    });
}

$.getJSON("/", function(data){
    displayArticles(data);
});