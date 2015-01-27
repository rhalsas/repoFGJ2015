ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	
	'game.entities.player',
	'game.entities.player2',
	'game.entities.monster1',
	'game.entities.monster2',

	'plugins.gamepad.gamepad' ,
	'game.levels.level_2'

)
.defines(function(){

MyGame = ig.Game.extend({
	

	gravity: 0,
	delayUpdate: null,
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	ui_helmet: new ig.Image('media/ui_sprite_64.png'),
	blue_ui_hp: new ig.Image('media/blue_ui_hp.png'),
	red_ui_hp: new ig.Image('media/red_ui_hp.png'),
	heart: new ig.Image('media/heart.png'),
	triggerList: new Array(),
	player1Initiated: false,
	player2Initiated: false,
	player3Initiated: false,
	player4Initiated: false,
	a_button: null,
	a_button2:null,
	a_button3:null,
	a_button4:null,
	lose_button: null,
	
	losingInitiated: false,
	player1CannotSpawn: false,
	player2CannotSpawn: false,
	player3CannotSpawn: false,
	player4CannotSpawn: false,

	player1Spawning: false,
	player2Spawning: false,
	player3Spawning: false,
	player4Spawning: false,

	player1SpawnTimer: null,
	player2SpawnTimer: null,
	player3SpawnTimer: null,
	player4SpawnTimer: null,

	init: function() {
		// Initialize your game here; bind keys etc.

	/*	ig.music.add( 'media/saga_musix_-_10000m_below_sea_level.ogg' );

		ig.music.volume = 1;
		ig.music.play();
		ig.music.loop = true;*/
		this.delayUpdate = new ig.Timer();
		this.delayUpdate.set(1);
		
		insertData();


		function button(gfxURL,animSpeed){

           		this.img = gfxURL;
           		this.animSpeed = animSpeed;
           		this.animCounter = 0;
           		this.frameNro =0 ;
           		this.goingBackwards = false;
         };
         var img = new ig.Image('media/A_button.png');
         this.a_button = new button(img,20);
         this.a_button2 = new button(img,20);
         this.lose_button = new button(img,20);

         this.player1SpawnTimer = new ig.Timer();
         this.player2SpawnTimer = new ig.Timer();
         this.player3SpawnTimer = new ig.Timer();
         this.player4SpawnTimer = new ig.Timer();

 Gamepad.mappings.one = [
        [ 'dpadUp', 'up' ],
        [ 'dpadDown', 'down' ],
        [ 'dpadLeft', 'left' ],
        [ 'dpadRight', 'right' ],
        
        [ 'faceButton0', 'action1' ],
        [ 'faceButton1', 'action2' ],
        [ 'faceButton2', 'action3' ],
        [ 'faceButton3', 'action4' ],
         [ 'rightShoulder1', 'action5' ],
            [ 'leftShoulder1', 'action6' ]
        
       
    ];
  Gamepad.mappings.two = [
        [ 'dpadUp', 'up_2' ],
        [ 'dpadDown', 'down_2' ],
        [ 'dpadLeft', 'left_2' ],
        [ 'dpadRight', 'right_2' ],
        
        [ 'faceButton0', 'action1_2' ],
        [ 'faceButton1', 'action2_2' ],
        [ 'faceButton2', 'action3_2' ],
        [ 'faceButton3', 'action4_2' ],
         [ 'rightShoulder1', 'action5_2' ],
            [ 'leftShoulder1', 'action6_2' ]
        
       
    ];
           ig.game.loadLevel(ig.global["LevelLevel_2"]);   


           



	},
	spawnPlayer: function(n){
			var player = ig.game.getEntityByName("player");
			var player2 = ig.game.getEntityByName("player2");
			var player3 = ig.game.getEntityByName("player3");
			var player4 = ig.game.getEntityByName("player4");
			var random = Math.floor(Math.random() * 3);
			var x_coord = 0;
			var y_coord = 0;
			switch(n){
				case 1:


					if((player2 || player3 || player4)
						&& life >= 0){life--; 

						if(random===0 && player2){x_coord = player2.pos.x; y_coord = player2.pos.y;}
						else if(random===1 && player3){x_coord = player3.pos.x; y_coord = player3.pos.y;}
						else if(random===2 && player4){x_coord = player4.pos.x; y_coord = player4.pos.y;}
						else{ ig.game.spawnPlayer(n); }
						ig.game.spawnEntity("EntityPlayer", x_coord , y_coord);
					}
					else if(life >= 0){ life--; ig.game.spawnEntity("EntityPlayer", 416, 4190);}
				break;
				case 2:
					if((player || player3 || player4)
						&& life >= 0){life--; 

						if(random===0 && player){x_coord = player.pos.x; y_coord = player.pos.y;}
						else if(random===1 && player3){x_coord = player3.pos.x; y_coord = player3.pos.y;}
						else if(random===2 && player4){x_coord = player4.pos.x; y_coord = player4.pos.y;}
						else{ ig.game.spawnPlayer(n); }
						ig.game.spawnEntity("EntityPlayer2", x_coord , y_coord);
					}
					else if(life >= 0){ life--; ig.game.spawnEntity("EntityPlayer2", 416, 4270);}
				break;
				case 3:
					if((player || player2 || player4)
						&& life >= 0){life--; 

						if(random===0 && player){x_coord = player.pos.x; y_coord = player.pos.y;}
						else if(random===1 && player2){x_coord = player2.pos.x; y_coord = player2.pos.y;}
						else if(random===2 && player4){x_coord = player4.pos.x; y_coord = player4.pos.y;}
						else{ ig.game.spawnPlayer(n);}
						ig.game.spawnEntity("EntityPlayer3", x_coord , y_coord);
					}
					else if(life >= 0){ life--; ig.game.spawnEntity("EntityPlayer3", 470, 4190);}
				break;
				case 4:
					if((player2 || player3 || player)
						&& life >= 0){life--; 

						if(random===0 && player){x_coord = player.pos.x; y_coord = player.pos.y;}
						else if(random===1 && player2){x_coord = player2.pos.x; y_coord = player2.pos.y;}
						else if(random===2 && player3){x_coord = player3.pos.x; y_coord = player3.pos.y;}
						else{ ig.game.spawnPlayer(n); }
						ig.game.spawnEntity("EntityPlayer4", x_coord , y_coord);
					}
					else if(life >= 0){ life--; ig.game.spawnEntity("EntityPlayer4", 470, 4270);}
				break;
			}
							
	},
	playerSpawning: function(n){

		switch(n)
		{
			case 1:
			if(Math.floor(ig.game.player1SpawnTimer.delta()) < 0)ig.game.font.draw(Math.abs(Math.floor(ig.game.player1SpawnTimer.delta())), ig.system.width - 492, 48);
			if(Math.floor(ig.game.player1SpawnTimer.delta()) >= 0){ 
				ig.game.player1Spawning = false;
				ig.game.spawnPlayer(n);
			}
			break;
			case 2:
			if(Math.floor(ig.game.player2SpawnTimer.delta()) < 0)ig.game.font.draw(Math.abs(Math.floor(ig.game.player2SpawnTimer.delta())), ig.system.width - 364, 48);
			if(Math.floor(ig.game.player2SpawnTimer.delta()) >= 0){ 
				ig.game.player2Spawning = false;
				ig.game.spawnPlayer(n);
			}
			break;
			case 3:
			if(Math.floor(ig.game.player3SpawnTimer.delta()) < 0)ig.game.font.draw(Math.abs(Math.floor(ig.game.player3SpawnTimer.delta())), ig.system.width - 236, 48);
			if(Math.floor(ig.game.player3SpawnTimer.delta()) >= 0){ 
				ig.game.player3Spawning = false;
				ig.game.spawnPlayer(n);
			}
			break;
			case 4:
			if(Math.floor(ig.game.player4SpawnTimer.delta()) < 0)ig.game.font.draw(Math.abs(Math.floor(ig.game.player4SpawnTimer.delta())), ig.system.width - 108, 48);
			if(Math.floor(ig.game.player4SpawnTimer.delta()) >= 0){ 
				ig.game.player4Spawning = false;
				ig.game.spawnPlayer(n);
			}
			break;
		}
	},
	updateTriggerList: function(ent){
		function Trigger(triggerName,type,perc,istriggered){

           		this.triggerName = triggerName;
           		this.type = type;
           		this.triggered =  istriggered;
           		this.triggerPerc = perc;

           }
           	this.triggerList.push(new Trigger(ent.triggerName,ent.type,ent.triggerPerc,ent.triggered));
           	
	},
	spawnMonster: function(type,shortestBuff,nick){

	switch(type){
	case 1:
            ig.game.spawnEntity("EntityMonster1" ,shortestBuff.pos.x, shortestBuff.pos.y, {secondname: nick});
	break;
	case 2:
			ig.game.spawnEntity("EntityMonster2" ,shortestBuff.pos.x, shortestBuff.pos.y, {secondname: nick });
	break;
}
	},
	triggerChecker: function(){
		var entL = ig.game.entities;
		for(var i = 0; i < this.triggerList.length; i++)
		{
			//if(this.triggerList[i].triggered === true) continue;
			var isTriggered = true;
			var triggerPerc = parseFloat(this.triggerList[i].triggerPerc)/100;
			var sameTriggerAmount = 0;
			var completeTriggerAmount = 0;
			var triggerPercBuf = 0;


			//As default disable standTrigger at start of the loop

			if(this.triggerList[i].type === "standTrigger")
			{
				this.triggerList[i].triggered = false;
			}
			for(var a = 0; a < entL.length; a++)
			{
				
				if(this.triggerList[i].triggerName === entL[a].triggerName) {

					if(entL[a].name != "door")completeTriggerAmount++;
					
					if(entL[a].triggered == true){
						if(entL[a].name != "door")sameTriggerAmount++;
					}
				}
			}
			triggerPercBuf = sameTriggerAmount / completeTriggerAmount;
		
			if(triggerPerc > triggerPercBuf) {
					isTriggered = false;

			}
			if(isTriggered === true){
				this.triggerList[i].triggered = true;
			}
			  
		
		}
	},
	update: function() {
		// Update all entities and backgroundMaps
		Gamepad.handleInput();
		var player = ig.game.getEntityByName("player");
		var player2 = ig.game.getEntityByName("player2");

		if(ig.input.pressed('action1') && this.player1Initiated === false){

			var x_coord = 0; var y_coord = 0;
			if(life >= 0){
				if(player2) {x_coord = player2.pos.x; y_coord = player2.pos.y;}
				else{x_coord = 416; y_coord = 4190;}
				ig.game.spawnEntity("EntityPlayer", x_coord , y_coord);
				life--;
				this.player1Initiated = true;
			}
			
		}
		if(ig.input.pressed('action1_2') && this.player2Initiated === false){
			var x_coord = 0; var y_coord = 0;
			if(life >= 0){
				if(player){ x_coord = player.pos.x; y_coord = player.pos.y;}
				else{x_coord = 416; y_coord = 4270;}
				ig.game.spawnEntity("EntityPlayer2", x_coord , y_coord);
				life--;
				this.player2Initiated = true;
			}
			
		}
		
		

		if((player && player.pos.x < 4200 && player.pos.x > 4000 && player.pos.y > 256 && player.pos.y < 448)
			||
			(player2 && player2.pos.x < 4200 && player2.pos.x > 4000 && player2.pos.y > 256 && player2.pos.y < 448))
		{

		}
		var game = ig.game;

		if(player){
			game.screen.x = player.pos.x - ig.system.width / 2; 
			game.screen.y = player.pos.y - ig.system.height  / 2; 
		}
		else if(player2)
		{
			game.screen.x = player2.pos.x - ig.system.width / 2; 
			game.screen.y = player2.pos.y - ig.system.height  / 2; 
		}
		

		this.triggerChecker();
		if(this.delayUpdate.delta() > 0){
			this.delayUpdate.set(5);
			getData();
		}
		this.checkIfCanSpawn();

		
		this.parent();
		
		// Add your own, additional update code here
	},
	checkIfCanSpawn: function(){

		var player = ig.game.getEntityByName("player");
		var player2 = ig.game.getEntityByName("player2");
		var player3 = ig.game.getEntityByName("player3");
		var player4 = ig.game.getEntityByName("player4");
		if(life < 0){

					if(player ||player2||player3||player4){
						if(!player)	ig.game.player1CannotSpawn = true;
						if(!player2)ig.game.player2CannotSpawn = true;
						if(!player3)ig.game.player3CannotSpawn = true;
						if(!player4)ig.game.player4CannotSpawn = true;
						
					}
					else{ig.game.losingInitiated = true;}
		}
				
	},
	draw: function() {
		// Draw all entities and backgroundMaps

	

	

		this.parent();
			var player = ig.game.getEntityByName("player");
			var player2 = ig.game.getEntityByName("player2");
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
			var player_hp_mod = 0;
			var player2_hp_mod = 0;
			if(player){
				player_hp_mod = player.health / player.maxHealth;
			}
			if(player2){
				player2_hp_mod = player2.health / player2.maxHealth;
			}
		
		
		ig.game.red_ui_hp.draw(ig.system.width - 508, 96, 0, 0, 54 * player_hp_mod, 7); 
		ig.game.blue_ui_hp.draw(ig.system.width - 380, 96, 0, 0, 54 * player2_hp_mod, 7); 


		for(var z = 0; z < ig.game.entities.length ; z++)
		{
			if(ig.game.entities[z].name === "monster")
			{
				var bufString = ig.game.entities[z].secondname.toString();
				ig.game.font.draw(bufString,ig.game.entities[z].pos.x - ig.game.screen.x,ig.game.entities[z].pos.y - 32 - ig.game.screen.y)
			}
		}

		
		if((player && player.pos.x < 4200 && player.pos.x > 4000 && player.pos.y > 256 && player.pos.y < 448)
			||
			(player2 && player2.pos.x < 4200 && player2.pos.x > 4000 && player2.pos.y > 256 && player2.pos.y < 448))
		{
			ig.game.font.draw("YOU WIN!!! " , ig.system.width/2, ig.system.height/2);
		}
		ig.game.font.draw("Assault ID: " + id, 32, 32);

		if(this.losingInitiated || ig.game.player1CannotSpawn || ig.game.player1Spawning){ig.game.ui_helmet.drawTile(ig.system.width - 512, 32, 2, 64);}
		else if(this.player1Initiated == false){

			ig.game.drawAButton(this.a_button,ig.system.width-496,32);
			
			
		}
		else{ig.game.ui_helmet.drawTile(ig.system.width - 512, 32, 0, 64);}

		if(this.losingInitiated || ig.game.player2CannotSpawn || ig.game.player2Spawning){ig.game.ui_helmet.drawTile(ig.system.width - 384, 32, 2, 64);}
		else if(this.player2Initiated == false){
			ig.game.drawAButton(this.a_button2,ig.system.width-368,32);
		}
		else{ig.game.ui_helmet.drawTile(ig.system.width - 384, 32, 1, 64);}
		




		if(this.losingInitiated === true) {

			if(
				ig.input.pressed('action1') ||
				ig.input.pressed('action1_2')
				){

				life = 2;
				ig.system.setGame(MyGame);
			}
			ig.game.drawLose(ig.system.width - 384, 32);

		}
		else{
			if(ig.game.player1Spawning === true) {ig.game.playerSpawning(1);}
			if(ig.game.player2Spawning === true) {ig.game.playerSpawning(2);}
			if(ig.game.player3Spawning === true) {ig.game.playerSpawning(3);}
			if(ig.game.player4Spawning === true) {ig.game.playerSpawning(4);}
		}
		for(var i = 0; i < life+1; i++)
		{
			ig.game.heart.draw((ig.system.width - 820) + i*64, 32);
		
		}
		
		/*if(this.player1Initiated == false){
			
		}
		if(this.player1Initiated == false){
			
		}*/
	},
	moveItems: function(a){
		if(a.pad && !(Math.abs(a.pad.rightStickX) > 0.50 && Math.abs(a.pad.rightStickY) > 0.50))
						{
							
							a.circle.pos.x += a.pos.x - a.prevX;
							a.circle.pos.y += a.pos.y - a.prevY;

							a.prevX = a.pos.x;
							a.prevY = a.pos.y;

							a.isColliding = true;
		}
	},
	drawAButton: function(a_button,x,y){

		if(a_button.animCounter > 5 ){ a_button.animCounter = 0;
			if(a_button.frameNro == 3 && a_button.goingBackwards===false){ 
				a_button.goingBackwards = true;}
			else if(a_button.frameNro == 0 && a_button.goingBackwards===true){ 
				a_button.goingBackwards = false;}
			(a_button.goingBackwards) ? a_button.frameNro-- : a_button.frameNro++;
		}
		else{
			a_button.animCounter++;
			
			
		}
		
		a_button.img.drawTile(x, y,a_button.frameNro,32);
	},
	drawLose: function(){
		ig.game.font.draw("Game over! " , ig.system.width/2 - 128, ig.system.height/2);
		ig.game.font.draw("Press " , ig.system.width/2 - 160, ig.system.height/2 + 64);
		ig.game.font.draw(" to continue..." , ig.system.width/2, ig.system.height/2 + 64);

		ig.game.drawAButton(ig.game.lose_button,ig.system.width/2 - 24 , ig.system.height/2 + 64);
	}
	
	
	
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2

ig.main( '#canvas', MyGame, 60, 1280,720, 1 );

});
