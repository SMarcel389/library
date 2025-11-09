const shelf = document.querySelector(".shelf")

const myLibrary = [];
myLibrary.push( new Book("Harry Potter", "JK Rowling", 320, false) )
myLibrary.push( new Book("The Hobbit", "JRR Tolkien", 420, false) )

function Book(title, author, pages, read, thumbnail) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read
  this.thumbnail = thumbnail
  this.id = crypto.randomUUID(title)
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

        if (Book.thumbnail) {
            bookCard.classList.add("bookWithImage")
            bookCard.style.backgroundImage = `url(${Book.thumbnail})`
        }
                
        const bookTitle = document.createElement("h4");
            bookTitle.textContent = Book.title

        const bookAuthor = document.createElement("p");
            bookAuthor.textContent = Book.author;

        const bookPages = document.createElement("p");
            if (Book.pages) {
                bookPages.textContent = "Pages: " + Book.pages
            }

        const bookRead = document.createElement("div")
            if (Book.read) {
                bookRead.className = "bookIsRead"
            }
            else {
                bookRead.className = "bookIsNotRead"
            }
        
        bookCard.append(bookTitle, bookAuthor, bookPages, bookRead)
        shelf.append(bookCard)
        }
    }


