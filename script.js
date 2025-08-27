fetch('https://corsproxy.io/?https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json')
  .then(response => {
    if (!response.ok) throw new Error("Erro ao buscar dados da API");
    return response.json();
  })
  .then(data => {
    const gamesContainer = document.getElementById('games-container');
    gamesContainer.innerHTML = '';

    if (!data.matches) {
      gamesContainer.innerHTML = 'Formato de dados inesperado 🤔';
      return;
    }

    data.matches.forEach(match => {
      const gameDiv = document.createElement('div');
      gameDiv.classList.add('game');

      const date = new Date(match.date).toLocaleDateString('pt-BR');
      const score = match.score ? `${match.score.ft[0]} x ${match.score.ft[1]}` : 'x';

      gameDiv.innerHTML = `
        <strong>${date}</strong><br>
        ${match.team1} ${score} ${match.team2}
      `;

      gamesContainer.appendChild(gameDiv);
    });
  })
  .catch(error => {
    console.error('Erro ao buscar API:', error);
    document.getElementById('games-container').innerHTML = 'Erro ao carregar os dados 😢';
  });
