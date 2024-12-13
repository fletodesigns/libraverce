// Import Firebase modules 
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, setDoc, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpNiBfj1WPVputBiSLBsdOnm0MFLjVYlE",
  authDomain: "flebooks.firebaseapp.com",
  projectId: "flebooks",
  storageBucket: "flebooks.appspot.com",
  messagingSenderId: "458785971847",
  appId: "1:458785971847:web:ed6138c7df952c9f3d6222",
  measurementId: "G-XMD1VDPZGT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to Firestore 'Books' collection
const booksCollection = collection(db, "Books");

// Helper function to encode ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
  const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
  return btoa(binary);
}

const API_BASE_URL = 'https://api.github.com/repos/fletodesigns/Flestorage/contents';

// Function to get GitHub token from Firestore
async function getGitHubToken() {
  const docRef = doc(db, "Data", "github token");
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data().token; // Return the 'token' field value
  } else {
    throw new Error("GitHub token not found in Firestore.");
  }
}

// Function to upload files to GitHub
async function uploadToGitHub(file, path, fileName) {
  const token = await getGitHubToken(); // Fetch the GitHub token dynamically
  const url = `${API_BASE_URL}/${path}/${fileName}`;
  const fileBuffer = await file.arrayBuffer();
  const base64Content = arrayBufferToBase64(fileBuffer);

  let sha = null;

  // Check if the file already exists
  const checkResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (checkResponse.ok) {
    const existingFile = await checkResponse.json();
    sha = existingFile.sha; // Extract the current file's SHA
  } else if (checkResponse.status !== 404) {
    const errorData = await checkResponse.json();
    console.error('GitHub API Error (Check):', errorData);
    throw new Error(`Failed to check file existence: ${checkResponse.statusText}`);
  }

  // Create or update the file
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: `Upload ${fileName}`,
      content: base64Content,
      sha: sha || undefined, // Include SHA only if it exists
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('GitHub API Error (Upload):', errorData);
    throw new Error(`Failed to upload ${fileName}: ${response.statusText}`);
  }

  // Replace the GitHub raw URL with Netlify's domain
  const netlifyBaseUrl = "https://flestorage.netlify.app";
  const data = await response.json();
  const githubRawUrl = "https://raw.githubusercontent.com/fletodesigns/Flestorage/main";
  const customUrl = data.content.download_url.replace(githubRawUrl, netlifyBaseUrl);

  return customUrl;
}

// Function to sanitize document ID for Firestore
function sanitizeFirestoreDocId(id) {
  // Replace any invalid characters (e.g., spaces, slashes) with underscores
  let sanitizedId = id.replace(/[^a-zA-Z0-9_-]/g, "_");

  // Ensure the ID isn't empty after sanitization
  if (!sanitizedId || /^[_]+$/.test(sanitizedId)) {
      sanitizedId = `book_${Date.now()}`; // Fallback to a unique ID if sanitized title is invalid
  }

  // Optionally truncate the title if it's too long for Firestore (max 1,500 bytes)
  if (sanitizedId.length > 1500) {
      sanitizedId = sanitizedId.substring(0, 1500);
  }

  return sanitizedId;
}

// Form submission handler
// Form submission handler
document.getElementById('book-upload-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent the form from submitting traditionally

  // Get values from the form
  const bookNo = document.getElementById('bookNo').value.trim();
  const title = document.getElementById('title').value.trim();
  const subtitle = document.getElementById('subtitle').value.trim();
  const authorName = document.getElementById('authorName').value.trim();
  const language = document.getElementById('languageInput').value.trim();
  const imgFile = document.getElementById('imgFile').files[0];
  const pdfFile = document.getElementById('fileInput').files[0];

  if (!bookNo || !title || !authorName || !language || !imgFile || !pdfFile) {
      alert("All fields are required. Please fill in all the details.");
      return; // Stop if validation fails
  }

  try {
      const sanitizedImgFileName = imgFile.name.replace(/[^a-zA-Z0-9.]/g, "_");
      const sanitizedPdfFileName = pdfFile.name.replace(/[^a-zA-Z0-9.]/g, "_");

      // Upload cover image
      const coverPath = `files/Projects/Flebooks/${language}/cover`;
      const coverUrl = await uploadToGitHub(imgFile, coverPath, sanitizedImgFileName);

      // Upload PDF
      const pdfPath = `files/Projects/Flebooks/${language}/pdf`;
      const pdfUrl = await uploadToGitHub(pdfFile, pdfPath, sanitizedPdfFileName);

      // Create a new book object
      const newBook = {
          bookNo,
          title,
          subtitle,
          authorName,
          language,
          imgSrc: coverUrl,
          fileLink: pdfUrl,
      };

      // Choose document ID based on language
      let docId;
      if (language.toLowerCase() !== "english") {
          // If the language is not English, use subtitle as the document ID
          docId = sanitizeFirestoreDocId(subtitle);
      } else {
          // If the language is English, use title as the document ID
          docId = sanitizeFirestoreDocId(title);
      }

      // Log the selected document ID
      console.log("Document ID:", docId);

      // Add to Firestore
      const bookDocRef = doc(db, "Books", docId);
      await setDoc(bookDocRef, newBook);

      alert("Book uploaded successfully!");
      document.getElementById('book-upload-form').reset();
  } catch (error) {
      console.error("Error uploading files: ", error);
      alert("Failed to upload the book. Please try again.");
  }
});
