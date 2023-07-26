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


    /**
     * this code creates a new <div> element, assigns it the class 'preview',
     *  and sets a custom 'data-preview' attribute on it with a value derived from the id variable.
     *  This allows the element to be uniquely identified or carry additional data as needed for further use in the application.
     */
    const preview = document.createElement('div');
    preview.classList.add('preview');
    preview.setAttribute('data-preview', id);


    /**
     * this code creates a new <img> element, assigns it the class 'preview__image', 
     * and sets the 'src' attribute to the value of the image variable, which dynamically loads the specified image into the element. 
     * This allows the element to display the image associated with the provided image value.
     */
    const imageElement = document.createElement('img');
    imageElement.classList.add('preview__image');
    imageElement.src = image;



    /**
     * this code creates a new <div> element and assigns it the class 'preview__info'. 
     * This allows the element to be styled according to the CSS rules associated with the 'preview__info' class,
     * and it can be used to structure and style content within the preview element.
     */
    const info = document.createElement('div');
    info.classList.add('preview__info');


    /** this code creates a new <h3> element, assigns it the class 'preview__title',
     * and sets its text content to the value of the title variable. The resulting <h3> element
     * can be styled with CSS according to the rules associated with the 'preview__title' class, 
     * and it will display the provided title text within the preview element. */
    const titleElement = document.createElement('h3');
    titleElement.classList.add('preview__title');
    titleElement.textContent = title;

    /**
   * this code creates a new <div> element, assigns it the class 'preview__genre',
   * and sets its text content to the value of the genre variable.
   * The resulting <div> element can be styled with CSS according to the rules associated with the 'preview__genre' class,
   * and it will display the genre information within the preview element.
   */
    const genreElement = document.createElement('div');
    genreElement.classList.add('preview__genre');
    genreElement.textContent = genre;


    /**
     * this code creates a new <div> element, assigns it the class 'preview__author', 
     * and sets its text content to the value of the authors variable. The resulting <div> element 
     * can be styled with CSS according to the rules associated with the 'preview__author' class, 
     * and it will display the author information within the preview element.
     */
    const authorElement = document.createElement('div');
    authorElement.classList.add('preview__author');

    // Get the author's name from the 'authors' object using the 'author' ID
    const authorName = authors[authors];
    authorElement.textContent = authorName;


    // Append the genre element to the info element to display the genre in the preview.
    info.appendChild(genreElement);

    /**
     * By using these two appendChild() calls, the info element will now contain both the 
     * titleElement and the authorElement as its child nodes. This allows the book's title and
     * author information to be structured and displayed 
     * within the parent info element when the preview is rendered on a web page.
     */
    info.appendChild(titleElement);
    info.appendChild(authorElement);

    /**
     * By using these two appendChild() calls, the preview element will now contain
     *  both the imageElement (representing the book's cover image) and the info element 
     * (containing the title and author information) as its child nodes. This structure 
     * allows all the necessary content to be arranged and displayed within the parent 
     * preview element when it is rendered on a web page.
     */
    preview.appendChild(imageElement);
    preview.appendChild(info);



    return preview;
}



/** ===================================== Show more button - data-list-button =================================*/

