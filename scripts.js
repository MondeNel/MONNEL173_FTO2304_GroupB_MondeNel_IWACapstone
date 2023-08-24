//@ts-check

import { books, genres, BOOKS_PER_PAGE, authors } from "./data.js";

const booksList = books;
let matches = books.slice(0, BOOKS_PER_PAGE);
let page = 1;
const range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE];

if (!matches || !Array.isArray(books)) {
    throw new Error('Source required');
}
if (!range || range.length < 2) {
    throw new Error('Range must be an array with two numbers');
}

/**
 * Creates a preview element for a book.
 * @param {Object} bookData - The data of the book to create a preview for.
 * @param {string} bookData.authors - The author of the book.
 * @param {string} bookData.id - The ID of the book.
 * @param {string} bookData.image - The URL of the book's image.
 * @param {string} bookData.title - The title of the book.
 * @param {string} bookData.genre - The genre of the book.
 * @returns {HTMLElement} The created preview element.
 */
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

/**
 * Loads the initial books and sets up 'Load More' functionality.
 */
function loadInitialBooks() {
    const dataListButton = document.querySelector('[data-list-button]');
    dataListButton.addEventListener('click', loadMoreBooks);
    loadMoreBooks();
}

/**
 * Loads more books and appends them to the list.
 */
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

document.addEventListener('DOMContentLoaded', loadInitialBooks);



