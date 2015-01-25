ig.module(
	'game.entities.player2'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
		EntityPlayer2 = ig.Entity.extend({
			type: ig.Entity.TYPE.A,
				collides: ig.Entity.COLLIDES.ACTIVE,
			gravityFactor: 0,
			size: {x: 32,y: 44},
				offset: {x:16, y:10},
			maxVel: {x: 600, y:600},
			friction: { x: 0, y: 0 },
			name: "player2",
			health: 100,
			maxHealth: 100,
			delayGun: null,
			delayShotGun: null,
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/char_blue_sprite_64.png', 64, 64);
				this.addAnim('idle',1, [0]);
				this.addAnim('run',0.15, [0,1,2,3]);
				if(!ig.global.wm ) ig.game.spawnEntity("EntityCircle2", this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
				else{console.log("derp weltmaister")}


					this.maxHealth = this.health;
				this.zIndex = 2;
				 this.delayGun = new ig.Timer();
				this.delayGun.set(0.2);


				this.delayShotGun = new ig.Timer();
				this.delayShotGun.set(0.5);
			},
			update: function(){
				
			
			

				if(ig.input.state('action5_2')){
					if(this.delayGun.delta() > 0){

 ig.game.spawnEntity("EntityLazor",(this.pos.x + this.size.x/2),(this.pos.y + this.size.y/2), {angle: this.angleTo(ig.game.getEntityByName("circle2")) });
 this.delayGun.set(0.2);

					}
					

				}
				else if(ig.input.state('action6_2')){


					if(this.delayShotGun.delta() > 0){
					 ig.game.spawnEntity("EntityLazor",(this.pos.x + this.size.x/2),(this.pos.y + this.size.y/2), {angle: this.angleTo(ig.game.getEntityByName("circle2"))- Math.PI/32  });
					 ig.game.spawnEntity("EntityLazor",(this.pos.x + this.size.x/2),(this.pos.y + this.size.y/2), {angle: this.angleTo(ig.game.getEntityByName("circle2")) });
					 ig.game.spawnEntity("EntityLazor",(this.pos.x + this.size.x/2),(this.pos.y + this.size.y/2), {angle: this.angleTo(ig.game.getEntityByName("circle2"))+ Math.PI/32  });
					 this.delayShotGun.set(0.5);
					}
				}

				if(Math.abs(this.vel.x) > 0 || Math.abs(this.vel.y) > 0)
				{
					this.currentAnim = this.anims.run;
				}
				else{
					this.currentAnim = this.anims.idle;}
				this.parent();


			},
			kill: function(){
				var player = ig.game.getEntityByName("player");

			for(var i = 0; i < ig.game.entities.length; i++)
				{
					if(ig.game.entities[i].isMonster  && ig.game.entities[i].target){ig.game.entities[i].target = null;}
				}

				ig.game.getEntityByName("circle2").kill();
				ig.game.removeEntity(this);

				if(player && life > 0) {life--;ig.game.spawnEntity("EntityPlayer2", player.pos.x  , player.pos.y );}
				else if(life > 0){ilife--;g.game.spawnEntity("EntityPlayer2", ig.system.width/2 , ig.system.height/2 );}
				
			}

			});

			EntityLazor = ig.Entity.extend({
			gravityFactor: 0,
			type: ig.Entity.TYPE.NONE,
			checkAgainst: ig.Entity.TYPE.B,
			size: {x: 16,y: 16},
			collides: ig.Entity.COLLIDES.NONE,
			maxVel: {x: 10000, y:10000},
			friction: { x: 0, y: 0 },
			angle: 0,
			delayTimer: null,
			
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/bullet_16.png',16,16);
				this.addAnim('idle',1, [0]);
				this.currentAnim.angle = this.angle;
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
			
						if(other.name == "door")
				{
					if(!other.isOpen)this.kill();
				}
				else{
					other.receiveDamage(10, this);this.kill();
				}
				
				
			
			}
			});
			EntityCircle2 = ig.Entity.extend({
				type: ig.Entity.TYPE.NONE,
				collides: ig.Entity.COLLIDES.NONE,
			gravityFactor: 0,
			size: {x: 16,y: 16},
			offset: {x:0, y:0},
			maxVel: {x: 600, y:600},
			friction: { x: 0, y: 0 },
			name: "circle2",
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/crosshair_blue_16.png', 16, 16);
				this.addAnim('idle',1, [0]);
			},
			update: function(){
			


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