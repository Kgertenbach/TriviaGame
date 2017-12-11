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
  question: "Who won the Stanley Cup in 2016?",
  answers: ["Pittsburgh Penguins", "Chicago Blackhawks", "Nashville Predators", "Anaheim Ducks"],
  correctAnswer: "Pittsburgh Penguins",
  image:"assets/images/sports/stanleyCup.gif",
  wrongImage:"assets/images/sports/stanleyCupWrong.gif"
}, {
  question: "Who is the all time leader in points in the NBA",
  answers: ["Michael Jordan", "Wilt Chamberlain", "Kobe Bryant", "Kareem Abdul Jabbar"],
  correctAnswer: "Kareem Abdul Jabbar",
  image:"assets/images/sports/pointsNBA.gif",
  wrongImage:"assets/images/sports/pointsNBAWrong.gif"
}, {
  question: "Which country holds the most gold medals in gymnastics?",
  answers: ["United States", "Soviet Union", "China", "Romania"],
  correctAnswer: "Soviet Union",
  image:"assets/images/sports/gymnastics.gif",
  wrongImage:"assets/images/sports/gymnasticsWrong.gif"
}, {
  question: "As of 2017 how many PGA Tours has Tiger Woods won?",
  answers: [ "Seventy Nine", "Seventy Three", "Eighty Four", "Eighty One"],
  correctAnswer: "Seventy Nine",
  image:"assets/images/sports/tigerWoods.gif",
  wrongImage:"assets/images/sports/tigerWoodsWrong.gif"
}, {
  question: "What is a play with a score of one stroke under par in golf",
  answers: ["Ace", "Lag", "Chunk", "Birdie"],
  correctAnswer: "Birdie",
  image:"assets/images/sports/golf.gif",
  wrongImage:"assets/images/sports/golfWrong.gif"
}, {
  question: "At what age did Olympic swimmer, Michael Phelps, retire from swimming?",
  answers: [ "Twenty Nine", "Twenty Five", "Twenty Seven", "Thirty One"],
  correctAnswer: "Twenty Seven",
  image:"assets/images/sports/michaelPhelps.gif",
  wrongImage:"assets/images/sports/michaelPhelpsWrong.gif"
}, {
  question: "How many players from each team can be on the football field at one time?",
  answers: ["Eleven", "Fifty Three", "Forty Five", "Forty One"],
  correctAnswer: "Eleven",
  image:"assets/images/sports/football.gif",
  wrongImage:"assets/images/sports/footballWrong.gif"
}, {
  question: "Who won Wimbledon's women's doubles Grand Slam?",
  answers: ["Anna-Lena Friedsam and Christina McHale", "Svetlana Kuznetsova and Irina Camelia Begu", "Venus Williams and Serena Williams", "Madison Brengie and Kiki Bertens"],
  correctAnswer: "Venus Williams and Serena Williams",
  image:"assets/images/sports/tennis.gif",
  wrongImage:"assets/images/sports/tennisWrong.gif",
}, {
  question: "Where did basketball first get played?",
  answers: ["Lawrence, Kansas", "Springfield, Massachusetts", "Springfield, Missouri", "Springfield, Iowa"],
  correctAnswer: "Springfield, Missouri",
  image:"assets/images/sports/basketball.gif",
  wrongImage:"assets/images/sports/basketballWrong.gif"
}, {
  question: "Who won Super Bowl 50?",
  answers: ["Denver Broncos", "Carolina Panthers", "Seattle Seahawks", "Baltimore Ravens"],
  correctAnswer: "Denver Broncos",
  image:"assets/images/sports/superBowl.gif",
  wrongImage:"assets/images/sports/superBowlWrong.gif"
}];

// Timer

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

    panel.html('<h2>Ohhh Out of Time!</h2>');
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

    panel.html('<h2>You have completed the Sports Category, here are your results!</h2>');
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
    panel.html('<h2>Wrong!</h2>');
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