
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
    var vxPos= 3;
    var vyPos = 3;
    var player2Xpos = 890;
    var player2YPos = 300;
    var player1XPos =0;
    var player1YPos =200;
    document.addEventListener('mousemove', playerMove);
    player1.src ="img/timon.png";
    player2.src ="img/pumba.png";
    hookah.src = "img/hookah.png";
    ball.src = "img/ball.png";
    pipes.src = "img/pipe.png";
    bg.src = "img/bg.jpg";
// Отрисовка игры

    function draw() {
        ballMove();
        aiMove();
        wall();
    context.drawImage(bg, 0, 0);
    context.drawImage(hookah, 0, 50);
    context.drawImage(ball,  xPos, yPos);
    context.drawImage(player1, player1XPos, player1YPos );
    context.drawImage(player2, player2Xpos, player2YPos);
    // отображение разделителя поля
    for (var i = 10; i < play.height; i += 45) {
        context.fillStyle = "#ccc";
        context.fillRect(play.width / 2 - 10, i, 20, 30);
    }
    }
// движение мяча
    function ballMove() {
        xPos += vxPos;
        yPos += vyPos;
        requestAnimationFrame(draw);

    }
// Обработка пересечения с полями
    function wall() {
    if (xPos + ball.width <= play.width && yPos + ball.height+vyPos < play.height &&   xPos >= 0 && yPos + vyPos > 0 ) { //alert(xPos + "," + yPos + "," + vxPos + "," + vyPos + "," + ",№1");
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
        vxPos =  - vxPos;
        vyPos =    vyPos;
    } else {
        vxPos =    vxPos;
        vyPos =  - vyPos;
    }
    if ((player1XPos + player1.width > xPos && player1XPos < xPos +ball.width && player1YPos +player1.height > yPos && player1YPos < yPos + ball.height && vxPos<0) ||
    player2Xpos + player2.width > xPos && player2Xpos < xPos + ball.width && player2YPos + player2.height > yPos && player2YPos < yPos + ball.height && vxPos>0) {
        vxPos =  - vxPos;
    }
    /*if ((collision(player1, ball) && vxPos<0) || (collision(player2, ball) && vxPos>0)){
        vxPos =  - vxPos;
    }*/
    }

//движение "ИИ"
    function aiMove() {
        var y;
        var vY;
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
                vY = 7;
                break;
            case 0:
                vY = 0;
                break;
        }

        if (yPos < player2YPos + player2.height / 2) {
            y = player2YPos - vY;
        }
        if (yPos > player2YPos + player2.height / 2) {
            y = player2YPos + vY;
        }
        if (10 < y && y < play.height - player2.height - 5) {
            player2YPos = y;
        }
    }

//движение игрока
    function playerMove(e) {

        var y = e.pageY;
        // условие проверяет не выходит ли ракетка за пределы поля
        if (player1.height / 2 + 10 < y && y < play.height - player1.height / 2 - 10) {
            // привязываем положение мыши к середине ракетки
            player1YPos = y - player1.height / 2;
        }

    }

//ожидание загрузки последней картинки
bg.onload = draw;



