ig.module(
	'game.entities.monster2'
	)
.requires(
	'impact.entity'

	)
.defines(function(){
		EntityMonster2 = ig.Entity.extend({
			type: ig.Entity.TYPE.B,
			checkAgainst: ig.Entity.TYPE.A,
			collides: ig.Entity.COLLIDES.PASSIVE,
			gravityFactor: 0,
			size: {x: 32,y: 44},
				offset: {x:16, y:10},
			maxVel: {x: 600, y:600},
			friction: { x: 0, y: 0 },
			name: "monster",
			secondname: " ",
			delayGun: null,
			health: 100,
			angle: 0,
			isMonster: true,
			target: null,
			bounciness: 1,
			searchRange: 256,
			changeDirTimer: null,
			changeDirProb: 10,

			delayCollisionChange: null,
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/char_black_sprite_64.png', 64, 64);
				this.addAnim('idle',1, [0]);
				this.addAnim('run',0.15, [0,1,2,3]);
				
			

				this.delayGun = new ig.Timer();
				this.delayGun.set(1);
				this.delayDirTimer = new ig.Timer();
				this.delayDirTimer.set(0);
				this.delayCollisionChange = new ig.Timer();
				this.delayCollisionChange.set(0.5);
			},
			getTarget: function(player,player2){
			
				if(this.target) return;


				var random = Math.floor(Math.random() * 2);

				if(random == 0)
				{

					if(player)this.target = player;
		
				}
				else{
					if(player)this.target = player2;
				}

			},
			movement: function(){

				if(this.delayDirTimer.delta() > 0)
				{

					this.delayDirTimer.set(1.5);
					var random = Math.floor(Math.random() * 100);
						
					if(random < this.changeDirProb)
					{
						
						this.changeDirProb = 20;
						
						this.calcSpeed();


					}
					else{
						this.changeDirProb += 10;
					}
					
				}
				
			},
			calcSpeed: function(){

					var random_2 = Math.floor(Math.random() * 2);
					if(random_2 == 0){random_2 = -1;}
					else{random_2 = 1;}

					this.vel.x = random_2 *  (Math.random()*50)-25;
					this.vel.y = random_2 *  (Math.random()*50)-25;


					if(Math.abs(this.vel.x) <= 5 && Math.abs(this.vel.y) <= 5){
							this.calcSpeed();
					}
					
			},
			handleMovementTrace: function (res) {
			

			if (res.collision.x && this.delayCollisionChange.delta() > 0) {

				this.vel.x *= -1;
				
				this.delayCollisionChange.set(0.5);

			}
			if (res.collision.y && this.delayCollisionChange.delta() > 0) {
	
				this.vel.y *= -1;
						
			
				this.delayCollisionChange.set(0.5);
			}

			this.parent(res);


			},
			update: function(){
				var player = ig.game.getEntityByName("player");
				var player2 = ig.game.getEntityByName("player2");


				if(Math.abs(this.vel.x) > 0 || Math.abs(this.vel.y) > 0)
				{
					this.currentAnim = this.anims.run;
					this.currentAnim.angle=Math.atan2(this.vel.y, this.vel.x);
				}
				else{
					this.currentAnim = this.anims.idle;}
			
				if(	(player && this.distanceTo(player) < this.searchRange) || (player2 && this.distanceTo(player2) < this.searchRange)){
					this.getTarget(player,player2);
				}
				else if((player && this.distanceTo(player) < this.searchRange*0.7) || (player2 && this.distanceTo(player2) < this.searchRange*0.7)){
					this.vel.x = 0;
					this.vel.y = 0;
				}
				else{
					this.movement();
				}
				
				
					this.parent();
				if(!this.target) return;
				this.angle = this.angleTo(this.target);
				this.currentAnim.angle = this.angle;
				this.vel.x = Math.cos(this.angle) * 50;
				this.vel.y = Math.sin(this.angle) * 50;
				if((player && this.distanceTo(player) < this.searchRange*0.9) || (player2 && this.distanceTo(player2) < this.searchRange*0.9)){this.vel.x = 0;
							this.vel.y = 0;

						if(this.delayGun.delta() > 0){
							this.delayGun.set(0.15);
							ig.game.spawnEntity("EntityLazor_E",this.pos.x + this.size.x/2, this.pos.y + this.size.y/2, {angle: this.angle} );
						}
						
				}
		
				
			


			},
			kill: function(){
				
					ig.game.spawnEntity(EntityBloodSplash, this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
					ig.game.spawnEntity(EntityBloodSplash, this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
					ig.game.spawnEntity(EntityBloodSplash, this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
					ig.game.spawnEntity(EntityBloodSplash, this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
					ig.game.removeEntity(this);
				
			},
			check: function(other)
			{
				if(this.delayGun.delta() > 0)
				{
					//DUMAGE
					ig.game.spawnEntity(EntityBloodSplash, other.pos.x + other.size.x/2, other.pos.y + other.size.y/2);
					ig.game.spawnEntity(EntityBloodSplash, other.pos.x + other.size.x/2, other.pos.y + other.size.y/2);
					ig.game.spawnEntity(EntityBloodSplash, other.pos.x + other.size.x/2, other.pos.y + other.size.y/2);
					ig.game.spawnEntity(EntityBloodSplash, other.pos.x + other.size.x/2, other.pos.y + other.size.y/2);
					if(other.health - 10 <= 0){this.target = null;}
					other.receiveDamage(10, this);
					this.delayGun.set(1);
				}

			}

			});
			EntityLazor_E = ig.Entity.extend({
			gravityFactor: 0,
			size: {x: 16,y: 16},
			type: ig.Entity.TYPE.NONE,
			collides: ig.Entity.COLLIDES.NONE,
			checkAgainst: ig.Entity.TYPE.BOTH,
			maxVel: {x: 10000, y:10000},
			friction: { x: 0, y: 0 },
			angle: 0,
			delayTimer: null,
			
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/bullet_red_16.png',16,16);
				this.addAnim('idle',1, [0]);
				this.angle -= ((Math.random() * Math.PI/4)  - (Math.PI/8))
				this.currentAnim.angle = this.angle - (Math.PI /2);
				this.vel.x = Math.cos(this.angle) * 1000;
				this.vel.y = Math.sin(this.angle) * 1000;
				this.delayTimer = new ig.Timer();
			this.delayTimer.set(1.5);
var sound = new ig.Sound( 'media/laser.ogg' );
sound.volume = 0.33;
		sound.play();
			},
			update: function(){
				
				
				if(this.delayTimer.delta() > 0){this.kill();}

				this.parent();
			},
			kill: function(){
				
						ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y);
						ig.game.removeEntity(this);
				
				
			},
			handleMovementTrace: function (res) {
			

			if (res.collision.x || res.collision.y) {

				this.kill();

			}

			this.parent(res);


			},
			check: function(other)
			{
						if(other.name == "door")
				{
					if(!other.isOpen)this.kill();
				}
				else{
					if(other.type === ig.Entity.TYPE.A){other.receiveDamage(5, this);
					this.kill();}
				}
			}
			});
	

			
			
	
	
});