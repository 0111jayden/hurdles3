class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(200, 100);
    car1.addImage("car1", car1_img);
    car2 = createSprite(200, 300);
    car2.addImage("car2", car2_img);
    car3 = createSprite(200, 500);
    car3.addImage("car3", car3_img);
    car4 = createSprite(200, 700);
    car4.addImage("car4", car4_img);
    cars = [car1, car2, car3, car4];
  }

  play() {
    form.hide();

    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      //background(rgb(198, 135, 103));
      image(track2, -displayWidth * 4, 0, displayWidth * 5, displayHeight);
      
      //var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y = 175;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        y = y + 200;
        //use data form the database to display the cars in y direction
        x = displayWidth - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 90, 90);
          cars[index - 1].shapeColor = "red";
          camera.position.y = displayHeight / 2;
          camera.position.x = cars[index - 1].x;
        }

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 10
      player.update();
    }

    if (keyIsDown(VK_SPACE) && player.index !== null) {
      for (i = 0;i<=15;i++){
        player.position.y += 1;
        player.distance += 0.5;
      }
      for (j = i;j<=15;i-=1){
        player.position.y -= 1;
        player.distance += 0.5;
      }
    }

    if (player.distance > 3460) {
      gameState = 2;
    }

    drawSprites();
  }

  end() {
    console.log("Game Ended");
  }
}
