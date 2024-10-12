// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa4aHiPQTsfIRxdd1iyNzNzz7Pk2KwByw",
  authDomain: "libraverce.firebaseapp.com",
  projectId: "libraverce",
  storageBucket: "libraverce.appspot.com",
  messagingSenderId: "1079899173493",
  appId: "1:1079899173493:web:7dd7173af8fb0659477e3c",
  measurementId: "G-KL456LZMJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch and display books from Firestore
async function fetchBooks() {
  const bookCollection = collection(db, "books");
  const bookSnapshot = await getDocs(bookCollection);
  const books = bookSnapshot.docs.map(doc => doc.data());

  const bookContainer = document.getElementById('bookContainer');
  bookContainer.innerHTML = ''; // Clear the book container

  books.forEach(book => {
    const bookCard = `
      <div class="book-card">
        <div class="cover">
          <img src="${book.coverImage}" alt="Book Cover">
        </div>
        <h2>${book.title}</h2>
        <h3>${book.subtitle}</h3>
        <div class="actions">
          <button class="download-btn"><i class="fa-solid fa-book"></i><a href="${book.readNowUrl}" target="_blank"> Read now</a></button>
          <button class="favorite-btn"><a href="${book.downloadUrl}" target="_blank"><i class="fa-solid fa-download"></i></a></button>
        </div>
      </div>
    `;
    bookContainer.innerHTML += bookCard;
  });
}

// Search books
function searchBooks() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const bookCards = document.querySelectorAll('.book-card');

  bookCards.forEach(card => {
    const title = card.querySelector('h2').textContent.toLowerCase();
    const subtitle = card.querySelector('h3').textContent.toLowerCase();

    if (title.includes(query) || subtitle.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Load books on page load
window.onload = fetchBooks;

// Search function connected to the search bar
document.getElementById('searchBar').addEventListener('keyup', searchBooks);
