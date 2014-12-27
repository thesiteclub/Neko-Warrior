
var game = new Phaser.Game(720, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render },false, false);

function preload() {
    game.load.tilemap('map', 'map.csv', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', 'images/terrain.png');
    game.load.spritesheet('player', 'images/dw.png', 24, 24);
}

var map;
var layer;
var cursors;
var player;

function create() {
    //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
    map = game.add.tilemap('map', 24, 24);

    //  Now add in the tileset
    map.addTilesetImage('tiles');

    //  Create our layer
    layer = map.createLayer(0);

    //  Resize the world
    layer.resizeWorld();

    map.setCollisionBetween(4, 6);
    map.setCollisionBetween(8, 8);
    map.setCollisionBetween(13, 14);
    map.setCollisionBetween(16, 23);

    //  Un-comment this on to see the collision tiles
    // layer.debug = true;

    //  Player
    player = game.add.sprite(48, 48, 'player', 1);
    player.animations.add('down', [0,1], 10, true);
    player.animations.add('up', [2,3], 10, true);
    player.animations.add('left', [4,5], 10, true);
    player.animations.add('right', [6,7], 10, true);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.setSize(24, 24);

    game.camera.follow(player);

    //  Allow cursors to scroll around the map
    cursors = game.input.keyboard.createCursorKeys();

    var help = game.add.text(16, 16, 'Arrows to move', { font: '14px Arial', fill: '#ffffff' });
    help.fixedToCamera = true;
}

function update() {
    game.physics.arcade.collide(player, layer);
    player.body.velocity.set(0);

    if (cursors.left.isDown) {
        player.body.velocity.x = -100;
        player.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 100;
        player.play('right');
    }
    else if (cursors.up.isDown) {
        player.body.velocity.y = -100;
        player.play('up');
    }
    else if (cursors.down.isDown) {
        player.body.velocity.y = 100;
        player.play('down');
    }
    else {
        player.animations.stop();
    }
}

function render() {
}
