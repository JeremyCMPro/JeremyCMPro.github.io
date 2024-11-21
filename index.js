$(document).ready(function() {

    let hasScrolled = false;

    // wait 2 seconds before showing the profile image
    setTimeout(function() {
        $(document).mousemove(function(e) {
            if (hasScrolled) return;
            let moveX = (e.pageX - $(window).width() / 2) / 50;
            let moveY = (e.pageY - $(window).height() / 2) / 50;
            $('.parallax').css('transform', 'translate(' + moveX + 'px, ' + moveY + 'px)');
            $('.invert-parallax').css('transform', 'translate(' + -moveX + 'px, ' + -moveY + 'px)');
        });
    }, 1200);



    // if scroll position is not at the top, reset the parallax effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            hasScrolled = true;
            $('.parallax').css('transform', 'translate(0px, 0px)');
            $('.invert-parallax').css('transform', 'translate(0px, 0px)');
            $("#profileImg").css('bottom', '0');
        } else {
            $("#profileImg").css('bottom', '-1rem');
            hasScrolled = false;
        }
    });


    // Lines animation

    var ctx = $('#backgroundCanvas').get(0).getContext('2d');
    var canvas = $('#backgroundCanvas').get(0);
    var canvasWidth = $(window).width();
    var canvasHeight = $(window).height();

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

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
