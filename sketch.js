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

function draw() {
  var volume = amplitude.getLevel();
  var spectrum = fft.analyze();
  var wavelength = fft.waveform();

  // var r = volume*255;
  // var g = max(spectrum);
  // var b = lerp(10, 250, max(wavelength));
  rand = random(0,255);
  background(color(r,g,b,rand));
  // fill(0);
  // textSize(20);
  // text("volume: " + volume, 20, 80);
  // text("spectrum: " + max(spectrum), 20, 120);
  // text("wavelength: " + (max(wavelength)), 20, 160);
  // text("rand: " + ceil(rand), 20, 180);

  // _r = r;
  // _g = g;
  // _b = b;
  // r = _g;
  // g = _b;
  // b = _r;
  // fill(r,g,b,seed);

  // strokeWeight(10);
  // stroke(0,0,0,255);

  // // Draw an ellipse with size based on volume
  // ellipse(width/2, height/2, 400+volume*4000, 400+volume*4000);
  // ellipse(width/2, height/2, 200+volume*2000, 200+volume*2000);
}
