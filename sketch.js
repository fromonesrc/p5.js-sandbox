var spectrum, amplitude, level, cnv, seed;
var r, g, b;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);

  // seed value to give variation in color each time
  r = ceil(random(0, 255));
  g = ceil(random(0, 255));
  b = ceil(random(0, 255));
  background(r,g,b);
}

// random color bg expanding ellipse with volume
function draw() {
  var volume = amplitude.getLevel();
  var spectrum = fft.analyze();
  var wavelength = fft.waveform();

  // var r = volume*255;
  // var g = max(spectrum);
  // var b = lerp(10, 250, max(wavelength));
  rand = random(0,255);
  background(color(r,g,b,rand));

  fill(0,0,0);
  ellipse(width/2, height/2, 200+volume*2000, 200+volume*2000);
  fill(50,50,50);
  ellipse(width/2, height/2, 180+volume*1800, 180+volume*2000);
  fill(0,0,0);
  ellipse(width/2, height/2, 140+volume*1400, 140+volume*2000);
  fill(100,100,100);
  ellipse(width/2, height/2, 100+volume*1000, 100+volume*2000);
  fill(200,200,200);
  ellipse(width/2, height/2, 80+volume*800, 80+volume*2000);
  fill(0,0,0);
  ellipse(width/2, height/2, 60+volume*600, 60+volume*2000);
  fill(255,255,255);
  ellipse(width/2, height/2, 40+volume*400, 40+volume*400);
  fill(0,0,0);
  ellipse(width/2, height/2, 20+volume*200, 20+volume*200);
}
