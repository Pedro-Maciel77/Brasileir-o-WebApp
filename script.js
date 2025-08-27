const gamesContainer = document.getElementById('games-container');

const url = 'https://raw.githubusercontent.com/openfootball/br-brazil/master/2023/br.1.json';
const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;

fetch(proxiedUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro ao buscar dados da API");
    }
    return response.json();
  })
  .then(data => {
    gamesContainer.innerHTML = ''; // Limpa "Carregando..."

    data.rounds.forEach(round => {
      const roundTitle = document.createElement('h2');
      roundTitle.textContent = round.name;
      gamesContainer.appendChild(roundTitle);

      round.matches.forEach(match => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');

        const date = new Date(match.date).toLocaleDateString('pt-BR');
        const score = match.score ? `${match.score.ft[0]} x ${match.score.ft[1]}` : 'x';

        gameDiv.innerHTML = `
          <strong>${date}</strong>
          ${match.team1.name} ${score} ${match.team2.name}
        `;

        gamesContainer.appendChild(gameDiv);
      });
    });
  })
  .catch(error => {
    gamesContainer.innerHTML = '<p>Erro ao carregar os dados 😢</p>';
    console.error('Erro ao buscar API:', error);
  });
