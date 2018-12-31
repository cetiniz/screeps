/*TEMPORARY ATTACK SCRIPTS GO HERE */

//DEBUG
//console.log(Game.creeps['Jacob'].room.lookForAt(LOOK_STRUCTURES,2,41));

//ONE-TIME COMMANDS
//Game.creeps['Jacob'].move(TOP);

//BASE DESTROYING COMMANDS
/*const target = Game.creeps['Jacob'].pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
filter: (structure) => {
return (structure.structureType == STRUCTURE_TOWER);
}});
if(target) {
if(Game.creeps['Jeremiah'].attack(target) == ERR_NOT_IN_RANGE) {
Game.creeps['Jeremiah'].say("HELLO 🔥");
Game.creeps['Jeremiah'].moveTo(target);
}
}*/
/*if(String(Game.creeps['Lillian'].room.name) == 'E93S65'){
  if(Game.creeps['Lillian'].memory.building && Game.creeps['Lillian'].carry.energy == 0) {
  Game.creeps['Lillian'].memory.building = false;
  }
  if(!Game.creeps['Lillian'].memory.building && Game.creeps['Lillian'].carry.energy == Game.creeps['Lillian'].carryCapacity) {
  Game.creeps['Lillian'].memory.building = true;
  }

  if(Game.creeps['Lillian'].memory.building) {
  var targets = Game.creeps['Lillian'].room.find(FIND_CONSTRUCTION_SITES);
  if(Game.creeps['Lillian'].build(targets[0]) == ERR_NOT_IN_RANGE){
  Game.creeps['Lillian'].moveTo(targets[0]);
  }
  }
  else {
  if(Game.creeps['Lillian'].harvest(Game.creeps['Lillian'].room.lookForAt(LOOK_SOURCES,33,46)[0]) == ERR_NOT_IN_RANGE){
  Game.creeps['Lillian'].moveTo(32,46);
  }
  }
  }
  else {
  Game.creeps['Lillian']
  }*/




