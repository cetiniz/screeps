var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep, sources,towerStructures,miners,hostiles) {
        
        
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	        var emptyTowers = _.filter(towerStructures, function(structure){ return structure.energy < structure.energyCapacity && structure.structureType == STRUCTURE_TOWER});
            var emptyStorage = _.filter(towerStructures, function(structure){ return structure.structureType == STRUCTURE_STORAGE});
            if(hostiles.length > 0) {
                if(creep.transfer(emptyTowers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(emptyTowers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else if(emptyTowers.length > 0 && emptyTowers[0].energy < emptyTowers[0].energyCapacity){
                    if(creep.transfer(emptyTowers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(emptyTowers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else if(emptyStorage.length > 0){
                if(creep.transfer(emptyStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(emptyStorage[0].pos);
                }
            }
	        }
	    }  
	    else {
            if(creep.pickup(miners[1].pos.lookFor(LOOK_ENERGY)[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(miners[1].pos);
            }
	    }
	}
};

module.exports = roleBuilder;
