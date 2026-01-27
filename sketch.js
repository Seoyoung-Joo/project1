let cnv;
let imgs =[];
let grid = [];
let currentCols;
let currentRows;
let colsSlider;
let rowsSlider;
let rSlider, gSlider, bSlider;
let label;
let bgRSlider, bgGSlider, bgBSlider;

//let font;


let isGrainMode = false;
// let grainSlider;


let pose1
let pose2
let pose3
let pose4

let grainpose1
let grainpose2
let grainpose3
let grainpose4


function preload(){
  imgs[0] = loadImage('001.png')
  imgs[1] = loadImage('002.png')
  imgs[2] = loadImage('003.png')
  imgs[3] = loadImage('004.png')
  
  imgs[4] = loadImage('torn001.png')
  imgs[5] = loadImage('torn002.png')
  imgs[6] = loadImage('torn003.png')
  imgs[7] = loadImage('torn004.png')

}


function setup() {
  
  // need to not make an error/ keep   keyboard focus on canvas
  cnv = createCanvas(900, 900);
  cnv.elt.setAttribute("tabindex", "0");
  cnv.elt.focus();
  cnv.mousePressed(() => cnv.elt.focus());
//

  label = createP("Press G to toggle grain mode");
  label.position(width + 20, 210);
  label.style("font-family", "cubefont");

  
  colsSlider = createSlider(5, 20, 7, 1);
  rowsSlider = createSlider(5, 20, 8, 1);

  // Position them under the canvas
  colsSlider.position(width+ 20, 10);
  rowsSlider.position(width+ 20, 40);

  colsSlider.style("width", "200px");
  rowsSlider.style("width", "200px");
  
  
  currentCols = colsSlider.value();
  currentRows = rowsSlider.value();
  
  for (let i =0; i<currentRows; i++){
    grid[i] =[];
    for (let j =0; j<currentCols; j++){
      grid[i][j] = 0;
    }
  }
  
  bgRSlider = createSlider(0, 255, 255, 1);
bgGSlider = createSlider(0, 255, 255, 1);
bgBSlider = createSlider(0, 255, 255, 1);

bgRSlider.position(width + 20, 160);
bgGSlider.position(width + 20, 180);
bgBSlider.position(width + 20, 200);

bgRSlider.style("width", "200px");
bgGSlider.style("width", "200px");
bgBSlider.style("width", "200px");
  
  
  
rSlider = createSlider(0, 255, 220, 1);
gSlider = createSlider(0, 255, 100, 1);
bSlider = createSlider(0, 255, 250, 1);

rSlider.position(width+ 20, 80);
gSlider.position(width+ 20, 100);
bSlider.position(width+ 20, 120);

rSlider.style("width", "200px");
gSlider.style("width", "200px");
bSlider.style("width", "200px");

rSlider.hide();
gSlider.hide();
bSlider.hide(); 

  for (let k = 0; k < imgs.length; k++) {
  imgs[k].resize(width, height);
 }
} 

function draw() {
  background(bgRSlider.value(), bgGSlider.value(), bgBSlider.value());
  
  
  let newCols = colsSlider.value();
  let newRows = rowsSlider.value();

  let cellW = width / newCols
  let cellH = height / newRows
  
  if (newCols !== currentCols || newRows !== currentRows) {
  let oldGrid = grid;
  let oldRows = currentRows;
  let oldCols = currentCols;

  currentCols = newCols;
  currentRows = newRows;

  grid = [];
  for (let i = 0; i < currentRows; i++) {
    grid[i] = [];
    for (let j = 0; j < currentCols; j++) {

      // layered
      if (i < oldRows && j < oldCols) {
        grid[i][j] = oldGrid[i][j];
      } 
      // start from pose1
      else {
        grid[i][j] = 0;
      }

    }
  }
}

 
  noFill();
  stroke(0);
  strokeWeight(1);
  
  if (isGrainMode) tint(rSlider.value(), gSlider.value(), bSlider.value());
else noTint();


  for (let i =0; i<newRows; i++){
    for (let j =0; j<newCols; j++){ 
 let idx = grid[i][j];if (isGrainMode) idx += 4;
      let img = imgs[idx];
      let srcW = img.width / newCols;
      let srcH = img.height / newRows;
      let sx = j * srcW;
      let sy = i * srcH;
      image(img, j*cellW, i*cellH, cellW, cellH, sx, sy, srcW, srcH);
   rect (j*cellW,i*cellH,cellW,cellH)
    }
  }
  
  
}

function mousePressed() {
  
let newCols = colsSlider.value();
let newRows = rowsSlider.value();
  
let cellW = width / newCols;
let cellH = height / newRows;

  let j = floor(mouseX / cellW);
  let i = floor(mouseY / cellH);

  if (i < 0 || i >= newRows || j < 0 || j >= newCols) return;

  grid[i][j] = (grid[i][j] + 1) % 4
}

function keyPressed() {
  
  

  if (key === 'g' || key === 'G') {
    isGrainMode = !isGrainMode;
    
    
    
  if (isGrainMode) {
  rSlider.show(); gSlider.show(); bSlider.show();
} else {
  rSlider.hide(); gSlider.hide(); bSlider.hide();
   }    
 }
  
  if (key === 'p' || key === 'P') {
  saveCanvas('remappingbody', 'png');
}

}