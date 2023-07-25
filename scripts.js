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

//Create Preview Elements:

function createPreview(bookData) {
    const { authors, id, image, title } = bookData;


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
     * this code creates a new <div> element, assigns it the class 'preview__author', 
     * and sets its text content to the value of the authors variable. The resulting <div> element 
     * can be styled with CSS according to the rules associated with the 'preview__author' class, 
     * and it will display the author information within the preview element.
     */
    const authorElement = document.createElement('div');
    authorElement.classList.add('preview__author');
    authorElement.textContent = authors;


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

/**
 * we use document.querySelector to get the element with the attribute data-list-items 
 * (which is the element you want to append to).
 *  We then check if listItems is not null before attempting to append the fragment.
 */

document.addEventListener('DOMContentLoaded', function () {
    const fragment = document.createDocumentFragment();
    const extracted = matches;

    for (const book of extracted) {
        const preview = createPreview({
            authors: book.author,
            id: book.id,
            image: book.image,
            title: book.title
        });

        fragment.appendChild(preview);
    }

    // Get the element to which you want to append the fragment
    const listItems = document.querySelector('[data-list-items]');

    // Check if the element exists before appending the fragment
    if (listItems) {
        listItems.appendChild(fragment);
    }
});




//Add Book Previews to the DOM
document.addEventListener('DOMContentLoaded', function () {
    // Create a fragment to hold the preview elements
    const fragment = document.createDocumentFragment();

    // Extract the books from the matches array
    const extracted = matches;

    // Create and append previews for each book in the extracted array
    for (const book of extracted) {
        const preview = createPreview({
            authors: book.author,
            id: book.id,
            image: book.image,
            title: book.title,
        });
        fragment.appendChild(preview);
    }

    // Get the book list container
    const listItems = document.querySelector('[data-list-items]');

    // Check if the listItems container exists and append the fragment
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
});



// Filter Books and Update Book List
document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.querySelector('[data-search-cancel]');
    searchButton.addEventListener('click', handleSearch);

    function handleSearch(event) {
        event.preventDefault();

        // Get the search filters from the form
        const formData = new FormData(document.getElementById('search'));
        const searchFilters = Object.fromEntries(formData);

        // Filter the books based on the search filters
        const filteredBooks = filterBooks(searchFilters);

        // Update the book list with the filtered books
        updateBookList(filteredBooks);
    }

    function filterBooks(searchFilters) {
        // Filter books based on genre and author
        return books.filter((book) => {
            const genreFilter = searchFilters.genre.toLowerCase();
            const authorFilter = searchFilters.author.toLowerCase();

            return (
                (genreFilter === 'any' || book.genre.toLowerCase() === genreFilter) &&
                (authorFilter === 'any' || book.author.toLowerCase() === authorFilter)
            );
        });
    }

    function updateBookList(filteredBooks) {
        // Get the book list container
        const bookList = document.querySelector('[data-list-items]');
        bookList.innerHTML = '';

        // Create a fragment to hold the preview elements
        const fragment = document.createDocumentFragment();

        // Iterate through the filtered books and create previews
        for (const book of filteredBooks) {
            const preview = createPreview({
                authors: book.author,
                id: book.id,
                image: book.image,
                title: book.title,
            });
            fragment.appendChild(preview);
        }

        // Add the previews to the book list
        bookList.appendChild(fragment);
    }
});





// Theme Settings and "Show More" Button Update
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







// This code selects the element with the attribute 'data-search-cancel' and adds an event listener to it.
// When the element (e.g., a cancel button) is clicked, the 'handleSearchCancel' function will be executed.
document.querySelector('[data-search-cancel]').addEventListener('click', handleSearchCancel);

// The 'handleSearchCancel' function is defined here and will be called when the cancel button is clicked.
function handleSearchCancel(event) {
    // This line prevents the default behavior of the cancel button, which could trigger an unintended action.
    event.preventDefault();

    // This line closes the search overlay by setting the 'open' attribute of the element
    // with the attribute 'data-search-overlay' to false.
    // This means that when the cancel button is clicked, the search overlay will be closed or hidden.
    dataSearchOverlay.open = false;
}



// This code selects the element with the attribute 'data-settings-form' and adds an event listener to it.
// When the form is submitted, the 'handleSettingsSubmit' function will be executed.
document.querySelector('[data-settings-form]').addEventListener('submit', handleSettingsSubmit);

