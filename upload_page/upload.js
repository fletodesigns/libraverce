// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";
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
const storage = getStorage(app);
const db = getFirestore(app);

// Handle form submission
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const subtitle = document.getElementById('subtitle').value;
  const coverImage = document.getElementById('coverImage').files[0];
  const pdfFile = document.getElementById('pdfFile').files[0];
  const statusMessage = document.getElementById('statusMessage');

  if (!coverImage || !pdfFile) {
    statusMessage.textContent = "Both cover image and PDF file are required.";
    return;
  }

  try {
    // Upload cover image to Firebase Storage
    const coverImageRef = ref(storage, `covers/${coverImage.name}`);
    await uploadBytes(coverImageRef, coverImage);
    const coverImageUrl = await getDownloadURL(coverImageRef);

    // Upload PDF file to Firebase Storage
    const pdfFileRef = ref(storage, `pdfs/${pdfFile.name}`);
    await uploadBytes(pdfFileRef, pdfFile);
    const pdfFileUrl = await getDownloadURL(pdfFileRef);

    // Save book details to Firestore
    await addDoc(collection(db, 'books'), {
      title: title,
      subtitle: subtitle,
      coverImage: coverImageUrl,
      pdfUrl: pdfFileUrl
    });

    statusMessage.textContent = "Book uploaded successfully!";
    document.getElementById('uploadForm').reset();
  } catch (error) {
    console.error('Error uploading book:', error);
    statusMessage.textContent = "Error uploading book. Please try again.";
  }
});
