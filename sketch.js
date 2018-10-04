var oscillator;
var s;

function setup() {
    createCanvas(500, 500);
    oscillator = new Tone.Oscillator(440, "sine").toMaster().start();
    oscillator.volume.value = -25;
    s = new Slider(50, 50, 0, 100, 0, 250);
}

function draw() {
    background(50)
    let freq = map(s.val, 0, 100, 100, 5000);
    oscillator.frequency.value = freq
    s.tick();
    s.draw();

    line(0, 0, cos(frameCount/freq)*500, sin(frameCount/freq)*500)
}

class Slider {
    constructor(x, y, min, max, val, size) {
        this.x = x;
        this.y = y;
        this.min = min;
        this.max = max;
        this.val = val || min;
        this.size = size || max;
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
    }
}