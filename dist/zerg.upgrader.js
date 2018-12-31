var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep, sources, miners,structures) {

    if(creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
    }
    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
    }

    if(creep.memory.upgrading) {
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
      }
    }
    else {
      var emptyStorage = _.filter(structures, function(structure){ return  structure.structureType == STRUCTURE_STORAGE}); 
      var emptyLink = _.filter(structures, function(structure){ return  structure.structureType == STRUCTURE_LINK}); 
      if(emptyLink[1].energy > 0) {
        if(creep.withdraw(emptyLink[1],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(emptyLink[1]);
        }
      }

      else if(emptyStorage.energy > 0) {
        if(creep.withdraw(emptyStorage[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(emptyStorage[0].pos);
        }
      }
      else if(creep.pickup(miners[0].pos.lookFor(LOOK_ENERGY)[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(miners[0].pos);
      }
    }
  }
};

module.exports = roleUpgrader;
