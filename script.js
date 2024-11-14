// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9jJ_m67YiWPf6ASoQfeRhjkE4OPMG1Ew",
  authDomain: "libravercebyfleto.firebaseapp.com",
  projectId: "libravercebyfleto",
  storageBucket: "libravercebyfleto.firebasestorage.app",
  messagingSenderId: "108867020286",
  appId: "1:108867020286:web:ac305357ed7bc72eea4caf",
  measurementId: "G-R78SVV5SRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Reference to the Firestore collection 'Books'
const booksCollection = collection(db, 'Books');

// Function to create a book card
function createBookCard(book) {
  const cardHTML = `
    <div class='book-card'>
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
    </div>
  `;
  return cardHTML;
}

// Function to fetch books from Firestore and display them
async function displayBooks() {
  const booksContainer = document.getElementById('booksContainer');
  
  try {
    // Fetch books from Firestore
    const snapshot = await getDocs(booksCollection);
    
    // Loop through each document and display the book card
    snapshot.forEach((doc) => {
      const bookData = doc.data();
      const bookCard = createBookCard(bookData);
      booksContainer.innerHTML += bookCard;  // Append the new book card
    });
  } catch (error) {
    console.error("Error fetching books: ", error);
  }
}

// Call the function to display books on page load
window.onload = displayBooks;
