
    var play = document.getElementById("play");
    var context = play.getContext('2d');
    var player1 = new Image();
    var player2 = new Image();
    var hookah = new Image();
    var ball = new Image();
    var bg = new Image();
    var pipes = new Image();
    var xPos=400;
    var yPos=230;
    var vxPos= 9;
    var vyPos = 9;

    player1.src ="img/timon.png";
    player2.src ="img/pumba.png";
    hookah.src = "img/hookah.png";
    ball.src = "img/ball.png";
    pipes.src = "img/pipe.png";
    bg.src = "img/bg.jpg";
// Отрисовка игры
function draw() {
    context.drawImage(bg, 0, 0);
    context.drawImage(ball,  xPos, yPos);
    context.drawImage(hookah, 0, 50);
    context.drawImage(player1, 100, 230);
    context.drawImage(player2, 800, 230);
    // отображение разделителя поля
    for (var i = 10; i < play.height; i += 45) {
        context.fillStyle = "#ccc";
        context.fillRect(play.width / 2 - 10, i, 20, 30);
    }
    ballMove();

}
// движение мяча
    function ballMove() {
    wall();
        xPos += vxPos;
        yPos += vyPos;
        requestAnimationFrame(draw);

    }
// Обработка пересечения с полями
function wall() {
    if (xPos + ball.width <= play.width && yPos + ball.height+vyPos < play.height &&   xPos >= 0 && yPos + vyPos > 0 ) {
        vxPos =    vxPos;
        vyPos =    vyPos;
        // строка для отладки alert(xPos + "," + yPos + "," + vxPos + "," + vyPos + "," + play.width + "," + play.height + ",№1");
    } else if ( xPos + ball.width >= play.width && vxPos > 0 ) {
        vxPos =  - vxPos;
        vyPos =    vyPos;
    } else if (xPos <= 0 && vyPos < 0 && vxPos < 0 ){
        vxPos =  - vxPos;
        vyPos =    vyPos;
    } else if (xPos <= 0 && vyPos > 0 && vxPos < 0 ){
        vxPos =   - vxPos;
        vyPos =     vyPos;
    } else {
        vxPos =     vxPos;
        vyPos =   - vyPos;
    }

}
//движение "ИИ"
    function aiMove() {
        var y;
        // делаем скорость оппонента зависимой от скорости шарика
        switch (vyPos) {
            case 2:
                vY = 2;
                break;
            case 3:
                vY = 3;
                break;
            case 4:
                vY = 4;
                break;
            case 5:
                vY = 5;
                break;
            case 6:
                vY = 5;
                break;
            case 7:
                vY = 6;
                break;
            case 8:
                vY = 6;
                break;
            case 9:
                vY = 6;
                break;
            case 0:
                vY = 0;
                break;
        }

        if (yPos < player2.y + player2.height / 2) {
            y = player2.y - vY;
        }
        if (ball.y > ai.y + ai.height / 2) {
            y = ai.y + vY;
        }
        if (10 < y && y < game.height - ai.height - 10) {
            ai.y = y;
        }
    }



//ожидание загрузки последней картинки
bg.onload = draw;


/*function startGame() {
      if (!start) {
            ball.vX = -2;
            ball.vY = 2;
            start = true;
      }
    }*/



