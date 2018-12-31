var dropMiner2 = {
    run: function(creep,sources) {
        if(creep.harvest(sources[2]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[2]);
        }
    }
};
module.exports = dropMiner2;
