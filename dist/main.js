var maintain = require('maintainSpawn');
var roleHarvester = require('zerg.harvestor');
var roleUpgrader = require('zerg.upgrader');
var roleBuilder = require('zerg.builder');
var roledropMiner = require('zerg.dropMiner');
var roledropMiner1 = require('zerg.dropMiner1');
var roledropMiner2 = require('zerg.dropMiner2');
var rolescavenger = require('zerg.scavenger');
var rolescavenger1 = require('zerg.scavenger1');
var rolescavenger2 = require('zerg.scavenger2');
var roleTower = require('zerg.tower');
var externalHarvest = require('zerg.externalHarvest');
var externalHarvest1 = require('zerg.externalHarvest1');
var externalHarvest2 = require('zerg.externalHarvest2');
var towerUpgrader = require('zerg.towerUpgrader');
var tempBuilder = require('temp.zerg.createspawn');
var linker = require('zerg.linker');
const profiler = require('screeps-profiler');


//profiler.enable();


module.exports.loop = function () {
  profiler.wrap(function() {

    // Delete Creeps That Have Died
    for(var i in Memory.creeps) {
      if(!Game.creeps[i]) {
        delete Memory.creeps[i];
      }
    }
    // Code to run code for all rooms in possession
    for(var room_it in Game.rooms) {
      var currentRoom = Game.rooms[room_it];


      //Store current sources in room to reduce calls to find
      if(currentRoom.controller.my === true){
        var sources = currentRoom.find(FIND_SOURCES, {filter: 'energy'});
        //Store Creeps in Library to reduce calls to creep
        var currentCreeps = currentRoom.find(FIND_MY_CREEPS);
        //Store Miners from Creeps in Library
        var miners = _.filter(currentCreeps, function(creep){return creep.memory.role == 'dropMiner' || creep.memory.role == 'dropMiner1' || creep.memory.role == 'dropMiner2'});


        /*List of spawns and extensions*/
        var currentSpawn = currentRoom.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_LINK);
          }
        });
        var isSpawn = currentRoom.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType == STRUCTURE_SPAWN);
          }
        });
        if (isSpawn.length > 0){
          // Generate Creeps
          maintain.run(currentSpawn,currentCreeps,sources);
          if(Game.time % 1500 == 0 && String(currentRoom.name) == 'E92S66'){
            Game.spawns['firstSpawn'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,WORK,WORK], null, {role: 'externalHarvester', right: 'true'});
          }
          if(Game.time % 1550 == 0 && String(currentRoom.name) == 'E92S66'){
            Game.spawns['firstSpawn'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,WORK,WORK], null, {role: 'externalHarvester1', right: 'true'});
          }
          if(Game.time % 1450 == 0 && String(currentRoom.name) == 'E92S66'){
            Game.spawns['firstSpawn'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,WORK,WORK], null, {role: 'externalHarvester2', right: 'true'});
          }

          var hostiles = currentRoom.find(FIND_HOSTILE_CREEPS);

          /*run creep memory routines*/
          for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
              roleHarvester.run(creep,sources,currentCreeps);
            }
            if(creep.memory.role == 'dropMiner') {
              roledropMiner.run(creep,sources);
            }
            if(creep.memory.role == 'dropMiner1') {
              roledropMiner1.run(creep,sources);
            }
            if(creep.memory.role == 'dropMiner2') {
              roledropMiner2.run(creep,sources);
            }
            if(creep.memory.role == 'scavenger') {
              rolescavenger.run(creep,miners,currentSpawn);
            }
            if(creep.memory.role == 'scavenger1') {
              rolescavenger1.run(creep,miners,currentSpawn);
            }
            if(creep.memory.role == 'scavenger2') {
              rolescavenger2.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
              roleUpgrader.run(creep,sources,miners,currentSpawn);
            }
            if(creep.memory.role == 'builder') {
              roleBuilder.run(creep,sources,currentSpawn,miners,hostiles);
            }
            if(creep.memory.role == 'externalHarvester' && String(currentRoom.name) == 'E92S66'){
              externalHarvest.run(creep,currentRoom);
            }
            if(creep.memory.role == 'externalHarvester1' && String(currentRoom.name) == 'E92S66'){
              externalHarvest1.run(creep,currentRoom);
            }
            if(creep.memory.role == 'externalHarvester2' && String(currentRoom.name) == 'E92S66'){
              externalHarvest2.run(creep,currentRoom,currentSpawn);
            }
            if(creep.memory.role == 'towerUpgrader'){
              towerUpgrader.run(creep,currentSpawn,miners);
            }
            if(creep.memory.role == 'linker'){
              linker.run(creep,currentSpawn);
            }
          }
          /*Run tower scripts*/
          var towers = _.filter(currentSpawn, function(structure){ return structure.structureType == STRUCTURE_TOWER});
          for(var tower in towers){
            roleTower.run(towers[tower],currentSpawn,currentRoom);
          }
        }}}
  });
}
