var linker = {
    
    run: function(creep, structures){
        var emptyStorage = _.filter(structures, function(structure){ return  structure.structureType == STRUCTURE_STORAGE}); 
        var emptyLink = _.filter(structures, function(structure){ return  structure.structureType == STRUCTURE_LINK}); 
        if(emptyLink[0].energy == emptyLink[0].energyCapacity){
            emptyLink[0].transferEnergy(emptyLink[1],400);
        }
        if(creep.carry.energy == 0){
            if(creep.withdraw(emptyStorage[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(18,26);
            }
        }
        else {
            creep.transfer(emptyLink[0],RESOURCE_ENERGY);
        }
    }
}

module.exports = linker;
