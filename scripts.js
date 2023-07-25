// Importing Data and Constants:

import { books, genres, BOOKS_PER_PAGE, authors } from "./data.js";

let matches = books.slice(0, BOOKS_PER_PAGE);
let page = 1;

const range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE];

if (!matches || !Array.isArray(books)) throw new Error('Source required');
if (!range || range.length < 2) throw new Error('Range must be an array with two numbers');


// Define Theme Color Values:

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

/**
The code starts by importing necessary data and defining constants, including books, genres, BOOKS_PER_PAGE, and authors.
It initializes matches by slicing the books array to get the first batch of books (up to BOOKS_PER_PAGE).
The variable page is set to 1, indicating the current page number.
It creates a constant range to determine the range of books to display on the current page, based on the page number and BOOKS_PER_PAGE.
It performs some checks to ensure that matches and range are valid arrays with proper length; otherwise, it throws an error.
Two objects, day and night, are defined to hold color values for the light and dark theme.
The code then logs the day and night objects to the console.
A for...of loop is used to iterate through each book in the matches array.
Inside the loop, the createPreview function is called with book data to create a preview element for each book.
The generated preview elements are appended to a document fragment called fragment.
The commented-out code sections appear to be unfinished parts or potential code for additional functionality like genre and author selection, theme settings, search, etc. They are currently not in use and are not affecting the current functionality of the code.
There seems to be a minor error related to appending the fragment to a DOM element; however, the exact cause of the error is not shown in the provided code snippet.
Overall, the code fetches the first batch of books (matches) based on the BOOKS_PER_PAGE constant and creates preview elements for each book using the createPreview function. The previews are appended to a document fragment, but there might be an issue with how the fragment is later used or appended to the actual DOM, leading to the mentioned error.} bookData 
*/

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

const fragment = document.createDocumentFragment();
const extracted = books.slice(0, 36);

for (const book of extracted) {
    const preview = createPreview({
        authors: book.author,
        id: book.id,
        image: book.image,
        title: book.title,
        genre: book.genre, // Add 'genre' to the createPreview function call
    });
    fragment.appendChild(preview);
}

const listItems = document.querySelector('[data-list-items]');
if (listItems) {
    listItems.appendChild(fragment);
}

// Update the "Show more" button with the correct remaining books count
const dataListButton = document.querySelector('[data-list-button]');
if (dataListButton) {
    dataListButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining">(${matches.length - (page * BOOKS_PER_PAGE > 0 ? page * BOOKS_PER_PAGE : 0)})</span>
  `;
    dataListButton.disabled = !(matches.length - page * BOOKS_PER_PAGE > 0);
}

// Create the initial option for 'All Genres'
const allGenresOption = document.createElement('option');
allGenresOption.value = 'any';
allGenresOption.innerText = 'All Genres';

// Create a new DOM element to hold the genre options
const genresContainer = document.createDocumentFragment();

// Convert the 'genres' object into an iterable array of key-value pairs
const genresEntries = Object.entries(genres);

// Loop through the 'genresEntries' array and create options for each genre
for (const [id, name] of genresEntries) {
    const genreOption = document.createElement('option');
    genreOption.value = id;
    genreOption.innerText = name;
    genresContainer.appendChild(genreOption);
}








/** ======================================= data-search-genres ===========================================  */


const genresSelect = document.querySelector('[data-list-genres]');
// Append the genre options to the select element
if (genresSelect) {
    genresSelect.appendChild(allGenresOption);
    genresSelect.appendChild(genresContainer);
}

const searchGenresContainer = document.querySelector('[data-search-genres]');

if (searchGenresContainer) {
    searchGenresContainer.appendChild(allGenresOption);
    searchGenresContainer.appendChild(genresContainer);
}









/** =============================================== data-search-authors ====================================  */

// Create a document fragment to hold the author options
const authorsFragment = document.createDocumentFragment();

// Create the initial option for 'All Authors'
const allAuthorsOption = document.createElement('option');
allAuthorsOption.value = 'any';
allAuthorsOption.innerText = 'All Authors';
authorsFragment.appendChild(allAuthorsOption);

// Loop through the 'authors' object and create options for each author
for (const [id, name] of Object.entries(authors)) {
    const authorOption = document.createElement('option');
    authorOption.value = id;
    authorOption.innerText = name;
    authorsFragment.appendChild(authorOption);
}

// Assuming 'data-search-authors' is the ID or selector of the select element where you want to append the author options
const searchAuthorsSelect = document.querySelector('[data-search-authors]');

// Append the author options to the select element
if (searchAuthorsSelect) {
    searchAuthorsSelect.appendChild(authorsFragment);
}









/** ================================ Theme Settings and "Show More" Button Update ================================= */

document.addEventListener('DOMContentLoaded', function () {
    // Get the theme setting value from the form
    const dataSettingsTheme = document.querySelector('[data-settings-theme]').value;

    // Check if the user prefers dark mode
    const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set the theme to either 'night' or 'day' based on user preference
    const theme = isDarkModePreferred ? 'night' : 'day';

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

    // Apply the selected theme colors to the document
    document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
    document.documentElement.style.setProperty('--color-light', themeColors[theme].light);

    // Update the "Show more" button with the remaining books count
    const dataListButton = document.querySelector('[data-list-button]');
    if (dataListButton) {
        const remainingBooks = books.length - (page * BOOKS_PER_PAGE);
        const remainingText = remainingBooks > 0 ? remainingBooks : 0;
        dataListButton.innerHTML = `<span>Show more</span><span class="list__remaining">(${remainingText})</span>`;
        dataListButton.disabled = !(remainingBooks > 0);
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




/** ========================================== data-settings-cancel ==================================== */

const settingsCancelButton = document.querySelector('[data-settings-cancel]');
const settingsOverlayElement = document.querySelector('[data-settings-overlay]');

function handleSettingsCancelButtonClick() {
    if (settingsOverlayElement.open === true) {
        settingsOverlayElement.open = false; // Close the settings overlay
    }
}
settingsCancelButton.addEventListener('click', handleSettingsCancelButtonClick);


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

// Function to handle the form submission and filter the book list
function handleSearchFormSubmit(event) {
    event.preventDefault(); // Prevent the form submission from reloading the page

    // Get the form data
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);

    const results = [];

    // Loop through the books list to filter based on the search criteria
    for (const book of booksList) {
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
        const authorMatch = filters.author === 'any' || book.author === filters.author;
        let genreMatch = true;

        if (filters.genre !== 'any') {
            // Check if the book's genres include the selected genre
            genreMatch = book.genres.includes(filters.genre);
        }

        if (titleMatch && authorMatch && genreMatch) {
            results.push(book);
        }
    }

    // Show/hide the list message based on the search results
    const dataListMessage = document.querySelector('.list__message');
    if (dataListMessage) {
        if (results.length < 1) {
            dataListMessage.classList.add('list__message_show');
        } else {
            dataListMessage.classList.remove('list__message_show');
        }
    }

    // Use the 'results' array for further processing or display

    // For example, if you want to update the book list with the filtered results:
    updateBookList(results);
}

// Attach the event listener to the form submission
const searchForm = document.querySelector('[data-search-form]');
if (searchForm) {
    searchForm.addEventListener('submit', handleSearchFormSubmit);
}

