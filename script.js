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

document.querySelector(".add-book-button").addEventListener("click", () => {
  document.querySelector(".form-container").style.display = "block";
});

document.getElementById("book-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readStatus = document.getElementById("readStatus").value;

  addBookToLibrary(title, author, pages, readStatus);

  // Optional: Display the library in the console
//   myLibrary.forEach((book) => book.info());

  // Clear the form
//   document.getElementById("book-form").reset();
//   document.querySelector(".form-container").style.display = "none";
});
