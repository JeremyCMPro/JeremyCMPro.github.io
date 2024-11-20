$(document).ready(function() {
    $('#switchButton').click(function(){
        $(this).find("#circleButton").toggleClass('light');
        $("body").toggleClass("light-mode")
    });

    $('.navbar-link').click(function() {
        $('.navbar-link').removeClass('active');
        $(this).addClass('active');
    });

    $(document).mousemove(function(e) {
        let moveX = (e.pageX - $(window).width() / 2) / 50;
        let moveY = (e.pageY - $(window).height() / 2) / 50;
        $('.parallax').css('transform', 'translate(' + moveX + 'px, ' + moveY + 'px)');
        $('.invert-parallax').css('transform', 'translate(' + -moveX + 'px, ' + -moveY + 'px)');
    });

    var ctx = $('#backgroundCanvas').get(0).getContext('2d');
    var canvas = $('#backgroundCanvas').get(0);
    var canvasWidth = $(window).width();
    var canvasHeight = $(window).height();

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // create curved lines that moves randomly
    var lines = [];
    var lineWidth = 2;
    var lineColor = 'rgba(255, 255, 255, 1)';

    for (var i = 0; i < 10; i++) {
        lines.push(new Line(Math.random() * canvasWidth, 0, 100, 1.13198391831, Math.random() * 2 + 1));
    }

    function Line(x, y, length, angle, speed) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.angle = angle;
        this.speed = speed; // vitesse aléatoire
    }

    Line.prototype.update = function() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight) {
            this.x = Math.random() * canvasWidth;
            this.y = 0;
            this.angle = 1.13198391831;
            this.speed = Math.random() * 2 + 1; // nouvelle vitesse aléatoire
        }
    }

    Line.prototype.draw = function() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }

    function draw() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        for (var i = 0; i < lines.length; i++) {
            lines[i].update();
            lines[i].draw();
        }

        requestAnimationFrame(draw);
    }

    draw();
});
