const myLibrary = [];

function Book(title, author, pages, readStatus) {
  if (!title || !author || !pages || !readStatus) {
    throw new Error("All book properties must be provided");
  }

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
  try {
    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
  } catch (error) {
    console.error(error.message);
  }
}

function listBooks() {
  try {
    myLibrary.forEach((book) => {
      const { title, author, pages, readStatus } = book;
      console.log(`${title} by ${author}, ${pages} pages, ${readStatus}`);
    });
  } catch (error) {
    console.error(error.message);
  }
}

// Sample books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "To be read");
addBookToLibrary(
  "The Fellowship of the Ring",
  "Steven Spielberg",
  3565,
  "To be read"
);
addBookToLibrary("The Two Towers", "A.B.C Kenobi", 8875, "Read");
addBookToLibrary("The Return of the King", "George Lucas", 123, "Read");

listBooks();

// Initial book cards creation for myLibrary
// Grab the books container
const booksContainer = document.querySelector(".books-container");
if (!booksContainer) {
  throw new Error("No books container found");
}
// Iterate through myLibrary and fill out book cards
myLibrary.forEach((book) => {
  // Create book DOM elements
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  const bookTitle = document.createElement("div");
  bookTitle.classList.add("book-title");
  const bookAuthor = document.createElement("div");
  bookAuthor.classList.add("book-author");
  const bookPages = document.createElement("div");
  bookPages.classList.add("book-pages");
  const bookReadStatus = document.createElement("div");
  bookReadStatus.classList.add("book-read-status");
  // Fill out book elements
  bookTitle.textContent = `${book.title}`;
  bookTitle.appendChild(document.createElement("hr"));
  bookAuthor.textContent = `${book.author}`;
  bookAuthor.appendChild(document.createElement("hr"));
  bookPages.textContent = `${book.pages} pages`;
  bookReadStatus.textContent = `${book.readStatus}`;
  // Append book elements
  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(bookReadStatus);
  booksContainer.appendChild(bookCard);
});

document.querySelector(".add-book-button").addEventListener("click", () => {
  const form = document.querySelector(".add-book-form");
  if (!form) {
    throw new Error("No add book form found");
  }
  form.style.visibility = "visible";
});

document.querySelector(".close-modal-button").addEventListener("click", () => {
  const form = document.querySelector(".add-book-form");
  if (!form) {
    throw new Error("No add book form found");
  }
  form.style.visibility = "hidden";
  const formElements = document.querySelectorAll("form input, form select");
  if (!formElements) {
    throw new Error("No form elements found");
  }
  formElements.forEach((element) => {
    element.value = "";
  });
});

document
  .querySelector('button[type="submit"]')
  .addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the form from submitting

    // Get form values
    const title = document.querySelector("#title").value.trim();
    const author = document.querySelector("#author").value.trim();
    const pages = document.querySelector("#pages").value.trim();
    const readStatus = document.querySelector("#readStatus").value;

    // Check for empty fields
    if (!title || !author || !pages) {
      alert("Please fill in all fields."); // Alert the user
      return; // Exit the function if any field is empty
    }

    try {
      const bookData = {
        title,
        author,
        pages: Number(pages), // Convert pages to a number
        readStatus,
      };

      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");

      const bookTitle = document.createElement("div");
      bookTitle.classList.add("book-title");
      bookTitle.textContent = bookData.title;
      bookTitle.appendChild(document.createElement("hr"));

      const bookAuthor = document.createElement("div");
      bookAuthor.classList.add("book-author");
      bookAuthor.textContent = bookData.author;
      bookAuthor.appendChild(document.createElement("hr"));

      const bookPages = document.createElement("div");
      bookPages.classList.add("book-pages");
      bookPages.textContent = `${bookData.pages} pages`;

      const bookReadStatus = document.createElement("div");
      bookReadStatus.classList.add("book-read-status");
      bookReadStatus.textContent = bookData.readStatus;

      bookCard.appendChild(bookTitle);
      bookCard.appendChild(bookAuthor);
      bookCard.appendChild(bookPages);
      bookCard.appendChild(bookReadStatus);

      const booksContainer = document.querySelector(".books-container");
      booksContainer.appendChild(bookCard);

      document.querySelector(".add-book-form").style.visibility = "hidden";
      document.querySelector("form").reset();
    } catch (error) {
      console.error(error.message);
    }
  });

