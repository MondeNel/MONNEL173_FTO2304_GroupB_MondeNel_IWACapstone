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









/** ===================================== Show more button - data-list-button ======================================*/

/**
 * This is a function declaration named loadInitialBooks. 
 * It is responsible for loading the initial set of books when the page's DOM content is fully loaded.
 */
function loadInitialBooks() {

    /**
     * This line retrieves a reference to the HTML element with the attribute data-list-button. 
     * This element represents the "Show more" button that users can click to load additional books.
     */
    const dataListButton = document.querySelector('[data-list-button]');


    /**
     * This line attaches an event listener to the "Show more" button. When the button is clicked,
     *  the loadMoreBooks function will be executed.
     *  This allows users to load more books by clicking the button.
     */
    dataListButton.addEventListener('click', loadMoreBooks);



    /**
     * After setting up the event listener, this line immediately calls the loadMoreBooks function to 
     * load the initial set of books on the page.
     * This ensures that some books are displayed when the page is loaded.
     */
    loadMoreBooks();
}

/**
 * This line adds an event listener to the DOMContentLoaded event of the document object. 
 * When the DOM content is fully loaded (i.e., when the page has finished loading), 
 * the loadInitialBooks function will be called to load the initial set of books.
 */
document.addEventListener('DOMContentLoaded', loadInitialBooks);


/**
 * This is a function declaration named loadMoreBooks.
 * It is responsible for loading and displaying more books on the page when the "Show more" button is clicked.
 */
