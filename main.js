// Variables:
var changeGame;
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

// Event Listeners:
classicSection.addEventListener('click', loadClassicGame);
difficultSection.addEventListener('click', loadDifficultGame);
changeGameButton.addEventListener('click', changeGame);
fightSection.addEventListener('click', chooseFighter);

// EventHandlers & Functions:
function createPlayer(user, token){
  var player = {
    name: user,
    token: token,
    wins: 0,
    fighter: 0
  };
  return player;
};

function takeTurn(userChoice) {
  fighter = userChoice;
  return fighter;
};

function createGame(gameType){
  var game = {
    player: createPlayer('Human', '👩🏾‍💻'),
    computer: createPlayer('Computer', '🖥️'),
    type: gameType,
    fighters: []
  };
    currentGame = game;
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

function checkForWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
  return scoreCounter('draw');
  }else if (computerChoice === '📄' && (userChoice === '✄' || userChoice === '🦎' )) {
  return scoreCounter('user');
  }else if (computerChoice === '🪨' && (userChoice === '📄' || userChoice === '👽')) {
  return scoreCounter('user');
  }else if (computerChoice === '✄' && (userChoice === '🪨' || userChoice === '👽')) {
  return scoreCounter('user');
  }else if (computerChoice === '👽' && (userChoice === '📄' || userChoice === '🦎')) {
  return scoreCounter('user');
  }else if (computerChoice === '🦎' && (userChoice === '🪨' || userChoice === '✄')) {
  return scoreCounter('user');
  }else {
  return scoreCounter('computer');
  };
};

function scoreCounter(theWinner) {
  if (theWinner === 'draw') {
    duringGameHeader.innerText = 'Its, a Draw! \n \n You both chose the same Fighter, try again!'
  }else if (theWinner === 'computer') {
    game.computer.wins += 1
    computerCounter.innerText = `Wins: ${game.computer.wins}`
    duringGameHeader.innerText =  'Computer won this time!'
  }else {
    game.player.wins += 1
    userCounter.innerText = `Wins: ${game.player.wins}`
    duringGameHeader.innerText =  'You Won!!!'
  };
};
  
function computerFighter() {
  var computerTurn = getRandomIndex(game.fighters);
  game.computer.fighter = takeTurn(computerTurn);
    return fighter;
};
  
function getRandomIndex(array) {
  return array[Math.floor(Math.random() * array.length)];
};

function loadClassicGame(event) {
  chooseGame(event);
  hide(classic);
  hide(difficult);
  hide(beforeGameHeader);
  show(changeGameButton);
  show(duringGameHeader);
  showClassicFighters();
  show(fightSection);
};

function loadDifficultGame(event) {
  chooseGame(event); 
  hide(classic);
  hide(difficult);
  show(changeGameButton);
  hide(beforeGameHeader);
  show(duringGameHeader);
  showDifficultFighters();
  show(fightSection);
};

function chooseFighter(event) {
  if(event.target.className === "fighter-icons"){
    var fighter = event.target.closest('img').id 
  };
  game.player.fighter = takeTurn(fighter);
  computerFighter()
  checkForWinner(game.player.fighter, game.computer.fighter);
  displayFighters(game.player, game.computer);
  fightSection.removeEventListener('click', chooseFighter);
  setTimeout(resetBoard, 2000);
  show(duringGameHeader);
};

function changeGame() {
  show(classic);
  show(difficult);
  show(beforeGameHeader);
  hide(duringGameHeader);
  hide(changeGameButton);
  hide(fightSection);
};

function displayFighters(userChoice, computerChoice) {
  var playerFighter = document.getElementById(userChoice.fighter);
  var computerFighter = document.getElementById(computerChoice.fighter);
  fightSection.innerHTML =
   ` <img class="fighter-icons" id="${userChoice.fighter}"src= "${playerFighter.src}" alt="${playerFighter.alt}">
    <img class="fighter-icons" id="${computerChoice.fighter}"src= "${computerFighter.src}" alt="${computerFighter.alt}">`
};

function hide(element) {
  element.classList.add('hidden');
};

function show(element) {
  element.classList.remove('hidden');
};

function showClassicFighters() {
  fightSection.innerHTML = 
    `<img class="fighter-icons" id="📄"src= "src/happy-paper.png" alt="Piece of paper">
     <img class="fighter-icons" id="🪨"src= "src/sang.png" alt="Happy rock">
     <img class="fighter-icons" id="✄"src= "src/lines-scissors.png" alt="Pair of scissors">`
};

function showDifficultFighters() {
  fightSection.innerHTML = 
    `<img class="fighter-icons" id="📄" src= "src/happy-paper.png" alt="Piece of paper">
     <img class="fighter-icons" id="🪨"src= "src/sang.png" alt="Happy rock">
     <img class="fighter-icons" id="✄"src= "src/lines-scissors.png" alt="Pair of scissors">
     <img class="fighter-icons" id="🦎"src= "src/lizard.webp" alt="Picture of lizard">
     <img class="fighter-icons" id="👽"src= "src/alien.png" alt="Picture of alien">`
};

function resetBoard() {
  for (var i = 0; i < fighterIcons.length; i++) {
    show(fighterIcons[i]);
  };
  duringGameHeader.innerText = 'Choose your fighter!'
  fightSection.addEventListener('click', chooseFighter);
  if(game.type === 'classic'){
    showClassicFighters();
  }else{
    showDifficultFighters();
  };
};