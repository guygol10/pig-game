let scores, roundScore, activePlayer, gamePlaying, dice;

init();

const $btnRoll = document.querySelector('.btn-roll');
const $btnHold = document.querySelector('.btn-hold');
const $dice = document.querySelector('.dice');
const $btnNew = document.querySelector('.btn-new');
const $player0Panel = document.querySelector('.player-0-panel');
const $player1Panel = document.querySelector('.player-1-panel');
const $name0 = document.getElementById('name-0');
const $name1 = document.getElementById('name-1');
const $current0 = document.getElementById('current-0');
const $current1 = document.getElementById('current-1');
const $score0 = document.getElementById('score-0');
const $score1 = document.getElementById('score-1')


$btnRoll.addEventListener('click', () => {
    if (gamePlaying) {
        // 1. Random number
        dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the resultp
        $dice.style.display = 'block';
        $dice.src = 'images/' + 'dice-' + dice + '.png';


        //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


$btnHold.addEventListener('click', () => {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            $dice.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    $current0.textContent = '0';
    $current1.textContent = '0';

    $player0Panel.classList.toggle('active');
    $player1Panel.classList.toggle('active');
    
    document.querySelector('.dice').style.display = 'none';
}

$btnNew.addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    $dice.style.display = 'none';

    $score0.textContent = '0';
    $score1.textContent = '0';
    $current0.textContent = '0';
    $current1.textContent = '0';
    $name0.textContent = 'Player 1';
    $name1.textContent = 'Player 2';
    $player0Panel.classList.remove('winner');
    $player1Panel.classList.remove('winner');
    $player0Panel.classList.remove('active');
    $player1Panel.classList.remove('active');
    $player0Panel.classList.add('active');
};
