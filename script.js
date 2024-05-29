let library = [];

function Book(title, author, pages, read, notes=""){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.notes = notes;
    this.change_status = function () {
        this.read = this.read ? false : true;
    };
}

function addBookToLibrary(title, author, pages, read, notes=""){
    let new_book = new Book(title, author, pages, read, notes);
    library.push(new_book);
    displayBooks();
}

let hobbit = new Book ("The Hobbit", "Tolkien", 578, false, "my fav");

library.push(hobbit);

let button = document.getElementById("add_book");

// title
// author
// pages
// read

function get_status(status){
    let read = document.createElement("div");
    read.innerText = status ? "You have read it already✔" : "You haven't read it yet✘";
    let color = status ? "green" : "red";
    status.style.cssText = `margin-top: auto; text-align: center; color: ${color}`;
    return read;
}


function displayBook(book){
    let new_book = document.createElement("div");
    
    let title = document.createElement("div");
    title.innerText = book.title ? book.title : "unknown";
    title.style.cssText = "font-size: 1.5rem; font-weight: bold; text-align: center"
    new_book.appendChild(title);

    let author = document.createElement("div");
    author.innerText = "by " + (book.author ? book.author : "unknown");
    author.style.cssText = "text-align: right; font-size: 18px; font-style:italic";
    new_book.appendChild(author);
    
    let pages = document.createElement("div");
    pages.innerText = `Pages: ${book.pages ? book.pages : "uknown"}`;
    new_book.appendChild(pages);
    
    let notes = document.createElement("div");
    notes.innerText = "---\n"+book.notes;
    new_book.appendChild(notes);
    
    let read = document.createElement("div");
    read.innerText = book.read ? "You have read it already✔" : "You haven't read it yet✘";
    let color = book.read ? "green" : "red";
    read.style.cssText = `margin-top: auto; color: ${color}`;
    new_book.appendChild(read);
    
    let new_button = document.createElement("button")
    new_button.innerText = "change status";
    new_button.addEventListener("click", ()=>{
        book.read = !book.read;
        read.innerText = book.read ? "You have read it already✔" : "You haven't read it yet✘";
        color = book.read ? "green" : "red";
        read.style.cssText = `margin-top: auto; text-align: center; color: ${color}`;
    });
    new_button.classList.add("change-status");
    
    new_book.appendChild(new_button);
    
    let trash = document.createElement("button");
    let logo = document.createElement("img");
    logo.setAttribute("src", "pictures/trashbox.svg");
    trash.id = "remove";
    trash.addEventListener("click", ()=>{
        library = library.filter((el)=> el!=book);
        displayBooks();
    });
    // logo.innerHTML = "src='pictures/trashbox.svg'";
    trash.appendChild(logo);
    new_book.appendChild(trash);
    
    new_book.classList.add("book");
    books.appendChild(new_book);
}

function displayBooks(){
    books.innerHTML = "";
    for (let book of library){
        displayBook(book);
    }
}


const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
    const form = document.getElementById("form")
    form.reset();
    dialog.close();
});

function submitForm(){
    const form = document.getElementById("form");  
    let elements = form.elements;
    let new_book = new Book (elements.title.value, elements.author.value, elements.pages.value, (elements.read.checked), elements.notes.value);
    library.push(new_book);
    displayBook(new_book);
    form.reset();
    dialog.close();
}

const books = document.getElementById("books");
books.innerHTML = "";
books.style.cssText = "margin: 20px; display: flex; gap: 20px; flex-wrap: wrap";
displayBooks();