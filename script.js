const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.info = function () {
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`
    );
  };
}

function addBookToLibrary(title, author, pages, readStatus) {
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
}

function listBooks() {
  myLibrary.forEach(book => {
    const { title, author, pages, readStatus } = book;
    console.log(`${title} by ${author}, ${pages} pages, ${readStatus}`);
  });
}

// // Sample books
// let book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "To be read");
// let book2 = new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 295, "To be read");
// let book3 = new Book("The Two Towers", "J.R.R. Tolkien", 295, "To be read");
// let book4 = new Book("The Return of the King", "J.R.R. Tolkien", 295, "To be read");

// addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "To be read");
// addBookToLibrary("The Fellowship of the Ring", "J.R.R. Tolkien", 295, "To be read");
// addBookToLibrary("The Two Towers", "J.R.R. Tolkien", 295, "To be read");
// addBookToLibrary("The Return of the King", "J.R.R. Tolkien", 295, "To be read");

// listBooks();

// You can create a modal or form field that is hidden by default and 
// show it when the button is clicked. You can use HTML and CSS to create the form fields
//  and then use JavaScript to add an event listener to the button. 
//  When the button is clicked, the event listener should show the form field and also add 
//  another event listener to the form's submit button.
//  When the form is submitted, the event listener should get the values of the form fields
//  and add a new book to the library using the addBookToLibrary() function.
//  Finally, the event listener should hide the form field again.
//  You can use the DOM methods to get the values of the form fields and to add or remove 
//  elements from the page.

document.querySelector(".add-book-button").addEventListener("click", () => {
  document.querySelector(".add-book-form").style.visibility = "visible";
});

document.querySelector(".close-modal-button").addEventListener("click", () => {
  document.querySelector(".add-book-form").style.visibility = "hidden";
  document.querySelector("form").reset();
});

