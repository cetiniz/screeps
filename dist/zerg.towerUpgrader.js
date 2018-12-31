var towerUpgrader = {

  run: function(creep,structures,miners){

    if(creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
    }
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
    }

    if(creep.memory.building){
      var towers = _.filter(structures, function(structure){ return structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity});
      if(creep.transfer(towers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
      }

    }
    else {
      if(creep.pickup(miners[1].pos.lookFor(LOOK_ENERGY)[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(miners[1].pos);
      }
    }
  }
}

module.exports = towerUpgrader;
