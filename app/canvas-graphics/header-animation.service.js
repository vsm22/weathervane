'use strict';

angular.module('headerAnimation').service('headerAnimationService', [function headerAnimationService() {

  this.applyHeaderAnimation = function applyHeaderAnimation() {
    var canvas = document.getElementById('header-bg');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    var ctx = canvas.getContext('2d');

    var bgGradient = ctx.createLinearGradient(0, canvas.height / 2, canvas.width / 2, canvas.height / 2);
    bgGradient.addColorStop(0, '#61aabb');
    bgGradient.addColorStop(1, '#ddeeff');

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var Cloud = function Cloud(o) {
      var _this = this;

      o = o || {};

      this.cX = o.cX || 0;
      this.cY = o.cY || 0;
      this.xIncrement = 0.1 + Math.random() * 0.5;

      this.cloudLength = Math.trunc(Math.random() * 100);
      this.numBalls = Math.trunc(Math.random() * 10) + 5;
      this.balls = [];

      this.balls[0] = {};
      this.balls[0].cXoffset = Math.trunc(0 - this.cloudLength / 2);
      this.balls[0].cYoffset = Math.trunc(Math.random() * 20);
      this.balls[0].r = Math.trunc(Math.random() * (this.cloudLength / this.numBalls)) + 10;

      for (var i = 1; i < this.numBalls; i++) {
        this.balls[i] = {};
        this.balls[i].cXoffset = this.balls[i - 1].cXoffset + Math.trunc(Math.random() * 10);
        this.balls[i].cYoffset = Math.trunc(Math.random() * 20);
        this.balls[i].r = Math.trunc(Math.random() * 15) + 5;
      }
    };
    Cloud.prototype.drawCloud = function () {
      var _this = this;

      for (var i = 0; i < this.numBalls; i++) {
        ctx.beginPath();
        ctx.arc(_this.balls[i].cXoffset + _this.cX, _this.balls[i].cYoffset + _this.cY, _this.balls[i].r, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
    };

    var clouds = [];

    function createMoreClouds(numClouds) {
      for (var i = 0; i < numClouds; i++) {
        var newCloud = new Cloud({
          cX: 0,
          cY: Math.trunc(Math.random() * canvas.height)
        });
        clouds.push(newCloud);
      }
    }

    // --- Animate -------------------------------------
    var prevTime = performance.now();

    function animate(curTime) {
      if (curTime - prevTime > 10) {
        prevTime = curTime;

        if (Math.random() > 0.995) {
          createMoreClouds(Math.ceil(Math.random() * 2));
        }

        // draw the background
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        clouds.forEach(function (cloud, cloudIndex) {
          cloud.cX = cloud.cX + cloud.xIncrement;
          cloud.drawCloud();

          if (cloud.cX > canvas.width) {
            clouds.splice(cloudIndex, 1);
          }
        });
      }
      requestAnimationFrame(animate);
    }

    createMoreClouds(10);
    animate();
  };
}]);