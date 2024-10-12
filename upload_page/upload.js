// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

// Handle form submission
document.getElementById('bookForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form data
  const title = document.getElementById('title').value;
  const subtitle = document.getElementById('subtitle').value;
  const readNowUrl = document.getElementById('readNowUrl').value;
  const downloadUrl = document.getElementById('downloadUrl').value;
  const coverImageUrl = document.getElementById('coverImage').value; // URL input for cover image

  try {
    // Save book details to Firestore
    await addDoc(collection(db, "books"), {
      title: title,
      subtitle: subtitle,
      coverImage: coverImageUrl,
      readNowUrl: readNowUrl,
      downloadUrl: downloadUrl
    });

    alert("Book added successfully!");
    document.getElementById('bookForm').reset(); // Reset form after submission

  } catch (error) {
    console.error("Error adding book: ", error);
    alert("Failed to add book. Please try again.");
  }
});
