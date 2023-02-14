

const modal = document.querySelector('.modal');
const bookList = document.querySelector('.books-list');
const form = document.querySelector('.add-book-form');
const deleteModal = document.querySelector('.delete-modal-container');
const removeBtn = document.querySelector('.remove-btn');
let myLibrary = JSON.parse(localStorage.getItem('MyLibrary')) || [];

/* Open and close the modal */
function openModal() {
  modal.classList.add('active');
}
function closeModal() {
  modal.classList.remove('active');
}

function addBookToLibrary(e) {
  e.preventDefault(); 

  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  const pages = document.querySelector('.pages').value;
  const status = document.querySelector('.status').checked ? true : false;

  const book = {
    title,
    author, 
    pages,
    status
  }
  
  console.log(book)

  myLibrary.push(book);

  showBooksLibrary(myLibrary, bookList);
  localStorage.setItem('MyLibrary', JSON.stringify(myLibrary))
  
    //Cleaning input fields after submitting data
  this.reset();
  setTimeout(function () { location.reload() }, 200);

}

//books and myBookList(place in HTML) here are new arguments in case in future I would like to use this function with another array and another place to put in HTML
function showBooksLibrary(books = [], myBookList) {
  myBookList.innerHTML = books.map((book, i) => {
    return `
    <div class="book-card">
      <h1 class="book-card-title">${book.title}</h1>
      <h3 class="book-card-author">by ${book.author}</h3>
      <p class="book-card-pages">${book.pages} pages</p>
      <p>${book.status ? 'I have already read the book &#128076;' : 'I would like to read this book &#128213;'}</p>
      <input data-index=${i} type="checkbox" ${book.status ? 'checked' : ''}/>
      <button data-index=${i} type="submit" class="remove-btn button">Remove</button>
    </div>
    `
  }).join('');
}

//Saves read status in localStorage
function toggleStatus(e) {
  if (!e.target.matches('input')) return;
  const inputElem = e.target;
  const index = inputElem.dataset.index;
  myLibrary[index].status = !myLibrary[index].status;
  localStorage.setItem('MyLibrary', JSON.stringify(myLibrary));
  showBooksLibrary(myLibrary, bookList);
  location.reload();
  
  console.log(index, '!!!!');
}

/* Showing the status of books */
function showLibraryInfo() {
  const booksRead = document.querySelector('#books-read');
  const booksUnread = document.getElementById('books-unread');
  const totalBooks = document.getElementById('total-books');

  let readCounter = 0;
  let unreadCounter = 0;
  booksRead.textContent = 0;
  booksUnread.textContent = 0;

  for (let i = 0; i < myLibrary.length; i++){
    if (myLibrary[i].status === true) {
      readCounter += 1;
      booksRead.textContent = readCounter;
    } else if (myLibrary[i].status === false) {
      unreadCounter += 1;
      booksUnread.textContent = unreadCounter;
    }
  }
  totalBooks.textContent = myLibrary.length;

}


/* Deleting one book */
function removeOneBook(e) {
  if (e.target.matches('button[type="submit"]')){
    console.log('here I am!!!')
    const btnElem = e.target;
    const btnIndex = btnElem.dataset.index;
    myLibrary.splice(btnIndex, 1);
  }
  localStorage.setItem('MyLibrary', JSON.stringify(myLibrary));
  showBooksLibrary(myLibrary, bookList);
}


/* Deleting all books from the list */
function clearAll() {
  localStorage.clear();
  //refresh page immediately after btn was clicked
  location.reload();
}
function openDeleteModal() {
  deleteModal.classList.add('active')
}
function cancelDeleteModal() {
  deleteModal.classList.remove('active')
}

form.addEventListener('submit', addBookToLibrary);
bookList.addEventListener('click', toggleStatus);
bookList.addEventListener('click', removeOneBook);

showLibraryInfo();
showBooksLibrary(myLibrary, bookList);