function loadMoreBooks() {
    // Calculate the range of books to extract for the current page
    const rangeStart = (page - 1) * BOOKS_PER_PAGE;
    const rangeEnd = page * BOOKS_PER_PAGE;

    // Extract the books for the current page
    const extracted = books.slice(rangeStart, rangeEnd);

    // Create a fragment to hold the new book previews
    const fragment = document.createDocumentFragment();

    // Loop through each book in the extracted list and create a preview for it
    for (const props of extracted) {
        // Call the createPreview function to create a preview for the book
        const preview = createPreview({
            authors: props.author,
            id: props.id,
            image: props.image,
            title: props.title,
            genre: props.genre,
        });

        // Append the preview to the fragment
        fragment.appendChild(preview);
    }

    // Get a reference to the container where the previews will be displayed
    const listItemsContainer = document.querySelector('[data-list-items]');

    // Check if the container exists and append the fragment to it
    if (listItemsContainer) {
        listItemsContainer.appendChild(fragment);
    }

    // Update the page number for the next load
    page++;

    // Update the "Show more" button with the correct remaining books count and disable it when no more books to show
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

// Create the initial option for 'All Genres'
const allGenresOption = document.createElement('option');
allGenresOption.value = 'any';
allGenresOption.innerText = 'All Genres';
genresFragment.appendChild(allGenresOption);

// Assuming 'genres' is an object containing genre options as key-value pairs
const genresEntries = Object.entries(genres);

for (const [id, name] of genresEntries) {
    // Create a new option element for each genre
    const genreOption = document.createElement('option');
    genreOption.value = id;
    genreOption.innerText = name;
    genresFragment.appendChild(genreOption);
}

// Assuming 'data-list-genres' is the ID or selector of the select element where you want to append the genre options
const genresSelect = document.querySelector('[data-list-genres]');

// Append the genre options to the select element
if (genresSelect) {
    // Clear the select element first to remove any existing options
    genresSelect.innerHTML = '';

    // Append the genre options from the fragment to the select element
    genresSelect.appendChild(allGenresOption);
    genresSelect.appendChild(genresFragment);
}

// Assuming 'data-search-genres' is the ID or selector of the select element where you want to append the genre options
const searchGenresContainer = document.querySelector('[data-search-genres]');

// Append the genre options to the search select element
if (searchGenresContainer) {
    // Clear the select element first to remove any existing options
    searchGenresContainer.innerHTML = '';

    // Append the genre options from the fragment to the select element
    searchGenresContainer.appendChild(allGenresOption);
    searchGenresContainer.appendChild(genresFragment);
}




/** =============================================== data-search-authors ====================================  */






























/** =============================================== data-search-authors ====================================  */

const authorsFragment = document.createDocumentFragment();

// Create the initial option for 'All Authors'
const allAuthorsOption = document.createElement('option');
allAuthorsOption.value = 'any';
allAuthorsOption.innerText = 'All Authors';
authorsFragment.appendChild(allAuthorsOption);

// Assuming 'authors' is an object containing author options as key-value pairs
const authorsEntries = Object.entries(authors);

for (const [id, name] of authorsEntries) {
    // Create a new option element for each author
    const authorOption = document.createElement('option');
    authorOption.value = id;
    authorOption.innerText = name;
    authorsFragment.appendChild(authorOption);
}

// Assuming 'data-list-authors' is the ID or selector of the select element where you want to append the author options
const authorsSelect = document.querySelector('[data-list-authors]');

// Append the author options to the select element
if (authorsSelect) {
    // Clear the select element first to remove any existing options
    authorsSelect.innerHTML = '';

    // Append the author options from the fragment to the select element
    authorsSelect.appendChild(allAuthorsOption);
    authorsSelect.appendChild(authorsFragment);
}

// Assuming 'data-search-authors' is the ID or selector of the select element where you want to append the author options
const searchAuthorsSelect = document.querySelector('[data-search-authors]');

// Append the author options to the search select element
if (searchAuthorsSelect) {
    // Clear the select element first to remove any existing options
    searchAuthorsSelect.innerHTML = '';

    // Append the author options from the fragment to the select element
    searchAuthorsSelect.appendChild(allAuthorsOption);
    searchAuthorsSelect.appendChild(authorsFragment);
}










/** ================================================= Theme Settings ================================================= */

/**
 * This event listener is triggered when the DOM content is fully loaded.
 */
document.addEventListener('DOMContentLoaded', function () {

    // Get the theme setting value from the form
    const dataSettingsTheme = document.querySelector('[data-settings-theme]').value;

    // Check if the user prefers dark mode
    const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set the theme to either 'night' or 'day' based on user preference
    let theme = isDarkModePreferred ? 'night' : 'day';

    // Define CSS colors for day and night themes
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

    /**
     * Function to toggle the theme between day and night.
     * It updates the CSS variables for the theme colors.
     */
    function toggleTheme() {
        theme = theme === 'day' ? 'night' : 'day';
        document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
        document.documentElement.style.setProperty('--color-light', themeColors[theme].light);
    }

    // Get the data-header-settings element for theme toggle
    const dataHeaderSettings = document.querySelector('[data-header-settings]');

    // Attach the toggleTheme function to the data-header-settings element's click event
    if (dataHeaderSettings) {
        dataHeaderSettings.addEventListener('click', toggleTheme);
    }

    // Apply the selected theme colors to the document
    document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
    document.documentElement.style.setProperty('--color-light', themeColors[theme].light);

    // Update the "Show more" button with the remaining books count
    const dataListButton = document.querySelector('[data-list-button]');
    if (dataListButton) {
        const remainingBooks = books.length - (page * BOOKS_PER_PAGE);
        const remainingText = remainingBooks > 0 ? remainingBooks : 0;

        // Set the innerHTML of the "Show more" button with the remaining books count
        dataListButton.innerHTML = `<span>Show more</span><span class="list__remaining">(${remainingText})</span>`;

        // Disable the "Show more" button if there are no remaining books
        dataListButton.disabled = !(remainingBooks > 0);

        // Attach the loadMoreBooks function to the "Show more" button's click event
        dataListButton.addEventListener('click', loadMoreBooks);
    }
});







/** ========================================== data-search-cancel ==================================== */

const searchCancelButton = document.querySelector('[data-search-cancel]');
const searchOverlayElement = document.querySelector('[data-search-overlay]');

function handleSearchCancelButtonClick() {
    if (searchOverlayElement.open === true) {
        searchOverlayElement.open = false; // Close the search overlay
    }
}
searchCancelButton.addEventListener('click', handleSearchCancelButtonClick);





/** ========================================== data-settings-form ==================================== */

const settingsForm = document.querySelector('[data-settings-form]');

function handleSettingsFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Your code to handle the form submission goes here
    actions.settings.submit(); // Call the function to handle form submission
}

