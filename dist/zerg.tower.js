var zergTower = {
  run: function(tower, structures,currentRoom){
    var hostiles = currentRoom.find(FIND_HOSTILE_CREEPS);
    var brokenRoads = _.filter(structures, function(structure){ return (structure.structureType == STRUCTURE_ROAD) && structure.hits < structure.hitsMax/5});
    var brokenRampart = _.filter(structures, function(structure){ return (structure.structureType == STRUCTURE_RAMPART && structure.hits < structure.hitsMax/100)});
    var brokenWalls = _.filter(structures, function(structure){ return (structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax/1000)});
    console.log(brokenRoads);
    if(hostiles.length > 0) {
      tower.attack(hostiles[0]);
    }
    else if(brokenRampart.length > 0) {
      if(tower.repair(brokenRampart[0]) == ERR_NOT_ENOUGH_RESOURCES) {
        console.log(brokenRoads);
      }
    }
    else if (brokenRoads.length > 0){
      if(tower.repair(brokenRoads[0]) == ERR_NOT_ENOUGH_RESOURCES) {
        console.log(brokenRoads);
      }
    }
    else if(brokenWalls.length > 0){
      if(tower.repair(brokenWalls[0]) == ERR_NOT_ENOUGH_RESOURCES) {
        console.log("Need more resources tower");
      }
    }
  }
}

module.exports = zergTower;
