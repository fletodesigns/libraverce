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

// Fetch books from Firestore and display them
async function loadBooks() {
  const bookContainer = document.getElementById('bookContainer');
  bookContainer.innerHTML = ''; // Clear the container

  try {
    const querySnapshot = await getDocs(collection(db, 'books'));
    querySnapshot.forEach((doc) => {
      const book = doc.data();

      // Create book card
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');

      // Set book cover
      const coverDiv = document.createElement('div');
      coverDiv.classList.add('cover');
      const coverImg = document.createElement('img');
      coverImg.src = book.coverImage;
      coverImg.alt = `Book Cover for ${book.title}`;
      coverDiv.appendChild(coverImg);

      // Set book title and subtitle
      const title = document.createElement('h2');
      title.textContent = book.title;
      const subtitle = document.createElement('h3');
      subtitle.textContent = book.subtitle;

      // Actions for "Read Now" and "Download"
      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('actions');

      // Read Now button
      const readNowButton = document.createElement('button');
      readNowButton.classList.add('download-btn');
      const readNowLink = document.createElement('a');
      readNowLink.href = book.pdfUrl;
      readNowLink.target = '_blank';
      readNowLink.innerHTML = `<i class="fa-solid fa-book"></i> Read now`;
      readNowButton.appendChild(readNowLink);

      // Append actions
      actionsDiv.appendChild(readNowButton);

      // Append all elements to book card
      bookCard.appendChild(coverDiv);
      bookCard.appendChild(title);
      bookCard.appendChild(subtitle);
      bookCard.appendChild(actionsDiv);

      // Append book card to container
      bookContainer.appendChild(bookCard);
    });
  } catch (error) {
    console.error('Error loading books:', error);
  }
}

// Call loadBooks to display all books on page load
loadBooks();

// Search function to filter books
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

// Attach searchBooks function to search input
document.getElementById('searchBar').addEventListener('keyup', searchBooks);