// The 'handleSettingsSubmit' function is defined here and will be called when the form is submitted.
function handleSettingsSubmit(event) {
    // This line prevents the default form submission behavior, which would cause the page to reload.
    event.preventDefault();

    // This line gets the form data using the FormData API from the form that was submitted (event.target).
    const formData = new FormData(event.target);

    // This line converts the formData object to a regular JavaScript object using Object.fromEntries().
    // This step is done to access the form data as key-value pairs more easily.
    const result = Object.fromEntries(formData);

    // The next two lines of code set CSS variables '--color-dark' and '--color-light'
    // based on the selected theme from the form data.
    // The values for these CSS variables are retrieved from the 'css' object, using the selected theme as the key.
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);

    // Finally, this line closes the settings overlay by setting the 'open' attribute of the
    // element with the attribute 'data-settings-overlay' to false.
    dataSettingsOverlay.open = false;
}






// These two lines of code select elements with specific attributes and store them in variables.
// The selected elements are used later for event handling.
const dataSettingsForm = document.querySelector('[data-settings-form]');
const dataSettingsOverlay = document.querySelector('[data-settings-overlay]');

// This event listener is attached to the element with the attribute 'data-settings-form'.
// When the form is submitted, the function inside the listener will be executed.
dataSettingsForm.addEventListener('submit', function (event) {
    // The code inside the listener performs the following steps:
    // 1. Prevents the default form submission behavior, so the page doesn't reload.
    event.preventDefault();

    // 2. Gets the form data using the FormData API from the dataSettingsForm element.
    //    The form data contains all the input values submitted in the form.
    const formData = new FormData(dataSettingsForm);

    // 3. Converts the formData object to a regular JavaScript object using Object.fromEntries().
    //    This step is done to access the form data as key-value pairs more easily.
    const result = Object.fromEntries(formData);

    // 4. Calls the 'actions.settings.submit' function (or any appropriate function)
    //    to handle the form submission with the form data as a parameter.
    actions.settings.submit(result);

    // 5. Optionally, it closes the settings overlay by setting the 'open' attribute of the
    //    element with the attribute 'data-settings-overlay' to false, effectively closing the overlay.
    dataSettingsOverlay.open = false;
});







// Replace 'data-list-close' with the appropriate data attribute for the close button

// This function takes an array of book previews (matches), a start index, and an end index as parameters.
// It creates a document fragment and iterates through the matches array within the specified index range.
// For each book in the range, it calls the createPreview function to create a preview element,
// and then appends the preview element to the document fragment.
// Finally, it returns the document fragment containing all the preview elements.
function createPreviewsFragment(matches, startIndex, endIndex) {
    const fragment = document.createDocumentFragment();

    for (let i = startIndex; i < endIndex && i < matches.length; i++) {
        const bookData = matches[i];
        const preview = createPreview(bookData);
        fragment.appendChild(preview);
    }

    return fragment;
}

// These three lines of code select elements with specific attributes and store them in variables.
// The selected elements are used later for event handling.
const dataListClose = document.querySelector('[data-list-close]');
const dataListActive = document.querySelector('[data-list-active]');
const dataListButton = document.querySelector('[data-list-button]');

// This event listener is attached to the element with the attribute 'data-list-close'.
// When the element is clicked, the function inside the listener will be executed.
// The function sets the 'open' attribute of the element with the attribute 'data-list-active' to false,
// effectively closing the active list item.
dataListClose.addEventListener('click', function () {
    dataListActive.open = false;
});

// This event listener is attached to the element with the attribute 'data-list-button'.
// When the element is clicked, the function inside the listener will be executed.
dataListButton.addEventListener('click', function () {
    // The code inside the listener performs the following steps:
    // 1. Selects the element with the attribute 'data-list-items' and stores it in the variable dataListItems.
    // 2. Calls the createPreviewsFragment function to create a document fragment containing new preview elements.
    //    The startIndex is calculated as (page * BOOKS_PER_PAGE) and the endIndex as ((page + 1) * BOOKS_PER_PAGE).
    // 3. Appends the newly created document fragment to the element dataListItems.
    // 4. Calls the 'updateRemaining' method of the 'actions.list' object to update the remaining list items.
    // 5. Increments the page number by one.
    const dataListItems = document.querySelector('[data-list-items]');
    dataListItems.appendChild(createPreviewsFragment(matches, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE));
    actions.list.updateRemaining();
    page = page + 1;
});







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





