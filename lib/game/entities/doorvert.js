ig.module(
	'game.entities.doorvert'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
		EntityDoorvert = ig.Entity.extend({
			gravityFactor: 0,
			type: ig.Entity.TYPE.B,
			collides: ig.Entity.COLLIDES.FIXED,
			size: {x: 16,y: 64},
			offset: {x:24, y:0},
			maxVel: {x: 0, y:0},
			friction: { x: 0, y: 0 },
			triggerable: "false",
			triggerName: "",
			triggered: true,
			name: "door",
			//Just in case
			animDelay: null,
			immunity: true,
			isOpen: false,
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/door_vert_sprite_64.png', 64, 64);
				


				this.addAnim('opening', 0.10, [0,1,2,3,3,3], true);
				this.addAnim('closing', 0.10, [3,2,1,0,0,0], true);
				this.addAnim('lock', 1, [4], true);
				this.addAnim('open', 1, [0], true);

			
			},
			update: function(){
				var player = ig.game.getEntityByName("player");
				var player2 = ig.game.getEntityByName("player2");
				var canOpen = true;
				if(this.triggerable=== "true")
				{
					
					
					for(var i = 0; i < ig.game.triggerList.length ; i++)
					{
						if(ig.game.triggerList[i].triggerName && (ig.game.triggerList[i].triggerName == this.triggerName))
						{

							if(!ig.game.triggerList[i].triggered) canOpen = false;
						}
					}
				}
				if(!player || !player2) {return;}
				if( ((this.distanceTo (player) < 64) || (this.distanceTo( player2) < 64))  && canOpen === true)
				{
					if(this.currentAnim === this.anims.opening)
					{
						this.collides = ig.Entity.COLLIDES.NONE;
					}
					if(this.currentAnim != this.anims.opening)
					{
					
					this.collides = ig.Entity.COLLIDES.NONE;
					this.currentAnim = this.anims.opening;
					this.currentAnim.rewind();
					this.isOpen = true;
					}
				}
				else if(((this.distanceTo( player) > 64) || (this.distanceTo( player2) > 64)) ){
					if(this.currentAnim != this.anims.closing ||this.currentAnim != this.anims.open)
					{
						

					this.collides = ig.Entity.COLLIDES.FIXED;
					if(!canOpen){this.currentAnim = this.anims.lock;} 
						
			
					}
					else{
						if(this.currentAnim == this.anims.lock){this.currentAnim = this.anims.open; this.collides = ig.Entity.COLLIDES.NONE;
						
					}
					
						
						
						}
					this.currentAnim.rewind();
					
					this.isOpen = false;
					}
				
			
				this.parent();
			}
		});
});