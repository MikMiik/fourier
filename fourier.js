const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let slider;

function setup() {
  let ctx = createCanvas(1120, screen.height);
  slider = createSlider(1, 10, 3, 1);
  slider.class('ctx-slider')
  let container = select('.container'); 
  slider.parent(container);
}

let wave = [];

function draw() {
  background(255)
  translate(300, height/2)
  scale(1, -1)
  
  let x = 0;
  let y = 0;
  let theta = frameCount * 0.04;
  for (let i = 0; i < slider.value(); i++) {
    let n = 2*i + 1;
    let radius = 100*(4/(n*PI));

    push()
      stroke(0, 100)
      strokeWeight(2)
      noFill()
      ellipse(x, y , radius*2)
    pop()
    
    let preX = x;
    let preY = y;
    x += radius*cos(n*theta)
    y += radius*sin(n*theta)
  
    push()
    stroke(0)
    fill(255);
    line(preX, preY, x, y)
    pop()
  }
  wave.unshift(y)
  beginShape()
    noFill()
    wave.forEach((pointY, index) => {
      stroke(157, 80, 255)
      vertex(index + 200, pointY)
    })
    if (wave.length > 1000) {
      wave.pop()
    }
  endShape()


  strokeWeight(3)
  line(200, 150, 200, -150)
  stroke(255, 0, 255)
  strokeWeight(2)
  line(x, y, 200, wave[0])
  fill(255, 0, 255)
  triangle(200, wave[0], 190, wave[0] + 5, 190, wave[0] - 5)
  
}