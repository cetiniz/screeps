var scavenger = {

  run: function(creep,miners,structures,routing) {

    if(creep.memory.storing && creep.carry.energy == 0) {
      creep.memory.storing = false;
    }
    if(!creep.memory.storing && creep.carry.energy == creep.carryCapacity) {
      creep.memory.storing = true;
    }

    if(!creep.memory.storing) {
      if(creep.pickup(miners[0].pos.lookFor(LOOK_ENERGY)[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(miners[0].pos);
      }
    }
    else {
      var emptyStructures = _.filter(structures, function(structure){ return structure.energy < structure.energyCapacity && (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)});
      var emptyTowers = _.filter(structures, function(structure){ return structure.energy < structure.energyCapacity && structure.structureType == STRUCTURE_TOWER});
      var emptyStorage = _.filter(structures, function(structure){ return  structure.structureType == STRUCTURE_STORAGE});
      if(emptyStructures.length > 0) {
        if(creep.transfer(emptyStructures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(emptyStructures[0].pos);
        }
      }
      else if(emptyStorage.length > 0){
        if(creep.transfer(emptyStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(emptyStorage[0].pos);
        }
      }
      else if(emptyTowers.length > 0){
        if(creep.transfer(emptyTowers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(emptyTowers[0].pos);
        }
      }
    }
  }
}



module.exports = scavenger;
