
var game = new Phaser.Game(720, 720, Phaser.AUTO, 'dw', { preload: preload, create: create, update: update, render: render },false, false);
var tile_size=24;

function preload() {
	game.load.tilemap('map', 'map.csv', null, Phaser.Tilemap.CSV);
	game.load.image('tiles', 'images/terrain.png');
	game.load.spritesheet('player', 'images/dw.png', tile_size, tile_size);
	game.load.image('logo', 'images/title.png');
}

var map;
var layer;
var cursors;
var player;
var logo;
var help;

function create() {
	//  Because we're loading CSV map data we have to specify the tile size here or we can't render it
	map = game.add.tilemap('map', tile_size, tile_size);
	map.addTilesetImage('tiles');
	layer = map.createLayer(0);
	layer.resizeWorld();

	map.setCollision([4,5,6,8,13]);
	map.setCollisionBetween(16, 23);

	//  Player
	player = game.add.sprite(48, 48, 'player', 1);
	player.animations.add('down', [0,1], 10, true);
	player.animations.add('up', [2,3], 10, true);
	player.animations.add('left', [4,5], 10, true);
	player.animations.add('right', [6,7], 10, true);

	// Create variable to track player's location in our grid and set it
	player.gridPosition = new Phaser.Point(0, 0);
	updateGridPosition();

	game.camera.follow(player);

	cursors = game.input.keyboard.createCursorKeys();

	logo = game.add.sprite(100, 200, 'logo');
	logo.fixedToCamera = true;

	game.input.onDown.add(removeLogo, this);

	help = game.add.text(120, 210, 'Click to clear this message. Use the arrow keys to move.', { font: '18px Arial', fill: '#000000' });
	help.fixedToCamera = true;
}

function update() {
	if (cursors.left.isDown) {
		movePlayer(-1, 0); // move player 1 tile left
		player.play('left');
	}
	else if (cursors.right.isDown) {
		movePlayer(1, 0); // move player 1 tile right
		player.play('right');
	}
	else if (cursors.up.isDown) {
		movePlayer(0, -1); // move player 1 tile up
		player.play('up');
	}
	else if (cursors.down.isDown) {
		movePlayer(0, 1); // move player 1 tile up
		player.play('down');
	}
	else {
		player.animations.stop();
	}
}

function render() {
}

function updateGridPosition () {
	current_tile=map.getTileWorldXY(player.x, player.y);
	player.gridPosition.x = current_tile.x;
	player.gridPosition.y = current_tile.y;
}

function movePlayer(x, y) {
	// Only handle one move at a time since we move tile by tile
	if (player.isMoving) { return; }
	player.isMoving = true;

	if (this.map.hasTile(player.gridPosition.x + x, player.gridPosition.y + y))
	{
		var tile = this.map.getTile(player.gridPosition.x + x, player.gridPosition.y + y);
		if (tile && tile.collides)
		{
			player.isMoving = false;
			return;
		}
	}

	player.gridPosition.x += x;
	player.gridPosition.y += y;

	game.add.tween(player).to({x: player.gridPosition.x * tile_size, y: player.gridPosition.y * tile_size}, 250, Phaser.Easing.Quadratic.InOut, true).onComplete.add(function() { player.isMoving = false;}, this);
}

function removeLogo () {
	game.input.onDown.remove(removeLogo, this);
	logo.kill();
	help.destroy();
}
