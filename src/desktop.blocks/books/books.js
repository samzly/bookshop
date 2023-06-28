import styles from "../books/books.scss";
import header_styles from '../header/header.scss';
import default_book from '/src/desktop.blocks/books/img/default_book.jpg'
import * as events from "events";

const key = 'AIzaSyA8XCKsj-Zpv2-f-YDkKRBuXMxPu78hNt4';
const categories = [
    {
        'cat': 'Architecture',
        'subject': 'Architecture'
    },
    {
        'cat': 'Art & Fashion',
        'subject': 'Art'
    },
    {
        'cat': 'Biography',
        'subject': 'Biography&Autobiography'
    },
    {
        'cat': 'Business',
        'subject': 'Business'
    },
    {
        'cat': 'Crafts & Hobbies',
        'subject': 'Crafts&Hobbies'
    },
    {
        'cat': 'Drama',
        'subject': 'Drama'
    },
    {
        'cat': 'Fiction',
        'subject': 'Fiction'
    },
    {
        'cat': 'Food & Drink',
        'subject': 'Cooking'
    },
    {
        'cat': 'Health & Wellbeing',
        'subject': 'Health&Fitness'
    },
    {
        'cat': 'History & Politics',
        'subject': 'History'
    },
    {
        'cat': 'Humor',
        'subject': 'Humor'
    },
    {
        'cat': 'Poetry',
        'subject': 'Poetry'
    },
    {
        'cat': 'Psychology',
        'subject': 'Psychology'
    },
    {
        'cat': 'Science',
        'subject': 'Science'
    },
    {
        'cat': 'Technology',
        'subject': 'Technology'
    },
    {
        'cat': 'Travel & Maps',
        'subject': 'Travel'
    },
];
let indexStart = 0;

export function books() {
    addBookContainer()
    makeList();
    document.addEventListener('DOMContentLoaded', countChange);
}

function addBookContainer() {
    const books = document.querySelector('.bookshop');
    books.innerHTML = `
        <div class=${styles.container}></div>
    `;

    function addCategories() {
        const books = document.querySelector(`.${styles.container}`);
        books.insertAdjacentHTML('afterbegin', `
        <div class=${styles.categories}>
            <ul class=${styles.list}></ul>
        </div>
    `);
    }

    function addBooks() {
        const books = document.querySelector(`.${styles.container}`);
        books.insertAdjacentHTML('beforeend', `
        <div class=${styles.books}></div>
    `);
    }

    addCategories();
    addBooks();
}

//прогружаем книги

// function bookFetch(catNum, num) {
//     fetch(`https://www.googleapis.com/books/v1/volumes?q=%22"subject:${categories[catNum].subject}"%22&key=${key}&printType=books&startIndex=${num}&maxResults=6&langRestrict=en`)
//         .then((response) => response.json())
//         .then((response) => makeBooks(response))
//         .catch((response) => console.log('error\n' + response));
// }




