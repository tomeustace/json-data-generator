var dream = require('dreamjs');
var entity = require('./json/entity-template.json');
require('./custom.types');

/**
 * A JSON data feeder utilitly.
 * 1. Load pre defined json schemas.
 * 2. Generate data that adheres to those schemas.
 */

function generateEntityData(amount) {
    dream.schema(entity.name, entity.schema);
    
    var data = dream
        .useSchema(entity.name)
        .generateRnd(amount)
        .output();
	
    return JSON.stringify(data);
}

module.exports.generateEntityData = generateEntityData;
