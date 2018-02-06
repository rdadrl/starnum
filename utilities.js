var UTIL = {
	screen: {
		
	},
	isInt: function (value) {
	  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
	},		
	mouse_hover_on_hud_element: function(mouseX, mouseY) {
		if (
			mouseY > player.inventory.slots.top && //if lower than the top part
			mouseY < player.inventory.slots.top + player.inventory.slots.width + player.inventory.slots.border * 2 &&//if upper than the bottom part
			mouseX > player.inventory.slots.left - player.inventory.slots.border && //if past the border line
			mouseX < player.inventory.slots.left + (player.inventory.slots.width + player.inventory.slots.border) * player.inventory.slots.num_slot //if not past the border line at right
			)
			return {
				status: true,
				element: "Inventory Slots"
			};
		else if (
			mouseY > player.gold.top - 20 && //if lower than gold top
			mouseY < player.gold.top &&
			mouseX > player.gold.left - 30&&
			mouseX < player.gold.left + 10
			)
			return {
				status: true,
				element: "Gold"
			};
		else return {
			status: false
		};
	}
}