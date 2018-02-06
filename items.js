/*
/	item types
/	0: air
/	1: cobble
*/

function Item (name, type, description, texture) {
	this.name = name;
    this.type = type;
    this.description = description;
    this.texture = texture;
}

const ITEMS = [
	new Item("Air", 0, "Puff, wind just blown some air into your backpack.", null),
	new Item("Water", 1, "You don't know if it was mixed with urine, but seems drinkable anyway.", {color: "blue"}),
	new Item("Grass", 2, "Regular dirt with some green stains on it. You suspect whether it's slime goo or natural organisms.", {color: "green"})
]