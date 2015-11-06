var spectrum, amplitude, level, cnv, seed;
var r, g, b;
var soundFile, analyzer, delay;
var colors;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);


  analyzer = new p5.Amplitude();
  analyzer.setInput(mic);
  
  colors = new Array();
  for (var i=0; i<5; i++)
  {
      colors.push(generateColor());
  }
}

function generateColor() {
    return '#' + Math.floor((Math.random() * 0xF00000) + 0x0FFFFF).toString(16);
}

// random color bg expanding ellipse with volume
function draw() {
  for (var i=0; i<colors.length; i++) {
    fill(colors[i]);
    rect(0,(height/5)*i,width,height/5);
  }
}

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}
