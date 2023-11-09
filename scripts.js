/** ============================================== Importing Data and Constants ===================================*/

import { books, genres, BOOKS_PER_PAGE, authors } from "./data.js";



const booksList = books;

let matches = books.slice(0, BOOKS_PER_PAGE);
let page = 1;

const range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE];

if (!matches || !Array.isArray(books)) throw new Error('Source required');
if (!range || range.length < 2) throw new Error('Range must be an array with two numbers');



/** ===================================== Create Preview Elements ============================================*/

function createPreview(bookData) {
    const { authors, id, image, title, genre } = bookData;


    const preview = document.createElement('div');
    preview.classList.add('preview');
    preview.setAttribute('data-preview', id);


    const imageElement = document.createElement('img');
    imageElement.classList.add('preview__image');
    imageElement.src = image;


    const info = document.createElement('div');
    info.classList.add('preview__info');


    const titleElement = document.createElement('h3');
    titleElement.classList.add('preview__title');
    titleElement.textContent = title;

    const genreElement = document.createElement('div');
    genreElement.classList.add('preview__genre');
    genreElement.textContent = genre;



    const authorElement = document.createElement('div');
    authorElement.classList.add('preview__author');

    const authorName = authors[authors];
    authorElement.textContent = authorName;

    info.appendChild(genreElement);

    info.appendChild(titleElement);
    info.appendChild(authorElement);

    preview.appendChild(imageElement);
    preview.appendChild(info);

    return preview;
}


/** ===================================== Show more button - data-list-button ======================================*/


function loadInitialBooks() {


    const dataListButton = document.querySelector('[data-list-button]');

    dataListButton.addEventListener('click', loadMoreBooks);

    loadMoreBooks();
}


document.addEventListener('DOMContentLoaded', loadInitialBooks);

function loadMoreBooks() {

    const rangeStart = (page - 1) * BOOKS_PER_PAGE;
    const rangeEnd = page * BOOKS_PER_PAGE;

    const extracted = books.slice(rangeStart, rangeEnd);

    const fragment = document.createDocumentFragment();


    for (const book of extracted) {

        const preview = createPreview({
            authors: book.author,
            id: book.id,
            image: book.image,
            title: book.title,
            genre: book.genre,
        });

        fragment.appendChild(preview);
    }

    const listItemsContainer = document.querySelector('[data-list-items]');

    if (listItemsContainer) {
        listItemsContainer.appendChild(fragment);
    }
    page++;

    const dataListButton = document.querySelector('[data-list-button]');
    if (dataListButton) {
        const totalBooks = books.length;
        const remainingBooks = totalBooks - (page * BOOKS_PER_PAGE);
        const remainingText = remainingBooks > 0 ? remainingBooks : 0;
        dataListButton.innerHTML = `
            <span>Show more</span>
            <span class="list__remaining">(${remainingText})</span>
        `;
        dataListButton.disabled = remainingBooks <= 0;
    }
}



/** ===========================================  Create genres ================================================ */


const genresFragment = document.createDocumentFragment();


const allGenresOption = document.createElement('option');
allGenresOption.value = 'any';
allGenresOption.innerText = 'All Genres';
genresFragment.appendChild(allGenresOption);


const genresEntries = Object.entries(genres);


for (const [id, name] of genresEntries) {

    const genreOption = document.createElement('option');
    genreOption.value = id;
    genreOption.innerText = name;
    genresFragment.appendChild(genreOption);
}


const genresSelect = document.querySelector('[data-list-genres]');


if (genresSelect) {

    genresSelect.innerHTML = '';

    genresSelect.appendChild(allGenresOption);
    genresSelect.appendChild(genresFragment);
}

const searchGenresContainer = document.querySelector('[data-search-genres]');

if (searchGenresContainer) {

    searchGenresContainer.innerHTML = '';

    searchGenresContainer.appendChild(allGenresOption);
    searchGenresContainer.appendChild(genresFragment);
}

/** =============================================== data-search-authors ==========================================  */


