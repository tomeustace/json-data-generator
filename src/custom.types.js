var dream = require('dreamjs');
var ents = require('./entity');

var currentEntity;

/* Custom type definitions.  See chancejs.com documentation for further options. */
dream.customType('string', function (helper) {
  return helper.chance.word();
});

dream.customType('number', function (helper) {
  return helper.chance.integer();
});

dream.customType('timestamp', function (helper) {
  return helper.chance.timestamp();
});

dream.customType('url', function (helper) {
  return helper.chance.url();
});

dream.customType('locale', function (helper) {
  return helper.chance.country();
});

dream.customType('name', function (helper) {
  return helper.chance.name();
});

dream.customType('id', function (helper) {
  return helper.chance.guid();
});

dream.customType('entity.name', function (helper) {
  return currentEntity;
});

/* Below custom type pulls in the data for any entity.  If the entities don't share common properties the data option
   could be removed.  It comes in handy if you need a timestamp or other common property on the data.
*/
dream.customType('data', function (helper) {
	currentEntity = helper.oneOf(ents.getEntities());
    var entity = require('./json/entities/' + currentEntity + '.json');
    return dream.schema(entity.schema).generateRnd(1).output();
});
