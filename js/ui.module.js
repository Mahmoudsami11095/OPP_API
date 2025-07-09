// js/ui.module.js
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
                if (onGameClick) onGameClick(game.id);
            });
            gamesList.appendChild(colDiv);
        });
    }
} 