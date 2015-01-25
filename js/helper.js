var id = "";
var life = 3;
var spawnEnemyList = new Array();




function insertData(){
	







	var playerJSON ={"player1": {"hp":"100", "x":"0", "y":"0"},"player2": {"hp":"100","x":"0", "y":"0"}};


	 $.ajax({
                                url: "http://galezki.cloudapp.net/backend/api.php?action=insertplayerstatus",
                                type: 'POST',
                                data: "sessionId=" + id + "&data=herp",
                                success: function(data){
                                      
                                }
                        });



}

function getData(){
	







    var player = ig.game.getEntityByName("player");
	var player2 = ig.game.getEntityByName("player2");


    var entL = ig.game.entities;
    var shortestBuff= null;
    for(var d = 0; d < entL.length; d++)
    {
        if(entL[d].name === "spawner")
        {
            if(!shortestBuff){shortestBuff = entL[d];}

            else if(player.distanceTo(shortestBuff) > player.distanceTo(entL[d])){shortestBuff = entL[d];}
        }
    }
    var buffer = 0;
  
    if(shortestBuff) buffer = shortestBuff.secondname;

    var queryJSON = {sessionId: id, room: buffer};
   
	if(!player)return;

	if(!player2)return;

    var p1health = Math.floor(player.health);
    var p1x = Math.floor(player.pos.x);
    var p1y = Math.floor(player.pos.y);

    var p2health = Math.floor(player2.health);
    var p2x = Math.floor(player2.pos.x);
    var p2y = Math.floor(player2.pos.y);
	var playerJSON ={"player1": {"hp":p1health.toString(), "x":p1x.toString(), "y":p1y.toString()},"player2": {"hp":p2health.toString(),"x":p2x.toString(), "y":p2y.toString()}};



	  $.ajax({
                                url: "http://galezki.cloudapp.net/backend/api.php?action=updateplayerstatus",
                                type: 'POST',
                                data: "sessionId=" + id + "&data="+JSON.stringify(playerJSON),
                                success: function(data){
                                      
                                }
                        });


    $.post("http://galezki.cloudapp.net/backend/api.php?action=getenemies", queryJSON, function (data, textStatus, jqXHR) {

        //getData(data, function(json_packet){
        //Do something with the data received
        if (data === null) {
           // callback(null);
        }
        else {

            var parsedJSON = JSON.parse(data);
            for(var z = 0; z < parsedJSON.length; z++)
            {
                spawnEnemyList.push(parsedJSON[z])
            }
            spawnMobs(shortestBuff);
         
        }
    });

}
function spawnMobs(shortestBuff){
    for(var i = 0; i < spawnEnemyList.length; i++)
    {
   
        if(spawnEnemyList[i].type === "1") 
            {
                ig.game.spawnMonster(1,shortestBuff,spawnEnemyList[i].nick);
            }
        else{
                ig.game.spawnMonster(2,shortestBuff,spawnEnemyList[i].nick);
        }
       
        
    }
    spawnEnemyList = [];
}
function createPW(){

var yourNumber = Math.floor((Math.random() * 75000) + 75000);
id = yourNumber.toString(16);


	
	var queryJSON = {sessionId: id};
    $.post("http://galezki.cloudapp.net/backend/api.php?action=registersession", queryJSON, function (data, textStatus, jqXHR) {

        //getData(data, function(json_packet){
        //Do something with the data received
        if (data === null) {
           // callback(null);
        }
        else {
           	console.log(data );
        }
    });

}