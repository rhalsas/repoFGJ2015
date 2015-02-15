ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	
	'game.entities.player',
	'game.entities.player2',
	'game.entities.player3',
	'game.entities.player4',
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
	blue_ui_hp: new ig.Image('media/blue_ui_hp_64.png'),
	red_ui_hp: new ig.Image('media/red_ui_hp_64.png'),
	green_ui_hp: new ig.Image('media/green_ui_hp_64.png'),
	pink_ui_hp: new ig.Image('media/pink_ui_hp_64.png'),
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
	


	gamepadSpot: 3,

	keyboardSpot: 1,

	noPadsAvailable: false,

	playerArray:  new Array(),
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

	zoomLevel: 1,

	prevX: 0,
	prevY: 0,

	targetX: 0,
	targetY: 0,
	player1Keyboard: false,
	player2Keyboard: false,
	player3Keyboard: false,
	player4Keyboard: false,

	player1ControllerNro: 0,
	player2ControllerNro: 0,
	player3ControllerNro: 0,
	player4ControllerNro: 0,

	init: function() {
		// Initialize your game here; bind keys etc.


		ig.music.add( 'media/saga_musix_-_10000m_below_sea_level.ogg' );

		ig.music.volume = 1;
		ig.music.play();
		ig.music.loop = true;
		this.delayUpdate = new ig.Timer();
		this.delayUpdate.set(1);
		
		insertData();


		function button(animSpeed){
				this.img = new ig.Image('media/a_button.png');
           		this.img_e = new ig.Image('media/a_button_enter.png');
           		this.img_s = new ig.Image('media/a_button_space.png');
           		this.img_d = new ig.Image('media/a_button_disc.png');
           		this.loopedOnce = false;
           		this.drawOrder = 0;
           		this.animSpeed = animSpeed;
           		this.keyboard1Avail = true;
           		this.keyboard2Avail = true;
           		this.gamepadAvail = true;
           		this.animCounter = 0;
           		this.frameNro =0 ;
           		this.goingBackwards = false;
         };  
   
       
         this.a_button = new button(40);
         this.a_button2 = new button(40);
         this.a_button3 = new button(40);
         this.a_button4 = new button(40);
         this.lose_button = new button(20);

         this.player1SpawnTimer = new ig.Timer();
         this.player2SpawnTimer = new ig.Timer();
         this.player3SpawnTimer = new ig.Timer();
         this.player4SpawnTimer = new ig.Timer();

         ig.input.bind( ig.KEY.W, 'up_5' );
         ig.input.bind( ig.KEY.S, 'down_5' );
         ig.input.bind( ig.KEY.A, 'left_5' );
         ig.input.bind( ig.KEY.D, 'right_5' );

         ig.input.bind( ig.KEY.SPACE, 'action1_5' );
	



            ig.input.bind( ig.KEY.UP_ARROW, 'up_6' );
         ig.input.bind( ig.KEY.DOWN_ARROW, 'down_6' );
         ig.input.bind( ig.KEY.LEFT_ARROW, 'left_6' );
         ig.input.bind( ig.KEY.RIGHT_ARROW, 'right_6' );

         ig.input.bind( ig.KEY.ENTER, 'action1_6' );
    
   

   		    ig.input.bind( ig.KEY.F, 'action5_6' );
         ig.input.bind( ig.KEY.G, 'action6_6' );
         ig.input.bind( ig.KEY.CTRL, 'action5_5' );
         ig.input.bind( ig.KEY.SHIFT, 'action6_5' );



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
     Gamepad.mappings.three = [
        [ 'dpadUp', 'up_3' ],
        [ 'dpadDown', 'down_3' ],
        [ 'dpadLeft', 'left_3' ],
        [ 'dpadRight', 'right_3' ],  
        [ 'faceButton0', 'action1_3' ],
        [ 'faceButton1', 'action2_3' ],
        [ 'faceButton2', 'action3_3' ],
        [ 'faceButton3', 'action4_3' ],
        [ 'rightShoulder1', 'action5_3' ],
        [ 'leftShoulder1', 'action6_3' ]
        
       
    ];
  Gamepad.mappings.four = [
        [ 'dpadUp', 'up_4' ],
        [ 'dpadDown', 'down_4' ],
        [ 'dpadLeft', 'left_4' ],
        [ 'dpadRight', 'right_4' ], 
        [ 'faceButton0', 'action1_4' ],
        [ 'faceButton1', 'action2_4' ],
        [ 'faceButton2', 'action3_4' ],
        [ 'faceButton3', 'action4_4' ],
        [ 'rightShoulder1', 'action5_4' ],
        [ 'leftShoulder1', 'action6_4' ]
        
       
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
						if(ig.game.player1Keyboard) {
						ig.game.player1ControllerNro = -1;
						bufferVal = ig.game.keyboardSpot;
					
						}	
						else {
						bufferVal = -1;

					
						}

						
						ig.game.spawnEntity("EntityPlayer", x_coord , y_coord, {playerNro: ig.game.player1ControllerNro,  keyboardRegistered: ig.game.player1Keyboard, keyboardNro: ig.game.keyboardSpot});
					}
					else if(life >= 0){ life--; ig.game.spawnEntity("EntityPlayer", 416, 4190, {playerNro: ig.game.player1ControllerNro,  keyboardRegistered: ig.game.player1Keyboard, keyboardNro: ig.game.keyboardSpot});}
				
				break;
				case 2:
					if((player || player3 || player4)
						&& life >= 0){life--; 

						if(random===0 && player){x_coord = player.pos.x; y_coord = player.pos.y;}
						else if(random===1 && player3){x_coord = player3.pos.x; y_coord = player3.pos.y;}
						else if(random===2 && player4){x_coord = player4.pos.x; y_coord = player4.pos.y;}
						else{ ig.game.spawnPlayer(n); }
						if(ig.game.player2Keyboard) {
						ig.game.player2ControllerNro = -1;
						bufferVal = ig.game.keyboardSpot;
					
						}	
						else {
						bufferVal = -1;

					
						}
						ig.game.spawnEntity("EntityPlayer2", x_coord , y_coord, {playerNro: ig.game.player2ControllerNro,  keyboardRegistered: ig.game.player2Keyboard, keyboardNro: ig.game.keyboardSpot});
					}
					else if(life >= 0){ life--; ig.game.spawnEntity("EntityPlayer2", 416 , 4270, {playerNro: ig.game.player2ControllerNro,  keyboardRegistered: ig.game.player2Keyboard, keyboardNro: ig.game.keyboardSpot});}
				
				break;
				case 3:
					if((player || player2 || player4)
						&& life >= 0){life--; 

						if(random===0 && player){x_coord = player.pos.x; y_coord = player.pos.y;}
						else if(random===1 && player2){x_coord = player2.pos.x; y_coord = player2.pos.y;}
						else if(random===2 && player4){x_coord = player4.pos.x; y_coord = player4.pos.y;}
						else{ ig.game.spawnPlayer(n);}
						if(ig.game.player3Keyboard) {
						ig.game.player3ControllerNro = -1;
						bufferVal = ig.game.keyboardSpot;
					
						}	
						else {
						bufferVal = -1;

					
						}
						ig.game.spawnEntity("EntityPlayer3", x_coord , y_coord, {playerNro: ig.game.player3ControllerNro,  keyboardRegistered: ig.game.player3Keyboard, keyboardNro: ig.game.keyboardSpot});
					}
					else if(life >= 0){ life--; ig.game.spawnEntity("EntityPlayer3", 508 ,4190, {playerNro: ig.game.player3ControllerNro,  keyboardRegistered: ig.game.player3Keyboard, keyboardNro: ig.game.keyboardSpot});}
				break;
				case 4:
					if((player2 || player3 || player)
						&& life >= 0){life--; 

						if(random===0 && player){x_coord = player.pos.x; y_coord = player.pos.y;}
						else if(random===1 && player2){x_coord = player2.pos.x; y_coord = player2.pos.y;}
						else if(random===2 && player3){x_coord = player3.pos.x; y_coord = player3.pos.y;}
						else{ ig.game.spawnPlayer(n); }
						if(ig.game.player4Keyboard) {
						ig.game.player4ControllerNro = -1;
						bufferVal = ig.game.keyboardSpot;
					
						}	
						else {
						bufferVal = -1;

					
						}
						ig.game.spawnEntity("EntityPlayer4", x_coord , y_coord, {playerNro: ig.game.player4ControllerNro,  keyboardRegistered: ig.game.player4Keyboard, keyboardNro: ig.game.keyboardSpot});
					}
					else if(life >= 0){ life--; ig.game.spawnEntity("EntityPlayer4", 508 , 4270, {playerNro: ig.game.player4ControllerNro,  keyboardRegistered: ig.game.player4Keyboard, keyboardNro: ig.game.keyboardSpot});}
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
	inputPressed: function(){
		if(
			ig.input.pressed('action1_5') 
			||
			ig.input.pressed('action1_6')
			)			
		{
			return "keyboard";
		}
		else if(
			ig.input.pressed('action1')  
			|| 
			ig.input.pressed('action1_2') 
			|| 
			ig.input.pressed('action1_3')
			|| 
			ig.input.pressed('action1_4')
			){

			return "gamepad";
		}
		else{
			return false;
		}


	},
	checkPlayer: function(isKeyboard){
		if(isKeyboard === "keyboard")
		{
			if(this.player1Initiated === false && this.player1ControllerNro !== -1)
			{
				ig.game.player1Keyboard = true;
			}
			else if(this.player2Initiated === false && this.player2ControllerNro !== -1)
			{
				ig.game.player2Keyboard = true;
			}
			else if(this.player3Initiated === false && this.player3ControllerNro !== -1)
			{
				ig.game.player3Keyboard = true;
			}
			else if(this.player4Initiated === false && this.player4ControllerNro !== -1)
			{
				ig.game.player4Keyboard = true;
			}
							
		}
		
	},
	checkSpawnLoc: function(n)
	{

			var player = ig.game.getEntityByName("player");
			var player2 = ig.game.getEntityByName("player2");
			var player3 = ig.game.getEntityByName("player3");
			var player4 = ig.game.getEntityByName("player4");
		var x_coord = 0; var y_coord = 0;
		switch(n)
		{
			case 1:
			if(life >= 0){
				if(player2) {x_coord = player2.pos.x; y_coord = player2.pos.y;}
				else if(player3) {x_coord = player3.pos.x; y_coord = player3.pos.y;}
				else if(player4) {x_coord = player4.pos.x; y_coord = player4.pos.y;}
				else{x_coord = 416; y_coord = 4190;}
				var bufferVal = -1;
				if(ig.game.player1Keyboard) {
					ig.game.player1ControllerNro = -1;
					bufferVal = ig.game.keyboardSpot;
					
				}
				else if(Gamepad.padExists(ig.game.gamepadSpot)){
					ig.game.player1ControllerNro = ig.game.gamepadSpot;

					
				}
			
					else{return;}

				ig.game.spawnEntity("EntityPlayer", x_coord , y_coord, {playerNro: ig.game.player1ControllerNro,  keyboardRegistered: ig.game.player1Keyboard, keyboardNro : bufferVal });
				this.playerArray.push(ig.game.getEntityByName("player"));

				life--;
				this.player1Initiated = true;
			}
			break;
			case 2:
			if(life >= 0){
				if(player){ x_coord = player.pos.x; y_coord = player.pos.y;}
				else if(player3) {x_coord = player3.pos.x; y_coord = player3.pos.y;}
				else if(player4) {x_coord = player4.pos.x; y_coord = player4.pos.y;}
				else{x_coord = 416; y_coord = 4270;}
				var bufferVal = -1;
				if(ig.game.player2Keyboard){ ig.game.player2ControllerNro = -1;
				bufferVal = ig.game.keyboardSpot;}
				else  if(Gamepad.padExists(ig.game.gamepadSpot)){ig.game.player2ControllerNro = ig.game.gamepadSpot;}
					else{return;}

				ig.game.spawnEntity("EntityPlayer2", x_coord , y_coord, {playerNro: ig.game.player2ControllerNro, keyboardRegistered: ig.game.player2Keyboard, keyboardNro : bufferVal});
				this.playerArray.push(ig.game.getEntityByName("player2"));

				life--;
				this.player2Initiated = true;
			}
			break;
			case 3:
			if(life >= 0){
				if(player){ x_coord = player.pos.x; y_coord = player.pos.y;}
				else if(player2) {x_coord = player2.pos.x; y_coord = player2.pos.y;}
				else if(player4) {x_coord = player4.pos.x; y_coord = player4.pos.y;}
				else{x_coord = 508; y_coord = 4190;}
				var bufferVal = -1;
				if(ig.game.player3Keyboard){ig.game.player3ControllerNro = -1;
				bufferVal = ig.game.keyboardSpot;}
				else if(Gamepad.padExists(ig.game.gamepadSpot)){ig.game.player3ControllerNro = ig.game.gamepadSpot;}
				else{return;}

			

				ig.game.spawnEntity("EntityPlayer3", x_coord , y_coord, {playerNro: ig.game.player3ControllerNro, keyboardRegistered: ig.game.player3Keyboard, keyboardNro : bufferVal});
				this.playerArray.push(ig.game.getEntityByName("player3"));

				life--;
				this.player3Initiated = true;
			}
			break;
			case 4:
			if(life >= 0){
				if(player){ x_coord = player.pos.x; y_coord = player.pos.y;}
				else if(player2) {x_coord = player2.pos.x; y_coord = player2.pos.y;}
				else if(player3) {x_coord = player3.pos.x; y_coord = player3.pos.y;}
				else{x_coord = 508; y_coord = 4270;}
				var bufferVal = -1;
				if(ig.game.player4Keyboard) {ig.game.player4ControllerNro = -1;
				bufferVal = ig.game.keyboardSpot;}
				else if(Gamepad.padExists(ig.game.gamepadSpot)){ig.game.player4ControllerNro = ig.game.gamepadSpot;}
				else{return;}
				ig.game.spawnEntity("EntityPlayer4", x_coord , y_coord, {playerNro: ig.game.player4ControllerNro, keyboardRegistered: ig.game.player4Keyboard, keyboardNro : bufferVal});
				this.playerArray.push(ig.game.getEntityByName("player4"));
				
				
				life--;
				this.player4Initiated = true;
			}
			break;
		}
	},
	checkIfPadsAvailable: function(){

	
	
				
			},
	update: function() {
		// Update all entities and backgroundMaps
		Gamepad.handleInput();
		var gEnt = ig.game.entities;
		ig.game.keyboardSpot = 1;
		ig.game.gamepadSpot = 0;
		for(var i = 0; i < gEnt.length; i++)
		{
			if(gEnt[i].name === "player"){
				if(gEnt[i].keyboardRegistered)ig.game.keyboardSpot--;
				if(!gEnt[i].playerNro)ig.game.gamepadSpot++;

			}
			if(gEnt[i].name === "player2"){
				if(gEnt[i].keyboardRegistered)ig.game.keyboardSpot--;
				if(!gEnt[i].playerNro)ig.game.gamepadSpot++;
				
			}
			if(gEnt[i].name === "player3"){
				if(gEnt[i].keyboardRegistered)ig.game.keyboardSpot--;
				if(!gEnt[i].playerNro)ig.game.gamepadSpot++;
				
			}
			if(gEnt[i].name === "player4"){
				if(gEnt[i].keyboardRegistered)ig.game.keyboardSpot--;
				if(!gEnt[i].playerNro)ig.game.gamepadSpot++;
				
			}
		}

		if(Gamepad.padExists(ig.game.gamepadSpot))ig.game.noPadsAvailable = false;
		else{ig.game.noPadsAvailable = true;}	

	

	//	ig.game.zoomLevel -= 0.01;

			var player = ig.game.getEntityByName("player");
			var player2 = ig.game.getEntityByName("player2");
			var player3 = ig.game.getEntityByName("player3");
			var player4 = ig.game.getEntityByName("player4");

		if( 
			(ig.game.inputPressed() === "gamepad" || ig.game.inputPressed() === "keyboard" )
			){
		
			if(ig.game.inputPressed() === "keyboard" && ig.game.keyboardSpot > -1)ig.game.checkPlayer("keyboard");
			else if(ig.game.gamepadSpot > 3) return;
			var playernum = 1;
		
			if(this.player1Initiated)
			{
				playernum++;
			}
			if(this.player2Initiated)
			{
				playernum++;
			}
			if(this.player3Initiated)
			{
				playernum++;
			}
			if(this.player4Initiated)
			{
				playernum++;
			}
			ig.game.checkSpawnLoc(playernum);
			
			
		
			
			
		}
		
		
		
		
		

		if((player && player.pos.x < 4200 && player.pos.x > 4000 && player.pos.y > 256 && player.pos.y < 448)
			||
			(player2 && player2.pos.x < 4200 && player2.pos.x > 4000 && player2.pos.y > 256 && player2.pos.y < 448)
			||
			(player3 && player3.pos.x < 4200 && player3.pos.x > 4000 && player3.pos.y > 256 && player3.pos.y < 448)
			||
			(player4 && player4.pos.x < 4200 && player4.pos.x > 4000 && player4.pos.y > 256 && player4.pos.y < 448)
			)
		{

		}
		var game = ig.game;

		if(player){
			this.targetX  = player.pos.x - ig.system.width / 2; 
			this.targetY  = player.pos.y - ig.system.height  / 2; 
		}
		else if(player2)
		{
			this.targetX  = player2.pos.x - ig.system.width / 2; 
			this.targetY  = player2.pos.y - ig.system.height  / 2; 
		}
		else if(player3)
		{
			this.targetX  = player2.pos.x - ig.system.width / 2; 
			this.targetY = player2.pos.y - ig.system.height  / 2; 
		}
		else if(player4)
		{
			this.targetX = player2.pos.x - ig.system.width / 2; 
			this.targetY  = player2.pos.y - ig.system.height  / 2; 
		}
		
		if(
			this.targetX != game.screen.x)

		{
			game.screen.x += (this.targetX - game.screen.x)/30;
			game.screen.y += (this.targetY - game.screen.y)/30;
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
		var player3 = ig.game.getEntityByName("player3");
		var player4 = ig.game.getEntityByName("player4");
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
			var player_hp_mod = 0;
			var player2_hp_mod = 0;
			var player3_hp_mod = 0;
			var player4_hp_mod = 0;
			if(player){
				player_hp_mod = player.health / player.maxHealth;
			}
			if(player2){
				player2_hp_mod = player2.health / player2.maxHealth;
			}
			if(player3){
				player3_hp_mod = player3.health / player3.maxHealth;
			}
			if(player4){
				player4_hp_mod = player4.health / player4.maxHealth;
			}
		
		
		ig.game.red_ui_hp.draw(ig.system.width - 508, 96, 0, 0, 54 * player_hp_mod, 7); 
		ig.game.blue_ui_hp.draw(ig.system.width - 380, 96, 0, 0, 54 * player2_hp_mod, 7);
		ig.game.green_ui_hp.draw(ig.system.width - 252, 96, 0, 0, 54 * player3_hp_mod, 7); 
		ig.game.pink_ui_hp.draw(ig.system.width - 124, 96, 0, 0, 54 * player4_hp_mod, 7);  


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

		if(this.losingInitiated || ig.game.player1CannotSpawn || ig.game.player1Spawning){ig.game.ui_helmet.drawTile(ig.system.width - 512, 32, 4, 64);}
		else if(this.player1Initiated == false){

			ig.game.drawAButton(this.a_button,ig.system.width-496,32);
			
			
		}
		else{ig.game.ui_helmet.drawTile(ig.system.width - 512, 32, 0, 64);}

		if(this.losingInitiated || ig.game.player2CannotSpawn || ig.game.player2Spawning){ig.game.ui_helmet.drawTile(ig.system.width - 384, 32, 4, 64);}
		else if(this.player2Initiated == false){
			ig.game.drawAButton(this.a_button2,ig.system.width-368,32);
		}
		else{ig.game.ui_helmet.drawTile(ig.system.width - 384, 32, 1, 64);}

		if(this.losingInitiated || ig.game.player3CannotSpawn || ig.game.player3Spawning){ig.game.ui_helmet.drawTile(ig.system.width - 256, 32, 4, 64);}
		else if(this.player3Initiated == false){
			ig.game.drawAButton(this.a_button3,ig.system.width-240,32);
		}
		else{ig.game.ui_helmet.drawTile(ig.system.width - 256, 32, 2, 64);}

		if(this.losingInitiated || ig.game.player4CannotSpawn || ig.game.player4Spawning){ig.game.ui_helmet.drawTile(ig.system.width - 128, 32, 4, 64);}
		else if(this.player4Initiated == false){
			ig.game.drawAButton(this.a_button4,ig.system.width-112,32);
		}
		else{ig.game.ui_helmet.drawTile(ig.system.width - 128, 32, 3, 64);}
		
		




		if(this.losingInitiated === true) {

			if(
				ig.input.pressed('action1') ||
				ig.input.pressed('action1_2')
				){

				life = 3;
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

    	ig.system.context.restore();
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
				a_button.goingBackwards = false;
				a_button.drawOrder++;
			}
			(a_button.goingBackwards) ? a_button.frameNro-- : a_button.frameNro++;
		}
		else{
			a_button.animCounter++;
			
			
		}
		if(a_button.drawOrder > 2)
		{
			a_button.drawOrder = 0;
			
		}

		
		
		if(a_button.drawOrder === 0 	){
			if(ig.game.noPadsAvailable)a_button.img_d.drawTile(x, y, a_button.frameNro, 32);
			else a_button.img.drawTile(x, y, a_button.frameNro, 32);
		}
		if(a_button.drawOrder === 1 	&& ig.game.keyboardSpot >-1){a_button.img_e.drawTile(x, y, a_button.frameNro, 32);}
		else if(a_button.drawOrder === 1 ){
			if(ig.game.noPadsAvailable)a_button.img_d.drawTile(x, y, a_button.frameNro, 32);
				else a_button.img.drawTile(x, y, a_button.frameNro, 32);
		}
		if(a_button.drawOrder === 2 	&& ig.game.keyboardSpot > 0){a_button.img_s.drawTile(x, y, a_button.frameNro, 32);}
		else if(a_button.drawOrder === 2 ){
			if(ig.game.noPadsAvailable)a_button.img_d.drawTile(x, y, a_button.frameNro, 32);
				else a_button.img.drawTile(x, y, a_button.frameNro, 32);

		}
		
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
