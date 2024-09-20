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
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`
    );
  }
}

function addBookToLibrary(title, author, pages, readStatus) {
  try {
    const newBook = new Book(title, author, pages, readStatus);
    library.push(newBook);
  } catch (error) {
    console.error(error.message);
  }
}

function listBooks() {
  try {
    library.forEach((book) => {
      const { title, author, pages, readStatus } = book;
      console.log(`${title} by ${author}, ${pages} pages, ${readStatus}`);
    });
  } catch (error) {
    console.error(error.message);
  }
}

//------------------------------- Sample books-------------------------------------
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "To be read");
addBookToLibrary(
  "The Fellowship of the Ring",
  "Steven Spielberg",
  3565,
  "To be read"
);
addBookToLibrary("The Two Towers", "A.B.C Kenobi", 8875, "Read");
addBookToLibrary("The Return of the King", "George Lucas", 123, "Read");
//---------------------------------------------------------------------------------

// Initial book cards creation for library
const booksContainer = document.querySelector(".books-container");
if (!booksContainer) {
  throw new Error("No books container found");
}
// Iterate through library and fill out book cards
library.forEach((book) => {
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
  const bookDeleteButton = document.createElement("button");
  bookDeleteButton.classList.add("delete-button");
  bookDeleteButton.textContent = "delete";
  const bookReadStatusToggle = document.createElement("button");
  bookReadStatusToggle.classList.add("read-status-toggle");
  bookReadStatusToggle.textContent = "status";

  // Add event listener to delete button
  bookDeleteButton.addEventListener("click", () => {
    const index = library.indexOf(book);
    if (index > -1) {// book is found in the books array
      library.splice(index, 1);// delete the book and adjust the array
    }
    bookCard.remove();
  });

  // Add event listener to read status toggle button
  bookReadStatusToggle.addEventListener("click", () => {
    if (book.readStatus === "To be read") {
      book.readStatus = "Read";
      const index = library.indexOf(book);
      if (index > -1) {
        library[index].readStatus = "Read";
      }
    } else if (book.readStatus === "Read") {
      book.readStatus = "To be read";
      const index = library.indexOf(book);
      if (index > -1) {
        library[index].readStatus = "To be read";
      }
    }
    bookReadStatus.textContent = `${book.readStatus}`;
  });

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
  bookCard.appendChild(bookDeleteButton);
  bookCard.appendChild(bookReadStatusToggle);
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
      addBookToLibrary(title, author, pages, readStatus);
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

      const bookDeleteButton = document.createElement("button");
      bookDeleteButton.classList.add("delete-button");
      bookDeleteButton.textContent = "delete";

      const bookReadStatusToggle = document.createElement("button");
      bookReadStatusToggle.classList.add("read-status-toggle");
      bookReadStatusToggle.textContent = "status";

      // Add event listener to read status toggle button
      bookReadStatusToggle.addEventListener("click", () => {
        if (bookData.readStatus === "To be read") {
          bookData.readStatus = "Read";
        } else if (bookData.readStatus === "Read") {
          bookData.readStatus = "To be read";
        }
        bookReadStatus.textContent = `${bookData.readStatus}`;
        const index = library.indexOf(bookData);
        if (index > -1) {
          library[index].readStatus = bookData.readStatus;
        }
      });

      bookCard.appendChild(bookTitle);
      bookCard.appendChild(bookAuthor);
      bookCard.appendChild(bookPages);
      bookCard.appendChild(bookReadStatus);
      bookCard.appendChild(bookDeleteButton);
      bookCard.appendChild(bookReadStatusToggle);

      const booksContainer = document.querySelector(".books-container");
      booksContainer.appendChild(bookCard);

      document.querySelector(".add-book-form").style.visibility = "hidden";
      document.querySelector("form").reset();

      // Add event listener to delete button
      bookDeleteButton.addEventListener("click", () => {
        const index = library.indexOf(bookData);
        if (index > -1) {
          library.splice(index, 1);
        }
        bookCard.remove();
      });
    } catch (error) {
      console.error(error.message);
    }
  });
