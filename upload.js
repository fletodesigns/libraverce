// Import the necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getFirestore(app);

// Reference to the Firestore collection 'Books'
const booksCollection = collection(db, 'Books');

document.getElementById('book-upload-form').addEventListener('submit', function (e) {
  e.preventDefault();  // Prevent the form from submitting the traditional way

  // Get values from the form
  const bookNo = document.getElementById('bookNo').value;
  const title = document.getElementById('title').value;
  const subtitle = document.getElementById('subtitle').value;
  const authorName = document.getElementById('authorName').value;
  const imgSrc = document.getElementById('imgSrc').value;  // Get the image URL
  const downloadLink = document.getElementById('downloadLink').value;
  
  
  // Create a new book object
  const newBook = {
    bookNo: bookNo,
    title: title,
    subtitle: subtitle,
    authorName: authorName,
    imgSrc: imgSrc,  // Store image URL as text
    downloadLink: downloadLink
  };
  
  // Add the new book to Firestore
  addDoc(booksCollection, newBook).then(() => {
    alert("Book uploaded successfully!");
    document.getElementById('book-upload-form').reset(); // Clear the form
  }).catch(error => {
    console.error("Error adding document: ", error);
  });
});

const coverImg = document.getElementById('cover-img');
const imgSrc = document.getElementById('imgSrc');

imgSrc.onkeydown = () =>{
  coverImg.src = imgSrc.value;
}