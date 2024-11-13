const bookContainer = document.getElementById("bookContainer");
const readNowIframe = document.getElementById("readNowIframe"); // Target the iframe
const readNowPage = document.getElementById("readNowPage"); // Target the popup container

let books = new Map();

books.set(100, {
  title: 'റാം c/o ആനന്ദി',
  subtitle: 'ram c/o anandhi',
  bookNo: 100,
  imgSrc: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FImg%2FCovers%2FRam-Co-Anandi.jpg?alt=media&token=66d25151-d20c-4df1-ae48-e645f9b4775e",
  readNowLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FMalayalam%2FRam%20c_o%20Anandhi.pdf?alt=media&token=dedd6ad2-de55-4c5b-9ac8-c51ebf39ddc0", // Another book link
  downloadLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FMalayalam%2FRam%20c_o%20Anandhi.pdf?alt=media&token=dedd6ad2-de55-4c5b-9ac8-c51ebf39ddc0",
  authorName: 'Akhil p darmajan',
});

books.set(101, {
  title: 'ഫ്രാൻസിസ് ഇട്ടിക്കോര',
  subtitle: 'francis ittykora',
  bookNo: 101,
  imgSrc: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FImg%2FCovers%2Ffrancis_ittykora%20cover.jpg?alt=media&token=41122fdb-8e5e-441b-960e-f1c57e096507",
  readNowLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FMalayalam%2FFrancis_Itty_Cora.pdf?alt=media&token=c87b7220-d9c3-44b2-89e6-53acb2b328f8", // Another book link
  downloadLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FMalayalam%2FFrancis_Itty_Cora.pdf?alt=media&token=c87b7220-d9c3-44b2-89e6-53acb2b328f8",
  authorName: 'T D ramakrishnan',
});


books.set(102, {
  title: 'ആടുജീവിതം',
  subtitle: 'aadujeevitham',
  bookNo: 102,
  imgSrc: "",
  readNowLink: "", // Another book link
  downloadLink: "",
  authorName: 'Benyamin',
});


books.set(103, {
  title: 'മെർക്കുറി ഐലന്റ്',
  subtitle: 'mercury island',
  bookNo: 103,
  imgSrc: "",
  readNowLink: "", // Another book link
  downloadLink: "",
  authorName: 'akhil p dharmajan',
});


books.set(104, {
  title: 'രഹസ്യം ',
  subtitle: 'the secret',
  bookNo: 104,
  imgSrc: "",
  readNowLink: "", // Another book link
  downloadLink: "",
  authorName: 'Rhonda byrne',
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
