const INCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "bookId"

function addBook() {
    const incompletedBookList = document.getElementById(INCOMPLETED_LIST_BOOK_ID);
    const completedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = parseInt(document.getElementById("inputBookYear").value);
    const isCompleted = document.getElementById("inputBookIsComplete").checked;

    const book = makeBook(title, author, year, isCompleted);
    const bookObject = composeBookObject(title, author, year, isCompleted);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    if (isCompleted) {
        completedBookList.append(book);
    } else {
        incompletedBookList.append(book);
    }
    updateDataToStorage();
}

function makeBook(title, author, year, isCompleted) {
    const textTitle = document.createElement("h3");
    textTitle.classList.add("title");
    textTitle.innerText = title;
    
    const textAuthor = document.createElement("span");
    textAuthor.classList.add("author");
    textAuthor.innerText = author;

    const textAuthorText = document.createElement("p");
    textAuthorText.innerText = "Penulis: ";
    textAuthorText.append(textAuthor);
    
    const textYear = document.createElement("span");
    textYear.classList.add("year");
    textYear.innerText =  year;

    const textYearText = document.createElement("p");
    textYearText.innerText = "Tahun: ";
    textYearText.append(textYear);

    const bookContainer = document.createElement("article");
    bookContainer.classList.add("book_item");

    bookContainer.append(textTitle, textAuthorText, textYearText);

    if (isCompleted) {
        bookContainer.append(
            createUndoButton(),
            createTrashButton()
            );
    } else {
        bookContainer.append(
            createFinishButton(),
            createTrashButton()
            );
    }

    return bookContainer;

}

function createButton(buttonTypeClass, buttonText, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;
    button.addEventListener("click", function(event) {
        eventListener(event);
    });
    return button;
}

function removeBook(taskElement) {
    if (confirm("Apakah anda yakin akan menghapus buku ini?")) {
        const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
        books.splice(bookPosition, 1);

        taskElement.remove();
        updateDataToStorage();
    }
}

function addBookToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const bookTitle = taskElement.querySelector(".title").innerText;
    const bookAuthor = taskElement.querySelector(".author").innerText;
    const bookYear = taskElement.querySelector(".year").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();
}

function undoBookFromCompleted(taskElement) {
    const listIncompleted = document.getElementById(INCOMPLETED_LIST_BOOK_ID);
    const bookTitle = taskElement.querySelector(".title").innerText;
    const bookAuthor = taskElement.querySelector(".author").innerText;
    const bookYear = taskElement.querySelector(".year").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listIncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function createFinishButton() {
    return createButton("green", "Selesai dibaca", function(event){
        addBookToCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("red", "Hapus buku", function(event){
        removeBook(event.target.parentElement);
    });
}

function createUndoButton() {
    return createButton("green", "Belum selesai dibaca", function(event){
        undoBookFromCompleted(event.target.parentElement);
    });
}

function searchBook() {
    const searchTitle = document.getElementById("searchBookTitle").value;
    const searchLower = searchTitle.toLowerCase();
    let bookList = document.querySelectorAll(".book_item");

    bookList.forEach((book) => {
        const bookTitle = book.firstChild.textContent.toLowerCase();

        if (bookTitle.indexOf(searchLower) != -1) {
            book.setAttribute("style", "display: block;");
        } else {
            book.setAttribute("style", "display: none !important;");
        }
    })
}
