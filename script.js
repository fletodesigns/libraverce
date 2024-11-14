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

books.set(105, {
  title: 'Atomic habitd',
  subtitle: 'atomic habits',
  bookNo: 105,
  imgSrc: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FImg%2FCovers%2Fatomic%20habits.jpg?alt=media&token=0c5b6413-16f5-4bb0-a1fe-8b7a61a4e3c0",
  readNowLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FEnglish%2Fatomic%20habits.pdf?alt=media&token=3a2a5545-9539-4d32-8d29-002bf7f02df4", // Another book link
  downloadLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FEnglish%2Fatomic%20habits.pdf?alt=media&token=3a2a5545-9539-4d32-8d29-002bf7f02df4",
  authorName: 'James clear',
});

books.set(102, {
  title: 'ആടുജീവിതം',
  subtitle: 'aadujeevitham',
  bookNo: 102,
  imgSrc: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FImg%2FCovers%2FAdujeevitham.jpg?alt=media&token=42a47c73-f2e2-49a2-b0b7-64ac5e10c31c",
  readNowLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FMalayalam%2Faadujeevitham.pdf?alt=media&token=09b528b0-7e1b-4234-a2d0-59c51e4ff8bb", // Another book link
  downloadLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FMalayalam%2Faadujeevitham.pdf?alt=media&token=09b528b0-7e1b-4234-a2d0-59c51e4ff8bb",
  authorName: 'Benyamin',
});

books.set(103, {
  title: 'മെർക്കുറി ഐലന്റ്',
  subtitle: 'mercury island',
  bookNo: 103,
  imgSrc: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FImg%2FCovers%2Fmercury-island.jpg?alt=media&token=a928cf7f-66e9-4936-a949-2653ad68f76e",
  readNowLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FMalayalam%2Fmercury_island.pdf?alt=media&token=57a42c39-b518-4ea6-9fb0-244a05abb1c5", // Another book link
  downloadLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FMalayalam%2Fmercury_island.pdf?alt=media&token=57a42c39-b518-4ea6-9fb0-244a05abb1c5",
  authorName: 'akhil p dharmajan',
});

books.set(106, {
  title: 'The beast of buckingham palace',
  subtitle: 'the beast of the buckingham palace',
  bookNo: 106,
  imgSrc: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FImg%2FCovers%2FThe-Beast-of-Buckingham-Palace.webp?alt=media&token=4343b7b1-f08c-45d2-a065-ca9a2ea8fae5",
  readNowLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FEnglish%2FThe_Beast_of_Buckingham_Palace.pdf?alt=media&token=e71a0632-cac4-4891-a917-b1b115de76cb", // Another book link
  downloadLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FEnglish%2FThe_Beast_of_Buckingham_Palace.pdf?alt=media&token=e71a0632-cac4-4891-a917-b1b115de76cb",
  authorName: 'David Walliams',
});

books.set(104, {
  title: 'രഹസ്യം ',
  subtitle: 'the secret',
  bookNo: 104,
  imgSrc: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FImg%2FCovers%2Frahasyam.jpg?alt=media&token=aa8455ad-ab33-4602-9462-6e53e0600661",
  readNowLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FMalayalam%2FThe%20Secret%20(Malayalam).pdf?alt=media&token=31b39687-fd03-4f9f-991f-6c95a5383026", // Another book link
  downloadLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FMalayalam%2FThe%20Secret%20(Malayalam).pdf?alt=media&token=31b39687-fd03-4f9f-991f-6c95a5383026",
  authorName: 'Rhonda byrne',
});

books.set(107, {
  title: 'The girl in room 105',
  subtitle: 'the girl in room 105',
  bookNo: 107,
  imgSrc: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FImg%2FCovers%2Fthe%20girl%20in%20room%20105.jpg?alt=media&token=039c4e46-8765-43cc-8543-b3e09c029c8b",
  readNowLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FEnglish%2Fgirl%20in%20room%20105.pdf?alt=media&token=6015b374-295c-4fe5-aa47-bc9df262d88b", // Another book link
  downloadLink: "https://firebasestorage.googleapis.com/v0/b/fledrive.appspot.com/o/Projects%2FLibraverce%2FEnglish%2Fgirl%20in%20room%20105.pdf?alt=media&token=6015b374-295c-4fe5-aa47-bc9df262d88b",
  authorName: 'Chetan bhagat',
});

books.set(10, {
  title: '',
  subtitle: '',
  bookNo: 10,
  imgSrc: "",
  readNowLink: "", // Another book link
  downloadLink: "",
  authorName: '',
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
      <div class="details">
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
