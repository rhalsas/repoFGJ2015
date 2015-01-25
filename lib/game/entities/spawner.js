ig.module(
	'game.entities.spawner'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
		EntitySpawner = ig.Entity.extend({
			gravityFactor: 0,
			type: ig.Entity.TYPE.NONE,
			collides: ig.Entity.COLLIDES.NONE,
			size: {x: 64,y: 64},
			maxVel: {x: 0, y:0},
			friction: { x: 0, y: 0 },
			secondname: "2",
			name: "spawner",
			immunity: true,
		
			init: function(x,y,settings){
				this.parent(x, y, settings );

			}
		});
});