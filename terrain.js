function Terrain () {
	this.grids = {
		list: [],
		zoom: 1,
		width: 26,
		border: 1,
		amount_x: 0,
		amount_y: 0,

		generate: function() {
			this.amount_x = width / (this.width + this.border * 2);
			this.amount_y = height / (this.width + this.border * 2);
			for (var i = 0; i < this.amount_x * this.amount_y; i++) {
				var y = (i - (i % this.amount_x)) / this.amount_x;
				var x = i % this.amount_x;
				this.list.push({x: x, y: y, color: "green"});
			}
			player.x = this.amount_x / 2;
			player.y = this.amount_y / 2;
		}
	},

	this.draw = function() {
		var translateX = (width / 2) - (this.grids.amount_x / 2 * (this.grids.width + this.grids.border * 2)) * this.grids.zoom;
		var translateY = (width / 2) - (this.grids.amount_x / 2 * (this.grids.width + this.grids.border * 2)) * this.grids.zoom;
		translateX -= (player.x - ((this.grids.amount_x - (this.grids.amount_x % 2)) / 2)) * (this.grids.width + this.grids.border * 2);
		translateY -= (player.y - ((this.grids.amount_y - (this.grids.amount_y % 2)) / 2)) * (this.grids.width + this.grids.border * 2);
		translate(translateX, translateY);
		for (i = 0; i < this.grids.list.length; i++){
			this.grids.list[i].x * (this.grids.width + this.grids.border * 2)
			stroke(255);
			if (this.grids.list[i].x == player.x && this.grids.list[i].y == player.y) fill("red");
			else fill(this.grids.list[i].color);
			strokeWeight(this.grids.border * this.grids.zoom);
			rect((this.grids.list[i].x * (this.grids.width + this.grids.border * 2) + this.grids.border) * this.grids.zoom, (this.grids.list[i].y * (this.grids.width + this.grids.border * 2) + this.grids.border) * this.grids.zoom, this.grids.width * this.grids.zoom, this.grids.width * this.grids.zoom);
		}
		translate(-translateX, -translateY);
	};
}