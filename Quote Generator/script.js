const quote = document.getElementById("quote");
const author = document.getElementById("author");
const url = "https://api.quotable.io/random";

async function getquote(url){
    const response = await fetch(url);
    var data = await response.json();
    quote.innerHTML = data.content;
    author.innerHTML = data.author;
}
getquote(url);

function tweet(){
    window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML + 
    " - " + author.innerHTML, "Tweet Window", "width=600, height=300");
}


exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
exports.build = series(scssTask, jsTask);

