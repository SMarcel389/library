const shelf = document.querySelector(".shelf")

const myLibrary = [];
myLibrary.push( new Book("Harry Potter and the Goblet of Fire", "J.K. Rowling", 635, false) )
myLibrary.push( new Book("The Hobbit", "J.R.R. Tolkien", 300, false) )
myLibrary.push( new Book("Dune", "Frank Herbert", 412, false) )

function Book(title, author, pages, read=0, thumbnail) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read
  this.thumbnail = thumbnail
  this.id = crypto.randomUUID(title)
}

Book.prototype.toggleRead = function() {
    this.read = this.read ? 0 : 1;
  }


const form = document.querySelector("#book-add")
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const formResult = new FormData(form);
    const bookData = Object.fromEntries(formResult.entries())

    if (bookData.title !=="") {
        myLibrary.push( new Book(bookData.title, bookData.author, bookData.pages, bookData.read, bookData.thumbnail))
        displayBooks()
    }
    else {
        alert("Your book must have a title!")
    }
})

function displayBooks() {
    shelf.innerHTML = ""
    shelf.classList.add("filled")
    for (const Book of myLibrary) {
        const bookCard = document.createElement("div")
        bookCard.className = "bookCard"
        bookCard.dataset.uuid = Book.id

        if (Book.thumbnail) {
            bookCard.classList.add("bookWithImage")
            bookCard.style.backgroundImage = `url(${Book.thumbnail})`
        }
                
        const bookTitle = document.createElement("h4");
            bookTitle.textContent = Book.title
            bookTitle.classList.add("Title")

        const bookAuthor = document.createElement("p");
            bookAuthor.textContent = Book.author;
            bookAuthor.classList.add("Author")

        const bookPages = document.createElement("p");
            if (Book.pages) {
                bookPages.textContent = "Pages: " + Book.pages
                bookPages.classList.add("Pages")
            }

        const bookButtons = document.createElement("div")
        bookButtons.className = "bookButtons"

        const bookRead = document.createElement("div")
            if (Book.read) {
                bookRead.className = "bookIsRead"
            }
            else {
                bookRead.className = "bookIsNotRead"
            }
        bookRead.addEventListener("click", () => {
            Book.toggleRead()
            if (Book.read) {
                bookRead.className = "bookIsRead"
            }
            else {
                bookRead.className = "bookIsNotRead"
            }
        })
        bookButtons.append(bookRead)

        const deleteButton = document.createElement("button")
        deleteButton.className = "deleteButton"
        deleteButton.textContent = "X"
        bookButtons.append(deleteButton)
        deleteButton.addEventListener("click", function() {
            shelf.removeChild(bookCard)
        })
        
        bookCard.append(bookTitle, bookAuthor, bookPages, bookButtons)
        shelf.append(bookCard)
        }
    }


