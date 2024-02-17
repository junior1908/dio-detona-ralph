const state = {
  view: {
    squares: document.querySelectorAll(".quadrado"),
    enemy: document.querySelector(".ralph"),
    timeleft: document.querySelector("#tempo-restante"),
    score: document.querySelector("#pontuacao"),
  },
  values: {
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countdownTimerId: setInterval(countdown, 1000),
  },
};

function countdown() {
  state.values.currentTime--;
  state.view.timeleft.textContent = state.values.currentTime;

  if(state.values.currentTime <= 0){
    clearInterval(state.actions.countdownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
  }
}

function playSound(audioName){
  let audio = new Audio(`./src/sounds/${audioName}`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare(){
  state.view.squares.forEach((square) => {
    square.classList.remove("ralph");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("ralph");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if(square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit.m4a");
      }
    });
  });
}

function main() {
  state.view.score.textContent = state.values.result;
  state.view.timeleft.textContent = state.values.currentTime;

  addListenerHitBox();
}

main();