
var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var WIDTH;
var HEIGHT;
var ctx;
var paddlex;
var paddleh;
var paddlew;
var intervalid;
var rightdown=false;
var leftdown=false;
var success=false;
var canvasMinX;
var canvasMaxX;

var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX;
  }
}


function onKeyDown(evt){
  if(evt.keyCode==37) leftdown=true;
  if(evt.keyCode==39) rightdown=true;
}

function onKeyUp(evt){
  if(evt.keyCode==37) leftdown=false;
  if(evt.keyCode==39) rightdown=false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
$(document).mousemove(onMouseMove);

function init_paddle() {
  paddlex = WIDTH / 2;
  paddleh = 10;
  paddlew = 100;
}

function initbricks() {
  NROWS = 5;
  NCOLS = 5;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
  BRICKHEIGHT = 20;
  PADDING = 1;

  bricks = new Array(NROWS);
    bricks_text = new Array(NROWS);

  for (i=0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    bricks_text[i] = new Array(NCOLS);
    for (j=0; j < NCOLS; j++) {
      bricks[i][j] = 1;
      var rand_friend_id = friends_list[Math.floor(Math.random()*friends_list.length)];

      bricks_text[i][j] = rand_friend_id;

    }
  }
}

function init_mouse() {
  canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
}


function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  init_paddle();
  init_mouse();
  initbricks();
  intervalid= setInterval(draw, 10);
  return intervalid;
}



function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.fillStyle = '#000';

  ctx.closePath();
  ctx.fill();
}

function rect(x,y,w,h,text) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.fillStyle = '#8ED6FF';
  ctx.closePath();
  ctx.fill();
    ctx.fillStyle = "black";
  ctx.font = "12pt sans-serif";
  ctx.fillText(text, x+25, y+15);
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
  
  
function draw(){
  clear();
  circle(x, y, 10);
  if(rightdown ) { 
          if(paddlex+paddlew!=WIDTH) 
         paddlex+=5
       }
  else if(leftdown) {
    if(paddlex!=0)
    paddlex-=5
    }
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh, "");
  
  ///draw bricks
  for (i=0; i < NROWS; i++) {
    for (j=0; j < NCOLS; j++) {
      if (bricks[i][j] != 0) {
        rect((j * (BRICKWIDTH + PADDING)) + PADDING, 
             (i * (BRICKHEIGHT + PADDING)) + PADDING,
             BRICKWIDTH, BRICKHEIGHT,bricks_text[i][j]);
      }
    }
  }
    //have we hit a brick?
  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  //if so, reverse the ball and mark the brick as broken
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    dy = -dy;
    bricks[row][col] = 0;
  }
  
  
  if (x + dx+10 > WIDTH || x + dx-10 < 0)
    dx = -dx;

  if (y + dy -10< 0)
    dy = -dy;
  else if (y + dy > HEIGHT) {
    if (x > paddlex && x < paddlex + paddlew)
      dy = -dy;
    else
      //game over, so stop the animation

      clearInterval(intervalid);
  }
 
  x += dx;
  y += dy;
  }
  