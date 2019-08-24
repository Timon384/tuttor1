
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
    var xplayer2 = 890;
    var yplayer2 = 300;
    var player1YPos =200;
    document.addEventListener('mousemove', playerMove);
    /*play.onmousemove = playerMove;
    play.onclick = startGame;*/

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
    context.drawImage(player1, 30, player1YPos );
    context.drawImage(player2, xplayer2, yplayer2);
    // отображение разделителя поля
    for (var i = 10; i < play.height; i += 45) {
        context.fillStyle = "#ccc";
        context.fillRect(play.width / 2 - 10, i, 20, 30);
    }
    ballMove();



    }
// движение мяча
    function ballMove() {
        aiMove()

    wall();
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

        if (yPos < yplayer2 + player2.height / 2) {
            y = yplayer2 - vY-2; // alert("y=" + y + ", yplayer2=" + yplayer2 + ", player2.height=" + player2.height +", vY=" + vY + ", yPos=" +yPos);
        }
        if (yPos > yplayer2 + player2.height / 2) {
            y = yplayer2 + vY+2;
        }
        if (10 < y && y < play.height - player2.height - 5) {
            yplayer2 = y;
        }
    }

//движение игрока

    function playerMove(e) {

        var y = e.pageY;
        // условие проверяет не выходит ли ракетка за пределы поля
        if (player1.height / 2 + 10 < y && y < play.height - player1.height / 2 - 10) {
            // привязываем положение мыши к середине ракетки
            player1YPos = y - player1.height / 2;
            console.log(play.height)
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