function makeList() {

    const list = document.querySelector(`.${styles.list}`);

    //перебор категорий

    function listCategories() {
        categories.forEach((elem, index) => {
            let category = `<li class='${styles.item} item-${index} ${index === 0 ? `${styles.active}` : ''}' data-index=${index}>${categories[index].cat}</li>`;
            list.innerHTML += category;
        });
    }

// переключение категории

    function clickCategory() {
        list.querySelectorAll(`.${styles.item}`).forEach((elem) => {
            elem.addEventListener('click', function () {
                indexStart = 0;
                document.querySelector(`.${styles.books}`).innerHTML = '';
                const currIndex = this.getAttribute('data-index');
                changeCategory(currIndex);
                bookFetch(currIndex, indexStart);
            });
        });
    }

    function makeBooks(data) {
        const books = document.querySelector(`.${styles.books}`);


        // выводим книги

        function getBooks() {
            data.items.forEach((elem, index) => {
                const book = data.items[index];
                const cutText = (string, symbols) => string.length > symbols ? string.slice(0, symbols).trim() + '...' : string;
                const rating = book.volumeInfo.averageRating;
                const id = book.id;
                let bookDiv = `
                            <div class='${styles.book} item-${index} data-index=${index}'>
                                <div class=${styles.image} style='background-image:url(${book.volumeInfo.imageLinks === undefined ? default_book : book.volumeInfo.imageLinks.thumbnail})'></div>
                                <div class="${styles.text}">
                                    <p class=${styles.authors}>${book.volumeInfo.authors === undefined ? 'Unknown author' : book.volumeInfo.authors.join(', ')}</p>
                                    <h2 class=${styles.title}>${book.volumeInfo.title ? cutText(book.volumeInfo.title, 17) : 'no title'}</h2>
                                    <div class=${styles.wrap}>
                                        <ul class=${styles.stars}>
                                            <li class='item-5 ${rating === undefined ? '' : rating == 5 ? styles.activeRating : ''}' title="5"></li>
                                            <li class='item-4 ${rating === undefined ? '' : rating == 4 ? styles.activeRating : ''}' title="4"></li>
                                            <li class='item-3 ${rating === undefined ? '' : rating == 3 ? styles.activeRating : ''}' title="3"></li>
                                            <li class='item-2 ${rating === undefined ? '' : rating == 2 ? styles.activeRating : ''}' title="2"></li>
                                            <li class='item-1 ${rating === undefined ? '' : rating == 1 ? styles.activeRating : ''}' title="1"></li>
                                        </ul>
                                        <span class=${styles.ratings}>${book.volumeInfo.ratingsCount === undefined ? '' : book.volumeInfo.ratingsCount + ' review'}</span>
                                    </div>
                                    <p class=${styles.description}>${book.volumeInfo.description ? cutText(book.volumeInfo.description, 90) : 'no description'}</p>
                                    <div class=${styles.price}>${book.saleInfo.retailPrice === undefined ? '' : book.saleInfo.retailPrice.amount + ' ' + book.saleInfo.retailPrice.currencyCode}</div>
                                    <button class='${styles.button} ${styles.button_buy}' data-id=${id}>buy now</button>
                                </div>
                            </div>`;
                books.innerHTML += bookDiv;
            });
        }
        getBooks();
        counter();
        buttonLoad();
        buttonLoadClick();
    }

    let currNumCategory;

    function buttonLoad() {
        const books = document.querySelector(`.${styles.books}`);
        books.insertAdjacentHTML('beforeend', `
        <div class=${styles.buttonLoad}><button data-index=${currNumCategory} class='${styles.button} ${styles.buttonLoad}'>load more</button></div>
    `);
    }

    function buttonLoadClick() {
        const button = document.querySelector(`.${styles.buttonLoad}`);
        button.addEventListener('click', function () {
            button.innerHTML = '';
            indexStart += 6;
            bookFetch(currNumCategory, indexStart);
        })
    }

    // изменение категории

    function changeCategory(num) {
        list.querySelector(`.${styles.active}`).classList.remove(`${styles.active}`);
        list.querySelector('.item-' + num).classList.add(`${styles.active}`);
        currNumCategory = num;
    }

    function bookFetch(catNum, num) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=%22"subject:${categories[catNum].subject}"%22&key=${key}&printType=books&startIndex=${num}&maxResults=6&langRestrict=en`)
            .then((response) => response.json())
            .then((response) => makeBooks(response))
            .catch((response) => console.log('error\n' + response));
    }


    // вызов функций

    listCategories();
    clickCategory();
}

// function buttonLoadClick() {
//     const button = document.querySelector(`.${styles.buttonLoad}`);
//     button.addEventListener('click', function () {
//         clickCategory();
//     })
// }

// function makeBooks(data) {
//     const books = document.querySelector(`.${styles.books}`);
//
//
//     // выводим книги
//
//     function getBooks() {
//         data.items.forEach((elem, index) => {
//             const book = data.items[index];
//             const cutText = (string, symbols) => string.length > symbols ? string.slice(0, symbols).trim() + '...' : string;
//             const rating = book.volumeInfo.averageRating;
//             const id = book.id;
//             let bookDiv = `
//                             <div class='${styles.book} item-${index} data-index=${index}'>
//                                 <div class=${styles.image} style='background-image:url(${book.volumeInfo.imageLinks === undefined ? default_book : book.volumeInfo.imageLinks.thumbnail})'></div>
//                                 <div class="${styles.text}">
//                                     <p class=${styles.authors}>${book.volumeInfo.authors === undefined ? 'Unknown author' : book.volumeInfo.authors.join(', ')}</p>
//                                     <h2 class=${styles.title}>${book.volumeInfo.title ? cutText(book.volumeInfo.title, 17) : 'no title'}</h2>
//                                     <div class=${styles.wrap}>
//                                         <ul class=${styles.stars}>
//                                             <li class='item-5 ${rating === undefined ? '' : rating == 5 ? styles.activeRating : ''}' title="5"></li>
//                                             <li class='item-4 ${rating === undefined ? '' : rating == 4 ? styles.activeRating : ''}' title="4"></li>
//                                             <li class='item-3 ${rating === undefined ? '' : rating == 3 ? styles.activeRating : ''}' title="3"></li>
//                                             <li class='item-2 ${rating === undefined ? '' : rating == 2 ? styles.activeRating : ''}' title="2"></li>
//                                             <li class='item-1 ${rating === undefined ? '' : rating == 1 ? styles.activeRating : ''}' title="1"></li>
//                                         </ul>
//                                         <span class=${styles.ratings}>${book.volumeInfo.ratingsCount === undefined ? '' : book.volumeInfo.ratingsCount + ' review'}</span>
//                                     </div>
//                                     <p class=${styles.description}>${book.volumeInfo.description ? cutText(book.volumeInfo.description, 90) : 'no description'}</p>
//                                     <div class=${styles.price}>${book.saleInfo.retailPrice === undefined ? '' : book.saleInfo.retailPrice.amount + ' ' + book.saleInfo.retailPrice.currencyCode}</div>
//                                     <button class='${styles.button} ${styles.button_buy}' data-id=${id}>buy now</button>
//                                 </div>
//                             </div>`;
//             books.innerHTML += bookDiv;
//         });
//     }
//     getBooks();
//     counter();
//     buttonLoad();
//     buttonLoadClick();
// }

// счётчик

export let count = localStorage.length.toString();

function counter() {
    const buttons = document.querySelectorAll(`.${styles.button_buy}`);
    buttons.forEach((elem) => {
            elem.addEventListener('click', (event => {
                const currBook = elem.getAttribute('data-id');
                if (elem.classList.contains(`${styles.activeButton}`)) {
                    localStorage.removeItem(currBook);
                    elem.classList.remove(`${styles.activeButton}`);
                    elem.innerHTML = 'buy now';
                    count--;
                } else {
                    localStorage.setItem(currBook, 'book');
                    elem.classList.add(`${styles.activeButton}`);
                    elem.innerHTML = 'in the cart';
                    count++;
                }
                countChange();
            }));
    });
}

export function countChange() {
    const headerCount = document.querySelector(`.${header_styles.counter}`)
    if (count == 0) {
        headerCount.classList.remove(`${header_styles.activeCounter}`)
    } else if (headerCount.classList.contains(`${header_styles.activeCounter}`)) {
        headerCount.innerHTML = count;
    } else {
        headerCount.classList.add(`${header_styles.activeCounter}`);
        headerCount.innerHTML = count;
    }
}