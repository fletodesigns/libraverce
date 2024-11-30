const GITHUB_TOKEN = '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';
const REPO_OWNER = 'fletodesigns';
const REPO_NAME = 'Flestorage';
const FOLDER_PATH = 'files/Projects/Flebooks/Malayalam';

const uploadFileToGitHub = async (file) => {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FOLDER_PATH}/${file.name}`;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const fileContent = btoa(e.target.result);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add file: ${file.name}`,
        content: fileContent,
      }),
    });

    const result = await response.json();
    if (result.content) {
      const fileLink = result.content.download_url;
      saveFileLinkToFlebooks(fileLink);
    } else {
      console.error('Error uploading file:', result.message);
      alert('Failed to upload file.');
    }
  };

  reader.readAsBinaryString(file);
};

const saveFileLinkToFlebooks = (fileLink) => {
  // Assuming Firebase is used to save the link
  const db = firebase.firestore();
  const docRef = db.collection('files').doc(); // Update with your collection and doc structure

  docRef
    .set({
      fileLink: fileLink,
      uploadedAt: new Date(),
    })
    .then(() => {
      alert('File uploaded and link saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving file link:', error);
      alert('Failed to save file link.');
    });
};

document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    uploadFileToGitHub(file);
  } else {
    alert('Please select a file to upload.');
  }
});
