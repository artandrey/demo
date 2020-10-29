const searchContainer = document.querySelector('.search-results');
const searchUnderContainer = document.querySelector('.search-under-list');


const search = DATA_OBJECT.search;
const undersearch = DATA_OBJECT.undersearch;


const createSearchResult = function (data, isAdd) {
    let {title, text, link, fakeLink} = data;
    if (!fakeLink) {
        fakeLink = link;
    }
    const markup = `
    <div class="search-result">
				
		 <div class="search-item">
            <a href="${link}">
            ${isAdd ? '<span>Реклама</span>' : ''}${fakeLink}</a>
            <a href="${link}" class="main-link">${title}</a>
            <p>${text}</p>
        </div>
    </div>
    
    `;
    return markup;
}
const createUndersearchResult = function(text) {
    const markup = `
    <a class="other-search" href="#?p=${text}"><li class="other-search">
    <svg class="other-search" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="other-search" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
    <p class="other-search">${text}</p>
    </li></a>
    `
    return markup;
}
addEventListener('click', event => {
    console.log(event.target)
    if (event.target.classList.contains('other-search')) {
    const index = Math.floor(Math.random() * textResultsLength);
    updateSearch(index);
}
else if (event.target.classList.contains('number-link')) {
    updateSearch(+event.target.id);
    }
});

const updateSearch = function (index) {
    const searchesPerPage = 18;
    const searchPart = search.slice(index * searchesPerPage, index * searchesPerPage + searchesPerPage);
    while (searchPart.length !== searchesPerPage) {
        searchPart.push(search[Math.floor(Math.random() * search.length)]);
    }
    let searchMarkup = searchPart.map((el, i) => {
        const isAdd = i < 3 || Math.random() > 0.8; 
        return createSearchResult(el, isAdd);
    }).join('\n');
    searchContainer.innerHTML = searchMarkup;
    window.scrollTo(0,0);
}
updateSearch(0);
let undersearchMarckup = undersearch.map(el => createUndersearchResult(el)).join('\n');
const textResultsLength = undersearchMarckup.length;
searchUnderContainer.innerHTML = undersearchMarckup;