ig.module(
	'game.entities.monster1'
	)
.requires(
	'impact.entity'

	)
.defines(function(){
		EntityMonster1 = ig.Entity.extend({
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
			searchRange: 180,
			changeDirTimer: null,
			changeDirProb: 10,
			delayCollisionChange: null,

			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/char_mon_sprite_64.png', 64, 64);
				this.addAnim('idle',1, [0]);
				this.addAnim('run',0.15, [0,1,2,3]);
				
			

				this.delayGun = new ig.Timer();
				this.delayGun.set(1);
				this.delayDirTimer = new ig.Timer();
				this.delayDirTimer.set(0);
				this.delayCollisionChange = new ig.Timer();
				this.delayCollisionChange.set(0.5);
			},
			getTarget: function(){
			
				if(this.target) return;


				var random = Math.floor(Math.random() * 2);

				if(random == 0)
				{

					this.target = ig.game.getEntityByName("player");
		
				}
				else{
					this.target = ig.game.getEntityByName("player2");
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
				if(player && player2 )
				{
					if(		(player.pos.x <  this.pos.x + this.searchRange) 
						&& 	(player.pos.x > this.pos.x - this.searchRange)  
						&& 	(player.pos.y < this.pos.y + this.searchRange)
						&& 	(player.pos.y > this.pos.y -this.searchRange)
						){this.getTarget();}
						else{
							this.movement();
						}
				}
				
					this.parent();
				if(!this.target) return;
				this.angle = this.angleTo(this.target);
				this.currentAnim.angle = this.angle;
				this.vel.x = Math.cos(this.angle) * 50;
				this.vel.y = Math.sin(this.angle) * 50;
		
				
			


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
EntityBloodSplashParticle = ig.Entity.extend({
		size: { x: 4, y: 4 },
		maxVel: { x: 160, y: 200 },
		lifetime: 0.8,
		fadetime: 1.2,
		bounciness: 0,
		vel: { x: 100, y: 30 },
		friction: { x: 100, y: 0 },
		collides: ig.Entity.COLLIDES.NONE,
		colorOffset: 0,
		totalColors: 7,

		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.animSheet = new ig.AnimationSheet('media/blood.png', 4,4);
			var frameID = this.colorOffset;//Math.round(Math.random() * this.totalColors) + (this.colorOffset * (this.totalColors + 1));
			this.addAnim('idle', 0.2, [frameID]);
			this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
			this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
			this.idleTimer = new ig.Timer();
		},
		reset: function (x, y, settings) {
			this.parent(x, y, settings);
			var frameID = this.colorOffset;//Math.round(Math.random() * this.totalColors) + (this.colorOffset * (this.totalColors + 1));
			this.addAnim('idle', 0.2, [frameID]);
			this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
			this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
			this.idleTimer = new ig.Timer();
			
		},
		update: function () {
			if (this.idleTimer.delta() > this.lifetime) {
				this.kill();
				return;
			}
			this.currentAnim.alpha = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1, 0);
			this.parent();
		}
	});
	
	EntityBloodSplash = ig.Entity.extend({
		lifetime: 1,
		callBack: null,
		particles: 2,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			var particle_l = this.particles;
		   for (var i = 0; i < particle_l; i++)
			{
				ig.game.spawnEntity(EntityBloodSplashParticle, x, y, { colorOffset: settings.colorOffset ? settings.colorOffset : 0 });
			}
			this.idleTimer = new ig.Timer();

		},
		update: function () {
			if (this.idleTimer.delta() > this.lifetime) {
				this.kill();
				if (this.callBack)
					this.callBack();
				return;
			}
		}
	});
	

			
			
	
	
});