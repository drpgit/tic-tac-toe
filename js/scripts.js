// Back-end logic goes here

var active = false;
var humanPlay = "";
var computerPlay = "";
var human = [];
var computer = [];
var played = [];
var moves = [7, 3, 5, 9, 1, 8, 6, 2, 4];
var solutions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

function newGame(play1, play2) {
  human = [];
  computer = [];
  active = true;
  played = [];
  clearBoard();
  if (play1 === "o") {
    humanPlay = "O";
    computerPlay = "X";
    nextComputer();
    $(".message-text").html("Game Started. You are 'O'.");
  } else if (play1 === "x") {
    humanPlay = "X";
    computerPlay = "O";
    $(".message-text").html("Game Started. You are 'X'.");
  }
}

function clearBoard() {
  for (var i = 1; i <= 9; i++) {
    $("#" + i).html("");
  }
}

function playComputer(comMove) {
  computer.push(comMove);
  played.push(comMove);
  $("#" + comMove).html(computerPlay);
  checkPlay("computer");
}

function playHuman(humMove) {
  var move = Number(humMove);
  if (played.indexOf(move) === -1) {
    human.push(move);
    played.push(move);
    $("#" + humMove).html(humanPlay);
    if (checkPlay("human") === false) {
      nextComputer();
    }
  }
}

function nextComputer() {
  // make array of open squares
  var temp = [];
  for (var i = 1; i <= 9; i++) {
    if (played.indexOf(i) === -1) {
      temp.push(i);
    }
  }
  // check if there's a winning computer move
  for (var j = 0; j < temp.length; j++) {
    computer.push(temp[j]);
    for (var k = 0; k < solutions.length; k++) {
      var check1 = true;
      for (var l = 0; l < 3; l++) {
        if (computer.indexOf(solutions[k][l]) === -1) {
          check1 = false;
        }
      }
      if (check1 && (computer.indexOf(temp[j]) >= 0)) {
        computer.pop();
        playComputer(temp[j]);
        return;
      }
    }
    computer.pop();
  }
  // else if, check if human will have a winning move
  for (var n = 0; n < temp.length; n++) {
    human.push(temp[n]);
    for (var o = 0; o < solutions.length; o++) {
      var check2 = true;
      for (var p = 0; p < 3; p++) {
        if (human.indexOf(solutions[o][p]) === -1) {
          check2 = false;
        }
      }
      if (check2 && (human.indexOf(temp[n]) >= 0)) {
        human.pop();
        playComputer(temp[n]);
        return;
      }
    }
    human.pop();
  }
  // else, just pick a move
  var found = false;
  var m = 0;
  while (!found) {
    if (played.indexOf(moves[m]) === -1) {
      playComputer(moves[m]);
      found = true;
    } else {
      m++;
    }
  }
}

function checkPlay(player) {
  var checkPlayer;
  if (player === "human") {
    checkPlayer = human;
  } else {
    checkPlayer = computer;
  }
  for (var i = 0; i < solutions.length; i++) {
    var check = true;
    for (var j = 0; j < 3; j++) {
      if (checkPlayer.indexOf(solutions[i][j]) === -1) {
        check = false;
      }
    }
    if (check && player === "human") {
      $(".message-text").html("You Win! Play Again?");
      active = false;
      return true;
    } else if (check && player === "computer") {
      $(".message-text").html("Computer Wins. Play Again?");
      active = false;
      return true;
    } else if (played.length === 9) {
      $(".message-text").html("Tie Game! Play Again?");
      active = false;
      return true;
    }
  }
  return false;
}

// Front-end logic goes here

$(document).ready(function() {

  $(".new-x").on("click", function() {
    newGame("x", "o");
  });
  $(".new-o").on("click", function() {
    newGame("o", "x");
  });
  $(".square").on("click", function() {
    if (active) {
      playHuman(this.id);
    }
  });

});