settingsForm.addEventListener('submit', handleSettingsFormSubmit);


/** ========================================== data-list-close ==================================== */

const listCloseButton = document.querySelector('[data-list-close]');
const listActiveElement = document.querySelector('[data-list-active]');

function handleListCloseButtonClick() {
    if (listActiveElement.open === true) {
        listActiveElement.open = false; // Close the list overlay
    }
}
listCloseButton.addEventListener('click', handleListCloseButtonClick);





/** ====================================== data-list-button ============================================= */

document.querySelector('[data-list-items]').addEventListener('click', function (event) {
    // Getting the path array of the clicked element to find the book preview button
    const pathArray = Array.from(event.path || event.composedPath());
    let active;

    // Looping through the path array to find the book preview button and its dataset
    for (const node of pathArray) {
        if (active) break; // Exit the loop if the active book is found
        const previewId = node?.dataset?.preview;

        // Searching for the book with the matching id in the 'books' array
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

    // Updating the book details in the UI
    if (dataListActive) {
        dataListActive.open = true;
    }
    if (dataListBlur) {
        // Set the 'src' attribute of the blur image based on whether the item is active or not
        dataListBlur.src = active ? '' : active.image;
    }
    if (dataListImage) {
        // Set the 'src' attribute of the main image
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

    // Function to handle the click event on the "Close" button inside the dataListActive dialog
    function handleDataListCloseClick(event) {
        // Close the dialog by setting its open attribute to false
        if (dataListActive) {
            dataListActive.open = false;
        }
    }

    // Attach the event listener to the "Close" button inside the dataListActive dialog
    const dataListCloseButton = document.querySelector('[data-list-close]');
    if (dataListCloseButton) {
        dataListCloseButton.addEventListener('click', handleDataListCloseClick);
    }
});





/** ====================================== data-header-search ============================================= */

// Add a click event listener to the search button in the header
document.querySelector('[data-header-search]').addEventListener('click', function () {
    // Get references to the search overlay and title input elements
    const searchOverlay = document.querySelector('[data-search-overlay]');
    const searchTitle = document.querySelector('[data-search-title]');

    // Open the search overlay
    searchOverlay.open = true;

    // Set focus to the title input for better user experience
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

    // Clear existing content in the 'data-list-items' container
    dataListItems.innerHTML = '';

    // Append the fragment to the 'data-list-items' container
    dataListItems.appendChild(fragment);

    // Scroll to the top of the page smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close the search overlay by setting its 'open' attribute to false
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







/** =============================================== data - settings - overlay.submit ===============================  */

document.querySelector('[data-settings-overlay]').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    document.querySelector('[data-settings-overlay]').open = false;
});






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

