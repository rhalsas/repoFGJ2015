ig.module(
	'game.entities.doorTrigger'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
		EntityDoorTrigger = ig.Entity.extend({
			gravityFactor: 0,
			type: ig.Entity.TYPE.NONE,
			collides: ig.Entity.COLLIDES.NONE,
			checkAgainst: ig.Entity.TYPE.BOTH,
			size: {x: 16,y: 16},
			offset: {x: 24, y: 24},
			maxVel: {x: 0, y:0},
			friction: { x: 0, y: 0 },
			triggerName: "",
			triggered: false,
			triggerable: true,
			name: "doorTrigger",
			toggleTrigger: "false",
			standTrigger: "false",
			
			immunity: true,
			animDelay: null,
			isOpen: false,
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/button_sprite_64.png', 64, 64);
				this.addAnim('idle',1, [0]);
					this.addAnim('triggered',1, [1]);

					

			},
			checkDistance: function(){
				var player = ig.game.getEntityByName("player");
				var player2 = ig.game.getEntityByName("player2");
				
				


				 if(((player && this.distanceTo( player) <= 32) || (player2 && this.distanceTo( player2) <= 32)))
				{
					this.triggered = true;	
					this.currentAnim = this.anims.triggered;
				}
				else if(((player && this.distanceTo(player) > 32) || (player2 && this.distanceTo( player2) > 32)) ){
					this.triggered = false;
					this.currentAnim = this.anims.idle;	
			
				}


			},
			update: function(){

				if(this.standTrigger === "true") this.checkDistance();
				this.parent();
			},
			check: function(other){
				if((other.name === "player" || other.name === "player2") && this.toggleTrigger === "true")
				{
	
					this.triggered = true;	
					this.currentAnim = this.anims.triggered;
				}

			}
		});
});