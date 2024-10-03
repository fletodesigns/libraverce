// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Burger menu toggle for mobile view
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Book search/filter functionality
const searchInput = document.getElementById('search');
const bookGrid = document.getElementById('book-grid');
const bookCards = bookGrid.querySelectorAll('.book-card');

searchInput.addEventListener('keyup', () => {
    const searchValue = searchInput.value.toLowerCase();
    bookCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(searchValue)) {
            card.classList.remove('fade-out');
            card.classList.add('fade-in');
        } else {
            card.classList.remove('fade-in');
            card.classList.add('fade-out');
        }
    });
});

// Modal functionality for book details
const modal = document.getElementById('book-modal');
const modalTitle = document.getElementById('modal-title');
const modalAuthor = document.getElementById('modal-author');
const closeButton = document.querySelector('.close-button');

bookCards.forEach(card => {
    card.addEventListener('click', () => {
        modalTitle.textContent = card.querySelector('h3').textContent;
        modalAuthor.textContent = card.querySelector('p').textContent;
        modal.classList.add('modal-open');
        modal.style.display = 'block';
    });
});

closeButton.addEventListener('click', () => {
    modal.classList.add('modal-close');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('modal-open', 'modal-close');
    }, 300); // Match the duration of the closing animation
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.classList.add('modal-close');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('modal-open', 'modal-close');
        }, 300); // Match the duration of the closing animation
    }
});
