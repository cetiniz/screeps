var scavenger2 = {

  run: function(creep,dropMinerCycle) {
    if(creep.carry.energy < creep.carryCapacity) {
      var resource = creep.room.find(FIND_DROPPED_RESOURCES);

      if(creep.pickup(resource[2]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(resource[2]);
      }
    }
    else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
            structure.energy < structure.energyCapacity;
        }
      });
      if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }

    }
  }
}

module.exports = scavenger2;
