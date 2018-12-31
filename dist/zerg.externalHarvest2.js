var externalHarvest2 = {

  run: function(creep, currentRoom,structures) {

    if(creep.memory.right == 'true'){
      creep.memory.right = true;
    }

    if(creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
    }
    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
    }

    if(creep.memory.upgrading){
      if(creep.memory.right == false) {
        if(String(creep.room) != String(currentRoom)){
          creep.move(LEFT);
        }
        else if (String(creep.room) == String(currentRoom)) {
          creep.move(LEFT);
          creep.memory.right = true;
        }
      }
      else if (creep.memory.right){
        var emptyStorage = _.filter(structures, function(structure){ return  structure.structureType == STRUCTURE_STORAGE});
        if(creep.transfer(emptyStorage[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(emptyStorage[0].pos);
        }
      }
    }
    else {
      if(creep.memory.right){
        if(creep.room == currentRoom) {

          if(String(creep.pos) != String(Game.flags['pos2'].pos)){
            creep.moveTo(48,41);
          }
          else if (String(creep.pos) == String(Game.flags['pos2'].pos)){
            creep.move(RIGHT);
          }
        }
        else if(creep.room != currentRoom){
          creep.move(RIGHT);
          creep.memory.right = false;
        }
      }
      else {
        if(creep.harvest(Game.flags['source3'].pos.lookFor(LOOK_SOURCES)[0]) == ERR_NOT_IN_RANGE){
          creep.move(RIGHT);
        }
      }
    }
  }
};


module.exports = externalHarvest2;
