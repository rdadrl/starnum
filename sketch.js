var player = new Player("Arda", "Test Bio", "red");
var myFont;

function preload() {
  mainFont = loadFont('./assets/fonts/Minecraftia-Regular.ttf');
}

function setup() {
	createCanvas(800, 600);
	frameRate(10);
	cursor(CROSS);//noCursor();
  textFont(mainFont);
  player.inventory.slots.generate();
}

function draw() {
	background(0); //black background
  //game ver info
  fill(255);
  stroke(0);
  textSize(12);
  text("Arda's Draft Game Engine, v0.0.1a", 5,24);
  textAlign(RIGHT);
  fill("red");
  text("FPS: " + parseInt(getFrameRate()), 790, 24);
  textAlign(LEFT);
  //end game ver info

  player.inventory.draw();
  player.health.draw();
  player.gold.draw_hud();
  player.inventory.slots.display_overview(player.inventory.slots.selected);
}

function keyPressed() {
  if(UTIL.isInt(key)) {
    if (key == 0) key = 10;
    player.inventory.slots.update_current_index(key - 1);
  }
  else if (keyCode == 61 || 173) {
    //keyCode => 61 is = and 173 is - (-)
    if (keyCode == 61) {
            if (player.inventory.slots.selected == player.inventory.slots.num_slot - 1) player.inventory.slots.update_current_index(0);
            else player.inventory.slots.update_current_index(player.inventory.slots.selected + 1);
    } else {
      if (player.inventory.slots.selected == 0) player.inventory.slots.update_current_index(player.inventory.slots.num_slot - 1);
      else player.inventory.slots.update_current_index(player.inventory.slots.selected - 1);
    }
  }
  /*if (keyCode === LEFT_ARROW) {
 		return false;
  	} else if (keyCode === RIGHT_ARROW) {
 		return false;
  	} else if (keyCode === UP_ARROW) {
 		return false;
 	  } else if (keyCode === DOWN_ARROW) {
		return false;
    }*/
}

function mousePressed() {
 	if (mouseButton === LEFT) {
    var mouse_on = UTIL.mouse_hover_on_hud_element(mouseX, mouseY);
 		if (mouse_on.status) {
       switch(mouse_on.element) {
          case "Inventory Slots":
              player.inventory.slots.update_current_index(player.inventory.slots.retrieve_hover_index(mouseX, mouseY));
              break;
          case "Gold":
              player.gold.amount += 50;
              break;
      }
    }
  }
    if (mouseButton === RIGHT) {
      	return false;
    }
}
