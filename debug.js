function drawDebug() {
	//game ver info
	strokeWeight(0);
	fill(30,30,30, 200);
	rect(691, 0, 205, 120);
	textAlign(RIGHT);
	fill(255);
	textSize(12);
	text("Arda's Draft Game, v0.0.2a", 886, 24);
	fill("red");
	text("FPS: " + parseInt(getFrameRate()), 886, 44);
	text("Loaded Plgn.:\nutilities [+]\nterrain [+]\nplayer [+]\nsketch [+]\ndebug [+]", 793, 44);
	fill(255);
	text("Player:\n" + player.name + "\nx: " + player.x + " y: " + player.y, 886, 64);
	textAlign(LEFT);
	//end game ver info
}