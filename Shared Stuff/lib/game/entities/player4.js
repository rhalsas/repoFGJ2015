ig.module(
	'game.entities.player4'
	)
.requires(
	'game.entities.player'
	)
.defines(function(){
		EntityPlayer4 = EntityPlayer.extend({
			type: ig.Entity.TYPE.A,
			collides: ig.Entity.COLLIDES.ACTIVE,
			gravityFactor: 0,
			size: {x: 32,y: 44},
			offset: {x:16, y:10},
			maxVel: {x: 600, y:600},
			friction: { x: 0, y: 0 },
			name: "player4",
			delayGun: null,
			delayShotGun: null,
			health: 100,
			pad: null,
			maxHealth: 100,
			targetAngle: 0,
			circle: null,
			prevX: 0,
			prevY: 0,
			action1: 'action1_4',
			action2: 'action2_4',
			action3: 'action3_4',
			action4: 'action4_4',
			action5: 'action5_4',
			action6: 'action6_4',
			xhair_imgurl: 'media/crosshair_pink_16.png',
			isColliding: false,
			animSheet: new ig.AnimationSheet('media/char_pink_sprite_64.png', 64, 64),
			playerNro: -1,
			keyboardNro: -1,
			keyboardRegistered: false

			});
	
	
});