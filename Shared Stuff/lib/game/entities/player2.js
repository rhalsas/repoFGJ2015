ig.module(
	'game.entities.player2'
	)
.requires(
	'game.entities.player'
	)
.defines(function(){
		EntityPlayer2 = EntityPlayer.extend({
			type: ig.Entity.TYPE.A,
			collides: ig.Entity.COLLIDES.ACTIVE,
			gravityFactor: 0,
			size: {x: 32,y: 44},
			offset: {x:16, y:10},
			maxVel: {x: 600, y:600},
			friction: { x: 0, y: 0 },
			name: "player2",
			delayGun: null,
			delayShotGun: null,
			health: 100,
			pad: null,
			maxHealth: 100,
			targetAngle: 0,
			circle: null,
			prevX: 0,
			prevY: 0,
			action1: 'action1_2',
			action2: 'action2_2',
			action3: 'action3_2',
			action4: 'action4_2',
			action5: 'action5_2',
			action6: 'action6_2',
			xhair_imgurl: 'media/crosshair_blue_16.png',
			isColliding: false,
			animSheet: new ig.AnimationSheet('media/char_blue_sprite_64.png', 64, 64),
			playerNro: -1,
			keyboardNro: -1,
			keyboardRegistered: false


			});
	
	
});