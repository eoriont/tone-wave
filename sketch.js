var oscillator;
var volume;
var s;
var vs;
var offset;
var osc_on = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 100);
    oscillator = new Tone.Oscillator(440, "sine").toDestination();
    oscillator.partials = new Array(8).fill(0).map(() => Math.random());

    s = new Slider(50, 50, 0, 100, 0, 1000, "Frequency");
    vs = new Slider(50, 150, 0, 500, 0, 1000, "Volume");

    offset = height/2
}

function draw() {
    background(0)
    let freq = map(s.val, 0, 100, 1, 1000);
    oscillator.frequency.value = freq
    s.tick();
    s.draw();

    vs.tick();
    vs.draw();

    text("Press the spacebar to toggle audio.",20,height*7/8)
    text("Warning: Increasing frequency gets loud, quick!",20,height*7/8+30)

    volume = vs.val;

    oscillator.volume.value = map(vs.val, 0, 500, 0, 20);

    wave(freq, volume);
}

function wave(freq, vol) {
  let lastpoint = {x: 0, y:0};
  for (let i = 0; i < width; i+=1) {
    let x = i;
    let y = sin(i * freq / 10000 + frameCount/10)*vol + offset;
    if (i == 0) {
      lastpoint = {x, y};
    }
    stroke(map(y, offset-volume, offset+volume, 0, 100), 100, 100)
    line(lastpoint.x, lastpoint.y, i, y);
    lastpoint = {x, y};
  }
}

class Slider {
    constructor(x, y, min, max, val, size, text) {
        this.x = x;
        this.y = y;
        this.min = min;
        this.max = max;
        this.val = val || min;
        this.size = size || max;
        this.text = text || "";
        this.clicked = false;
    }

    tick() {
        if (mouseIsPressed && dist(this.x + this.val*this.size/this.max, this.y, mouseX, mouseY) <= 50) {
          this.clicked = true;
        } else if (!mouseIsPressed) {
          this.clicked = false;
        }
        if (this.clicked) {
            this.val = map(mouseX, this.x, this.x+this.size, this.min, this.max);
            this.val = constrain(this.val, this.min, this.max);
        }
    }

    draw() {
        stroke(200);
        line(this.x, this.y, this.x+this.size, this.y);
        fill("red");
        ellipse(this.x+this.val*this.size/this.max, this.y, 50, 50);

        textSize(32);
        fill("white")
        text(this.text, this.x + this.size/4, this.y)
    }
}

function keyPressed() {
  if (key == " ") {
    osc_on = !osc_on
    if (osc_on) {
      oscillator.start()
    } else {
      oscillator.stop()
    }
  }
}