const authorsFragment = document.createDocumentFragment();


const allAuthorsOption = document.createElement('option');
allAuthorsOption.value = 'any';
allAuthorsOption.innerText = 'All Authors';
authorsFragment.appendChild(allAuthorsOption);

const authorsEntries = Object.entries(authors);


for (const [id, name] of authorsEntries) {
    const authorOption = document.createElement('option');
    authorOption.value = id;
    authorOption.innerText = name;
    authorsFragment.appendChild(authorOption);
}

const authorsSelect = document.querySelector('[data-list-authors]');


if (authorsSelect) {

    authorsSelect.innerHTML = '';

    authorsSelect.appendChild(allAuthorsOption);
    authorsSelect.appendChild(authorsFragment);
}

const searchAuthorsSelect = document.querySelector('[data-search-authors]');

if (searchAuthorsSelect) {

    searchAuthorsSelect.innerHTML = '';

    searchAuthorsSelect.appendChild(allAuthorsOption);
    searchAuthorsSelect.appendChild(authorsFragment);
}



/** ================================================= Theme Settings ================================================= */

document.addEventListener('DOMContentLoaded', function () {

    const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let theme = isDarkModePreferred ? 'night' : 'day';

    const themeColors = {
        day: {
            dark: '10, 10, 20',
            light: '255, 255, 255',
        },
        night: {
            dark: '255, 255, 255',
            light: '10, 10, 20',
        },
    };

    function toggleTheme() {
        theme = theme === 'day' ? 'night' : 'day';
        document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
        document.documentElement.style.setProperty('--color-light', themeColors[theme].light);
    }


    function showThemeSelectionDialog() {
        const themeDialog = document.querySelector('[data-settings-overlay]');
        const overlayButtons = document.querySelector('.overlay__buttons');
        const dataListMessage = document.querySelector('[data-list-message]');


        if (themeDialog && overlayButtons && dataListMessage) {

            dataListMessage.style.display = 'none';

            overlayButtons.style.display = 'flex';

            themeDialog.showModal();
        }
    }

    function handleThemeSelectionAndSave(event) {
        event.preventDefault();

        const selectedTheme = document.querySelector('[data-settings-theme]').value;
        if (selectedTheme === 'day' || selectedTheme === 'night') {

            localStorage.setItem('themePreference', selectedTheme);

            theme = selectedTheme;
            document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
            document.documentElement.style.setProperty('--color-light', themeColors[theme].light);
        }

        const themeDialog = document.querySelector('[data-settings-overlay]');
        themeDialog.close();
    }

    function handleCancelButtonClick(event) {
        event.preventDefault();
        const themeDialog = document.querySelector('[data-settings-overlay]');
        themeDialog.close();
    }


    const dataHeaderSettings = document.querySelector('[data-header-settings]');

    if (dataHeaderSettings) {
        dataHeaderSettings.addEventListener('click', showThemeSelectionDialog);
    }


    const themeSelectionForm = document.querySelector('[data-settings-form]');

    if (themeSelectionForm) {
        themeSelectionForm.addEventListener('submit', handleThemeSelectionAndSave);
    }

    const cancelButton = document.querySelector('[data-cancel-button]');

    if (cancelButton) {
        cancelButton.addEventListener('click', handleCancelButtonClick);
    }

    document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
    document.documentElement.style.setProperty('--color-light', themeColors[theme].light);

    const dataListButton = document.querySelector('[data-list-button]');
    if (dataListButton) {
        const remainingBooks = books.length - (page * BOOKS_PER_PAGE);
        const remainingText = remainingBooks > 0 ? remainingBooks : 0;

        dataListButton.innerHTML = `<span>Show more</span><span class="list__remaining">(${remainingText})</span>`;

        dataListButton.disabled = !(remainingBooks > 0);

        dataListButton.addEventListener('click', loadMoreBooks);
    }

});



/** ============================================= data-settings-form =============================================== */

const settingsForm = document.querySelector('[data-settings-form]');

function handleSettingsFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
}

settingsForm.addEventListener('submit', handleSettingsFormSubmit);

const searchForm = document.querySelector('[data-search-form]');

searchForm.addEventListener('submit', handleSearchFormSubmit);




/** ========================================== data-search-cancel ==================================== */

const searchCancelButton = document.querySelector('[data-search-cancel]');
const searchOverlayElement = document.querySelector('[data-search-overlay]');

function handleSearchCancelButtonClick() {
    if (searchOverlayElement.open === true) {
        searchOverlayElement.open = false; // Close the search overlay
    }
}
searchCancelButton.addEventListener('click', handleSearchCancelButtonClick);



/** ========================================== data-list-close ==================================== */

const listCloseButton = document.querySelector('[data-list-close]');
const listActiveElement = document.querySelector('[data-list-active]');

function handleListCloseButtonClick() {
    if (listActiveElement.open === true) {
        listActiveElement.open = false; // Close the list overlay
    }
}
listCloseButton.addEventListener('click', handleListCloseButtonClick);


/** ====================================== data-list-button ======================================================= */

document.querySelector('[data-list-items]').addEventListener('click', function (event) {

    const pathArray = Array.from(event.path || event.composedPath());
    let active;

    for (const node of pathArray) {
        if (active) break; // Exit the loop if the active book is found
        const previewId = node?.dataset?.preview;

        for (const singleBook of books) {
            if (singleBook.id === previewId) {
                active = singleBook; // Found the active book
                break;
            }
        }
    }

    // If no active book is found, exit the function
    if (!active) return;


    // Get a reference to the dialog element with data-list-active attribute
    const dataListActive = document.querySelector('[data-list-active]');
    // Get references to other elements inside the dataListActive dialog
    const dataListBlur = document.querySelector('[data-list-blur]');
    const dataListImage = document.querySelector('[data-list-image]');
    const dataListTitle = document.querySelector('[data-list-title]');
    const dataListSubtitle = document.querySelector('[data-list-subtitle]');
    const dataListDescription = document.querySelector('[data-list-description]');


    if (dataListActive) {
        dataListActive.open = true;
    }
    if (dataListBlur) {
        dataListBlur.src = active ? '' : active.image;
    }
    if (dataListImage) {
        dataListImage.src = active ? active.image : '';
    }
    if (dataListTitle) {
        dataListTitle.textContent = active.title;
    }
    if (dataListSubtitle) {
        dataListSubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
    }
    if (dataListDescription) {
        dataListDescription.textContent = active.description;
    }

    function handleDataListCloseClick(event) {
        if (dataListActive) {
            dataListActive.open = false;
        }
    }

    const dataListCloseButton = document.querySelector('[data-list-close]');
    if (dataListCloseButton) {
        dataListCloseButton.addEventListener('click', handleDataListCloseClick);
    }
});


/** ====================================== data-header-search ==================================================== */

document.querySelector('[data-header-search]').addEventListener('click', function () {
    const searchOverlay = document.querySelector('[data-search-overlay]');
    const searchTitle = document.querySelector('[data-search-title]');

    searchOverlay.open = true;

    searchTitle.focus();
});









/** =========================================== data-search-form ============================================= */

function handleSearchFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const results = [];

    for (const book of booksList) {
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
        const authorMatch = filters.author === 'any' || book.author === filters.author;
        let genreMatch = true;

        if (filters.genre !== 'any') {
            genreMatch = book.genres.includes(filters.genre);
        }

        if (titleMatch && authorMatch && genreMatch) {
            results.push(book);
        }
    }

    // Call the function to update the book list with the filtered results
    updateBookList(results);
}


