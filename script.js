// Array to store all the books
const library = [];

// Class to represent a book
class Book {
  // Constructor to create a new book
  constructor(title, author, pages, readStatus) {
    // Check if all the properties are provided
    if (!title || !author || !pages || !readStatus) {
      // If not, throw an error
      throw new Error("All book properties must be provided");
    }
    // Set the properties
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  // Method to get a string with the book's information
  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
  }

  // Method to toggle the book's read status
  toggleReadStatus() {
    // Change the read status to the opposite
    this.readStatus = this.readStatus === "To be read" ? "Read" : "To be read";
  }
}

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, readStatus) {
  try {
    // Create a new book
    const newBook = new Book(title, author, pages, readStatus);
    // Add it to the library
    library.push(newBook);
    // Return the new book
    return newBook;
  } catch (error) {
    // If there was an error, log it
    console.error(error.message);
  }
}

// Function to display all the books in the library
function displayBooks() {
  // Get the container for the books
  const booksContainer = document.querySelector(".books-container");
  if (!booksContainer) {
    // If it doesn't exist, throw an error
    throw new Error("No books container found");
  }
  // Clear the container
  booksContainer.innerHTML = "";
  // For each book in the library, create a card
  library.forEach(createBookCard);
}

// Function to create a card for a book
function createBookCard(book) {
  // Create a new div for the card
  const bookCard = document.createElement("div");
  // Add the class for the card
  bookCard.classList.add("book-card");

  // Create the elements for the book's information
  const elements = [
    createBookElement("book-title", book.title),
    createBookElement("book-author", book.author),
    createBookElement("book-pages", `${book.pages} pages`),
    createBookElement("book-read-status", book.readStatus),
  ];

  // Add the elements to the card
  elements.forEach((element) => bookCard.appendChild(element));

  // Create the delete button
  const deleteButton = createButton("delete", () => {
    // Remove the book from the library
    library.splice(library.indexOf(book), 1);
    // Remove the card from the DOM
    bookCard.remove();
  });

  // Create the toggle status button
  const toggleStatusButton = createButton("status", () => {
    // Toggle the book's read status
    book.toggleReadStatus();
    // Update the card with the new status
    bookCard.querySelector(".book-read-status").textContent = book.readStatus;
  });

  // Add the buttons to the card
  bookCard.appendChild(deleteButton);
  bookCard.appendChild(toggleStatusButton);

  // Add the card to the container
  document.querySelector(".books-container").appendChild(bookCard);
}

// Function to create an element for the book's information
function createBookElement(className, text) {
  // Create a new div for the element
  const element = document.createElement("div");
  // Add the class for the element
  element.classList.add(className);
  // Set the text for the element
  element.textContent = text;
  // Add a horizontal line after the element
  element.appendChild(document.createElement("hr"));
  // Return the element
  return element;
}

// Function to create a button
function createButton(text, onClick) {
  // Create a new button
  const button = document.createElement("button");
  // Set the text for the button
  button.textContent = text;
  // Add the class for the button
  button.classList.add(`${text}-button`);
  // Add an event listener for the button
  button.addEventListener("click", onClick);
  // Return the button
  return button;
}

// Sample books
const sampleBooks = [
  ["The Hobbit", "J.R.R. Tolkien", 295, "To be read"],
  ["The Fellowship of the Ring", "Steven Spielberg", 3565, "To be read"],
  ["The Two Towers", "A.B.C Kenobi", 8875, "Read"],
  ["The Return of the King", "George Lucas", 123, "Read"],
];

// Add the sample books to the library
sampleBooks.forEach(([title, author, pages, readStatus]) =>
  addBookToLibrary(title, author, pages, readStatus)
);
// Display the books in the library
displayBooks();

// Event listeners for the form
const form = document.querySelector(".add-book-form");
// Open the form when the button is clicked
document.querySelector(".add-book-button").addEventListener("click", () => {
  form.style.visibility = "visible";
});

// Close the form when the button is clicked
document.querySelector(".close-modal-button").addEventListener("click", () => {
  form.style.visibility = "hidden";
  form.reset();
});

// When the form is submitted, create a new book
document
  .querySelector('button[type="submit"]')
  .addEventListener("click", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value.trim();
    const author = document.querySelector("#author").value.trim();
    const pages = Number(document.querySelector("#pages").value.trim());
    const readStatus = document.querySelector("#readStatus").value;

    if (!title || !author || !pages) {
      // If not all fields are filled, alert the user
      alert("Please fill in all fields.");
      return;
    }

    const newBook = addBookToLibrary(title, author, pages, readStatus);
    if (newBook) {
      // Create a card for the new book
      createBookCard(newBook);
      // Close the form
      form.style.visibility = "hidden";
      // Reset the form
      form.reset();
    }
  });


