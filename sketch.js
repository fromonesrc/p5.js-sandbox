var spectrum, amplitude, level, cnv, seed;
var r, g, b;
var soundFile, analyzer, delay;
var colors;
var tracks = [
    'beatz.mp3',
    'demo-riff.mp3'
]

function preload() {
  track = tracks[floor(random(0, tracks.length))];
  loadTrack = loadSound(track);
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);

  mic = new p5.AudioIn();
  mic.start();
  mic.amp(10);

  analyzer = new p5.Amplitude();
  //analyzer.setInput(loadTrack);
  analyzer.setInput(mic);
  
  fft = new p5.FFT();
  //fft.setInput(loadTrack);
  fft.setInput(mic);
  
  //loadTrack.loop();
  //loadTrack.amp(20);
  
  colors = new Array();
  for (var i=0; i<5; i++)
  {
      colors.push(generateColor());
  }
}

function generateColor() {
    return '#' + Math.floor((Math.random() * 0xF00000) + 0x0FFFFF).toString(16);
}

function draw() {
  var volume = analyzer.getLevel();
  for (var i=0; i<colors.length; i++) {
    fill(colors[i]);
    rect(0,(height/5)*i,width,volume*100);
  }
}

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}
