const library = [];

class Book {
  constructor(title, author, pages, readStatus) {
    if (!title || !author || !pages || !readStatus) {
      throw new Error("All book properties must be provided");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
  }

  toggleReadStatus() {
    this.readStatus = this.readStatus === "To be read" ? "Read" : "To be read";
  }
}

function addBookToLibrary(title, author, pages, readStatus) {
  try {
    const newBook = new Book(title, author, pages, readStatus);
    library.push(newBook);
    return newBook;
  } catch (error) {
    console.error(error.message);
  }
}

function displayBooks() {
  const booksContainer = document.querySelector(".books-container");
  if (!booksContainer) {
    throw new Error("No books container found");
  }
  booksContainer.innerHTML = ""; // Clear previous entries
  library.forEach(createBookCard);
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  const elements = [
    createBookElement("book-title", book.title),
    createBookElement("book-author", book.author),
    createBookElement("book-pages", `${book.pages} pages`),
    createBookElement("book-read-status", book.readStatus),
  ];

  elements.forEach((element) => bookCard.appendChild(element));

  const deleteButton = createButton("delete", () => {
    library.splice(library.indexOf(book), 1);
    bookCard.remove();
  });

  const toggleStatusButton = createButton("status", () => {
    book.toggleReadStatus();
    bookCard.querySelector(".book-read-status").textContent = book.readStatus;
  });

  bookCard.appendChild(deleteButton);
  bookCard.appendChild(toggleStatusButton);

  document.querySelector(".books-container").appendChild(bookCard);
}

function createBookElement(className, text) {
  const element = document.createElement("div");
  element.classList.add(className);
  element.textContent = text;
  element.appendChild(document.createElement("hr"));
  return element;
}

function createButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(`${text}-button`);
  button.addEventListener("click", onClick);
  return button;
}

// Sample books
const sampleBooks = [
  ["The Hobbit", "J.R.R. Tolkien", 295, "To be read"],
  ["The Fellowship of the Ring", "Steven Spielberg", 3565, "To be read"],
  ["The Two Towers", "A.B.C Kenobi", 8875, "Read"],
  ["The Return of the King", "George Lucas", 123, "Read"],
];

sampleBooks.forEach(([title, author, pages, readStatus]) =>
  addBookToLibrary(title, author, pages, readStatus)
);
displayBooks();

// Event Listeners for Modal
const form = document.querySelector(".add-book-form");
document.querySelector(".add-book-button").addEventListener("click", () => {
  form.style.visibility = "visible";
});

document.querySelector(".close-modal-button").addEventListener("click", () => {
  form.style.visibility = "hidden";
  form.reset();
});

document
  .querySelector('button[type="submit"]')
  .addEventListener("click", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value.trim();
    const author = document.querySelector("#author").value.trim();
    const pages = Number(document.querySelector("#pages").value.trim());
    const readStatus = document.querySelector("#readStatus").value;

    if (!title || !author || !pages) {
      alert("Please fill in all fields.");
      return;
    }

    const newBook = addBookToLibrary(title, author, pages, readStatus);
    if (newBook) {
      createBookCard(newBook);
      form.style.visibility = "hidden";
      form.reset();
    }
  });
