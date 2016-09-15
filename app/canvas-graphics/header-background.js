(function(){

const canvas = document.getElementById('header-bg');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

var bgGradient = ctx.createLinearGradient(0, canvas.height/2, canvas.width/2, canvas.height/2);
bgGradient.addColorStop(0, '#61aabb');
bgGradient.addColorStop(1, '#ddeeff');

ctx.fillStyle = bgGradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

var Cloud = function (o) {
  var _this = this;

  o = o || {};

  this.cX = o.cX || 0;
  this.cY = o.cY || 0;
  this.cloudLength = Math.trunc(Math.random() * 100);
  this.numBalls = Math.trunc(Math.random() * 3 * 2 + 3);
  this.balls = [];

  for(let i = 0; i < this.numBalls; i++) {
    var newBall = {};

    newBall.cXoffset = Math.trunc(Math.random() * this.cloudLength);
    newBall.cYoffset = Math.trunc(Math.random() * 20);
    newBall.r = Math.trunc(Math.random() * (this.cloudLength/this.numBalls));

    this.balls.push(newBall);
  }
};
Cloud.prototype.drawCloud = function () {
  var _this = this;

  for(let i = 0; i < _this.numBalls; i++) {
    ctx.arc(_this.balls[i].cXoffset + _this.cX, _this.balls[i].cYoffset + _this.cY, _this.balls[i].r, 0, 2*Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }
}

function animate (prevTime) {

  if((Date.now() - prevTime) > 6000) {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    cloud1.cX = cloud1.cX + 1;
    cloud1.drawCloud();
  }

  requestAnimationFrame(animate);
}

var cloud1 = new Cloud({
  cX: 60,
  cY: 50
});

animate(Date.now());
})();
