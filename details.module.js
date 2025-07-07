// details.module.js
export function displayGameDetails(game) {
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
} 