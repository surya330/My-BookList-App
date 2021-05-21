// Book class : Represents a Book
class Book {
    constructor(title, author, price){
        this.title = title;
        this.author = author;
        this.price = price;
    }
}

// UI Class : Handle UI Tasks 
class UI{
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book){
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");
        row.innerHTML = `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.price}</td>
        <td><a href="#" class="btn btn-danger delete">Del</a></td>`;
        list.appendChild(row);
    }

    static deleteBooks(el) {
        if(el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearfields(){
        document.querySelector("#title").value = " ";
        document.querySelector("#author").value = " ";
        document.querySelector("#price").value = " ";
    }
}

// Store Class : Handle storage

class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem("books")== null){
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }
    static removeBook(price){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.price == price){
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books",JSON.stringify(books));
    }
}

// Event : Display Books 
document.addEventListener("DOMContentLoaded",UI.displayBooks);

// Event : Add a book
document.querySelector("#book-form").addEventListener("submit",(e) => {
    // Prevent actual submit
    e.preventDefault();

    //Get form values 
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const price = document.querySelector("#price").value;

    // Instatiate book
    const book = new Book(title, author, price);
    
    // Add book to UI
    UI.addBookToList(book);

    //Add book to store
    Store.addBook(book);

    // Clear Fields
    UI.clearfields();
});

//Event : Remove a book
document.querySelector("#book-list").addEventListener('click', (e) => {
    UI.deleteBooks(e.target);
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})