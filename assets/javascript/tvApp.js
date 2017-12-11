var panel = $('#quiz-area');
var countStartNumber = 30;

// On click to begin quiz

$(document).on('click', '#start-over', function(gamePlay) {
  game.reset();
});
// Button to answer to questions
$(document).on('click', '.answer-button', function(gamePlay) {
  game.clicked(gamePlay);
});
// To change between questions
$(document).on('click', '#start', function(gamePlay) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

// Television Question Array
var questions = [{
  question: "Who is Bob and Linda Belcher's eldest child?",
  answers: ["Gene", "Louise", "Tina", "Teddy"],
  correctAnswer: "Tina",
  image:"assets/images/television/bobsBurgers.gif",
  wrongImage:"assets/images/television/bobsBurgerWrong.gif"
}, {
  question: "What is the name of the three eyed fish by the power plant in The Simpsons?",
  answers: ["Blinky", "Itchy", "Santa's Little Helper", "Snowball"],
  correctAnswer: "Blinky",
  image:"assets/images/television/theSimpsons.gif",
  wrongImage:"assets/images/television/theSimpsonsWrong.gif"
}, {
  question: "Who is Daenery's most valuable alliance in Game of Thrones?",
  answers: ["Dothraki and Unsullied Soldiers", "Jon Snow and Tyrion", "Daario Naharis and Jorah Mormont", "Drogon and Rhaegal"],
  correctAnswer: "Drogon and Rhaegal",
  image:"assets/images/television/gOT.gif",
  wrongImage:"assets/images/television/gOTWrong.gif"
}, {
  question: "Who was the final boss in The Office?",
  answers: ["Deangelo", "Michael", "Andy", "Dwight"],
  correctAnswer: "Andy",
  image:"assets/images/television/theOffice.gif",
  wrongImage:"assets/images/television/theOfficeWrong.gif"
}, {
  question: " Who enlisted the aid of Hector and Armistice to help them escape from Westworld?",
  answers: ["Angela", "Maeve", "Dolores", "Bernard"],
  correctAnswer: "Maeve",
  image:"assets/images/television/westworld.gif",
  wrongImage:"assets/images/television/westworldWrong.gif"
}, {
  question: "Which villian in Doctor Who only moves if there is nobody looking at them?",
  answers: ["Zygon", "Silence", "Weeping Angels", "Dalek"],
  correctAnswer: "Weeping Angels",
  image:"assets/images/television/doctorWho.gif",
  wrongImage:"assets/images/television/doctorWhoWrong.gif"
}, {
  question: "In Arrested Development who is George Micheal Jr's girlfriend?",
  answers: ["Rita", "Sally", "Ann", "Maeby"],
  correctAnswer: "Ann",
  image:"assets/images/television/arrestedDevelopment.gif",
  wrongImage:"assets/images/television/arrestedDevelopmentWrong.gif"
}, {
  question: "What is the name of Sailor Moon's cat from episiode one?",
  answers: ["Artemis", "Diana", "Usagi", "Luna"],
  correctAnswer: "Luna",
  image:"assets/images/television/sailorMoon.gif",
  wrongImage:"assets/images/television/sailorMoonWrong.gif",

}, {
  question: "In New Girl what is Schmidt's first name?",
  answers: ["Winston", "Tagg/Tugg", "Max", "Schmidt"],
  correctAnswer: "Winston",
  image:"assets/images/television/newGirl.gif",
  wrongImage:"assets/images/television/newGirlWrong.gif"
}, {
  question: "Who is Kimmy Schmidt's first roommate in New York?",
  answers: ["Lillian", "Titus", "Jacqueline", "Cyndee"],
  correctAnswer: "Titus",
  image:"assets/images/television/unbreakable.gif",
  wrongImage:"assets/images/television/unbreakableWrong.gif"
}];

// Timer

var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  // Question to apppear on dom
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  // Transition to next question
  // For answered Questions
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  // For timing out
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].wrongImage + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  // Final Screen
  results: function() {
    clearInterval(timer);

    panel.html('<h2>You have completed the Television Category, here are your results!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(gamePlay) {
    clearInterval(timer);

    if ($(gamePlay.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  // Incorrect Screen
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Bummer!</h2>');
    panel.append('<h3>The correct answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].wrongImage + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  // Correct Answers
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h3>Correct!</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};