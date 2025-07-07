// ui.module.js
export class UI {
    static displayGames(games, onGameClick) {
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
                <div class="card game-item h-100">
                    <img src="${game.thumbnail}" alt="${game.title}" class="card-img-top game-thumb">
                    <div class="card-body d-flex flex-column align-items-center">
                        <div class="game-title">${game.title}</div>
                        <div class="game-genre">${game.genre}</div>
                    </div>
                </div>
            `;
            colDiv.querySelector('.game-item').addEventListener('click', () => {
                if (onGameClick) onGameClick(game.id);
            });
            gamesList.appendChild(colDiv);
        });
    }
} 