function loadMoreBooks() {

    /**
     * These two lines calculate the starting and ending indices of the books to be displayed on the current page.
     * The starting index is calculated as (page - 1) * BOOKS_PER_PAGE,
     * and the ending index is calculated as page * BOOKS_PER_PAGE.
     */
    const rangeStart = (page - 1) * BOOKS_PER_PAGE;
    const rangeEnd = page * BOOKS_PER_PAGE;


    /**
     * This line uses the slice method on the books array to extract the books for the current page. 
     * The slice method returns a new array containing elements from the books array within the specified range.
     */
    const extracted = books.slice(rangeStart, rangeEnd);

    /**
     *  It is used to temporarily store the book previews before appending them to the page.
     *  Using a DocumentFragment improves performance when appending multiple elements to the DOM.
     */
    const fragment = document.createDocumentFragment();

    /**
     * This is a for...of loop that iterates through each book in the extracted array.
     */
    for (const book of extracted) {

        /**
         * This line calls the createPreview function with an object containing the book's information 
         * (authors, id, image, title, and genre). 
         * The createPreview function returns an HTML element representing a preview of the book.
         */
        const preview = createPreview({
            authors: book.author,
            id: book.id,
            image: book.image,
            title: book.title,
            genre: book.genre,
        });

        /**
         * This line appends the book preview (HTML element) to the DocumentFragment called fragment.
         * The DocumentFragment allows the previews to be 
         * added without triggering multiple reflows in the DOM, which improves performance.
         */
        fragment.appendChild(preview);
    }

    /**
     * This line retrieves a reference to the HTML element with the attribute data-list-items. 
     * This element represents the container where the book previews will be displayed.
     */
    const listItemsContainer = document.querySelector('[data-list-items]');

    /**
     * This block of code checks if the listItemsContainer exists (i.e., if the container element is found).
     *  If it does exist, it appends the fragment containing the book previews to the container.
     *  This displays the new book previews on the page.
     */
    if (listItemsContainer) {
        listItemsContainer.appendChild(fragment);
    }

    /**
     * This line increments the page variable, which keeps track of the current page number. 
     * This ensures that the next time the "Show more" button is clicked, the next set of books will be loaded.
     */
    page++;


    /**
     *  This block of code updates the "Show more" button with the correct text displaying the number of remaining books.
        If there are no more books to show, the button is disabled by setting its disabled attribute to true.
        Overall, this code allows users to load and display more books by clicking the "Show more" button. 
        It manages the page number to load the appropriate books and provides
        a smooth user experience by using a DocumentFragment to append the book previews efficiently.
     */
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


/**
 * This line creates an empty DocumentFragment called genresFragment. 
 * A DocumentFragment is a lightweight container to hold a group of DOM nodes without adding them to the main DOM tree. 
 * It is used here to efficiently construct multiple DOM elements before adding them to the actual DOM.
 */
const genresFragment = document.createDocumentFragment();

/**
 * This block of code creates an <option> element representing the "All Genres" option and appends it to 
 * the genresFragment. 
 * The value attribute is set to 'any', and the text content inside the <option> is set to 'All Genres'.
 */
const allGenresOption = document.createElement('option');
allGenresOption.value = 'any';
allGenresOption.innerText = 'All Genres';
genresFragment.appendChild(allGenresOption);



/**
 * This line converts the genres object into an array of arrays (genresEntries), 
 * where each inner array contains a key-value pair from the genres object. 
 * Each key-value pair represents a genre's id and name.
 */
const genresEntries = Object.entries(genres);



/**
 * This for...of loop iterates through each [id, name] pair in genresEntries. 
 * For each genre, it creates a new <option> element and sets its value attribute to the id 
 * and the text content to the name. 
 * Then, it appends each genre <option> to the genresFragment.
 */
for (const [id, name] of genresEntries) {

    const genreOption = document.createElement('option');
    genreOption.value = id;
    genreOption.innerText = name;
    genresFragment.appendChild(genreOption);
}


/**
 * This line retrieves the reference to the HTML <select> element with the attribute data-list-genres. 
 * This element represents the select box where the genre options will be appended.
 */
const genresSelect = document.querySelector('[data-list-genres]');



/**
 * This block of code appends the genre options to the select box (genresSelect). 
 * First, it clears the select box by setting its innerHTML to an empty string, effectively removing any existing options. 
 * Then it appends the "All Genres" option (allGenresOption) and the genre options from the genresFragment to the select box.
 */
if (genresSelect) {

    // Clear the select element first to remove any existing options
    genresSelect.innerHTML = '';

    // Append the genre options from the fragment to the select element
    genresSelect.appendChild(allGenresOption);
    genresSelect.appendChild(genresFragment);
}


/**
 * This line retrieves the reference to the HTML element with the attribute data-search-genres. 
 * This element represents the select box in the search area where the genre options will be appended.
 */
const searchGenresContainer = document.querySelector('[data-search-genres]');



/**
 * This block of code does the same as the previous block, 
 * but for the select box in the search area (searchGenresContainer). 
 * It clears the select box and appends the "All Genres" option and the genre options 
 * from the genresFragment to the search select box.
 */
if (searchGenresContainer) {
    // Clear the select element first to remove any existing options
    searchGenresContainer.innerHTML = '';

    // Append the genre options from the fragment to the select element
    searchGenresContainer.appendChild(allGenresOption);
    searchGenresContainer.appendChild(genresFragment);
}










/** =============================================== data-search-authors ==========================================  */

/**
 * This line creates an empty DocumentFragment called authorsFragment. Like the previous examples, a DocumentFragment
 */
const authorsFragment = document.createDocumentFragment();



/**
 * This block of code creates an <option> element representing the "All Authors" 
 * option and appends it to the authorsFragment. 
 * The value attribute is set to 'any', and the text content inside the <option> is set to 'All Authors'.
 */
const allAuthorsOption = document.createElement('option');
allAuthorsOption.value = 'any';
allAuthorsOption.innerText = 'All Authors';
authorsFragment.appendChild(allAuthorsOption);



/**
 * This line converts the authors object into an array of arrays (authorsEntries), 
 * where each inner array contains a key-value pair from the authors object. 
 * Each key-value pair represents an author's id and name.
 */
const authorsEntries = Object.entries(authors);



/**
 * This for...of loop iterates through each [id, name] pair in authorsEntries. 
 * For each author, it creates a new <option> element and sets its value attribute to the id, 
 * and the text content to the name.
 * Then, it appends each author <option> to the authorsFragment.
 */
for (const [id, name] of authorsEntries) {
    // Create a new option element for each author
    const authorOption = document.createElement('option');
    authorOption.value = id;
    authorOption.innerText = name;
    authorsFragment.appendChild(authorOption);
}



/**
 * This line retrieves the reference to the HTML <select> element with the attribute data-list-authors. 
 * This element represents the select box where the author options will be appended.
 */
const authorsSelect = document.querySelector('[data-list-authors]');



/**
 * This block of code appends the author options to the select box (authorsSelect). 
 * First, it clears the select box by setting its innerHTML to an empty string, 
 * effectively removing any existing options. Then, it appends the "All Authors" option 
 * (allAuthorsOption) and the author options from the authorsFragment to the select box.
 */
if (authorsSelect) {
    // Clear the select element first to remove any existing options
    authorsSelect.innerHTML = '';

    // Append the author options from the fragment to the select element
    authorsSelect.appendChild(allAuthorsOption);
    authorsSelect.appendChild(authorsFragment);
}


/**
 * This line retrieves the reference to the HTML element with the attribute data-search-authors. 
 * This element represents the select box in the search area where the author options will be appended.
 */
const searchAuthorsSelect = document.querySelector('[data-search-authors]');



/**
 * This block of code does the same as the previous block, but for the select box in the search area (searchAuthorsSelect). 
 * It clears the select box and appends the "All Authors" option and the author options from the authorsFragment to the search select box.
 */
if (searchAuthorsSelect) {
    // Clear the select element first to remove any existing options
    searchAuthorsSelect.innerHTML = '';

    // Append the author options from the fragment to the select element
    searchAuthorsSelect.appendChild(allAuthorsOption);
    searchAuthorsSelect.appendChild(authorsFragment);
}










/** ================================================= Theme Settings ================================================= */


/**
 * The event listener waits for the DOM to be fully loaded before executing the enclosed code. 
 * It starts by checking if the user's device or browser preference is set to dark mode. 
 * The matchMedia method with the media query string '(prefers-color-scheme: dark)' 
 * is used to detect if the user prefers dark mode.
 */
document.addEventListener('DOMContentLoaded', function () {
    // Check if the user prefers dark mode
    const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;


    /**
     * A variable theme is declared and initialized based on the user's dark mode preference. 
     * If isDarkModePreferred is true, the theme is set to 'night'; otherwise, it's set to 'day'.
     */
    let theme = isDarkModePreferred ? 'night' : 'day';


    /**
     * An object themeColors is defined, which contains color values for both day and night themes. 
     * Each theme has two color values, dark and light, represented as RGB values.
     */
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
     * This is a function named toggleTheme responsible for toggling between the day and night themes. 
     * It changes the theme variable based on its current value. Then it updates the CSS variables --color-dark 
     * and --color-light on the documentElement (HTML root element) to apply the selected theme's colors.
     */
    function toggleTheme() {
        theme = theme === 'day' ? 'night' : 'day';
        document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
        document.documentElement.style.setProperty('--color-light', themeColors[theme].light);
    }



    /**
     * This function showThemeSelectionDialog is called when the user clicks on the element with the attribute 
     * [data-header-settings]. It retrieves references to the theme selection dialog, overlay buttons, 
     * and the "No results found" message element using document.querySelector.
     */
    function showThemeSelectionDialog() {
        const themeDialog = document.querySelector('[data-settings-overlay]');
        const overlayButtons = document.querySelector('.overlay__buttons');
        const dataListMessage = document.querySelector('[data-list-message]');


        /**
         * If all the required elements are found (themeDialog, overlayButtons, and dataListMessage), 
         * this block of code hides the "No results found" message and shows the overlay buttons (cancel and save buttons). 
         * Finally, it displays the theme selection dialog using the showModal method.
         */
        if (themeDialog && overlayButtons && dataListMessage) {
            // Hide the "No results found" message
            dataListMessage.style.display = 'none';

            // Show the overlay buttons
            overlayButtons.style.display = 'flex';

            // Show the theme selection dialog
            themeDialog.showModal();
        }
    }

    /**
     * This function handleThemeSelectionAndSave is called when the user submits the theme selection form. 
     * It prevents the default form submission behavior (event.preventDefault()), retrieves the selected theme value, 
     * and saves it to the local storage. Then, it updates the theme variable and applies the selected theme colors 
     * to the CSS variables. 
     * Finally, it closes the theme selection dialog using themeDialog.close().
     */
    function handleThemeSelectionAndSave(event) {
        event.preventDefault();

        const selectedTheme = document.querySelector('[data-settings-theme]').value;
        if (selectedTheme === 'day' || selectedTheme === 'night') {
            // Save the user's theme preference to local storage
            localStorage.setItem('themePreference', selectedTheme);

            // Update the theme based on the user's selection
            theme = selectedTheme;
            document.documentElement.style.setProperty('--color-dark', themeColors[theme].dark);
            document.documentElement.style.setProperty('--color-light', themeColors[theme].light);
        }

        // Close the theme selection dialog
        const themeDialog = document.querySelector('[data-settings-overlay]');
        themeDialog.close();
    }


    /**
     * This function handleCancelButtonClick is called when the user clicks on the cancel button in the theme selection dialog.
     * It prevents the default button
     */
    function handleCancelButtonClick(event) {
        event.preventDefault();
        const themeDialog = document.querySelector('[data-settings-overlay]');
        themeDialog.close();
    }


    /**
     * This code retrieves the reference to the element with the attribute [data-header-settings] 
     * (presumably a settings icon or button). If found, it attaches the showThemeSelectionDialog function to its click event. 
     * This means that when the user clicks on the settings icon/button, the theme selection dialog will be shown.
     */
    const dataHeaderSettings = document.querySelector('[data-header-settings]');

    // Attach the toggleTheme function to the data-header-settings element's click event
    if (dataHeaderSettings) {
        dataHeaderSettings.addEventListener('click', showThemeSelectionDialog);
    }


    /**
     * 
     */
    const themeSelectionForm = document.querySelector('[data-settings-form]');

    // Attach the handleThemeSelectionAndSave function to the form's submit event
    if (themeSelectionForm) {
        themeSelectionForm.addEventListener('submit', handleThemeSelectionAndSave);
    }

    // Get the cancel button
    const cancelButton = document.querySelector('[data-cancel-button]');

    // Attach the handleCancelButtonClick function to the cancel button's click event
    if (cancelButton) {
        cancelButton.addEventListener('click', handleCancelButtonClick);
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



/** ============================================= data-settings-form =============================================== */

const settingsForm = document.querySelector('[data-settings-form]');

function handleSettingsFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
}

settingsForm.addEventListener('submit', handleSettingsFormSubmit);

const searchForm = document.querySelector('[data-search-form]');

// Add an event listener to the search form's submit button
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

    // Clear existing content in the 'data-list-items' container
    dataListItems.innerHTML = '';

    // Append the fragment to the 'data-list-items' container
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