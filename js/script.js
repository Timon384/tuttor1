
    var play = document.getElementById("play");
    var context = play.getContext('2d');
    var player1 = new   Image();
    var player2 = new   Image();
    var ball =    new   Image();
    var bg =      new   Image();
    var pipes =   new   Image();
    var player1_2 =new   Image();
    var player1_3 =new   Image();
    var xPos=         400;
    var yPos=         230;
    var vxPos=          9;
    var vyPos =         9;
    var player2Xpos = 890;
    var player2YPos = 300;
    var player1XPos =   0;
    var player1YPos = 200;
    var scorePlayer1 =  0;
    var scorePlayer2 =  0;
    var start = false;
    document.addEventListener('mousemove', playerMove);
    play.onclick = startGame;
    player1.src ="img/timon.png";
    player1_2.src= "img/timon1.png"
    player1_3.src= "img/timon2.png"
    player2.src ="img/pumba.png";
    ball.src = "img/ball.png";
    pipes.src = "img/pipe.png";
    bg.src = "img/bg.jpg";
// старт игры
function startGame() {
    start = true;
    if (start === true && scorePlayer1 == 9 || scorePlayer2 == 9)  {
    console.log("start" + start)
    scorePlayer1 = 0;
    scorePlayer2 = 0;

}
// Отрисовка игры
}
    function draw() {
        ballMove();
    context.drawImage(bg, 0, 0);
    context.drawImage(ball,  xPos, yPos);
    if ( lastPositionMouse() < 20) { // выборка для анимации картинки
        context.drawImage(player1, player1XPos, player1YPos );
    } else if ( lastPositionMouse() < 40 ) {
            context.drawImage(player1_2, player1XPos, player1YPos );
    } else if ( lastPositionMouse() < 60 ) {
        context.drawImage(player1_3, player1XPos, player1YPos);
    } else if ( lastPositionMouse() < 80 ) {
        context.drawImage(player1, player1XPos, player1YPos);
    }
    else  context.drawImage(player1_2, player1XPos, player1YPos );

    context.drawImage(player2, player2Xpos, player2YPos);
    // отображение разделителя поля
    for (var i = 10; i < play.height; i += 45) {
        context.fillStyle = "#ccc";
        context.fillRect(play.width / 2 - 10, i, 20, 30);
    } requestAnimationFrame(draw);
    score();

    }
  // функция определяющая последнюю цифру координаты Y для мышки
  function lastPositionMouse() {
      var y=player1YPos+'';
      var last;

      switch (y.length) {
          case 2:
              last=player1YPos/*-(Math.trunc(player1YPos/10)*10);
              console.log(y.length +" " + last);
              break*/
          case 3:
              last=player1YPos-(Math.trunc(player1YPos/100)*100);
              console.log(y.length +" " + last);
              break
          default:
              last=0;

      }
      return last;
  }
// отображение счета
    function score() {
        if (start == true) {
            context.fillStyle = "#000000";

            context.font = "italic 80pt Arial";
            context.fillText(scorePlayer1 + "      " + scorePlayer2 , 350, 100);

        }win();

    }
 // Отображение выиграша на экране.
    function win() {
        if (scorePlayer1 == 9) {
            context.fillStyle = "#000000";
            context.font = "italic 100pt Arial";
            context.fillText("Pumba WIN!!", 120, 350);

        } else if  (scorePlayer2 == 9) {
            context.fillStyle = "#000000";
            context.font = "italic 100pt Arial";
            context.fillText("Timon WIN!!", 120, 350);
        }
            }
// движение мяча
    function ballMove() {
    if (start !== false && scorePlayer1 < 9 && scorePlayer2 < 9 ) {
        wall();
        aiMove();
        lastPositionMouse();
        xPos += vxPos;
        yPos += vyPos;
    }
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
        scorePlayer2++;


    } else if (xPos <= 0 && vyPos < 0 && vxPos < 0 && xPos <= 0 && vyPos > 0 && vxPos < 0  ){
        vxPos =  - vxPos;
        vyPos =    vyPos;
        scorePlayer1++;

    } else if (xPos <= 0 && vyPos > 0 && vxPos < 0 ){
        vxPos =  - vxPos;
        vyPos =    vyPos;
        scorePlayer1++;


    } else {
        vxPos =    vxPos;
        vyPos =  - vyPos;
    }
    if ((player1XPos + player1.width > xPos && player1XPos < xPos +ball.width && player1YPos +player1.height > yPos && player1YPos < yPos + ball.height && vxPos<0) ||
    player2Xpos + player2.width > xPos && player2Xpos < xPos + ball.width && player2YPos + player2.height > yPos && player2YPos < yPos + ball.height && vxPos>0) {
        vxPos =  - vxPos;
    }
    }

// генерация движения опонента
    function aiMove() {
        var y;
        var vY= Math.abs(vyPos) + 1;
        // делаем скорость оппонента зависимой от скорости шарика


        if (yPos < player2YPos - player2.height / 2) {
            y = player2YPos - vY;
        }
        if (yPos > player2YPos + player2.height / 2) {
            y = player2YPos + vY;
        }
        if (0 < y && y < play.height - player2.height - 0) {
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



