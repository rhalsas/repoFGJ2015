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
	triggerList: new Array(),
	init: function() {
		// Initialize your game here; bind keys etc.

		ig.music.add( 'media/saga_musix_-_10000m_below_sea_level.ogg' );

		ig.music.volume = 1;
		ig.music.play();
		ig.music.loop = true;
		this.delayUpdate = new ig.Timer();
		this.delayUpdate.set(1);
		createPW();
		insertData();

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


           function Trigger(triggerName,type){

           		this.triggerName = triggerName;
           		this.type = type;
           		this.triggered =  false;
           }
			var allowedToAdd = true;
           for(var b = 0; b < ig.game.entities.length; b++)
           {
           		if(ig.game.entities[b].triggerable)
           		{
           			for(var c = 0; c < this.triggerList.length; c++)
           			{
           				allowedToAdd = true;
           				if(ig.game.entities[b].name === "doorTrigger" && this.triggerList[c].triggerName === ig.game.entities[b].triggerName)
           				{
           					allowedToAdd = false; 
           					break;
           				}
           			}

           			if(allowedToAdd === true  && ig.game.entities[b].name === "doorTrigger")
           			{
           				var type = "";
           			
           				if(ig.game.entities[b].toggleTrigger === "true"){		type = "toggleTrigger";}
           				else if(ig.game.entities[b].standTrigger === "true"){	type = "standTrigger";}
           				this.triggerList.push(new Trigger(ig.game.entities[b].triggerName,type));
           			}
           		}
           } 



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
			for(var a = 0; a < entL.length; a++)
			{
			
				if(this.triggerList[i].triggerName === entL[a].triggerName && entL[a].triggered === false) {
					isTriggered = false;
					break;
				}
			}
			if(isTriggered === true){
				this.triggerList[i].triggered = true;
			}
			else if(this.triggerList[i].type === "standTrigger"){ 
				this.triggerList[i].triggered = false;
			}     
		}
	},
	update: function() {
		// Update all entities and backgroundMaps
		Gamepad.handleInput();
		var player = ig.game.getEntityByName("player");
		if(!player) return;

		if(player.pos.x < 4200 && player.pos.x > 4000 && player.pos.y > 256 && player.pos.y < 448)
		{

		}
		var game = ig.game;
		game.screen.x = player.pos.x - ig.system.width / 2; 
		game.screen.y = player.pos.y - ig.system.height  / 2; 

		this.triggerChecker();
		if(this.delayUpdate.delta() > 0){
			this.delayUpdate.set(5);
			getData();
		}
		if(life <= 0){ig.game.drawLose();}
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps

		ig.game.changePlayerDir();

	

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
		ig.game.ui_helmet.drawTile(ig.system.width - 256, 32, 0, 64);
		ig.game.ui_helmet.drawTile(ig.system.width - 512, 32, 1, 64);
		ig.game.red_ui_hp.draw(ig.system.width - 252, 96, 0, 0, 54 * player_hp_mod, 7); 
		ig.game.blue_ui_hp.draw(ig.system.width - 507, 96, 0, 0, 54 * player2_hp_mod, 7); 


		for(var z = 0; z < ig.game.entities.length ; z++)
		{
			if(ig.game.entities[z].name === "monster")
			{
				var bufString = ig.game.entities[z].secondname.toString();
				ig.game.font.draw(bufString,ig.game.entities[z].pos.x - ig.game.screen.x,ig.game.entities[z].pos.y - 32 - ig.game.screen.y)
			}
		}

		if(player.pos.x < 4200 && player.pos.x > 4000 && player.pos.y > 256 && player.pos.y < 448)
		{
			ig.game.font.draw("YOU WIN!!! " , ig.system.width/2, ig.system.height/2);
		}
		ig.game.font.draw("Assault ID: " + id, 32, 32);
	},
	drawLose: function(){
		ig.game.font.draw("YOU LOSE!!! " , ig.system.width/2, ig.system.height/2);
	},
	changePlayerDir: function(){
		var circle1 = ig.game.getEntityByName("circle1");
		var circle2 = ig.game.getEntityByName("circle2");
		var player = ig.game.getEntityByName("player");
		var player2 = ig.game.getEntityByName("player2");
		if(player && circle1) player.currentAnim.angle = player.angleTo(circle1);
		if(player2 && circle2) player2.currentAnim.angle = player2.angleTo(circle2);
		
	
		
	},
	sendRightAxis: function(pad,mappings){
	
		var circle1 = ig.game.getEntityByName("circle1");
		var circle2 = ig.game.getEntityByName("circle2");
		var player = ig.game.getEntityByName("player");
		var player2 = ig.game.getEntityByName("player2");
	

		
		if(mappings && mappings == Gamepad.mappings.one){

		if(player && circle1)  {
			circle1.pos.x = (player.pos.x + player.size.x/2) + (pad.rightStickX * 50) - (circle1.size.x/2);
			circle1.pos.y = (player.pos.y + player.size.y/2) + (pad.rightStickY * 50) - (circle1.size.y/2);
		}
		}

		if(mappings && mappings == Gamepad.mappings.two){
		if(player2 && circle2)  {
			circle2.pos.x = (player2.pos.x + player2.size.x/2) + (pad.rightStickX * 50) - (circle2.size.x/2);
			circle2.pos.y = (player2.pos.y + player2.size.y/2) + (pad.rightStickY * 50) - (circle2.size.y/2);
		}
		}
	



	},
	sendLeftAxis: function(pad,mappings){
		
		var player = ig.game.getEntityByName("player");
		var player2 = ig.game.getEntityByName("player2");



		if(mappings != null && player != null && mappings == Gamepad.mappings.one){
			
			if(Math.abs(pad.leftStickX) > 0.20 )
		{
			player.vel.x = pad.leftStickX * 115;
		}
		else{player.vel.x = 0;}
		
		if(Math.abs(pad.leftStickY) > 0.20 )
		{
			player.vel.y = pad.leftStickY * 115;
		}
		else{player.vel.y = 0;}

		}
		

		if(mappings != null && player2 != null && mappings == Gamepad.mappings.two){
		
			if(Math.abs(pad.leftStickX) > 0.20 )
		{
			player2.vel.x = pad.leftStickX * 115;
		}
		else{player2.vel.x = 0;}
		
		if(Math.abs(pad.leftStickY) > 0.20 )
		{
			player2.vel.y = pad.leftStickY * 115;
		}

		else{player2.vel.y = 0;}

		}


	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 1280,720, 1 );

});
