function Player (name, bio, color) {
    this.name = name;
    this.bio = bio;
    this.color = color;
    this.x = (terrain.grids.amount_x - (terrain.grids.amount_x % 2)) / 2;
    this.y = (terrain.grids.amount_y - (terrain.grids.amount_y % 2)) / 2;
    this.gold = {
    	amount: 150,
    	total: 250,
    	top: 504,
    	left: 130,

    	draw_hud: function() {
            strokeWeight(1);
            stroke(0);
    		textSize(12);
    		textAlign(RIGHT);
    		strokeWeight(0);
    		fill(255, 204, 0);
    		text(this.amount, this.left, this.top);
    		textAlign(LEFT);
            strokeWeight(0);
    		//coin
    		fill(240,150,45);
    		ellipse(this.left + 5, this.top-13, 8);
    		fill(250, 210, 50);
    		ellipse(this.left + 5, this.top-13, 6);
    		fill(240,150,45);
    		textSize(4);
    		text("$", this.left + 3.5, this.top-9);
    	},
        draw_overlay: function () {

        }
    }
    this.health = {
    	max: 100,
    	current: 50,
		width: 10,
		height: 100,
		color: "red",
	    top: 399,
	    left: 755,
	    border: 2,

    	draw: function() {
    		//outline
    		fill(255, 100, 100, 30);
    		strokeWeight(this.border);
    		stroke(255, 100, 100, 80);
    		rect(this.left, this.top - 1, this.width, this.height + 1);
    		//inside
    		strokeWeight(0);
    		fill(190,15,15,90)
    		rect(this.left + this.border - 1, this.top + this.max - this.current, this.width - this.border, this.current - this.border * 0.5)
    	}
    }
    this.inventory = {
    	slots: {
    		list: [],
    		selected: 0,
    		num_slot: 12,
	    	width: 47,
	    	top: 450,
	    	left: 145,
	    	border: 3,

    		generate: function() {
    			for (var i = this.num_slot; i > 0; i--){

					this.list.push({ //create slot object
						item: 0, //air by default
						isSelected: false //if selected make true to highlight.
					});
    			}
    			this.update_current_index(this.selected);
    		},

    		update_current_index: function (index) {
    			if (index > this.num_slot - 1) return false;
    			else {
	    			for (var i = 0; i < this.list.length; i++){
		    			if (this.selected != index)this.list[i].isSelected = false;
		    		}

	    			if (index == 0) {
	    				this.selected = 0;
	    				this.list[0].isSelected = true;
	    				return true;
	    			}
	    			if (index == this.selected) return true;
	    			var previus_index = this.selected;
	    			this.list[index].isSelected = true;
	    			this.selected = index;
	    			return this.list[index].isSelected && !this.list[previus_index].isSelected;
	    		}
    		},
    		retrieve_current_index: function() {
    			return this.list[this.selected];
    		},
    		retrieve_hover_index: function(mouseX, mouseY) {
    			return parseInt(((mouseX - ((mouseX - player.inventory.slots.left) % (player.inventory.slots.width + player.inventory.slots.border))) - player.inventory.slots.left) / player.inventory.slots.width);
    		},

    		current_overview: {
    			timeout: 0,
    			block: null,
    			wait_time: 1200,
    		},
    		display_overview(block){
    			var name = ITEMS[player.inventory.slots.list[block].item].name;
                strokeWeight(2);
                stroke(0);
    			textAlign(CENTER);
    			textSize(18);
    			fill(255);
    			text(name, this.left + (this.width + this.border) * this.num_slot / 2, this.top + 5);
    			textAlign(LEFT);
    		}
    	},

    	draw: function(){
			strokeWeight(3);
			textSize(8);
			for (var i = 0; i < this.slots.list.length; i++){
				if (this.slots.list[i].isSelected) {
					stroke(255, 204, 0, 140);
                    fill(255, 204, 0);
                    if (i <= 9) text((i + 1) % 10, this.slots.left + i * this.slots.width + i * this.slots.border + 7, this.slots.top + this.slots.width - 1);
					fill(255, 204, 0, 80);
				}
				else if (i >= 10) { //if  11 or 12
					stroke(255, 100, 100, 140);
					fill(255, 100);//white
				}
				else {
					stroke(255, 140);
					fill(255);//white
					text((i + 1) % 10, this.slots.left + i * this.slots.width + i * this.slots.border + 7, this.slots.top + this.slots.width - 1);
                    fill(255, 120);//white
				}
				rect(this.slots.left + i * this.slots.width + i * this.slots.border, this.slots.top, this.slots.width, this.slots.width);
				rect(this.slots.left + i * this.slots.width + i * this.slots.border, this.slots.top, 2, 2); //top left dot
				rect(this.slots.left + (i + 1) * this.slots.width - 2 + i * this.slots.border, this.slots.top, 2, 2);
				rect(this.slots.left + i * this.slots.width + i * this.slots.border, this.slots.top + this.slots.width - 2, 2, 2);
				rect(this.slots.left + (i + 1) * this.slots.width - 2 + i * this.slots.border, this.slots.top + this.slots.width - 2, 2, 2);

                if (ITEMS[this.slots.list[i].item].texture != null) {
                    var item_width = (this.slots.width + this.slots.border) / 2;
                    fill(ITEMS[this.slots.list[i].item].texture.color);
                    strokeWeight(1);
                    rect(this.slots.left + i * this.slots.width + i * this.slots.border + (this.slots.width - item_width) / 2, this.slots.top + (this.slots.width - item_width) / 2, item_width, item_width);
                    strokeWeight(3);
                }
			}
		}
    }
}