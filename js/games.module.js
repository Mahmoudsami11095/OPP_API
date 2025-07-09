// js/games.module.js
export class Game {
    constructor({id, title, thumbnail, genre, short_description}) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.genre = genre;
        this.short_description = short_description;
    }
}

const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '1144c58559mshab6965628fdde84p144b48jsne75934c77a4d',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

export async function fetchGames(category = 'mmorpg') {
    try {
        let fetchUrl = url;
        if (category && category.toLowerCase() !== 'mmorpg') {
            fetchUrl = `${url}?category=${encodeURIComponent(category.toLowerCase())}`;
        }
        const response = await fetch(fetchUrl, options);
        const result = await response.json();
        return result.map(gameData => new Game(gameData));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchGameDetails(id) {
    const detailsUrl = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    try {
        const response = await fetch(detailsUrl, options);
        const data = await response.json();
        const game = new Game(data);
        game.short_description = data.description || data.short_description;
        return game;
    } catch (error) {
        console.error(error);
        return null;
    }
} 