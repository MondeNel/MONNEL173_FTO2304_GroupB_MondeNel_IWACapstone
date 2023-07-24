import { books, genres, BOOKS_PER_PAGE, authors } from "./data.js";



let matches= books.slice(0, 36);
let page = 1;



const range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE]; 

if (!matches || !Array.isArray(books)) throw new Error('Source required');
if (!range || range.length < 2) throw new Error('Range must be an array with two numbers');


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
 *  fragment creates an empty document fragment that can be used to hold DOM elements without actually appending them to the main document.
 *  const extracted = matches; creates a new variable extracted and assigns it the value of the matches array.
 *  for loop iterates through each item in the extracted array
 *  Inside the loop, a preview element is created using the createPreview function.
 *  The properties authors, image, title, and id are passed as arguments to the function to create the preview with the corresponding data.
 *  The created preview element is then appended to the fragment using fragment.appendChild(preview).
 */

const fragment = document.createDocumentFragment()
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

// Append the fragment to the list
const listItems = document.querySelector('.list__items');
listItems.appendChild(fragment);



// data - list - items.appendChild(fragment)

// genres = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element = 'All Genres'
// genres.appendChild(element)

// for ([id, name]; Object.entries(genres); i++) {
//     document.createElement('option')
//     element.value = value
//     element.innerText = text
//     genres.appendChild(element)
// }

// data - search - genres.appendChild(genres)

// authors = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element.innerText = 'All Authors'
// authors.appendChild(element)

// for ([id, name]; Object.entries(authors); id++) {
//     document.createElement('option')
//     element.value = value
//     element = text
//     authors.appendChild(element)
// }

// data - search - authors.appendChild(authors)

// data - settings - theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' | 'day'

// documentElement.style.setProperty('--color-dark', css[v].dark);
// documentElement.style.setProperty('--color-light', css[v].light);
// data - list - button = "Show more (books.length - BOOKS_PER_PAGE)"

// data - list - button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

// data - list - button.innerHTML = /* html */[
//     '<span>Show more</span>',
//     '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
// ]

// data - search - cancel.click() { data - search - overlay.open === false }
// data - settings - cancel.click() { querySelect(data - settings - overlay).open === false }
// data - settings - form.submit() { actions.settings.submit }
// data - list - close.click() { data - list - active.open === false }

// data - list - button.click() {
//     document.querySelector([data - list - items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, { page + 1} x BOOKS_PER_PAGE]))
// actions.list.updateRemaining()
// page = page + 1
// }

// data - header - search.click() {
//     data - search - overlay.open === true;
//     data - search - title.focus();
// }

// data - search - form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true } }
//         }
//     }

//     if titleMatch && authorMatch && genreMatch => result.push(book)
// }

// if display.length < 1 
//     data - list - message.class.add('list__message_show')
// else data - list - message.class.remove('list__message_show')


// data - list - items.innerHTML = ''
// const fragment = document.createDocumentFragment()
// const extracted = source.slice(range[0], range[1])

// for ({ author, image, title, id }; extracted; i++) {
//     const { author: authorId, id, image, title } = props

//     element = document.createElement('button')
//     element.classList = 'preview'
//     element.setAttribute('data-preview', id)

//     element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//     fragment.appendChild(element)
// }

// data - list - items.appendChild(fragments)
// initial === matches.length - [page * BOOKS_PER_PAGE]
// remaining === hasRemaining ? initial : 0
// data - list - button.disabled = initial > 0

// data - list - button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

// window.scrollTo({ top: 0, behavior: 'smooth' });
// data - search - overlay.open = false
// }

// data - settings - overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data - settings - overlay).open === false
// }

// data - list - items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview

//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         }
//     }

//     if !active return
//     data - list - active.open === true
//     data - list - blur + data - list - image === active.image
//     data - list - title === active.title

//     data - list - subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data - list - description === active.description
// }
