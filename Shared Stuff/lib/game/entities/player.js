ig.module(
	'game.entities.player'
	)
.requires(
	'impact.entity',
	'game.entities.player2'
	)
.defines(function(){
		EntityPlayer = ig.Entity.extend({
			type: ig.Entity.TYPE.A,
			collides: ig.Entity.COLLIDES.ACTIVE,
			gravityFactor: 0,
			size: {x: 32,y: 44},
			offset: {x:16, y:10},
			maxVel: {x: 600, y:600},
			friction: { x: 0, y: 0 },
			name: "player",
			delayGun: null,
			delayShotGun: null,
			health: 100,
			pad: null,
			maxHealth: 100,
			targetAngle: 0,
			circle: null,
			prevX: 0,
			prevY: 0,
			isColliding: false,
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/char_red_sprite_64.png', 64, 64);
				this.addAnim('idle',1, [0]);
				this.addAnim('run',0.15, [0,1,2,3]);
				if(!ig.global.wm ) ig.game.spawnEntity("EntityCircle1", this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
		
				this.maxHealth = this.health;
				this.zIndex = 1;
				this.delayGun = new ig.Timer();
				this.delayGun.set(0.2);

				this.delayShotGun = new ig.Timer();
				this.delayShotGun.set(0.5);
				if(!ig.global.wm )this.pad = Gamepad.getPad(this,1);

			},
			update: function(){
				
				if(!this.circle) this.circle = ig.game.getEntityByName("circle1");
			

				if(ig.input.state('action5')){
					if(this.delayGun.delta() > 0){

 					ig.game.spawnEntity("EntityLazor",(this.pos.x + this.size.x/2),(this.pos.y + this.size.y/2), {angle: this.angleTo(this.circle) });
 					this.delayGun.set(0.2);
 					this.targetAngle = this.angleTo(this.circle);

					}
					

				}
				else if(ig.input.state('action6')){
					if(this.delayShotGun.delta() > 0)
					{
					 ig.game.spawnEntity("EntityLazor",(this.pos.x + this.size.x/2),(this.pos.y + this.size.y/2), {angle: this.angleTo(this.circle)- Math.PI/32 });
					 ig.game.spawnEntity("EntityLazor",(this.pos.x + this.size.x/2),(this.pos.y + this.size.y/2), {angle: this.angleTo(this.circle) });
					 ig.game.spawnEntity("EntityLazor",(this.pos.x + this.size.x/2),(this.pos.y + this.size.y/2), {angle: this.angleTo(this.circle) + Math.PI/32 });
					 this.delayShotGun.set(0.5);
					 this.targetAngle = this.angleTo(this.circle);
					 }
				}



			
		
		
	
/*
		&& Math.abs(pad.rightStickX) > 0.20


		*/
				if(this.pad)
				{

					if(Math.abs(this.pad.leftStickX) > 0.20 )
					{
						this.vel.x = this.pad.leftStickX * 115;
					}
					else{this.vel.x = 0;}
					
					if(Math.abs(this.pad.leftStickY) > 0.20 )
					{
						this.vel.y = this.pad.leftStickY * 115;
					}
					else{this.vel.y = 0;}

					

					if(Math.abs(this.vel.x) > 0 || Math.abs(this.vel.y) > 0)
					{
						this.currentAnim = this.anims.run;
					}
					else{
						this.currentAnim = this.anims.idle;}
			
					if(this.circle)  {
						if(Math.abs(this.pad.rightStickX) > 0.65 || Math.abs(this.pad.rightStickY) > 0.65)
						{
							var angle=Math.atan2(this.pad.rightStickY, this.pad.rightStickX);
							angle-=Math.PI/2
						

				

							this.circle.pos.x  = (this.pos.x + this.size.x/2) + Math.sin(-angle)*100; 
							this.circle.pos.y = (this.pos.y + this.size.y/2) + Math.cos(-angle)*100;
							this.targetAngle = this.angleTo(this.circle);

						}
						
						else if(ig.input.state('action5') ||ig.input.state('action6'))this.targetAngle = this.angleTo(this.circle);
						else if(Math.abs(this.vel.y) > 0 || Math.abs(this.vel.x) > 0) this.targetAngle=Math.atan2(this.vel.y, this.vel.x);
						else{
							this.targetAngle = this.angleTo(this.circle);
						}
					}
				

		
				}
			
				this.prevX = this.pos.x;
				this.prevY = this.pos.y;
				this.changeAngleTo();

				this.parent();

				if(this.isColliding === false && this.pad && !(Math.abs(this.pad.rightStickX) > 0.50 && Math.abs(this.pad.rightStickY) > 0.50))
						{
							
							this.circle.pos.x += this.pos.x - this.prevX;
							this.circle.pos.y += this.pos.y - this.prevY;
				}
				else{
					this.isColliding = false;
				}
				

				
						
			},
			changeAngleTo: function(){

				
				this.currentAnim.angle = this.targetAngle;
			},
			kill: function(){
			
				for(var i = 0; i < ig.game.entities.length; i++)
				{
					if(ig.game.entities[i].isMonster  && ig.game.entities[i].target){ig.game.entities[i].target = null;}
				}
				ig.game.getEntityByName("circle1").kill();

				ig.game.removeEntity(this);

				ig.game.player1Spawning = true;
				ig.game.player1SpawnTimer.set(3);
				

				
			}

			});

			EntityLazor = ig.Entity.extend({
			gravityFactor: 0,
			size: {x: 16,y: 16},
			type: ig.Entity.TYPE.NONE,
			collides: ig.Entity.COLLIDES.NEVER,
			checkAgainst: ig.Entity.TYPE.B,
			maxVel: {x: 10000, y:10000},
			friction: { x: 0, y: 0 },
			angle: 0,
			delayTimer: null,
			
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/bullet_blue_16.png',16,16);
				this.addAnim('idle',1, [0]);
					this.currentAnim.angle = this.angle - (Math.PI /2);
				this.vel.x = Math.cos(this.angle) * 1150;
				this.vel.y = Math.sin(this.angle) * 1150;
				this.delayTimer = new ig.Timer();
			this.delayTimer.set(1.5);
			var sound = new ig.Sound( 'media/laser.ogg' );
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
				console.log(other.name);
				if(other.name == "door")
				{
					if(!other.isOpen)this.kill();
				}
				else{
					other.receiveDamage(10, this);this.kill();
				}
				
			}
			});
			EntityCircle1 = ig.Entity.extend({
				type: ig.Entity.TYPE.NONE,
					collides: ig.Entity.COLLIDES.NEVER,
			gravityFactor: 0,
			size: {x: 16,y: 16},
			offset: {x:0, y:0},
			maxVel: {x: 600, y:600},
			friction: { x: 0, y: 0 },
			name: "circle1",
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/crosshair_red_16.png', 16, 16);
				this.addAnim('idle',1, [0]);
			},
			update: function(){
			

				//this.pos.x =  this.vel.x * ig.system.tick;
		        //this.pos.y =  this.vel.y * ig.system.tick;
				this.parent();
			}
		




			
		});
			EntityDeathExplosionParticle = ig.Entity.extend({
		size: { x: 2, y: 2 },
		maxVel: { x: 160, y: 200 },
		lifetime: 0.8,
		fadetime: 1.2,
		bounciness: 0,
		vel: { x: 100, y: 30 },
		friction: { x: 100, y: 0 },
		collides: ig.Entity.COLLIDES.LITE,
		colorOffset: 0,
		totalColors: 7,

		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.animSheet = new ig.AnimationSheet('media/lazor_particle.png', 1,1);
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
	
	EntityDeathExplosion = ig.Entity.extend({
		lifetime: 1,
		callBack: null,
		particles: 1,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			var particle_l = this.particles;
		   for (var i = 0; i < particle_l; i++)
			{
				ig.game.spawnEntity(EntityDeathExplosionParticle, x, y, { colorOffset: settings.colorOffset ? settings.colorOffset : 0 });
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