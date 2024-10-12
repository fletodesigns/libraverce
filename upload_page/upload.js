// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

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
const storage = getStorage(app);

// Handle form submission
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const subtitle = document.getElementById('subtitle').value;
  const coverImage = document.getElementById('coverImage').value;
  const pdfFile = document.getElementById('pdfUpload').files[0];

  if (!pdfFile) {
    alert('Please upload a PDF file.');
    return;
  }

  try {
    // Upload the PDF to Firebase Storage
    const pdfRef = ref(storage, `pdfs/${title}/${pdfFile.name}`);
    const snapshot = await uploadBytes(pdfRef, pdfFile);
    const pdfUrl = await getDownloadURL(snapshot.ref);

    // Add the book details along with the PDF URL to Firestore
    await addDoc(collection(db, 'books'), {
      title,
      subtitle,
      coverImage,
      pdfUrl
    });

    alert('Book uploaded successfully!');
  } catch (error) {
    console.error('Error uploading book:', error);
    alert('Failed to upload book. Please try again.');
  }
});
