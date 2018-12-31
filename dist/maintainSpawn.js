var maintain = {
  /*AUTO EXECUTABLE FUNCTION INSIDE OBJECT MAINTAIN CALLED RUN*/
  run: function(inputSpawner, currentCreeps,sources) {
    /*RIP VARIABLES FOR USE*/

    var spawner = _.filter(inputSpawner, {structureType: STRUCTURE_SPAWN});
    var tower = _.filter(inputSpawner, {structureType: STRUCTURE_TOWER});
    if(spawner[0].canCreateCreep([WORK,CARRY,MOVE],null) == 0){
      var creepsList = currentCreeps;


      /*ADD UNITS HERE TO THE MAINTENENCE LIST*/
      var harvesters = [];
      var upgraders = [];
      var builders = [];
      var dropMiner = [];
      var dropMiner1 = [];
      var dropMiner2 = [];
      var scavenger = [];
      var scavenger1 = [];
      var scavenger2 = [];
      var extHarvest = [];
      var extHarvest1 = [];
      var towerUpgrader = [];
      var linker = [];

      for(var i in creepsList) {
        switch (creepsList[i].memory.role) {
          case 'harvester':
          harvesters.push(creepsList[i]);
          break;
          case 'upgrader':
          upgraders.push(creepsList[i]);
          break;
          case 'builder':
          builders.push(creepsList[i]);
          break;
          case 'dropMiner':
          dropMiner.push(creepsList[i]);
          break;
          case 'dropMiner1':
          dropMiner1.push(creepsList[i]);
          break;
          case 'dropMiner2':
          dropMiner2.push(creepsList[i]);
          break;
          case 'scavenger':
          scavenger.push(creepsList[i])
          break;
          case 'scavenger1':
          scavenger1.push(creepsList[i])
          break;
          case 'scavenger2':
          scavenger2.push(creepsList[i])
          break;
          case 'externalHarvester':
          extHarvest.push(creepsList[i])
          break;
          case 'externalHarvester1':
          extHarvest1.push(creepsList[i])
          break;
          case 'towerUpgrader':
          towerUpgrader.push(creepsList[i])
          break;
          case 'linker':
          linker.push(creepsList[i])
          break;
        }
      }
      /*PRIORITY IS TOP TO BOTTOM FOR SPAWNNING*/
      if(dropMiner.length + dropMiner1.length == 0 && harvesters.length < 1){
        spawner[0].createCreep([WORK, CARRY, MOVE], null, {role: 'harvester'});
        console.log("Creating harvester!");
      }
      else if(scavenger.length < dropMiner.length) {
        if(spawner[0].createCreep([MOVE, CARRY, MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY], null, {role: 'scavenger' }) == ERR_NOT_ENOUGH_ENERGY){
          if(spawner[0].createCreep([MOVE, CARRY, MOVE,CARRY,MOVE,CARRY,MOVE], null, {role: 'scavenger' }) == ERR_NOT_ENOUGH_ENERGY){
            if(spawner[0].createCreep([MOVE, CARRY, MOVE,CARRY,MOVE], null, {role: 'scavenger' }) == ERR_NOT_ENOUGH_ENERGY){
              spawner[0].createCreep([MOVE, CARRY, MOVE], null, {role: 'scavenger' });
            }
          }
        }
      }
      else if(scavenger1.length < dropMiner1.length) {
        if(spawner[0].createCreep([MOVE, CARRY, MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY], null, {role: 'scavenger1' }) == ERR_NOT_ENOUGH_ENERGY){
          if(spawner[0].createCreep([MOVE, CARRY, MOVE,CARRY,MOVE,CARRY,MOVE], null, {role: 'scavenger1' }) == ERR_NOT_ENOUGH_ENERGY){
            if(spawner[0].createCreep([MOVE, CARRY, MOVE,CARRY,MOVE], null, {role: 'scavenger1' }) == ERR_NOT_ENOUGH_ENERGY){
              spawner[0].createCreep([MOVE, CARRY, MOVE], null, {role: 'scavenger1' });
            }
          }
        }
      }
      else if(scavenger2.length < dropMiner2.length) {
        spawner[0].createCreep([MOVE, CARRY, MOVE], null, {role: 'scavenger2' });
        console.log("Creating scavenger!");
      }
      else if(dropMiner.length == 0 || dropMiner[0].ticksToLive < 24){
        if(spawner[0].createCreep([WORK,WORK, WORK,WORK,WORK,MOVE, MOVE,MOVE], null, {role: 'dropMiner'}) == ERR_NOT_ENOUGH_ENERGY){
          if(spawner[0].createCreep([WORK, WORK,WORK,WORK,MOVE, MOVE], null, {role: 'dropMiner'}) == ERR_NOT_ENOUGH_ENERGY){
            spawner[0].createCreep([WORK, WORK, MOVE], null, {role: 'dropMiner'});
            console.log("Creating dropMiner!");
          }
        }
      }
      else if(dropMiner1.length == 0 || dropMiner1[0].ticksToLive < 24 && sources.length > 1){
        if(spawner[0].createCreep([WORK,WORK, WORK,WORK,WORK,MOVE, MOVE,MOVE], null, {role: 'dropMiner1'}) == ERR_NOT_ENOUGH_ENERGY){
          if(spawner[0].createCreep([WORK, WORK,WORK,WORK,MOVE,MOVE], null, {role: 'dropMiner1'}) == ERR_NOT_ENOUGH_ENERGY){
            spawner[0].createCreep([WORK, WORK, MOVE], null, {role: 'dropMiner1'});
            console.log("Creating dropMiner for 2nd resource!");
          }
        }
      }
      else if(dropMiner2.length == 0 && sources.length > 2){
        if(spawner[0].createCreep([WORK, WORK,WORK,WORK,WORK,WORK,MOVE,MOVE, MOVE], null, {role: 'dropMiner2'}) == ERR_NOT_ENOUGH_ENERGY){
          spawner[0].createCreep([WORK, WORK, MOVE], null, {role: 'dropMiner2'});
          console.log("Creating dropMiner for 3nd resource!");
        }
      }
      else if(upgraders.length < 3){
        if(spawner[0].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY, MOVE,CARRY,MOVE,MOVE,CARRY,CARRY], null, {role: 'upgrader'}) == ERR_NOT_ENOUGH_ENERGY){
          if(spawner[0].createCreep([WORK,WORK,WORK,CARRY, MOVE,CARRY,MOVE,MOVE,CARRY], null, {role: 'upgrader'}) == ERR_NOT_ENOUGH_ENERGY){
            if(spawner[0].createCreep([WORK,WORK,CARRY, MOVE,CARRY,MOVE], null, {role: 'upgrader'}) == ERR_NOT_ENOUGH_ENERGY){
              spawner[0].createCreep([WORK, CARRY, MOVE], null, {role: 'upgrader'});
            }
          }
        }
      }
      else if(builders.length < 2) {
        if(spawner[0].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,WORK], null, {role: 'builder'}) == ERR_NOT_ENOUGH_ENERGY){
          if(spawner[0].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], null, {role: 'builder'}) == ERR_NOT_ENOUGH_ENERGY){
            spawner[0].createCreep([WORK, CARRY, MOVE], null, {role: 'builder'});
            console.log("Creating builder!");
          }
        }
      }
      else if(towerUpgrader.length < 1 && tower.length > 0){
        if(spawner[0].createCreep([WORK,CARRY,MOVE,CARRY,MOVE], null, {role: 'towerUpgrader'}) == ERR_NOT_ENOUGH_ENERGY){
          spawner[0].createCreep([WORK,CARRY,MOVE], null, {role: 'towerUpgrader'});
        }
      }
      else if(linker.length < 1){
        if(spawner[0].createCreep([MOVE,CARRY], null, {role: 'linker'}) == ERR_NOT_ENOUGH_ENERGY){
          spawner[0].createCreep([MOVE,CARRY,MOVE,CARRY], null, {role: 'linker'});
        }
      }
    }
  }
};
module.exports = maintain;
