var _p5, sound;
var client_id = '008bd86a04b2625defc34d368fb72d2d';
var url = 'https://soundcloud.com/brainfeeder/thundercat-oh-sheit-its-x';
//var transforms, randTrans;

var sketch = function(s) {
  var ticks = [];
  var canvas;
  var freq;

  s.preload = function(){
    s.background(0);
    track = s.loadSound(sound.stream_url + '?client_id=' + client_id);
  }

  s.setup = function() {
    canvas = s.createCanvas(s.windowWidth, s.windowHeight);

    amp = new p5.Amplitude(.50);
    fft = new p5.FFT(.9, 256);
    freq = fft.analyze();
    for (var i = 0; i < freq.length; i++){
      ticks.push(0);
    }

    track.loop();
    s.background(0);


    // transforms = [
    //   function(x,y) { s.radians(x,y) },
    //   function(x,y) { s.sin(x,y) },
    //   function(x,y) { s.acos(x,y) }
    // ]

    // randTrans = s.floor(s.random(0,transforms.length-1));
  }
  
  s.draw = function() {
    var level = amp.getLevel();
    freq = fft.analyze();

    s.background(0, 25);
    s.textSize(20);
    s.text(sound.title, 20, s.height - 20);
    s.translate(s.width / 2, s.height / 2);

    var freqLoopNum = freq.length - 90;
    //s.transform(0,0);
    for (var i = 0; i < freqLoopNum; i++){
      ticks[i] += freq[i] / 2000;
      var offset = 10 + i * 3;
      var xPos = offset * s.cos(s.TWO_PI + ticks[i]);
      var yPos = offset * s.sin(s.TWO_PI + ticks[i]);

      s.push();

      var a1 = s.map(level, 0, 1, 0, 255);
      var a2 = s.map(freqLoopNum, 0, 1024, 0, 255);
      var c1 = s.color(32, 219, 231, a1);
      var c2 = s.color(74, 17, 89, a2);
      var l = s.lerpColor(c1, c2, i / freqLoopNum);

      s.fill(l);
      s.noStroke();
      s.translate(xPos, yPos);
      //s.transform(xPos,yPos);
      s.rotate(s.radians(xPos,yPos));
      var h = 1 + i * 4 + freq[i] / 20;
      s.rect(0, 0, freq[i] / 40, h);
      s.pop();
    }
  }

  // s.transform = function(x,y) {
  //   return transforms[randTrans].call(x,y);
  // }
  
  s.windowResized = function() {
    s.background(0);
    canvas.resize(s.windowWidth, s.windowHeight);
  }
  
  s.mousePressed = function() {
    track.isPlaying() ? track.pause() : track.play();
  }
};

SC.initialize({ client_id: client_id });

SC.get('/resolve', { url: url }, function(data){
    sound = data;
    _p5 = new p5(sketch);
});