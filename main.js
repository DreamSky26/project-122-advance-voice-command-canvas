
x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
heart = "";
speak_data = "";
to_number = "";

draw_heart = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening, please speak..";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
    to_number = Number(content);
    console.log(to_number);
    if(Number.isInteger(to_number)){
      document.getElementById("status").innerHTML = "Started Drawing Heart"; 
      draw_heart = "set";
    }
    else{
        document.getElementById("status").innerHTML = "The speech did not recognize what to draw."; 
    }
}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width,screen_height-150);
  //canvas.position(0,150);
}

function draw() {
  if(draw_heart == "set"){
    document.getElementById("status").innerHTML = to_number + " Hearts drawn";
    draw_heart = "";
    speak_data = to_number + "Hearts Drawn";
    speak();
    for(var i = 1; i <= to_number; i++){
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(heart , x, y, 50, 50);
    }
  }
}
function speak(){
  var synth = window.speechSynthesis;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  speak_data = "";
}
function preload(){
  heart = loadImage("heart.png");
}