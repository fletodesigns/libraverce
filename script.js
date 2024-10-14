const bookContainer = document.getElementById("bookContainer");
const readNowIframe = document.getElementById("readNowIframe"); // Target the iframe
const readNowPage = document.getElementById("readNowPage"); // Target the popup container

let books = new Map();

books.set(100, {
  title: '105-ാം മുറിയിലെ പെൺകുട്ടി',
  subtitle: 'nootiyanjaam muriyile penkutti',
  bookNo: 100,
  imgSrc: "/img/covers/nootiyanjam_muriyile_penkutty.jpg",
  readNowLink: "/books/Noottiyanchaam_Muriyile_Penkutty.pdf", // Link to the book
  downloadLink: "https://ufile.io/bti5qrls",
  authorName: 'Akhil p darmajan',
});

books.set(101, {
  title: 'ഷെർലക്ക് ഹോംസ് മലയാളം ',
  subtitle: 'sherlock holmes malaylam',
  bookNo: 101,
  imgSrc: "/img/covers/sherlock_holmes_malayalam.jpg",
  readNowLink: "/books/Sherlock-Holmes-Malayalam.pdf", // Another book link
  downloadLink: "https://ufile.io/1h0o7q5h",
  authorName: 'Akhil p darmajan',
});

books.set(102, {
  title: 'ഒരു പോലീസ് സർജന്റെ ഓർമ്മക്കുറിപ്പുകൾ ',
  subtitle: 'oru police surgente ormmakkurippukal',
  bookNo: 102,
  imgSrc: "/img/covers/oru_police_surgante_0ormakkurippukal.jpg",
  readNowLink: "/books/oru-police-surgeonte-ormakkurippukal.pdf", // Another book link
  downloadLink: "https://ufile.io/1h0o7q5h",
  authorName: 'Akhil p darmajan',
});

books.set(103, {
  title: 'റാം c/o ആനന്ദി',
  subtitle: 'ram c/o anandhi',
  bookNo: 103,
  imgSrc: "/img/covers/.jpg",
  readNowLink: "/books/ram-c-o-anandhi.pdf", // Another book link
  downloadLink: "",
  authorName: 'Akhil p darmajan',
});

function setBooks() {
  // Clear the book container before appending new content
  bookContainer.innerHTML = '';

  // Loop through each book in the books map and create a book card
  books.forEach((book) => {
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card'); // Adding a class for styling
    bookCard.innerHTML = `
      <div class='cover'>
        <img src='${book.imgSrc}' alt='Book Cover'>
      </div>
      <div>
        <h5>${book.bookNo}</h5>
        <h2>${book.title}</h2>
        <h3>${book.subtitle}</h3>
        <h4>${book.authorName}</h4>
      </div>
      <div class='actions'>
        <button class='read-now-btn'><i class='fa-solid fa-book'></i> Read now</button>
        <button class='download-btn'>
          <a href='${book.downloadLink}' target='_blank'><i class='fa-solid fa-download'></i></a>
        </button>
      </div>
    `;

    // Append the book card to the container
    bookContainer.appendChild(bookCard);

    // Add click event listener to the "Read now" button
    const readNowButton = bookCard.querySelector('.read-now-btn');
    const readCloseButton = document.getElementById('readCloseBtn');
    readNowButton.addEventListener('click', () => {
      // Update the iframe src with the readNowLink of the clicked book
      readNowIframe.src = book.readNowLink;

      // Display the read now page as flex when the book is clicked
      readNowPage.style.display = 'flex';
    });
    readCloseButton.addEventListener('click', () => {
      // Display the read now page as flex when the book is clicked
      readNowPage.style.display = 'none';
    });
  });
}

setBooks();

// Search books
function searchBooks() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const bookCards = document.querySelectorAll('.book-card');

  bookCards.forEach(card => {
    const title = card.querySelector('h2').textContent.toLowerCase();
    const subtitle = card.querySelector('h3').textContent.toLowerCase();
    const bookNo = card.querySelector('h5').textContent.toLowerCase();
    const authorName = card.querySelector('h4').textContent.toLowerCase();

    if (title.includes(query) || subtitle.includes(query) || bookNo.includes(query) || authorName.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Search function connected to the search bar
document.getElementById('searchBar').addEventListener('keyup', searchBooks);
