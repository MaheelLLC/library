const my_library = [];

function Book(title, author, num_pages, read) {
    this.title = title;
    this.author = author;
    this.num_pages = num_pages;
    this.read = read;
    this.info = function() {
        if (this.read) {
            return `${this.title} by ${this.author}, ${this.num_pages} pages, read`;
        } else {
            return `${this.title} by ${this.author}, ${this.num_pages} pages, not read yet`;
        }
    };
}

function add_book_to_library(title, author, pages, is_read) {
    const new_book = new Book(title, author, pages, is_read);
    my_library.push(new_book);
    return new_book;
}

const dialog = document.querySelector("dialog");
const new_book = document.querySelector("#new_book");
const close_dialog = document.querySelector("#close_dialog");
const submit_button = document.querySelector("#submit_button");
const book_cards = document.querySelector("#book_cards");
const form = dialog.querySelector("form");

new_book.addEventListener("click", () => {
    dialog.showModal();
});

close_dialog.addEventListener("click", () => {
    dialog.close();
});

submit_button.addEventListener("click", (event) => {
    // prevent form's default behavior
    event.preventDefault();

    // extract form data
    const title = document.getElementById("new_title").value;
    const author = document.getElementById("new_author").value;
    const pages = document.getElementById("new_pages").value;
    const is_read = document.getElementById("new_read").checked;

    // create the book display element to store this new data
    const book_card = document.createElement("div");
    book_card.classList.add("book_card");

    // populate the card with book details, delete box, and checkbox for read status
    book_card.innerHTML = `
        <div class="card_settings">
            <button class="close_book">
                <?xml version="1.0" encoding="UTF-8"?>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 511.991 511.991" style="enable-background:new 0 0 511.991 511.991;" xml:space="preserve" width="512" height="512">
                    <g>
                        <path d="M286.161,255.867L505.745,36.283c8.185-8.474,7.951-21.98-0.523-30.165c-8.267-7.985-21.375-7.985-29.642,0   L255.995,225.702L36.411,6.118c-8.475-8.185-21.98-7.95-30.165,0.524c-7.985,8.267-7.985,21.374,0,29.641L225.83,255.867   L6.246,475.451c-8.328,8.331-8.328,21.835,0,30.165l0,0c8.331,8.328,21.835,8.328,30.165,0l219.584-219.584l219.584,219.584   c8.331,8.328,21.835,8.328,30.165,0l0,0c8.328-8.331,8.328-21.835,0-30.165L286.161,255.867z" fill="red"/>
                    </g>
                </svg>
            </button>
            <input type="checkbox" class="read_status" ${is_read ? "checked" : ""}>
        </div>
        <div class="book_details">
            <div class="detail_container">
                <span>Title</span>
                <span>${title}</span>
            </div>
            <div class="detail_container">
                <span>Author</span>
                <span>${author}</span>
            </div>
            <div class="detail_container">
                <span>Pages</span>
                <span>${pages}</span>
            </div>
        </div>`;

    // add event listener to the close_book button
    const close_button = book_card.querySelector(".close_book");

    // add book to the library
    let new_book = add_book_to_library(title, author, pages, is_read)

    close_button.addEventListener("click", () => {
        // delete the entire book card
        book_card.remove();

        // grab the index of the book inside my library array
        index = my_library.indexOf(new_book);
        
        if (index !== -1) {
            // remove the book from the library array
            my_library.splice(index, 1);
        }
    });

    const read_status_button = book_card.querySelector(".read_status");

    read_status_button.addEventListener("change", () => {
        new_book.read = !new_book.read;
    });
    
    // append the card to the book_cards container
    book_cards.appendChild(book_card);
    
    // reset the form and close the dialog
    form.reset();
    dialog.close();
});

const search_bar = document.querySelector("#search");

search_bar.addEventListener("input", () => {
    let search_bar_text = search_bar.value.toLowerCase();

    // iterate through all book cards
    document.querySelectorAll(".book_card").forEach((book_card) => {
        // get the title from the card
        const card_title = book_card.querySelector(".detail_container span:nth-child(2)").innerText.toLowerCase();

        // check if the title starts with the search text
        if (card_title.startsWith(search_bar_text)) {
            book_card.style.display = "block";
        } else {
            book_card.style.display = "none";
        }
    });
});