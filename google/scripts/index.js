const searchContainer = document.querySelector('.search-results');
const searchUnderContainer = document.querySelector('.search-under-list');
const searchInputs = [...document.querySelectorAll('.search-input-input')];
const search = DATA_OBJECT.search;
const undersearch = DATA_OBJECT.undersearch;
const shuffle = function (array) {
    return array.sort(() => Math.random() - 0.5);
}
document.querySelector('.search-input').addEventListener('submit', () => {
    updateSearch(Math.floor(Math.random() * 3));
});
addEventListener('click', (event) => {
    console.log(event.target)
    if (event.target.classList.contains('search-svg') || event.target.classList.contains('search-buttton')) {
        console.log(123);
        updateSearch(Math.floor(Math.random() * 3));
    }
});
document.querySelector('.tabs').addEventListener('click', (event) => {
    if (event.target.nodeName !== "DIV" && event.target.nodeName !== "UL") {
        updateSearch(Math.floor(Math.random() * 3));
    }
});
const counters = {
    text: 0,
    title: 0,
    fakeLink: 0
}

const createSearchResult = function (data, isAdd) {
    let {
        link,
        fakeLink,
        icon,
        text,
        title
    } = data;
    if (!fakeLink) {
        fakeLink = link;
    }
    const markup = `
    <div class="search-result">
				
		 <div class="search-item">
            <a href="${link}">
            ${icon ? `<img alt="" src="./files/${icon}">` : ''}
            ${isAdd ? '<span>Реклама</span>' : ''}${fakeLink}</a>
            <a href="${link}" class="main-link">${title}</a>
            <p>${text}</p>
            ${Math.floor(Math.random() < 0.2) ? `
            <div class="quick-links"> 
            <ul><a href="${link}"><li>Как оформить кредит<hr></li></a><a href="${link}"><li>Ставка 0.01%<hr></li></a>	</ul>
            </div>
            ` : ''}
        </div>  
    </div>
    `;
    return markup;
}
const createUndersearchResult = function (text) {
    const markup = `
    <a class="other-search" textValue="${text}" href="#?p=${text}"><li class="other-search" textValue="${text}">
    <svg class="other-search" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="other-search" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
    <p class="other-search" textValue="${text}">${text}</p>
    </li></a>
    `
    return markup;
}
addEventListener('click', event => {
    console.log(searchInputs);
    if (event.target.classList.contains('other-search')) {
        searchInputs.forEach(element => {
            element.value = event.target.getAttribute('textValue');
            
        });
        const index = Math.floor(Math.random() * textResultsLength);
        updateSearch(index);
    } else if (event.target.classList.contains('number-link')) {
        updateSearch(+event.target.id);
    }
});

const updateSearch = function () {
    const searchesPerPage = 18;
    const searchPart = shuffle(search).slice(0, searchesPerPage);
    while (searchPart.length !== searchesPerPage) {
        searchPart.push(search[Math.floor(Math.random() * search.length)]);
    }
    let searchMarkup = searchPart.map((el, i) => {
        const isAdd = i < 3 || Math.random() > 0.8;
        return createSearchResult(el, isAdd);
    }).join('\n');
    searchContainer.innerHTML = searchMarkup;
    window.scrollTo(0, 0);
}
if (!Number.isNaN(+window.location.search[2])) {
    updateSearch(+window.location.search[3])
}
else {
    updateSearch(0);
}

let undersearchMarckup = undersearch.map(el => createUndersearchResult(el)).join('\n');
const textResultsLength = undersearchMarckup.length;
searchUnderContainer.innerHTML = undersearchMarckup;