var externalHarvest1 = {

  run: function(creep, currentRoom) {

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
          creep.move(BOTTOM_RIGHT)
        }
        else if (String(creep.room) == String(currentRoom)) {
          creep.move(RIGHT);
          creep.memory.right = true;
        }
      }
      else if (creep.memory.right){
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
          creep.moveTo(creep.room.controller);
        }
      }
    }
    else {
      if(creep.memory.right){
        if(creep.room == currentRoom) {

          if(String(creep.pos) != String(Game.flags['pos1'].pos)){
            creep.moveTo(1,16);
          }
          else if (String(creep.pos) == String(Game.flags['pos1'].pos)){
            console.log("ALUHAKBAR");
            creep.move(LEFT);
          }
        }
        else if(creep.room != currentRoom){
          console.log("BOIOHBOI");
          creep.move(LEFT);
          creep.memory.right = false;
        }
      }
      else {
        console.log
        if(creep.harvest(Game.flags['source2'].pos.lookFor(LOOK_SOURCES)[0]) == ERR_NOT_IN_RANGE){
          creep.moveTo(Game.flags['source2'].pos.lookFor(LOOK_SOURCES)[0]);
        }
      }
    }
  }
};


module.exports = externalHarvest1;
