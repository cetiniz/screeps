var dropMiner = {
    run: function(creep,sources) {
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    }
};
module.exports = dropMiner;