// Add a submit event listener to the search form
document.querySelector('[data-search-form]').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the form data and create filters object from the form data
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);

    // Filter books based on the provided filters
    const filteredBooks = filterBooks(filters);

    // Update the book list based on the filtered books
    updateBookList(filteredBooks);
});

function filterBooks(filters) {
    // Create an array to store the result of filtering
    const result = [];

    // Loop through each book in the booksList
    for (const book of booksList) {
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
        const authorMatch = filters.author === 'any' || book.author === filters.author;
        const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);

        // Check if the book matches the provided filters
        if (titleMatch && authorMatch && genreMatch) {
            result.push(book);
        }
    }

    return result;
}

function updateBookList(filteredBooks) {
    const bookList = document.querySelector('[data-list-items]');
    const listMessage = document.querySelector('[data-list-message]');

    // Clear the previous book list
    bookList.innerHTML = '';

    // Check if there are any books to display
    if (filteredBooks.length > 0) {
        const fragment = document.createDocumentFragment();

        // Create a preview for each book and append it to the fragment
        for (const book of filteredBooks) {
            const preview = createPreview({
                authors: book.author,
                id: book.id,
                image: book.image,
                title: book.title,
            });
            fragment.appendChild(preview);
        }

        // Append the fragment to the book list
        bookList.appendChild(fragment);

        // Hide the "No books found" message
        listMessage.classList.remove('list__message_show');
    } else {
        // Show the "No books found" message
        listMessage.classList.add('list__message_show');
    }
}







// Assuming source is an array containing book data and range is an array with the start and end index.

// Get the container element where previews will be added
const dataListItems = document.querySelector('[data-list-items]');

// Clear the existing previews
dataListItems.innerHTML = '';

// Create a document fragment to hold the previews
const fragment = document.createDocumentFragment();

// Extract the book data from the source array within the specified range
const extracted = source.slice(range[0], range[1]);

// Loop through each book data in the extracted array
for (const bookData of extracted) {
    // Destructure the book data object to get the necessary properties
    const { author, image, title, id } = bookData;

    // Create a button element for the preview
    const element = document.createElement('button');
    element.classList.add('preview');
    element.setAttribute('data-preview', id);

    // Add the HTML content for the preview
    element.innerHTML = /* html */ `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

    // Append the preview element to the fragment
    fragment.appendChild(element);
}

// Append all the previews to the container element at once for better performance
dataListItems.appendChild(fragment);






// Assuming 'fragments' contains the previews for the next page, 'initial', 'remaining', and 'hasRemaining' are variables related to the pagination.

// Append the new previews to the 'data-list-items' container
dataListItems.appendChild(fragments);

// Calculate the remaining books count based on the current page and total matches
const initial = matches.length - (page * BOOKS_PER_PAGE > 0 ? page * BOOKS_PER_PAGE : 0);
const remaining = hasRemaining ? initial : 0;

// Update the 'Show more' button's disabled status based on remaining books count
dataListButton.disabled = initial > 0;

// Update the 'Show more' button's innerHTML with the remaining books count
dataListButton.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining">(${remaining})</span>
`;

// Scroll to the top of the page with smooth behavior
window.scrollTo({ top: 0, behavior: 'smooth' });

// Close the search overlay (assuming 'data-search-overlay' is the search overlay element)
dataSearchOverlay.open = false;






// Assuming 'data-settings-overlay' is the settings overlay element.

// Handling the form submission event for the settings overlay
dataSettingsOverlay.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form data using FormData
    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);

    // Assuming 'css' is an object containing day and night themes
    // Update the CSS variables for the selected theme
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);

    // Close the settings overlay after form submission
    dataSettingsOverlay.open = false;
});







// Assuming 'data-list-items' is the element that contains the book previews.

// Adding a click event listener to the book previews container
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

    // Assuming 'data-list-active', 'data-list-blur', 'data-list-image', 'data-list-title',
    // 'data-list-subtitle', and 'data-list-description' are the respective elements to update.

    // Updating the book details in the UI
    dataListActive.open = true;
    dataListBlur.style.backgroundImage = `url(${active.image})`;
    dataListTitle.textContent = active.title;
    dataListSubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
    dataListDescription.textContent = active.description;
});

