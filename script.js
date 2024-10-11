// script.js

function searchBooks() {
    // Get the search query
    const query = document.getElementById('searchBar').value.toLowerCase();

    // Get all book cards
    const bookCards = document.querySelectorAll('.book-card');

    // Loop through each card and check if it matches the search query
    bookCards.forEach(card => {
        // Get the book title and subtitle (h2 and h3)
        const title = card.querySelector('h2').textContent.toLowerCase();
        const subtitle = card.querySelector('h3').textContent.toLowerCase();

        // Check if the query matches the title or subtitle
        if (title.includes(query) || subtitle.includes(query)) {
            card.style.display = 'block'; // Show the card
        } else {
            card.style.display = 'none'; // Hide the card
        }
    });
}
