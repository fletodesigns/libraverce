// Import Firebase modules 
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

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

// GitHub Configuration
const GITHUB_TOKEN = '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';
const API_BASE_URL = 'https://api.github.com/repos/fletodesigns/Flestorage/contents';

// Helper function to encode ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
  const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
  return btoa(binary);
}

// Function to upload files to GitHub
async function uploadToGitHub(file, path, fileName) {
  const url = `${API_BASE_URL}/${path}/${fileName}`;
  const fileBuffer = await file.arrayBuffer();
  const base64Content = arrayBufferToBase64(fileBuffer);

  let sha = null;

  // Check if the file already exists
  const checkResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
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
      Authorization: `Bearer ${GITHUB_TOKEN}`,
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

// Form submission handler
document.getElementById('book-upload-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent the form from submitting traditionally

  // Get values from the form
  const bookNo = document.getElementById('bookNo').value;
  const title = document.getElementById('title').value;
  const subtitle = document.getElementById('subtitle').value;
  const authorName = document.getElementById('authorName').value;
  const language = document.getElementById('languageInput').value; // Get the selected language
  const imgFile = document.getElementById('imgFile').files[0];
  const pdfFile = document.getElementById('fileInput').files[0];

  try {
    // Upload cover image
    const coverPath = `files/Projects/Flebooks/${language}/cover`;
    const coverUrl = await uploadToGitHub(imgFile, coverPath, imgFile.name);

    // Upload PDF
    const pdfPath = `files/Projects/Flebooks/${language}/pdf`;
    const pdfUrl = await uploadToGitHub(pdfFile, pdfPath, pdfFile.name);

    // Create a new book object
    const newBook = {
      bookNo: bookNo,
      title: title,
      subtitle: subtitle,
      authorName: authorName,
      language: language, // Include language in the Firestore document
      imgSrc: coverUrl, // Cover image URL
      fileLink: pdfUrl, // PDF file URL
    };

    // Add the new book to Firestore
    await addDoc(booksCollection, newBook);
    alert("Book uploaded successfully!");
    document.getElementById('book-upload-form').reset(); // Clear the form
  } catch (error) {
    console.error("Error uploading files: ", error);
    alert("Failed to upload the book. Please try again.");
  }
});
