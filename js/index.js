// js/index.js
import { fetchGames, fetchGameDetails } from './games.module.js';
import { UI } from './ui.module.js';
import { displayGameDetails } from './details.module.js';

function setupCategoryEvents() {
    document.querySelectorAll('.nav-category').forEach(cat => {
        cat.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveCategory(this);
            loadGames(this.textContent.trim());
        });
    });
}

function setActiveCategory(categoryElement) {
    document.querySelectorAll('.nav-category').forEach(cat => cat.classList.remove('active'));
    categoryElement.classList.add('active');
}

async function loadGames(category = 'mmorpg') {
    document.getElementById('loading-spinner').classList.remove('hide-important');
    const games = await fetchGames(category);
    document.getElementById('loading-spinner').classList.add('hide-important');
    UI.displayGames(games, showGameDetails);
}

async function showGameDetails(id) {
    const game = await fetchGameDetails(id);
    if (game) displayGameDetails(game);
}

document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('details-section').style.display = 'none';
    document.getElementById('games-section').style.display = 'block';
    document.getElementById('custom-navbar').classList.remove('d-none');
    // أغلق قائمة الفئات إذا كانت مفتوحة
    const navCats = document.querySelector('.navbar-categories');
    if(navCats) navCats.classList.remove('show-navbar-cats');
});

// Initial load
setupCategoryEvents();
loadGames('mmorpg'); 