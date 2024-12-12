// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpNiBfj1WPVputBiSLBsdOnm0MFLjVYlE",
  authDomain: "flebooks.firebaseapp.com",
  projectId: "flebooks",
  storageBucket: "flebooks.firebasestorage.app",
  messagingSenderId: "458785971847",
  appId: "1:458785971847:web:ed6138c7df952c9f3d6222",
  measurementId: "G-XMD1VDPZGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// GitHub Configuration
const GITHUB_TOKEN = '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';
const API_BASE_URL = 'https://api.github.com/repos/fletodesigns/Flestorage/contents';

// Helper function to encode ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
  const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
  return btoa(binary);
}

// Function to upload files to GitHub
async function uploadToGitHub(fileContent, path, fileName) {
  const url = `${API_BASE_URL}/${path}/${fileName}`;
  const base64Content = arrayBufferToBase64(fileContent);

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
  e.preventDefault();

  try {
    // Get form data
    const bookNo = document.getElementById('bookNo').value;
    const title = document.getElementById('title').value;
    const subtitle = document.getElementById('subtitle').value;
    const authorName = document.getElementById('authorName').value;
    const language = document.getElementById('languageInput').value;

    const coverFile = document.getElementById('imgFile').files[0];
    const pdfFile = document.getElementById('fileInput').files[0];

    // Define paths based on language
    const coverPath = language === 'english'
      ? 'files/Projects/Flebooks/English/covers'
      : 'files/Projects/Flebooks/Malayalam/cover';
    const pdfPath = language === 'english'
      ? 'files/Projects/Flebooks/English/pdf'
      : 'files/Projects/Flebooks/Malayalam/pdf';

    // Upload cover image to GitHub
    const coverFileContent = await coverFile.arrayBuffer();
    const coverFileName = coverFile.name;
    const coverUrl = await uploadToGitHub(coverFileContent, coverPath, coverFileName);

    // Upload PDF file to GitHub
    const pdfFileContent = await pdfFile.arrayBuffer();
    const pdfFileName = pdfFile.name;
    const pdfUrl = await uploadToGitHub(pdfFileContent, pdfPath, pdfFileName);

    // Save book details to Firestore
    const newBook = {
      bookNo: bookNo,
      title: title,
      subtitle: subtitle,
      authorName: authorName,
      imgSrc: coverUrl,
      fileLink: pdfUrl,
    };

    await addDoc(collection(db, 'Books'), newBook);

    alert('Book uploaded successfully!');
    document.getElementById('book-upload-form').reset(); // Clear the form
  } catch (error) {
    console.error('Error uploading files: ', error);
    alert(`Error uploading files: ${error.message}`);
  }
});
