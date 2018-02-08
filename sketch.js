var player,
    terrain,
    myFont;

function preload() {
  mainFont = loadFont('./assets/fonts/Minecraftia-Regular.ttf');
  terrain = new Terrain();
  player = new Player("Arda", "Test Bio", "red");
}

function setup() {
	cnv = createCanvas(896, 504);

	frameRate(30);
	cursor(CROSS);//noCursor();
  textFont(mainFont);
  cnv.mouseWheel(changeSize);
  terrain.grids.generate();
  player.inventory.slots.generate();
}

function draw() {
  background(30,30,30);
  terrain.draw();
  drawDebug();


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
  else if (keyCode == 61 || keyCode == 173) {
    //keyCode => 61 is = and 173 is - (-)
    if (keyCode == 61) {
            if (player.inventory.slots.selected == player.inventory.slots.num_slot - 1) player.inventory.slots.update_current_index(0);
            else player.inventory.slots.update_current_index(player.inventory.slots.selected + 1);
    } else {
      if (player.inventory.slots.selected == 0) player.inventory.slots.update_current_index(player.inventory.slots.num_slot - 1);
      else player.inventory.slots.update_current_index(player.inventory.slots.selected - 1);
    }
  }

  /*
    w = 87
    a = 65 
    s = 83
    d = 68
  */
  else if (keyCode === LEFT_ARROW || keyCode == 65) {
    player.x -= 1;
  } else if (keyCode === RIGHT_ARROW || keyCode == 68) {
    player.x += 1;
  } else if (keyCode === UP_ARROW || keyCode == 87) {
    player.y -= 1;
  } else if (keyCode === DOWN_ARROW || keyCode == 83) {
    player.y += 1;
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

function changeSize(event) {//scroll to zoom in-out
  if (event.deltaY > 0) {
    if (terrain.grids.zoom < 1.5){
      terrain.grids.zoom += 0.001 * event.deltaY;
      if (terrain.grids.zoom > 1.5) terrain.grids.zoom = 1.5;
    }
  }
  else {
    if (terrain.grids.zoom * (terrain.grids.width + terrain.grids.border * 2) * terrain.grids.amount_x > width){
      terrain.grids.zoom -= 0.001 * - event.deltaY;
      if (terrain.grids.zoom * (terrain.grids.width + terrain.grids.border * 2) * terrain.grids.amount_x < width){
        terrain.grids.zoom = 0.75;
      }
    }
  }
}
