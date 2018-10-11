var oscillator;
var volume;
var s;
var vs;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 100);
    oscillator = new Tone.Oscillator(440, "sine").toMaster().start();

    s = new Slider(50, 50, 0, 100, 0, 250, "Frequency");
    vs = new Slider(50, 150, 0, 100, 0, 250, "Volume");
}

function draw() {
    background(0)
    let freq = map(s.val, 0, 100, 100, 5000);
    oscillator.frequency.value = freq
    s.tick();
    s.draw();

    vs.tick();
    vs.draw();

    volume = vs.val;

    oscillator.volume.value = volume;

    wave(freq, volume);
}

function wave(freq, vol) {
  let lastpoint = {x: 0, y:0};
  for (let i = 0; i < width; i+=1) {
    let x = i;
    let y = sin(i * freq / 10000 + frameCount/10)*vol + 400;
    stroke(map(y, 400-volume, 400+volume, 0, 100), 100, 100)
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
    }

    tick() {
        if (mouseButton && dist(this.x + this.val*this.size/this.max, this.y, mouseX, mouseY) <= 50) {
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
