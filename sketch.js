var spectrum, amplitude, level, cnv, seed;
var r, g, b;
var song;

var debug = false;

function preload() {
    song = loadSound('beatz.mp3');
    //song = loadSound('demo-riff.mp3');
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);


  fft = new p5.FFT();
  fft.setInput(song);

  amplitude = new p5.Amplitude();
  amplitude.setInput(song);
  song.loop();
  // seed value to give variation in color each time
  r = floor(random(0, 255));
  g = floor(random(0, 255));
  b = floor(random(0, 255));
  background(r,g,b);
  
  colors = [
    [
      color(77,124,149),
      color(91,198,255),
      color(139,195,225),
      color(149,88,9),
      color(225,130,9)
    ],
    [
     color(255,83,13),
     color(232,44,12),
     color(255,0,0),
     color(232,12,122),
     color(255,13,255)
    ],
    [
     color(86,192,212),
     color(90,222,208),
     color(91,199,157),
     color(90,222,133),
     color(86,212,92)
    ],
    [
     color(136,212,67),
     color(70,215,222),
     color(122,73,199),
     color(222,89,70),
     color(212,188,107)
    ]
  ]
  
  pallateCount = colors.length-1;
  chosenColors = shuffle(colors[floor(random(0,3))]);
}

// random color bg expanding ellipse with volume
function draw() {
  var volume = amplitude.getLevel();
  var spectrum = fft.analyze();
  var wavelength = fft.waveform();

  // var r = volume*255;
  // var g = max(spectrum);
  // var b = lerp(10, 250, max(wavelength));
  background(color(r,g,b));
  
  var startSize = 200;
  for (var i=0; i < chosenColors.length; i++) {
    fill(chosenColors[i]);
    
    size = (startSize+(volume*100));
    
    ellipse(width/2, height/2, size, size);
    startSize = startSize-40;
    
    if (debug == true) {
      fill(0);
      text(volume, 100, 100);
    }
    
  }
  
}

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}