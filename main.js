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
      computer.wins += 1
      computerCounter.innerText = `Wins: ${computer.wins}`
      duringGameHeader.innerText =  'Computer won this time!'
    }else {
      player.wins += 1
      userCounter.innerText = `Wins: ${player.wins}`
      duringGameHeader.innerText =  'You Won!!!'
    };
  };
    
  function computerFighter() {
    var computerTurn = getRandomIndex(game.fighters);
      takeTurn(computerTurn);
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
    classicFighters();
    show(fightSection);
  };
    
  function loadDifficultGame(event) {
    chooseGame(event); 
    hide(classic);
    hide(difficult);
    show(changeGameButton);
    hide(beforeGameHeader);
    show(duringGameHeader);
    difficultFighters();
    show(fightSection);
  };
  
  function chooseFighter(event) {
    var fighter = event.target.closest('img').id;
    takeTurn(fighter);
    computerFighter();
    checkForWinner(fighter, fighter);
    displayFighters(game.player, game.computer) // need to fined a better way on user choice and comp choice
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
    var fighterIcons = document.querySelectorAll('.fighter-icons');
    var playerFighter = document.getElementById(userChoice.fighter);
    var computerFighter = document.getElementById(computerChoice.fighter);
  
    for (var i = 0; i < fighterIcons.length; i++) {
      hide(fighterIcons[i]);
    };
      show(playerFighter);
      show(computerFighter);
  };
  
  function hide(element) {
    element.classList.add('hidden');
  };
  
  function show(element) {
    element.classList.remove('hidden');
  };
  
  function classicFighters() {
    fightSection.innerHTML = 
      `<img class="fighter-icons" id="📄"src= "src/happy-paper.png" alt="Piece of paper">
       <img class="fighter-icons" id="🪨"src= "src/sang.png" alt="Happy rock">
       <img class="fighter-icons" id="✄"src= "src/lines-scissors.png" alt="Pair of scissors">`
  };
  
  function difficultFighters() {
    fightSection.innerHTML = 
      `<img class="fighter-icons" id="📄" src= "src/happy-paper.png" alt="Piece of paper">
       <img class="fighter-icons" id="🪨"src= "src/sang.png" alt="Happy rock">
       <img class="fighter-icons" id="✄"src= "src/lines-scissors.png" alt="Pair of scissors">
       <img class="fighter-icons" id="🦎"src= "src/lizard.webp" alt="Picture of lizard">
       <img class="fighter-icons" id="👽"src= "src/alien.png" alt="Picture of alien">`
  };
  
  function resetBoard() {
    var fighterIcons = document.querySelectorAll('.fighter-icons');
    for (var i = 0; i < fighterIcons.length; i++) {
      show(fighterIcons[i]);
    };
    duringGameHeader.innerText = 'Choose your fighter!'
    fightSection.addEventListener('click', chooseFighter);
  };