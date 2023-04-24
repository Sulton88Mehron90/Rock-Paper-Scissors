// Variables:
var game = createGame();
var userSection = document.getElementById('userSection');
var userCounter = document.getElementById('userCounter');
var changeGameButton = document.getElementById('changeGameButton');
var beforeGameHeader = document.getElementById('beforeGameHeader');
var duringGameHeader = document.querySelector('.during-game-header');
var bothRules = document.getElementById('bothRules');
var classicSection = document.getElementById('classic');
var difficultSection = document.getElementById('difficult');
var computerSection = document.getElementById('computerSection');
var computerCounter = document.getElementById('computerCounter');
var fightSection = document.getElementById('fightSection');
var fighterIcons = document.querySelectorAll('.fighter-icons');

//Event Listeners:
classicSection.addEventListener('click', loadClassicGame);
difficultSection.addEventListener('click', loadDifficultGame);
changeGameButton.addEventListener('click', changeGame);
fightSection.addEventListener('click', chooseFighter);

// eventHandlers & functions:
function createPlayer(user, token, userChoice){
  var player = {
    name: user,
    token: token,
    wins: 0,
    fighter: userChoice
  };
  return player;
};

function takeTurn(userChoice) {
  fighter = userChoice;
  return fighter;
};

function createGame(gameType){
  var currentGame = {
    player: createPlayer('Human', '👩🏾‍💻'),
    computer: createPlayer('Computer', '🖥️'),
    type: gameType,
    fighters: []
  };
    return currentGame;
};
      
function chooseGame(event) {
  if(event.target.closest('#classic')) {
    game.type = 'classic'
    game.fighters = ['📄' , '🪨' , '✄'] 
  }else {
    game.type = 'difficult'
    game.fighters = ['📄' , '🪨' , '✄' , '🦎', '👽' ]
  };
};
