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
  this.numBalls = Math.trunc(Math.random() * 3 * 2 + 1);
};

var cloud1 = new Cloud();

console.log(cloud1.numBalls);
})();
