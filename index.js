// index.js
import { fetchGames, fetchGameDetails } from './games.module.js';
import { UI } from './ui.module.js';
import { displayGameDetails } from './details.module.js';

function setupCategoryEvents() {
    document.querySelectorAll('.category').forEach(cat => {
        cat.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveCategory(this);
            loadGames(this.textContent.trim());
        });
    });
}

function setActiveCategory(categoryElement) {
    document.querySelectorAll('.category').forEach(cat => cat.classList.remove('active'));
    categoryElement.classList.add('active');
}

async function loadGames(category = 'all') {
    const games = await fetchGames(category);
    UI.displayGames(games, showGameDetails);
}

async function showGameDetails(id) {
    const game = await fetchGameDetails(id);
    if (game) displayGameDetails(game);
}

document.getElementById('back-btn').addEventListener('click', () => {
    document.getElementById('details-section').style.display = 'none';
    document.getElementById('games-section').style.display = 'block';
});

// Initial load
setupCategoryEvents();
loadGames('all'); 