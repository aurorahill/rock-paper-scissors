import './sass/index.scss';

const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

const game = {
  playerHand: null,
  aiHand: null,
};

const hands = [...document.querySelectorAll('.select img')];

function handSelection() {
  game.playerHand = this.dataset.option;

  hands.forEach((hand) => (hand.style.boxShadow = ''));
  this.style.boxShadow = '0 0 10px 10px #000000';
}

function aiChoice() {
  const aiHand = hands[Math.floor(Math.random() * 3)].dataset.option;
  return aiHand;
}

function checkResult(player, ai) {
  console.log(`player: ${player}, ai: ${ai}`);
  if (player === ai) {
    return 'draw';
  } else if (
    (player === 'paper' && ai === 'rock') ||
    (player === 'rock' && ai === 'scissors') ||
    (player === 'scissors' && ai === 'paper')
  ) {
    return 'victory';
  } else {
    return 'defeat';
  }
}

function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;
  document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;

  if (result === 'victory') {
    document.querySelector('p.wins span').textContent = ++gameSummary.wins;
    document.querySelector('[data-summary="who-win"]').textContent = 'You won!';
    document.querySelector('[data-summary="who-win"]').style.color = 'green';
  } else if (result === 'defeat') {
    document.querySelector('p.losses span').textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent =
      'AI won :(';
    document.querySelector('[data-summary="who-win"]').style.color = 'red';
  } else {
    document.querySelector('p.draws span').textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = 'Draw :|';
    document.querySelector('[data-summary="who-win"]').style.color = 'gray';
  }
}

function endGame() {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow =
    '';
  game.playerHand = null;
  game.aiHand = null;
}

//funkcja sterująca
function startGame() {
  if (!game.playerHand) {
    return alert('Chose a hand!');
  }

  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  console.log(gameResult);
  publishResult(game.playerHand, game.aiHand, gameResult);
  endGame();
}

hands.forEach((hand) => hand.addEventListener('click', handSelection));

document.querySelector('.start').addEventListener('click', startGame);
