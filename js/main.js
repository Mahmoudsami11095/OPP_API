const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '1144c58559mshab6965628fdde84p144b48jsne75934c77a4d',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

// Game class
class Game {
    constructor({id, title, thumbnail, genre, short_description}) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.genre = genre;
        this.short_description = short_description;
    }
}

// UI class
class UI {
    static displayGames(games) {
        const gamesList = document.getElementById('games-list');
        gamesList.innerHTML = '';
        if (!games || games.length === 0) {
            gamesList.innerHTML = '<div class="text-secondary fs-5 py-5 text-center">No games found</div>';
            return;
        }
        games.forEach(game => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-4';
            colDiv.innerHTML = `
                <div class="card game-item h-100 p-2" style="background:#23272b;border-radius:16px;box-shadow:0 2px 8px rgba(0,0,0,0.10);">
                    <img src="${game.thumbnail}" alt="${game.title}" class="card-img-top game-thumb" style="border-radius:12px;">
                    <div class="card-body d-flex flex-column align-items-start">
                        <div class="d-flex w-100 align-items-center mb-2">
                            <span class="game-title flex-grow-1" style="font-size:1.2rem;font-weight:700;color:#fff;">${game.title}</span>
                            <span class="badge bg-primary ms-2" style="font-size:1rem;">Free</span>
                        </div>
                        <div class="game-desc mb-3" style="color:#bfc9d1;font-size:1.05rem;min-height:48px;">${game.short_description ? game.short_description.split(' ').slice(0,12).join(' ') + '...' : ''}</div>
                        <div class="d-flex gap-2 mt-auto w-100">
                            <span class="badge bg-dark" style="font-size:1rem;">${game.genre || ''}</span>
                            <span class="badge bg-secondary" style="font-size:1rem;">PC (Windows)</span>
                        </div>
                    </div>
                </div>
            `;
            colDiv.querySelector('.game-item').addEventListener('click', () => {
                showGameDetails(game.id);
            });
            gamesList.appendChild(colDiv);
        });
    }

    static displayGameDetails(game) {
        const detailsSection = document.getElementById('details-section');
        const detailsDiv = document.getElementById('game-details');
        detailsDiv.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}" class="game-thumb" style="max-width:300px;display:block;margin:0 auto 24px auto;">
            <h2 style="color:#09c;text-align:center;">${game.title}</h2>
            <p style="text-align:center;color:#bfc9d1;">Genre: ${game.genre}</p>
            <p style="margin-top:24px;">${game.short_description}</p>
        `;
        document.getElementById('games-section').style.display = 'none';
        detailsSection.style.display = 'block';
        document.getElementById('custom-navbar').classList.add('d-none');
        // أغلق قائمة الفئات إذا كانت مفتوحة
        const navCats = document.querySelector('.navbar-categories');
        if(navCats) navCats.classList.remove('show-navbar-cats');
    }
}

async function fetchGames(category = 'mmorpg') {
    try {
        document.getElementById('loading-spinner').style.display = 'flex';
        let fetchUrl = url;
        if (category && category.toLowerCase() !== 'mmorpg') {
            fetchUrl = `${url}?category=${encodeURIComponent(category.toLowerCase())}`;
        }
        const response = await fetch(fetchUrl, options);
        const result = await response.json();
        // تحويل كل لعبة إلى كائن Game
        const games = result.map(gameData => new Game(gameData));
        document.getElementById('loading-spinner').classList.add('hide-important');
        UI.displayGames(games);
    } catch (error) {
        console.error(error);
        document.getElementById('loading-spinner').classList.add('hide-important');
        UI.displayGames([]);
    }
}

async function showGameDetails(id) {
    // جلب تفاصيل اللعبة من الـ API
    const detailsUrl = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    try {
        const response = await fetch(detailsUrl, options);
        const data = await response.json();
        // نستخدم نفس كلاس Game مع البيانات الجديدة
        const game = new Game(data);
        game.short_description = data.description || data.short_description;
        UI.displayGameDetails(game);
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('details-section').style.display = 'none';
    document.getElementById('games-section').style.display = 'block';
    document.getElementById('custom-navbar').classList.remove('d-none');
    // أغلق قائمة الفئات إذا كانت مفتوحة
    const navCats = document.querySelector('.navbar-categories');
    if(navCats) navCats.classList.remove('show-navbar-cats');
});

function setupCategoryEvents() {
    document.querySelectorAll('.nav-category').forEach(cat => {
        cat.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveCategory(this);
            fetchGames(this.textContent.trim());
        });
    });
}

function setActiveCategory(categoryElement) {
    document.querySelectorAll('.nav-category').forEach(cat => cat.classList.remove('active'));
    categoryElement.classList.add('active');
}

// Initial load
setupCategoryEvents();
fetchGames('mmorpg'); 