var dropMiner1 = {
    run: function(creep,sources) {
        if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1]);
        }
    }
};
module.exports = dropMiner1;