// Implement the function to update the book list
function updateBookList(results) {
    // Get references to the required elements
    const dataListItems = document.querySelector('[data-list-items]');
    const dataListButton = document.querySelector('[data-list-button]');
    const dataSearchOverlay = document.querySelector('[data-search-overlay]');
    const dataListMessage = document.querySelector('[data-list-message]');

    // Calculate the remaining books count to be displayed in the 'Show more' button
    const remainingBooks = results.length - (page * BOOKS_PER_PAGE);
    const hasRemaining = remainingBooks > 0;
    const remaining = hasRemaining ? remainingBooks : 0;

    // Disable the 'Show more' button if there are no remaining books
    if (dataListButton) {
        dataListButton.disabled = !hasRemaining;
    }

    // Set the innerHTML of the 'Show more' button to display the remaining books count
    if (dataListButton) {
        dataListButton.innerHTML = `
            <span>Show more</span>
            <span class="list__remaining">(${remaining})</span>
        `;
    }

    // Create a fragment to hold the new book previews
    const fragment = document.createDocumentFragment();

    for (const book of results) {
        const { author: authorId, id, image, title } = book;
        const element = document.createElement('button');
        element.classList.add('preview');
        element.setAttribute('data-preview', id);

        element.innerHTML = `
            <img class="preview__image" src="${image}" />
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `;

        fragment.appendChild(element);
    }

    dataListItems.innerHTML = '';

    dataListItems.appendChild(fragment);

    // Show or hide the "No results found" message based on the presence of search results
    if (dataListMessage) {
        dataListMessage.style.display = results.length === 0 ? 'block' : 'none';
    }

    // Show or hide the overlay buttons based on the presence of search results
    if (dataListButton && dataListMessage) {
        dataListButton.style.display = results.length > 0 ? 'block' : 'none';
        dataListMessage.style.display = results.length === 0 ? 'block' : 'none';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (dataSearchOverlay) {
        dataSearchOverlay.open = false;
    }
}





/** ========================================= data-list-items.innerHTML ================================== */

document.querySelector('[data-list-items]').innerHTML = '';
const fragment = document.createDocumentFragment();
const extracted = books.slice(range[0], range[1]);

for (const props of extracted) {
    const { author: authorId, id, image, title } = props;

    const element = document.createElement('button');
    element.classList.add('preview');
    element.setAttribute('data-preview', id);

    element.innerHTML = /* html */ `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[authorId]}</div>
        </div>
    `;

    fragment.appendChild(element);
}

// Append the fragment to the container
document.querySelector('[data-list-items]').appendChild(fragment);

const initial = matches.length - page * BOOKS_PER_PAGE;
const hasRemaining = initial > 0;
const remaining = hasRemaining ? initial : 0;

document.querySelector('[data-list-button]').disabled = !hasRemaining;

document.querySelector('[data-list-button]').innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining">(${remaining})</span>
`;

window.scrollTo({ top: 0, behavior: 'smooth' });
document.querySelector('[data-search-overlay]').open = false;





/** ============================================= data-list-items ==================================================== */

document.querySelector('[data-list-items]').addEventListener('click', function (event) {
    const pathArray = Array.from(event.path || event.composedPath());
    let active;

    for (const node of pathArray) {
        if (active) {
            break;
        }
        const previewId = node?.dataset?.preview;

        for (const singleBook of books) {
            if (singleBook.id === previewId) {
                active = singleBook;
                break;
            }
        }
    }

    if (!active) {
        return;
    }

    const dataListActive = document.querySelector('[data-list-active]');
    const dataListBlur = document.querySelector('[data-list-blur]');
    const dataListImage = document.querySelector('[data-list-image]');
    const dataListTitle = document.querySelector('[data-list-title]');
    const dataListSubtitle = document.querySelector('[data-list-subtitle]');
    const dataListDescription = document.querySelector('[data-list-description]');

    if (dataListActive) {
        dataListActive.open = true;
    }
    if (dataListBlur && dataListImage) {
        dataListBlur.src = dataListImage.src = active.image;
    }
    if (dataListTitle) {
        dataListTitle.textContent = active.title;
    }
    if (dataListSubtitle) {
        dataListSubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
    }
    if (dataListDescription) {
        dataListDescription.textContent = active.description;
    }
});